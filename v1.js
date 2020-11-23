
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var game = null;

function init() {
    game = new Game();

    game.init();

    window.requestAnimationFrame(update);
}

function update() {
    
    game.update();
    
    window.requestAnimationFrame(update);
}

resources.onReady(init);

/*
var expl = new Explosion(console, 50, 100, 'explosion1', 50, 50, 2.00001);

expl.update();
*/