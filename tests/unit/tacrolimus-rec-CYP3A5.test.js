const rewire = require('rewire');
const script = rewire('../../collection/CPIC CYP3A5 tacrolimus rec/recommendation');
var recommendation = script.__get__("dosingrecommendation");

describe('Give correct tacrolimus recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a intermediate recommendation', () => {
    inputList.CYP3A5 = {
      "diplotype":"*1/*1", "phenotype":"intermediate metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Lower dose-adjusted trough concentrations of tacrolimus and decreased chance of achieving target tacrolimus concentrations.");
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP3A5 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Initiate therapy with standard recommended dose."));
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP3A5 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP3A5 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug tacrolimus");
  });

  it('Should fail if no CYP3A5 gene in list', () => {
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug tacrolimus");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP3A5 = { "diplotype":"*1/*1", "phenotype":"intermediate metabolizer" };
    inputList.CYP3A6 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Increase starting dose 1.5-2 times recommended starting dose."));
  });

});
