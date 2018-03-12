/*
=====================================================
=========	GLOBAL VARIABLE DECLARATIONS	=========
=====================================================
*/

var	SVGwidth = 800,
	SVGheight = 600,
	margin = {top: 100, right: 10, bottom: 30, left: 50},
	width = SVGwidth - margin.left - margin.right,
	height = SVGheight - margin.top - margin.bottom;

//Variables and data structures for storing team data
var	transfersARS = [], transfersCHE = [], transfersMUN = [], transfersMCI = [], transfersLIV = [], transfers = [];

var svg = d3.select('div#graph')
				.append('svg')
				.attr('class', 'PL-transfers')
				.attr('width', SVGwidth)
				.attr('height', SVGheight);

g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
			.rangeRound([0, width]);

var y = d3.scaleLinear()
			.domain([20, 1])
			.rangeRound([height, 0]);

var color = d3.scaleOrdinal()
    .domain(["Arsenal", "Chelsea", "ManUtd", "ManCity", "Liverpool"])
    .range(["#D80919", "#034694", "#DC1F29", "#99C5E7" , "#E0202C"]);

var area = d3.area()
	.curve(d3.curveMonotoneX)
	.x(function(d) { return x(d.Year); })
	.y1(function(d) { return y(d.Pos - d.Net/2); })
	.y0(function(d) { return y(d.Pos + d.Net/2); });

var line = d3.line()
	.curve(d3.curveMonotoneX)
	.x(function(d) { return x(d.Year); })
	.y(function(d) { return y(d.Pos); });

function drawGraph(data, team){
	x.domain(d3.extent(data, function(d){ return +d.Year }));

	xAxis = d3.axisBottom(x)
				.tickSize(0)
				.tickFormat(d3.format("d"));;

	yAxis = d3.axisLeft(y)
				.tickSize(0);

	teamGroup = g.append("g")
		.attr("class", team)

	teamGroup.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.attr("class", "x axis");

	teamGroup.append("g")
		.call(yAxis)
		.attr("class", "y axis")
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Position in PL");

	teamGroup.append("path")
		.datum(data)
		.attr("fill", color(team))
		.style("opacity", 0.2)
		.attr("d", area);

	teamGroup.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.style("stroke", color(team))
		.attr("d", line)
		.style("opacity", 0.5);

	teamGroup.selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 3)
		.attr("cx", function(d) { return x(d.Year); })
		.attr("cy", function(d) { return y(d.Pos); })
		.attr("fill", color(team))
		.style("opacity", 0.5);
}


// Loading CSV files
// Team Transfers Complete CSV file
d3.csv("data/transfers.csv", function(data) {
	data.forEach(function(d, i){
		d.Year = +d.Year;
		if (+d.Net > 0){
			d.Net = Math.sqrt(Math.abs(+d.Net/10000000));
		} else {
			d.Net = -1 * Math.sqrt(Math.abs(+d.Net/10000000));
		}
		d.Pos = +d.Pos;
	});
	data.forEach(function(d, i){
		if (d.Team == 'Arsenal'){
			transfersARS.push(d);
		}
	})
	data.forEach(function(d, i){
		if (d.Team == 'Chelsea'){
			transfersCHE.push(d);
		}
	})
	data.forEach(function(d, i){
		if (d.Team == 'Manchester United'){
			transfersMUN.push(d);
		}
	})
	data.forEach(function(d, i){
		if (d.Team == 'Manchester City'){
			transfersMCI.push(d);
		}
	})
	data.forEach(function(d, i){
		if (d.Team == 'Liverpool'){
			transfersLIV.push(d);
		}
	})

	transfers = {
		"Arsenal": transfersARS,
		"Chelsea": transfersCHE,
		"Liverpool": transfersLIV,
		"ManCity": transfersMCI,
		"ManUtd": transfersMUN,
	}

	console.log(transfers);

	drawGraph(transfersARS, "Arsenal");
	drawGraph(transfersCHE, "Chelsea");
	drawGraph(transfersMUN, "ManUtd");
	drawGraph(transfersMCI, "ManCity");
	drawGraph(transfersLIV, "Liverpool");
});


