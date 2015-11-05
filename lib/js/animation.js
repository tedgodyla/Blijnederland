var tl = {
	main: new TimelineMax( { paused: false }),		/* @var object */
    show: new TimelineMax( { paused: false }),	/* @var object */
};

var Animation = {
    init: function () {
        console.log('init animation');

        this.setTimelines();

        tl.main.timeScale(1);
    },

    setTimelines: function () {
    
    },

    intro: function () {
        var hidden = [Interaction.fillcard, Interaction.subject];

        var titleBlij = document.querySelectorAll("#titel")
        var smile = document.querySelectorAll("#lach")

        // Stretch de SVG over het hele scherm, houd de aspect ratio van elementen gelijk
        var svg = document.getElementById('logo');
        svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
        svg.setAttribute("width", window.innerWidth);
        svg.setAttribute("height", window.innerHeight);
        svg.setAttribute("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight);

        // Zet de fontijn midden onder in het document
        var logogroup = document.getElementById('logo-group');
        var x = window.innerWidth / 2 - 215;
        var y = window.innerHeight / 2 - 63;
        tl.main.set(logogroup, {
            x: x,
            y: y
        });
        
        tl.main.set(hidden, { opacity: 0 });

        // tl.main.set(logogroup, {opacity: 0, y: y + 60});
        // tl.main.to(logogroup, {opacity:1, y: y});

        tl.main.set(smile, {transformOrigin: "50% 50%", scaleX: 0});
        tl.main.set(".intro .logo", { opacity: 1 });

        tl.main.to(smile, 1, {scaleX: 1, ease: Elastic.easeOut.config(1, 0.5), y: 0 }, 0.5);
        tl.main.to(".intro .logo", 1.2, {ease: Elastic.easeIn.config(1, 1), y: 1000});
        tl.main.to(".intro .logo", 1, { opacity: 0 }, 2);
            
        tl.main.call(function(){
            Interaction.hideElement(Interaction.intro);
            Interaction.showElement(Interaction.profile);
        });
    },

    hideProfile: function () {
        var self = this;

        console.log("hide profile");



        self.camaraFlash();
    },

    camaraFlash: function () {
        /* SHOW FLASH */

        var self = this;

        tl.main.set('.flits', { opacity: 0 });

        Interaction.showElement($('.flits'));

        tl.main.to('.flits', 0.5, { opacity: 1 });
        
        /* HIDE PROFILE  */
        // move profile svg to user photo
        tl.main.set(Interaction.fillcard, { opacity: 1 });
        tl.main.call(function(){
            Interaction.hideElement(Interaction.profile);
            Interaction.moveProfileSVGtoCardSVG();
        });

        self.setStageQuestions();
      
        /* HIDE AND REMOVE FLASH FLASH */
        tl.main.to('.flits', 2, { opacity: 0, delay: 0.5 });
        tl.main.call(function(){
            Interaction.hideElement($('.flits'));
            self.showQuestions();
        });
    },

    setStageQuestions: function () {
        tl.main.set('.card-user', {
            opacity: 0,
            scale: 1,
            rotation: -90,
            y:  20, 
            x: -690
        });

         tl.main.set('.card-stats', {
            height: 0,
            opacity: 0
         });

         tl.main.set('.geluk', {
            opacity: 0
         })
         tl.main.set('#statssvg1', {
            height: 0,
            opacity: 0
         });


         tl.main.set('.questions', {
        
            opacity: 0,
            y: 500
        });
    },

    showQuestions: function () {
        tl.main.to('.card-user', 2.8, {
            opacity: 1,
            scale: 1.6, 
            rotation: 10,
            y:170,
            x:450,
            ease: Power4.easeInOut
        })

        tl.main.to('.card-user', 2, {
            scale: 1, 
            rotation: 0,
            y:0,
            x:0,
            ease: Power4.easeInOut
        }, "-=0.2")
      
         tl.main.to('.questions', 1, {
            scale: 1, 
            rotation: 0,
            opacity: 1,
            y:0,
            x:0,
            ease: Power4.easeInOut
        },"-=0.4")

        tl.main.to('.card-stats', 1, {
            scale: 1, 
            rotation: 0,
            opacity: 1,
            height: 220,
            y:0,
            x:0,
            ease: Power4.easeInOut
        })

        tl.main.to('.geluk', .5, {
            opacity:1 
        }, "-=0.2")

        tl.main.to('#statssvg1', .5, {
            scale: 1, 
            rotation: 0,
            opacity: 1,
            height: 220,
            y:0,
            x:0,
            ease: Power4.easeInOut
        }, 1)        
    },

    hideQuestions: function () {
    	console.log("hide quenstion overlay");

        var self = this;

        $('html, body').animate({ scrollTop: 0 }, 700);

        var svg = $("#statssvg1 svg");
        var groups = $(svg).find('.enter g');
        var text = $(groups).find('text');
        var bars = $(groups).find('rect');

      

        tl.main.staggerTo(bars, 1, {
            x: -16,
            scaleX: 0, 
            ease: Power4.easeInOut
        }, 0.1, "fadegroup");

        tl.main.staggerTo(text, 1, {
            opacity: 0
        }, 0.1, "fadegroup");

        tl.main.to('.card-stats', 1, {
            height: 0,
            y: -35,
            ease: Elastic.easeIn.config(0.5, 1)
        });

        tl.main.to('.questions', 1, {
            opacity: 0,
            x: 30
        });

        tl.main.to('.card-nl', 0.5,{
            opacity: 1,
            y:0 
        })

        tl.main.call(function(){
            Interaction.hideElement(Interaction.fillcard);
            self.showOverview();
        });
    },

    showOverview: function() {
        Interaction.showElement(Interaction.overview);

        // move the fillcard user card to the overview cards
        $(".fillcard .card-user")
            .detach()
            .prependTo(".overview .cards");

        // set subject div
        var height = $(".overview .cards").height() + ( 5 * 16);
        $('.overview .subject').css('min-height', height);  

        var width = $('.overview').width() / 2
        $('.overview .subject .subject-wrap').css('min-height', height);
        $('.overview .subject .subject-wrap').width(width);

        Charts.svgWidth = width - 32;

        // init subject charts
        Charts.religieChart.init();
    },


    showPerson: function(sex, phase) {
        sex = (sex == "Man") ? "m": "f";

        var elm = "#keuzesvg1 #phase_" + phase + "_" + sex;

        tl.show.set('#keuzesvg1 .person', { opacity: 0 });
        tl.show.set(elm, { opacity: 1 });
    },

    showPersonNl: function(sex, phase) {
        console.log(sex);
        
        tl.show.set('#nlsvg1 .person', { opacity: 0, x: 0, y: 0 });

        if (sex == "uni") {
            var male = "#nlsvg1 #phase_" + phase + "_m";
            var female = "#nlsvg1 #phase_" + phase + "_f";
            tl.show.set([male, female], { opacity: 1 });

            if (phase == 1) {
                tl.show.set(male, { x: 50, y: 10 });
                tl.show.set(female, { x: -50, y: 30 });
            }

            else if (phase == 2) {
                tl.show.set(male, { x: 50, y: 10});
                tl.show.set(female, { x: -50, y: 20 });
            }

            else if (phase == 3) {
                tl.show.set(male, { x: 50, y: 10 });
                tl.show.set(female, { x: -55, y: 20 });
            }

            else if (phase == 4) {
                tl.show.set(male, { x: 50, y: 10 });
                tl.show.set(female, { x: -55, y: 20 });
            }

            else if (phase == 5) {
                tl.show.set(male, { x: 50, y: 10 });
                tl.show.set(female, { x: -55, y: 20 });
            }
        } else {
            sex = (sex == "Man" || sex == "man") ? "m": "f";

            var elm = "#nlsvg1 #phase_" + phase + "_" + sex;

            tl.show.set(elm, { opacity: 1 });
        }

        var nlSvgclass = "phase_" + phase + "_" + sex;
        $("#nlsvg1").attr("class", "");
        $("#nlsvg1").addClass(nlSvgclass);
        
        
    },

    showSubject: function() {
        tl.main.to(Interaction.subject, 1, { opacity: 1 })
    }
};