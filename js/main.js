/******************************************************************
 ***************************MAP 1**********************************
 *****************************************************************/

/*re-renders the map for the selected year*/
function drawMap(year, gunType, dataObject) {
	//clear map div so map is not duplicated
	$("#map1").empty();

	//do all necessary calculations of data here
	for(state in dataObject) {
		if (!dataObject.hasOwnProperty(state)){
			continue;
		}
		var gunMurdersPer100K = gunMurdersPer(dataObject, state, year, gunType, 100000);
		var gunMurdersPer100Kshort = gunMurdersPer100K.toFixed(2);
		//stick the shortened figure in the JSON object for use in the tooltip
		dataObject[state][year]["GunMurdersPer100K"] = gunMurdersPer100Kshort;

		//console.log(gunMurdersPer100K);
		if(state == "FL"){
			dataObject[state]["fillKey"] = "NODATA";
		}
		else if((gunMurdersPer100K >= 0) && (gunMurdersPer100K < 1)){
			//one color
			dataObject[state]["fillKey"] = "LEV1";
		}
		else if((gunMurdersPer100K >= 1) && (gunMurdersPer100K < 2)){
			//another color
			dataObject[state]["fillKey"] = "LEV2";
		}
		else if((gunMurdersPer100K >= 2) && (gunMurdersPer100K < 3)){
			//another color
			dataObject[state]["fillKey"] = "LEV3";
		}
		else if((gunMurdersPer100K >= 3) && (gunMurdersPer100K < 4)){
			//another color
			dataObject[state]["fillKey"] = "LEV4";
		}
		else if((gunMurdersPer100K >= 4) && (gunMurdersPer100K < 5)){
			//another color
			dataObject[state]["fillKey"] = "LEV5";
		}
		else if(gunMurdersPer100K >= 5){
			//another color
			dataObject[state]["fillKey"] = "LEV6";
		}
	}

	//set up popup tmeplate
	var newTemplate = '<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data[' + year + ']["Total murders1"]) { %><hr/>  Total Homicides: <%= data[' + year + ']["Total murders1"] %> <% } %><br/>Total Firearm Homicides: <%= data[' + year + ']["Total firearms"] %><br/>Population: <%= data[' + year + ']["Population"] %><br/><strong>Firearm Homicides Per 100K People:</strong> <%= data[' + year + ']["GunMurdersPer100K"] %></div>';

	//set up map variable
	map = new Map({
		scope: 'usa',
		el: $('#map1'),
      	geography_config: { 
        	borderColor: '#d7d7d7',
        	highlightBorderColor: '#333333',
        	highlightOnHover: true,
        	popupTemplate: _.template(newTemplate)
      },
		fills: {
			'LEV1': '#EDF8FB',
			'LEV2': '#BFD3E6',
			'LEV3': '#9EBCDA',
			'LEV4': '#8C96C6',
			'LEV5': '#8856A7',
			'LEV6': '#810F7C',
			'NODATA': '#EFEFEF',
			'ACTIVE': '#BADA55',
			defaultFill: '#EFEFEF'
		},
		data: state_data_JSON
	});

	//render the map
	map.render();

	//update globals
	yearShown = year;
	gunTypeShown = gunType;
	
	// Re-render the graph ever time a state is clicked
    map.$el.bind("map-click", function(e, data) {
        console.log(data.geography.id);
        
        if (data.geography.id == "FL") {
			$(".container").empty();
			$("#bars").empty();
			$("#linetitle").text("No data for Florida");
			$("#bartitle").empty();
		}
		else {
			console.log(data.geography.id);
			$(".container").empty();
			_STATE = data.geography.id;
			drawGraph(_STATE);
			//_YEAR = "2006";
			$("#linetitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homicides by Year");
			$("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Homicides by Firearm Type - " + yearShown);
			$("#bars").empty();
			drawBars(_STATE,yearShown);	
		}
    });
	
	
}

/*year dropdown handler*/
function initYearSelect() {
	$("#year").change(function() {
		//find which year was selected
		var year = this.value;
		//redraw the map based on that year
		drawMap(year, gunTypeShown, state_data_JSON);
	});
}

