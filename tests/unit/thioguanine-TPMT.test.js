const rewire = require('rewire');
const script = rewire('../../collection/CPIC TPMT thioguanine rec/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct thioguanine recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Start with normal starting dose. Adjust doses of TG and of other myelosuppressive therapy"));
  });

  it('Should return an intermediate recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Start with reduced doses (reduce by 30-50%) and adjust doses"));
  });

  it('Should return a low recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Low metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Start with drastically reduced doses16 (reduce daily dose by 10-fold"));
  });

  it('Should fail if no phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug thioguanine");
  });

  it('Should fail if no TPMT gene in list', () => {
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug thioguanine");
  });

  it('Should ignore other gene fields', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Lower concentrations of TGN metabolites, but note that TGN after TG are 5-10x higher than TGN after MP or azathioprine");
  });

});
