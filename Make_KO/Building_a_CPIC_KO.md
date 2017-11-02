## Building a CPIC Knowledge Object
*last updated 11/2/2017*

**Important Notice:**
The following instructions are designed primarily for Mac users. Windows users may need to have bash installed and configured before following these steps. 

The following link will pull up instructions on installing [bash](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

Once bash is installed, make sure pip installer has been installed and updated to be the latest version. We will need both the pip installer for python2 and pip3 installer for python3. (This step will likely be removed in upcoming editions)

Once pip is up and running, use the following command to install the xlrd module: `pip3 install xlrd`

Now we are ready to create our first CPIC KO. 

### Gathering KO parts

Go to kgrids [github](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the following files onto your local computer:
 
1. build.py
2. excel_to_dictionary.py
3. input.xml
4. output.xml
5. kog.json
6. metadata.json
7. skeleton_geno_pheno-base.py
8. skeleton_pheno-recom-base.py (**Disregard this file for now. Will be acessible in the future**)

Be sure to check that all of the files are in the same directory. 

### Converting a CPIC excel table into a python dictionary
1. Retrieve and download a official diplotype to phenotype excel table from the CPIC website.
2. Save it to local directory with all the other files.  
3. Run the `excel_to_dictionary.py` python file in the bash command line and passing the excel file of interest as the argument. The command should look like the following: `python3 excel_to_dictionary.py <excel_file_of_interest>`.
5. Open the local directory and the excel file should now be saved as a textfile which has been formatted into a dictionary.
6. Make sure to clean up the file to ensure consistency. Sometimes special characters remain, such as `Metabolizerc` instead of `Metabolizer`. Remove these by opening the text editor and manually performing a find and replace in the text editor.

### Creating a CPIC payload
1. Open the `skeleton_geno_pheno-base.py`.
2. Scroll down to where it says "COPY AND PASTE DICTIONARY HERE".
3. Below, you will find a dictionary variable named `geno_pheno`. 
4. Open the textfile created earlier, and copy the contents and paste it into the right of the `=` sign. 
5. Rename the `skeleton_geno_pheno-base.py` file by replacing `skeleton` with the name of the gene of interest. 
6. Save and close the file. You have now successfully created the payload. 

### Configuring the kog.json file
1. Open the `kog.json`.  
2. Go to where it says `"payloadfile":"some_python_file.py"`.
3. Change `some_python_file.py` with the name of the python payload you created earlier. It should look something like this: `"payloadfile":"UTG1A1_geno_pheno-base.py"`
4. Go to where it says `"KOFile":"somepath"`.
5. Change `somepath` with the direct path to the activators shelf on your local computer, then add the name of the KO you are creating at the end. It should look something like this: `"KOFile":"/Users/sam/activator/shelf/UTG1A1-object"`
6. Save and close the file. 

### Creating the metadata.json file
1. Open the `metadata.json`.
2. Go to where it says `"title":"some_title"`
3. Change `some_title` to the desired KO name. It should look something like this: `"title":"UTG1A1-object"`
4. Go to where it says `"functionName":"some_function"`
5. change `some_function` to the main function name called in the payload.
6. Save and close the file. 

### Building the KO
1. Open terminal and run `build.py` with kog.json as its argument. The command should look like this: `python build.py kog.json`. It is important to use `python` instead of `python3` since build.py is written in python2.
3. If successful, the newly made KO should now reside in your local actiators shelf. 

### Test the KO is functioning by accesssing it via Postman. 
"content soon to come"
