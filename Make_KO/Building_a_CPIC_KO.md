## Building a CPIC Knowledge Object
To create a CPIC KO, the following files are required: 
1. input.xml
2. output.xml
3. metadata.json
4. kog.json
5. payload.py

**All necessary files are stored under the directory Make_KO in gitHub for CPIC-object. Be sure to copy these files and post them into a new directory on your local computer**

### Converting a CPIC excel table into a python dictionary
1. Retrieve a official genotype to phenotype excel table from the CPIC website.
2. Save it to local directory of interest. 
3. Retrieve from github the python source code: `excel_to_dictionary.py`
4. Run the python file in the terminal, passing an excel file of interest as the argument. The format should look like the following: `python3 excel_to_dictionary.py <excel_file_of_interest>`. Be sure to type `python3` as this code is written in python3. 
5. Open the local directory and the excel file should now be saved as a textfile which has been formatted into a dictionary.
6. Make sure to clean up the file to ensure consistency. Sometimes special characters remain, such as `Metabolizerc` instead of `Metabolizer`. Remove these by opening the text editor and manually performing a find and replace in the text editor.

### Creating a CPIC payload
1. Open the `skeleton_geno_pheno-base.py`.
2. Scroll down to where it says "COPY AND PASTE DICTIONARY HERE".
3. Under, you will find a dictionary variable named `geno_pheno`. Paste the dictionary to the right of the `=` sign. 
3. Rename the file by replacing `skeleton` with the name of the gene of interest. 
4. Save and close the file. 

### Creating the kog.json file
1. Open the `kog.json`. 
2. Go to where it says `"payloadfile":"some_python_file.py"`.
3. Change `some_python_file.py` with the name of the python payload you created earlier. 
4. Go to where it says `"KOFile":"somepath"`.
5. Change `somepath` with the direct path to the activators shelf on your local computer, then add the name of the KO you are creating at the end. It should look something like this: `/Users/sam/activator/shelf/UTG1A1-object`
6. Save and close the file. 

### Creating the metadata.json file
1. Open the `metadata.json`.
2. Go to where it says `"title":"some_title"`
3. Change `some_title` to the desired KO name
4. Go to where it says `"functionName":"some_function"`
5. change `some_function` to the main function name called in the payload.
6. Save and close the file. 

### Building the KO
1. Open terminal and run `build.py` with kog.json as its argument. It should look like this: `python build.py kog.json`
2. It is important to use `python` instead of `python3` since build.py is written in python2. 
3. If successful, the newly made KO should now reside in your local actiators shelf. 

### Test the KO is functioning by accesssing it via Postman. 
"content soon to come"
