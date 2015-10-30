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
        this.hideElement(this.fillcard);
        this.hideElement(this.subject);

        Animation.intro();
    },

    setVariables: function () {
        this.emSize = 16;
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
        this.questionsGroups = $(".questions .q-group");
        this.questions = $(".questions .q-group-questions");
        this.subject = $(".subject-container");
        this.profile = $(".profile");
        this.intro = $(".intro");
        this.fillcard = $(".fill-card");
        this.header = $("header");
    },

    initHandlers: function () {
        console.log('init handlers interaction');

        var self = this;

        $("select").selectmenu();

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
                var faultMessage = "";

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

                    console.log(input.name);

                    if (input.name == "leeftijd")
                    {
                        if (input.value < 1 || input.value > 100)
                        {
                            faultMessage = "leeftijd moet tussen de 1 en 100 zijn.";
                        }
                    }

                    questionName.push(input.name);
                    questionAnswer.push(input.value);
                });

                if (faultMessage)
                {
                    console.log(faultMessage);
                }

                else if (allQuestionAnswered) {
                    for (var i = 0; i < questionName.length; i++) {
                        var lastQuenstion = questionName[questionName.length -1];
                        self.submitQuestionForm(questionGroup, lastQuenstion, questionName[i], questionAnswer[i]);
                    }

                    if (profileform) {
                        self.modus = "questions";
                        self.showElement(self.fillcard);
                        self.header.addClass("logoleft");
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
                
                self.questionsCurrentStep = $(this).index();
                self.changeQuestions(self.questionsCurrentStep);
                self.questionsAnswers[group] = {};
            }
        });
    },

    /**
     * @param string name
     * @param string answer
    */
    submitQuestionForm: function (group, lastQuestion, name, answer) {
        if (!this.questionsAnswers[group]) {
            this.questionsAnswers[group] = {};
        }

        this.questionsAnswers[group][name] = answer;

        var nextQuestion = false;
        
        if (lastQuestion == name) {
            nextQuestion = true;
        }

        if (this.modus == "questions") {
            if (nextQuestion) {
                console.log("answers:", this.questionsAnswers);
                console.log('current', this.questionsCurrentStep);
                if (this.questionsCurrentStep + 1 < this.questionsGroups.length ) {
                    this.questionsCurrentStep++;
                    this.changeQuestions(this.questionsCurrentStep);
                }
                else {
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
        var self = this;

        // give the current active question the class done, so the user can return to it.
        $(this.questions).each(function(i) {
            if ($(this).hasClass('active')) {
                $(self.questions[i]).addClass('done');
                $(self.questionsGroups[i]).addClass('done');
            }
        });
        
        $(this.questions).removeClass('active');
        $(this.questions[num]).addClass('active');

        $(this.questionsGroups).removeClass('active');
        $(this.questionsGroups[num]).addClass('active');

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
            success: function (json) {
                data = self.parseJson(json);
                console.log("data:", data);
                if (data.succes) {
                    if (action == "addanswers") {
                        console.log("storing answers done");
                        self.answerGUID = data.data;
                    }
                } else {
                    console.log("error:", data.message);
                }
            }
        });
    },

    /**
     * @param string json
    */
    parseJson: function (json) {
        var obj = JSON && JSON.parse(json) || $.parseJSON(json);
        return obj;
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