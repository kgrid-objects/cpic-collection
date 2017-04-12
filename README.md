# CPIC gudieline objects
This is a collection of objects that focus on dosing guidelines as provided by the CPIC pharmacogenomic guidelines. These objects generally take allele pairs as inputs and return the correct dosing guideline based on a patient's alleles.

# Making CPIC objects
All CPIC guideline objects have a few things in common. All CPIC objects should
* Take an allele pair as a parameter
* Use guidelines provided for specific drug and enzyme from https://www.pharmgkb.org/
* Have an output that is the dosing guideline in the form of a JSON object with the following keys:
    * "metabolic_rate"
    * "activity_score"
    * "implications"
    * "recomendations"
    * "alternatives"
    * "recommendation_classification" 

### Key definitions
The keys in the JSON object returned by the CPIC knowledge objects represent different aspects of the CPIC guideline for the drug and enzyme.

* "metabolic_rate" [string] is the metabolizer status based on the guideline. It should be one of [Ultrarapid, Extensive, Intermediate, Poor]
* "activity_score" [float] is a number based on the guideline
* "implications" [string] is a description of the implications of using the specific drug on a patient with the given allele pair
* "recommendations" [string] is a description of what dose should be given (i.e. "Use label recommended age- or weight-specific dosing.")
* "alternatives" [list] is a list object containing possible alternative medications (i.e. ["morphine", "non-opioid analgesics", "Tramadol"])
* "recommendation_classification" [string] is the strength/classification of the recommendation from the guideline. It should be one of ["Strong", "Moderate", "Weak"]

### Representing gudelines in object
Every guideline from https://www.pharmgkb.org/ has a link to the guideline publication and some supplements to the publication. Because the CPIC knowledge objects need to use the guideline informatin from the publication supplements, it is necessary to make a data structure in each object that will represent the guideline. As an example, the guideline for codeine and the CYP2D6 enzyme has a supplement with a table containing all of the metabolizer statuses for every allele pair covered by the guideilne:

![Table image](https://github.com/kgrid/CPIC-objects/blob/master/guidelines/cyp2d6/cpic.png)

It is possible to model this table in the object payload using a 2-dimensional list data structure like so:

```python
	#metabolizer rates represented as integers
	NM = 0
	PM = 1
	IM = 2
	EM = 3
	UM = 4
	UorE = 43

	#this is the guideline table
	#created it based on information from supplement to CPIC paper
	guidlineTable = [
		[EM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, NM, UM, UM, UorE, UorE, UorE, UorE, UorE, UM, UM, UM],
		[NM, NM, NM, NM, PM, PM, PM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, PM, PM, PM, PM,  IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM]
	]
   ```
Using this data structure, it is possible to retrieve the metabolizer status of the patient with the given allele pair by mapping alleles to indices of this list structure.

__note__: not every supplement contains a table like this one. Some of them may have the guidelines represented in other ways such as a Microsoft Excel document. You may need to write additional scripts that parse these documents to make a data structure to model the guideline
# Example
Continuing with the CYP2D6 object example, once you have created the data structure to model the guidline, the next step is retrieving the right information from the structure. for this example allele1 = "*1" and allele2 = "*1xN"In this case, alleles were mapped to indices of the 2-dimensional list using a dictionary strucutre: 
```python
	indexOf = {"*1": 0, "*2": 1, "*1xN": 2, "*2xN": 3," *3": 4, "*4": 5, "*4xN": 6, "*5": 7, "*6": 8, 
				"*10": 9, "*17": 10, "*41": 11}
```
To get the metabolizer information from the guideline structure, find the indices of the allele pairs like so:
```python
	index1 = indexOf[allele1] # index1 will be 0
	index2 = indexOf[allele2] # index2 will be 2
	
	# this will give you an integer representing the metabolizer status
	metabolicRate = guidelineTable[index1][index2] # this will give you guidelineTable[0][2] which is UM
```
From here, use the table information from https://www.pharmgkb.org/guideline/PA166104996. At the top of the page are 2 drop down menus to select an allele pair. If you choose an allele pair, it will give you a table representing the dosing guideline. CPIC objects return a JSON object similar to this table. Fill in the rest of the information like so:

```python
metabolizerKey = "metabolic_rate"
	activityKey = "activity_score"
	implicationsKey = "implications"
	reccomendationKey = "reccomendations"
	alternativesKey = "alternatives"
	recommendationClassKey = "recommendation_classification"

	guideline = {metabolizerKey: "default_"}
	
	
	# Here are a few examples
	# not every metabolic rate is included here
	elif rate == PM:
		guideline[metabolizerKey] = "Poor metabolizer"
		guideline[activityKey] = "0"
		guideline[implicationsKey] = "Greatly reduced morphine formation leading to insufficient pan relief	"
		guideline[reccomendationKey] = "Avoid codeine due to lack of efficacy"
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics"]
		guideline[recommendationClassKey] = "Strong"

	elif rate == IM:
		guideline[metabolizerKey] = "Intermediate metabolizer"
		guideline[activityKey] = "0.5"
		guideline[implicationsKey] = "Reduced morphine formation"
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing. If no response, " +\
										"consider alternative analgesics such as morphine or a non-opioid"
		guideline[alternativesKey] = ["Monitor tramadol use for response"]
		guideline[recommendationClassKey] = "Moderate"

	elif rate == EM:
		guideline[metabolizerKey] = "Extensive metabolizer"
		guideline[activityKey] = "1.0 - 2.0"
		guideline[implicationsKey] = "Normal morphine formation"
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing"
		guideline[alternativesKey] = []
		guideline[recommendationClassKey] = "Strong"
```

To return a JSON object on the Knowledge Grid, cast the `guideline` object as a string
```python
	return str(guideline)
```

__note__: make sure any objects you create include a test suite and other standard knowledge object features. see the [Authoring Manual](https://github.com/kgrid/AuthoringManual) for more information.

## Testing
There are 2 ways you can run tests on the CPIC knowledge objects

### Postman method
There is a Postman collection provided in this repository for running tests on the CPIC knolwedge objects. To use this collection, download the CPIC-guideline-collection.json file from this repository. Then, open Postman and go to file > import and choose the .json file you downloaded. This will create a collection in Postman for you. Once you have the collection, go to Collection > runner and select the CPIC collection. Press the "Start Test" button to run the collection.

### Shell script method
This repository also has a shell script that can be used to test the knowledge objects. The shell script will also allow you to see the output from the knowledge objects. To run the script, download the runner.sh file in this repository into any directory you want. Then, open the command-line and navigate to that directory. From there, enter the command "sh runner.sh" (without the quotes) and the script will run
