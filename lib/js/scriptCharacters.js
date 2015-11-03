// ----------GENERAL ACTIONS----------
var leftFoot = document.querySelectorAll("#l_shoe_19_, #l_shoe_18_, #l_shoe_17_, #l_shoe_16_, #l_shoe_15_, #l_shoe_14_, #l_shoe_13_, #l_shoe_12_, #l_shoe_11_, #l_shoe_10_");
var eyes = document.querySelectorAll("#r_eye_19_, #l_eye_19_, #r_eye_18_, #l_eye_18_, #r_eye_17_, #l_eye_17_, #r_eye_16_, #l_eye_16_, #r_eye_15_, #l_eye_15_, #r_eye_14_, #l_eye_14_, #r_eye_13_, #l_eye_13_, #r_eye_12_, #l_eye_12_, #r_eye_11_, #l_eye_11_, #r_eye_10_, #l_eye_10_");
var pupils = document.querySelectorAll("#r_pupil_19_, #l_pupil_19_, #r_pupil_18_, #l_pupil_18_, #r_pupil_17_, #l_pupil_17_, #r_pupil_16_, #l_pupil_16_, #r_pupil_15_, #l_pupil_15_, #r_pupil_14_, #l_pupil_14_, #r_pupil_13_, #l_pupil_13_, #r_pupil_12_, #l_pupil_12_, #r_pupil_11_, #l_pupil_11_, #r_pupil_8_, #l_pupil_8_");
var rightBrow = document.querySelectorAll("#r_brow_30_, #r_brow_29_, #r_brow_28_, #r_brow_26_, #r_brow_25_, #r_brow_24_, #r_brow_22_, #r_brow_20_, #r_brow_18_, #r_brow_6_");
var leftBrow = document.querySelectorAll("#l_brow_30_, #l_brow_29_, #l_brow_28_, #l_brow_26_, #l_brow_25_, #l_brow_24_, #l_brow_22_, #l_brow_20_, #l_brow_18_, #l_brow_6_");
var head = document.querySelectorAll("#head_19_, #head_18_, #head_17_, #head_16_, #head_15_, #head_14_, #head_13_, #head_12_, #head_11_, #head_10_")
// --------------------|| 

// ----------UNIQUE ACTIONS----------
var snot = document.querySelectorAll("#snot_1_")
var cat = document.querySelectorAll("#cat_8_, #cat_eyes_8_")
var watch = document.querySelectorAll("#light_1_")
var tie = document.querySelectorAll("#tie_1_")
var mustash = document.querySelectorAll("#mustash_4_, #mustash_2_")
var rightGlass = document.querySelectorAll("#r_shine_1_")
var leftGlass = document.querySelectorAll("#l_shine_1_")
var topLine = document.querySelectorAll("#t_line_1_")
var botLine = document.querySelectorAll("#b_line_1_")
var shine = document.querySelectorAll("#shine_1_")
var bubbles = document.querySelectorAll("#b1_1_, #b2_1_, #b3_1_, #b4_1_")
var tails = document.querySelectorAll("#l_tail_1_, #r_tail_2_")
var catBag = document.querySelectorAll("#cat_7_, #cat_eyes_7_, #cat_6_, #cat_eyes_6_, #cat_5_, #cat_eyes_5_")
// --------------------||

// ----------TIMELINES----------
var tlShoe = new TimelineMax
var tlBlink = new TimelineMax({repeat: -1, repeatDelay: 5 + Math.random(15)});
var tlEyeBrow = new TimelineMax
var tlHeadTilt = new TimelineMax
var tlSleep = new TimelineMax
var tlSnot = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlCat = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlWatch = new TimelineMax({repeat: -1, repeatDelay: 5 + Math.random(15)});
var tlTie = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlMustash = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlPhoto = new TimelineMax
var tlGlasses = new TimelineMax({repeat: -1, repeatDelay: 15 + Math.random(15)});
var tlLines = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlShine = new TimelineMax({repeat: -1, repeatDelay: 15 + Math.random(15)});
var tlBubbles = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
var tlTails = new TimelineMax
var tlCatBag = new TimelineMax({repeat: -1, repeatDelay: 10 + Math.random(15)});
// --------------------||

// ----------GENERAL FUNCTIONS----------
// Wanneer de gebruiker geen actie neemt binnen 1sec
function shoeTap() {
	tlShoe.to(leftFoot, 0.5, {repeat: 5, yoyo:true, ease: Power1.easeInOut, rotationX: -45})
};

