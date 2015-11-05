Charts = {
	svgWidth: 0,
	dataset: {},
	datasetReligie: Array(),
	datasetSocial: Array(),
	init: function () {
		console.log("init charts");

		this.userChart.init();
	},

	userChart: {
		m: [0, 0, 0, 100],
		w: 188,
		h: 200,
		y: 20,
		svg: "",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var svg = d3.select("#statssvg1")
	      		.append("svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2]);
			
			svg.append("g")
				.attr("class", "bars")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

			svg.append("g")
				.attr("class", "texts")
				.attr("transform", "translate(0, 0)");

	       	this.svg = svg;
		},

		setup: function () {
			var self = this;

			var svg = this.svg;
			var y = this.y;
			var m = this.m;
			var w = this.w;
			
			var x = d3.scale.linear().range([0, w]);
			x.domain([0, 10]).nice();

			// get geluk from answers
			var geluk = (Interaction.questionsAnswers.Gelukkigheid.geluk + Interaction.questionsAnswers.Gelukkigheid.tevreden) / 2;
			var geluk = Math.round(geluk * 10);

			$('.card-user .geluk .fill').height(geluk + "%");
			$('.card-user .geluk .tooltip').text(geluk + "%");

			// get data from answers
			var data = jQuery.extend(true, {}, Interaction.questionsAnswers);
			data = Charts.calculateUserDataFromAnswers(data);

			var d = data;

			var text = svg.select(".texts").selectAll("text.t")
				.data(data.answers);

			text.enter()
				.append("text")
				.attr("x", 0)
				.attr("y", y / 2)
			    .attr("dy", ".35em")
			    .attr("text-anchor", "start")
				.text(function(data) { return data.name; })
				.attr("class", "t")
				.attr("transform", function(data, i) { 
			 		var translateY = y * i * 1.8;
			    	return "translate(0," + translateY + ")";
				});			    
	
			text.exit()
				.remove();

			var bar = svg.select(".bars").selectAll("rect.bar")
				.data(data.answers);

			bar.enter()
				.insert("rect")
			    .attr("height", y)
			    .attr("rx", y / 4)
				.attr("ry", y / 4)
				.attr("class", "bar");

			bar
			  	.attr("transform", function(data, i) { 
			 		var translateY = y * i * 1.8;
			    	return "translate(0," + translateY + ")";
				});

			bar		
				.transition()
				.duration(500)
				.attr("width", function(data) { return x(data.size); });

			bar.exit()
				.remove();
		}
	},

	overviewChart: {
		m: [0, 0, 0, 110],
		w: 280,
		h: 302,
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
	      		.append("svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2]);
			
			svg.append("g")
				.attr("class", "barsUser")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

			svg.append("g")
				.attr("class", "barsNl")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

			svg.append("g")
				.attr("class", "texts")
				.attr("transform", "translate(0, 0)");

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

			// change geluk bar from nl
			if (dataset.nl[6]) {
				var geluk = Math.round(dataset.nl[6].size * 10);
			} else {
				var geluk = 0;
			}

			dataset.nl.splice(6, 1)

			$('.card-nl .geluk .fill').height(geluk + "%");
			$('.card-nl .geluk .tooltip').text(geluk + "%");

			// get user data
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

			console.log(d);

			$('g.user').remove();
			$('g.netherland').remove();


			var text = svg.select(".texts").selectAll("text.t")
				.data(d.user);

			text.enter()
				.append("text")
				.attr("x", 0)
				.attr("y", y)
			    .attr("dy", ".35em")
			    .attr("text-anchor", "start")
				.text(function(d) { return d.name; })
				.attr("class", "t")
				.attr("transform", function(d, i) {
					var translateY = y * i * 2.6;
					return "translate(0," + translateY + ")";
				}) 
				.on("click", Interaction.openSubject); 
	
			text.exit()
				.remove();

			var barUser = svg.select(".barsUser").selectAll("rect.bar")
				.data(d.user);

			barUser.enter()
				.insert("rect")
			    .attr("height", y)
			    .attr("rx", y / 4)
				.attr("ry", y / 4)
				.attr("class", "bar")
				.on("click", Interaction.openSubject);

			barUser
			  	.attr("transform", function(d, i) { 
					var translateY = y * i * 2.6;
					return "translate(0," + translateY + ")";
				});  

			barUser		
				.transition()
				.duration(500)
				.attr("width", function(d) { return x(d.size); });

			barUser.exit()
				.remove();


			var barNl = svg.select(".barsNl").selectAll("rect.bar")
				.data(d.nl);

			barNl.enter()
				.insert("rect")
			    .attr("height", y)
			    .attr("rx", y / 4)
				.attr("ry", y / 4)
				.attr("class", "bar")
				.on("click", Interaction.openSubject);

			barNl
			  	.attr("transform", function(d, i) {
					var translateY = y + 2 + (y * i * 2.6);
					return "translate(0," + translateY + ")";
				});    

			barNl		
				.transition()
				.duration(250)
				.attr("width", function(d) { return x(d.size); });

			barNl.exit()
				.remove();
 
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
	        	{name: "15-18", min: 15, max: 18},
	        	{name: "19", min: 19, max: 19},
	        	{name: "20", min: 20, max: 20},
	        	{name: "21-25", min: 21, max: 25},
	        	{name: "26-30", min: 26, max: 30},
	        	{name: "31-35", min: 31, max: 35},
	        	{name: "36-40", min: 36, max: 40},
	        	{name: "41-45", min: 41, max: 45},
	        	{name: "46-50", min: 46, max: 50},
	        	{name: "51-55", min: 51, max: 55},
	        	{name: "56-100", min: 56, max: 100}
	      	];

	      	return ageGroups;

		},
		

		changeGeslacht: function(geslacht) {
			geslacht = geslacht.toLowerCase();
			this.currentGeslacht = geslacht;
		}
	},

	religieChart: {
		m: [0, 0, 0, 140],
		w: 280,
		h: 275,
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

	sociaalChart: {
		m: [0, 0, 0, 140],
		w: 280,
		h: 95,
		y: 20,
		svg: "",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var w = Charts.svgWidth - m[1] - m[3];
			this.w = w;

			var svg = d3.select("#socialsvg1")
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

			var d = Charts.datasetSocial;

			console.log(d);

			var bar = svg.insert("svg:g", ".y.axis")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(d)
				.enter()
					.append("svg:g")
					.attr("class", function(d) { 
						console.log(d);
						return "";
						// if (d.name == Interaction.userReligie) { 
						// 	return "hightlight";
						// } else {
						// 	return "";
						// }
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

	werkChart: {
		m: [0, 0, 0, 140],
		w: 280,
		h: 135,
		y: 20,
		svg: "",
		init: function() {
			var self = this;

			var m = self.m;
			var w = self.w;
			var h = self.h;

			var w = Charts.svgWidth - m[1] - m[3];
			this.w = w;

			var svg = d3.select("#werksvg1")
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

			var d = Charts.datasetWerk;

			console.log(d);

			var bar = svg.insert("svg:g", ".y.axis")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(d)
				.enter()
					.append("svg:g")
					.attr("class", function(d) { 
						console.log(d);
						return "";
						// if (d.name == Interaction.userReligie) { 
						// 	return "hightlight";
						// } else {
						// 	return "";
						// }
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

			// GENERATE VARIOUS DATASET
			var religies = [
				{ name: "Geen", total: 0, geluk: 0 },
				{ name: "Katholiek", total: 0, geluk: 0 },
				{ name: "Hervormd", total: 0, geluk: 0 },
				{ name: "Gereformeerd", total: 0, geluk: 0 },
				{ name: "Protestants", total: 0, geluk: 0 },
				{ name: "Islam", total: 0, geluk: 0 },
				{ name: "Boeddhisme", total: 0, geluk: 0 },
				{ name: "Anders", total: 0, geluk: 0 }
			];

			var socialContact = [
				{ name: "Veel contact", total: 0, geluk: 0 },
				{ name: "Regelmatig contact", total: 0, geluk: 0 },
				{ name: "Weinig contact", total: 0, geluk: 0 },
			]

			var inkomenTevredenheid = [
				{ name: "Ja, tevreden", total: 0, geluk: 0 },
				{ name: "Ja, maar kan meer", total: 0, geluk: 0 },
				{ name: "Gaat wel", total: 0, geluk: 0 },
				{ name: "Nee, te weinig", total: 0, geluk: 0 }
			]

			$.each(answers, function(guid, answer) {
				// SOCIAL
				var social = (parseInt(answer.Social.familie) + parseInt(answer.Social.vrienden)) / 2;
				var geluk = (parseInt(answer.Gelukkigheid.geluk) + parseInt(answer.Gelukkigheid.tevreden)) / 2;

				if (social >= 8) {
					socialContact[0].total++;
					socialContact[0].geluk+= geluk;
				} else if (social <= 4) {
					socialContact[1].total++;
					socialContact[1].geluk+= geluk;
				} else {
					socialContact[2].total++;
					socialContact[2].geluk+= geluk;
				}

				// RELIGIE
				var religie = answer.Religie.welke;
				$.each(religies, function(key, value) {
					if (value.name == religie) {
						religies[key].total++;
						religies[key].geluk+= geluk;
					}
				});

				var inkomen = (parseInt(answer.Werk.tevreden) + parseInt(answer.Werk.tevreden)) / 2;
				
				if (inkomen >= 8) {
					inkomenTevredenheid[0].total++;
					inkomenTevredenheid[0].geluk+= geluk;
				} else if (inkomen >= 5) {
					inkomenTevredenheid[1].total++;
					inkomenTevredenheid[1].geluk+= geluk;	
				} else if (inkomen >= 2) {
					inkomenTevredenheid[2].total++;
					inkomenTevredenheid[2].geluk+= geluk;
				} else {
					inkomenTevredenheid[3].total++;
					inkomenTevredenheid[3].geluk+= geluk;
				}
			});

			$.each(religies, function(key, value) {
				if (value.geluk) {
					value.geluk = value.geluk / value.total;
				}
			});

			$.each(socialContact, function(key, value) {
				if (value.geluk) {
					value.geluk = value.geluk / value.total;
				}
			});

			$.each(inkomenTevredenheid, function(key, value) {
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
			self.datasetSocial = socialContact;
			self.datasetWerk = inkomenTevredenheid;

			console.log(self.datasetWerk);
		});
    },

	calculateUserDataFromAnswers: function ( answers ) {
		delete answers.profile;
		delete answers.Gelukkigheid;

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