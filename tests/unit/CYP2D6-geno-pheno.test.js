const rewire = require('rewire');
const script = rewire('../../collection/CPIC_Phenotype_CYP2D6/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct CYP2D6 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return normal metabolizer', () => {
    inputList.CYP2D6 = "*13/*34";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Normal metabolizer");
  });

  it('Should return ultrarapid metabolizer', () => {
    inputList.CYP2D6 = "*10/*35xN>2";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Ultrarapid metabolizer");
  });

  it('Should return poor metabolizer', () => {
    inputList.CYP2D6 = "*3/*3";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Poor metabolizer");
  });

  it('Should fail if no genotype', () => {
    inputList.CYP2D6 = "";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Unknown");
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.CYP2D6 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Unknown");
  });

  it('Should fail if no CYP2D6 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Unknown");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2D6 = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP2D6.phenotype).toEqual("Normal metabolizer");
  });

});
