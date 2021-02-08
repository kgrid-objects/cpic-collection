const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_citalopram_CYP2C19/recommendation');
var recommendation = script.__get__("dosingrecommendation");

describe('Give correct citalopram recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.CYP2C19 = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual("Normal metabolism");
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP2C19 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        expect.stringContaining("Consider a 50% reduction of recommended starting dose and titrate"));
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug citalopram");
  });

  it('Should fail if no CYP2C19 gene in list', () => {
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug citalopram");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.CYP2C20 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "Initiate therapy with recommended starting dose.");
  });

});
