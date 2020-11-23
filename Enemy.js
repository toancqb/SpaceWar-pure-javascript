
class Enemy extends Ship {
    constructor(context, x, y, px, py, key, h, w, speed, bspeed, time) {
        super(context, x, y, key, h, w);
        this.px = px;
        this.py = py;
        this.speed = speed;
        this.bspeed = bspeed;
        this.lasttime = new Date().getTime() / 1000;
        this.time = time;
        this.groupBullet = [];
        this.active = true;
    }

    update() {
        var seconds = new Date().getTime() / 1000;

        if (seconds - this.lasttime  > this.time) {
            this.shoot();

            this.lasttime = seconds;
        }

        for (var i = 0; i < this.groupBullet.length; i++) {
            if (this.groupBullet[i].active)
                this.groupBullet[i].update();
            else
                removeFromList(this.groupBullet, this.groupBullet[i].id);
        }
        this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
        if (this.x < this.px)
            this.x += this.speed; 

    }

    shoot() {
        var bullet = new Bullet(this.context, this.x+BULLET_H, this.y+this.width/2 - BULLET_W/2, 'shoot1', BULLET_H, BULLET_W, this.bspeed);

        this.groupBullet.push(bullet);
    }
}