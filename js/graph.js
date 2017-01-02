/*
=====================================================
=========	GLOBAL VARIABLE DECLARATIONS	=========
=====================================================
*/

var clubs = ['arsenal', 'chelsea', 'shitpool', 'manshity', 'man-utd']

// Variables for SVG Dimensions
var width = 800, height = 420, mHeight = 80, xPadding = 40, yPadding = 30, minPadding = 5,
	yMargin = 20, xLabelX = 720, xLabelY = 450, yLabelX = xPadding+20, yLabelY = yMargin+210,
	widthMin = 210, heightMin = 180,

// Variables for storing data
	maxBuy = 100, val = [],
//Variables and data structures for storing team data
	pos1, pos2, pos3, pos4, pos5, pos6,
	transfers1, transfers2, trasnfers3, trasnfers4, trasnfers5,
	events1, events2, events3, events4, events5,
	maxArs, maxChe, maxMUFC, maxLiv, maxMCFC, maxTot

// Variables for piechart and icons
	r = 70, m = 10, lh = 21,
	imgHeight = 32, imgWidth = 32;

// SVG, Scales and Axes Declaration
var eventCanvas = d3.select("div.barVis")
			.append("svg")
			.attr("class", "eventCanvas")
			.attr("height", mHeight)
			.attr("width", width);

var bar = d3.select("div.barVis")
			.append("svg")
			.attr("class", "barCanvas")
			.attr("height", height)
			.attr("width", width);

var svg1 = d3.select("div.barVis")
			.append("svg")
			.attr("class", "pie-data")
			.attr("width", widthMin)
			.attr("height", (r + 2.5*m) * 2)
			.attr("style", "left: 60px");

var svg2 = d3.select("div.barVis")
			.append("svg")
			.attr("class", "pie-data")
			.attr("width", widthMin)
			.attr("height", (r + 2.5*m) * 2)
			.attr("style", "left: 280px");

var svg3 = d3.select("div.barVis")
			.append("svg")
			.attr("class", "pie-data")
			.attr("width", widthMin)
			.attr("height", (r + 2.5*m) * 2)
			.attr("style", "left: 500px");

// Define Scales for Year, Fee, Color and Position
var barxScale = d3.scale.linear()
				.domain([2001, 2016])
				.range([40, width-20]);

var baryScale = d3.scale.linear()
				.domain([0, maxBuy])
				.range([height - yPadding, yPadding + yMargin]);

var eventyScale = d3.scale.linear()
				.domain([0, maxBuy])
				.range([mHeight - minPadding, 2*minPadding]);

var barColor = d3.scale.ordinal()
				.domain(["In", "Out"])
				.range(["#61B7D1", "#F04F5A"])

var pieColor = d3.scale.ordinal()
				.domain(["G", "D", "M", "F"])
				.range(["#f9d45f", "#ef4343", "#bbd863", "#5159b7"]);

var xPosMonth = d3.scale.ordinal()
				.domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
				.range([-16, -12, -8, -4, 0, 4, 8, 12, 16, 20, 24, 28]);

var eventColor = d3.scale.ordinal()
					.domain([])

var posScale = d3.scale.linear()
				.domain([0, 21])
				.range([2*yPadding + yMargin, height - yPadding]);

// Define x and y Axis
var barxAxis = d3.svg.axis()
					.scale(barxScale)
					.orient("bottom")
					.tickFormat(d3.format("d"));

var baryAxis = d3.svg.axis()
					.scale(baryScale)
					.orient("left")
					.ticks("7");

eventCanvas.append("g")
	.attr("class", "axis")
	.attr("id", "barX")
	.attr("transform", "translate(0," + (mHeight - xPadding) + ")")
	.call(barxAxis);

bar.append("g")
	.attr("class", "axis")
	.attr("id", "barX")
	.attr("transform", "translate(0," + (height - yPadding) + ")")
	.call(barxAxis);

bar.append("g")
	.attr("class", "axis")
	.attr("id", "barY")
	.attr("transform", "translate("+ xPadding + ","+ 0 +")")
	.call(baryAxis);

