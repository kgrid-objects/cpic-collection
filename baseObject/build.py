# KGrid Team Authoring/Executing Knowledge Objects Tool: Knowledge Object Generator
# Created January 31, 2017
# Takes in metadata (json), input rdf (xml), output rdf (xml), and payload (.py) files
# Uses the metadata (json) as the backbone, adding input, output, and payload, and outputting the knowledge object json file

import json

#given inputs
def build(metadataFile,inputFile,outputFile,payloadFile,KOFile):
	# open & read files
	try:
		in_file_metadata = open(metadataFile).read()
		in_file_payload = open(payloadFile).read()
		in_file_input = open(inputFile).read()
		in_file_output = open(outputFile).read()
	except IOError:
		print "No such file or directory"
		return None

	# loading in files as json
	try:
		backbone = json.loads(in_file_metadata)
		backbone["inputMessage"] = in_file_input
		backbone["outputMessage"] = in_file_output
		backbone["payload"]["content"] = in_file_payload

	except ValueError as e:
		print ('invalid json: %s' % e)
		return None

	# dump result into new files
	with open(KOFile, 'w') as outfile:
	    output = json.dump(backbone, outfile)
	return "*****DONE*****"


# Ask for inputs
def commandInput():
	metadataFile = raw_input("Enter Metadata File: ")
	inputFile = raw_input("Enter Input File: ")
	outputFile = raw_input("Enter Output File: ")
	payloadFile = raw_input("Enter Payload File: ")
	KOFile = raw_input("Knowledge Object Output File: ")

	output = build(metadataFile,inputFile,outputFile,payloadFile,KOFile)

	return output


# use testBuild("kog.json") to run hello world example
def testBuild(files):
    # load contents on json file
    inFile = open(files).read()
    content = json.loads(inFile)

    metadataFile = content["metadataFile"]
    inputFile = content["inputFile"]
    outputFile = content["outputFile"]
    payloadFile = content["payloadFile"]
    KOFile = content["KOFile"]

    output = build(metadataFile,inputFile,outputFile,payloadFile,KOFile)

    return output
