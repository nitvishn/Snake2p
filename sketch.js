var updateVar = 0
var gameOver = false
var s1;
var s2;
var scl = 20
var foods = [];
var numFoods = 2
enabled1 = true
enabled2 = true

var invincible1 = false
var invincible2 = false

var frameCount = 0

var timeLeft = 160

function setup() {
  createCanvas(600, 600)
  s1 = new Snake(600, 0);
  s2 = new Snake(0, 0);
  frameRate(20)
  for (var i = 0; i < numFoods; i++) {
    pickLocation()
  }
}

function pickLocation() {
  var cols = floor(height / scl)
  var rows = floor(width / scl)
  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)
  foods.push(food)
}

function foodAtLocation(x, y) {
  food = createVector(x, y)
  foods.push(food)
}

function keyPressed() {
  if (enabled1) {
    if (keyCode === UP_ARROW && s1.yspeed == 0) {
      s1.dir(0, -1)
      enabled1 = false
    } else if (keyCode === DOWN_ARROW && s1.yspeed == 0) {
      s1.dir(0, 1)
      enabled1 = false
    } else if (keyCode === RIGHT_ARROW && s1.xspeed == 0) {
      s1.dir(1, 0)
      enabled1 = false
    } else if (keyCode === LEFT_ARROW && s1.xspeed == 0) {
      s1.dir(-1, 0)
      enabled1 = false
    }
  }

  if (enabled2) {
    if (keyCode === 87 && s2.yspeed == 0) {
      s2.dir(0, -1)
      enabled2 = false
    } else if (keyCode === 83 && s2.yspeed == 0) {
      s2.dir(0, 1)
      enabled2 = false
    } else if (keyCode === 68 && s2.xspeed == 0) {
      s2.dir(1, 0)
      enabled2 = false
    } else if (keyCode === 65 && s2.xspeed == 0) {
      s2.dir(-1, 0)
      enabled2 = false
    }
  }
}

function draw() {
  if (!gameOver) {
    enabled1 = true
    enabled2 = true

    print(timeLeft)

    if (s1.death(s2) && !invincible1) {
      invincible1 = true
    }
    if (s2.death(s1) && !invincible2) {
      invincible2 = true
    }

    s1.update()
    s2.update()
    background(51)

    fill(255, 0, 100)
    if (s1.eat(foods) || s2.eat(foods)) {
      print("eaten");
    }
    while (foods.length < numFoods) {
      pickLocation()
    }

    for (var i = 0; i < foods.length; i++) {
      food = foods[i]
      rect(food.x, food.y, scl, scl)
    }

    print(s1.tail.length, s1.tail)
    s1.show()
    print(s2.tail.length, s2.tail)
    s2.show()
  } else {
    console.log("GAME OVER BITCH");
  }
}
