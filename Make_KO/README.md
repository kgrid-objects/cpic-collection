# Building a CPIC Knowledge Object
*last updated 03/20/2018*

__Important Notice__:  
The following instructions are designed primarily for Mac users. Window users may need to install bash if they have not already done so. The following link will pull up instructions on installing [bash](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/).

Once bash is installed, make sure the __pip3__ installer is installed and updated to be the latest version. If you are running Python 2.7.9+ or Python 3.4+, __pip3__ should already be installed. 

To install __pip3__, enter the following in the command-line: `sudo apt-get install python3-pip`

Once pip3 is installed, enter the following command to the bash command-line to install the xlrd module: `pip3 install xlrd`  
(*NOTE: This module is crucial for the Wizard to read in excel formatted files.*) 

The following instructions assumes that you have ran a KO in the past. To proceed with these instructions, you will need to have downloaded: 
1. The latest version of [postman](https://www.getpostman.com/)
2. The latest version of the [activator](https://github.com/kgrid/kgrid-activator/releases)
3. The latest version of the python [adapter](https://github.com/kgrid/python-adapter/releases)
4. Configured the proper repositories and files on your local machine. If you have not done this, or are unsure, please proceed to __Step 0__.

### Step 0: Configuring the file directories
1. Go to kgrids [github](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the latest python script __File_Path_Config.py__ onto your local repository. 
2. Enter the following in the bash command-line: `python3 File_Path_Config.py`
3. The required directories should now be created if they had not already been done so.
4. Check to see that the following directories have been successfully created:  
(*NOTE: In the following code, replace 'name' with your computers home directory name*)
    * `/users/name/activator/shelf` (*where the KO is stored*)
    * `/users/name/activator/adapters` (*where the adapter is stored*)
5. Move the python adapter you downloaded earlier into the `/users/name/activator/adapters` directory. 
4. You are now ready to proceed to __Step 1__.

### Step 1: Making the Genotype to Phenotype KO
1. Go to KGrid's [Make_KO](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the latest CPIC Wizard file __CPIC_GPWizard.py__ onto your current working directory.
2. Retrieve and download an official diplotype to phenotype excel table from the [CPIC website](https://cpicpgx.org/genes-drugs/). Scroll down to see a list of genes, and click on the corresponding __Guideline__ link. Find and download the __drug_name_diplotype_phenotype_table__ (*NOTE: Not all genes will have this information*). Be sure to save this file in the same directory as the CPIC Wizard.
3. Open the excel file and check that it is formatted correctly. Sometimes special characters like superscripts remain, for example: __Metabolizer<sup>c</sup>__ instead of __Metabolizer__. Remove any extra characters by performing a __find and replace__ in Excel. (*Instructions on performing a find-and-replace in Excel can be found below*)
4. Open the __CPIC_GPWizard.py__ file and find the global variable called `KOFILE` on line 49. Change the text `name` to the name of your computers home directory.
5. Open the terminal command line and type the following: `python3 CPIC_GPWizard.py <Excel table of interest>`
6. If successful, the new KO should now reside in your computers activators shelf. Type `cd users/name/activator/shelf` on the command line, then type `ls` to check if new file exists.

### Step 2: Using the Genotype to Phenotype KO
1. First we will run the activator. Open the terminal and go to the directory where the activator is stored. Type the following code into the command-line: `java -jar <name_of_activator`.
2. Once the activator is successfully running, start up postman
3. Check that KO is recognized by the activator by making the following GET request:
__localhost:8080/shelf/__
4. Go to __Headers__ tab and create a key __Accept__ and value __application/json__. 
5. Click send. The KO should be returned. 
6. Now that we know the KO has be detected in the shelf, create a POST request: __localhost:8080/knowledgeObject/ark:/gene_name/object/result__
7. Go to __Headers__ tab and create a key __Content-Typed__ and value __application/json__.
8. Go to __Body__ tag and create the following dictionary format request `{"diplotype": "", "allele1": "", "allele2": ""}`. Fill in the pair values with the appropriate genotype information.
9. Click send. If successful, a phenotype should be returned. 

### Find-and-Replace
1. Go to the excel menu bar and click __edit__. 
2. Go to where it says __find__ which will open additional choices.
3. Click __replace__. This should open a new window. 
4. Under __Find what:__ enter in the text we want to replace. 
5. Under __Replace with:__ enter in the new text of interest. 
6. Click __Replace All__ to complete the find and replace. 
