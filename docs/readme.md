# CPIC Collection of KOs

[![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)
[![CircleCI](https://circleci.com/gh/kgrid-objects/cpic-collection.svg?style=svg)](https://circleci.com/gh/kgrid-objects/cpic-collection)

This is a collection of digital Knowledge Objects (KOs) that focus on dosing guidelines as provided by the [CPIC pharmacogenomic guidelines](https://cpicpgx.org/guidelines/). These KOs generally start by accepting pharmacogene allele pairs as inputs and, after mapping those allele pairs to drug metabolism phenotypes, return the corresponding phenotype-specific drug selection or drug dosing guideline recommendation from CPIC based on an individual patient's alleles.


## Status
The current release of CPIC collection of knowledge objects is [![GitHub release](https://img.shields.io/github/release/kgrid-objects/cpic-collection.svg)](https://github.com/kgrid-objects/cpic-collection/releases/)

This release contains 38 KOs, including 8 gene-specific genotype to phenotype (geno-to-pheno) KOs, 28 drug-specific CPIC recommendation KOs, and 2 KGrid look-up table KOs. (The two look-up table KOs enable software application developers to look-up which KO corresponds to a specific gene or drug, respectively. Drug names or gene names are mapped by these KOs to persistent unique identifers for the other 35 KOs in this CPIC Collection of KOs.)

## What's new
  As of November 2019, the CPIC collection has been updated and released with the new KO structure. For detail of the changes, please refer to . . .  [KGrid Guides](https://kgrid.org/guides/latest/)

  To deploy the CPIC collection, a KGRID Activator with version 1.5.0 or greater is needed. A suitable KGRID Activator is available at this location . . .  [KGrid Activator](https://github.com/kgrid/kgrid-activator/releases/tag/kgrid-activator-1.5.2)

## CPIC Knowledge Objects (KO)

### CPIC KO Design
 This CPIC Collection of KOs consists of three different types of KOs:

#### Geno-to-Pheno KOs

  The purpose of geno-to-pheno KOs is to map patient-specific germline genotypes for pharmacogenes to expected, evidence-based, clinically-relevant drug metabolism phenotypes. Pharmacogenomic clinical recommendations are phenotype specific. Therefore, geno-to-pheno KOs are needed for determining phenotypes prior to generating any specific drug selection or drug dosing recommendations.
  
  As the name implies, geno-to-pheno KOs are gene-specific. For 7 different genes, the API-based services provided by these 7 KOs can return an expected phenotype based on on genetic lab results for 7 genes, when those lab results are input in the form of a single patient's diplotype.

  There are two sub-groups of geno-to-pheno KOs:
  * CYP2D6, CYP2C19 and UGT1A1: Each gene has a spreadsheet mapping the dipltotype directly to the expected phenotype;

  * CYP2C9, CYP3A5, SLCO1B1 and TPMT: Each gene has a allele-definition spreadsheet for the functional status of the allele. The alleles in the diplotype are checked on the functional status. The likely phenotype is then determined based on the functional status of both alleles.

  Endpoint:       ` /phenotype`

  Input Example (where the patient diplotype for the gene CYP2D6 is represented using star alleles):
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
  Note that the phenotype returned by a geno-to-pheno KO takes the form of a text string, e.g., "Normal metabolizer". These phenotype text strings conform to the CPIC standard vocabularly for describing clinically-relevant, gene-specific, drug metabolism phenotypes. 
  
  Not all valid diplotypes for the 7 genes associated with these KOs will return an expected phenotype. In some cases, expected phenotypes are unknown and, in those cases, the "phenotype" output from a geno-to-pheno KO API service interaction will be returned as "Unknown".

#### Drug recommendation KOs

  Drug recommendation KOs are all drug-specific. They provide CPIC's evidence-based recommendations based in most cases on a patient's germline phenotype for one or more relevant pharmacogene(s). In a few cases, a genetic lab test result, in the form of a diplotype, can be used directly to generate a CPIC recommendation (e.g., when a specific HLA-B diplotype is contraindication for exposure to the drug abacavir.) 
  
  Because the drug recommendation KOs work in more than one way, the structure and content of the inputs to drug recommendation KOs differ. Below, we show the primary set of inputs that most of the drug recommendation KOs use. Most drug recommendation KOs use phenotype information to generate drug-specific recommendations.

  The drug recommendation KO will take a phenotype panel (i.e., one or more gene-specific phenotypes) as input, extract the needed gene and provide CPIC drug selection or drug dosing recommendations as output.

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

  Each recommendation provided as output from the API-based services enabled by these KOs has three parts, all of which come from CPIC guidelines. The first part is the "implication." This part tells about drug metabolism in general. The second part is "content". The content carries the actual text of a CPIC recommendation for clinical medication use. The third part is the "classification", which conveys the class (or strength) of evidence. 

#### Look-up table KOs

  The two look-up table KOs provide the persistent unique identifiers (PUIDs) for the other CPIC KOs in this collection. These look-up table KOs are meant to help application developers find which KOs are associated either with a specific gene or with a specific drug. In this case, for KGrid, the PUIDs are Archive Resource Key (ARK) identifiers. ARK identifiers are described in more detail here . . . [ARK IDs Explained](https://n2t.net/e/ark_ids.html)

  Endpoint for look-up table KO for geno-to-pheno KOs:   `/genophenokolist`

  Input for look-up table for geno-to-pheno KOs:

  ```json
  {
     "CYP2D6":"",
     "CYP2C19":"",
     "UGT1A1":"",
     ...
   }
   ```

   Output from look-up table for geno-to-pheno KOs (the ARK identifiers in use all begin with /99999/):

   ```json
   {
    "CYP2D6": "/99999/fk49z9gr7p",
    "CYP2C19": "/99999/fk4mc97w0h",
    "UGT1A1": "/99999/fk47h1x090",
    ...
   }
   ```

   Endpoint for look-up table for drug specific KOs:   `/druglist`

   Input for look-up table for drug-specific KOs:

   ```json
   {
     "codeine": "",
     "atazanavir": "",
     ...
   }
   ```

   Output for drug list table (the ARK identifiers in use all begin with /99999/):

   ```json
    {
      "codeine": "/99999/fk4mc97w6m",
      "atazanavir": "/99999/fk4d79nq4z",
      ...
    }
   ```

   Note: For look-up table for drug-specific KOs, an input of empty object `{}` will produce the output containing the entire list of all available KOs from the service of either look-up table KO.
   

### CPIC KO Descriptions

#### Genotype to Phenotype KOs

Currently, the following genes' phenotypes can be determined based on their diplotypes by these KOs:

1. CYP2C19

1. CYP2C9

1. CYP2D6

1. CYP3A5

1. SLCO1B1

1. TPMT

1. UGT1A1
   
1. CYP2D6-V1

#### Drug Recommendation KOs

Currently, the following drug recommendations are available as knowledge objects.

1. Abacavir (based on HLA-B allele information)

1. [Allopurinol (based on HLA-B allele information)

1. [Amitriptyline (based on CYP2C19 and CYP2D6 phenotypes)

1. [Atazanavir (based on UGT1A1 phenotype)

1. [Azathioprine (based on TPMT phenotype)

1. [Carbamazepine (based on HLA-A and HLA-B allele information)

1. [Citalopram (based on CYP2C19 phenotype)

1. [Clomipramine (based on CYP2C19 and CYP2D6 phenotypes)

1. [Clopidogrel (based on CYP2C19 phenotype)

1. [Codeine (based on CYP2D6 phenotype)

1. [Desipramine (based on CYP2C19 and CYP2D6 phenotypes)

1. [Doxepin (based on CYP2C19 and CYP2D6 phenotypes)

1. [Escitalopram (based on CYP2C19 phenotype)

1. [Fluvoxamine (based on CYP2D6 phenotype)

1. [Imipramine (based on CYP2C19 and CYP2D6 phenotypes)

1. [Mercaptopurine (based on TPMT phenotype)

1. [Nortriptyline (based on CYP2C19 and CYP2D6 phenotypes)

1. [Ondansetron (based on CYP2D6 phenotype)

1. [Oxcarbazepine (based on HLA-B allele information)

1. [Paroxetine (based on CYP2D6 phenotype)

1. [Phenytoin (based on CYP2C9 phenotype and HLA-B allele information)

1. [Sertraline (based on CYP2C19 phenotype)

1. [Simvastatin (based on SLCO1B1 phenotype)

1. [Tacrolimus (based on CYP3A5 phenotype)

1. [Thioguanine (based on TPMT phenotype)

1. [Trimipramine (based on CYP2C19 and CYP2D6 phenotypes)

1. [Tropisetron (based on CYP2D6 phenotype)

1. [Voriconazole (based on CYP2C19 phenotype)

## Deployment of CPIC KOs

Please refer to [the instruction page](./deployment) for deploying and using the collection of CPIC KOs.
