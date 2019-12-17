# CPIC Collection of KOs

[![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)
[![CircleCI](https://circleci.com/gh/kgrid-objects/cpic-collection.svg?style=svg)](https://circleci.com/gh/kgrid-objects/cpic-collection)

This is a collection of digital Knowledge Objects (KOs) that focus on dosing guidelines as provided by the [CPIC pharmacogenomic guidelines](https://cpicpgx.org/guidelines/). These KOs generally start by accepting pharmacogene allele pairs as inputs and, after mapping those allele pairs to drug metabolism phenotypes, return the corresponding phenotype-specific drug selection or drug dosing guideline recommendation from CPIC based on an individual patient's alleles.


## Status
The current release of CPIC collection of knowledge objects is [![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)

This release contains 37 KOs, includihg 7 gene-specific genotype to phenotype (geno-to-pheno) KOs, 28 drug-specific CPIC recommendation KOs, and 2 KGrid look-up table KOs. (The two look-up table KOs enable software application developers to look-up which KO corresponds to a specific gene or drug, respectively. Drug names or gene names are mapped by these KOs to persistent unique identifers for the other 35 KOs in this CPIC Collection of KOs.)

## What's new
  As of November 2019, the CPIC collection has been updated and released with the new KO structure. For detail of the changes, please refer to [KGrid Guides](https://kgrid.org/guides/latest/)

  To deploy the CPIC collection, a KGRID Activator with version 1.1.5 or greater is needed. A suitable KGRID Activator is available here [KGrid Activator](https://github.com/kgrid/kgrid-activator/releases/tag/1.1.5)

## CPIC Knowledge Objects (KO)

### CPIC KO Design
 CPIC collection consists of three types of KOs:

#### Geno-to-Pheno KOs

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
    "CYP2D6": "/99999/fk49z9gr7p",
    "CYP2C19": "/99999/fk4mc97w0h",
    "UGT1A1": "/99999/fk47h1x090",
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
      "codeine": "/99999/fk4mc97w6m",
      "atazanavir": "/99999/fk4d79nq4z",
      ...
    }
   ```

   Note: For drug list table, a input of empty object `{}` will produce the output containing the list of all available KOs.

### CPIC KO Descriptions

#### Genotype to Phenotype

Currently, the following genes' phenotypes can be determined based on their diplotypes by the respective knowledge objects.

1. [CYP2C19](https://library.kgrid.org/#/object/99999%2Ffk4mc97w0h)

1. [CYP2C9](https://library.kgrid.org/#/object/99999%2Ffk4bv8qb3r)

1. [CYP2D6](https://library.kgrid.org/#/object/99999%2Ffk49z9gr7p)

1. [CYP3A5](https://library.kgrid.org/#/object/99999%2Ffk4md04x9z)

1. [SLCO1B1](https://library.kgrid.org/#/object/99999%2Ffk47380j09)

1. [TPMT](https://library.kgrid.org/#/object/99999%2Ffk4vq45s09)

1. [UGT1A1](https://library.kgrid.org/#/object/99999%2Ffk47h1x090)

#### Drug Recommendation

Currently, the following drug recommendations are available as knowledge objects.

1. [Abacavir (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk45m7fn9t)

1. [Allopurinol (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4058s74p)

1. [Amitriptyline (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4t167482)

1. [Atazanavir (based on UGT1A1 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d79nq4z)

1. [Azathioprine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4r225c4h)

1. [Carbamazepine (based on HLA-A and HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4mw3nw5p)

1. [Citalopram (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d22836k)

1. [Clomipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4w67pr0f)

1. [Clopidogrel (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4bz6hp15)

1. [Codeine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4mc97w6m)

1. [Desipramine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4rf6zx6d)

1. [Doxepin (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4sf40t7f)

1. [Escitalopram (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4d22836l)

1. [Fluvoxamine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Fcp4mc9723sd)

1. [Imipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4d51vd1p)

1. [Mercaptopurine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4m91fj9z)

1. [Nortriptyline (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk44n0ds5c)

1. [Ondansetron (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4c83hw23)

1. [Oxcarbazepine (based on HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4qc17m5z)

1. [Paroxetine (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Fcp4mc9723se)

1. [Phenytoin (based on CYP2C9 phenotype and HLA-B allele information)](https://library.kgrid.org/#/object/99999%2Ffk4qz3fz89)

1. [Sertraline (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk40k3kt35)

1. [Simvastatin (based on SLCO1B1 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4m95ek9z)

1. [Tacrolimus (based on CYP3A5 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4t85em9x)

1. [Thioguanine (based on TPMT phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4cx5fm8f)

1. [Trimipramine (based on CYP2C19 and CYP2D6 phenotypes)](https://library.kgrid.org/#/object/99999%2Ffk4jw9m41b)

1. [Tropisetron (based on CYP2D6 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4fn2d721)

1. [Voriconazole (based on CYP2C19 phenotype)](https://library.kgrid.org/#/object/99999%2Ffk4cz4fm8f)


## Deployment of CPIC KOs

Please refer to [the instruction page](./deployment) for deploying and using the collection of CPIC KOs.


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


### Packaging

CPIC Knowledge Objects, just as other KOs, can be compressed individually into zip file, and then deposited into a KGrid library, for example, [KGRID Sandbox Library](https://library.kgrid.org)

CPIC Knowledge Objects are released on [GitHub release](https://github.com/kgrid-objects/cpic-collection/releases/latest)
