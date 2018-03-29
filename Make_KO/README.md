# Building a CPIC Knowledge Object
*last updated 03/28/2018*

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
1. Go to kgrids [github](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the latest python script __File_Path_Config.py__. 
2. Enter the following in the bash command-line: `python3 File_Path_Config.py`
3. The required directories should now be created if they have not already been done so.
4. Check to see that the following directories have been successfully created:  
(*NOTE: In the following code, replace 'name' with your computers home directory name*)
    * `/users/name/activator/shelf` (*where the KO is stored*)
    * `/users/name/activator/adapters` (*where the adapter is stored*)
5. Move the python adapter you downloaded earlier into the `/users/name/activator/adapters` directory. 
4. You are now ready to proceed to __Step 1__.

### Step 1: Making the Genotype to Phenotype KO
1. Go to KGrid's [Make_KO](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the latest CPIC Wizard file __CPIC_GPWizard.py__ onto your current working directory.
2. Retrieve and download an official diplotype to phenotype excel table from the [CPIC website](https://cpicpgx.org/genes-drugs/). Scroll down to see a list of genes, and click on the corresponding __Guideline__ link. Find and download the __drug_name_diplotype_phenotype_table__ (*NOTE: Some genes will not have this information*). Be sure to save this file in the same directory as the CPIC Wizard.
3. Open the excel file and check that it is formatted correctly. The __CPIC_GPWizard.py__ reads in the first 2 columns of the excel table. These two columns must contain the diplotype information and the corresponding phenotype information. Some tables contain extra columns which can result in non-functional KOs. (*NOTE: If the first two columns already contain the right information, skip this step.*)    
For example, we see that the CYP2D6 excel file contains a total of 4 columns.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/genetable1.png)
The first column contains diplotype information, however, the next column over contains the Gaedigk Activity Score and not the phenotype information.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/genetable2.png)
Delete this column.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/genetable3.png)
4. Sometimes special characters like superscripts remain. For example, we see in the UGT1A1 excel file __Metabolizer<sup>c</sup>__ instead of __Metabolizer__.
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/genetable4.png)
Remove any extra characters by performing a __find and replace__ in Excel (*Instructions on performing a find-and-replace in Excel can be found at the bottom of this document*). Additionally, spelling errors can sometimes exist. In the UGT1A1 excel file, we see that some rows incorrectly spell __Metabolizer__ as __Metazolizer__. Make sure to correct any spelling errors.
5. Open the __CPIC_GPWizard.py__ file and find the global variable called `KOFILE` on line 46. Change the text `name` to the name of your computers home directory.
6. Open the terminal command line and type the following: `python3 CPIC_GPWizard.py <drug_name_diplotype_phenotype_table>`
7. If successful, the new KO should now reside in your computers activators shelf. Type `cd users/name/activator/shelf` on the command line, then type `ls` to check if new file exists.

### Step 2: Using the Genotype to Phenotype KO
1. First we will run the activator. Open the terminal and go to the directory where the activator is stored. Type the following code into the command-line: `java -jar <name_of_activator`.
2. Once the activator is successfully running, start up postman.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/PostManGraphicSmall.png)
3. Check that KO is recognized by the activator by making the following __GET__ request.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/getrequest.png)
4. Go to the __Headers__ tab and create a key __Accept__ and value __application/json__.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/keyvalue.png)
5. Click send. If successful, the contents of the KO will be returned as the output.
6. Now that we know the KO has been detected in the shelf, we are ready to create a __POST__ request. The following is a post request for the CYP2D6 KO.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/postrequest.png)
7. Go to the __Headers__ tab and create a key __Content-Type__ and value __application/json__.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/contenttype.png)
8. Go to the __Body__ tag and create the content for the post. It should be structured in the following dictionary format `{"diplotype": "", "allele1": "", "allele2": ""}`. Fill in the pair values with the appropriate genotype information. For example, the following is the post content for CYP2D6 KO.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/bodyraw.png)
9. Click send. If successful, a metabolic phenotype should be returned. Here is a sample output from the previous post request.  
![alt text](https://github.com/kgrid/CPIC-objects/blob/master/Make_KO/images/postresult.png)

### Find-and-Replace
1. Go to the excel menu bar and click __edit__. 
2. Go to where it says __find__ which will open additional choices.
3. Click __replace__. This should open a new window. 
4. Under __Find what:__ enter in the text we want to replace. 
5. Under __Replace with:__ enter in the new text of interest. 
6. Click __Replace All__ to complete the find and replace. 
