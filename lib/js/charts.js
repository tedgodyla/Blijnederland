Charts = {
	svgWidth: 0,
	dataset: {},
	datasetReligie: Array(),
	init: function () {
		console.log("init charts");

		this.userChart.init();
	},

	userChart: {
		m: [0, 0, 0, 100],
		w: 188,
		h: 236,
		y: 20,
		svg: "",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var svg = d3.select("#statssvg1")
	      		.append("svg:svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2])
				.append("svg:g")
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
		
			svg.append("svg:g")
	        	.attr("class", "x axis");

	       	this.svg = svg;

			this.setup();
		},

		setup: function () {
			var self = this;

			var svg = this.svg;
			var y = this.y;
			var m = this.m;
			var w = this.w;
			
			var x = d3.scale.linear().range([0, w]);
			x.domain([0, 10]).nice();

			var data = jQuery.extend(true, {}, Interaction.questionsAnswers)
				data = Charts.calculateUserDataFromAnswers(data);

			$('g.enter').remove();

			var bar = svg.insert("svg:g")
					.attr("class", "enter")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(data.answers)
				.enter()
					.append("svg:g");

			bar.append("svg:text")
			    .attr("x", -m[3])
			    .attr("y", y / 2)
			    .attr("dy", ".35em")
			    .attr("text-anchor", "start")
			    .text(function(data) { return data.name; });

			bar.append("svg:rect")
			    .attr("width", function(data) { return x(data.size); })
			    .attr("height", y)
			    .attr("rx", y / 4)
				.attr("ry", y / 4);

			bar
			  	.attr("transform", function(data, i) { 
			 		var translateY = y * i * 1.8;
			    	return "translate(0," + translateY + ")";
				});       
		}
	},

	overviewChart: {
		m: [0, 0, 0, 110],
		w: 280,
		h: 354,
		y: 20,
		svg: "",
		currentGeslacht: "man",
		currentLeeftijd: "25-35",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var svg = d3.select("#overviewsvg1")
	      		.append("svg:svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2])
				.append("svg:g")
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
		
			svg.append("svg:g")
	        	.attr("class", "x axis");

	       	this.svg = svg;

			Charts.getNetherlandAnswers();

			$(".chart").width(w + m[1] + m[3]).height(h + m[0] + m[2]);
		},

		setup: function () {
			var self = this;

			var data = jQuery.extend(true, {}, Charts.dataset)
			
			var geslacht = self.currentGeslacht;
      		var leeftijd = self.currentLeeftijd;

      		// merge woman dataset with the man dataset;
      		if (geslacht == "uni") {
				for (var i = 0; i < data.vrouw.length; i++) {
					data.man[i].total+= data.vrouw[i].total;
					for (var t = 0; t < data.vrouw[i].subjects.length; t++) {
						if (data.man[i].subjects[t]) {
							data.man[i].subjects[t].size+= data.vrouw[i].subjects[t].size;
						} else {
							data.man[i].subjects[t] = {};
							data.man[i].subjects[t].size = data.vrouw[i].subjects[t].size;
							data.man[i].subjects[t].name = data.vrouw[i].subjects[t].name;
						}
					}
				}
				geslacht = "man";
      		}

  			var dataset = { user: Array(), nl: data[geslacht] }

			for (var i = 0; i < dataset.nl.length; i++) {
				if (leeftijd == dataset.nl[i].age) {
					var total = dataset.nl[i].total;
					dataset.nl = dataset.nl[i].subjects;
					break;
				}
			}

			for (var i = 0; i < dataset.nl.length; i++) {
				dataset.nl[i].size = dataset.nl[i].size / total;
			}

			var data = jQuery.extend(true, {}, Interaction.questionsAnswers)
				data = Charts.calculateUserDataFromAnswers(data);

			dataset.user = data.answers;

			var svg = this.svg;
			var y = this.y;
			var m = this.m;
			var w = this.w;
			
			var x = d3.scale.linear().range([0, w]);
			x.domain([0, 10]).nice();

			var d = dataset;

			$('g.user').remove();
			$('g.netherland').remove();

			var barUser = svg.insert("svg:g", ".y.axis")
					.attr("class", "user")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(d.user)
				.enter()
					.append("svg:g")
					.attr("class", function(d) { return d.name + " subject"; });

          	barUser.append("svg:text")
				.attr("x", -m[3])
				.attr("y", y)
				.attr("dy", ".35em")
				.attr("text-anchor", "start")
				.text(function(d) { return d.name; })
				.on("click", Interaction.openSubject);

			barUser.append("svg:rect")
				.attr("width", function(d) { return x(d.size); })
				.attr("height", y)
				.attr("rx", y / 4)
				.attr("ry", y / 4)
				.on("click", Interaction.openSubject);

			barUser
				.attr("transform", function(d, i) { 
					var translateY = y * i * 2.6;
					return "translate(0," + translateY + ")";
				});  

			var barNetherland = svg.insert("svg:g", ".y.axis")
					.attr("class", "netherland")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(d.nl)
				.enter()
					.append("svg:g")
					.attr("class", function(d) { return d.name + " subject"; })

			barNetherland.append("svg:rect")
				.attr("width", function(d) { return x(d.size); })
				.attr("height", y)
				.attr("rx", y / 4)
				.attr("ry", y / 4)
				.on("click", Interaction.openSubject);

			barNetherland
				.attr("transform", function(d, i) {
					var translateY = y + 2 + (y * i * 2.6);
					return "translate(0," + translateY + ")";
				});      
		},

		changeLeeftijd: function (leeftijd) {
			var ageGroups = Charts.ageGroups();

			for (var i = 0; i < ageGroups.length; i++) {
				if (leeftijd >= ageGroups[i].min && leeftijd <= ageGroups[i].max) {
			    	var leeftijdsgroep = ageGroups[i].name;
			    	var index = i;
			  	}
			}

			this.currentLeeftijd = leeftijdsgroep;
		},

		ageGroups: function () {
			var ageGroups = [
	        	{name: "0-14", min: 0, max: 14},
	        	{name: "15-19", min: 15, max: 19},
	        	{name: "20-24", min: 20, max: 24},
	        	{name: "25-35", min: 25, max: 34},
	        	{name: "35-45", min: 35, max: 44},
	        	{name: "45-55", min: 45, max: 54},
	        	{name: "55-65", min: 55, max: 64},
	        	{name: "65-75", min: 65, max: 74},
	        	{name: "75-100", min: 75, max: 100}
	      	];

	      	return ageGroups;
		},
		
		changeGeslacht: function(geslacht) {
			geslacht = geslacht.toLowerCase();
			this.currentGeslacht = geslacht;
		}
	},

	religieChart: {
		m: [0, 0, 0, 120],
		w: 280,
		h: 354,
		y: 20,
		svg: "",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var w = Charts.svgWidth - m[1] - m[3];
			this.w = w;

			var svg = d3.select("#religiesvg1")
	      		.append("svg:svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2])
				.append("svg:g")
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
		
			svg.append("svg:g")
	        	.attr("class", "x axis");

	       	this.svg = svg;

	       	self.setup();
		},

		setup: function () {
			var self = this;

			var svg = this.svg;
			var y = this.y;
			var m = this.m;
			var w = this.w;
			
			var x = d3.scale.linear().range([0, w]);
			x.domain([0, 10]).nice();

			var d = Charts.datasetReligie;

			console.log(d);

			var bar = svg.insert("svg:g", ".y.axis")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(d)
				.enter()
					.append("svg:g")
					.attr("class", function(d) { 
						if (d.name == Interaction.userReligie) { 
							return "hightlight";
						} else {
							return "";
						}
					});

          	bar.append("svg:text")
				.attr("x", -m[3])
				.attr("y", y / 2)
				.attr("dy", ".35em")
				.attr("text-anchor", "start")
				.text(function(d) { return d.name; })

			bar.append("svg:rect")
				.attr("width", function(d) { return x(d.geluk); })
				.attr("height", y)
				.attr("rx", y / 4)
				.attr("ry", y / 4)

			bar
				.attr("transform", function(d, i) { 
					var translateY = y * i * 1.8;
					return "translate(0," + translateY + ")";
				});
		}
	},

	ageGroups: function () {
		var ageGroups = [
        	{name: "0-15", min: 0, max: 14},
        	{name: "15-19", min: 15, max: 19},
        	{name: "20-24", min: 20, max: 24},
        	{name: "25-35", min: 25, max: 34},
        	{name: "35-45", min: 35, max: 44},
        	{name: "45-55", min: 45, max: 54},
        	{name: "55-65", min: 55, max: 64},
        	{name: "65-75", min: 65, max: 74},
        	{name: "75-100", min: 75, max: 100}
      	];

      	return ageGroups;
	},

	getNetherlandAnswers: function () {
		var self = this;

		// get age groups
    	var ageGroups = Charts.ageGroups();

      	// load answers
      	$.getJSON("datasets/answers.json", function( data ) {
			var answers = data.answers;

			var religies = [
				{ name: "Geen", total: 0, geluk: 0 },
				{ name: "Katholiek", total: 0, geluk: 0 },
				{ name: "Hervormd", total: 0, geluk: 0 },
				{ name: "Gereformeerd", total: 0, geluk: 0 },
				{ name: "Protestants", total: 0, geluk: 0 },
				{ name: "Islam", total: 0, geluk: 0 },
				{ name: "Boeddhisme", total: 0, geluk: 0 },
				{ name: "Anders", total: 0, geluk: 0 }
			]
			$.each(answers, function(guid, answer) {
				var religie = answer.Religie.welke;
				$.each(religies, function(key, value) {
					if (value.name == religie) {
						religies[key].total++;
						var geluk = (parseInt(answer.Gelukkigheid.geluk) + parseInt(answer.Gelukkigheid.tevreden)) / 2;
						religies[key].geluk+= geluk;
					}
				});
			});

			$.each(religies, function(key, value) {
				if (value.geluk) {
					value.geluk = value.geluk / value.total;
				}
			});

			
			// GENERATE MAIN DATASET
			// prepare structure of object
	    	var dataset = { man: Array(), vrouw: Array() }
	      	for (var i = 0; i < ageGroups.length; i++) {
	        	dataset.man[i] = { age: ageGroups[i].name, total: 0, subjects: Array()};
	        	dataset.vrouw[i] = { age: ageGroups[i].name, total: 0, subjects: Array()};
	      	}

	      	// loop trough each answer
			$.each(answers, function(guid, answer) {
				var leeftijd = answer.profile.leeftijd;
				var geslacht = answer.profile.geslacht.toLowerCase();

				// get the right age groups index
				for (var i = 0; i < ageGroups.length; i++) {
					if (leeftijd >= ageGroups[i].min && leeftijd <= ageGroups[i].max) {
				    	var index = i;
				  	}
				}

				// profile data not needed
          		delete answer.profile;

				// merge answers into subjects
				var temp = {};
				$.each(answer, function(subject, value) {
					var subject = subject.toLowerCase();
					var subjectAnswers = value;
					var tempSize = 0;
					for (var key in subjectAnswers) {
						if (subjectAnswers.hasOwnProperty(key)) {
							if ($.isNumeric( subjectAnswers[key] )) {
								subjectAnswers[key] = parseInt(subjectAnswers[key]);
								temp[subject] = (temp[subject]) ? temp[subject] + subjectAnswers[key] : subjectAnswers[key];
								tempSize++;
							}
						}
					}
					temp[subject] = temp[subject] / tempSize;            
				});

				// add temp to dataset
				var i = 0;
				for (var key in temp) {
		            if (dataset[geslacht][index].subjects[i]) {
		            	var t = dataset[geslacht][index].subjects[i].size;
		            	var s = temp[key];
		            	var c = s + t;
		            	dataset[geslacht][index].subjects[i] = {name: key, size: c};
		            } else {
		            	var s = temp[key];
		            	dataset[geslacht][index].subjects[i] = {name: key, size: s};
		            }   
		            i++;
		        }
				
				dataset[geslacht][index].total++;
        	});
			self.dataset = dataset;
			self.datasetReligie = religies;
		});
    },

	calculateUserDataFromAnswers: function ( answers ) {
		delete answers.profile;

        var data = {answers: Array()};

        for (var subject in answers) {
        	if (answers.hasOwnProperty(subject)) {
            	var index = data.answers.push({}) - 1;
            	var subjectAnswers = answers[subject];
            	var i = 0;
            	data.answers[index].size = 0;
            	for (var key in subjectAnswers) {
              		if (subjectAnswers.hasOwnProperty(key)) {
						if ($.isNumeric( subjectAnswers[key] )) {
							data.answers[index].name = subject;
							data.answers[index].size+= subjectAnswers[key];
							i++;
						}
            		}
            	}
            	data.answers[index].size =  data.answers[index].size / i;
			}
        }
        return data;
    },

    calculateDutchDataFromAnswers: function ( answers ) {
        var data = {answers: Array()};
        var totalAnswers = answers.total;
        var answers = answers.answers;
        
        for (var subject in answers) {
			if (answers.hasOwnProperty(subject)) {
				var index = data.answers.push({}) - 1;
				var subjectAnswers = answers[subject];
				var i = 0;
				data.answers[index].size = 0;
				for (var key in subjectAnswers) {
					if (subjectAnswers.hasOwnProperty(key)) {
						if ($.isNumeric( subjectAnswers[key] )) {
							data.answers[index].name = subject;
							data.answers[index].size+= subjectAnswers[key];
							i++;
						}
					}
				}
				data.answers[index].size =  data.answers[index].size / i;
				data.answers[index].size =  data.answers[index].size / totalAnswers;
			}
        }
        console.log('dutch answers:', data);
        return data;
    }
}