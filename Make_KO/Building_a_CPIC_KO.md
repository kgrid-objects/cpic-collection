## Building a CPIC Knowledge Object
To create a CPIC KO, the following files are required: 
1. input.xml
2. output.xml
3. metadata.json
4. kog.json
5. payload.py

### Converting a CPIC excel table into a python dictionary
1. Retrieve a official genotype to phenotype excel table from the CPIC website.
2. Save it to local directory
3. Retrieve from gitHub the python source code: `excel_to_dictionary.py`
4. Run it in terminal
5. Once run, it will ask for the direct pathway to the CPIC excel table downloaded earlier. Enter in the direct pathway and hit return. 
6. Open the local directory where exceltoditionary.py is saved. You should now see text file that has formatted the excel table into a python dictionary.
7. Make sure to clean up the file as the code cannot take into account headers and some description text at the bottom of the excel file. Remove these key:value pairs manually from the text file. 

### Creating a CPIC payload
1. Open the `skeleton_geno_pheno-base.py` file from gitHub.
2. Scroll down to where it says "COPY AND PASTE DICTIONARY HERE".
3. Under, you will find a dictionary variable named `geno_pheno`. Paste the dictionary to the right of the `=` sign. 
3. Rename the file by replacing `skeleton` with the name of the gene of interest. 
4. Save and close the file. 

### Creating the kog.json file
1. Open the `kog.json` file from gitHub. 
2. Go to where it says `"payloadfile":"some_python_file"`.
3. Change `some_python_file` with the name of the python file you created earlier. 
4. Go to where it says `"KOFile":"somepath"`.
5. Change somepath with the direct path to the activators shelf on your local computer, then add the name of the KO you are creating at the end. For example: `/Users/sam/activator/shelf/UTG1A1-base.json`
6. Save and close the file. 

### Creating the metadata.json file
1. Open the `metadata.json` file from gitHub.
2. Go to where it says `"title":"some_title"`
3. Change `some_title` to the desired KO name
4. Go to where it says `"functionName":"execute"`
5. change `execute` to `getPhenotype` which is the name of the main function called in the python payload. 
6. Save and close the file. 