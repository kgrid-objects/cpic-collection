# Building a CPIC Knowledge Object
*last updated 02/21/2018*

**Important Notice:**
The following instructions are designed primarily for Mac users. Window users may need to have bash installed and configured before following these steps. 
The following link will pull up instructions on installing [bash](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

Once bash is installed, make sure `pip3` installer has been installed and updated to be the latest version. If you are running Python 2.7.9+ or Python 3.4+, `pip3` should already be installed. 

To install `pip`, enter the following in the bash command-line: `sudo apt-get install python3-pip`

Once pip3 is installed, enter the following command to the bash commmand-line to install the xlrd module: `pip3 install xlrd`  
(*NOTE: This module is crucial for the Wizard to read in excel formatted files.*) 

The following instructions assumes that you have ran a KO in the past. To proceed with these instructions, you need to have:
1. The latest version of [postman](https://www.getpostman.com/)
2. The latest version of the [activator](https://github.com/kgrid/kgrid-activator/releases)
3. The latest version of the [adapter](https://github.com/kgrid/python-adapter/releases)
4. Configured the proper repositories and files on your local machine: 
  * `/users/name/activator/shelf` (*where the KO is stored*)
  * `/users/name/activator/adapter` (*where the adapter is stored*)

We are now ready to create our first CPIC KO using the CPIC Wizard.

### Part1: Making the Genotype to Phenotype KO
1. Go to kgrids [github](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the latest CPIC Wizard file `CPIC_GPWizard(v1.0).py` onto your local repository.
2. Retrieve and download a official diplotype to phenotype excel table from the [CPIC website](https://cpicpgx.org/genes-drugs/). Scroll down to see a list of genes, and click on the corresponding `Guideline` link. Find and download the `<drug_name>_diplotype_phenotype_table` (*NOTE: Not all genes will have this information*). Be sure to save this file in the same directory as the CPIC Wizard.
3. Open the excel file and check that it is formatted correctly. Sometimes special characters like superscripts remain, for example: `Metabolizerc` instead of `Metabolizer`. Remove any extra characters by performing a find and replace. (*Instructions on performing find-and-replace on Excel can be found below*)
4. Open the `CPIC_GPWizard(v1.0).py` file and find the global variable called `KOFILE` on line 49. Change the text `name` to the name of your computers home directory.
5. Open the terminal command line and type the following: `python3 CPIC_GPWizard(v1.0).py <Excel table of interest>`
6. If successful, the new KO should now reside in your local activators shelf. Type `cd users/name/activator/shelf` on the command line, then type `ls` to check if new file exists. (*NOTE: replace 'name' with your home directory title*)

### Part2: Using the Genotype to Phenotype KO
1. Open the terminal and run the activator. Go to the directory where the activator is stored and type the following: `java -jar most_recent_version_of_activator`.
2. Start up postman
3. Check that KO is recognized by making the following GET request:
`localhost:8080/shelf/`
4. Go to `Headers` tab and create a key `Accept` and value `application/json`. 
5. Click send. The KO should be returned. 
6. Now that we know the KO has be detected in the shelf, create a POST request: `localhost:8080/knowledgeObject/ark:/gene_name/object/result`
7. Go to `Headers` tab and create a key `Content-Typed` and value `application/json`.
8. Go to `Body` tag and create the following dictionary format request `{"diplotype": "", "allele1": "", "allele2": ""}`. Fill in the pair values with the appropriate genotype information.
9. Click send. If successful, a phenotype should be returned. 

### Find-and-Replace on Excel:
1. Go to the excel menu bar and click `edit`. 
2. Go to where it says `find` which will open additional choices.
3. Click `replace`. This should open a new window. 
4. Under `Find what:` enter in the text we want to replace. 
5. Under `Replace with:` enter in the new text of interest. 
6. Click `Replace All` to complete the find and replace. 
