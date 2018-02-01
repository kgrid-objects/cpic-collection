# Running a CPIC Knowledge Object
*last updated 2/01/2018*

### CPIC genotype to phenotype
1. All CPIC genotype to phenotype KO will be named `<GENENAME>-Object`
2. Download a KO of interest and store in the local shelf
3. Start up the activator and run postman
4. Type a post command to the KO. Will look something like the following:  `localhost:8080/knowledgeObject/ark:/<GENENAME>/object/result`
5. Send the following request in this format:  `{"diplotype": "", "allele1": "", "allele2": ""}`  