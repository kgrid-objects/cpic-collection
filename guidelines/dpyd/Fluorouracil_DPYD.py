
#CPIC guidelines for DPYD genotype and Fluorouracil dosing 

def getGuideline(instr):
	if instr["phenotype"]:
		elif instr["phenotype"] == "high DPD activity":
			instr["rec"] = "Use label-recommended dosage and administration"
		elif instr["phenotype"] == "intermediate DPD activity":
			instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
		elif instr["phenotype"] == "DPD deficiency":
			instr["rec"] = "Select alternative drug"
		else:
			raise Exception("insufficient data")			
	elif instr["diplotype"]:
		elif instr["diplotype"] == "*1/*1":
			instr["phenotype"] = "high DPD activity"
			instr["rec"] = "Use label-recommended dosage and administration"
		elif instr["diplotype"] == "*1/2A" or instr["diplotype"] == "*1/*13" or instr["diplotype"] == "*1/rs67376798":
			instr["phenotype"] = "intermediate DPD activity"
			instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
		elif instr["diplotype"] == "*2A/*2A" or instr["diplotype"] == "13/*13" or instr["diplotype"] == "rs67376798/rs67376798":
			instr["phenotype"] = "DPD deficiency"
			instr["rec"] = "Select alternative drug"
		else:
			raise Exception("insufficient data")
	elif instr["allele1"] and instr["allele2"]:
		if (instr["allele1"] == instr["allele2"]) and (instr["allele1"] == "*1" or instr["allele1"] == "1"):
			instr["phenotype"] = "high DPD activity"
			instr["rec"] = "Use label-recommended dosage and administration"
		elif (instr["allele1"] == "*1") and (instr["allele2"] == "*2A" or instr["allele2"] == "*13" or instr["allele2"] == "rs67376798"):
			instr["phenotype"] = "intermediate DPD activity"
			instr["rec"] = "Start with at least a 50%% reduction in starting dose, followed by titration of dose based on toxicityb or pharmacokinetic test (if available)"
		elif (instr["allele1"] == instr["allele2"]) and (instr["allele1"] == "*2A" or instr["allele1"] == "*1" or instr["allele1"] == "rs67376798"):
			instr["phenotype"] = "DPD deficiency"
			instr["rec"] = "Select alternative drug"
		else:
			raise Exception("insufficient data")
	else:
		raise Exception("insufficient data")
