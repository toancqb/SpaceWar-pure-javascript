


(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();

resources.load([
    "assets/Ship/3.png",
    "assets/Background/Stars.png",
    "assets/Background/Star.png",
    "assets/Background/Star2.png",
    "assets/Background/Planet2.png",
    "assets/Background/Meteor1.png",
    "assets/Background/Meteor2.png",
    "assets/Background/Meteor3.png",
    "assets/Background/Meteor4.png",
    "assets/Background/Meteor5.png",
    "assets/Background/sp1.jpg",
    "assets/Background/sp2.png",
    "assets/Ship/6b.png",
    "assets/Ship/2.png",
    "assets/Shoot/1.png",
    "assets/Shoot/2.png",
    "assets/Shoot/3.png",
    "assets/Shoot/4.png",
    "assets/Shoot/5.png",
    "assets/Shoot/6.png",
    "assets/Shoot/7.png",
    "assets/Shoot/8.png",
    "assets/Shoot/9.png",
    "assets/Shoot/10.png",
    "assets/Shoot/11.png",
    "assets/Shoot/12.png",
    "assets/Shoot/13.png",
    "assets/Shoot/14.png",
    "assets/Fx/Explosion1.gif",
    "assets/Item/Rocket.png"
    
]);

srcPath = {
    'mainship': "assets/Ship/3.png",
    'stars': "assets/Background/Stars.png",
    'star': "assets/Background/Star.png",
    'star2': "assets/Background/Star2.png",
    'planet2': "assets/Background/Planet2.png",
    'meteor1': "assets/Background/Meteor1.png",
    'meteor2': "assets/Background/Meteor2.png",
    'meteor3': "assets/Background/Meteor3.png",
    'meteor4': "assets/Background/Meteor4.png",
    'meteor5': "assets/Background/Meteor5.png",
    'sp1' : "assets/Background/sp1.jpg",
    'sp2' : "assets/Background/sp2.png",
    'enemy6b': "assets/Ship/6b.png",
    'enemy2': "assets/Ship/2.png",
    'shoot1' : "assets/Shoot/1.png",
    'shoot2' : "assets/Shoot/2.png",
    'shoot3' : "assets/Shoot/3.png",
    'shoot4' : "assets/Shoot/4.png",
    'shoot5' : "assets/Shoot/5.png",
    'shoot6' : "assets/Shoot/6.png",
    'shoot7' : "assets/Shoot/7.png",
    'shoot8' : "assets/Shoot/8.png",
    'shoot9' : "assets/Shoot/9.png",
    'shoot10' : "assets/Shoot/10.png",
    'shoot11' : "assets/Shoot/11.png",
    'shoot12' : "assets/Shoot/12.png",
    'shoot13' : "assets/Shoot/13.png",
    'shoot14' : "assets/Shoot/14.png",
    'explosion1' : "assets/Fx/Explosion1.gif",
    'rocket' : "assets/Item/Rocket.png"
};