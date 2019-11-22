const rewire = require('rewire');
const script = rewire('../../collection/CPIC Genotype - Phenotype for CYP3A5/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct CYP3A5 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return extensive metabolizer', () => {
    inputList.CYP3A5 = "*1/*1";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual("Extensive metabolizer");
  });

  it('Should return intermediate metabolizer', () => {
    inputList.CYP3A5 = "*1/*3";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual("Intermediate metabolizer");
  });

  it('Should return likely poor metabolizer', () => {
    inputList.CYP3A5 = "*3/*3";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual("Poor metabolizer");
  });

  it('Should fail if no genotype', () => {
    inputList.CYP3A5 = "";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual(undefined);
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.CYP3A5 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual(undefined);
  });

  it('Should fail if no CYP3A5 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    expect(()=>{phenotype(inputList);})
    .toThrow(new TypeError("Cannot read property 'split' of undefined"));
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP3A5 = "*1/*1";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.CYP3A5.phenotype).toEqual("Extensive metabolizer");
  });

});
