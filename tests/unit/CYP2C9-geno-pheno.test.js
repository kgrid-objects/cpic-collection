const rewire = require('rewire');
const script = rewire('../../collection/CPIC_Phenotype_CYP2C9/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct CYP2C9 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return extensive metabolizer', () => {
    inputList.CYP2C9 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual("Extensive metabolizer");
  });

  it('Should return intermediate metabolizer', () => {
    inputList.CYP2C9 = "*1/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual("Intermediate metabolizer");
  });

  it('Should return poor metabolizer', () => {
    inputList.CYP2C9 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual("Poor metabolizer");
  });

  it('Should fail if no genotype', () => {
    inputList.CYP2C9 = "";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual(undefined);
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.CYP2C9 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual(undefined);
  });

  it('Should fail if no CYP2C9 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    expect(()=>{phenotype(inputList);})
      .toThrow(new TypeError("Cannot read property 'split' of undefined"));
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C9 = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP2C9.phenotype).toEqual("Extensive metabolizer");
  });

});
