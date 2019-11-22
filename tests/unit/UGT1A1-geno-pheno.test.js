const rewire = require('rewire');
const script = rewire('../../collection/CPIC Genotype - Phenotype for UGT1A1/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct UGT1A1 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return normal metabolizer', () => {
    inputList.UGT1A1 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Normal metabolizer");
  });

  it('Should return intermediate metabolizer', () => {
    inputList.UGT1A1 = "*1/*27";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Intermediate metabolizer");
  });

  it('Should return poor metabolizer', () => {
    inputList.UGT1A1 = "*27/*27";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Poor metabolizer");
  });

  it('Should fail if no genotype', () => {
    inputList.UGT1A1 = "";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Unknown");
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.UGT1A1 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Unknown");
  });

  it('Should fail if no UGT1A1 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Unknown");
  });

  it('Should ignore other gene fields', () => {
    inputList.UGT1A1 = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.UGT1A1.phenotype).toEqual("Normal metabolizer");
  });

});
