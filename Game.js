
class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.groupAll = new Array();
        this.pressedKeys = {};
        this.currentLevel = 1;
        this.nextLevel = true;
        this.gameover = false;
        this.debugMode = true;
    }

    init() {
        this.handlerKeyboard();
        this.handlerMouse();
        this.bg = new Background(this.context, STARTIME);
        this.bg.init();
        this.mship = new MainShip(this.context, HEIGHT - MSHIP_H, WIDTH/2 - MSHIP_W/2, MSHIP_H, MSHIP_W);
        this.groupAll.push(this.mship);
    }

    update() {
        this.context.clearRect(0,0,WIDTH,HEIGHT);

        if (!this.gameover && (this.nextLevel || this.isClearedLevel())) {
            this.initNextLevel();
            this.nextLevel = false;
        }
        if (this.gameover) {
            this.bg.gameOver(this.mship);
        }
        this.groupAll_update();
        this.collide_update(this.mship.groupBullet, this.bg.groupMeteor, this.bg.groupEnemy);

    }

    isClearedLevel() {
        var result = (this.bg.groupEnemy.length == 0);
        if (result)
            this.currentLevel++; 
        return result;
    }

    initNextLevel() {
        this.bg.getLevel(this.currentLevel);
    }

    groupAll_update() {
        this.bg.update();

        for(var i = 0; i < this.groupAll.length; i++) {
            if (this.groupAll[i].active)
                this.groupAll[i].update();
            else
                removeFromList(this.groupAll, this.groupAll[i].id);
        }
    }

    handlerMouse() {
        var that = this;

        document.addEventListener("mousemove", (e) => {
            var elemLeft = that.canvas.offsetLeft + that.canvas.clientLeft;
            var elemTop = that.canvas.offsetTop + that.canvas.clientTop;

            that.mship.x = e.pageY - elemTop - that.mship.height/2;
            that.mship.y = e.pageX - elemLeft - that.mship.width/2;

        });
    }

    handlerKeyboard() {
        var that = this;

        document.addEventListener('keydown', (e) => {            
            var key = that.pressedKeys[e.code];
            if (!key) {
                that.pressedKeys[e.code] = true;
            }          

            for (var key in that.pressedKeys) {
                if (that.pressedKeys[key]) {
                    if (key == "ArrowUp") that.mship.moveUp();
                    if (key == "ArrowDown") that.mship.moveDown();
                    if (key == "ArrowLeft") that.mship.moveLeft();
                    if (key == "ArrowRight") that.mship.moveRight();
                    if (key == "Space") that.mship.shoot();
                }
            }
        });

        document.addEventListener('keyup', (e) => {            
            var key = that.pressedKeys[e.code];
            if (key) {
                that.pressedKeys[e.code] = false;
            }  
        });
    }

    collide_update(gbullet, gmeteor, genemy) {
        var rm = [];
        
        this.processColideExpl(gbullet, gmeteor);
        this.processColideExpl(gbullet, genemy);

        rm = this.isSpriteCollideSprites(this.mship, 0, gmeteor);
        if (rm.length > 0) {
            this.mship.explosion(this.mship.x, this.mship.y);
            this.mship.active = false;
            removeFromList(gmeteor, gmeteor[rm[1]].id);
            this.gameOver();
            return true;
        }

        for (var i = 0; i < this.bg.groupEnemy.length; i++) {
            rm = this.isSpriteCollideSprites(this.mship, 0, this.bg.groupEnemy[i].groupBullet);
            if (rm.length > 0) {
                this.mship.explosion(this.mship.x, this.mship.y);
                this.mship.active = false;
                removeFromList(this.bg.groupEnemy[i].groupBullet, this.bg.groupEnemy[i].groupBullet[rm[1]].id);
                this.gameOver();
                return true;
            }
        }

        return false;
    }

    processColideExpl(gr1, gr2) {
        var rm = [];
        for (var i = 0; i < gr1.length; i++) {
            rm = this.isSpriteCollideSprites(gr1[i], i, gr2);
            if (rm.length > 0)
                break;            
        }
        if (rm.length > 0) {
            // this.explosion(gbullet[rm[0]].x, gbullet[rm[0]].y);
            this.mship.explosion(gr1[rm[0]].x, gr1[rm[0]].y);
            removeFromList(gr1, gr1[rm[0]].id);
            removeFromList(gr2, gr2[rm[1]].id);
            return true;
        }
        return false;
    }

    isSpriteCollideSprites(sprite, i, grSprite) {
        var rm = [];
        for (var j = 0; j < grSprite.length; j++) {
            if (this.isCollide(sprite, grSprite[j])) {
                rm.push(i,j);
                return rm;
            }                
        }
        return rm;
    }

    isCollide(sprite1, sprite2) {
        var xmin1 = sprite1.x, ymin1 = sprite1.y,
            xmax1 = sprite1.x + sprite1.height, ymax1 = sprite1.y + sprite1.width;
        var xmin2 = sprite2.x, ymin2 = sprite2.y,
            xmax2 = sprite2.x + sprite2.height, ymax2 = sprite2.y + sprite2.width;
      
        if ((check(xmin1,xmax1,ymin1,ymax1, xmin2, ymin2) || check(xmin1,xmax1,ymin1,ymax1, xmin2, ymax2)
        || check(xmin1,xmax1,ymin1,ymax1, xmax2, ymin2) || check(xmin1,xmax1,ymin1,ymax1, xmax2, ymax2))
        || (check(xmin2,xmax2,ymin2,ymax2, xmin1, ymin1) || check(xmin2,xmax2,ymin2,ymax2, xmin1, ymax1)
        || check(xmin2,xmax2,ymin2,ymax2, xmax1, ymin1) || check(xmin2,xmax2,ymin2,ymax2, xmax1, ymax1)))
            return true;
        return false;
    }  

    gameOver() {
        this.currentLevel = 1;
        this.bg.groupEnemy = [];
        this.bg.groupMeteor = [];
        this.bg.stopMeteor = true;
        this.nextLevel = false;
        this.gameover = true;   
        this.mship.active = true;     
    }
}