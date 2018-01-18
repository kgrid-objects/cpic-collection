# KGrid CPIC guidelines Genotype to Phenotype Payload
# Koki Sasagawa 
# Last Updated: 1/17/2018

# Updated to remove phenotype key value from dictionary. Returns string variable phenotype instead. 

# Accepts input in the following format: 
# {"diplotype": "", "allele1": "", "allele2": ""}

###### REMOVE THE ABOVE DESCRIPTION FOR WHEN INCLUDING IT INTO THE WIZARD. #########

def alleleFormat(geno):
	""" Swap the order of alleles to have the smaller number as allele1 and the larger number as allele2. Also add '*' to change to star format. """ 

	if geno['diplotype']:
		diplotype = geno['diplotype']
		list_diplotype = diplotype.split('/')
		# If in starformat, remove. Otherwise it will be left unchanged. 
		allele1 = int(list_diplotype[0].replace('*',''))
		allele2 = int(list_diplotype[1].replace('*',''))
		# If allele1 is greater than allele2, swap the order.
		if allele1 > allele2:
			geno['diplotype'] = '*' + str(allele2) + '/' + '*' + str(allele1) 

	elif geno['allele1'] and geno['allele2']:
		# If allele is in starformat, remove. Otherwise it will be left unchanged. 
		allele1 = int(geno['allele1'].replace('*',''))
		allele2 = int(geno['allele2'].replace('*',''))
		# If allele1 is greater than allele2, swap the order.
		if allele1 > allele2:
			geno['allele1'] = '*' + str(allele2)
			geno['allele2'] = '*' + str(allele1)

def getPhenotype(geno):
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
		 	return ("Incorrect/invalid input for allele.")

	return phenotype