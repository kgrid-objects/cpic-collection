# Utility Wizard: CPIC KO Generator 
# Last Updated: 11/17/2017
# Koki Sasagawa
# KGrid
# The following code will accept a excel table file and generate a CPIC KO

# Import Modules
import xlrd
import json
import sys
# import unittest # Comment out for actual use. 

# Initialize global variables to default settings:
# 1. SPSHEET will be the excel spreadsheet of interest.
# 2. SHEETINDEX will be an integer that allows the user to 
#    specify which sheet will be read. Default = 0 (first sheet)
# 3. STARTROW will be an int type variable that allows the user to 
#    specify which row to begin reading from. Default = 1 (second row). 
# 4. ENDROW will be an int type variable that allows the user to 
#    specify which row to end reading. Default = 0 (Read entire table until blank cell is reached).
SPSHEET = ''
SHEETINDEX = 0
STARTROW = 1
ENDROW = 0


# Update global variables depending on system inputs
for x in range(len(sys.argv)):
 	if x == 1:
 		SPSHEET = sys.argv[1]
 	elif x == 2: 
 		SHEETINDEX = int(sys.argv[2]) #- 1 # If user specifies a sheet to access, the actual index will be 1 less. 
 	elif x == 3:
 		STARTROW = int(sys.argv[3]) #- 1 # If user specifies a row to access, the actual index will be 1 less. 
 	elif x == 4:
 		ENDROW = int(sys.argv[4]) #- 1 # If user specifies a row to access, the actual index will be 1 less. 


# File extensions: For all file types you want the program to handle, add their extensions here. 
EXTENSIONS = ['.xlsx']


# KO contents: 
PAYLOAD = "def alleleFormat(geno):\n\t\"\"\" \n\tThe following code will swap the order of alleles to always have the smaller number as allele1 and the larger number as allele2. It will also add '*' to change to star format if previous input was not. \n\t\"\"\"\n\tif geno['diplotype']:\n\t\tdiplotype = geno['diplotype']\n\t\tlist_diplotype = diplotype.split('/')\n\t\t# If in starformat, remove. Otherwise it will be left unchanged. \n\t\tallele1 = int(list_diplotype[0].replace('*',''))\n\t\tallele2 = int(list_diplotype[1].replace('*',''))\n\t\t# If allele1 is greater than allele2, swap the order.\n\t\tif allele1 > allele2:\n\t\t\tgeno['diplotype'] = '*' + str(allele2) + '/' + '*' + str(allele1) \n\n\telif geno['allele1'] and geno['allele2']:\n\t\t# If allele is in starformat, remove. Otherwise it will be left unchanged. \n\t\tallele1 = int(geno['allele1'].replace('*',''))\n\t\tallele2 = int(geno['allele2'].replace('*',''))\n\t\t# If allele1 is greater than allele2, swap the order.\n\t\tif allele1 > allele2:\n\t\t\tgeno['allele1'] = '*' + str(allele2)\n\t\t\tgeno['allele2'] = '*' + str(allele1)\n\ndef execute(geno):\n\t\"\"\" The following function will return the phenotype corresponding to the user specified genotype \"\"\"\n\n\t# Dictionary containing Genotype to Phenotype Information  \n\tgeno_pheno = {}\n\n\t# Arranging the order so the lower numerical allele is on the left. Also add a star '*' if not in star allele format. \n\talleleFormat(geno)\n\n\t# Get appropriate phenotype corresponding to gene\n\tif geno['diplotype']:\n\t\tif geno['diplotype'] in geno_pheno:\n\t\t\t# Assign appropriate phenotype pair value for the corresponding key(diplotype) from dictonary geno_pheno\n\t\t\tgeno['phenotype'] = geno_pheno[geno['diplotype']]\n\t\telse:\n\t\t \treturn(\"Incorrect/invalid input for diplotype\")\n\n\telif geno['allele1'] and geno['allele2']:\n\t\t# Convert allele to diplotype format\n\t\tcombine_allele = geno['allele1'] + '/' + geno['allele2']\n\t\tif combine_allele in geno_pheno:\n\t\t\tgeno['phenotype'] = geno_pheno[combine_allele]\n\t\telse:\n\t\t \treturn(\"Incorrect/invalid input for allele\")\n\n\treturn str(geno[\"phenotype\"])"