bar.append("text")
    .attr("class", "axis-label")
    .attr("transform", "translate("+ yLabelX +","+ yLabelY +") rotate(-90)")
    .text("Transfer Fee (in million £)");

bar.append("text")
    .attr("class", "axis-label")
    .attr("transform", "translate("+ xLabelX +","+ xLabelY +")")
    .attr("dy", "-20")
    .text("Year");

bar.append("text")
    .attr("class", "axis-label")
    .attr("transform", "translate("+ xLabelX +","+ xLabelY +")")
    .text("Purchased");

// Move to Front on mouseover
d3.selection.prototype.moveToFront = function() {
	return this.each(function(){
		this.parentNode.appendChild(this);
		d3.select(this).attr("opacity", 1.0);
	});
};

d3.selection.prototype.moveToBack = function() {
	return this.each(function() {
		var firstChild = this.parentNode.firstChild;
		if (firstChild) {
			this.parentNode.insertBefore(this, firstChild);
			d3.select(this).attr("opacity", 0.5);
		}
	});
};

// Loading CSV files

// Team Position CSV file
d3.csv("data/standings/pl-Arsenal.csv", function(data){
	pos1 = data;
});

d3.csv("data/standings/pl-Chelsea.csv", function(data){
	pos2 = data;
});

d3.csv("data/standings/pl-ManUtd.csv", function(data){
	pos3 = data;
});

d3.csv("data/standings/pl-Liverpool.csv", function(data){
	pos4 = data;
});

d3.csv("data/standings/pl-ManCity.csv", function(data){
	pos5 = data;
});


//Team Events by year
d3.csv("data/arsenal/ArsenalEvents.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
	})
	events1 = data;
})

d3.csv("data/chelsea/ChelseaEvents.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
	})
	events2 = data;
})

d3.csv("data/liverpool/LiverpoolEvents.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
	})
	events4 = data;
})

d3.csv("data/mancity/ManCityEvents.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
	})
	events5 = data;
})

d3.csv("data/manutd/ManUtdEvents.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
	})
	events3 = data;
})

// Team Transfers Complete CSV file
d3.csv("data/arsenal/ArsenalTransfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		d.Fee = (+d.Fee)/1000000;
		d.Num = +d.Num;
		d.G = +d.G;
		d.D = +d.D;
		d.M = +d.M;
		d.F = +d.F;
	});
	transfers1 = data;
	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].Fee));
	}
	maxArs = Math.floor(Math.max.apply(null, array));
	maxBuy = maxArs + 10;

	drawEvents(maxBuy, events1);
	posLine(pos1);
	drawBar(maxBuy, transfers1);
	drawPie(transfers1[0], transfers1[1]);
	id = clubs[0], name = "Arsenal";
});

d3.csv("data/chelsea/ChelseaTransfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		d.Fee = (+d.Fee)/1000000;
		d.G = +d.G;
		d.D = +d.D;
		d.M = +d.M;
		d.F = +d.F;
	});
	transfers2 = data;
	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].Fee));
	}
	maxChe = Math.floor(Math.max.apply(null, array));
});

d3.csv("data/manutd/ManUtdTransfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		d.Fee = (+d.Fee)/1000000;
		d.G = +d.G;
		d.D = +d.D;
		d.M = +d.M;
		d.F = +d.F;
	});
	transfers3 = data;
	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].Fee));
	}
	maxMUFC = Math.floor(Math.max.apply(null, array));
});

d3.csv("data/liverpool/LiverpoolTransfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		d.Fee = (+d.Fee)/1000000;
		d.G = +d.G;
		d.D = +d.D;
		d.M = +d.M;
		d.F = +d.F;
	});
	transfers4 = data;
	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].Fee));
	}
	maxLiv = Math.floor(Math.max.apply(null, array));
});

d3.csv("data/mancity/ManCityTransfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		d.Fee = (+d.Fee)/1000000;
		d.G = +d.G;
		d.D = +d.D;
		d.M = +d.M;
		d.F = +d.F;
	});
	transfers5 = data;
	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].Fee));
	}
	maxMCFC = Math.floor(Math.max.apply(null, array));
});

