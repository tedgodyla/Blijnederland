var Interaction = {
    modus: "profile",               /* @var string */
    questionsCurrentStep: 0,        /* @var int */
    questionsAnswers: {},           /* @var object */
    currentPhase: 1,
    currentSex: "Man",
    
    init: function () {
        console.log('init interaction');

        this.setVariables();
        this.initHandlers();

        this.changeQuestions(this.questionsCurrentStep);

        // hide elements
        this.hideElement(this.fillcard);
        this.hideElement(this.overview);
        this.hideElement(this.subject);

        Animation.showPerson(self.currentSex, self.currentPhase)
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
        this.fillcard = $(".fillcard");
        this.overview = $(".overview");
        this.header = $("header");

        this.getQuestionJson();
    },

    initHandlers: function () {
        console.log('init handlers interaction');

        var self = this;

        $("select").selectmenu();

        var leeftijdDone = false;
        var naamDone = false;
        var submit = $("form.profileform .submit");
        $("form.profileform input").on("keyup change", function(event) {
            var input = self.getElmData(this);

            if (input.name == "naam") {
                naamDone = (input.value) ? true : false;
            }

            if (input.name == "leeftijd") {
                leeftijdDone = (input.value) ? true : false;
                if (input.value) {
                    // console.log("change SVG - leeftijd:", input.value);

                    if (input.value < 15) {
                        self.currentPhase = 1;
                        Animation.showPerson(self.currentSex, 1);
                        console.log("jonger dan 15");
                    } 
                    else if (input.value >= 15 && input.value < 35) {
                        self.currentPhase = 2;
                        Animation.showPerson(self.currentSex, 2)
                        console.log("jonger dan 25");
                    }
                    else if (input.value >= 35 && input.value < 45) {
                        self.currentPhase = 3;
                        Animation.showPerson(self.currentSex, 3)
                        console.log("Jonger dan 35");
                    }
                    else if (input.value >= 45 && input.value < 65) {
                        self.currentPhase = 4;
                        Animation.showPerson(self.currentSex, 4)
                        console.log("Jonger dan 45");
                    }
                    else if (input.value >= 65) {
                        self.currentPhase = 5;
                        Animation.showPerson(self.currentSex, 5)
                        console.log("Jonger dan 65");
                    }
                }
            }

            if (input.name == "geslacht") {
                self.currentSex = input.value;
                Animation.showPerson(self.currentSex, self.currentPhase)
                console.log("change SVG - geslacht:", input.value);
            }

            if (naamDone && leeftijdDone) {
                $(submit).addClass("ready"); 
            } else {
                $(submit).removeClass("ready");
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
                var questionIcon = [];
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

                    if (input.name == "naam")
                    {
                        if (input.value.length < 2 || input.value.length > 30)
                        {

                            faultMessage = "Je naam moet tussen de 2 en 30 charakters zijn";
                        }
                    }

                    questionName.push(input.name);
                    questionAnswer.push(input.value);
                    questionIcon.push(input.icon);
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

                        $(".card-user .info span.icon").addClass("icon-" + questionIcon[0]);
                        $(".card-user .info h3").text(questionAnswer[1]);
                        $(".card-user .info h4").text(questionAnswer[2]);

                        self.showElement(self.fillcard);
                        self.header.addClass("logoleft");
                    }
                }

                else { 
                    // $(this).addClass('fout');
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

        $("form.geslachtnlform input").on("keyup change", function(event) {
            var input = self.getElmData(this);
            Charts.overviewChart.changeGeslacht(input.value);
        });

        var minValue = 1,
            maxValue = 100,
            valValue = 50;

        $("#input_leeftijdNl").val(valValue);
        $("#text_leeftijdNl").text(valValue);
        $("#slider_leeftijdNl").slider({
            range: false,
            min: minValue,
            max: maxValue,
            value: valValue,
            animate: "fast",
            slide: function( event, ui ) {
                var value = ui.value; 
                var text = value + " jaar";
                $("#input_leeftijdNl").val(value);
                $("#text_leeftijdNl").text(text);

                Charts.overviewChart.changeLeeftijd(value);
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

        if ($.isNumeric( answer )) {
            answer = parseInt(answer);
        }

        this.questionsAnswers[group][name] = answer;

        console.log(this.questionsAnswers);

        var nextQuestion = false;
        
        if (lastQuestion == name) {
            nextQuestion = true;
            Charts.userChart.setup();
            console.log("answers:", this.questionsAnswers);
        }

        if (this.modus == "questions") {
            if (nextQuestion) {
                if (this.questionsCurrentStep + 1 < this.questionsGroups.length ) {
                    this.questionsCurrentStep++;
                    this.changeQuestions(this.questionsCurrentStep);
                }
                else {
                    console.log("all quenstions completed");
                    this.storeQuestionAnswers();
                }
            }
        } else if (this.modus == "profile") {
            if (nextQuestion) {
                Animation.showQuestions();
            }
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
        console.log(this.questionsAnswers);

        Charts.overviewChart.setup();

        this.ajaxCall("addanswers");
        this.modus = "normal";

        Animation.hideQuestions();

        //this.showElement(this.subject);
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
            value: $(elem)[0].value,
            icon: $(elem)[0].dataset.icon
        };
        return elem;
    },

    getAnswersJson: function (data) {

    },

    getQuestionJson: function () {
        self = this;
        $.getJSON( "datasets/questions.json", function( data ) {

            self.questionsAnswers["profile"] = {};
            $.each(data.profile, function(key, value) {
                self.questionsAnswers["profile"][key] = "";
            });

            $.each(data.questions, function(subject, value) {
                self.questionsAnswers[subject] = {};
                $.each(value, function(key, value) {
                    self.questionsAnswers[subject][key] = 1;
                });
            });
        });
    },

    /* --- STANDARD FUNCTIONS --- */

    /**
     * @param object elem
    */
    showElement: function (elem) {
        $(elem).show();
        tl.show.set(elem, {
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
    Charts.init();
    Interaction.init();
    Animation.init();
});