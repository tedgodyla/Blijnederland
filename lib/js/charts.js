Charts = {
	init: function () {
		console.log("charts");

		this.userChart.init();
		this.overviewChart.init();
	},

	openSubject: function (d) {
		console.log("open subject:", d.name);
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

			var data = Interaction.questionsAnswers,
				data = Charts.calculateUserDataFromAnswers(data);

			$('g.enter').remove();

			var bar = svg.insert("svg:g")
					.attr("class", "enter")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(data.answers)
				.enter().append("svg:g")
					.on("click", self.openSubject);

			bar.append("svg:text")
			    .attr("x", -m[3])
			    .attr("y", y / 2)
			    .attr("dy", ".35em")
			    .attr("text-anchor", "start")
			    .text(function(data) { return data.name; });

			bar.append("svg:rect")
			    .attr("width", function(data) { console.log(data.size); return x(data.size); })
			    .attr("height", y);

			bar
			  	.attr("transform", function(data, i) { 
			 		var translateY = y * i * 1.8;
			    	return "translate(0," + translateY + ")";
				});       
		}
	},

	overviewChart: {
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

			var svg = d3.select("#overviewsvg1")
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

			var data = Interaction.questionsAnswers,
				data = Charts.calculateUserDataFromAnswers(data);

			$('g.enter').remove();

			var bar = svg.insert("svg:g")
					.attr("class", "enter")
					.attr("transform", "translate(0,0)")
				.selectAll("g")
					.data(data.answers)
				.enter().append("svg:g")
					.on("click", self.openSubject);

			bar.append("svg:text")
			    .attr("x", -m[3])
			    .attr("y", y / 2)
			    .attr("dy", ".35em")
			    .attr("text-anchor", "start")
			    .text(function(data) { return data.name; });

			bar.append("svg:rect")
			    .attr("width", function(data) { console.log(data.size); return x(data.size); })
			    .attr("height", y);

			bar
			  	.attr("transform", function(data, i) { 
			 		var translateY = y * i * 1.8;
			    	return "translate(0," + translateY + ")";
				});       
		}
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
        console.log('user answers:', data);
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