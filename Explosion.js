
class Explosion extends Ship {
    constructor(context, x, y, key, h, w, timeExiste) {
        super(context, x, y, key, h, w);
        this.timeExiste = timeExiste;  
        this.timeCreated = new Date().getTime() / 1000;
        this.active = true;

        this.gif = new GIF();
        this.gif.load("assets/Fx/Explosion1.gif");
    }

    update() {
        // this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
        this.context.drawImage(this.gif.image, this.y, this.x, this.width, this.height);
        var seconds = new Date().getTime() / 1000;

        if (seconds - this.timeCreated > this.timeExiste) {
            this.active = false;
        }
    } 

}