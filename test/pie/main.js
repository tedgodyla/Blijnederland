var dataVrouw = [
{
		label: "Dagelijks",
		value: 36
	},
	{
		label: "Minstens 1x per week",
		value: 52
	},
	{
		label: "Minstens 1x per maand",
		value: 8
	},
	{
		label: "Minder dan 1x per maand",
		value: 2
	},
	{
		label: "Zelden tot nooit",
		value: 1
	}
	
];

var datasetMan = [
	{
		label: "Dagelijks",
		value: 21
	},
	{
		label: "Minstens 1x per week",
		value: 57
	},
	{
		label: "Minstens 1x per maand",
		value: 15
	},
	{
		label: "Minder dan 1x per maand",
		value: 4
	},
	{
		label: "Zelden tot nooit",
		value: 3
	}
];

// add svg to body
var svg1 = d3.select("#svg")
	.append("svg")
	.attr({
		height: 400 + "px",
		width: 650 + "px"
	})
	.append("g")

// add 3 groups to the svg
svg1.append("g")
	.attr("class", "slices");
svg1.append("g")
	.attr("class", "legend");

// decide the charts witdh, height and radius
var width = 400,
    height = 400,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 1)
	.innerRadius(radius * 0.6);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg1.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function (d) {
	return d.data.label;
};

var color = d3.scale.ordinal()
	.range(["#4abea4","#be4a4a", "#4a76be", "#beb74a", "#4abebd", "#c86fc3", "#32c395"]);

change(dataVrouw);

var body = document.getElementsByTagName("body")[0];
body.className = "vrouw";

d3.select("#vrouw")
.on("click", function(){
	body.className = "vrouw";
	change(dataVrouw);
});

d3.select("#man").on("click", function(){
	body.className = "man";
	change(datasetMan);
});

function change(data) {	
	/* ------- PIE SLICES -------*/
	var slice = svg1.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	console.log(pie(data));

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
		.attr("class", "slice");

	slice		
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();


	/* ------- LEGEND -------*/
	var legend = svg1.selectAll(".legend").selectAll("g")
		.data(pie(data), key);

	legend.enter()
		.append("g")
		.attr({
			class: "item",
			transform: function(d, i) { return "translate(0," + i * 26 + ")"; }
		})
		.append("rect")
		.attr({
			x: width - 100,
			width: 18,
			height: 18,
			fill: function(d) { return color(d.data.label); }
		});

	legend.append("text")
		.attr({
			x: width - 70,
			y: 15
		});

	legend.exit()
		.remove();

	var text = svg1.select(".legend").selectAll("text")
		.data(pie(data), key)

	text.text(function(d) {
		return d.data.label;
	});

	text.exit()
		.remove();
};