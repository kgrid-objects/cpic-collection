const rewire = require('rewire');
const script = rewire('../../collection/CPIC Genotype - Phenotype for CYP2C19/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct CYP2C19 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return normal metabolizer', () => {
    inputList.CYP2C19 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Normal metabolizer");
  });

  it('Should return intermediate metabolizer', () => {
    inputList.CYP2C19 = "*1/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Intermediate metabolizer");
  });

  it('Should return likely poor metabolizer', () => {
    inputList.CYP2C19 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Likely Poor metabolizer");
  });

  it('Should fail if no genotype', () => {
    inputList.CYP2C19 = "";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Unknown");
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.CYP2C19 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Unknown");
  });

  it('Should fail if no CYP2C19 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Unknown");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C19 = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C19.phenotype).toEqual("Normal metabolizer");
  });

});
