
class Ship {

    constructor(context, x, y, key, h, w) {
        this.id = generateId();
        this.context = context;
        this.x = x;
        this.y = y;
        this.key = key;
        this.img = resources.get(srcPath[this.key]);
        this.height = h;
        this.width = w;
    }

    update() {
        this.context.drawImage(this.img, this.y, this.x, this.width, this.height);
    }
}