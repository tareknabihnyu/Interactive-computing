var t;
var gun;
var bullet = [];
var gunIMG;
var p;
var pAnim;
var pIMG = [];
var vel = 0;
var h = [];
var himg = [];
var bo;
var bAnim;
var bIMG = [];
var obj = [];
var Timg = [];
var objj = [];
let nivelBar = 50;
let coll = 100;
var BG;
var bgIMG = [];
var wave = 0;
var npc = [];
var npcIMG = [];
var aNPC;
var bimg = [];
let wb = 150;
let hb = 50;
let modew = 1;
let modeh = 1;
var w = [];
var wimg = [];

function player() {
  //Variables
  this.pos = createVector(width / 2, height / 2);
  this.dir = 1;
  this.size = createVector(t.x * 3, t.y * 5);
  this.sprite = 1;
  this.time = 0;
  this.life = 100;

  //Render, the figure
  this.render = function() {
    //render Player
      pAnim.armR();
      pAnim.legR();
      pAnim.body();
      pAnim.head();
      pAnim.legL();
      pAnim.armL();
      gun.render();
  }
  
  this.bar = function() {
    //render health bar
      push();
        fill(50);
        strokeWeight(t.x * 0.2);
        rect(width / 2 - t.x * 3, height / 2 - t.y * 1 - this.size.y, t.y * 6, t.y);
        //Render life line
        fill(map(this.life, 0, 100, 255, 0), map(this.life, 0, 100, 0, 255), 0)
        rect(width / 2 - t.x * 3, height / 2 - t.y * 1 - this.size.y, map(this.life, 0, 100, 0, t.x * 6), t.y);
      pop();
  }
  
  //Update, repeat forever
  this.update = function() {
    
  }
  
  this.hurt = function(x, y) {
    let d = dist(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 2, x, y);
    if (d < t.x * 3) {
      this.life -= 0.5;
    }
  }
  
  //Detection colision
  this.hit = function(object) {
    if (
      //Y+
      this.pos.y - this.size.y / 2 < object.pos.y + BG.pos.y + object.size.y / 2 &&
      //Y-
      this.pos.y + this.size.y / 2 > object.pos.y + BG.pos.y - object.size.y / 2 &&
      //X-
      this.pos.x - this.size.x / 2 < object.pos.x + BG.pos.x + object.size.x / 2 &&
      //X+
      this.pos.x + this.size.x / 2 > object.pos.x + BG.pos.x - object.size.x / 2) {
      
      //Y+
      if (this.pos.y - this.size.y / 2 + 10 > object.pos.y + BG.pos.y + object.size.y / 2) {
      BG.pos.y -= vel;
      }
      //Y-
      if (this.pos.y + this.size.y  / 2 - 10 < object.pos.y + BG.pos.y - object.size.y / 2) {
      BG.pos.y += vel;
      }
      //X-
      if (this.pos.x - this.size.x / 2 + 10 < object.pos.x + BG.pos.x + object.size.x / 2) {
      BG.pos.x += vel;
      }
      //X+
      if (this.pos.x + this.size.x / 2 - 10 > object.pos.x + BG.pos.x - object.size.x / 2) {
      BG.pos.x -= vel;
      }
    }
  }
  
  //Render Buttons
  this.RenderB = function(object) {
    if (
      //Y
      object.pos.y + BG.pos.y + object.imgSize.y / 2 > this.pos.y - this.size.y / 2 &&
      object.pos.y + BG.pos.y + object.imgSize.y < this.size.y + object.size.y + this.pos.y &&
      //X
      object.pos.x + BG.pos.x + object.size.x / 2 > this.pos.x  - this.size.y / 2 &&
      object.pos.x + BG.pos.x - object.size.x / 2 < this.pos.x + this.size.y / 2
    ) {
      //b.render(0);
    }
  }
  
  //Render up floor
  this.upFloor = function(object) {
    if (
      //Y
      object.pos.y + BG.pos.y + object.imgSize.y > this.pos.y - this.size.y &&
      object.pos.y + BG.pos.y + object.imgSize.y / 2 < this.size.y + object.size.y + this.pos.y &&
      //X
      object.pos.x + BG.pos.x + object.imgSize.x > this.pos.x  - this.size.x / 2 &&
      object.pos.x + BG.pos.x - object.imgSize.x < this.pos.x + this.size.x / 2
    ) {
      this.render();
    }
  }
}

//Render functions
function renderPlayer() {
  pAnim.update();
  p.update();
  p.render();
  gun.update();
}

//Render images
function renderPlayerIMG() {
  pIMG[0] = loadImage('Images/Arm.png');
  pIMG[1] = loadImage('Images/Leg.png');
  pIMG[2] = loadImage('Images/Torso.png');
  pIMG[3] = loadImage('Images/Head.png');
}

