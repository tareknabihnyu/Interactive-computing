
let paddle;
let ball;
let treasures = [];
let score = 0;

let bounceSound;
let treasureSound;
let failSound;

let bg;
let fg;
let bgY = 0;
let fgY = 0;
let fgy2 = -1000;
let border = 12;


let width = 500;
let height = 500;

function preload() {
  bounceSound = loadSound('sounds/boing.mp3');
  treasureSound = loadSound('sounds/collect.mp3');
  failSound = loadSound('sounds/loss.mp3');
  bg = loadImage('images/background.png');
  fg = loadImage('images/foreground.png');
  tr = loadImage('images/treasure.png')
}

function setup() {
  createCanvas(width, height);
  updateCanvasStyle();
  
  paddle = new Paddle();
  ball = new Ball();

  for (let i = 0; i < 2; i++) {
    treasures.push(new Treasure(i % 2 === 0 ? "left" : "right"));
  }
  
  // not working:::::::::::::::;
  
  stroke(0);          // Set the color of the border to black
  strokeWeight(4);    // Set the thickness of the border
  
  // Top border
  line(0, 0, width, 0);
  // Left border
  line(0, 0, 0, height);
  // Right border
  line(width, 0, width, height);

}

function draw() {
  background(220);

  image(bg, 0, bgY);
  image(bg, 0, bgY - height);
  image(fg, 0, fgY);
  image(fg, 0, fgy2);
  
  bgY += 1;
  fgY += 2;
  fgy2 += 2;

  if (bgY > height) {
    bgY = 0 - height;
  }
  if (fgY > height) {
    fgY = -1000;
  }
  if (fgy2 > height) {
    fgy2 = -1000;
  }
  
  fill(0);
  line(2, height-1, width, height-1); // Bottom border


  for (let t of treasures) {
    t.show();
    t.move();

    if (ball.intersects(t)) {
      score++;
      treasureSound.play();
      t.reset();
    }
  }

  paddle.show();
  paddle.move();
  
  ball.show();
  ball.move();
  
  if (ball.intersects(paddle)) {
    ball.yspeed = -abs(ball.yspeed);
  }

  stroke(120);
  strokeWeight(17);
  line(0, 0, width, 0); // Top border
  line(0, 0, 0, height); // Left border
  line(width-1, 0, width-1, height); // Right border
  
  strokeWeight(0);
  stroke(0);
  
  
  fill(255);
  textSize(24);
  
  text(`Points: ${score}`, 30, 50);
}

function mousePressed() {
  if (ball && ball.yspeed === 0 && ball.xspeed === 0) {
    ball.xspeed = random(-3, 3);
    if(random(0,1) >= 0.5 ){
      ball.xspeed = random(1, 3);
    }else{
      ball.xspeed = random(-3, -1);
    }
    let yspeed = random(3, 6);
    if (random() > 0.5) {
      yspeed = -yspeed;
    }
    ball.yspeed = yspeed;
    score = 0;
  }
}

class Paddle {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.x = (width / 2) - (this.width / 2);
    this.y = height - this.height - 10;
    this.xspeed = 5;
  }

  show() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(65) && this.x > 0) {
      this.x -= this.xspeed;
    }
    if (keyIsDown(68) && this.x < width - this.width) {
      this.x += this.xspeed;
    }
  }
}

class Ball {
  constructor() {
    this.radius = 20;
    this.x = width / 2;
    this.y = this.radius + border;
    this.xspeed = 0;
    this.yspeed = 0;
    this.color = { r: 255, g: 0, b: 0, offset: random(0, TWO_PI) };
  }

  show() {
    this.color.r = map(sin(frameCount * 0.02 + this.color.offset), -1, 1, 100, 255);
    this.color.g = map(sin(frameCount * 0.03 + this.color.offset), -1, 1, 100, 255);
    this.color.b = map(sin(frameCount * 0.04 + this.color.offset), -1, 1, 100, 255);
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x >= width - (this.radius + border) || this.x <= (this.radius + border)) {
      bounceSound.play();
      this.xspeed = -1 * this.xspeed * 1.05;
    }
    if (this.y < (this.radius + border)) {
      bounceSound.play();
      this.yspeed = -1 * this.yspeed * 1.05;
    }

    if (this.y >= height + (this.radius)) {
      this.reset();
    }
  }

  reset() {
    failSound.play();
    this.x = width / 2;
    this.y = this.radius + border;
    this.xspeed = 0;
    this.yspeed = 0;
  }

  intersects(obj) {
    if (obj instanceof Paddle) {
      if((this.y + this.radius > obj.y)  && (this.x > obj.x) && (this.x < obj.x + obj.width)){
        let diff = this.x - (obj.x + obj.width/2);
        diff = map(diff, -obj.width/2, obj.width/2, -5, 5);
        this.xspeed = diff;
      }
      

      return (this.y + this.radius > obj.y)  && (this.x > obj.x) && (this.x < obj.x + obj.width);
    }
    if (obj instanceof Treasure) {
      return (this.x - this.radius < obj.x + obj.width) &&
             (this.x + this.radius > obj.x) &&
             (this.y - this.radius < obj.y + obj.height) &&
             (this.y + this.radius > obj.y);
    }
  }
}

class Treasure {
  constructor(direction) {
    this.width = 40;
    this.height = 40;
    this.y = random(100, height - 100);
    this.yspeed = random(-1, 1);
    this.xspeed = random(3,5);
    // if(random(0,1) >= 0.5){
    //   this.xspeed = random(3,5);
    // }
    this.rotation = 0; // Initial rotation
    this.rotatespeed = random(0.01, 0.1); // Changed to a smaller range for smoother rotation
    this.direction = direction;
    if (this.direction === "left") {
      this.x = -this.width;
    } else {
      this.x = width;
      this.xspeed = -this.xspeed;
    }
  }

  show() {
    push();
    translate(this.x + this.width / 2, this.y + this.height / 2); // Move to the center of the treasure
    rotate(this.rotation);
    fill(0, 255, 0);
    image(tr, -this.width / 2, -this.height / 2); // Draw the image with respect to its center
    pop();
    // Uncomment below if you want to see the bounding box
    // rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.rotation += this.rotatespeed; // Increment rotation

    // Reverse yspeed if treasure reaches upper or lower bounds
    if (this.y < 100 || this.y > height - 200) {
      this.yspeed = -this.yspeed;
    }

    if (this.direction === "left" && this.x > width) {
      this.reset();
    } else if (this.direction === "right" && this.x + this.width < 0) {
      this.reset();
    }
  }

  reset() {
    this.y = random(100, height - 200);
    this.xspeed = random(3,5);
    this.rotatespeed = random(0.01, 0.1);
    this.yspeed = random(-1, 1);
    if (this.direction === "left") {
      this.x = -this.width;
    } else {
      this.x = width;
      this.xspeed = -this.xspeed;
    }
  }
}

function updateCanvasStyle() {
  let canvasElement = document.querySelector('canvas');
  if (canvasElement) {
    canvasElement.style.display = 'block';
  }
}
