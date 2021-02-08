const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_atazanavir_UGT1A1/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct atazanavir recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.UGT1A1 = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(expect.stringContaining(
        "Reference UGT1A1 activity; very low likelihood"));
  });

  it('Should return an intermediate recommendation', () => {
    inputList.UGT1A1 = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(expect.stringContaining(
        "Somewhat decreased UGT1A1 activity; low likelihood"));
  });

  it('Should return a poor recommendation', () => {
    inputList.UGT1A1 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(expect.stringContaining(
        "Markedly decreased UGT1A1 activity; high likelihood"));
  });

  it('Should fail if no phenotype', () => {
    inputList.UGT1A1 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.UGT1A1 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug Atazanavir");
  });

  it('Should fail if no UGT1A1 gene in list', () => {
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug Atazanavir");
  });

  it('Should ignore other gene fields', () => {
    inputList.UGT1A1 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(expect.stringContaining(
        "Reference UGT1A1 activity; very low likelihood"));
  });

});
