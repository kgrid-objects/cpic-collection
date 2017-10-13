#KGrid CPIC guidelines genotype to phenotype
#Koki Sasagawa

#ENGINE TYPE
#PYTHON

#CONTENT
#geno = {"diplotype": "", "allele1": "", "allele2": "", "phenotype", ""}
#input may be '*1/*1' or no stars '1/1'
#or allele1 *1 or 1 allele2 *1 or 1

def alleleFormat(geno):
	""" 
	The following code will swap the order of alleles to always have the smaller number as allele1 and the larger number as allele2. It will also add '*' to change to star format if previous input was not. 
	"""
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
	""" The following function will return the phenotype corresponding to the user specified genotype """

	# Dictionary containing Genotype to Phenotype Information  
	geno_pheno = {'*1/*1': 'UGT1A1 Normal Metabolizer', '*1/*27': 'UGT1A1 Intermediate Metabolizer', '*1/*28': 'UGT1A1 Intermediate Metabolizer', '*1/*36': 'UGT1A1 Normal Metabolizer', '*1/*37': 'UGT1A1 Intermediate Metabolizer', '*1/*6': 'UGT1A1 Intermediate Metabolizer', '*1/*80': 'UGT1A1 Intermediate Metabolizer', '*27/*27': 'UGT1A1 Poor Metazolizer', '*27/*28': 'UGT1A1 Poor Metazolizer', '*27/*36': 'UGT1A1 Intermediate Metabolizer', '*27/*37': 'UGT1A1 Poor Metazolizer', '*27/*80': 'UGT1A1 Poor Metazolizer', '*28/*28': 'UGT1A1 Poor Metazolizer', '*28/*36': 'UGT1A1 Intermediate Metabolizer', '*28/*37': 'UGT1A1 Poor Metazolizer', '*28/*80': 'UGT1A1 Poor Metazolizer', '*36/*36': 'UGT1A1 Normal Metabolizerc', '*36/*37': 'UGT1A1 Intermediate Metabolizer', '*36/*80': 'UGT1A1 Intermediate Metabolizer', '*37/*37': 'UGT1A1 Poor Metazolizer', '*37/*80': 'UGT1A1 Poor Metazolizer', '*6/*27': 'UGT1A1 Poor Metazolizer', '*6/*28': 'UGT1A1 Poor Metazolizer', '*6/*36': 'UGT1A1 Intermediate Metabolizer', '*6/*37': 'UGT1A1 Poor Metazolizer', '*6/*6': 'UGT1A1 Poor Metazolizer', '*6/*80': 'UGT1A1 Poor Metazolizer', '*80/*80': 'UGT1A1 Poor Metazolizer'}

	# Arranging the order so the lower numerical allele is on the left. Also add a star '*' if not in star allele format. 
	alleleFormat(geno)

	# Get appropriate phenotype corresponding to gene
	if geno['diplotype']:
		if geno['diplotype'] in geno_pheno:
			# Assign appropriate phenotype pair value for the corresponding key(diplotype) from dictonary geno_pheno
			geno['phenotype'] = geno_pheno[geno['diplotype']]
		else:
		 	raise Exception("Incorrect/invalid input for diplotype")

	elif geno['allele1'] and geno['allele2']:
		# Convert allele to diplotype format
		combine_allele = geno['allele1'] + '/' + geno['allele2']
		if combine_allele in geno_pheno:
			geno['phenotype'] = geno_pheno[combine_allele]
		else:
		 	raise Exception("Incorrect/invalid input for allele")

def Function_Test():
	""" This function tests to see if functions are behaving as intended """ 
	test1 = {'diplotype': '27/1', 'allele1': '', 'allele2': '', 'phenotype': ''}
	test2 = {'diplotype': '', 'allele1': '27', 'allele2': '1', 'phenotype': ''}
	test3 = {'diplotype': '*27/*1', 'allele1': '', 'allele2': '', 'phenotype': ''}
	test4 = {'diplotype': '', 'allele1': '*27', 'allele2': '*1', 'phenotype': ''}

	# Test that the scenarios work for function alleleFormat
	# alleleFormat(test1)
	# alleleFormat(test2)
	# alleleFormat(test3)
	# alleleFormat(test4)

	# Test that scenarios work for function genoPheno
	getPhenotype(test1)
	getPhenotype(test2)
	getPhenotype(test3)
	getPhenotype(test4)

	print(test1)
	print(test2)
	print(test3)
	print(test4)

# Call test
Function_Test()
