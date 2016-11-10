var containerWidth = $(".display-wide").width();

var scatter = d3.select("div.scatterVis")
					.append("svg")
					.attr("class", "canvas")
					.attr("height", height)
					.attr("width", width)
					.append("g");

var playerXScale = d3.scale.linear()
					.domain([2000, 2017])
					.range([40, 780]);

var playerYScale = d3.scale.linear()
					.domain([0, 50])
					.range([height - yPadding, yPadding + yMargin]);

var playerXAxis = d3.svg.axis()
				.scale(playerXScale)
				.orient("bottom")
				.tickFormat(d3.format("d"));

var playerYAxis = d3.svg.axis()
				.scale(playerYScale)
				.orient("left")
				.ticks(10);


var playerColor = d3.scale.ordinal()
					.domain(["G", "D", "M", "F"])
					.range(["#f9e648", "#e64c3c", "#68ba63", "#5e95cf"]);

scatter.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (height - yPadding) + ")")
	.call(playerXAxis);

scatter.append("g")
	.attr("class", "axis")
	.attr("transform", "translate("+ xPadding + ","+ 0 +")")
	.call(playerYAxis);

scatter.append("text")
	.attr("class", "axis-label")
	.attr("transform", "translate("+ yLabelX +","+ yLabelY +") rotate(-90)")
	.text("Transfer Fee (in million £)");

scatter.append("text")
	.attr("class", "axis-label")
	.attr("transform", "translate("+ xLabelX +","+ xLabelY +")")
	.attr("dy", "-20")
	.text("Year");

scatter.append("text")
	.attr("class", "axis-label")
	.attr("transform", "translate("+ xLabelX +","+ xLabelY +")")
	.text("Purchased");

/*
Player Data for Players Bought and Sold
*/
var active, activeSet, activeAct, buy = [], sell = [], maxBuyPlayer = [], maxBuy;

d3.csv("data/arsenal/ArsenalCompleteBought.csv", function(data) {
	data.forEach(function(d, i){
		d.YearIn = +d.YearIn;
		if (d.YearOut == 'NA'){
			d.YearOut = 'Present';
		}
		d.Apps = +d.Apps;

		if (isNaN(d.FeeIn)){
			d.FeeIn = 0;
		} else {
			d.FeeIn = +d.FeeIn/1000000;
		}

		if (isNaN(d.FeeOut)){
			d.FeeOut = 0;
		} else {
			d.FeeOut = +d.FeeOut/1000000;
		}
	});

	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].FeeIn));
		array.push((+data[i].FeeOut));
	}
	maxBuyPlayer[0] = Math.floor(Math.max.apply(null, array));

	buy[0] = data;
	active = buy[0];
	activeSet = clubs[0];
	activeAct = "bought";
	drawScatter(active, maxBuyPlayer[0]);
	$('button[value="bought"]').addClass('cstm-active-class');
	$('button[value="all"]').addClass('cstm-active-class');
});

d3.csv("data/chelsea/ChelseaCompleteBought.csv", function(data) {
	data.forEach(function(d, i){
		d.YearIn = +d.YearIn;
		if (d.YearOut == 'NA'){
			d.YearOut = 'Present';
		}
		d.Apps = +d.Apps;

		if (isNaN(d.FeeIn)){
			d.FeeIn = 0;
		} else {
			d.FeeIn = +d.FeeIn/1000000;
		}

		if (isNaN(d.FeeOut)){
			d.FeeOut = 0;
		} else {
			d.FeeOut = +d.FeeOut/1000000;
		}
	});

	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].FeeIn));
		array.push((+data[i].FeeOut));
	}
	maxBuyPlayer[1] = Math.floor(Math.max.apply(null, array));

	buy[1] = data;
});

d3.csv("data/liverpool/LiverpoolCompleteBought.csv", function(data) {
	data.forEach(function(d, i){
		d.YearIn = +d.YearIn;
		if (d.YearOut == 'NA'){
			d.YearOut = 'Present';
		}
		d.Apps = +d.Apps;

		if (isNaN(d.FeeIn)){
			d.FeeIn = 0;
		} else {
			d.FeeIn = +d.FeeIn/1000000;
		}

		if (isNaN(d.FeeOut)){
			d.FeeOut = 0;
		} else {
			d.FeeOut = +d.FeeOut/1000000;
		}
	});

	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].FeeIn));
		array.push((+data[i].FeeOut));
	}
	maxBuyPlayer[2] = Math.floor(Math.max.apply(null, array));

	buy[2] = data;
});

