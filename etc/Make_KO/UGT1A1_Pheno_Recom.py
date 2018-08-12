# KGrid CPIC guidelines UGT1A1 Phenotype to Recommendation Payload
# Koki Sasagawa 
# Last Updated: 1/24/2018

def execute(pheno):
	""" 
		The following function will return the recommendation 
		corresponding to the specified phenotype 
	"""

	# Dictionary containing Phenotype to Recommendation Information
	pheno_recom = {
		"Normal metabolizer": {
			"Implications for phenotypic measures": "Reference UGT1A1 activity; very low likelihood of bilirubin-related discontinuation of atazanavir.",
			"Dosing recommendations": "There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient’s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).",
			"Classification of recommendations": "Strong",
		},
		"Intermediate metabolizer": {
			"Implications for phenotypic measures":"Somewhat decreased UGT1A1 activity; low likelihood of bilirubin-related discontinuation of atazanavir.",
			"Dosing recommendations": "There is no need to avoid prescribing of atazanavir based on UGT1A1 genetic test result. Inform the patient that some patients stop atazanavir because of jaundice (yellow eyes and skin), but that this patient’s genotype makes this unlikely (less than about a 1 in 20 chance of stopping atazanavir because of jaundice).",
			"Classification of recommendations": "Strong",
		},
		"Poor metabolizer": {
			"Implications for phenotypic measures":"Markedly decreased UGT1A1 activity; high likelihood of bilirubin-related discontinuation of atazanavir.",
			"Dosing recommendations": "Consider an alternative agent particularly where jaundice would be of concern to the patient. If atazanavir is to be prescribed, there is a high likelihood of developing jaundice that will result in atazanavir discontinuation (at least 20% and as high as 60%).",
			"Classification of recommendations": "Strong",
		}
	}

	# Dictionary containing choice of information
	options = {"0": "Implications for phenotypic measures", "1": "Dosing recommendations", "2": "Classification of recommendations"}

	# Results
	recommendation = {"Info": "", "Recom": ""}

	# Get select recommendation type
	if pheno["choice"]:
		if pheno["choice"] in options:
			# Assign appropriate recommendation information depending on selection of choice
			recommendation["Info"] = options[pheno["choice"]]
		else:
		 	return ("Incorrect/invalid option.")

	# Get appropriate recommendation type corresponding to phenotype and choice
	if pheno["phenotype"]:
		if pheno["phenotype"] in pheno_recom:
			# Assign appropriate recommendation pair value for the corresponding key(phenotype) from dictionary pheno_recom
			recommendation["Recom"] = pheno_recom[pheno["phenotype"]][recommendation["Info"]]
		else:
		 	return ("Incorrect/invalid input for phenotype.")

	return str(recommendation["Info"] + ": " + recommendation["Recom"])