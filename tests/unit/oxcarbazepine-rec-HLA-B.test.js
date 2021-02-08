const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_oxcarbazepine_HLA-B/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct oxcarbazepine recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a negative recommendation', () => {

    inputList["HLA-B"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal risk of oxcarbazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
  });

  it('Should return a positive recommendation', () => {

    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Greater risk of oxcarbazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Strong: If patient is oxcarbazepine naıve, do not use oxcarbazepine."));
  });

  it('Should fail if no diplotype', () => {
    inputList["HLA-B"] = {"phenotype":"Normal metabolizer"};
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if no HLA-B gene in list', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug oxcarbazepine");
  });

  it('Should ignore other gene fields', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"57:01", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal risk of oxcarbazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
  });

});