d3.csv("data/mancity/ManCityCompleteBought.csv", function(data) {
	data.forEach(function(d, i){
		d.YearIn = +d.YearIn;
		if (d.YearOut == 'NA'){
			d.YearOut = 'Present';
		}
		d.Apps = +d.Apps;

		if (isNaN(d.FeeIn)){
			d.FeeIn = 0;
		} else {
			d.FeeIn = +d.FeeIn/1000000;
		}

		if (isNaN(d.FeeOut)){
			d.FeeOut = 0;
		} else {
			d.FeeOut = +d.FeeOut/1000000;
		}
	});

	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].FeeIn));
		array.push((+data[i].FeeOut));
	}
	maxBuyPlayer[3] = Math.floor(Math.max.apply(null, array));

	buy[3] = data;
});

d3.csv("data/manutd/ManUtdCompleteBought.csv", function(data) {
	data.forEach(function(d, i){
		d.YearIn = +d.YearIn;
		if (d.YearOut == 'NA'){
			d.YearOut = 'Present';
		}
		d.Apps = +d.Apps;

		if (isNaN(d.FeeIn)){
			d.FeeIn = 0;
		} else {
			d.FeeIn = +d.FeeIn/1000000;
		}

		if (isNaN(d.FeeOut)){
			d.FeeOut = 0;
		} else {
			d.FeeOut = +d.FeeOut/1000000;
		}
	});

	var array = [];
	for (i = 0; i<data.length; i++){
		array.push((+data[i].FeeIn));
		array.push((+data[i].FeeOut));
	}
	maxBuyPlayer[4] = Math.floor(Math.max.apply(null, array));

	buy[4] = data;
});

/*
Visualisation of player data
*/
function setScatter(id){
	activeSet = id;
	for (i=0; i<clubs.length; i++){
		if (id == clubs[i]){
			active = buy[i];
			maxBuy = maxBuyPlayer[i]+10;
		}
	}
	drawScatter(active, maxBuy);

	$('.cstm-btn').removeClass('cstm-active-class');
	$('button[value="bought"]').addClass('cstm-active-class');
	$('button[value="all"]').addClass('cstm-active-class');
}

/*
Adding parameters of "Bought", "Sold", "Academy" to player data visualised 
*/
function setAct(activity){
	activeAct = activity;

	var filterSet = [];
	for (i=0; i<clubs.length; i++) {
		if (activeSet == clubs[i]) {
			active = buy[i];
			maxBuy = maxBuyPlayer[i] + 10;
		}
	}
	if (activity == "bought"){
		filterSet = active;
		drawScatter(filterSet, maxBuy);
	}
	else if (activity == "sold"){
		var filterSet = [];
		for (i=0; i<active.length; i++){
			if (active[i].YearOut != "Present") {
				filterSet.push(active[i]);
			}
		}
		drawScatterSold(filterSet, maxBuy);
	}
	$('.btn-pos').removeClass('cstm-active-class');
	$('button[value="all"]').addClass('cstm-active-class');

	return filterSet;	
}

/*
Adding parameters of player position to player data visualised 
*/
function setFilter(filter) {
	var filterSet = [];
	filterSet = setAct(activeAct);

	if (filter != 'all'){
		var posSet = [];
		for (i=0; i<filterSet.length; i++){
			if (filterSet[i].Pos == filter) {
				posSet.push(filterSet[i]);
			}
		}
		if (activeAct == "bought"){
			drawScatter(posSet, maxBuy);
		}
		else if (activeAct == "sold"){
			drawScatterSold(posSet, maxBuy);
		}
	}
	else {
		if (activeAct == "bought"){
			drawScatter(filterSet, maxBuy);
		}
		else if (activeAct == "sold"){
			drawScatterSold(filterSet, maxBuy);
		}
	}
}