// Function to determine team to display and the max bar height
function setBar(id, name){
	if (id == clubs[0]){
		maxBuy = maxArs+30;
		drawEvents(maxBuy, events1);
		drawBar(maxBuy, transfers1);
		posLine(pos1);
		drawPie(transfers1[0], transfers1[1]);
	}
	if (id == clubs[1]){
		maxBuy = maxChe+30;
		drawEvents(maxBuy, events2);
		drawBar(maxBuy, transfers2);
		posLine(pos2);
		drawPie(transfers2[0], transfers2[1]);
	}
	if (id == clubs[4]){
		maxBuy = maxMUFC+30;
		drawEvents(maxBuy, events3);
		drawBar(maxBuy, transfers3);
		posLine(pos3);
		drawPie(transfers3[0], transfers3[1]);
	}
	if (id == clubs[2]){
		maxBuy = maxLiv+30;
		drawEvents(maxBuy, events4);
		drawBar(maxBuy, transfers4);
		posLine(pos4);
		drawPie(transfers4[0], transfers4[1]);
	}
	if (id == clubs[3]){
		maxBuy = maxMCFC+30;
		drawEvents(maxBuy, events5);
		drawBar(maxBuy, transfers5);
		posLine(pos5);
		drawPie(transfers5[0], transfers5[1]);
	}
}

function drawEvents(maxY, events){
	eventCanvas.selectAll(".eventRect").remove();
	console.log(maxY);
	var eventRect = eventCanvas.selectAll(".eventRect")
						.data(events)
						.enter()
						.append("rect")
						.attr("class", "eventRect")
						.attr("id", function(d){
							return d.Year;
						})
						.attr("x", function(d){
							return barxScale(d.Year) + xPosMonth(d.Month);
						})
						.attr("y", eventyScale(0)/5)
						.attr("width", 4)
						.attr("height", eventyScale(0)*2/3)
						.attr("fill", "#f9d45f")
						.attr("opacity", 0.5);

	eventRect.on("mouseover", function(d){
		var selEventRect = d3.select(this);
		selEventRect.moveToFront();
		eventPopup(d, baryScale, maxY); 
	});
	eventRect.on("mouseout",function(){
		var selEventRect = d3.select(this);
		selEventRect.moveToBack();
		bar.selectAll(".event-label").remove();
	});
}

function eventPopup(d, yscale, maxY) {
	bar.append('rect')
		.attr("class", "event-label label-container")
		.attr("transform", "translate("+ (barxScale(d.Year)+xPosMonth(d.Month)-40) +",0)")
		.attr("opacity", 0.8);

	bar.append("text")
		.attr("class", "data-label event-label")
		.attr("dy", "30")
		.attr("transform", "translate("+ (barxScale(d.Year)+xPosMonth(d.Month)-24) +",0)")
		.text(d.Month+" "+d.Year);

	bar.append("text")
		.attr("class", "data-label	 event-label")
		.attr("dy", "48")
		.attr("transform", "translate("+ (barxScale(d.Year)+xPosMonth(d.Month)-24) +",0)")
		.text(d.Desc);
}

