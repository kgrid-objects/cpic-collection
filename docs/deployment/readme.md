# Deployment of CPIC Collection

This document provides the detailed instructions to deploy the CPIC collection to the KGrid Activator. Once activated, the KOs will be accessible through the web API service.

Please refer to [Get Started Guide (Developer's Guide)](https://kgrid.org/guides/developer/) for the information on how to install and start the Kgrid Activator.


## Deploying the CPIC KOs

With the KGrid Activator running, presumably on http://localhsot:8080, there are two ways to deploy the CPIC collection KOs.

- Deploy the collection using manifest.json

A JSON object can be posted to `{{url}}/kos/manifest` containing the manifest of CPIC KOs as following:

```
{
  "manifest": [
 	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-cp4mc9723sd-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-cp4mc9723se-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4058s74p-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk40k3kt35-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk44n0ds5c-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk45m7fn9t-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk47380j09-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk47h1x090-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk49z9gr7p-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk49z9gr7p-v0.0.4.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4bv8qb3r-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4bz6hp15-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4c83hw23-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4cx5fm8f-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4cz4fm8f-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4d22836k-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4d22836l-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4d51vd1p-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4d79nq4z-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4fn2d721-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4jw9m41b-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4m91fj9z-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4m95ek9z-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4mc97w0h-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4mc97w6m-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4md04x9z-0.1.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4mw3nw5p-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4qc17m5z-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4qj7sz2s-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4qj7sz2t-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4qz3fz89-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4r225c4h-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4rf6zx6d-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4sf40t7f-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4t167482-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4t85em9x-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4vq45s09-v0.2.0.zip",
	"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4w67pr0f-v0.2.0.zip"
  ]
}

```

The KGrid Activator will download all zip files and activate the KOs.


- CPIC KOs are also individually available.

A packaged KO ( in zip format) can be posted to `{{url}}/kos`.



For details, please refer to [Activator API - Import Knowledge Objects](https://kgrid.org/guides/swagger/#/Knowledge%20Object%20Import)


## Trying the CPIC KOs

- `{{url}}/endpoitns` will list all endpoints from the activated KOs;
- You can find the endpoint of interest and locate the link for Swagger Editor loaded with the service specification
- Following the selected link will open the KO's service description in Swagger UI or Swagger Editor. ([More information on Swagger UI](https://swagger.io/tools/swagger-ui/))
- Clicking on `Try it Out` will provide the UI to interact with the endpoint.

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
