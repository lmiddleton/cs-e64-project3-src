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
        genBarLineGraphs(data);
        genLawDetails(data, dataObject);
        setBreakdownExpandCollapse();
    });
	
	
}

/*draws line graph and bar graph for given state*/
function genBarLineGraphs(data){
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
		$("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homicides by Weapon - " + yearShown);
		$("#bars").empty();
		drawBars(_STATE,yearShown);	
	}
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

/*dynamically generates the law map filter dropdown*/
function genLawSelect(laws){
	$('#law-type').html('');
	for(i = 0; i < laws.length; i++){
		var lawIndex = laws[i]; //will be the option value
        if(gun_key[lawIndex]){
        	var lawName = gun_key[lawIndex]["name"]; //will be the displayed name
        }

        $('#law-type').append('<option value="' + lawIndex + '">' + lawName + '</option>');
    }
}

/*updates the gun law map key based on the law type selection*/
function updateLawKey(lawType, fillKey){
	$('#map2-title').html('<strong>' + gun_key[lawType]["name"] + '</strong>');
	$('#key2').html('<br /><ul class="ul-basic" id="key2list">');
	var obj = gun_key[lawType];
	if (lawType == 'smartgunlaws') {
		$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey["SCORE1"] + ';"></div> 0 - 9 </li>');
		$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey["SCORE2"] + ';"></div> 10 - 19 </li>');
		$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey["SCORE3"] + ';"></div> 20 - 29 </li>');
		$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey["SCORE4"] + ';"></div> 30 - 39 </li>');
		$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey["SCORE5"] + ';"></div> 40 - 50 </li>');
	}
	else {
		for (var i in obj) {
			$('#key2list').append('<li><div class="color-key" style="background-color: ' + fillKey[obj[i]["rating"]] + ';"></div> ' + obj[i]["name"] + '</li>');
		}
		$("li:contains('undefined')").remove(); 
	}
}

/*re-renders the map for the selected year*/
function drawMapGuns(year, lawType, name, dataObject, laws) {
	//clear map div so map is not duplicated
	$("#map2").empty();
	
	//clear out popup template
	newTemplate = "";

	var type;
	//var name;
	
	var fillColors = {
		'GREAT': '#018571',
		'GOOD': '#80CDC1',
		'NONE': '#FFFFFF',
		'BAD': '#DFC27D',
		'AWFUL': '#A6611A',
		'UNCLEAR':'#999999',
		'SCORE1' : '#FEF0D9',
		'SCORE2' : '#FDCC8A',
		'SCORE3' : '#FC8D59',
		'SCORE4' : '#E34A33',
		'SCORE5' : '#B30000',
		defaultFill: '#EFEFEF'
	};
	
	updateLawKey(lawType, fillColors);
	
	//do all necessary calculations of data here
	for(state in dataObject) {
		type = dataObject[state][lawType];
		if (lawType == 'smartgunlaws') {
			console.log(state);
			if (dataObject[state]['smartgunlaws'] < 10) {
				dataObject[state]["fillKey"] = 'SCORE1';
			}
			else if (dataObject[state]['smartgunlaws'] < 20 && dataObject[state]['smartgunlaws'] >= 10) {
				dataObject[state]["fillKey"] = 'SCORE2';
			}
			else if (dataObject[state]['smartgunlaws'] < 30 && dataObject[state]['smartgunlaws'] >= 20) {
				dataObject[state]["fillKey"] = 'SCORE3';
			}
			else if (dataObject[state]['smartgunlaws'] < 40 && dataObject[state]['smartgunlaws'] >= 30) {
				dataObject[state]["fillKey"] = 'SCORE4';
			}
			else if (dataObject[state]['smartgunlaws'] <= 50) {
				dataObject[state]["fillKey"] = 'SCORE5';
			}
		}
		else {
			dataObject[state]["fillKey"] = gun_key[lawType][type]["rating"];
		}
	}

	// Insert the text description of the law into data

	//state_data_JSON[lawdesc] = gun_key[data[lawType]];
	
	//set up popup tmeplate
	var newTemplate = '<div class="hoverinfo"><strong><%= geography.properties.name %></strong></div>';
	//var newTemplate = '<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data[lawType]) { %><hr/> <%= lawType %>: <%= gun_key[lawType][data[lawType]]["name"] %> <% } %></div>';
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
	
	// Re-render the graph every time a state is clicked
    map2.$el.bind("map-click", function(e, data) {
    	genBarLineGraphs(data);
        genLawDetails(data, dataObject);
        setBreakdownExpandCollapse();
    });
}

