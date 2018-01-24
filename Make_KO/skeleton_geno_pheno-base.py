# KGrid CPIC guidelines Genotype to Phenotype Payload
# Koki Sasagawa 
# Last Updated: 1/24/2018

########## Remove when making KO ##########
# Fixed to be able to accept input not in the starallele format. 
# Accepts input in the following format: 
# {"diplotype": "", "allele1": "", "allele2": ""}
########## Remove when making KO ##########

def alleleFormat(geno):
	""" 
		Swaps the order of alleles to have the smaller number as allele1 and 
		the larger number as allele2. Also adds '*' to change to star format. 
	""" 

	if geno['diplotype']:
		diplotype = geno['diplotype']
		list_diplotype = diplotype.split('/')
		# If in starformat, remove. Otherwise it will be unchanged. 
		allele1 = int(list_diplotype[0].replace('*',''))
		allele2 = int(list_diplotype[1].replace('*',''))
		# If allele1 is greater than allele2, swap the order.
		if allele1 > allele2:
			geno['diplotype'] = '*' + str(allele2) + '/' + '*' + str(allele1)
		else:
			geno['diplotype'] = '*' + str(allele1) + '/' + '*' + str(allele2)

	elif geno['allele1'] and geno['allele2']:
		# If allele is in starformat, remove. Otherwise it will be unchanged. 
		allele1 = int(geno['allele1'].replace('*',''))
		allele2 = int(geno['allele2'].replace('*',''))
		# If allele1 is greater than allele2, swap the order.
		if allele1 > allele2:
			geno['allele1'] = '*' + str(allele2)
			geno['allele2'] = '*' + str(allele1)
		else:
			geno['allele1'] = '*' + str(allele1)
			geno['allele2'] = '*' + str(allele2)

def execute(geno):
	""" Return the phenotype corresponding to the user specified genotype. """

	# Dictionary containing Genotype to Phenotype Information
	geno_pheno = {}

	# Arranging the order so the lower numerical allele is on the left. Also add a star '*' if not in star allele format. 
	alleleFormat(geno)

	# Metabolism Phenotype
	phenotype = ""

	# Get appropriate phenotype corresponding to gene
	if geno['diplotype']:
		if geno['diplotype'] in geno_pheno:
			# Assign appropriate phenotype pair value for the corresponding key(diplotype) from dictonary geno_pheno
			phenotype = geno_pheno[geno['diplotype']]
		else:
		 	return ("Incorrect/invalid input for diplotype.")

	elif geno['allele1'] and geno['allele2']:
		# Convert allele to diplotype format
		combine_allele = geno['allele1'] + '/' + geno['allele2']
		if combine_allele in geno_pheno:
			phenotype = geno_pheno[combine_allele]
		else:
		 	return ("Incorrect/invalid input for alleles.")

	return phenotype