# Koki Sasagawa
# Excel to Python Dictionary
# The following code will be used to convert CPIC genotype-phenotype tables to create dictionaries

import xlrd

def excel_to_dictionary(path):
	""" Open and read an excel file and create a dictionary """
	excel_file = xlrd.open_workbook(path)
	
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
	
	# Return resulting dictionary 
	return genotype_to_phenotype

def test_function():
	""" This function will test to see that the excel to dictionary conversion is successful """
	
	path = input("Please enter the direct path to the excel file of interest: ")
	print(excel_to_dictionary(path))

# Call test	
test_function()
