# Koki Sasagawa
# Excel to Python Dictionary
# The following code will be used to convert CPIC genotype-phenotype tables to create dictionaries

import xlrd
import json
import sys

def excel_to_dictionary(spsheet):
	""" Open and read an excel file and create a dictionary """
	try:
		excel_file = xlrd.open_workbook(spsheet)

		file_name = spsheet
	        
		# Get the first worksheet of the excel file
		table1 = excel_file.sheet_by_index(0)
		
		# Empty dictionary 
		genotype_to_phenotype = {}
		
		# For loop to iterate through the number of rows in the table. Start from second row to skip headers
		for i in range(1, table1.nrows):
			# .cell(row, col) to specify the specific cell in the table
			# .value gets the value stored in the specific cell
			# if the particular cell is empty, it signals an empty row. Break the loop here. 
			if table1.cell(i, 0).value == '':
				break
			else:
				genotype = table1.cell(i,0).value
				phenotype = table1.cell(i,1).value
				genotype_to_phenotype[genotype] = phenotype

		# Generate a text file 
		with open('Output_{}.txt'.format(file_name), 'w') as file:
			file.write(json.dumps(genotype_to_phenotype))

		# Complete
		print('***DONE***')

	except:
		print('Invalid path to file or file type')

# Run Function
excel_to_dictionary(sys.argv[1])
