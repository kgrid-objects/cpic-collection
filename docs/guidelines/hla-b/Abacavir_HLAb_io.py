
#CPIC guidelines for HLA-B genotype and Abacavir dosing with input/output

def abacavirIO(instr):
	#dict to carry input(s)
	info = {"Allele1":"", "Allele2":"", "Diplotype":"", "Phenotype":"", "Source":"", "Recommendation":"", "Implication":""}


	#input
	if instr["allele1"] and instr["allele2"]:
		info["Allele1"] = instr["allele1"]
		info["Allele2"] = instr["allele2"]
	elif instr["diplotype"]:
		info["Diplotype"] = instr["diplotype"]
	elif instr["phenotype"]:
		info["Phenotype"] = instr["phenotype"]
	info["Source"] = instr["source"]
	
	#knowledge object
	#classifications of recommendation are strong
	if info["Phenotype"]:
		if info["Phenotype"] == "High risk of hypersensitivity":
			info["Recommendation"] = "Abacavir is not recommended" 
			info["Implication"] = "Significantly increased risk of abacavir hypersensitivity"
		if info["Phenotype"] == "Very low risk of hypersensitivity":
			info["Recommendation"] = "Use abacavir per standard dosing guidelines"
			info["Implication"] = "Low or reduced risk of abacavir hypersensitivity"
	elif info["Diplotype"]:
		if "*57.01" in info["Diplotype"] or "57.01" in info["Diplotype"]:
			info["Phenotype"] = "High risk of hypersensitivity"
			info["Recommendation"] = "Abacavir is not recommended"
			info["Implication"] = "Significantly increased risk of abacavir hypersensitivity"
		else:
			info["Phenotype"] = "Very low risk of hypersensitivity"
			info["Recommendation"] = "Use abacavir per standard dosing guidelines"
			info["Implication"] = "Low or reduced risk of abacavir hypersensitivity"
	elif info["Allele1"] and info["Allele2"]:
		if info["Allele1"] == "*57.01" or info["Allele1"] == "57.01" or info["Allele2"] == "*57.01" or info["Allele2"] == "57.01":
			info["Phenotype"] = "High risk of hypersensitivity"
			info["Recommendation"] = "Abacavir is not recommended"
			info["Implication"] = "Significantly increased risk of abacavir hypersensitivity"
		else:
			info["Phenotype"] = "Very low risk of hypersensitivity"
			info["Recommendation"] = "Use abacavir per standard dosing guidelines"
			info["Implication"] = "Low or reduced risk of abacavir hypersensitivity"
	else:
		raise Exception("insufficient data")

	
	#output
	return info.copy()