function drawScatter(data, maxY){
	scatter.selectAll("rect").remove();
	scatter.selectAll(".axis").remove();

	var playerYUpd = d3.scale.linear()
				.domain([0, maxY])
				.range([height - yPadding, yPadding + yMargin]);

	var playerXAxis = d3.svg.axis()
						.scale(playerXScale)
						.orient("bottom")
						.tickFormat(d3.format("d"));

	var playerYAxis = d3.svg.axis()
						.scale(playerYUpd)
						.orient("left")
						.ticks("7");

	scatter.append("g")
		.attr("class", "axis")
		.attr("id", "scatterX")
		.attr("transform", "translate(0," + (height - yPadding) + ")")
		.call(playerXAxis);

	scatter.append("g")
		.attr("class", "axis")
		.attr("id", "scatterY")
		.attr("transform", "translate("+ xPadding + ","+ 0 +")")
		.call(playerYAxis);

	scatter.selectAll("circle").remove();

	scatter.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "player-data-circle")
		.attr("id", function(d){
			return d.Name;
		})
		.attr("cx", function(d) {
			if (d.YearIn >= 2002) {
				return playerXScale(d.YearIn);
			}
			else return playerXScale(2001);
		})
		.attr("cy", function(d){
			return playerYUpd(d.FeeIn);
		})
		.attr("r", function(d){
			return d.Apps/10;
		})
		.attr("fill", function(d){
			return playerColor(d.Pos);
		})
		.attr("style", "opacity: 0.8")
		.on("mouseover", function(d, i){
			var xPos;
			if (d.YearIn < 2002){
				xPos = 2001;
			} else {
				xPos = d.YearIn;
			}
			playerPopup(d.Name, d.FeeIn, d.Apps, xPos, d.YearIn, d.YearOut, playerYUpd);
		})
		.on("mouseout", function(d){
			scatter.selectAll(".data-label").remove();
		});
}

function drawScatterSold(data, maxY){
	scatter.selectAll("circle").remove();
	scatter.selectAll(".axis").remove();

	var playerYUpd = d3.scale.linear()
				.domain([0, maxY])
				.range([height - yPadding, yPadding + yMargin]);

	var playerXAxis = d3.svg.axis()
						.scale(playerXScale)
						.orient("bottom")
						.tickFormat(d3.format("d"));

	var playerYAxis = d3.svg.axis()
						.scale(playerYUpd)
						.orient("left")
						.ticks("7");

	scatter.append("g")
		.attr("class", "axis")
		.attr("id", "scatterX")
		.attr("transform", "translate(0," + (height - yPadding) + ")")
		.call(playerXAxis);

	scatter.append("g")
		.attr("class", "axis")
		.attr("id", "scatterY")
		.attr("transform", "translate("+ xPadding + ","+ 0 +")")
		.call(playerYAxis);

	scatter.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "player-data-circle")
		.attr("id", function(d){
			return d.Name;
		})
		.attr("cx", function(d) {
			return playerXScale(d.YearOut);
		})
		.attr("cy", function(d){
			return playerYUpd(d.FeeOut);
		})
		.attr("r", function(d){
			return d.Apps/10;
		})
		.attr("fill", function(d){
			return playerColor(d.Pos);
		})
		.attr("style", "opacity: 0.8")
		.on("mouseover", function(d, i){
			var xPos = d.YearOut;
			playerPopup(d.Name, d.FeeOut, d.Apps, xPos, d.YearIn, d.YearOut, playerYUpd);
		})
		.on("mouseout", function(d){
			scatter.selectAll(".data-label").remove();
		});
}

// Function popup on mouseover over circles on graph
function playerPopup(name, fee, apps, xPos, yearIn, yearOut, yscale){
	scatter.append('rect')
		.attr("class", "data-label label-container-small")
		.attr("transform", "translate("+ (playerXScale(xPos-1)-32) +","+ (yscale(fee)-90) +")")
		.attr("opacity", 0.8);

	scatter.append("text")
		.attr("class", "data-label")
		.attr("id", "data-amt-in")
		.attr("dy", "-72")
		.attr("transform", "translate("+ playerXScale(xPos-1) +","+ yscale(fee) +")")
		.text("Name: "+ name);

	scatter.append("text")
		.attr("class", "data-label")
		.attr("id", "data-amt-out")
		.attr("dy", "-60")
		.attr("transform", "translate("+ playerXScale(xPos-1) +","+ yscale(fee) +")")
		.text("Transfer Fee: £"+ fee +" mil");

	scatter.append("text")
		.attr("class", "data-label")
		.attr("id", "data-player-in")
		.attr("dy", "-48")
		.attr("transform", "translate("+ playerXScale(xPos-1) +","+ yscale(fee) +")")
		.text("Appearances: "+ apps);

	scatter.append("text")
		.attr("class", "data-label")
		.attr("id", "data-player-in")
		.attr("dy", "-36")
		.attr("transform", "translate("+ playerXScale(xPos-1) +","+ yscale(fee) +")")
		.text("Years Played: "+ yearIn +" - "+ yearOut);
}

