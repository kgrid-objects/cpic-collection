const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_carbamazepine_HLA-A_HLA-B/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct carbamazepine recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a negative/negative recommendation', () => {
    inputList["HLA-A"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(expect.stringContaining(
        "Normal risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis,"));
  });

  it('Should return a negative/positive recommendation', () => {
    inputList["HLA-A"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Strong: If patient is carbamazepine-naıve, do not use carbamazepine."));
  });

  it('Should return a positive/positive recommendation', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    inputList.CYP2C19 = {};
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
  });

  it('Should return a positive/null recommendation', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {};
    let result = recommendation(inputList);
    expect(result.recommendation).toEqual(undefined);
  });

  it('Should fail if no diplotype', () => {
    inputList["HLA-A"] = {"phenotype":"Normal metabolizer"};
    inputList["HLA-B"] = {"phenotype":"Normal metabolizer"};
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if no HLA-A or HLA-B gene in list', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug carbamazepine");
  });

  it('Should ignore other gene fields', () => {
    inputList["HLA-A"] = {
      "diplotype":"31:01", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    inputList["HLA-C"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis");
  });

});