// Function to plot the team's transfer activity as bar graph
function drawBar(maxY, transfers){
	bar.selectAll(".rectFee").remove();
	bar.selectAll(".axis").remove();

	var baryUpd = d3.scale.linear()
				.domain([0, maxY])
				.range([height - yPadding, yPadding + yMargin]);

	var barxAxis = d3.svg.axis()
						.scale(barxScale)
						.orient("bottom")
						.tickFormat(d3.format("d"));

	var baryAxis = d3.svg.axis()
						.scale(baryUpd)
						.orient("left")
						.ticks("7");

	bar.append("g")
		.attr("class", "axis")
		.attr("id", "barX")
		.attr("transform", "translate(0," + (height - yPadding) + ")")
		.call(barxAxis);

	bar.append("g")
		.attr("class", "axis")
		.attr("id", "barY")
		.attr("transform", "translate("+ xPadding + ","+ 0 +")")
		.call(baryAxis);

	bar.selectAll(".rectFee")
		.data(transfers)
		.enter()
		.append("rect")
		.attr("class", "rectFee")
		.attr("id", function(d){
			return d.Year;
		})
		.attr("x", function(d){
			if (d.Status == 'In'){
				return barxScale(d.Year)-11;
			}
			else if (d.Status == 'Out'){
				return barxScale(d.Year)+1;
			}
		})
		.attr("y", function(d){
			return baryUpd(d.Fee) - 5;
		})
		.attr("width", function(d){
			return 10;
		})
		.attr("height", function(d){
			return baryUpd(0) - baryUpd(d.Fee) + 5;
		})
		.attr("fill", function(d){
			return barColor(d.Status)
		})
		.on('mouseover', function(d, i){
			transferPopup(transfers, i, baryUpd);			
		})
		.on("mouseout", function(){
              bar.selectAll(".data-label").remove();
        })
        .on("click", function(d, i){
        	if (d.Status == "In"){
        		drawPie(d, transfers[i+1]);
        	}
        	else if (d.Status == "Out"){
        		drawPie(transfers[i-1], d);
        	}
		});
}

// Function popup on mouseover over bars on graph
function transferPopup(transfers, i, yscale){
	bar.append('rect')
		.attr("class", "data-label label-container")
		.attr("transform", "translate("+ (barxScale(transfers[i].Year-1)-32) +","+ (yscale(transfers[i].Fee)-78) +")")
		.attr("opacity", 0.8);

	bar.append("text")
		.attr("class", "data-label")
		.attr("dy", "-64")
		.attr("transform", "translate("+ barxScale(transfers[i].Year-1) +","+ yscale(transfers[i].Fee) +")")
		.text("Year: "+ transfers[i].Year);

	bar.append("text")
		.attr("class", "data-label")
		.attr("id", "data-amt-in")
		.attr("dy", "-52")
		.attr("transform", "translate("+ barxScale(transfers[i].Year-1) +","+ yscale(transfers[i].Fee) +")");

	bar.append("text")
		.attr("class", "data-label")
		.attr("id", "data-amt-out")
		.attr("dy", "-40")
		.attr("transform", "translate("+ barxScale(transfers[i].Year-1) +","+ yscale(transfers[i].Fee) +")");

	bar.append("text")
		.attr("class", "data-label")
		.attr("id", "data-player-in")
		.attr("dy", "-28")
		.attr("transform", "translate("+ barxScale(transfers[i].Year-1) +","+ yscale(transfers[i].Fee) +")");

	bar.append("text")
		.attr("class", "data-label")
		.attr("id", "data-player-out")
		.attr("dy", "-16")
		.attr("transform", "translate("+ barxScale(transfers[i].Year-1) +","+ yscale(transfers[i].Fee) +")");

   if (transfers[i].Status == 'In'){
		d3.select("#data-amt-in").text("Total Spent: £"+ transfers[i].Fee +" mil");
		d3.select("#data-amt-out").text("Total Earned: £"+ transfers[i+1].Fee +" mil");
		d3.select("#data-player-in").text("No. of Players In: "+ transfers[i].Num);
		d3.select("#data-player-out").text("No. of Players Out: "+ transfers[i+1].Num);
	}
	else if (transfers[i].Status == 'Out'){
		d3.select("#data-amt-in").text("Total Spent: £"+ transfers[i-1].Fee +" mil");
		d3.select("#data-amt-out").text("Total Earned: £"+ transfers[i].Fee +" mil");
		d3.select("#data-player-in").text("No. of Players In: "+ transfers[i-1].Num);
		d3.select("#data-player-out").text("No. of Players Out: "+ transfers[i].Num);
	}
}

