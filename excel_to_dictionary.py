# Koki Sasagawa
# Excel to Python Dictionary
# The following code will be used to convert CPIC genotype-phenotype tables to create dictionaries

import xlrd
import json

def excel_to_dictionary(path):
	""" Open and read an excel file and create a dictionary """
	excel_file = xlrd.open_workbook(path)

	path_name = path.split('/')
	file_name = path_name[-1]
        
	# Get the first worksheet of the excel file
	table1 = excel_file.sheet_by_index(0)
	
	# Empty dictionary 
	genotype_to_phenotype = {}
	
	# For loop to iterate through the number of rows in the table
	for i in range(table1.nrows):
		# .cell(row, col) to specify the specific cell in the table
		# .value gets the value stored in the specific cell
		genotype = table1.cell(i,0).value
		phenotype = table1.cell(i,1).value
		genotype_to_phenotype[genotype] = phenotype

	# Generate a text file 
	with open('Output_{}.txt'.format(file_name), 'w') as file:
		file.write(json.dumps(genotype_to_phenotype))

# Run Function
def text_generator():
	path = input("Please enter the direct path to the excel file of interest: ")
	excel_to_dictionary(path)
	print("***DONE***")

text_generator()
