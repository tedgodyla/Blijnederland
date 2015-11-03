var tl = {
	main: new TimelineMax( { paused: false }),		/* @var object */
    show: new TimelineMax( { paused: false }),	/* @var object */
};

var Animation = {
    init: function () {
        console.log('init animation');

        this.setTimelines();
    },

    setTimelines: function () {
        tl.main.set(Interaction.subject, {
            x: Interaction.windowWidth / 2 - Interaction.emSize,
            transformOrigin: "left bottom"
        });

        this.peekSubject();
    },

    slideInSubject: function () {
        tl.main.to(Interaction.subject, 1, {
            x: 0,
        });
    },

    slideOutSubject: function () {
        tl.main.to(Interaction.subject, 1, {
            x: Interaction.windowWidth / 2 - Interaction.emSize
        });
    },

    peekSubject: function () {
        tl.main.to(Interaction.subject, 0.5, {
            x: Interaction.windowWidth / 2 - Interaction.emSize * 1.2,
            rotation: -3
        });

        tl.main.to(Interaction.subject, 0.5, {
            x: Interaction.windowWidth / 2 - Interaction.emSize,
            rotation: 0
        });
    },

    intro: function () {
        var hidden = [Interaction.profile, Interaction.fillcard, Interaction.subject];

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

    showQuestions: function () {
        tl.main.set('.flits', {
            opacity: 0
        });

        // tl.main.set('.card-user', {
        //     scale: 1.2,
        //     rotation: -5,
        //     y: -50, 
        //     x: -20

        // });



        Interaction.showElement($('.flits'));

        tl.main.to('.flits', 0.2, { opacity: 1 });
        
        tl.main.call(function(){
            Interaction.hideElement(Interaction.profile);
        })
      
        tl.main.to('.flits', 0.5, { opacity: 0, delay: 0.5 });


        tl.main.call(function(){
            Interaction.hideElement($('.flits'));
        });


           // tl.main.to('.card-user', 0.5, { scale: 1, rotation: 0, y:0, x:0})
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
            opacity: 0
        }, 0.1, "fadegroup");

        tl.main.staggerTo(text, 1, {
            opacity: 0
        }, 0.1, "fadegroup");

        tl.main.to('.card-stats', 1, {
            height: 0,
            y: -35
        });

        tl.main.to('.questions', 1, {
            opacity: 0,
            x: 30
        });

        tl.main.call(function(){
            Interaction.hideElement(Interaction.fillcard);
            self.showOverview();
        });
    },

    showOverview: function() {
        Interaction.showElement(Interaction.overview);
    }

};