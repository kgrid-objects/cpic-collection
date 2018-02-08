# KGrid CPIC guidelines CYP2C19 Phenotype to Recommendation Clopidogrel
# Koki Sasagawa 
# Last Updated: 2/7/2018

def execute(pheno):
	""" 
		The following function will return the recommendation 
		corresponding to the specified phenotype 
	"""

	# Dictionary containing Phenotype to Recommendation Information
	# ultrarapid and extensive metabolizer have the same recomendations 
	pheno_recom = {
		"Ultrarapid metabolizer": {
			"0": "Increased metabolism when compared to extensive metabolizers. Lower plasma concentrations will increase probability of pharmacotherapy failure.",
			"1": "Consider an alternative drug not predominantly metabolized by CYP2C19.",
			"2": "Moderate",
		},
		"Normal metabolizer": {
			"0": "Normal metabolism",
			"1": "Initiate therapy with recommended starting dose.",
			"2": "Strong",
		},
		"Intermediate metabolizer": {
			"0": "Reduced metabolism when compared to extensive metabolizers.",
			"1": "Initiate therapy with recommended starting dose.",
			"2": "Strong",
		},
		"Poor metabolizer": {
			"0": "Greatly reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.",
			"1": "Consider a 50% reduction of recommended starting dose and titrate to response or select alternative drug not predominantly metabolized by CYP2C19",
			"2": "Moderate",
		}
	}

	# Dictionary containing choice of information
	options = {"0": "Implications for phenotypic measures", "1": "Dosing recommendations", "2": "Classification of recommendations"}

	# Results
	recommendation = {"Info": "", "Recom": ""}

	# Get select recommendation type
	if pheno["choice"]:
		choice = pheno["choice"]
		if choice in options:
			# Assign appropriate recommendation information depending on selection of choice
			recommendation["Info"] = options[choice]
		else:
		 	return ("Incorrect/invalid option.")

	# Get appropriate recommendation type corresponding to phenotype and choice
	if pheno["phenotype"]:
		phenotype = pheno["phenotype"]
		if phenotype in pheno_recom:
			# Assign appropriate recommendation pair value for the corresponding key(phenotype) from dictionary pheno_recom
			recommendation["Recom"] = pheno_recom[phenotype][choice]
		else:
		 	return ("Incorrect/invalid input for phenotype.")

	return str(recommendation["Info"] + ": " + recommendation["Recom"])