var dataRokers = {
	man: [
		{
			label: "0-12",
			value: 95
		},
		{
			label: "12-16",
			value: 95.8
		},
		{
			label: "16-20",
			value: 93.5
		},
		{
			label: "20-30",
			value: 91.8
		},
		{
			label: "30-40",
			value: 87.9
		},
		{
			label: "40-50",
			value: 83.6
		},
		{
			label: "50-55",
			value: 77.9
		},
		{
			label: "55-65",
			value: 67
		},
		{
			label: "65-75",
			value: 67.2
		}
	],
	vrouw: [
		{
			label: "4-12",
			value: 95.5
		},
		{
			label: "12-16",
			value: 93.8
		},
		{
			label: "16-20",
			value: 88
		},
		{
			label: "20-30",
			value: 86
		},
		{
			label: "30-40",
			value: 82.8
		},
		{
			label: "40-50",
			value: 80
		},
		{
			label: "50-55",
			value: 72.9
		},
		{
			label: "55-65",
			value: 69.4
		},
		{
			label: "65-75",
			value: 67.3
		}
	]
};

//console.log(dataRokers);

var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var yMax = d3.max(d3.entries(dataRokers), function (d, i) { 
	var result = 0;
	for (var t = 0; t < d.value.length; t++) {
		result = (d.value[t].value / 100 > result) ? d.value[t].value / 100 : result;
	}
	return result;
});

test = [];
for (var i = 0; i < dataRokers.length; i++) {
	test[i] = dataRokers[i].label;
}

//console.log(dataRokers.man[0].label);

var xScale = d3.scale.ordinal()
    .domain(dataRokers.man.map(function(d){
    	return d.label
    }))
    .rangeRoundBands([0, width], .6);

var yScale = d3.scale.linear()
    .domain([0, yMax])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(formatPercent);


var svg = d3.select("#svg").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	svg.selectAll(".barMan")
		.data(d3.entries(dataRokers.man))
		.enter().append("rect")
		.attr("class", "barMan")
		.attr("x", function(d, i) { 
			return xScale(d.value.label) + 16;
		})
		.attr("width", xScale.rangeBand())
		.attr("y", function(d) {
			return yScale(d.value.value / 100);
		})
		.attr("height", function(d) {
			return height - yScale(d.value.value / 100);
		});

	svg.selectAll(".barVrouw")
		.data(d3.entries(dataRokers.vrouw))
		.enter().append("rect")
		.attr("class", "barVrouw")
		.attr("x", function(d, i) { 
			return xScale(d.value.label) - 15;
		})
		.attr("width", xScale.rangeBand())
		.attr("y", function(d) {
			return yScale(d.value.value / 100);
		})
		.attr("height", function(d) {
			return height - yScale(d.value.value / 100);
		});

	svg.append("g")
		.attr("class", "legend");

	/* ------- LEGEND -------*/
	var legend = svg.selectAll(".legend").selectAll("g")
		.data(["#c86fc3", "#387dbd"]);

	legend.enter()
		.append("g")
		.attr({
			class: "item",
			transform: function(d, i) { return "translate(0," + i * 26 + ")"; }
		})
		.append("rect")
		.attr({
			x: width,
			width: 18,
			height: 18,
			fill: function(d) { return d; }
		});

	legend.append("text")
		.attr({
			x: width + 30,
			y: 15
		});

	var text = svg.select(".legend").selectAll("text")
		.data(["Vrouwen", "Mannen"]);

	text.text(function(d) {
		console.log(d);
		return d;
	});




d3.select("#man").on("click", function(){
	document.location.href = "chart2man.html";
});

d3.select("#vrouw").on("click", function(){
	document.location.href = "chart2vrouw.html";
});

