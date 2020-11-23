

WIDTH = 400;
HEIGHT = 600;

MSHIP_W = 50;
MSHIP_H = 50;
MSHIP_SPEED = 10;

STARTIME = 1.0000001;
STAR_SPEED = 10;

BULLET_W = 10;
BULLET_H = 20;
BULLET_SPEED = 10;

var global_id = 0;

function generateId() {
    global_id += 1;
    return global_id;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeFromList(lst, id) {
    for (var i = 0; i < lst.length; i++) {
        if (lst[i].id == id) {
            lst.splice(i, 1);
            break;
        }
    }
}

function check(minX, maxX, minY, maxY, x, y) {
    if ((minX <= x && x <= maxX) && (minY <= y && y <= maxY))
        return true;
    return false;
}

//function checkCollide(xmin1,xmax1,ymin1,)

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

function removeExplAll(arr) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i][3] <= 0) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

function getSecondsNow() {
  return (new Date().getTime() / 1000);
}