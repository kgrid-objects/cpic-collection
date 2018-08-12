// mme_conversion.js
// MME Conversion Calculator

// Created by Jack Allan (jackall@umich.edu) on June 14th, 2018


// ====================================
//  Global Variable & Data Definitions
// ====================================

var opioid1 = {
    name:"Codeine",
    factor:0.15,
    dose:"mg/day"
    rxnorm:""
};


var opioid2 = {						// two different conversion factors ?????
    name:"Fentanyl Patch",
    factor:2.4,
    dose:"mcg/hour"
    rxnorm:""
};

var opioid3 = {
    name:"Hydrocodone",
    factor:1,
    dose:"mg/day"
    rxnorm:""
};

var opioid4 = {
    name:"Hydromorphone",
    factor:4,
    dose:"mg/day"
    rxnorm:""
};

var opioid5 = {
    name:"Methadone 1-20 mg/day",
    factor:4,
    dose:"mg/day"
    rxnorm:""
};

var opioid6 = {
    name:"Methadone 21-40 mg/day",
    factor:8,
    dose:"mg/day"
    rxnorm:""
};

var opioid7 = {
    name:"Methadone 41-60 mg/day",
    factor:10,
    dose:"mg/day"
    rxnorm:""
};

var opioid8 = {
    name:"Methadone 61-90 mg/day",
    factor:12,
    dose:"mg/day"
    rxnorm:""
};

var opioid9 = {
    name:"Morphine",
    factor:1,
    dose:"mg/day"
    rxnorm:""
};

var opioid10 = {
    name:"Oxycodone",
    factor:1.5,
    dose:"mg/day"
    rxnorm:""
};

var opioid11 = {
    name:"Oxymorphine",
    factor:3,
    dose:"mg/day"
    rxnorm:""
};

var opioid12 = {
    name:"Burprenorphine Film/Tablet",
    factor:30,
    dose:"mg/day"
    rxnorm:""
};

var opioid13 = {
    name:"Burprenorphine Patch ",
    factor:12.6,
    dose:"mcg/hour"
    rxnorm:""
};

var opioid14 = {
    name:"Burprenorphine Film",
    factor:0.03,
    dose:"mcg"
    rxnorm:""
};

var opioid15 = {
    name:"Butorphanol",
    factor:7,
    dose:"mg/day"
    rxnorm:""
};

var opioid16 = {
    name:"Dihydrocodeine",
    factor:0.25,
    dose:"mg/day"
    rxnorm:""
};

var opioid17 = {
    name:"Fentanyl Buccal or SL Tablets/Lozenge",
    factor:0.13,
    dose:"mcg/day"
    rxnorm:""
};

var opioid18 = {
    name:"Fentanyl Film or Oral Spray",
    factor:0.18,
    dose:"mcg/day"
    rxnorm:""
};

var opioid19 = {
    name:"Fentanyl Nasal Spray",
    factor:0.16,
    dose:"mcg/day"
    rxnorm:""
};

var opioid20 = {
    name:"Fentanyl Patch",
    factor:7.2,
    dose:"mcg/day"
    rxnorm:""
};

var opioid21 = {
    name:"Levorphanol tartrate",
    factor:11,
    dose:"mg/day"
    rxnorm:""
};

var opioid22 = {
    name:"Meperidine hydrochloride",
    factor:0.1,
    dose:"mg/day"
    rxnorm:""
};

var opioid23 = {
    name:"Opium",
    factor:1,
    dose:"mg/day"
    rxnorm:""
};

var opioid24 = {
    name:"Pentazocine",
    factor:0.37,
    dose:"mg/day"
    rxnorm:""
};

var opioid25 = {
    name:"Tapentadol",
    factor:0.4,
    dose:"mg/day"
    rxnorm:""
};

var opioid26 = {
    name:"Tramadol",
    factor:0.1,
    dose:"mg/day"
    rxnorm:""
};



// ------------------------------------------------------------------------------------------------ //
// INPUT


	// read in values from an excel file
	var workbook = new Excel.Workbook();
	workbook.xlsx.readFile(filename)
		.then(function() {
	
			var worksheet = workbook.getWorksheet(Sheet1);
			worksheet.eachRow()



	});




	// write to a file
	var workbook = new Excel.Workbook();
	workbook.xlsx.writeFile(filename)
		.then(function() {



	});




	// rules

		/*

			max amount for ranges (ex. "2-4" = "4")

			"bedtime" and "every mornign" = once / day


		*/


	// error return for insufficient input



	// parsing



// ------------------------------------------------------------------------------------------------ //
// COMPUTATION


	function calculate() {
			
	}









