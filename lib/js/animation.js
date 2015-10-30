var tl = {
	main: new TimelineMax( { paused: false }),		/* @var object */
    loader: new TimelineMax( { paused: false }),	/* @var object */
    test: new TimelineMax( { paused: false })		/* @var object */
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
        tl.main.to(".intro .logo", 1, { opacity: 0 }, 2);
            
        tl.main.call(function(){
            Interaction.hideElement(Interaction.intro);
            Interaction.showElement(Interaction.profile);
        });

        tl.main.to(Interaction.profile, 1, { opacity: 1 });
    },

    hideQuestionOverlay: function () {
    	console.log("hide quenstion overlay");
    	Interaction.hideElement(Interaction.questionsOverlay);
    }
};