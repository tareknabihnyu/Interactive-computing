let currentTool = 'seed'; 
let toolImages = {};
let buttonPositions = [
  { x: 10, y: 10 },  
  { x: 70, y: 10 },  
  { x: 130, y: 10 }, 
  { x: 190, y: 10 }  
];
let seeds = [];
let waterDrops = [];
let waterParticleSystems = [];





function preload() {
  
  seedImage = loadImage('images/seeds.png');
  toolImages.seed = loadImage('images/seeds.png');
  toolImages.water = loadImage('images/watering_can.png');
  toolImages.shovel = loadImage('images/shovel.png');
  toolImages.paintbrush = loadImage('images/paintbrush.jpg');
}

function setup() {
  let cnv = createCanvas(500, 400);
  cnv.parent('canvas-container'); 
  
}

function draw() {
  
  

  drawBackground();
  drawForeground();
  drawToolButtons();
  displayCurrentTool();
  seeds.forEach(seed => {
    if (seed.flower) {
        seed.flower.interactWithMouse();
    }
  });

  waterDrops.forEach(drop => {
    drop.show();
  });

  seeds.forEach(seed => {
    seed.fall();
    seed.grow();
    seed.show();
    seed.showFlower();
  });

  for (let i = waterDrops.length - 1; i >= 0; i--) {
    let drop = waterDrops[i];
    seeds.forEach(seed => {
      if (isColliding(drop, seed)) {
        seed.grow();
        waterDrops.splice(i, 1);
      }
    });
  }
  waterParticleSystems.forEach(system => {
    system.update();
    system.display();
  });

  
  push();
  if (currentTool === 'seed') {
    
    image(toolImages.seed,mouseX,mouseY,30,30)
  } else if (currentTool === 'water') {
    
    image(toolImages.water,mouseX,mouseY,30,30)
  } else if (currentTool === 'shovel') {
    
    image(toolImages.shovel,mouseX,mouseY,30,30)
  } else if (currentTool === 'paintbrush') {
    
    image(toolImages.paintbrush,mouseX,mouseY,30,30)
  }



  
  
  
}

function isColliding(drop, seed) {
  let distance = dist(drop.x, drop.y, seed.x, seed.y);
  if (distance < drop.size / 2 + seed.size / 2 || ((seed.y - 50) < drop.y && ( drop.x + 10 >= seed.x && seed.x >= drop.x - 10)) ) {
    seed.watered = true;  
    return true;
  }
  return false;
}

function drawBackground() {
  background(135, 206, 235); 
}

function drawForeground() {
  fill(34, 139, 34); 
  noStroke();
  rect(0, height - 100, width, 100); 
}

function drawToolButtons() {
  image(toolImages.seed, buttonPositions[0].x, buttonPositions[0].y, 50, 50);
  image(toolImages.water, buttonPositions[1].x, buttonPositions[1].y, 50, 50);
  image(toolImages.shovel, buttonPositions[2].x, buttonPositions[2].y, 50, 50);
  image(toolImages.paintbrush, buttonPositions[3].x, buttonPositions[3].y, 50, 50); 
}

function mousePressed() {
  buttonPositions.forEach((buttonPosition, index) => {
    if (mouseX > buttonPosition.x && mouseX < buttonPosition.x + 50 &&
        mouseY > buttonPosition.y && mouseY < buttonPosition.y + 50) {
          switch(index) {
            case 0:
                setCurrentTool('seed');
                break;
            case 1:
                setCurrentTool('water');
                break;
            case 2:
                setCurrentTool('shovel');
                break;
            case 3:
                setCurrentTool('paintbrush'); 
                break;
        }        
    }
  });
  if (currentTool === 'seed' && mouseY < height - 100) {
    let newSeed = new Seed(mouseX, mouseY);
    seeds.push(newSeed);
  } else if (currentTool === 'water') {
    let newDrop = new WaterDrop(mouseX, mouseY);
    waterDrops.push(newDrop);
    waterParticleSystems.push(new WaterParticleSystem(mouseX, mouseY));
  } else if (currentTool === 'shovel') {
    
  }


  if (currentTool === 'shovel') {
    
    for (let i = seeds.length - 1; i >= 0; i--) {
      let seed = seeds[i];
      let d = dist(mouseX, mouseY, seed.x, seed.y);
      if (d < seed.size / 2) {
        seeds.splice(i, 1);
        break;
      }
    }

  }
  if (currentTool === 'paintbrush') {
    seeds.forEach(seed => {
      if (seed.flower && dist(mouseX, mouseY, seed.x,seed.y - seed.flower.maxStemHeight) < 20) {
        seed.flower.color = color(random(255), random(255), random(255));
      }
    });
  }
}


