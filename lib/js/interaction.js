var Interaction = {
    modus: "profile",             /* @var string */
    questionsCurrentStep: 0,        /* @var int */
    questionsAnswers: {},           /* @var object */
    
    init: function () {
        console.log('init interaction');

        this.setVariables();
        this.initHandlers();

        this.changeQuestions(this.questionsCurrentStep);

        // hide elements
        this.hideElement(this.profile);
        this.hideElement(this.questionsContainer);
        this.hideElement(this.passport);
        this.hideElement(this.subject);

        Animation.intro();
    },

    setVariables: function () {
        this.emSize = 16;
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
        this.questionsContainer = $(".q-container");
        this.questionsGroups = $(".q-container .q-group");
        this.questions = $(".q-container .q-group-questions");
        this.subject = $(".subject-container");
        this.profile = $(".profile");
        this.passport = $(".passport");
        this.intro = $(".intro");
    },

    initHandlers: function () {
        console.log('init handlers interaction');

        var self = this;

        $("form.profileform input").on("change", function(event) {
            var input = self.getElmData(this);

            if (input.name == "leeftijd") {
                console.log("change SVG - leeftijd:", input.value);
            }

            if (input.name == "geslacht") {
                console.log("change SVG - geslacht:", input.value);
            }
        });

        $("form").on("submit", function(event) {
            event.preventDefault();
            var qform = $(this).hasClass('qform');
            var profileform = $(this).hasClass('profileform');
            var inputFields = null;

            inputFields = (qform) ? $('.q-group-questions.active input, .q-group-questions.active select') : inputFields;
            inputFields = (profileform) ? $('.profileform input') : inputFields;

            if (profileform || qform) {
                var allQuestionAnswered = true;
                var questionGroup = $(this)[0].name;
                var questionName = [];
                var questionAnswer = [];

                $(inputFields).each(function() {
                    var input = self.getElmData(this);

                    if (input.type == "submit") {
                        return true; // skip this round
                    } else if (input.type == "radio") {
                        if (!this.checked) {
                            return true; // skip this round
                        }
                    }

                    if (!input.value) {
                        allQuestionAnswered = false;
                        return false;
                    }

                    questionName.push(input.name);
                    questionAnswer.push(input.value);
                });

                if (allQuestionAnswered) {
                    for (var i = 0; i < questionName.length; i++) {
                        self.submitQuestionForm(questionGroup, questionName.length, questionName[i], questionAnswer[i]);
                    }

                    if (profileform) {
                        self.modus = "questions";
                        self.showElement(self.questionsContainer);
                        self.showElement(self.passport);
                    }
                }

                else {
                    console.log("user did not fill in all fields")
                }
            }
        });

        $('.q-group').on('click touchstart', function(){
            if ($(this).hasClass('done')) {
                var group = $(this).find("form")[0].name;
                
                self.questionsCurrentStep = $(this).index() - 1;
                self.changeQuestions(self.questionsCurrentStep);
                self.questionsAnswers[group] = {};
            }
        });
    },

    /**
     * @param string name
     * @param string answer
    */
    submitQuestionForm: function (group, grouplength, name, answer) {
        if (!this.questionsAnswers[group]) {
            this.questionsAnswers[group] = {};
        }

        this.questionsAnswers[group][name] = answer;

        var nextQuestion = false;
        var currentInGroup = 0;
        for (var key in this.questionsAnswers[group]) {
            currentInGroup++;
        }

        if (currentInGroup === grouplength) {
            nextQuestion = true;
        }

        if (this.modus == "questions") {
            if (nextQuestion) {
                console.log("answers:", this.questionsAnswers);
                console.log('current', this.questionsCurrentStep);
                if (this.questionsCurrentStep + 1 < this.questionsGroups.length ) {
                    this.questionsCurrentStep++;
                    this.changeQuestions(this.questionsCurrentStep);
                } else {
                    console.log("all quenstions completed");
                    this.storeQuestionAnswers();
                }
            }
        } else {
            this.hideElement(this.profile);
        }
    },

    /* --- APPLICATION FUNCTIONS --- */

    /**
     * @param int num
    */
    changeQuestions: function (num) {
        console.log("open question num", num);

        $(this.questions).removeClass('done active');
        $(this.questions[num]).addClass('active');

        $(this.questionsGroups).removeClass('done active');
        $(this.questionsGroups[num]).addClass('active');

        for (var i = 0; i < num; i++) {
            $(this.questions[i]).addClass('done');
            $(this.questionsGroups[i]).addClass('done');
        }

        // switch(num) {
        //     case 0:
        //         //
        //         break;
        //     case 1:
        //         //
        //         break;
        //     default:
        //         //
        // }
    },

    storeQuestionAnswers: function () {
        console.log("starting storing answers");

        this.ajaxCall("addanswers");
        this.modus = "normal";

        Animation.hideQuestionOverlay();
        this.showElement(this.subject);
        //var answers = getAnswersJson(data);
    },

    /**
     * @param string action
    */
    ajaxCall: function (action) {
        var self = this;
        var answers = this.questionsAnswers;

        $.ajax({
            url: 'ajax_response.php',
            type: 'post',
            data: {
                'action': action,
                'answers': answers
            },
            success: function (data) {
                console.log("data:", data);
                if (action == "addanswers") {
                    console.log("storing answers done");
                    self.answerGUID = data;
                }
            }
        });
    },

    /**
     * @param object elem
    */
    getElmData: function (elem) {
        var elem = {
            id: $(elem)[0].id,
            type: $(elem).attr("type"),
            name: $(elem)[0].name,
            value: $(elem)[0].value
        };
        return elem;
    },

    getAnswersJson: function (data) {

    },

    getQuestionJson: function (data) {

    },

    /* --- STANDARD FUNCTIONS --- */

    /**
     * @param object elem
    */
    showElement: function (elem) {
        $(elem).show();
        tl.main.set(elem, {
            opacity: 1
        });
    },

    /**
     * @param object elem
    */
    hideElement: function (elem) {
        $(elem).hide();
    },

    /**
     * @param string msg
    */
    showMessage: function (msg) {
        console.log('show message: ', msg);
    },

    toogleModus: function () {
        
    }
};

/* --- EVENTS HERE--- */

$(window).on('bn_resized', function () {
    console.log('resized');

    Interaction.windowWidth = $(window).width();
    Interaction.windowHeight = $(window).height();
    // Interaction.resizeGrid();
});

/* --- DOCUMENT READY --- */

$(document).ready(function () {
    // gets everything started when the document is ready
    Interaction.init();
    Animation.init();
});