/*gun type dropdown handler*/
function initGunTypeSelect() {
	$("#gun-type").change(function() {
		//find which was selected
		var gunType = this.value;
		//redraw map
		drawMap(yearShown, gunType, state_data_JSON);
	});
}

/*returns # of gun murders per given # of ppl in a given year for a given state*/
function gunMurdersPer(dataObject, state, year, gunType, per) {
	//figure out which gun type to use
	var gunTypeData = "";
	if(gunType == "all"){
		gunTypeData = "Total firearms";
	}
	else if(gunType == "handguns"){
		gunTypeData = "Handguns";
	}
	else if(gunType == "rifles"){
		gunTypeData = "Rifles";
	}
	else if(gunType == "shotguns"){
		gunTypeData = "Shotguns";
	}
	else if(gunType == "unknown") {
		gunTypeData = "Firearms (type unknown)";
	}

	var pop = dataObject[state][year]["Population"];
	//console.log(pop);
	var totalGunMurders = dataObject[state][year][gunTypeData];
	console.log(gunTypeData);
	//console.log(totalGunMurders);
	var gunMurdersPer = (per * totalGunMurders)/pop;
	//console.log("gunmurdersper: " + gunMurdersPer);
	return gunMurdersPer;
}
 
 /****************************************************************
 ***************************GUN LAW MAP***************************
 *****************************************************************/

/*updates the gun law map key based on the law type selection*/
function updateLawKey(lawType, fillKey){
	var obj = gun_key[lawType];
	for (var i in obj) {
		console.log(obj[i]["rating"]);
		console.log(obj[i]["desc"]);
	}
}

