/* Adapted from Sofia Hou's example in lab */
function drawGraph(state) {

    var margin = {top: 20, right: 50, bottom: 50, left: 50}, 
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
        
    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var svg = d3.select(".container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    var mydata = state_data_JSON[state];
    
    data = []
    $.each(mydata, function(key, value) {
        if (key != "Name") {
            per100K = value["Total firearms"]*(100000.0/value["Population"]);
            if (!isNaN(per100K)) {
                data.push({"x":key,"y":per100K});
            }

        }
    });
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(data.length);
    var yAxis = d3.svg.axis().scale(y).orient("left");
    
    data.forEach(function (d) {
        d.x = parseDate(d.x);
        d.y = parseFloat(d.y);
    });
    
    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain(d3.extent(data, function(d) { return d.y; }));
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Firearm Homocides Per 100K")
        .attr("font-family", "Open Sans")

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)

    dots = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dots")
        .attr("cx", function(d) 
            { return x(d.x); })
        .attr("cy", function(d) 
            { return y(d.y); })
        .attr("r", 6);

    dots.on("mouseover", mouseover)
        .on("mouseout", mouseout);
    
	
	/*brushing functionality is adapted from John Mercer's example, as well as here: http://bl.ocks.org/mbostock/4063663 */
	var brush = d3.svg.brush()
      .x(x)
      //.y(y)
      .on("brushstart", brushstart)
      .on("brush", brushmove)
      .on("brushend", brushend);
	  
	//context for the brush
	var context = svg.append("g");

	//this is from the context + linking example
	context.append("g")
		.attr("class", "x brush")
		.call(brush)
	.selectAll("rect")
		.attr("height", height);
	
	var brushBar;
	
	function brushstart(p) {
    console.log("brush start."); 
    if (brushBar !== p) {
      bar.call(brush.clear());
      brushBar = p;
      $("#bars").empty();
        console.log(d.x.getFullYear());
        $("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homocides by Weapon - " + yearShown);
        drawBars(_STATE,yearShown);
	   }
	}

	// Highlight the selected circles.
	function brushmove(p) {  
		var e = brush.extent();
    var points = d3.selectAll("circle");
	}
  
	// If the brush is empty, select all circles.
	function brushend(p) {
		console.log("brush end...");

    var indices  = [];
    for(var i = 0; i < dots[0].length; i++) {
      var circle = dots[0][i];
      var xCoord = $(circle).attr('cx');
      var yCoord = $(circle).attr('cy');
      var extentX1 = $(".extent").attr("x");
      extentX1 = parseFloat(extentX1);
      var exWidth = $(".extent").attr("width");
      exWidth = parseFloat(exWidth);
      var extentX2 = extentX1 + exWidth;
      console.log(extentX1);
      console.log(exWidth);
      console.log(extentX2);
      if (xCoord >= extentX1 && xCoord <= extentX2){
        //if the data is within the extent of the brush then output the index
        console.log("Index:"+i);
        indices.push(i);
      }
    }
    $("#bars").empty();
    drawBarsYears(_STATE,indices);
	}

}

function mouseover (d) {
     d3.select(this)
        .style("fill", "red")
        .attr("r", 7);
    
    $("#bars").empty();
    console.log(d.x.getFullYear());
    $("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homocides by Weapon - " + d.x.getFullYear());
    drawBars(_STATE,d.x.getFullYear());
};

function mouseout (d) {
    d3.select(this)
        .style("fill", "black")
        .attr("r", 6);
};

function isInDocument (el) {
    var html = document.body.parentNode;
    while (el) {
        if (el === html) {
            return true;
        }
        
        el = el.parentNode;
    }
    return false;
};

/* Adapted from Billy Janitsch's example in lab */
function drawBars(state,year) {
    
    var mydata = state_data_JSON[state][year];
    
    data = []

        var total = mydata["Total firearms"];
        var unknown = (mydata["Firearms (type unknown)"]/total)*100;
        var hangun = (mydata["Handguns"]/total)*100;
        var rifles = (mydata["Rifles"]/total)*100;
        var shotguns = (mydata["Shotguns"]/total)*100;

        data.push({"label":"Unknown Type","score":unknown})
        data.push({"label":"Handguns","score":hangun})
        data.push({"label":"Rifles","score":rifles})
        data.push({"label":"Shotguns","score":shotguns})
    
    var chart = d3.select("#bars");
    var width = chart.attr("width");
    var height = chart.attr("height");
    
    var w = width;
    var h = 15;
    
    var x = d3.scale.linear()
      .domain([0, 80]) // changed from [0, 5]
      .range([0, w-150]);
    
    var y = d3.scale.linear()
      .domain([0, 1])
      .range([0, h]);
    
    var color = d3.scale.linear()
      .domain([0, 20, 40, 60, 80]) // from 1, 2, 3, 4, 5
      .range(["#FFB870", "#FF9933", "#FF3300", "#FF0000", "#CC0000"]);
    
    chart.selectAll("rect.data")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) { return 150; })
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1); })
      .attr("width", 0)
      .attr("height", h)
      .attr("shape-rendering", "crispEdges")
      .attr("data-label", function(d) { return d.label})
      .attr("stroke-width", 0)
      .attr("fill", function(d, i) { return color(1); })
      .attr("class", "data")
      .transition()
      .duration(500)
      .attr("width", function(d) { return x(d.score); })
      .attr("fill", function(d) { return color(d.score); });
    
    chart.selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) { return d.label; })
      .attr("text-anchor", "end")
      .attr("x", 90)
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1) + h - 3; })
      .attr("fill", "#333")
      .attr("font-size", "12px")
      .attr("font-family", "Arial")
      .attr("stroke-width", 0)
      .attr("data-label", function(d) { return d.label; })
    
    chart.selectAll("text.score")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) { return parseFloat(d.score).toFixed(1) + "%"; })
      .attr("x", function(d) { return 100; }) 
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1) + h - 3; })
      .attr("fill", "#333")
      .attr("font-size", "12px")
      .attr("font-family", "Arial")
      .attr("stroke-width", 0)
      .attr("data-label", function(d) { return d.label; })
      .attr("class", "score");
}

