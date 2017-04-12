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
* "recommendation_classification" [string] is the strength/classification of the recommendation from the guideline. It should be one of [Strong, Moderate, Weak]

# Example

         

## Testing
There are 2 ways you can run tests on the CPIC knowledge objects

### Postman method
There is a Postman collection provided in this repository for running tests on the CPIC knolwedge objects. To use this collection, download the CPIC-guideline-collection.json file from this repository. Then, open Postman and go to file > import and choose the .json file you downloaded. This will create a collection in Postman for you. Once you have the collection, go to Collection > runner and select the CPIC collection. Press the "Start Test" button to run the collection.

### Shell script method
This repository also has a shell script that can be used to test the knowledge objects. The shell script will also allow you to see the output from the knowledge objects. To run the script, download the runner.sh file in this repository into any directory you want. Then, open the command-line and navigate to that directory. From there, enter the command "sh runner.sh" (without the quotes) and the script will run
