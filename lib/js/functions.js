/* --- FOREACH COMPATIBILITY  --- */
if (!Array.prototype.forEach)
{
   Array.prototype.forEach = function(fun /*, thisp*/)
   {
      var len = this.length;
      if (typeof fun != "function")
      throw new TypeError();
      
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
         if (i in this)
         fun.call(thisp, this[i], i, this);
      }
   };
}

/* --- ADDED REMOVE FUNCTION ON ARRAY --- */
// removes the item with a value
// arr.remove('test'); remove the item 'test' out of the array arr.
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/* --- THROTTLE FUNCTION --- */
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
        // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}