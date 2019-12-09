# Deployment of CPIC Collection

## Deploying the CPIC KOs

CPIC KOs are individually available for access and deployment.

Deployment The collection of CPIC KOs can also be easily deployed through [KGrid CLI](https://kgrid.org/kgrid-cli/).


## Trying the CPIC KOs

From this guide, you can follow the step-by-step instruction to try these CPIC KOs:
- Click on the gene or drug from the [KO list](../#cpic-ko-descriptions). The link will open the KO page in the library.
- Click on 'Live Demo'. The library will deploy the KO to the default activator or your choice and provide the links for trying the KO in Swagger UI
- Click on the selected link will open the KO's service description in Swagger UI or Swagger Editor. ([More information on Swagger UI](https://swagger.io/tools/swagger-ui/))


## Workflow for using CPIC KOs

Here is an example workflow showing how the CPIC KOs is used:

  1. Start a patient's genetic panel;
  1. Use the genetic panel as input to retrieve the geno-to-pheno KO ids from the geno-to-pheno look-up table KO;
  1. Send an object with drug information as input to retrieve all recommendation KO ids from the recommendation look-up table KO;
  1. Send the genetic panel to each geno-to-pheno KO to determine the phenotype for the respective gene;
  1. Aggregate the results from the geno-to-pheno KOs and send to each recommendation KO;
  1. Each recommendation KO will return the recommendation if required genetic information is available in input.

In Step 3, different inputs can be used for different scenarios, such as:

  * Use an empty object `{}` as input, to check all relevant drugs' dosing recommendations

  * Use an object containing the patient's current prescription e.g.`{"codeine":"", ...}` as input, to check the dosing recommendations

  * Use an object containing a specific drug, e.g.`{"codeine":""}` as input, to check the dosing recommendations for the drug of interest
