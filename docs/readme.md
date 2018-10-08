# CPIC Collection of KOs

[![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)
[![CircleCI](https://circleci.com/gh/kgrid-objects/cpic-collection.svg?style=svg)](https://circleci.com/gh/kgrid-objects/cpic-collection)

This is a collection of objects that focus on dosing guidelines as provided by the [CPIC pharmacogenomic guidelines](https://cpicpgx.org/guidelines/). These objects generally take allele pairs as inputs and return the corresponding drug selection or dosing guideline recommendation based on a patient's alleles.


## Status
The current release of CPIC collection of knowledge objects is [![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)

This release contains 37 KOs, including 28 drug recommendation KOs, 7 geno-to-pheno KOs and two look-up table KOs.

The collection of CPIC KOs can be easily deployed through [CPIC Kit](https://demo.kgrid.org/cpic-kit/).

## CPIC Knowledge Objects (KO)

### CPIC KO Design
 CPIC collection consists of three types of KOs:

#### Geno-to-Pheno

  This type of KO is gene-specific. It will determine the phenotype based on the gene's diplotypes

  There are two groups within this type of KO:
  * CYP2D6, CYP2C19 and UGT1A1: Each gene has a spreadsheet mapping the dipltotype directly to the phenotype;

  * CYP2C9, CYP3A5, SLCO1B1 and TPMT: Each gene has a allele-definition spreadsheet for the functional status of the allele. The alleles in the diplotype are checked on the functional status. The likely phenotype is then determined based on the functional status of both alleles.

  Endpoint:       ` /phenotype`

  Input Example:
  ```json
  { "CYP2D6" : "*1/*1" }
  ```

  Output Example (Only the `result` of the response is shown):
  ```json
  {
    "CYP2D6": {
      "diplotype": "*1/*1",
      "phenotype": "Normal metabolizer"
    }
  }
  ```

#### Drug recommendations

  The drug recommendation KO is drug-specific. It will provide the recommendation based on the information of relevant gene(s). The combination of information includes:

  * single gene allele
  * multiple gene allele
  * one gene allele and one gene phenotype
  * single gene phenotype
  * multiple gene phenotypes

  The drug recommendation KO will take the phenotype panel as input, extract the needed gene and provide recommendation output.

  Endpoint:       ` /dosingrecommendation`

  Input Example:
  ```json
  {
    "CYP2C19": {
        "diplotype": "*1/*1",
        "phenotype": "Normal metabolizer"
    },
    "CYP2D6": {
      "diplotype": "*1/*1",
      "phenotype": "normal metabolizer"
    },
    ...
  }
  ```

  Output Example (Only the `result` of the response is shown):
  ```json
  {
    "type": "CPIC Recommendation",
    "drug": "Codeine",
    "genes": {
      "CYP2D6": {
        "diplotype": "*1/*1",
        "phenotype": "normal metabolizer"
      }
    },
    "recommendation": {
      "implication": "Normal morphine formation",
      "content": "Use label-recommended age- or weight-specific dosing.",
      "classification": "Strong"
    }
  }
  ```

#### Look-up table

  The look-up table KO provides the KO ark ids for either the genes or the drugs of interest.

  Endpoint for geno-to-pheno table:   `/genophenokolist`

  Input for geno-to-pheno table:

  ```json
  {
     "CYP2D6":"",
     "CYP2C19":"",
     "UGT1A1":"",
     ...
   }
   ```

   Output for geno-to-pheno table:

   ```json
   {
    "CYP2D6": "/99999/fk49z9gr7p/v0.0.6",
    "CYP2C19": "/99999/fk4mc97w0h/v0.0.4",
    "UGT1A1": "/99999/fk47h1x090/v0.0.4",
    ...
   }
   ```

   Endpoint for drug list table:   `/druglist`

   Input for drug list table:

   ```json
   {
     "codeine": "",
     "atazanavir": "",
     ...
   }
   ```

   Output for drug list table:

   ```json
    {
      "codeine": "/99999/fk4mc97w6m/v0.0.5",
      "atazanavir": "/99999/fk4d79nq4z/v0.0.5",
      ...
    }
   ```

   Note: For drug list table, a input of empty object `{}` will produce the output containing the list of all available KOs.

### CPIC KO Descriptions

#### Genotype to Phenotype

Currently, the following genes' phenotypes can be determined based on their diplotypes by the respective knowledge objects, as included in the cpic-kit.

1. [CYP2C19](https://library.kgrid.org/#/object/99999%2Ffk4mc97w0h%2Fv0.0.4)

1. [CYP2C9](https://library.kgrid.org/#/object/99999%2Ffk4bv8qb3r%2Fv0.0.1)

1. [CYP2D6](https://library.kgrid.org/#/object/99999%2Ffk49z9gr7p%2Fv0.0.6)

1. [CYP3A5](https://library.kgrid.org/#/object/99999%2Ffk4md04x9z%2Fv0.0.1)

1. [SLCO1B1](https://library.kgrid.org/#/object/99999%2Ffk47380j09%2Fv0.0.1)

1. [TPMT](https://library.kgrid.org/#/object/99999%2Ffk4vq45s09%2Fv0.0.1)

1. [UGT1A1](https://library.kgrid.org/#/object/99999%2Ffk47h1x090%2Fv0.0.4)

#### Drug Recommendation

Currently, the following drug recommendations are available as knowledge objects and included in the CPIC-kit.

1. [Abacavir (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk45m7fn9t%2Fv0.0.1)

1. [Allopurinol (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4058s74p%2Fv0.0.1)

1. [Amitriptyline (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4t167482%2Fv0.0.1)

1. [Atazanavir (based on UGT1A1 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d79nq4z%2Fv0.0.5)

1. [Azathioprine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4r225c4h%2Fv0.0.1)

1. [Carbamazepine (based on HLA-A and HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4mw3nw5p%2Fv0.0.1)

1. [Citalopram (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d22836k%2Fv0.0.5)

1. [Clomipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4w67pr0f%2Fv0.0.1)

1. [Clopidogrel (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4bz6hp15%2Fv0.0.5)

1. [Codeine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4mc97w6m%2Fv0.0.5)

1. [Desipramine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4rf6zx6d%2Fv0.0.1)

1. [Doxepin (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4sf40t7f%2Fv0.0.1)

1. [Escitalopram (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d22836l%2Fv0.0.5)

1. [Fluvoxamine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Fcp4mc9723sd%2Fv0.0.1)

1. [Imipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4d51vd1p%2Fv0.0.1)

1. [Mercaptopurine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4m91fj9z%2Fv0.0.1)

1. [Nortriptyline (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk44n0ds5c%2Fv0.0.1)

1. [Ondansetron (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4c83hw23%2Fv0.0.1)

1. [Oxcarbazepine (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4qc17m5z%2Fv0.0.1)

1. [Paroxetine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Fcp4mc9723se%2Fv0.0.1)

1. [Phenytoin (based on CYP2C9 phenotype and HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4qz3fz89%2Fv0.0.1)

1. [Sertraline (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk40k3kt35%2Fv0.0.1)

1. [Simvastatin (based on SLCO1B1 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4m95ek9z%2Fv0.0.1)

1. [Tacrolimus (based on CYP3A5 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4t85em9x%2Fv0.0.1)

1. [Thioguanine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4cx5fm8f%2Fv0.0.1)

1. [Trimipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4jw9m41b%2Fv0.0.1)

1. [Tropisetron (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4fn2d721%2Fv0.0.1)

1. [Voriconazole (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4cz4fm8f%2Fv0.0.1)


### Deploying the CPIC KOs

CPIC KOs are individually available for access and deployment.

The collection of CPIC KOs can also be easily deployed through [CPIC Kit](https://demo.kgrid.org/cpic-kit/). The kit packages Activator, Library and CPIC Demo Site. The kit is designed as a personal CPIC Knowledge Grid used to explore the capabilities of KGrid and CPIC Knowledge Objects.


### Trying the CPIC KOs

From this guide, you can follow the step-by-step instruction to try these CPIC KOs:
- Click on the gene or drug from the KO list. The link will open the KO page in the library.
- Click on 'Live Demo'. The library will deploy the KO to the default activator or your choice and provide the links for trying the KO in Swagger UI
- Click on the selected link will open the KO's service description in Swagger UI or Swagger Editor. ([More information on Swagger UI](https://swagger.io/tools/swagger-ui/))


### Workflow for using CPIC KOs

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


## Development

### Testing

#### Unit Tests
The KO Unit Test are located in the `/tests` directory.  These tests utilize
[Jest](https://jestjs.io/) and  [rewire](https://github.com/jhnns/rewire). Jest provides the testing
framework and rewire allows the tests to access the javascript function without the
convenience of the export modules (KGrid Javascript adapter limitation).  You can execute the tests via npm

```
npm test
```

### Integration Tests
We test the CPIC KO endpoints in a KGrid Activator instance using [Postman](https://www.getpostman.com/) and
[Newman](https://www.npmjs.com/package/newman). The CPIC integration tests are defined in the
`/tests/postman/cpic_integration_tests.postman_collection.json`.The CI script uses the
[start server and test](https://www.npmjs.com/package/start-server-and-test) library to:
1. downloads the latest KGrid Activator
1. runs the activator with the CPIC KOs
1. runs the [Postman](https://www.getpostman.com/) collection defined as the CPIC integration tests
  using  [Newman](https://www.npmjs.com/package/newman)

```
npm run ci
```

### Performance Tests

We have some performance/load testing scripts that utilize k6, a load testing tool.  Details on CPIC load/performance testing can be found in the [k6 readme](/k6/)

### Packaging

CPIC Knowledge Objects, just as other KOs, can be compressed individually into zip file, and then deposited into a KGrid library, for example, [KGRID Sandbox Library](https://library.kgrid.org)

CPIC Knowledge Objects are released in as a collection in the form of a single zip file,  such as `cpic-all.zip` on [GitHub release](https://github.com/kgrid-objects/cpic-collection/releases/latest)