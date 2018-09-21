[![GitHub release](https://img.shields.io/github/release/kgrid/cpic-objects.svg)](https://github.com/kgrid/cpic-objects/releases/)
[![CircleCI](https://circleci.com/gh/kgrid-objects/cpic-objects.svg?style=svg)](https://circleci.com/gh/kgrid-objects/cpic-objects)

This is a collection of objects that focus on dosing guidelines as provided by the [CPIC pharmacogenomic guidelines](https://cpicpgx.org/guidelines/). These objects generally take allele pairs as inputs and return the corresponding drug selection or dosing guideline recommendation based on a patient's alleles.
 
## Table of Contents
* [Status](#status)
* [CPIC Knowledge Objects](#cpic-knowledge-objects)
  * [KO Design](#cpic-ko-design)
  * [Running the KOs](#running-cpic-ko)
* [Development](#development)
  * [Testing](#testing)
  * [Continuous Integration](#continuous_integration)
  * [Packaging](#Packaging)
 
## Status
Talk about the objects completed and objects we are working on, if we have and idea of roadmap

## CPIC Knowledge Objects (KO)

### CPIC KO Design 
 (code, api, workflow)
 
### Using the CPIC KOs
[CPIC Kit](https://demo.kgrid.org/cpic-kit/) - KGrid CPIC Kit packages Activator, Library and CPIC Demo Site. The kit is designed as a personnel CPIC Knowledge Grid used to explore the capablities of KGrid and CPIC Knowlege Objects.

[Swagger UI]  

Tests

### CPIC KO Descriptions

#### Genotype to Phenotype 

**CYP2D6 Genotype to Phenotype**

* [Demo Activator](https://activator.kgrid.org/99999/fk4mc97w6m)
* Demo Swagger UI


#### Drug Recommendation 

Atazanavir based on UGT1A1 and phenotype fk4d79nq4z

Allopurinol based on HLA-B and phenotype fk4058s74p

Abacavir based on HLA-B and phenotype fk45m7fn9t

Clopidogrel based on CYP2C19 and phenotype fk4bz6hp15

Ondansetron based on CYP2D6 and phenotype fk4c83hw23

Citalopram  based on CYP2C19 and phenotype fk4d22836k

Escitalopram based on CYP2C19 and phenotype fk4d22836l


## Development

### Testing

#### Unit Tests
The KO Unit Test are located in the [tests directory](./tests).  These tests utilize 
[Jest](https://jestjs.io/) and  [rewire](https://github.com/jhnns/rewire). est provides the testing 
framework and rewire allows the tests to access the javascript function without the 
convienace of the export modules (KGrid Javascript adaptor limitation).  The [tests](../tests) are in 
the tests directory.  You can execute the tests via npm

```
npm test
```

#### Performance Testing
We have some performance/load testing scripts that utilize k6, a load testing tool.  Details on CPIC 
load/perforance testing can be found in the [k6 readme](/tests/k6/readme.md)

### Continuous Integration

### Packaging

