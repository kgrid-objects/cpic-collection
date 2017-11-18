## Building a CPIC Knowledge Object
*last updated 11/17/2017*

**Important Notice:**
The following instructions are designed primarily for Mac users. Windows users may need to have bash installed and configured before following these steps. 

The following link will pull up instructions on installing [bash](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

Once bash is installed, make sure pip3 installer has been installed and updated to be the latest version.

Once pip3 is up and running, use the following command to install the xlrd module: `pip3 install xlrd`. This step is required to read in our excel file. 

We are now ready to create our first CPIC KO using the CPIC Wizard.

### Instructions:  
1. Go to kgrids [github](https://github.com/kgrid/CPIC-objects/tree/master/Make_KO) and download the file `CPIC_Wizard.py` to your local file.  
2. Retrieve and download a official diplotype to phenotype excel table from the CPIC website. Double check that it is saved in the following format: `<gene>_Diplotype_Phenotype_Table.xlsx`. Be sure to save this file in the same directory as `CPIC_Wizard.py`.
3. Open the excel file and check that it is formatted correctly. Sometimes special characters remain, such as `Metabolizerc` instead of `Metabolizer`. Remove these by manually performing a find and replace. **Instructions on performing find-and-replace on Excel can be found below**
4. Open the `CPIC_Wizard.py` file and find the global variable called `KOFILE` under KO contents. Change the text `name` to the name of your computers home directory.
5. If it does not already exist, be sure to create the directory `activator` in your home directory. Once the `activator` directory is created, open it to create another directory inside called `shelf`. This is where the complete KO will be stored. 
6. Run the following in the terminal command line: `python3 CPIC_Wizard.py <Excel table of interest>`
7. If successful, the newly made KO should now reside in your local actiators shelf. 

### Find-and-Replace on Excel:
1. Go to the excel menu bar and click `edit`. 
2. Go to where it says `find` which will open additional choices.
3. Click `replace`. This should open a new window. 
4. Under `Find what:` enter in the text we want to replace. 
5. Under `Replace with:` enter in the new text of interest. 
6. Click `Replace All` to complete the find and replace. 
