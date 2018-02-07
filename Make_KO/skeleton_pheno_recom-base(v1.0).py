# KGrid CPIC guidelines <gene_name> Phenotype to Recommendation Payload
# Koki Sasagawa 
# Last Updated: 2/7/2018

########## Remove when making KO ##########
# This is the skeleton code for the phenotype to recommendation KO

# Accepts input in the following format: 
# {"phenotype": "", "choice": ""}
########## Remove when making KO ##########

def execute(pheno):
	""" 
		The following function will return the recommendation 
		corresponding to the specified phenotype 
	"""

	# Dictionary containing Phenotype to Recommendation Information
	# ultrarapid and extensive metabolizer have the same recomendations 
	pheno_recom = {
		"Ultrarapid metabolizer": {
			"0": "",
			"1": "",
			"2": "",
		},
		"Normal metabolizer": {
			"0": "",
			"1": "",
			"2": "",
		},
		"Intermediate metabolizer": {
			"0": "",
			"1": "",
			"2": "",
		},
		"Poor metabolizer": {
			"0": "",
			"1": "",
			"2": "",
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

########## Remove when making KO ##########
## Test Cases ##
# test1 = {"phenotype": "Poor metabolizer", "choice": "1"}
# test2 = {"phenotype": "Intermediate metabolizer", "choice": "1"}
# test3 = {"phenotype": "Normal metabolizer", "choice": "1"}
# print("*** test case 1 ***")
# print(execute(test1))
# print("*** test case 2 ***")
# print(execute(test2))
# print("*** test case 3 ***")
# print(execute(test3))
########## Remove when making KO ##########