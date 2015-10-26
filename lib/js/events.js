/* --- EVENT TIMEOUT OBJECT --- */
var EventTimeout = {
    mouseidle: null,
    resize: null,
    scroll: null
}

/* --- TRIGGER bn_resize EVENT EVERY 50ms--- */
$(window).on('resize', throttle(function (event) {
    $(window).trigger('bn_resize');
}, 50));

/* --- TRIGGER bn_resized EVENT WHEN DOCUMENT STOPPED RESIZING --- */
$(window).on('resize', function() {
    clearTimeout(EventTimeout.resize);
    EventTimeout.resize = setTimeout(function() {
        $(window).trigger('bn_resized');
    }, 500);
});

/* --- TRIGGER bn_scroll EVENT EVERY 50ms--- */
$(document).on('scroll', throttle(function (event) {
    $(document).trigger('bn_scroll');
}, 50));

/* --- TRIGGER bn_scrolled EVENT WHEN DOCUMENT STOPPED SCROLLING --- */
$(document).on('scroll', function() {
    clearTimeout(EventTimeout.scroll);
    EventTimeout.scroll = setTimeout(function() {
        $(document).trigger('bn_scrolled');
    }, 250);
});

/* --- TRIGGER bn_mousemove EVENT EVERY 50ms--- */
$(document).on('mousemove', throttle(function (event) {
    $(document).trigger('bn_mousemove');
}, 50));

/* --- TRIGGER bn_idle EVENT WHEN MOUSE IS IDLE --- */
$(document).on('mousemove', function() {
    clearTimeout(EventTimeout.mouseidle);
    EventTimeout.mouseidle = setTimeout(function() {
        $(document).trigger('bn_mouseidle');
    }, 5000);
});