
#returns json object containing CPIC guideline table for the cyp2d6 enzyme for codeine along with 
# a dictionary that maps alleles to their indices in the table for fast lookup
def getGuideline():
	jason = {}
	alleleIndices = {}

	alleleIndices = {"*1": 0, "*2": 1, "*1xN": 2, "*2xN": 3," *3": 4, "*4": 5, "*4xN": 6, "*5": 7, "*6": 8, 
				"*10": 9, "*17": 10, "*41": 11}


	NM = 0
	PM = 1
	IM = 2
	EM = 3
	UM = 4
	UorE = 43

	guidlineTable = [
		[EM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, EM, UM, UM, EM, EM, EM, EM, EM, EM, EM, EM],
		[NM, NM, UM, UM, UorE, UorE, UorE, UorE, UorE, UM, UM, UM],
		[NM, NM, NM, NM, PM, PM, PM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, PM, PM, PM, PM,  IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, PM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, PM, IM, IM, IM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM, EM],
		[NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, NM, EM]
	]

	jason['guideline'] = guidlineTable
	jason['alleleIndicies'] = alleleIndices

	return json.dumps(jason)