// Random
function eyeBlink() {
	tlBlink.set([eyes, pupils], {transformOrigin: "50% 50%"})
	// Man
	tlBlink.set("#r_eye_19_, #l_eye_19_, #r_eye_18_, #l_eye_18_, #r_eye_17_, #l_eye_17_, #r_eye_16_, #l_eye_16_, #r_eye_15_, #l_eye_15_", {transformOrigin: "50% 50%", rotation: -8})
	// Vrouw
	tlBlink.set("#r_eye_14_, #l_eye_14_, #r_eye_13_, #l_eye_13_, #r_eye_12_, #l_eye_12_, #r_eye_11_, #l_eye_11_, #r_eye_10_, #l_eye_10_", {transformOrigin: "50% 50%", rotation: 8})
	
	tlBlink.to([eyes, pupils], 0.3, {rotationX: -180})
};

// Wanneer er op het gezicht geklikt wordt
function angryBrow() {
	tlEyeBrow.to(leftBrow, 1, {repeat: 1, yoyo:true, repeatDelay: 2, transformOrigin: "top left", ease: Power2.easeIn, rotation:30, x: 7}, 0)
	tlEyeBrow.to(rightBrow, 1, {repeat: 1, yoyo:true, repeatDelay: 2, transformOrigin: "top right", ease: Power2.easeIn, rotation:-30, x: -7}, 0)
};

// Wanneer de gebruiker geen actie neemt binnen 30sec
function sleep() {
	tlSleep.to([eyes, pupils], 0.8, {transformOrigin: "50% 50%", ease: Power1.easeInOut, rotationX: -87}, 0)
	tlSleep.to([rightBrow, leftBrow], 1.5, {y:10, ease: Power1.easeInOut}, 0)
	tlSleep.to(head, 2, {transformOrigin: "35%, 100%", ease: Power1.easeInOut, rotation: 15}, 0)
};
// Wanneer de gebruiker actie neemt NA sleep()
function awake() {
	tlSleep.to([eyes, pupils], 0.8, {transformOrigin: "50% 50%", ease: Power1.easeInOut, rotationX: 0}, 0)
	tlSleep.to([rightBrow, leftBrow], 1.5, {y:0, ease: Power1.easeInOut}, 0)
	tlSleep.to(head, 2, {transformOrigin: "35%, 100%", ease: Power1.easeInOut, rotation: 0}, 0)
};
// --------------------||


// ----------UNIQUE FUNCTIONS----------
// Random
function snotDrip() {
	tlSnot.to(snot, 0.8, {ease: Elastic.easeOut.config(2, 0.5), repeat: 1, repeatDelay: 3, yoyo: true, transformOrigin: "125% 0%", scale: 3, scaleY: 6, opacity: 1, x:3, y: 3}, 0.5)
};

// Random
function pocketCat() {
	tlCat.to(cat, 1, {y: -20, repeat: 1, repeatDelay: 5, yoyo:true})
	tlCat.to(cat[1], 0.4, {repeat: 4, repeatDelay: 1, transformOrigin: "50% 50%", rotationX: -180}, -1)
};

// Random
function watchBlink() {
	tlWatch.to(watch, 0.2, {opacity:1, repeat: 7, repeatDelay: 0.2, yoyo:true, ease: Power1.easeInOut})
};