INPUTXML = "<rdf:RDF xmlns:ot=\"http://uofm.org/objectteller/#\"\n         xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n    <rdf:Description rdf:about=\"http://uofm.org/objectteller/inputMessage\">\n        <ot:noofparams>4</ot:noofparams>\n        <ot:params>\n            <rdf:Seq>\n                <rdf:li>diplotype</rdf:li>\n        <rdf:li>allele1</rdf:li>\n         <rdf:li>allele2</rdf:li>\n   <rdf:li>phenotype</rdf:li>\n            </rdf:Seq>\n        </ot:params>\n    </rdf:Description>\n    <rdf:Description rdf:about=\"http://uofm.org/objectteller/age/\">\n        <ot:datatype>STRING</ot:datatype>\n    </rdf:Description>\n</rdf:RDF>\n"
OUTPUTXML = "<rdf:RDF xmlns:ot=\"http://uofm.org/objectteller/\"\n  xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n  <rdf:Description rdf:about=\"http://uofm.org/objectteller/outputMessage\">\n    <ot:returntype>STRING</ot:returntype>\n  </rdf:Description>\n</rdf:RDF>\n"
KOFILE = "/Users/koki/activator/shelf/{}-Object"
METADATA = {
	"metadata": {
		"title": ""
		}, 
	"inputMessage": "",
	"outputMessage": "",
	"payload": {
		"content":"",
    	"engineType": "PYTHON",
    	"functionName": "execute"
    	}
	}


def excel_file_filter(filename):
	""" Returns True if file is excel table. """
	file_check = any(filename.endswith(e) for e in EXTENSIONS)
	
	if file_check == False:
		print("INVALID: File type is not valid. Please check that file extension is {}".format(EXTENSIONS))
		return file_check
	else:
		return file_check


def input_evaluator(sheetIndex, startRow, endRow):
	""" Checks that excel table specifications are invalid. """
	if ((sheetIndex < 0) or (startRow < 0) or (endRow < 0)):
		print("INVALID: Numerical specifications must be positive numbers.")
		return False
	elif endRow > 0:
		if endRow < startRow:
			print("INVALID: Ending row must be larger than starting row.")
			return False
	else:
		return True


def file_name(spSheet):
	""" Reformat file name to be shorter """
	parts = spSheet.split('_')
	short_name = parts[0]
	return short_name


def excel_to_dictionary(spSheet, sheetIndex, startRow, endRow):
	""" Open and read an excel file of selected sheet, starting and ending at specified rows. Create a dictionary output. """

	# Load in excel file
	try:
		excel_file = xlrd.open_workbook(spSheet)
	except:
		print('INVALID: File does not exist or path-to-file is incorrect.')
		return False

	# Specify the sheet of the excel file
	try: 
		table1 = excel_file.sheet_by_index(sheetIndex)
	except:
		print('INVALID: Invalid input or sheet does not exist.')
		return False

	# Initialize result dictionary 
	genotype_to_phenotype = {}
	
	# If user specifies ending row, assign that number to rowLimit. Otherwise
	# the default is the total number of rows in the table. 
	if endRow != 0:
		rowLimit = endRow
	else:
		rowLimit = table1.nrows

	# For loop to iterate through the number of rows in the table. 
	for i in range(startRow, rowLimit):
		# .cell(row, col) to specify the specific cell in the table
		# .value gets the value stored in the specific cell
		# If the particular cell is empty, it signals an empty row. Break the loop here. 
		if table1.cell(i, 1).value == '':
			break
		else:
			genotype = table1.cell(i,0).value
			phenotype = table1.cell(i,1).value
			genotype_to_phenotype[genotype] = phenotype

	# # Generate a text file 
	# # Assign the file name. Remove the file type extension. 
	# for ending in EXTENSIONS:
	# 	if spSheet.endswith(ending):
	# 		file_name = spSheet[:-len(ending)]
	
	# with open('Output_{}_file'.format(file_name), 'w') as file:
	# 	file.write(json.dumps(genotype_to_phenotype))

	# # Complete
	# print('***DONE***')

	# Return a dictionary
	return genotype_to_phenotype


