
class Background {
    constructor(context, startime) {
        this.context = context;
        this.startime = startime;        
        this.lasttime = new Date().getTime() / 1000;
        this.lasttime2 = new Date().getTime() / 1000;
        this.lasttime3 = new Date().getTime() / 1000;
        this.lasttime4 = getSecondsNow();
        this.lasttime5 = getSecondsNow();
        this.meteor = ['meteor1','meteor2','meteor3','meteor4','meteor5'];
        this.group = [];
        this.groupMeteor = [];
        this.stopMeteor = false;
        this.groupEnemy = [];
        this.img = resources.get(srcPath['sp2']); //1280 x 2048
        this.bgImage = {
            'img' : this.img,
            'sx'  : 0,
            'sy'  : 0,
            'swidth' : 400,
            'sheight' : 1800,
            'x' : 0,
            'y' : -1200,
            'width' : 400,
            'height' : 2048
        };
        this.i = 0;
        this.j = 0;
        this.debugMode = true;
    }

     init() {
         this.createStarBackGround(getRandomInt(0,200));
         this.createStarBackGround(0);
         this.createStarBackGround(2*WIDTH/3);
    }

    update() {
        var seconds = new Date().getTime() / 1000;
       
        // this.update2();
        if (seconds - this.lasttime > this.startime) {
            
            this.createStarBackGround(getRandomInt(0,200));
            this.createStarBackGround(0);
            this.createStarBackGround(2*WIDTH/3);
                       
            this.lasttime = seconds;
        }

        if (!this.stopMeteor && seconds - this.lasttime2 > 5.00001) {
            this.createMeteor();

            this.lasttime2 = seconds;
        }

        /*if (seconds - this.lasttime3 > 4.00001) {
            this.createEnemy();

            this.lasttime3 = seconds;
        }*/
       
        this.groupsUpdate(); 
        
    }

    createEnemy() {
        var ty = getRandomInt(50, WIDTH-50);
        var e = new Enemy(this.context, 0, ty, 100, ty, 'enemy6b', 44, 36, 10, -7, 1.501);

        this.groupEnemy.push(e);
    }

    getLevel(n) {
        switch(n) {
            case 1 : {
                this.initLevel_1();
                break;
            }
            case 2 : {
                this.initLevel_2();
                break;
            }
            case 3 : {
                this.initLevel_3();
                break;
            }
            default : {
                this.initLevel_3();
            }
        }
    }

    initLevel_1() {
        var e;
        var timeShoot = 1.5;

        for (var i = 50; i < WIDTH - 50; i += 50) {
            e = new Enemy(this.context, 0, i, 100, i, 'enemy6b', 44, 36, 10, -7, timeShoot);
            timeShoot += 0.2;
            this.groupEnemy.push(e);
        }
    }

    initLevel_2() {
        var e;
        var timeShoot = 1.5;
        var px = 20;

        for (var i = 50; i < WIDTH - 50; i += 50) {
            e = new Enemy(this.context, 0, i, px, i, 'enemy6b', 44, 36, 10, -7, timeShoot);
            timeShoot += 0.2;
            px += 20;
            this.groupEnemy.push(e);
        }
    }

    initLevel_3() {
        var e;
        var timeShoot = 1.5;
        var px = 20;

        for (var i = 50; i < WIDTH - 50; i += 50) {
            e = new Enemy(this.context, 0, i, px, i, 'enemy6b', 44, 36, 10, -7, timeShoot);
            timeShoot += 0.2;
            px += 20;
            this.groupEnemy.push(e);
        }
        px += 80;
        for (var i = 50; i < WIDTH - 50; i += 50) {
            e = new Enemy(this.context, 0, i, px, i, 'enemy6b', 44, 36, 10, -7, timeShoot);
            timeShoot += 0.2;
            px -= 20;
            this.groupEnemy.push(e);
        }
    }


    createStarBackGround(y) {
        var h = getRandomInt(WIDTH-300, WIDTH-150);
        var w = h/2; /*getRandomInt(HEIGHT-250, HEIGHT-100);*/
        var star2 = new Star(this.context, -h, y, w, h, 'stars', this.startime, 2);
        this.group.push(star2);
    }

    createMeteor() {
        var h = getRandomInt(30, 70);
        var w = h; /*getRandomInt(HEIGHT-250, HEIGHT-100);*/
        var targetY = getRandomInt(w, WIDTH-w);
        var index = getRandomInt(0, 4);
        var star2 = new Star(this.context, -h , targetY, w, h, this.meteor[index], this.startime, 4);
        this.groupMeteor.push(star2);
    }

    groupsUpdate() {
        this.groupUpdate(this.group);
        this.groupUpdate(this.groupMeteor);
        this.groupUpdate(this.groupEnemy);
    }

    groupUpdate(group) {
        for(var i = 0; i < group.length; i++) {
            if (group[i].active)
                group[i].update();
            else {
                removeFromList(group, group[i].id);
            }           
        }
    }

    gameOver(mship) {
        var seconds = getSecondsNow();

        if (seconds - this.lasttime4 > 0.1) {
            mship.explosion(this.i * 100, this.j * 100);
            this.j++;
            if (this.j == 5) {
                this.i++;
                this.j = 0;
            }
            this.lasttime4 = seconds;
        }
        if (seconds - this.lasttime5 > 0.7) {
            mship.explosion(mship.x + mship.height/2, mship.y + mship.width/2);

            this.lasttime5  = seconds;
        }
    }

    init2() {
        this.img = resources.get(srcPath['sp2']);
    }

    update2() {
        var b = this.bgImage;
        // this.context.drawImage(b['img'],b['sx'],b['sy'],b['swidth'],b['sheight'],b['x'],b['y'],b['width'],b['height']);
        this.context.drawImage(this.img, b['x'], b['y'], b['width'], b['height']);
        
        /*var seconds = new Date().getTime() / 1000;
       
        if (seconds - this.lasttime2 > 5.00001) {
            this.createMeteor();

            this.lasttime2 = seconds;
        }
       
        this.groupUpdate(); */
        
        
        
        b['y'] += 2;
        if (b['y'] > -2) {
            b['y'] = -1200;
        }
    }
}