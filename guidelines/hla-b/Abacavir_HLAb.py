
#CPIC guidelines for HLA-B genotype and Abacavir dosing 

def getGuideline(instr):
	if not instr["allele1"] or not instr["allele2"]:
		raise Exception("Input must contain keys 'allele1' and 'allele2'")
	if instr["allele1"] == "57.01" or instr["allele2"] == "57.01":
		return "Significantly increased risk of abacavir sensitivity - Abacavir is not recommended"
	else:
		return "Low or reduced risk of abacavir hypersensitivity - Use abacavir per standard dosing guidelines"

#classifications of recommendation are strong