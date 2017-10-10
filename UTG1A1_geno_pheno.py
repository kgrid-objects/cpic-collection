#KGrid CPIC guidelines genotype to phenotype
#Koki Sasagawa

#ENGINE TYPE
#PYTHON

#CONTENT
#geno = {"diplotype": "", "allele1": "", "allele2": "", "phenotype", ""}
#input may be '*1/*1' or no stars '1/1'
#or allele1 *1 or 1 allele2 *1 or 1

def getPhenotype(geno):

	# If the user inputs a diplotype without '*', the following lines of code will add '*' to create the proper star allele format.
	if '*' not in geno['diplotype']:
		diplotype = geno['diplotype'].split('/')
		allele1 = diplotype[0]
		allele2 = diplotype[1]
		allele1 = '*' + allele1 
		allele2 = '*' + allele2
		geno['diplotype'] = allele1 + '/' + allele2
		
	# If the user inputs a allele without '*', the following lines of code will add '*' to create the proper star allele format.
	if '*' not in geno['allele1']:
		geno['allele1'] = '*' + geno['allele1']
	if '*' not in geno["allele2"]:
		geno['allele2'] = '*' + geno['allele2']

	# Get appropriate phenotype corresponding to gene
	if geno['diplotype']:
		if geno['diplotype'] in geno_pheno:
			# Assign appropriate phenotype pair value for the corresponding key(diplotype) from dictonary geno_pheno
			geno['phenotype'] = geno_pheno[geno['diplotype']]
		else:
			raise Exception("Incorrect input for diplotype")

	elif geno["allele1"] and geno["allele2"]:
		# Convert allele to diplotype format
		combine_allele = geno["allele1"] + '/' + geno["allele2"]
		if combine_allele in geno_pheno:
			geno["phenotype"] = geno_pheno["combine_allele"]
		 
# Dictionary containing Genotype to Phenotype Information  
geno_pheno = {'*1/*1': 'UGT1A1 Normal Metabolizer', '*1/*27': 'UGT1A1 Intermediate Metabolizer', '*1/*28': 'UGT1A1 Intermediate Metabolizer', '*1/*36': 'UGT1A1 Normal Metabolizer', '*1/*37': 'UGT1A1 Intermediate Metabolizer', '*1/*6': 'UGT1A1 Intermediate Metabolizer', '*1/*80': 'UGT1A1 Intermediate Metabolizer', '*27/*27': 'UGT1A1 Poor Metazolizer', '*27/*28': 'UGT1A1 Poor Metazolizer', '*27/*36': 'UGT1A1 Intermediate Metabolizer', '*27/*37': 'UGT1A1 Poor Metazolizer', '*27/*80': 'UGT1A1 Poor Metazolizer', '*28/*28': 'UGT1A1 Poor Metazolizer', '*28/*36': 'UGT1A1 Intermediate Metabolizer', '*28/*37': 'UGT1A1 Poor Metazolizer', '*28/*80': 'UGT1A1 Poor Metazolizer', '*36/*36': 'UGT1A1 Normal Metabolizerc', '*36/*37': 'UGT1A1 Intermediate Metabolizer', '*36/*80': 'UGT1A1 Intermediate Metabolizer', '*37/*37': 'UGT1A1 Poor Metazolizer', '*37/*80': 'UGT1A1 Poor Metazolizer', '*6/*27': 'UGT1A1 Poor Metazolizer', '*6/*28': 'UGT1A1 Poor Metazolizer', '*6/*36': 'UGT1A1 Intermediate Metabolizer', '*6/*37': 'UGT1A1 Poor Metazolizer', '*6/*6': 'UGT1A1 Poor Metazolizer', '*6/*80': 'UGT1A1 Poor Metazolizer', '*80/*80': 'UGT1A1 Poor Metazolizer'}

def Function_Test():
	""" This function tests to see if functions are behaving as intended """ 
	geno1 = {"diplotype": "1/1", "allele1": "", "allele2": "", "phenotype", ""}
	geno2 = {"diplotype": "", "allele1": "1", "allele2": "1", "phenotype", ""}

	getPhenotype(geno1)
	getPhenotype(geno2)
	print(geno1)
	print(geno2)

# Call test
Function_Test()






	# if instr["phenotype"]:
	# 	if instr["phenotype"] == "high DPD activity":
	# 		instr["rec"] = "Use label-recommended dosage and administration"
	# 	elif instr["phenotype"] == "intermediate DPD activity":
	# 		instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
	# 	elif instr["phenotype"] == "DPD deficiency":
	# 		instr["rec"] = "Select alternative drug"
	# 	else:
	# 		raise Exception("insufficient data")			
	elif instr["diplotype"]:
		if instr["diplotype"] == "*1/*1":
			instr["phenotype"] = "high DPD activity"
			instr["rec"] = "Use label-recommended dosage and administration"
		elif instr["diplotype"] == "*1/2A" or instr["diplotype"] == "*1/*13" or instr["diplotype"] == "*1/rs67376798":
			instr["phenotype"] = "intermediate DPD activity"
			instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
		elif instr["diplotype"] == "*2A/*2A" or instr["diplotype"] == "13/*13" or instr["diplotype"] == "rs67376798/rs67376798":
			instr["phenotype"] = "DPD deficiency"
			instr["rec"] = "Select alternative drug"
		else:
			raise Exception("insufficient data")
	elif instr["allele1"] and instr["allele2"]:
		if (instr["allele1"] == instr["allele2"]) and (instr["allele1"] == "*1" or instr["allele1"] == "1"):
			instr["phenotype"] = "high DPD activity"
			instr["rec"] = "Use label-recommended dosage and administration"
		elif (instr["allele1"] == "*1") and (instr["allele2"] == "*2A" or instr["allele2"] == "*13" or instr["allele2"] == "rs67376798"):
			instr["phenotype"] = "intermediate DPD activity"
			instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
		elif (instr["allele1"] == instr["allele2"]) and (instr["allele1"] == "*2A" or instr["allele1"] == "*1" or instr["allele1"] == "rs67376798"):
			instr["phenotype"] = "DPD deficiency"
			instr["rec"] = "Select alternative drug"
		else:
			raise Exception("insufficient data")
	# else:
	# 	raise Exception("insufficient data")
