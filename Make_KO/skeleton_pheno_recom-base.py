#KGrid CPIC guidelines Phenotype to Recommendation
#Koki Sasagawa

#ENGINE TYPE
#PYTHON

#CONTENT

# The following input pheno should be formatted as such: {'phenotype': '', 'implication': '', 'recommendation': ''}

def getRecommendation(pheno):
	""" The following function will return the recommendation corresponding to the specified phenotype """

	# Dictionary containing Phenotype to Recommendation Information
	######### COPY AND PASTE DICTIONARY HERE #########
	pheno_recom = {}

	# Get appropriate recommendation corresponding to phenotype
	if pheno['phenotype']:
		if pheno['phenotype'] in pheno_recom:
			# Assign appropriate recommendation pair value for the corresponding key(phenotype) from dictionary pheno_recom
			pheno['recommendation'] = pheno_recom[pheno['phenotype']]
		else:
		 	raise Exception("Incorrect/invalid input for phenotype")

	return str(pheno["recommendation"])

####### The following is text-code that will check to see that the payload is functioning properly. ########
def Function_Test():
	""" This function tests to see if functions are behaving as intended """ 
	test1 = 
	test2 = 
	test3 = 
	test4 = 

	# Test that scenarios work for function 
	getRecommendation(test1)
	getRecommendation(test2)
	getRecommendation(test3)
	getRecommendation(test4)

	print(test1)
	print(test2)
	print(test3)
	print(test4)

# Call test
Function_Test()