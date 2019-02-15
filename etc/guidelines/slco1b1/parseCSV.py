import csv
import pprint

guideline = {}

with open('translation_table_tab.txt', 'rU') as inputFile:
	reader = csv.reader(inputFile, delimiter='\t')
	reader = [[x[0], x[1], x[2]] if x[0] else None for x in reader]
	for alleleInfo in reader:
		if alleleInfo:
			key = alleleInfo[0]
			guideline[key] = {}
			guideline[key]["genotype_summary"] = alleleInfo[1]
			guideline[key]["priority_result"] = alleleInfo[2]

pprint.pprint(guideline, width=1)
