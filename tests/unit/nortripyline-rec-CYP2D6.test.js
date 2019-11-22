const rewire = require('rewire');
const script = rewire('../../collection/CPIC nortripyline Rec based on CYP2C19 and CYP2D6/recommendation');
var recommendation = script.__get__("dosingrecommendation");

describe('Give correct nortripyline recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.CYP2D6 = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal metabolism of TCAs");
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP2D6 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Avoid tricyclic use due to potential for side effects. Consider alternative drug not metabolized by CYP2D6."));
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug nortripyline");
  });

  it('Should fail if no CYP2D6 gene in list', () => {
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug nortripyline");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.CYP2D7 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        " Initiate therapy with recommended starting dose.");
  });

});
