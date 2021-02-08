const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_abacavir_HLA-B/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct abacavir recommendations', () => {
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
        "Low or reduced risk of abacavir hypersensitivity");
  });

  it('Should return a positive recommendation', () => {

    inputList["HLA-B"] = {
      "diplotype":"57:01", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Significantly increased risk of abacavir hypersensitivity");
    expect(result.recommendation.content).toEqual(
        "abacavir: Abacavir is not recommended");
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
    expect(result).toEqual("Incorrect/invalid input for drug abacavir");
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
        "Significantly increased risk of abacavir hypersensitivity");
  });

});
