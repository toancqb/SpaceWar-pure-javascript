
class MainShip extends Ship {

    constructor(context, x, y, h, w) {
       super(context, x, y, 'mainship', h, w);
       this.lastShoot = getSecondsNow();
       this.active = true;
       this.groupExplosion = [];
       this.groupBullet = [];
    }

    moveUp() {
        this.x -= MSHIP_SPEED;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveDown() {
        this.x += MSHIP_SPEED;
        if (this.x > HEIGHT-this.height) {
            this.x = HEIGHT-this.height;
        }
    }

    moveRight() {
        this.y += MSHIP_SPEED;
        if (this.y > WIDTH - this.width) {
            this.y = WIDTH - this.width;
        }
    }

    moveLeft() {
        this.y -= MSHIP_SPEED;
        if (this.y < 0) {
            this.y = 0;
        }
    }

    shoot() {
        var seconds = getSecondsNow();

        if (seconds - this.lastShoot > 0.3001) {
            var bulletType = 'shoot2';
            var bulletH = 25;
            var bulletW = 16;
            var bullet = new Bullet(this.context, this.x-bulletH, this.y+this.width/2 - bulletW/2, bulletType, bulletH, bulletW, BULLET_SPEED);

            this.groupBullet.push(bullet);
            this.lastShoot = seconds;
        }
    }

    update() {
        this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
        for (var i = 0; i < this.groupBullet.length; i++) {
            if (this.groupBullet[i].active)
                this.groupBullet[i].update();
            else
                removeFromList(this.groupBullet, this.groupBullet[i].id);
        }
        this.explosion_update();
    }

    explosion_update() {
        if (this.groupExplosion.length == 0)
            return false;

        this.groupExplosion = removeExplAll(this.groupExplosion);
        for (var i = 0; i < this.groupExplosion.length; i++) {
            if (this.groupExplosion[i][3] > 0) {
                this.drawCircle(this.groupExplosion[i][0], this.groupExplosion[i][1], this.groupExplosion[i][2], this.groupExplosion[i][3]);
                this.groupExplosion[i][2] += 4*1.5;
                this.groupExplosion[i][3] -= 2;     
            }       
        }
        return true;        
    }   

    explosion(x, y) {
        var expl = [x, y, 10, 30];
        this.groupExplosion.push(expl);
    }

    drawCircle(x, y, r, b) {
        var k = getRandomInt(0, 5);

        this.context.beginPath();
        this.context.arc(y, x, r, 0, 2*Math.PI);
        this.context.lineWidth = b;
        this.context.strokeStyle = (k == 2) ? "yellow" : "red";
        this.context.strokeStyle = (k == 3) ? "orange" : "red";
        this.context.stroke();
    }
}