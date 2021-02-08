const rewire = require('rewire');
const script = rewire('../../collection/CPIC_Phenotype_SLCO1B1/phenotype');

var phenotype = script.__get__("phenotype");

describe('Give correct SLCO1B1 phenotypes', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return normal function', () => {
    inputList.SLCO1B1 = "*1A/*1B";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual("Normal function");
  });

  it('Should return intermediate function', () => {
    inputList.SLCO1B1 = "*1A/*2";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual("Intermediate function");
  });

  it('Should return low function', () => {
    inputList.SLCO1B1 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual("Low function");
  });

  it('Should fail if no genotype', () => {
    inputList.SLCO1B1 = "";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual(undefined);
  });

  it('Should fail if unrecognized genotype', () => {
    inputList.SLCO1B1 = "*9999/*9999";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual(undefined);
  });

  it('Should fail if no SLCO1B1 gene in list', () => {
    inputList.CYP2C10 = "*1/*1";
    expect(()=>{phenotype(inputList);})
      .toThrow(new TypeError("Cannot read property 'split' of undefined"));
  });

  it('Should ignore other gene fields', () => {
    inputList.SLCO1B1 = "*1A/*1B";
    inputList.CYP2C10 = "*2/*2";
    let result = phenotype(inputList);
    expect(result.SLCO1B1.phenotype).toEqual("Normal function");
  });

});