/*generates the law details content for a given state*/
function genLawDetails(data, dataObject) {
	$('#state-law-details-parent').html('<span id="law-details-state">'); //clear out div

	var lawSelected = $('#law-type :selected').val(); //find which law is selected
	console.log(lawSelected);

	var state = data.geography.id;
    var stateName = dataObject[state]["Name"];

	$('#law-details-state').append('<span class="law-breakdown-title">' + stateName + ' Firearm Law Breakdown</span><br /><br />');

    for(i = 0; i < laws.length; i++){
        var lawIndex = laws[i];
        console.log(lawIndex);
        if(gun_key[lawIndex] && lawIndex != 'smartgunlaws'){
        	var lawName = gun_key[lawIndex]["name"];
        	var lawCat = dataObject[state][lawIndex];
        	var law = gun_key[lawIndex][lawCat]["name"];
        	var lawDesc = gun_key[lawIndex][lawCat]["desc"];
        }
        else if(lawIndex == 'smartgunlaws'){
        	var lawName = gun_key[lawIndex]["name"];
        	var law = dataObject[state]['smartgunlaws'];
        	var lawDesc = gun_key[lawIndex]["name"];
        }
        
        if(lawIndex == lawSelected){
        	$('#law-details-state').append('<div><div href="law' + i + '" class="ui-icon ui-icon-triangle-1-e law-expand"></div><strong><span class="law-title law-highlight" law="' + lawIndex + '">' + lawName + ': </span></strong>' +  law + '</div><div id="law' + i + '" class="hidden law-desc">' + lawDesc + '</div>');
    	}
    	else{
    		$('#law-details-state').append('<div><div href="law' + i + '" class="ui-icon ui-icon-triangle-1-e law-expand"></div><strong><span class="law-title" law="' + lawIndex + '">' + lawName + ': </span></strong>' +  law + '</div><div id="law' + i + '" class="hidden law-desc">' + lawDesc + '</div>');
    	}
    }

}

/*sets the expand/collapse of the law breakdown categories*/
function setBreakdownExpandCollapse(){
	$('.ui-icon').on("click", function(){
		if($(this).hasClass('law-expand')){
			$(this).removeClass('law-expand ui-icon-triangle-1-e').addClass('law-collapse ui-icon-triangle-1-s');
			var lawId = $(this).attr('href');
			$('#' + lawId).removeClass('hidden');
		}
		else if($(this).hasClass('law-collapse')){
			$(this).removeClass('law-collapse ui-icon-triangle-1-s').addClass('law-expand ui-icon-triangle-1-e');
			var lawId = $(this).attr('href');
			$('#' + lawId).addClass('hidden');
		}
	});
}

/*law type dropdown handler*/
function initLawTypeSelect() {
	$("#law-type").change(function() {
		//find which was selected
		var lawType = this.value;
		//change the highlight on the law breakdown
		$(".law-title").removeClass('law-highlight');
		$("[law=" + lawType + "]").addClass('law-highlight');

		//redraw map
		drawMapGuns(yearShown, lawType, name, state_data_JSON, laws);
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
var lawType = "smartgunlaws";
//var lawName;
var name = "SmartGunLaw.org Score";

//global variable for map2
var map2;

//law categories - duplicated are commented out
var laws = [
	"smartgunlaws",
	"alcoholserved",
	"arenas",
	"churches",
	"concealedtype",
	"gunshowregulation",
	"gunsoncampus",
	"hospitals",
	"hownerlicense",
	//"hpermitpurchase",
	"hregistration",
	"lockingdevice",
	//"lockstorage",
	"loststolen",
	"opencarryhandguns",
	"opencarrylongguns",
	"privatesellerregulation",
	//"rownerlicense",
	//"rpermitpurchase",
	"rregistration",
	"standgroundlaw"
];

function graphLawMurders(lawType,weaponType) {
	dataSet = {};
	
	var obj = gun_key[lawType];
	
	for (var i in obj) {
		if (i == "name") {
			$('#barlawstitle').text('National ' + weaponType + ' Murders per 100K by Law: ' + obj[i]);
		}
		else {
			dataSet[i] = {"murders":0,"population":0}
		}
	}
	
	for(var j in state_data_JSON){
		if (j != "FL") {
			dataSet[state_data_JSON[j][lawType]]["murders"] += parseFloat(state_data_JSON[j]["2010"][weaponType]);
			dataSet[state_data_JSON[j][lawType]]["population"] += parseFloat(state_data_JSON[j]["2010"]["Population"]);
		}
		
	}
	console.log(dataSet);
	
	drawBarsLaws(dataSet,lawType);
}

window.onload = function() {
	//init map 1
	drawMap(yearShown, gunTypeShown, state_data_JSON);

	//init map1 filters
	initYearSelect();
	initGunTypeSelect();

	//init map 2
	drawMapGuns(yearShown, lawType, name, state_data_JSON, laws);
	genLawSelect(laws);

	//init map2 filters
	initLawTypeSelect();

	initTourBtn();

	graphLawMurders("alcoholserved","Handguns");
	
	//for testing
	//alert("javascript is working.");

}