//Player animation
function playerAnimation() {
  push();
  this.pos = createVector(width / 2, height / 2);
  this.size = createVector(t.x * 1.5, t.y * 1.5);
  this.vel = 10;
  this.dir = 0;
  this.mode = -1;
  this.modeY = -1;
  this.sizeA = createVector(t.x * 0.9, t.y * 1.5);
  this.sizeL = createVector(t.x * 0.9, t.y * 1.5);
  this.sizeH = createVector(t.x * 1.8, t.y * 1.8);
  pop();
  
  //Body
  this.body = function() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(p.dir, 1);
    image(pIMG[2], -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    pop();
  }
  
  //Head
  this.head = function() {
    push();
    translate(this.pos.x, this.pos.y - this.size.y / 2 - this.sizeH.y / 2 + 1);
    strokeWeight(5);
    scale(p.dir, 1);
    image(pIMG[3], -this.sizeH.x / 2, -this.sizeH.y / 2, this.sizeH.x, this.sizeH.y);
    pop();
  }
  
  //Left Arm
  this.armL = function() {
    push();
      this.posAL = createVector(this.pos.x - this.size.x * p.dir / 2, this.pos.y - this.size.y / 2 + 1);
      translate(this.posAL.x, this.posAL.y);
      rotate(radians(this.dir));
      strokeWeight(5);
      scale(p.dir, 1);
      image(pIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Right Arm
  this.armR = function() {
    push();
      this.posAR = createVector(this.pos.x + this.size.x * p.dir / 2, this.pos.y - this.size.y / 2 + 1);
      translate(this.posAR.x, this.posAR.y);
      rotate(radians(-this.dir));
      strokeWeight(5);
      scale(p.dir, 1);
      image(pIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Left Leg
  this.legL = function() {
    push();
      this.posLL = createVector(this.pos.x - this.size.x * p.dir / 2, this.pos.y + this.size.y / 2 - 2);
      if(p.dir == 1) {
        translate(this.posLL.x + this.sizeL.x / 2, this.posLL.y);
      } else {
        translate(this.posLL.x - this.sizeL.x / 2, this.posLL.y);
      }
      rotate(radians(-this.dir));
      strokeWeight(5);
      scale(-p.dir, 1);
      image(pIMG[1], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Right Leg
  this.legR = function() {
    push();
      this.posLR = createVector(this.pos.x + this.size.x * p.dir / 2, this.pos.y + this.size.y / 2 - 2);
      if(p.dir == 1) {
        translate(this.posLR.x - this.sizeL.x / 2, this.posLR.y);
      } else {
        translate(this.posLR.x + this.sizeL.x / 2, this.posLR.y);
      }
      rotate(radians(this.dir));
      strokeWeight(5);
      scale(-p.dir, 1);
      image(pIMG[1], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Update
  this.update = function() {
    if (p.sprite == 1) {
      if (this.dir < -90) {
        this.mode = 1;
      }
      if (this.dir > 45) {
        this.mode = -1;
      }
      this.dir += this.mode * 10;
    } else {
      this.dir = 0;
    }
    if (this.size.y > t.y * 1.6) {
      this.modeY = -1;
    }
    if (this.size.y < t.y * 1.4) {
      this.modeY = 1;
    }
    this.size.y += (this.modeY * vel) / 20;
  }
}

function Gun() {
  //Size
  this.r = createVector(t.x * 2, t.y);
  //Direction
  this.dir = 1;
  //Angle
  this.a = 0;
  //Bullet position
  this.bpos = createVector(p.pos.x - cos(this.a) * this.x, p.pos.y - sin(this.a) * this.x);
  
  this.render = function() {
    push();
      let x;
      translate(p.pos.x, p.pos.y)
      if (dist(p.pos.x, p.pos.y, mouseX, mouseY) < this.r.x * 2) {
        translate(mouseX - p.pos.x, mouseY - p.pos.y);
        x = -this.r.x / 2.3;
        this.bpos = createVector(mouseX+ cos(this.a) * this.r.x, mouseY+ sin(this.a) * this.r.y);
      } else {
        x = this.r.x * 2;
        this.bpos = createVector(p.pos.x + cos(this.a) * x + cos(this.a) * this.r.x, p.pos.y + sin(this.a) * x + sin(this.a) * this.r.y);
      }
      rotate(this.a);
      scale(1, this.dir);
      image(gunIMG, x, -this.r.y / 2, this.r.x, this.r.y);
    pop();
  }
  
  this.shot = function(tx, ty) {
    push();
      strokeWeight(5);
      stroke(255, 255, 0);
      point(tx, ty);
    pop();
  }
  
  this.update = function() {
    //Change angle
    this.a = atan2(mouseY - p.pos.y, mouseX -p.pos.x);
    //Set Direction
    if (this.a < -PI / 2 || this.a > PI / 2) {
      this.dir = -1;
    } else {
      this.dir = 1;
    }
  }
}

function Bullet(x, y, a) {
  //Set position
  this.pos = createVector(x + BG.pos.x, y + BG.pos.y);
  
  this.render = function() {
    push();
      strokeWeight(t.x / 2);
      stroke(255, 255, 0);
      point(this.pos.x, this.pos.y);
    pop();
  }
  
  this.update = function() {
    //Move bullets
    this.pos.x += t.x / 1.1 * cos(a);
    this.pos.y += t.x / 1.1 * sin(a);
    //If touch the edge
    if(
      //X+
      this.pos.x> width||
      //X-
      this.pos.x < 0||
      //Y+
      this.pos.y > height ||
      //Y-
      this.pos.y < 0
    ) {
      bullet.splice(this, 1);
    }
  }
}

function gunFunctions() {
  for (let i = 0; i < bullet.length; i++) {
    bullet[i].render();
    bullet[i].update();
  }
}
function gunRender() {
  gunIMG = loadImage('Images/Gun.png');
}

function house() {
  //Variables
  this.pos = createVector(0, 0);
  this.size = createVector(t.x * 15, t.y * 2);
  this.imgSize = createVector(t.x * 14, t.y * 11);  
  
  //Render figure
  this.render = function() {
    push();
    if (this.scream) {
    translate(this.pos.x + BG.pos.x, this.pos.y + BG.pos.y);
    rect(-this.size.x / 2, -this.size.y/ 2, this.size.x, this.size.y)
    image(himg[this.sprite], -this.imgSize.x / 2, -this.imgSize.y / 1.25, this.imgSize.x, this.imgSize.y * 1.25);
    }
    pop();
  }
  
  //Detect offscream
  this.edges = function() {
    if(
      //X+
      this.pos.x + BG.pos.x > width + this.imgSize.x ||
      //X-
      this.pos.x + BG.pos.x < -this.imgSize.x ||
      //Y+
      this.pos.y + BG.pos.y > height + this.imgSize.y ||
      //Y-
      this.pos.y + BG.pos.y < -this.imgSize.y
    ) {
      this.scream = false;
    } else {
      this.scream = true;
    }
  }
}

//Render functions
function loadHouses(object) {
  for (var i = 0; i < h.length; i++) {
    h[i].render();
    p.hit(h[i])
    h[i].edges();
    p.upFloor(h[i]);
    if (wave == 5) {
      bo.upFloor(h[i]);
    }
    p.RenderB(h[i]);
    for (var j = 0; j < npc.length; j++) {
      npc[j].upFloor(h[i]);
    }
    
    //Change position houses
    if (i == 0) {
      h[i].pos = createVector(0, -t.y * 7);
      h[i].sprite = 0;
      h[i].size = createVector(t.x * 7, t.y * 4);
      h[i].imgSize = createVector(t.x * 14, t.y * 11);  
    }
    if (i == 1) {
      h[i].pos = createVector(110, -110);
      h[i].sprite = 1;
      h[i].size = createVector(175, 70);
      h[i].imgSize = createVector(180, 150); 
    }
    if (i == 2) {
      h[i].pos = createVector(-100, 100);
    }
    if (i == 3) {
      h[i].pos = createVector(100, 100);
    }
  }
}

function loadHousesIMG() {
  himg[0] = loadImage('Images/House.png');
  himg[1] = loadImage('Images/Celeiro.png');
}

function boss() {
  
  //Set position
  this.pos = createVector(0, height / 2);
  //Set size
  this.size = createVector(t.x * 4, t.y * 14);
  this.lifeBar = 1000;
  this.life = 100;
  this.a = 0;
  this.mode = 1;
  this.vel = 1;
  this.dir = 1;
  
  //Hit
  this.hit = function(obj) {
    let d = dist(this.posB.x, this.posB.y, obj.pos.x, obj.pos.y);
    if (d < 50) {
      bullet.splice(obj, 1);
      this.health -= 1;
    }
  }
  
  //Render member
  this.render = function() {
    push(); 
      translate(this.posB.x, this.posB.y);
      scale(this.dir, 1);
      //rect(-this.size.x / 2, -this.size.y / 2,  this.size.x, this.size.y);
      bAnim.armR();
      bAnim.foreR();
      bAnim.legR();
      bAnim.calfR();
      bAnim.body();
      bAnim.head();
      bAnim.legL();
      bAnim.calfL();
      bAnim.armL();
      bAnim.foreL();
      bAnim.update();
    pop();
  }
  
  //Render up floor
  this.upFloor = function(object) {
    if (
      //Y
      object.pos.y + BG.pos.y + object.imgSize.y / 2 > this.posB.y - this.size.y &&
      object.pos.y + BG.pos.y + object.imgSize.y < this.size.y + this.posB.y &&
      //X
      object.pos.x + BG.pos.x + object.size.x > this.posB.x- this.size.x / 2 &&
      object.pos.x + BG.pos.x - object.size.x < this.posB.x + this.size.x / 2
    ) {
      this.render();
    }
  }
  
  //Update
  this.update = function() {
    //Life bar
    if (this.lifeBar / 10 > this.life) {
      this.lifeBar--;
    }
    //Set position plus BG
    this.posB = createVector(BG.pos.x + this.pos.x, BG.pos.y + this.pos.y);
    
      //Apoint to player
      this.a = atan2(this.posB.y - p.pos.y, this.posB.x - p.pos.x);
      if (this.posB.x < width / 2) {
        this.dir = 1;
      } else {
        this.dir = -1;
      }
      //Move
      this.pos.x -= this.vel * cos(this.a);
      this.pos.y -= this.vel * sin (this.a);
  }
}

function bossAnim() {
  this.dir = 0;
  this.dir2 = 0;
  this.pos = createVector(0, 0);
  this.size = createVector(t.x * 3.75, t.y * 5);
  this.sizeA = createVector(t.x * 0.5, t.y * 4);
  this.sizeL = createVector(t.x * 0.5, t.y * 5);
  this.sizeH = createVector(t.x * 2, t.y * 1.25);
  this.mode2 = 1;
  this.anim = 1;
  this.mode = -1;
  
  //Body
  this.body = function() {
    push();
    translate(this.pos.x, this.pos.y);
    image(bIMG[2], -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    pop();
  }
  
  //Head
  this.head = function() {
    push();
    translate(this.pos.x, this.pos.y - this.size.y / 2 - this.sizeH.y / 2 + 2);
    rotate(-this.dir / 200);
    image(bIMG[1], -this.sizeH.x / 3, -this.sizeH.y * 1, this.sizeH.x, this.sizeH.y * 1.5);
    pop();
  }
  
  //Left Arm
  this.armL = function() {
    this.posAL = createVector(this.pos.x - this.size.x / 2, this.pos.y - this.size.y / 3.5);
    push();
    translate(this.posAL.x, this.posAL.y);
    rotate(radians(this.dir));
    image(bIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Right Arm
  this.armR = function() {
    this.posAR = createVector(this.pos.x + this.size.x / 2, this.pos.y - this.size.y / 3.5);
    push();
    translate(this.posAR.x, this.posAR.y);
    rotate(radians(-this.dir));
    image(bIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Left Leg
  this.legL = function() {
    this.posLL = createVector(this.pos.x - this.size.x / 3, this.pos.y + this.size.y / 2 - 4);
    push();
    translate(this.posLL.x + this.sizeL.x / 2, this.posLL.y);
    rotate(radians(-this.dir));
    scale(-1, 1);
    image(bIMG[0], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Right Leg
  this.legR = function() {
    this.posLR = createVector(this.pos.x + this.size.x / 3, this.pos.y + this.size.y / 2 - 4);
    push();
    translate(this.posLR.x - this.sizeL.x / 2, this.posLR.y);
    rotate(radians(this.dir));
    scale(-1, 1);
    image(bIMG[0], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Left Forearm
  this.foreL = function() {
    this.posFL = createVector(this.posAL.x + cos(radians(this.dir - 90)) * -this.sizeA.y, this.posAL.y + sin(radians(this.dir - 90)) * -this.sizeA.y);
    push();
    translate(this.posFL.x, this.posFL.y);
    rotate(radians(this.dir2) - 90);
    image(bIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Right Forearm
  this.foreR = function() {
    this.posFR = createVector(this.posAR.x + cos(radians(-this.dir - 90)) * -this.sizeA.y, this.posAR.y + sin(radians(-this.dir - 90)) * -this.sizeA.y);
    push();
    translate(this.posFR.x, this.posFR.y);
    rotate(radians(this.dir2) + 180);
    image(bIMG[0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Left Calf
  this.calfL = function() {
    this.posCL = createVector(this.posLL.x - cos(radians(-this.dir + 90)) * -this.sizeL.y, this.posLL.y - sin(radians(-this.dir + 90)) * -this.sizeL.y);
    push();
    translate(this.posCL.x, this.posCL.y);
    rotate(radians(-this.dir2) + 90);
    image(bIMG[0], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Right Calf
  this.calfR = function() {
    this.posCR = createVector(this.posLR.x - cos(radians(this.dir - 90)) * this.sizeL.y, this.posLR.y - sin(radians(this.dir - 90)) * this.sizeL.y);
    push();
    translate(this.posCR.x, this.posCR.y);
    rotate(radians(-this.dir2) + 90);
    image(bIMG[0], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Update
  this.update = function() {
    this.vel = 6;
    if (this.anim == 1) {
      if ((this.dir) < -90) {
        this.mode = 1;
      }
      if ((this.dir) > 90) {
        this.mode = -1;
      }
      if ((this.dir2) < 75) {
        this.mode2 = 1;
      }
      if ((this.dir2) > 180) {
        this.mode2 = -1;
      }
      this.dir += this.mode * this.vel;
      this.dir2 += this.mode2 * this.vel;
      this.size.y += (this.mode * this.vel) / 15;
    } 
    if (this.anim == 0) {
      this.dir = 0;
      this.dir2 = 90
      if (this.size.y > 95) {
        this.mode = -1;
      }
      if (this.size.y < 85) {
        this.mode = 1;
      }
      this.size.y += (this.mode * this.vel) / 20;
    }
  }
}

function renderBoss() {
  bo.update();
  bo.render();
  p.hurt(bo.posB.x - bo.size.x / 2, bo.posB.y);
  for (let j = 0; j < bullet.length; j++) {
    var d = dist(bo.posB.x, bo.posB.y, bullet[j].pos.x, bullet[j].pos.y);
    if (d < t.x * 3) {
      bullet.splice(j, 1);
      bo.life -= 1;
    }
  }
}

function renderBossIMG() {
  bIMG[0] = loadImage('Images/M.png');
  bIMG[1] = loadImage('Images/H.png');
  bIMG[2] = loadImage('Images/T.png');
}

function object() {
  //Variables
  this.pos = createVector(random(-width * 2, width * 3), 0);
  this.size = createVector(t.x * 0.1, t.y * 0.1);
  this.imgSize = createVector(t.x * 4, t.y * 9);
  this.sprite = random(1, 2.99);
  this.sprite = floor(this.sprite);
  
  //Render the figures
  this.render = function() {
   if (wave == 5) {
     if (this.sprite == 1) {
       this.sprite = 3;
     }
     if (this.sprite == 2) {
       this.sprite = 4;
     }
   }
   if (this.scream) {
     push();
     fill(0, 75, 0);
     stroke(0, 35, 0);
     strokeWeight(8);
     translate(BG.pos.x + this.pos.x, BG.pos.y +  this.pos.y);
     strokeWeight(5);
     rect(-this.size.x / 2, -this.size.y / 2,  this.size.x, this.size.y);
     image(Timg[this.sprite], -this.imgSize.x / 2, -this.imgSize.y /1.5, this.imgSize.x, this.imgSize.y);
     pop();
    }
  }
  
  //Detection offscream or not
  this.edges = function() {
    if(
      //X+
      this.pos.x + BG.pos.x > width + this.imgSize.x ||
      //X-
      this.pos.x + BG.pos.x < -this.imgSize.x ||
      //Y+
      this.pos.y + BG.pos.y > height + this.imgSize.y ||
      //Y-
      this.pos.y + BG.pos.y < -this.imgSize.y
    ) {
      this.scream = false;
    } else {
      this.scream = true;
    }
  }
}

//Render functions
function renderObject() {
  for (var i = 0; i < obj.length; i++) {
   obj[i].render();
   obj[i].edges();
   p.upFloor(obj[i]);
   if (wave == 5) {
     bo.upFloor(obj[i]);
   }
   p.hit(obj[i]);
   for (var j = 0; j < npc.length; j++) {
     npc[j].upFloor(obj[i]);
   }
   //Squares are where it should be?
   if (
      //X+
      obj[i].pos.x > -width / 1.5 &&
      //X-
      obj[i].pos.x < width / 1.5 &&
      //Y+
      obj[i].pos.y > -height / 1.5 &&
      //Y-
      obj[i].pos.y < height / 1.5) {
      obj[i].pos.x = random(-width * 2, width * 3);
    }
  }
}

//Render image
function renderTreeIMG() {
  Timg[1] = loadImage('Images/A.png');
  Timg[2] = loadImage('Images/B.png');
  Timg[3] = loadImage('Images/C.png');
  Timg[4] = loadImage('Images/D.png');
}


function objject() {
  //Variables
  this.pos = createVector(random(-width * 5, width * 5), random(-height * 5, height * 5));
  this.size = createVector(10, 10);
  this.col = 75;
  this.lock = true
  
  //Render the figures
  this.render = function() {
   if (this.scream) {
     push();
     fill(0, this.col, 0);
     stroke(0, 35, 0);
     strokeWeight(8);
     translate(BG.pos.x + this.pos.x, BG.pos.y +  this.pos.y);
     strokeWeight(5);
     rect(-this.size.x / 2, -this.size.y / 2,  this.size.x, this.size.y)
     pop();
    }
  }
  
  //Detection offscream or not
  this.edges = function() {
    if(
      //X+
      this.pos.x + BG.pos.x > width + this.size.x ||
      //X-
      this.pos.x + BG.pos.x < -this.size.x ||
      //Y+
      this.pos.y + BG.pos.y > height + this.size.y ||
      //Y-
      this.pos.y + BG.pos.y < -this.size.y
    ) {
      this.scream = false;
    } else {
      this.scream = true;
    }
  }
  
  //Squares hit another square?
   this.hit = function() {
     for (var i = 0; i < objj.length; i++) {
      if (i != this.num) {
       if (this.lock) {
       if (
       //Y
       this.pos.y + this.size.y / 2 > objj[i].pos.y - objj[i].size.y / 2 &&
       this.pos.y - this.size.y / 2 < objj[i].pos.y + objj[i].size.y / 2 &&
       //X
       this.pos.x + this.size.x / 2 > objj[i].pos.x - objj[i].size.x / 2 &&
       this.pos.x - this.size.x / 2 < objj[i].pos.x + objj[i].size.x / 2
       ) {
         this.pos = createVector(random(-width * 5, width * 5), random(-height * 5, height * 5));
       } else {
         this.lock = false;
       }
      }
      }
     }
  }
}

//Render functions
function renderobjject() {
  for (var i = 0; i < objj.length; i++) {
   objj[i].num = i;
   objj[i].render();
   objj[i].edges();
   p.hit(objj[i]);
   //Squares are where it should be?
   if (
      //X+
      objj[i].pos.x > -width / 3 &&
      //X-
      objj[i].pos.x < width / 3 &&
      //Y+
      objj[i].pos.y > -height / 3 &&
      //Y-
      objj[i].pos.y < height / 3) {
      objj.splice(i, 1);
      objj.push(new objject());
    }
  }
}


function waveBar() {
  //WaveLine
    //New wave
    if (nivelBar / 10 == npc.length) {
      if (coll > 100) {
        coll -= 10;
      }
    }
    if (nivelBar / 10 > npc.length) {
      nivelBar -= 0.5;
      if (coll < 255) {
        coll += 15;
      }
    }
    if (nivelBar / 10 < npc.length) {
      nivelBar += 1;
      if (coll < 255) {
        coll += 10;
      }
    }
    push();
      fill(50);
      strokeWeight(t.x / 5);
      rect(width / 2 - t.x * 10, t.y * 1, t.x * 20, t.y * 2);
      fill(coll);
      if (wave == 5) {
        fill(255, 0, 0);
        rect(width / 2 - t.x * 10, t.y * 1, map(bo.lifeBar, 0, 1000, 0, t.x * 20), t.y * 2);
      } else {
        rect(width / 2 - t.x * 10, t.y * 1, map(nivelBar, 0, 50, 0, t.x * 20), t.y * 2);
      }
      stroke(0);
      textSize(t.x);
      if (wave == 5) {
        text('      FINAL WAVE', width / 2 - 'FINAL WAVE'.length * t.x / 2, t.y * 2.5);
      } else {
        text('WAVE ' + wave, width / 2 - 'WAVE'.length * t.x / 2, t.y * 2.5);
      }
     pop();
  }

 
  function bg() {
    //Variables
    this.pos = createVector(width / 2, height / 2);
    this.time = 0;
    this.bg = 1;
    this.stop = false;
    
    this.update = function() {
      //new wave
      if (this.time < wave * 70) {
        this.time += 5;
      }
      if (npc.length == 0 && wave < 5) {
        wave ++;
        if (wave < 5) { 
          for (var i = 0; i < 5; i++) {
            npc.push(new NPC());
            npc[i].health = 3 * wave;
          }
        }
      }
      if (wave == 5 && bo.life <= 0) {
        this.bg = 3;
        this.stop = true;
        this.lifeBar = 1000;
        this.life = 100;
        this.pos = createVector(width / 2, height / 2);
        wave = 0;
        p.life = 100;
        this.stop = true;
        this.time = 0;
      }
      if (p.life <= 0) {
        for (let i = 0; i < npc.length + 1; i++) {
          npc.splice(i, 10);
        }
        this.bg = 2;
        this.pos = createVector(width / 2, height / 2);
        wave = 0;
        p.life = 100;
        this.time = 0;
        this.stop = true;
      }
      
      //Detection finish
      if (this.pos.y < -height * 0.5) {
        this.pos.y = -height * 0.5;
      }
      if (this.pos.y > height * 1.5) {
        this.pos.y = height * 1.5;
      }
      if (this.pos.x < -width * 0.5) {
        this.pos.x = -width * 0.5;
      }
      if (this.pos.x > width * 1.5) {
        this.pos.x = width * 1.5;
      }
    }
    
    //Keys to move
    this.keys = function() {
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        this.pos.x += vel;
        p.dir = -1;
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        this.pos.x -= vel;
        p.dir = 1;
      } 
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        this.pos.y += vel;
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        this.pos.y -= vel;
      }
      
      //Animation
      if (keyIsDown(DOWN_ARROW) || 
          keyIsDown(UP_ARROW) ||
          keyIsDown(LEFT_ARROW) ||
          keyIsDown(RIGHT_ARROW) || 
          keyIsDown(65) ||
          keyIsDown(68) || 
          keyIsDown(87) || 
          keyIsDown(83)) {
        p.sprite = 1;
      } else {
        p.sprite = 0;
      }
    }
    
    //Change backGroun
    this.render = function() {
      if (this.bg == 0) {
        if (!this.stop) {
          if (wave == 5) {
            renderBoss();
          }
          renderPlayer();
          renderNPC();
          renderObject();
          loadHouses();
          gunFunctions();
          p.bar();
          waveBar();
          this.renderTime();
        }
      } else if (this.bg == 1) {
        //Scene
        image(bgIMG[0], 0, 0, width, height);
        //Button
        button(width / 2, height / 1.25, t.x * 15, t.y * 7.5, 0);
      } else if (this.bg == 2) {
        //Scene
        image(bgIMG[1], 0, 0, width, height);
        //Button
        button(width / 2, height / 1.25, t.x * 15, t.y * 7.5, 0);
      } else {
        //Scene
        image(bgIMG[2], 0, 0, width, height);
        //Button
        button(width / 2, height / 1.25, t.x * 15, t.y * 7.5, 0);
        fill(100, 0, 50, 200);
        rect(0, 0, width, height);
      }
    }
    
    //Change time
    this.renderTime = function() {
      if (this.time > 180) {
        this.time = 180;
      }
     //Change time
     push();
      if (wave == 5) {
        fill(100, 0, 50, this.time);
      } else {
        fill(10, 0, 10, this.time);
      }
      rect(0, 0, width, height);
     pop();
    }
  }
  
  function BGrenderIMG() {
    bgIMG[0] = loadImage('Images/Inicio.png');
    bgIMG[1] = loadImage('Images/Morrer.png');
    bgIMG[2] = loadImage('Images/Ganhar.png');
  }
  //Render functions
  function BGrender() {
    BG.keys();
    BG.update();
    BG.render();
  }



//NPC settings
function NPC() {
  //Variables
  this.pos = createVector(random(-width, width), random(-height, height));
  this.healthBar = 300;
  this.dir = 1;
  this.a = 0;
  this.vel = vel / 4 * wave;
  this.size = createVector(t.x * 3, t.y * 5);
  this.sprite = 1;
  this.time = 0;
  this.hit = false;

  //Render, the figure
  this.render = function() {
    push();
      translate(this.pos.x + BG.pos.x, this.pos.y + BG.pos.y);
      //Health life
      fill(50);
      strokeWeight(t.x * 0.2);
      rect(width / 2 - t.x * 3, height / 2 - t.y * 4, t.y * 6, t.y);
      //Line life
      fill(255, 0, 0);
      rect(width / 2 - t.x * 3, height / 2 - t.y * 4, map(this.healthBar, 0, 300 * wave, 0, t.x * 6), t.y);
      //Hit
      if (this.hit) {
        tint(255, 0, 0)
        this.hit = false;
      }
      //Zombie
      aNPC.update(this);
      aNPC.armR(this);
      aNPC.legR(this);
      aNPC.body(this);
      aNPC.head(this);
      aNPC.legL(this);
      aNPC.armL(this);
    pop();
  }
  
  this.hit = function(obj) {
    let d = dist(this.pos.x + BG.pos.x, this.pos.y + BG.pos.y, obj.pos.x, obj.pos.y);
    if (d < 50) {
      bullet.splice(obj, 1);
      this.health -= 1;
    }
  }
  
  //Update, repeat forever
  this.update = function() {
    if (this.healthBar / 100 > this.health) {
      this.healthBar -= 10;
    }
    if (this.healthBar / 100 < this.health) {
      this.healthBar = this.health * 100;
    }
    //Apoint to player
    this.a = atan2(this.pos.y + BG.pos.y + height / 2 - p.pos.y, this.pos.x + BG.pos.x + width / 2 - p.pos.x);
    if (this.pos.x + BG.pos.x < 0) {
      this.dir = 1;
    } else {
      this.dir = -1;
    }
    //Move
    this.pos.x -= this.vel * cos(this.a);
    this.pos.y -= this.vel * sin (this.a);
  }
  
  //Detection colision
  this.colision = function(object) {
    if (
      //Y+
      this.pos.y - this.size.y / 2 < object.pos.y + BG.pos.y + object.size.y / 2 &&
      //Y-
      this.pos.y + this.size.y / 2 > object.pos.y + BG.pos.y - object.size.y / 2 &&
      //X-
      this.pos.x - this.size.x / 2 < object.pos.x + BG.pos.x + object.size.x / 2 &&
      //X+
      this.pos.x + this.size.x / 2 > object.pos.x + BG.pos.x - object.size.x / 2) {
      
      //Y+
      if (this.pos.y - this.size.y / 2 + 10 > object.pos.y + BG.pos.y + object.size.y / 2) {
      BG.pos.y -= vel;
      }
      //Y-
      if (this.pos.y + this.size.y  / 2 - 10 < object.pos.y + BG.pos.y - object.size.y / 2) {
      BG.pos.y += vel;
      }
      //X-
      if (this.pos.x - this.size.x / 2 + 10 < object.pos.x + BG.pos.x + object.size.x / 2) {
      BG.pos.x += vel;
      }
      //X+
      if (this.pos.x + this.size.x / 2 - 10 > object.pos.x + BG.pos.x - object.size.x / 2) {
      BG.pos.x -= vel;
      }
    }
  }
  
  //Render up floor
  this.upFloor = function(object) {
    if (
      //Y
      object.pos.y + BG.pos.y + object.imgSize.y / 2 > this.pos.y + BG.pos.y + height / 2 - this.size.y &&
      object.pos.y + BG.pos.y + object.imgSize.y < this.size.y + object.size.y + this.pos.y + height / 2 + BG.pos.y &&
      //X
      object.pos.x + BG.pos.x + object.size.x > this.pos.x + BG.pos.x + width / 2  - this.size.x / 2 &&
      object.pos.x + BG.pos.x - object.size.x < this.pos.x + width / 2 + BG.pos.x + this.size.x / 2
    ) {
      this.render();
    }
  }
}

function animNPC() {
  this.pos = createVector(width / 2, height / 2);
  this.size = createVector(t.x * 1.5, t.y * 1.5);
  this.dir = 0;
  this.mode = -1;
  this.modeY = -1;
  this.sizeA = createVector(t.x * 0.9, t.y * 1.5);
  this.sizeL = createVector(t.x * 0.9, t.y * 1.5);
  this.sizeH = createVector(t.x * 1.8, t.y * 1.8);
  //Set costume
  this.c = 'a';
  
  //Body
  this.body = function(i) {
    push();
    translate(this.pos.x, this.pos.y);
    scale(i.dir, 1);
    image(npcIMG[this.c + 2], -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    pop();
  }
  
  //Head
  this.head = function(i) {
    push();
    translate(this.pos.x, this.pos.y - this.size.y / 2 - this.sizeH.y / 2 + 1);
    strokeWeight(5);
    rotate(radians(-this.dir / 10));
    scale(i.dir, 1);
    image(npcIMG[this.c + 1], -this.sizeH.x / 2, -this.sizeH.y / 2, this.sizeH.x, this.sizeH.y);
    pop();
  }
  
  //Left Arm
  this.armL = function(i) {
    push();
    translate(this.posAL.x, this.posAL.y);
    rotate(radians(this.dir / 5));
    strokeWeight(5);
    scale(i.dir, 1);
    image(npcIMG[this.c + 0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Right Arm
  this.armR = function(i) {
    push();
    translate(this.posAR.x, this.posAR.y);
    rotate(radians(this.dir / 5));
    strokeWeight(5);
    scale(i.dir, 1);
    image(npcIMG[this.c + 0], -this.sizeA.x / 2, 0, this.sizeA.x, this.sizeA.y);
    pop();
  }
  
  //Left Leg
  this.legL = function(i) {
    push();
    if(i.dir == 1) {
      translate(this.posLL.x + this.sizeL.x / 2, this.posLL.y);
    } else {
      translate(this.posLL.x - this.sizeL.x / 2, this.posLL.y);
    }
    rotate(radians(this.dir));
    strokeWeight(5);
    scale(-i.dir, 1);
    image(npcIMG[this.c + 3], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Right Leg
  this.legR = function(i) {
    push();
    if (i.dir == 1) {
      translate(this.posLR.x - this.sizeL.x / 2, this.posLR.y);
    } else {
      translate(this.posLR.x + this.sizeL.x / 2, this.posLR.y);
    }
    rotate(radians(-this.dir));
    strokeWeight(5);
    scale(-i.dir, 1);
    image(npcIMG[this.c + 3], -this.sizeL.x / 2, 0, this.sizeL.x, this.sizeL.y);
    pop();
  }
  
  //Update
  this.update = function(i) {
    //Set costume
    if (wave == 1) {
      this.c = 'a';
    } else if (wave == 2) {
      this.c = 'b';
    } else if (wave == 3) {
      this.c = 'c';
    } else if (wave == 4) {
      this.c = 'd';
    }
    push();
      this.vel = 3 / npc.length;
      push();
      if (i.sprite == 1) {
        if (this.dir < -135) {
          this.mode = 1;
        }
        if (this.dir > 90) {
          this.mode = -1;
        }
        this.dir += this.mode * this.vel * 4;
      } else {
        this.dir = 0;
      }
      pop();
      push();
      if (this.c == 'c') {    
        if (this.size.y > t.y * 2.5) {
          this.modeY = -5;
        }
        if (this.size.y < t.y * 0.5) {
          this.modeY = 5;
        }
      } else {
        if (this.size.y > t.y * 1.6) {
          this.modeY = -1;
        }
        if (this.size.y < t.y * 1.4) {
          this.modeY = 1;
        }
      }
      this.size.y += (this.modeY * this.vel) / 20;
      pop();
      //Change direction
        this.posAL = createVector(this.pos.x - this.size.x * i.dir / 2, this.pos.y - this.size.y / 2 + 1);
        this.posAR = createVector(this.pos.x + this.size.x * i.dir / 2, this.pos.y - this.size.y / 2 + 1);
        this.posLL = createVector(this.pos.x - this.size.x * i.dir / 2, this.pos.y + this.size.y / 2 - 2);
        this.posLR = createVector(this.pos.x + this.size.x * i.dir / 2, this.pos.y + this.size.y / 2 - 2);
    pop();
  }
}

//Render functions
function renderNPC() {
  if (npc.length > 0) {
    for (let i = 0; i < npc.length; i++) {
      if (npc.length > 0) {
        push();
          push();
            npc[i].render();
            npc[i].update();
            p.hurt(npc[i].pos.x - npc[i].size.x / 2 + width / 2 + BG.pos.x, npc[i].pos.y - npc[i].size.y / 2 + height / 2 + BG.pos.y);
          pop();
          
          for (let j = 0; j < bullet.length; j++) {
            //npc[i].hit(bullet[j]);
            if (npc.length > 0) {
              var d = dist(npc[i].pos.x + BG.pos.x - t.x * 1.5 + width / 2 + npc[i].size.x / 2, npc[i].pos.y + BG.pos.y - t.y * 1.5 + height / 2 + npc[i].size.y / 2, bullet[j].pos.x, bullet[j].pos.y);
              if (d < t.x * 3) {
                bullet.splice(j, 1);
                npc[i].health -= 1;
                npc[i].hit = true;
              }
            }
          }
        //If it are dead
          if (npc[i].health <= 0) {
            npc.splice(i, 1);
          }
        pop();
      }
    }
  }
}

//Render images
function renderNPCimg() {
    for (let i = 0; i < 4; i++) {  
      npcIMG['a'+i] = loadImage('Images/a'+(i+1)+'.png');
    }
    for (let i = 0; i < 4; i++) {  
      npcIMG['b'+i] = loadImage('Images/b'+(i+1)+'.png');
    } 
    for (let i = 0; i < 4; i++) {  
      npcIMG['c'+i] = loadImage('Images/c'+(i+1)+'.png');
    }
    for (let i = 0; i < 4; i++) {  
      npcIMG['d'+i] = loadImage('Images/d'+(i+1)+'.png');
    } 
}

function button(x, y, tw, th, s) {
  wb += modew;
  hb += modeh;
    if (wb > tw * 1.25) {
      modew = -1;
    }
    if (wb < tw / 1.25) {
      modew = 1;
    }
    if (hb > th * 1.25) {
      modeh = -1;
    }
    if (hb < th / 1.25) {
      modeh = 1;
    }
push();
  translate(x, y);
  image(bimg[s], -wb / 2, -hb / 2, wb, hb);
pop();
if (mouseX < x + wb / 2 &&
    mouseX > x - wb / 2 &&
    mouseY < y + hb / 2 &&
    mouseY > y - hb / 2) {
  push();
    translate(x, y);
    tint(50);
    image(bimg[s], -wb / 2 * 1.25, -hb / 2 * 1.25, wb * 1.25, hb * 1.25);
  pop();
  if (mouseIsPressed) {
    if (s == 0) {
      BG.stop = false;
      BG.bg = 0;
    }
  }
}
}

function renderButtonIMG() {
//E
bimg[0] = loadImage('Images/P.png');
}


function wall() {
  
  this.render = function() {
    push();
      translate(this.pos.x, this.pos.y)
      rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y)
    pop();
  }
}

function renderWall() {
  for (var i = 0; i < w.lenght; i++) {
    w[i].render();
  }
}


function preload() {
  renderButtonIMG();
  renderPlayerIMG();
  loadHousesIMG();
  renderNPCimg();
  BGrenderIMG();
  renderTreeIMG();
  gunRender();
  renderBossIMG()
}

function setup() {
  if (windowHeight >= windowWidth / 1.77) {
    createCanvas(windowWidth, windowWidth / 1.77);
  } else {
    createCanvas(windowHeight * 1.77, windowHeight);
  }
  t = createVector(width / 48, height / 27);
  bo = new boss();
  bAnim = new bossAnim();
  vel = ((t.x + t.y) / 2) / 8;
  p = new player();
  gun = new Gun();
  pAnim = new playerAnimation();
  aNPC = new animNPC();
  BG = new bg();
  for (var i = 0; i < width; i++) {
     obj.push(new object());
     obj[i].pos.y = -width + i * width / (width / 4);
  }
  for (var i = 0; i < 1; i++) {
     h.push(new house());
  }
}

function draw() {
  background(0, 150, 0);
  BGrender();
}

function mousePressed() {
  bullet.push(new Bullet(gun.bpos.x - BG.pos.x, gun.bpos.y - BG.pos.y, gun.a));
}