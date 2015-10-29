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
        
        tl.main.set(hidden, { opacity: 0 });
    	tl.main.to(".intro .logo", 1, { opacity: 0 });
        
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