// Function for drawing PIE chart and Information on click over bar graph
function drawPie(d, e){
	svg1.selectAll("*").remove();
	svg2.selectAll("*").remove();
	svg3.selectAll("*").remove();

	valIn = [{"label":"G", "value":d.G},
	        {"label":"D", "value":d.D},
	        {"label":"M", "value":d.M},
	        {"label":"F", "value":d.F}];

	valOut = [{"label":"G", "value":e.G},
	        {"label":"D", "value":e.D},
	        {"label":"M", "value":e.M},
	        {"label":"F", "value":e.F}];

	//Team Season stats display images and text
	svg3.append("image")
		.attr("xlink:href", "images/cup.svg")
		.attr("height", imgHeight)
		.attr("width", imgWidth)
		.attr("x", 30)
		.attr("y", (r + 2*m - m/2 - imgHeight));

	svg3.append("image")
		.attr("xlink:href", "images/football.svg")
		.attr("height", imgHeight)
		.attr("width", imgWidth)
		.attr("x", 30)
		.attr("y", (r + 2*m + m/2));

	svg3.append("image")
		.attr("xlink:href", "images/goal.svg")
		.attr("height", imgHeight)
		.attr("width", imgWidth)
		.attr("x", 30)
		.attr("y", (r + 2*m + 3*m/2 + imgHeight));

	svg3.append("text")
		.attr("class", "pie-data-header")
		.attr("transform", "translate("+ 30 +","+ (r + 2*m - 3*m/2 - 2*imgHeight) +")")
		.attr("dy", lh)
		.text("Season: "+ d.Year +"-"+ (d.Year+1));

	svg3.append("text")
		.attr("class", "pie-data")
		.attr("transform", "translate("+ 70 +","+ (r + 2*m - m/2 - imgHeight) +")")
		.attr("dy", lh)
		.text("Points: " + d.Pts +" ("+ d.Pos +")");

	svg3.append("text")
		.attr("class", "pie-data")
		.attr("transform", "translate("+ 70 +","+ (r + 2*m + m/2) +")")
		.attr("dy", lh)
		.text("Goals Scored: "+ d.Scored);

	svg3.append("text")
		.attr("class", "pie-data")
		.attr("transform", "translate("+ 70 +","+ (r + 2*m + 3*m/2 + imgHeight) +")")
		.attr("dy", lh)
		.text("Goals Conceded: "+ d.Conceded);


	// Pie Chart captions
	svg1.append("text")
		.attr("class", "pie-data")
		.attr("text-anchor", "middle")
		.attr("transform", "translate("+ widthMin/2 +","+ (2*r + 2*m) +")")
		.attr("dy", lh)
		.text("Players In");

	svg2.append("text")
		.attr("class", "pie-data")
		.attr("text-anchor", "middle")
		.attr("transform", "translate("+ widthMin/2 +","+ (2*r + 2*m) +")")
		.attr("dy", lh)
		.text("Players Out");

	var arc = d3.svg.arc()
		.outerRadius(r)
		.innerRadius(r - 14);

	var labelArc = d3.svg.arc()
		.outerRadius(r + 10)
		.innerRadius(r + 10);

	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.value;});

	var g1 = svg1.selectAll(".arc")
			.data(function(d){
				return pie(valIn);
			})
			.enter()
			.append("g")
			.attr("class", "arc")
			.attr("transform", "translate("+ widthMin/2 +","+ (r + m) +")");

	var g2 = svg2.selectAll(".arc")
			.data(function(d){
				return pie(valOut);
			})
			.enter()
			.append("g")
			.attr("class", "arc")
			.attr("transform", "translate("+ widthMin/2 +","+ (r + m) +")");

	svg1.append("text")
		.attr("class", "pie-total")
		.attr("transform", "translate("+ widthMin/2 +","+ (r + m) +")")
		.attr("dy", 16)
		.attr("text-anchor", "middle")
		.text(d.G+d.D+d.M+d.F);

	svg2.append("text")
		.attr("class", "pie-total")
		.attr("transform", "translate("+ widthMin/2 +","+ (r + m) +")")
		.attr("dy", 16)
		.attr("text-anchor", "middle")
		.text(e.G+e.D+e.M+e.F);

	g1.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return pieColor(d.data.label); });

	g2.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return pieColor(d.data.label); });

	g1.append("text")
		.attr("class", "pie-data")
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(function(d) { 
			if (d.data.value != 0){
				return d.data.label +"("+ d.data.value +")";
			} else {
				return null;
			}
		});

	g2.append("text")
		.attr("class", "pie-data")
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(function(d) { 
			if (d.data.value != 0){
				return d.data.label +"("+ d.data.value +")";
			} else {
				return null;
			}
		});

	function noPlayers(){
		g.append("text")
		.attr("class", "pie-data")
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text("No players");
	}
}

