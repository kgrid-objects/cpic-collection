// cyp2d6TablePO.js
// Created by Jack Allan (jackall@umich,edu) on June 5th, 2018
// Knowledge Grid Team, Department of Learning Health Systems


/* returns json object containing CPIC guideline table for the cyp2d6 enzyme for codeine along with 
 a dictionary that maps alleles to their indices in the table for fast lookup
*/ 

function getGuideline(instr) {

	if !(instr == "allele1") || !(instr == "allele2"){
		//if input does not include proper allele keys
		throw "Input must contain keys 'allele1' and 'allele2'";
	}

	indexOf = {"*1": 0, "*2": 1, "*1xN": 2, "*2xN": 3," *3": 4, "*4": 5, "*4xN": 6, "*5": 7, "*6": 8, 
				"*10": 9, "*17": 10, "*41": 11}

	//metabolizer rates represented as integers
	var NM = 0;
	var PM = 1;
	var IM = 2;
	var EM = 3;
	var UM = 4;
	var UorE = 43;



	//this is the guideline table
	//created it based on information from supplement to CPIC paper
	var guidlineTable = [
		[EM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, NM, UM, UM, UorE, UorE, UorE, UorE, UorE, UM, UM, UM],
		[NM, NM, NM, NM, PM, PM, PM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, PM, PM, PM, PM,  IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM]
	];



	var allele1 = indexOf["allele1"];
	var allele2 = indexOf["allele2"];

	//invalid allele
	if allele1  !(indexOf) || !(indexOf) {
		throw "Invalid allele pair";
	}


	var rate = guidlineTable[indexOf[allele1]][indexOf[allele2]];

	var metabolizerKey = "metabolic_rate";
	var activityKey = "activity_score";
	var implicationsKey = "implications";
	var reccomendationKey = "reccomendations";
	var alternativesKey = "alternatives";
	var recommendationClassKey = "recommendation_classification";

	var guideline = {metabolizerKey: "default_"};

	if (rate == NM){
		guideline[metabolizerKey] = "Normal metabolizer";
		guideline[activityKey] = "1.0 - 2.0";
		guideline[implicationsKey] = "Normal morphine formation";
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing";
		guideline[alternativesKey] = [];
		guideline[recommendationClassKey] = "Strong";
	} else if (rate == PM){
		guideline[metabolizerKey] = "Poor metabolizer";
		guideline[activityKey] = "0";
		guideline[implicationsKey] = "Greatly reduced morphine formation leading to insufficient pan relief	";
		guideline[reccomendationKey] = "Avoid codeine due to lack of efficacy";
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics"];
		guideline[recommendationClassKey] = "Strong";
	} else if (rate == IM){
		guideline[metabolizerKey] = "Intermediate metabolizer";
		guideline[activityKey] = "0.5";
		guideline[implicationsKey] = "Reduced morphine formation";
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing. If no response, " +\
										"consider alternative analgesics such as morphine or a non-opioid";
		guideline[alternativesKey] = ["Monitor tramadol use for response"];
		guideline[recommendationClassKey] = "Moderate";
	} else if (rate == EM) {
		guideline[metabolizerKey] = "Extensive metabolizer";
		guideline[activityKey] = "1.0 - 2.0";
		guideline[implicationsKey] = "Normal morphine formation";
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing";
		guideline[alternativesKey] = [];
		guideline[recommendationClassKey] = "Strong";
	} else if (rate == UM){
		guideline[metabolizerKey] = "Ultrarapid metabolizer";
		guideline[activityKey] = ">2.0";
		guideline[implicationsKey] = "Increased formation of morphine following codeine administration, leading to higher risk of toxicity";
		guideline[reccomendationKey] = "Avoid codeine use due to potential toxicity";
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics, Tramadol"];
		guideline[recommendationClassKey] = "Strong";
	} else if (rate == UorE) {
		guideline[metabolizerKey] = "Ultrarapid or extensive metabollizer";
		guideline[activityKey] = ">2.0";
		guideline[implicationsKey] = "Increased formation of morphine following codeine administration, leading to higher risk of toxicity";
		guideline[reccomendationKey] = "Avoid codeine use due to potential toxicity";
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics, Tramadol"];
		guideline[recommendationClassKey] = "Strong";
	}
	
	//if somehow invalid
	else {
		throw"Invalid table selection";
	}

	//send it as a JSON object
	return(guideline);


}