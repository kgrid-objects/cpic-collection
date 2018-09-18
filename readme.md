# CPIC Knowledge Objects
[![GitHub release](https://img.shields.io/github/release/kgrid/cpic-objects.svg)](https://github.com/kgrid/cpic-objects/releases/)
[![CircleCI](https://circleci.com/gh/kgrid-objects/cpic-objects.svg?style=svg)](https://circleci.com/gh/kgrid-objects/cpic-objects)


This is a collection of objects that focus on dosing guidelines as provided by
 the [CPIC pharmacogenomic guidelines](https://cpicpgx.org/guidelines/). These objects generally 
 take allele pairs as inputs and return the corresponding drug selection or dosing guideline 
 recommendation based on a patient's alleles.
 
## Status
As of June 22, 2018, There are two knowledge objects developed for this collection.

- 99999-2d6codeine: CPIC CYP2D6 Codeine Recommendations
  - Converted from legacy KO in Library2 - ark:/99999/fk4mc97w6m)

- 99999-2d6genopheno: CPIC Genotype - Phenotype for CYP2D6
  - v0.0.1 Converted from legacy KO in Library2 - ark:/99999/fk4668rz5b;
  - v0.0.2 Converted from legacy KO in Library2 - ark:/99999/fk49z9gr7p;

Additional information about the legacy CPIC Knowledge Objects can be found in the [legacy readme](legacy_readme.md). 
There is also in the [etc](etc).

## Prerequisites
There are testing and packaging features in this project that require 
[npm](https://www.npmjs.com/get-npm) but this isn't needed use the CPIC Knowledge Objects


## Testing CPIC Knowledge

### Unit Tests

There are a set of tests for CPIC Knowledge Objects.  These are very simple tests but show 
how we could test.  They utilize [Jest](https://jestjs.io/) and  [rewire](https://github.com/jhnns/rewire). 
Jest provides the testing framework and rewire allows the tests to access the javascript function without the 
convince of the export modules (KGrid Javascript adaptor limitation).  The [tests](tests) are in the tests directory.  You can execute the tests via npm

```
npm test
```

### Integration Testing

You can now test the CPIC objects in an activator via a npm script. This script will download the 
latest released activator and start up the activator using the CPIC repository as it's shelf. 

Open a terminal window at the root of the cloned repository and run the following command.

```
npm run dev
```

## Package CPIC Knowledge

You can create zip file of the Cancer Risk Knowledge Objects which can be used to deposit to a KGrid 
Library or load/activate on a KGrid Activator. 

```
npm run package
```
