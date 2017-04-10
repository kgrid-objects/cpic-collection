# CPIC gudieline objects
This is a collection of objects that focus on dosing guidelines as provided by the CPIC pharmacogenomic guidelines. These objects generally take allele pairs as inputs and return the correct dosing guideline based on a patient's alleles.

## Testing
There are 2 ways you can run tests on the CPIC knowledge objects

### Postman method
There is a Postman collection provided in this repository for running tests on the CPIC knolwedge objects. To use this collection, download the CPIC-guideline-collection.json file from this repository. Then, open Postman and go to file > import and choose the .json file you downloaded. This will create a collection in Postman for you. Once you have the collection, go to Collection > runner and select the CPIC collection. Press the "Start Test" button to run the collection.

### Shell script method
This repository also has a shell script that can be used to test the knowledge objects. The shell script will also allow you to see the output from the knowledge objects. To run the script, download the runner.sh file in this repository into any directory you want. Then, open the command-line and navigate to that directory. From there, enter the command "sh runner.sh" (without the quotes) and the script will run