function setCurrentTool(tool) {
  if (['seed', 'water', 'shovel', 'paintbrush'].includes(tool)) {
      currentTool = tool;
  }
}

function displayCurrentTool() {
  fill(0);
  textSize(16);
  text(`Current Tool: ${currentTool}`, 10, height - 20);
}












class Seed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.isPlanted = false;
    this.watered = false;
    this.root = new Root(this.x, height - 100);
    this.max = 20;
  }

  fall() {
    if (this.y < height - 100) {
      this.y += 2; 
    } else {
      this.isPlanted = true;
    }
  }

  show() {
    fill(165, 42, 42); 
    ellipse(this.x, this.y, this.size, this.size);
    this.root.show();
  }

  grow() {
    this.isFlower = true;
    if (this.isPlanted && this.watered && this.size < this.max) {
      this.size += 0.1; 
    } else if (this.size >= this.max && !this.flower) {
      
      this.flower = new Flower(this.x, this.y);
    }
    if (this.isPlanted && this.watered) {
      this.root.grow(); 
    }
  }

  
  showFlower() {
    if (this.flower) {
      this.flower.display();
      this.flower.update();
    }
  }
}

class WaterDrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
  }

  show() {
    fill(135, 206, 235); 
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class WaterParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.speed = random(1, 3);
    this.direction = PI / 2 + random(-PI / 8, PI / 8); 
  }

  update() {
    this.x += cos(this.direction) * this.speed;
    this.y += sin(this.direction) * this.speed;
    this.size *= 0.95; 
  }

  display() {
    fill(0, 0, 255); 
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class WaterParticleSystem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push(new WaterParticle(this.x, this.y));
    }
  }

  update() {
    this.particles.forEach(particle => {
      particle.update();
    });
    this.particles = this.particles.filter(particle => particle.size > 0.1);
  }

  display() {
    this.particles.forEach(particle => {
      particle.display();
    });
  }
}


class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.stemHeight = 0;
    this.maxStemHeight = random(100, 200);
    this.rotation = 0;
    this.color = color(random(255), random(255), random(255)); 
  }

  update() {
    if (this.stemHeight < this.maxStemHeight) {
      this.stemHeight += 1;
    } else {
      this.rotation += 0.01;

      let d = dist(mouseX, mouseY, this.x, this.y - this.stemHeight);
      if (d < 50) { 
        this.rotation += 0.05; 
      } else {
        this.rotation += 0.01;
      }
    }
  }

  display() {
    
    stroke(34,139,34); 
    line(this.x, this.y, this.x, this.y - this.stemHeight);

    
    if (this.stemHeight >= this.maxStemHeight) {
      push();
      translate(this.x, this.y - this.stemHeight);
      rotate(this.rotation);
      fill(this.color); 
      for (let i = 0; i < 5; i++) {
        ellipse(sin(TWO_PI / 5 * i) * 10, cos(TWO_PI / 5 * i) * 10, 10);
      }
      pop();
    }
    
  }
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < 10; 
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  interactWithMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) { 
        this.rotationAngle += 0.05; 
    }
  }

  spin() {
    this.rotationSpeed += 0.1; 
    if (this.rotationSpeed > MAX_ROTATION_SPEED) {
      this.rotationSpeed = MAX_ROTATION_SPEED; 
    }
  }

}


class Root {
  constructor(x, y, isMainRoot = true) {
    this.x = x;
    this.y = y;
    this.isMainRoot = isMainRoot;
    this.length = 0;
    this.maxLength = isMainRoot ? 20 : random(10, 30); 
    this.maxBranches = isMainRoot ? 8 : 0; 
    this.branchCount = 0;
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.branches = [];
    this.path = [];
  }

  grow() {
    if (this.length < this.maxLength) {
      let noiseFactorX = noise(this.noiseOffsetX);
      let noiseFactorY = noise(this.noiseOffsetY);

      this.x += map(noiseFactorX, 0, 1, -2, 2);
      this.y += map(noiseFactorY, 0, 1, 0, 2);
      this.length += 0.5;
      this.noiseOffsetX += 0.01;
      this.noiseOffsetY += 0.01;

      if (this.isMainRoot && this.branchCount < this.maxBranches
         && random() < 0.2
         ) {
        this.branches.push(new Root(this.x, this.y, false));
        this.branchCount++;
      }
      this.path.push({x: this.x, y: this.y});

    }

    this.branches.forEach(branch => {
      branch.grow();
    });
  }

  show() {
    push();
    stroke(139, 69, 19); 
    strokeWeight(1.5);
    noFill();
    beginShape();
    this.path.forEach(point => {
      vertex(point.x, point.y);
    });
    endShape();

    this.branches.forEach(branch => {
      branch.show();
    });
    pop();
  }
}