/* Adapted from Billy Janitsch's example in lab */
function drawBarsYears(state,years) {
    if (years.length == 0) {
        $("#bars").empty();
        $("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homocides by Weapon - " + yearShown);
        drawBars(_STATE,yearShown);
    }
    else{
    console.log(years);
    data = []
    
    var total = 0;
    var unknown = 0;
    var hangun = 0;
    var rifles = 0;
    var shotguns = 0;
    
    //key = [{0:"2006", 1:"2007", 2:"2007", 3:"2007", 4:"2007", 5:"2007"}];
    var minYear = 0
    var maxYear = 0
    
    
    
    for (var i = 0; i < years.length; i++) {
        if (i == 0) {
            minYear = 2006 + years[i]
        }
        if (minYear > 0) {
            maxYear = 2006 + years[i]
        }
        
        a = String(2006 + years[i]);
        console.log(a);
        mydata = state_data_JSON[state][a];
    
        total += parseFloat(mydata["Total firearms"]);
        unknown += parseFloat(mydata["Firearms (type unknown)"]);
        hangun += parseFloat(mydata["Handguns"]);
        rifles += parseFloat(mydata["Rifles"]);
        shotguns += parseFloat(mydata["Shotguns"]);

    }
    
    yearRange = minYear + " to " + maxYear;
    console.log(yearRange);
    $("#bartitle").text(state_data_JSON[_STATE]["Name"] + " Firearm Homocides by Weapon - " + yearRange);
    
    console.log(unknown);
    
    unknown = (unknown/total)*100;
    hangun = (hangun/total)*100;
    rifles = (rifles/total)*100;
    shotguns = (shotguns/total)*100;

    data.push({"label":"Unknown Type","score":unknown})
    data.push({"label":"Handguns","score":hangun})
    data.push({"label":"Rifles","score":rifles})
    data.push({"label":"Shotguns","score":shotguns})
    
    var chart = d3.select("#bars");
    var width = chart.attr("width");
    var height = chart.attr("height");
    
    var w = width;
    var h = 15;
    
    var x = d3.scale.linear()
      .domain([0, 80]) // changed from [0, 5]
      .range([0, w-150]);
    
    var y = d3.scale.linear()
      .domain([0, 1])
      .range([0, h]);
    
    var color = d3.scale.linear()
      .domain([0, 20, 40, 60, 80]) // from 1, 2, 3, 4, 5
      .range(["#FFB870", "#FF9933", "#FF3300", "#FF0000", "#CC0000"]);
    
    chart.selectAll("rect.data")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) { return 150; })
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1); })
      .attr("width", 0)
      .attr("height", h)
      .attr("shape-rendering", "crispEdges")
      .attr("data-label", function(d) { return d.label})
      .attr("stroke-width", 0)
      .attr("fill", function(d, i) { return color(1); })
      .attr("class", "data")
      .transition()
      .duration(500)
      .attr("width", function(d) { return x(d.score); })
      .attr("fill", function(d) { return color(d.score); });
    
    chart.selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) { return d.label; })
      .attr("text-anchor", "end")
      .attr("x", 90)
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1) + h - 3; })
      .attr("fill", "#333")
      .attr("font-size", "12px")
      .attr("font-family", "Arial")
      .attr("stroke-width", 0)
      .attr("data-label", function(d) { return d.label; })
    
    chart.selectAll("text.score")
      .data(data)
      .enter()
      .append("text")
      .text(function(d) { return parseFloat(d.score).toFixed(1) + "%"; })
      .attr("x", function(d) { return 100; }) 
      .attr("y", function(d, i) { return h*i + (height-(h*data.length))/(data.length+1)*(i+1) + h - 3; })
      .attr("fill", "#333")
      .attr("font-size", "12px")
      .attr("font-family", "Arial")
      .attr("stroke-width", 0)
      .attr("data-label", function(d) { return d.label; })
      .attr("class", "score");
    }

}
