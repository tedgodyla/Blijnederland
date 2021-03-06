var Interaction = {
    modus: "profile",               /* @var string */
    questionsCurrentStep: 0,        /* @var int */
    questionsAnswers: {},           /* @var object */
    currentPhase: 1,
    currentSex: "Man",
    userName: "",
    userAge: "",
    userSex: "",
    userSexIcon: "",
    userReligie: "",
    currentOpenSubject: "",
    
    init: function () {
        console.log('init interaction');

        this.setVariables();
        this.initHandlers();

        this.changeQuestions(this.questionsCurrentStep);

        // hide elements
        this.hideElement(this.fillcard);
        this.hideElement(this.overview);

        Animation.showPerson(self.currentSex, self.currentPhase);
        Animation.intro();
    },

    setVariables: function () {
        this.emSize = 16;
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
        this.questionsGroups = $(".questions .q-group");
        this.questions = $(".questions .q-group-questions");
        this.subject = $(".subject");
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
                    if (input.value < 15) {
                        self.currentPhase = 1;
                        Animation.showPerson(self.currentSex, 1);
                    } 
                    else if (input.value >= 15 && input.value < 35) {
                        self.currentPhase = 2;
                        Animation.showPerson(self.currentSex, 2)

                      
                    }
                    else if (input.value >= 35 && input.value < 45) {
                        self.currentPhase = 3;
                        Animation.showPerson(self.currentSex, 3)
                    }
                    else if (input.value >= 45 && input.value < 65) {
                        self.currentPhase = 4;
                        Animation.showPerson(self.currentSex, 4)
                    }
                    else if (input.value >= 65) {
                        self.currentPhase = 5;
                        Animation.showPerson(self.currentSex, 5)
                    }
                }
            }

            if (input.name == "geslacht") {
                self.currentSex = input.value;
                Animation.showPerson(self.currentSex, self.currentPhase)
            }

            if (naamDone && leeftijdDone) {
                $(submit).addClass("ready"); 
            } else {
                $(submit).removeClass("ready");
            }
        });

        $("form").on("submit", function(event) {
            self.currentNlSex = self.currentSex;
            self.currentNlPhase = self.currentPhase;

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

                    $(this).removeClass("req");

                    if (input.name == "welke") {
                        self.userReligie = input.value;
                    }

                    if (input.type == "submit") {
                        return true; // skip this round
                    } else if (input.type == "radio") {
                        if (!this.checked) {
                            return true; // skip this round
                        }
                    }

                    if (!input.value) {
                        $(this).addClass("req");
                        allQuestionAnswered = false;
                        //return false;
                    }

                    if (input.name == "leeftijd")
                    {
                        if (input.value < 1 || input.value > 100)
                        {
                            $(this).addClass("req");
                            faultMessage = "leeftijd moet tussen de 1 en 100 zijn.";
                        }
                    }

                    if (input.name == "naam")
                    {
                        if (input.value.length < 2 || input.value.length > 30)
                        {
                            $(this).addClass("req");
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
                        if (self.modus == "profile") {
                            self.modus = "questions";
                            self.userName = questionAnswer[1];
                            self.userAge = questionAnswer[2];
                            self.userSex = questionAnswer[0];
                            self.userSexIcon = questionIcon[0];

                            // prepare overview chart
                            Charts.overviewChart.changeGeslacht(self.userSex);
                            Charts.overviewChart.changeLeeftijd(self.userAge);
                            Charts.overviewChart.init();

                            Animation.showPersonNl(self.currentNlSex, self.currentNlPhase);
                            Animation.hideProfile();
                        }
                    }
                }

                else { 
                    console.log("user did not fill in all fields")
                }
            }
        });

        $('.q-group').on('click touchstart', function() {
            if ($(this).hasClass('done')) {
                var group = $(this).find("form")[0].name;
                
                self.questionsCurrentStep = $(this).index();
                self.changeQuestions(self.questionsCurrentStep);
                self.questionsAnswers[group] = {};
            }
        });

        $(".subject .close").on('click touchstart', function() {
            self.closeSubject();
        })

        $("form.geslachtnlform input").on("keyup change", function(event) {
            var input = self.getElmData(this);
            Charts.overviewChart.changeGeslacht(input.value);
            Charts.overviewChart.setup();

            self.currentNlSex = input.value;
            Animation.showPersonNl(self.currentNlSex, self.currentNlPhase);
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

                // change nl chart
                Charts.overviewChart.changeLeeftijd(value);
                Charts.overviewChart.setup();

                // change nl svg
                if (value < 15) {
                    self.currentNlPhase = 1;
                    Animation.showPersonNl(self.currentNlSex, 1);
                } 
                else if (value >= 15 && value < 35) {
                    self.currentNlPhase = 2;
                    Animation.showPersonNl(self.currentNlSex, 2)
                }
                else if (value >= 35 && value < 45) {
                    self.currentNlPhase = 3;
                    Animation.showPersonNl(self.currentNlSex, 3)
                }
                else if (value >= 45 && value < 65) {
                    self.currentNlPhase = 4;
                    Animation.showPersonNl(self.currentNlSex, 4)
                }
                else if (value >= 65) {
                    self.currentNlPhase = 5;
                    Animation.showPersonNl(self.currentNlSex, 5)
                }
            }
        });

        $('.carousel').slick({
            dots: false,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            pauseOnHover: false
        });

        $('.edit').on("click touchstart", function() {
            console.log("editQuestions");
        });

        $("header .logo").on("click touchstart", function() {
            location.reload();
        });
    },

    moveProfileSVGtoCardSVG: function () {
        self = this;

        // place profile data in user card
        $(".card-user .info span.icon").addClass("icon-" + self.userSexIcon);
        $(".card-user .info h3").text(self.userName);
        $(".card-user .info h4").text(self.userAge + " jaar");

        $("#input_leeftijdNl").val(self.userAge);
        $("#text_leeftijdNl").text(self.userAge + " jaar");
        $("#slider_leeftijdNl").slider("option", "value", self.userAge);

        $("#geslachtNl"+self.userSex).prop("checked", true)

        self.showElement(self.fillcard);
        self.header.addClass("logoleft");

        $("#keuzesvg1 svg")
            .clone()
            .appendTo("#nlsvg1");

        $("#keuzesvg1 svg")
            .detach()
            .appendTo("#profilesvg1");

        var sex = (self.currentSex == "Man") ? "m": "f";
        var profileSvgclass = "phase_" + self.currentPhase + "_" + sex;

        $("#profilesvg1").addClass(profileSvgclass);
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

        var nextQuestion = false;
        
        if (lastQuestion == name) {
            nextQuestion = true;
            Charts.userChart.setup();
        }

        if (this.modus == "questions") {
            if (nextQuestion) {
                if (this.questionsCurrentStep + 1 < this.questionsGroups.length ) {
                    this.questionsCurrentStep++;
                    this.changeQuestions(this.questionsCurrentStep);
                }
                else {
                    this.storeQuestionAnswers();
                }
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
        $(this.questions).height(0);

        var height = $(this.questions[num]).find("form").height() + 4;

        $(this.questions[num]).addClass('active');
        $(this.questions[num]).height(height);

        $(this.questionsGroups).removeClass('active');
        $(this.questionsGroups[num]).addClass('active');
    },

    storeQuestionAnswers: function () {
        console.log("all quenstions completed");
        console.log("starting storing answers");
        console.log("answers:", this.questionsAnswers);

        Charts.overviewChart.setup();

        this.ajaxCall("addanswers");
        this.modus = "normal";

        Animation.hideQuestions();
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

    openSubject: function (d) {
        var self = Interaction;

        var subject = d.name.toLowerCase();
        self.currentOpenSubject = subject;

        $('.overview .subject').attr("class", "subject " + subject);

        if (self.modus == "normal") {
            console.log("open subject", d.name)

            self.modus = "subject";

            $('.overview').addClass("active-subject");

            Animation.showSubject();
        }

        if (self.modus == "subject") {
            console.log("open another subject", d.name);
        }
    },

    closeSubject: function () {
        this.modus = "normal";

        $('.overview').removeClass("active-subject");
        $('.overview .subject').attr("class", "subject");
    },

    /* --- STANDARD FUNCTIONS --- */

    /**
     * @param object elem
    */
    showElement: function (elem) {
        $(elem).show();
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