function posLine(pos){
	bar.selectAll(".pos-line").remove();
	bar.selectAll(".pos-circle").remove();
	var line = d3.svg.line()
					.x(function(d){ return barxScale(d.Year); })
					.y(function(d){ return posScale(d.Pos); })

	var posChart = bar.append("path")
					.datum(pos)
					.attr("class", "pos-line")
					.attr("d", line)
					.attr("opacity", 0.5);

	var bgLine = bar.append("path")
					.datum(pos)
					.attr("d", line)
					.attr("style", "fill: none; stroke:#fff; stroke-width: 16px; opacity: 0.0;");

	var posCircles = bar.selectAll("circle")
					.data(pos)
					.enter()
					.append("circle")
					.attr("class", "pos-circle")
					.attr("cx", function(d){ return barxScale(d.Year); })
					.attr("cy", function(d){ return posScale(d.Pos); })
					.attr("r", 3)
					.attr("style", "fill: #fff; stroke:#709ded; stroke-width: 1.5px;")
					.attr("opacity", 0.5);

	bgLine.on("mouseover",function(){
		var selLine = d3.select(".pos-line");
		var selCircles = d3.selectAll(".pos-circle");
		selLine.moveToFront();
		selCircles.moveToFront();
	});
	posChart.on("mouseover",function(){
		var selLine = d3.select(this);
		var selCircles = d3.selectAll(".pos-circle");
		selLine.moveToFront();
		selCircles.moveToFront();
	});
	posCircles.on("mouseover",function(d){
		var selCircles = d3.selectAll(".pos-circle");
		var selLine = d3.select(".pos-line");
		selLine.moveToFront();
		selCircles.moveToFront();
		showPos(d.Year, d.Pos);
	});
	bgLine.on("mouseout",function(){
		var selLine = d3.select(".pos-line");
		var selCircles = d3.selectAll(".pos-circle");
		selCircles.moveToBack();
		selLine.moveToBack();
	});
	posChart.on("mouseout",function(){
		var selLine = d3.select(this);
		var selCircles = d3.selectAll(".pos-circle");
		selCircles.moveToBack();
		selLine.moveToBack();
	});
	posCircles.on("mouseout",function(d){
		var selCircles = d3.selectAll(".pos-circle");
		var selLine = d3.select(".pos-line");
		selCircles.moveToBack();
		selLine.moveToBack();
		bar.selectAll(".pos-label").remove();
	});
}

function showPos(year, pos){
	bar.append('rect')
		.attr("class", "pos-label pos-container")
		.attr("transform", "translate("+ (barxScale(year)-36) +","+ (posScale(pos)-64) +")")
		.attr("opacity", 0.8);

	bar.append("text")
		.attr("class", "pos-label")
		.attr("dy", "-48")
		.attr("transform", "translate("+ (barxScale(year)-18) +","+ (posScale(pos)) +")")
		.text("Year: "+ year);

	bar.append("text")
		.attr("class", "pos-label")
		.attr("dy", "-36")
		.attr("transform", "translate("+ (barxScale(year)-18) +","+ (posScale(pos)) +")")
		.text("Position: "+ pos);
}


// Display Team details on the side	
/*
function showTeam(id, name){
	d3.select(".team-id")
		.html('<img src="images/logo/'+ id +'.png" alt="'+ name +'" width="96" height="96"><p class="desc">'+ name +'</p>');
}
*/