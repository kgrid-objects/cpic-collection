const rewire = require('rewire');
const script = rewire('../../collection/CPIC Genotype - Phenotype for TPMT/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct TPMT phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return normal activity', () => {
    inputList.TPMT = "*1/*1";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual("Normal activity");
  });

  it('Should return intermediate activity', () => {
    inputList.TPMT = "*1/*2";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual("Intermediate activity");
  });

  it('Should return low activity', () => {
    inputList.TPMT = "*1/*3";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual("Low activity");
  });

  it('Should fail if no genotype', () => {
    inputList.TPMT = "";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual(undefined);
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.TPMT = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual(undefined);
  });

  it('Should fail if no TPMT gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    expect(()=>{phenotype(inputList);})
    .toThrow(new TypeError("Cannot read property 'split' of undefined"));
  });

  it('Should ignore other gene fields', () => {
    inputList.TPMT = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.TPMT.phenotype).toEqual("Normal activity");
  });

});
