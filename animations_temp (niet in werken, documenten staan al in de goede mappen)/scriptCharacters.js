// ----------GENERAL ACTIONS----------
var leftFoot = document.querySelectorAll("#l_shoe_9, #l_shoe_8, #l_shoe_7, #l_shoe_6, #l_shoe_5");
var eyes = document.querySelectorAll("#r_eye_9, #l_eye_9, #r_eye_8, #l_eye_8, #r_eye_7, #l_eye_7, #r_eye_6, #l_eye_6, #r_eye_5, #l_eye_5");
var pupils = document.querySelectorAll("#r_pupil_9, #l_pupil_9, #r_pupil_8, #l_pupil_8, #r_pupil_7, #l_pupil_7, #r_pupil_6, #l_pupil_6, #r_pupil_5, #l_pupil_5");
var rightBrow = document.querySelectorAll("#r_brow_12, #r_brow_11, #r_brow_10, #r_brow_8, #r_brow_4");
var leftBrow = document.querySelectorAll("#l_brow_12, #l_brow_11, #l_brow_10, #l_brow_8, #l_brow_4");
var head = document.querySelectorAll("#head_9, #head_8, #head_7, #head_6, #head_5")

var photo = document.querySelectorAll("#photo")
// --------------------||

// ----------UNIQUE ACTIONS----------
var cat = document.querySelectorAll("#cat_1, #cat_eyes_1")
var watch = document.querySelectorAll("#light_1")
var tie = document.querySelectorAll("#tie_1")
var mustash = document.querySelectorAll("#mustash_4, #mustash_2")
// --------------------||

// ----------TIMELINES----------
var tlShoe = new TimelineMax
var tlBlink = new TimelineMax({repeat: -1, repeatDelay: 5 + Math.random(20)});
var tlEyeBrow = new TimelineMax
var tlHeadTilt = new TimelineMax
var tlSleep = new TimelineMax
var tlCat = new TimelineMax
var tlWatch = new TimelineMax
var tlTie = new TimelineMax
var tlMustash = new TimelineMax
var tlPhoto = new TimelineMax
// --------------------||

// ----------GENERAL FUNCTIONS----------
// Wanneer de gebruiker geen actie neemt binnen 30sec
function shoeTap() {
	tlShoe.to(leftFoot, 0.7, {repeat: 5, yoyo:true, ease: Power1.easeInOut, rotationX: -45})
};

// Vindt plaats op random momenten
function blink() {
	tlBlink.to([eyes, pupils], 0.5, {transformOrigin: "50% 50%", rotationX: -180})
};

// Wanneer er op het gezicht geklikt wordt
function angryBrow() {
	tlEyeBrow.to(leftBrow, 1, {repeat: 1, yoyo:true, repeatDelay: 3, transformOrigin: "top left", ease: Power2.easeIn, rotation:30, x: 7}, 0)
	tlEyeBrow.to(rightBrow, 1, {repeat: 1, yoyo:true, repeatDelay: 3, transformOrigin: "top right", ease: Power2.easeIn, rotation:-30, x: -7}, 0)
};

// Wanneer de gebruiker geen actie neemt binnen 60sec
function sleep() {
	tlSleep.to([eyes, pupils], 0.8, {transformOrigin: "50% 50%", ease: Power1.easeInOut, rotationX: -87}, 0)
	tlSleep.to([rightBrow, leftBrow], 1.5, {y:10, ease: Power1.easeInOut}, 0)
	tlSleep.to(head, 2, {transformOrigin: "35%, 100%", ease: Power1.easeInOut, rotation: 15}, 0)
};

function awake() {
	tlSleep.to([eyes, pupils], 0.8, {transformOrigin: "50% 50%", ease: Power1.easeInOut, rotationX: 0}, 0)
	tlSleep.to([rightBrow, leftBrow], 1.5, {y:0, ease: Power1.easeInOut}, 0)
	tlSleep.to(head, 2, {transformOrigin: "35%, 100%", ease: Power1.easeInOut, rotation: 0}, 0)
};
// --------------------||


// ----------UNIQUE FUNCTIONS----------
function pocketCat() {
	tlCat.to(cat, 1, {y: -20, repeat: 1, repeatDelay: 5, yoyo:true})
	tlCat.to(cat[1], 0.4, {repeat: 4, repeatDelay: 1, transformOrigin: "50% 50%", rotationX: -180}, -1)
};

function watchBlink() {
	tlWatch.to(watch, 0.2, {opacity:1, repeat: 7, repeatDelay: 0.2, yoyo:true, ease: Power1.easeInOut})
}

function tieWiggle() {
	tlTie.to(tie, 0.5, {transformOrigin: "50% 0%", rotation: 10, ease: Power1.easeInOut}),
	tlTie.to(tie, 1.0, {transformOrigin: "50% 0%", rotation: -8, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.8, {transformOrigin: "50% 0%", rotation: 6, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.5, {transformOrigin: "50% 0%", rotation: -3, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.3, {transformOrigin: "50% 0%", rotation: 0, ease: Power1.easeInOut})
};

function mustashWiggle() {
	tlMustash.to(mustash, 0.4, {transformOrigin: "50% 50%", rotation: 7, ease: Power1.easeInOut}),
	tlMustash.to(mustash, 0.8, {transformOrigin: "50% 50%", rotation: -5, ease: Power1.easeInOut}),
	tlMustash.to(mustash, 0.4, {transformOrigin: "50% 50%", rotation: 0, ease: Power1.easeInOut})
};
// --------------------||


// De flits voor op de profiel pagina wanneer de gebruiker klaar is met de basis van zijn/haar profiel
function profilePhoto() {
	tlPhoto.to(photo, 0.5, {repeat: 1, yoyo: true, opacity:1, ease: Power2.easeInOut}, 2)
};
// --------------------||

// ----------FUNCTIONS----------
// shoeTap();
blink();
// angryBrow();
// sleep();
// awake();
// pocketCat();
// watchBlink();
// tieWiggle();
// mustashWiggle();
// profilePhoto();