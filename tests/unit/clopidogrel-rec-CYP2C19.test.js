const rewire = require('rewire');
const script = rewire('../../collection/CPIC CYP2C19 clopidogrel rec/recommendation');
var recommendation = script.__get__("dosingrecommendation");

describe('Give correct clopidogrel recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.CYP2C19 = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal (EM) or increased (UM) platelet inhibition; normal (EM) or decreased (UM) residual platelet aggregation.");
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP2C19 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "Alternative antiplatelet therapy (if no contraindication), e.g., prasugrel, ticagrelor.");
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug clopidogrel");
  });

  it('Should fail if no CYP2C19 gene in list', () => {
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug clopidogrel");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.CYP2C20 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "Clopidogrel: label-recommended dosage and administration");
  });

});
