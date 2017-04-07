
#returns json object containing CPIC guideline table for the cyp2d6 enzyme for codeine along with 
# a dictionary that maps alleles to their indices in the table for fast lookup
def getGuideline(instr):

	if not instr["allele1"] or not instr["allele2"]:
		#input does not include proper allele keys
		raise Exception("Input must contain keys 'allele1' and 'allele2'")

	indexOf = {"*1": 0, "*2": 1, "*1xN": 2, "*2xN": 3," *3": 4, "*4": 5, "*4xN": 6, "*5": 7, "*6": 8, 
				"*10": 9, "*17": 10, "*41": 11}


	#metabolizer rates represented as integers
	NM = 0
	PM = 1
	IM = 2
	EM = 3
	UM = 4
	UorE = 43

	#this is the guideline table
	#created it based on information from supplement to CPIC paper
	guidlineTable = [
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
	]

	allele1 = instr["allele1"]
	allele2 = instr["allele2"]

	#invalid allele
	if allele1 not in indexOf or allele2 not in indexOf:
		raise Exception("Invalid allele pair")

	rate = guidlineTable[indexOf[allele1]][indexOf[allele2]]

	metabolizerKey = "metabolic_rate"
	activityKey = "activity_score"
	implicationsKey = "implications"
	reccomendationKey = "reccomendations"
	alternativesKey = "alternatives"
	recommendationClassKey = "recommendation_classification"

	guideline = {metabolizerKey: "default_"}

	if rate == NM:
		guideline[metabolizerKey] = "Normal metabolizer"
		guideline[activityKey] = "1.0 - 2.0"
		guideline[implicationsKey] = "Normal morphine formation"
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing"
		guideline[alternativesKey] = []
		guideline[recommendationClassKey] = "Strong"
	elif rate == PM:
		guideline[metabolizerKey] = "Poor metabolizer"
		guideline[activityKey] = "0"
		guideline[implicationsKey] = "Greatly reduced morphine formation leading to insufficient pan relief	"
		guideline[reccomendationKey] = "Avoid codeine due to lack of efficacy"
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics"]
		guideline[recommendationClassKey] = "Strong"

	elif rate == IM:
		guideline[metabolizerKey] = "Intermediate metabolizer"
		guideline[activityKey] = "0.5"
		guideline[implicationsKey] = "Reduced morphine formation"
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing. If no response, " +\
										"consider alternative analgesics such as morphine or a non-opioid"
		guideline[alternativesKey] = ["Monitor tramadol use for response"]
		guideline[recommendationClassKey] = "Moderate"

	elif rate == EM:
		guideline[metabolizerKey] = "Extensive metabolizer"
		guideline[activityKey] = "1.0 - 2.0"
		guideline[implicationsKey] = "Normal morphine formation"
		guideline[reccomendationKey] = "Use label recommended age or weight specific dosing"
		guideline[alternativesKey] = []
		guideline[recommendationClassKey] = "Strong"

	elif rate == UM:
		guideline[metabolizerKey] = "Ultrarapid metabolizer"
		guideline[activityKey] = ">2.0"
		guideline[implicationsKey] = "Increased formation of morphine following codeine administration, leading to higher risk of toxicity"
		guideline[reccomendationKey] = "Avoid codeine use due to potential toxicity"
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics, Tramadol"]
		guideline[recommendationClassKey] = "Strong"
	elif rate == UorE:
		guideline[metabolizerKey] = "Ultrarapid or extensive metabollizer"
		guideline[activityKey] = ">2.0"
		guideline[implicationsKey] = "Increased formation of morphine following codeine administration, leading to higher risk of toxicity"
		guideline[reccomendationKey] = "Avoid codeine use due to potential toxicity"
		guideline[alternativesKey] = ["morphine", "non-opioid analgesics, Tramadol"]
		guideline[recommendationClassKey] = "Strong"
	#somehow invalid
	else:
		raise Exception("Invalid table selection")

	#send it as a JSON object
	return str(guideline)