# KO generator 
def build(metadata, inputxml, outputxml, payload, KOFile, title):

	# loading in files as json
	backbone = metadata
	backbone["metadata"]["title"] = 'CPIC {} Genotype-to-Phenotype'.format(title)
	backbone["inputMessage"] = inputxml
	backbone["outputMessage"] = outputxml
	backbone["payload"]["content"] = payload

	# dump result into new files
	with open(KOFile, 'w') as outfile:
	    output = json.dump(backbone, outfile)


def main(spSheet, sheetIndex, startRow, endRow):
	# Assign local variables from global variables 
	metadata = METADATA
	inputxml = INPUTXML
	outputxml = OUTPUTXML
	payloadfile = PAYLOAD
	kofile = KOFILE

	if spSheet == '':
		print("Please enter a file.")
		return

	if excel_file_filter(spSheet):
		if input_evaluator(sheetIndex, startRow, endRow):
			geno_pheno_dict = excel_to_dictionary(spSheet, sheetIndex, startRow, endRow)
			# Make the payload
			payloadfile = payloadfile.format(geno_pheno_dict)
			# Create the file name
			name = file_name(spSheet)
			# Assign file name to KOFILE
			kofile = kofile.format(name)
			# Create the KO
			build(metadata, inputxml, outputxml, payloadfile, kofile, name)
			print("*****DONE*****")


#################### EXECUTE ####################
main(SPSHEET, SHEETINDEX, STARTROW, ENDROW)

#################### TESTING ####################
########### COMMENT OUT WHEN IN USE #############

# class excel_file_filter_test(unittest.TestCase):
# 	def test1(self):
# 		self.assertEqual(excel_file_filter('UGT1A1_Diplotype_Phenotype_Table.xlsx'), True)
# 	def test2(self):
# 		self.assertEqual(excel_file_filter('UGT1A1_Diplotype_Phenotype_Table.xls'), False)

# class input_evaluator_test(unittest.TestCase):
# 	def test1(self):
# 		self.assertEqual(input_evaluator(0, 1, 0), True, 'Default numbers should return True.')
# 	def test2(self):
# 		self.assertEqual(input_evaluator(0, -1, 0), False, 'Negative start row number should return False.')
# 	def test3(self):
# 		self.assertEqual(input_evaluator(-1, 0, 0), False, 'Negative sheet index should return False.')
# 	def test4(self):
# 		self.assertEqual(input_evaluator(0, 0, -1), False, 'Negative end row number should return False.')
# 	def test5(self):
# 		self.assertEqual(input_evaluator(0, 16, 4), False, 'startRow less than endRow should return False.')

# class file_name_test(unittest.TestCase):
# 	def test1(self):
# 		self.assertEqual(file_name('UGT1A1_Diplotype_Phenotype_Table.xlsx'), 'UGT1A1', 'Incorrect text parsing. Check code.')
# 	def test2(self):
# 		self.assertEqual(file_name('CYP2C9_Diplotype_Phenotype_Table.xlsx'), 'CYP2C9', 'Incorrect text parsing. Check code.')
# 	def test3(self):
# 		self.assertEqual(file_name('CYP2C19_Diplotype_Phenotype_Table.xlsx'), 'CYP2C19', 'Incorrect text parsing. Check code.')

# if __name__ == '__main__':
# 	unittest.main(verbosity=2)