// Wanneer iemand op het gezicht van de phase 3 model klikt wordt dit getriggerd
function tieWiggle() {
	tlTie.to(tie, 0.5, {transformOrigin: "50% 0%", rotation: 10, ease: Power1.easeInOut}, 3),
	tlTie.to(tie, 1.0, {transformOrigin: "50% 0%", rotation: -8, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.8, {transformOrigin: "50% 0%", rotation: 6, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.5, {transformOrigin: "50% 0%", rotation: -3, ease: Power1.easeInOut}),
	tlTie.to(tie, 0.3, {transformOrigin: "50% 0%", rotation: 0, ease: Power1.easeInOut})
};

// Wanneer iemand op het lichaam van de phase 3 model klikt wordt dit getriggerd
function mustashWiggle() {
	tlMustash.to(mustash, 0.4, {transformOrigin: "50% 50%", rotation: 7, ease: Power1.easeInOut}),
	tlMustash.to(mustash, 0.8, {transformOrigin: "50% 50%", rotation: -5, ease: Power1.easeInOut}),
	tlMustash.to(mustash, 0.4, {transformOrigin: "50% 50%", rotation: 0, ease: Power1.easeInOut})
};

// Random
function glassesShine() {
	tlGlasses.set([rightGlass, leftGlass], {transformOrigin: "50% 50%", x: -10, y: -5, scale: 0.5, opacity: 0}),
	tlGlasses.to(leftGlass, 0.3, {opacity: 1, x: 0, y: 0, scale: 1}, 1),
	tlGlasses.to(leftGlass, 0.3, {opacity: 0, x: 10, y: 5, scale: 0.5}, "-=0.1"),
	tlGlasses.to(rightGlass, 0.3, {opacity: 1, x: 0, y: 0, scale: 1}, 1,3),
	tlGlasses.to(rightGlass, 0.3, {opacity: 0, x: 10, y: 5, scale: 0.5}, "-=0.1")
};

// Wanneer iemand op het lichaam van de phase 4 model klikt wordt dit getriggerd
function linesChange() {
	tlLines.to(topLine, 1, {y: 10, ease: Elastic.easeOut.config(1.5, 0.5), repeat: 1, repeatDelay: 3, yoyo:true}, 1),
	tlLines.to(botLine, 1, {y: -10, ease: Elastic.easeOut.config(1.5, 0.5), repeat: 1, repeatDelay: 3, yoyo:true}, 1)
};

// Random
function shineHead() {
	tlShine.set(shine, {transformOrigin: "50% 50%", opacity: 0, scaleX: 0.5, y: 0}),
	tlShine.to(shine, 0.4 ,{y: 15, opacity: 0.3, scaleX: 1}, 2)
	tlShine.to(shine, 0.4, {y: 20, opacity: 0, scaleX: 1.2}, "-=0.1")
};

// Random
function pipeBubbles() {
	tlBubbles.set(bubbles, {scale: 1.5})
	tlBubbles.to(bubbles[0], 2, {transformOrigin: "50% 50%", ease: Power1.easeOut, bezier: {values:[{x:2,y:-10},{x:-2,y:-20},{x:1,y:-30}]}, scale: 0}, 2),
	tlBubbles.to(bubbles[1], 2, {transformOrigin: "50% 50%", ease: Power1.easeOut, bezier: {values:[{x:-2,y:-12},{x:1,y:-22},{x:-3,y:-32}]}, scale: 0}, "-=1.2"),
	tlBubbles.to(bubbles[2], 2, {transformOrigin: "50% 50%", ease: Power1.easeOut, bezier: {values:[{x:1,y:-13},{x:-2,y:-21},{x:2,y:-31}]}, scale: 0}, "-=1.2"),
	tlBubbles.to(bubbles[3], 2, {transformOrigin: "50% 50%", ease: Power1.easeOut, bezier: {values:[{x:-3,y:-10},{x:1,y:-23},{x:-2,y:-33}]}, scale: 0}, "-=1.2")
};

// Wanneer er op het character geklikt wordt
function tailsMove() {
	tlTails.to(tails, 1.5, {y: 20, ease: Elastic.easeOut.config(1.5, 0.5), repeat: 1, repeatDelay: 3, yoyo: true}, 1)
};

// Random
function catInBag() {
	tlCatBag.to("#cat_7_, #cat_eyes_7_", 1, {y: -20, repeat: 1, repeatDelay: 6, yoyo:true}, 0)
	tlCatBag.to("#cat_6_, #cat_eyes_6_", 1, {y: -16, repeat: 1, repeatDelay: 6, yoyo:true}, 0.8)
	tlCatBag.to("#cat_5_, #cat_eyes_5_", 1, {y: -22, repeat: 1, repeatDelay: 6, yoyo:true}, 0.4)
	tlCatBag.to("#cat_eyes_7_, #cat_eyes_6_, #cat_eyes_5_", 0.4, {repeat: 4, repeatDelay: 3, transformOrigin: "50% 50%", rotationX: -180}, 0)
};
// --------------------||

// ----------FUNCTIONS----------
// shoeTap();
eyeBlink();
// angryBrow();
// sleep();
// awake();
snotDrip();
pocketCat();
watchBlink();
tieWiggle();
mustashWiggle();
glassesShine();
// linesChange();
shineHead();
pipeBubbles();
catInBag();
tailsMove();

// ----------TIMERS----------
var t;
window.onload = resetTimer;
document.onclick = resetTimer;
document.onkeypress = resetTimer;

// Character wordt ongeduldig
function shoeTime() {
	return shoeTap(), angryBrow(); // Hier komt de functie
}

	function resetTimer() {
	   	clearTimeout(t);
	   	t = setTimeout(shoeTime, 10000) // 1000 milisec = 1 sec
	}

// Slapen en wakker worden
// function sleepTime() {
// 	return sleep(); // Hier komt de functie
// 	// if (resetTimer) {
// 	// 	return awake();
// 	// }
// }

// 	function resetTimer() {
// 	   	clearTimeout(t);
// 	   	t = setTimeout(sleepTime, 5000) // 1000 milisec = 1 sec
// 	}

// --------------------||

// ----------OTHER----------
// Glimlach correctie
TweenLite.set(".st63", {transformOrigin: "50% 50%", rotation: 2, y: -3});
