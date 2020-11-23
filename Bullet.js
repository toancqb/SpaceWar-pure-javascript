
 

class Bullet extends Ship {
    constructor(context, x, y, key, h, w, speed) {
        super(context, x, y, key, h, w);
        this.timeExiste = 0.5;
        this.speed = speed;
        this.groupExplosion = [];
        this.active = true;
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0)
            this.active = false;
        this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
        // this.explosion_update();
    }

    
}