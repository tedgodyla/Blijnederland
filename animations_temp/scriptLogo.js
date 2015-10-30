var titleBlij = document.querySelectorAll("#name_1")
var smile = document.querySelectorAll("#smile_1")

var tlLogo = new TimelineMax

function splashAnim() {
	tlLogo.set(smile, {transformOrigin: "50% 50%", scaleX: 0})
	tlLogo.set(titleBlij, {transformOrigin: "50% 100%", y: 60, opacity: 0})
	tlLogo.to(smile, 1, {scaleX: 1, ease: Elastic.easeOut.config(1, 0.5), y: 0 }, 2)
	tlLogo.to(titleBlij, 1, {y: 0, opacity: 1}, "-=0.6")
	tlLogo.to([titleBlij, smile], 1.5, {ease: Elastic.easeIn.config(1, 1), y: 1000}, "+=1")
}

splashAnim();