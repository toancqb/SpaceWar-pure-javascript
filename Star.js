
class Star extends Ship {

    constructor(context, x, y, h, w, key, time, speed) {
        super(context, x, y, key, h, w);
        this.time = time;
        this.speed = speed;
        this.active = true;
    }

    update() {
        this.x += this.speed;
        if (this.x > HEIGHT) {
            this.active = false;
        }
        this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
    }
}

// class Star2 extends Ship {

// }