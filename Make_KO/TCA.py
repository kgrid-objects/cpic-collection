# Tricyclic Antidepressants Genes CYP2D6 and CYP2C19
# Koki Sasagawa
# Last Updated: 4/11/2018

########## Remove when making KO ##########
# This is the skeleton code for the phenotype to recommendation KO
# for multi-gene interacting drugs

# Accepts input in the following format:
# {"pheno1": "", "pheno2": ""}

# Additional Notes:
# 1. Ultrarapid and rapid metabolizers have the same recommendations for CYP2C19
# 2. The order is assumed to be as follows: pheno1 is CYP2D6 and pheno2 is CYP2C19

import unittest  # Uncomment for testing
########## Remove when making KO ##########


def stringNormalizer(phenotype):
	""" Normalize metabolic information """
	metabolizm = phenotype.split()
	# Remove modifers
	if len(metabolizm) > 2:
		metabolizm = metabolizm[-2] + ' ' + metabolizm[-1]
	else:
		metabolizm = phenotype
	return metabolizm


def execute(phenotype):
	"""
		The following function will return the recommendation
		corresponding to the specified phenotype.
	"""
	metabolizm1 = stringNormalizer(phenotype['pheno1'])  # Normalized metabolic phenotype for CYP2D6
	metabolizm2 = stringNormalizer(phenotype['pheno2'])  # Normalized metabolic phenotype for CYP2C19

	# Metabolizer to key
	metabolic_key = {
		'Ultrarapid Metabolizer': 0,
		'Normal Metabolizer': 1,
		'Intermediate Metabolizer': 2,
		'Poor Metabolizer': 3,
	}

	# Assign corresponding integer key
	if metabolizm1 == 'Indeterminate' or metabolizm2 == 'Indeterminate':
		return "Dosing recommendation: None. One or both of the gene phenotype is 'Indeterminate'."
	try:
		key1 = metabolic_key[metabolizm1]
		# CYP2C19 specific normalization step
		if metabolizm2 == 'Rapid Metabolizer':
			key2 = metabolic_key['Ultrarapid Metabolizer']
		else:
			key2 = metabolic_key[metabolizm2]
	except:
		return "ERROR: Metabolizm phenotype could not be found in metabolic_key."

	# Nested dictionary containing phenotype to drug recommendation for
	# amitriptyline based on CYP2D6 & CYP2C19
	pheno_recom = {
				0: {
					0: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional',
					1: 'Avoid amitriptyline use. If amitriptyline is warranted, consider titrating to a higher target dose (compared to normal metabolizers). Classiﬁcation of recommendation: Strong',
					2: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional',
					3: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional'
					},
				1: {
					0: 'Consider alternative drug not metabolized by CYP2C19. Classiﬁcation of recommendation: Optional',
					1: 'Initiate therapy with recommended starting dose. Classiﬁcation of recommendation: Strong',
					2: 'Initiate therapy with recommended starting dose. Classiﬁcation of recommendation: Strong',
					3: 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose. Classiﬁcation of recommendation: Moderate'
					},
				2: {
					0: 'Consider alternative drug not metabolized by CYP2C19. Classiﬁcation of recommendation: Optional',
					1: 'Consider a 25% reduction of recommended starting dose. Classiﬁcation of recommendation: Moderate',
					2: 'Consider a 25% reduction of recommended starting dose. Classiﬁcation of recommendation: Optional',
					3: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional'
					},
				3: {
					0: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional',
					1: 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose. Classiﬁcation of recommendation: Strong',
					2: 'Avoid amitriptyline use. If amitriptyline is warranted, consider a 50% reduction of recommended starting dose. Classiﬁcation of recommendation: Optional',
					3: 'Avoid amitriptyline use. Classiﬁcation of recommendation: Optional'
					},
	}

	# Assign recommendation
	recommendation = pheno_recom[key1][key2]
	return 'Dosing recommendation: ' + recommendation

########## Remove when making KO ##########
################# TESTING #################
######## COMMENT OUT WHEN IN USE ##########

# The pre-loaded json object is for CYP2D6 and CYP2C19 metabolic phenotypes
# Replace test values to specific gene of interest
class stringNormalizer_test(unittest.TestCase):
	def test1(self):
		self.assertEqual(stringNormalizer('CYP2D6 Poor Metabolizer'), 'Poor Metabolizer', 'Incorrect Normalization')
	def test2(self):
		self.assertEqual(stringNormalizer('CYP2C19 Likely Intermediate Metabolizer'), 'Intermediate Metabolizer', 'Incorrect Normalization')
	def test3(self):
		self.assertEqual(stringNormalizer('Indeterminate'), 'Indeterminate', 'Incorrect Normalization')


class execute_test(unittest.TestCase):
	def test1(self):
		self.assertEqual(execute({"pheno1": "Ultrarapid Metabolizer", "pheno2": "Ultrarapid Metabolizer"}), 'Dosing recommendation: Avoid amitriptyline use. Classiﬁcation of recommendation: Optional', 'Incorrect recommendation')
	def test2(self):
		self.assertEqual(execute({"pheno1": "Ultrarapid Metabolizer", "pheno2": "Rapid Metabolizer"}), 'Dosing recommendation: Avoid amitriptyline use. Classiﬁcation of recommendation: Optional', 'Incorrect recommendation')
	def test3(self):
		self.assertEqual(execute({"pheno1": "Ultrarapid Metabolizer", "pheno2": "Indeterminate"}), "Dosing recommendation: None. One or both of the gene phenotype is 'Indeterminate'.", 'Incorrect recommendation')
	def test4(self):
		self.assertEqual(execute({"pheno1": "Normal Metabolizer", "pheno2": "CYP2C19 Likely Intermediate Metabolizer"}), 'Dosing recommendation: Initiate therapy with recommended starting dose. Classiﬁcation of recommendation: Strong', 'Incorrect recommendation')


if __name__ == '__main__':
	unittest.main(verbosity=2)
########## Remove when making KO ##########