/*re-renders the map for the selected year*/
function drawMapGuns(year, lawType, name, dataObject) {
	//clear map div so map is not duplicated
	$("#map2").empty();

	
	
	//clear out popup template
	newTemplate = "";

	var type;
	//var name;
	
	var fillColors = {
				'GREAT': '#0066FF',
				'GOOD': '#99CCFF',
				'NONE': '#FFFFFF',
				'BAD': '#FF6666',
				'AWFUL': '#CC0000',
				'UNCLEAR':'#E5EEEE',
				defaultFill: '#EFEFEF'
			};
			
	updateLawKey(lawType, fillColors);
	
	//do all necessary calculations of data here
	for(state in dataObject) {
		type = dataObject[state][lawType];
		dataObject[state]["fillKey"] = gun_key[lawType][type]["rating"];
		/*
		if (lawType == "alcoholserved") {
			name = gun_key[lawType]["name"]
			if(type == "allowed"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "partial ban"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "ban"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "unclear"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "arenas") {
			name = "Arenas";
			if(type == "allowed"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "ban"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "unclear"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "churches") {
			name="Churches";
			if(type == "allowed"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "ban"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "partial"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "unclear"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "concealedtype") {
			name="Concealed Type";
			if(type == "unrestricted"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "may issue"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "shall issue"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "no issue"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "gunshowregulation") {
			name = "Gun Shows";
			if(type == "gsbg"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "no regulation"){
				dataObject[state]["fillKey"] = "NONE";
			}
			else if(type == "other regulation"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "other regulation, gsbg"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "other regulation, ubg"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "ubg"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "gunsoncampus") {
			name = "College Campuses";
			if(type == "allow"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "ban"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "ban - bc noconcealed weapons"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "descretion"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "hospitals") {
			name = "Hospitals";
			console.log(type);
			if(type == "allowed"){
				dataObject[state]["fillKey"] = "NONE";
			}
			else if(type == "ban"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "partial ban"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "unclear"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "hownerlicense") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
		}
		else if (lawType == "hpermitpurchase") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
		}
		else if (lawType == "hregistration") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "record"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "prohibit"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		else if (lawType == "lockingdevice") {
			name = "";
			if(type == "regulation"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "no regulation"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
		}
		else if (lawType == "lockstorage") {
			name = "";
			if(type == "no regulation"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "minor regulation"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "unclear"){
				dataObject[state]["fillKey"] = "NONE";
			}
			else if(type == "regulation"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "loststolen") {
			name = "";
			if(type == "no regulation"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "regulation"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "opencarryhandguns") {
			name = "";
			if(type == "allow"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "prohibit"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "permit"){
				dataObject[state]["fillKey"] = "GOOD";
			}
		}
		else if (lawType == "opencarrylongguns") {
			name = "";
			if(type == "allow"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if (type == "prohibit"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "privatesellerregulation") {
			name = "";
			if(type == "no regulation"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "ubg, record"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "vbg"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "record"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "bg"){
				dataObject[state]["fillKey"] = "GOOD";
			}
		}
		else if (lawType == "rownerlicense") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "rpermitpurchase") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "rregistration") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "prohibit"){
				dataObject[state]["fillKey"] = "GREAT";
			}
		}
		else if (lawType == "standgroundlaw") {
			name = "";
			if(type == "y"){
				dataObject[state]["fillKey"] = "AWFUL";
			}
			else if(type == "n"){
				dataObject[state]["fillKey"] = "GREAT";
			}
			else if(type == "yv"){
				dataObject[state]["fillKey"] = "GOOD";
			}
			else if(type == "common"){
				dataObject[state]["fillKey"] = "NONE";
			}
		}
		*/
	}

	console.log(name);

	// Insert the text description of the law into data

	//state_data_JSON[lawdesc] = gun_key[data[lawType]];
	
	//set up popup tmeplate
	var newTemplate = '<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data[lawType]) { %><hr/> <%= lawType %>: <%= gun_key[lawType][data[lawType]]["name"] %> <% } %></div>';
	//var newTemplate = '<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data[' + lawType + ']) { %><hr/> <%= lawType %>: <%= ' + gun_key[0][lawType][ + 'data[lawType]' + ']' + '%> <% } %></div>';
	
	//set up map variable
	map2 = new Map({
		scope: 'usa',
		el: $('#map2'),
      	geography_config: { 
        	borderColor: '#d7d7d7',
        	highlightBorderColor: '#333333',
        	highlightOnHover: true,
        	popupTemplate: _.template(newTemplate)
      },
		fills:fillColors,
		data: state_data_JSON
	});

	//render the map
	map2.render();

	//update globals
	//yearShown = year;
	//gunTypeShown = gunType;
	
	// Re-render the graph every time a state is clicked
	/*
    map.$el.bind("map-click", function(e, data) {
        console.log(data.geography.id);
        
        if (data.geography.id == "FL") {
			$(".container").empty();
			$("#bars").empty();
			$("#linetitle").text("No data for Florida");
			$("#bartitle").empty();
		}
		else {
			console.log(data.geography.id);
			$(".container").empty();
			_STATE = data.geography.id;
			drawGraph(_STATE);
			//_YEAR = "2006";
			$("#linetitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homicides by Year");
			$("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Homicides by Firearm Type - " + yearShown);
			$("#bars").empty();
			drawBars(_STATE,yearShown);	
		}
    });
*/
}

/*law type dropdown handler*/
function initLawTypeSelect() {
	$("#law-type").change(function() {
		//find which was selected
		var lawType = this.value;
		//var lawName = this.html;
		//console.log(lawName);
		//redraw map
		drawMapGuns(yearShown, lawType, name, state_data_JSON);
	});
}
 
/******************************************************************
 ***************************TOUR OF PAGE***************************
 *****************************************************************/

 function initTourBtn() {
 	$('button')
 		.button()
 		.click(function(event){
 			event.preventDefault();
 			introJs().start();
 		});
 }


/******************************************************************
 ***************************DOCUMENT READY*************************
 *****************************************************************/

//global variables for map1
var map;
var gunTypeShown = "all";
var yearShown = "2006";
//global variables for map2
var lawType = "alcoholserved";
//var lawName;
var name = "Alcohol Served";

//global variable for map2
var map2;

window.onload = function() {
	//init map 1
	drawMap(yearShown, gunTypeShown, state_data_JSON);

	//init map1 filters
	initYearSelect();
	initGunTypeSelect();

	//init map 2
	drawMapGuns(yearShown, lawType, name, state_data_JSON);

	//init map2 filters
	initLawTypeSelect();

	initTourBtn();

	//for testing
	//alert("javascript is working.");

}