// variable to hold a reference to our A-Frame world
let world;
let pyramidContainer;
let sphinx;
let writablePlane;
let noiseScale = 0.02;
let riverBoxes = [];


function setup() {
    
    noCanvas();


    let canvasName = createCanvas(512,512).id();
    world = new World('VRScene');

    






    createPyramid(-30, 0, -20, 10);
    createPyramid(-10, 0, -20, 15);
    createPyramid(5, 0, -20, 8);



    sphinx = new OBJ({
        asset: 'sphinxModel',
        mtl: 'sphinxModelMTL',
    
        x: 10, y: 1, z: -7,
        scaleX: 0.5, scaleY: 0.5, scaleZ: 0.5,
        rotationX:-90,rotationY:-180,
        red: 128, green: 0, blue: 0,
        clickFunction: function(theBox) {
        
            theBox.spinY(5);
        }
    });
    // world.add(sphinx);


    let floor = new Plane({
        x: 0, y: 0, z: 0,
        width: 100, height: 100,
        asset: 'sand',
        repeatX: 100,
        repeatY: 100,
        rotationX: -90
    });
    world.add(floor);

    let ceiling = new Plane({
        x: 0, y: 20, z: 0,
        width: 40, height: 40,
        asset: 'stone',
        repeatX: 100,
        repeatY: 100,
        rotationX: -90,
        side: 'double',
        clickFunction: function(dd) {
        
            dd.spinY(5);
        }
    });
    world.add(ceiling);

    // i removed the sphinx

    let sky = new Sky({
        asset: 'sky'
     });
     world.add(sky);

    let numoffloat = 10;
    for (let i = 0; i < numoffloat; i++) {
        let x = random(-50, 50);
        let y = random(1, 10);
        let z = random(-50, 50);
        let item = new OBJ({
            x: x, y: y, z: z,
            asset: 'floatingItem',
            mtl: 'floatingItemMTL',
        
            rotationZ:-180,
            scaleX: 0.1, scaleY: 0.1, scaleZ: 0.1,
        });
        world.add(item);
    }


    let secretTrigger = new Box({
        x: 0, y: 0, z: 0,
        width: 2, height: 0.2, depth: 2,
        red: 0, green: 0, blue: 0,
        clickFunction: function(theBox) {
            world.setUserPosition(0, 30, 0);
        }
    });
    world.add(secretTrigger);

    writablePlane = new Plane({
        x: -19, y: 35, z: 0,
        width: 20, height: 20,
        red: 255, green: 255, blue: 255,side: 'double',
        asset: canvasName, rotationY: 90,
		dynamicTexture: true,
		dynamicTextureWidth: 512,
		dynamicTextureHeight: 512
    
    });
    world.add(writablePlane);


    addWallsAndWritablePlane();

    const riverLength = 100;
    const riverWidth = 5;
    const riverDepth = 1;
    const riverSpeed = 0.1;
    for (let i = 0; i < riverLength; i += riverWidth) {
        let box = new RiverBox(i - riverLength / 2 + 3, riverDepth / 2, -37, riverWidth, riverWidth, riverDepth, riverSpeed);
        riverBoxes.push(box);
    }
}


function draw() {

    background(255);


    let shapeType = noise(frameCount * noiseScale) * 3; 
    let fillColor = color(noise(frameCount * noiseScale + 10) * 255, 
                            noise(frameCount * noiseScale + 20) * 255, 
                            noise(frameCount * noiseScale + 30) * 255);
    let strokeW = noise(frameCount * noiseScale + 40) * 5;


    fill(fillColor);
    strokeWeight(strokeW);


    let x = noise(frameCount * noiseScale + 50) * width;
    let y = noise(frameCount * noiseScale + 60) * height;
    let sizee = noise(frameCount * noiseScale + 70) * 80 + 20;


    if (shapeType < 1) {
        ellipse(x, y, sizee, sizee);
    } else if (shapeType < 2) {
        rect(x, y, sizee, sizee);
    } else {
        triangle(x, y, x + sizee, y, x + sizee / 2, y - sizee);
    }

    for (let box of riverBoxes) {
        box.update();
      }

}

function createPyramid(x, y, z, levels) {

    pyramidContainer = new Container3D({x: x, y: y, z: z,
    });


    pyramidContainer.pressFunction = function() {
        this.spinY(5);
    };


    let baseSize = levels;
    let decrement = 1;


    for (let i = 0; i < levels; i++) {
        let currentLevelSize = baseSize - (i * decrement);
        for (let j = 0; j < currentLevelSize; j++) {
            for (let k = 0; k < currentLevelSize; k++) {
                let block = new Box({
                    x: j - currentLevelSize / 2, 
                    y: i, 
                    z: k - currentLevelSize / 2,
                    asset: 'pyramid'
                });
                pyramidContainer.addChild(block);
            }
        }
    }


    world.add(pyramidContainer);

    return pyramidContainer;
}

function addWallsAndWritablePlane() {

    let yyy = 25;
    const wallConfigs = [
        { shape: Dodecahedron, startX: 20, startZ: -20, endZ: 20, startY: yyy, endY: 60, stepZ: 4, stepY: 4 },
        { shape: Ring, startX: -20, startZ: -20, endZ: 20, startY: yyy, endY: 60, stepZ: 4, stepY: 4 },
        { shape: Tetrahedron, startZ: 20, startX: -20, endX: 20, startY: yyy, endY: 60, stepX: 4, stepY: 4 },
        { shape: Torus, startZ: -20, startX: -20, endX: 20, startY: yyy, endY: 60, stepX: 4, stepY: 4 },
    ];

    wallConfigs.forEach(config => {
        createWall(config);
    });


  


}

function createWall({ shape, startX, startZ, endX, endZ, startY, endY, stepX = 4, stepZ = 4, stepY = 4 }) {
    for (let y = startY; y <= endY; y += stepY) {
        let x = startX || 0;
        let z = startZ || 0;

        while (startX !== undefined ? x <= endX : z <= endZ) {
            let wallElement = new shape({
                x, y, z,
                red: random(255), green: random(255), blue: random(255),
                rotationY: 1
            });
            world.add(wallElement);

            if (startX !== undefined) {
                x += stepX;
            } else {
                z += stepZ;
            }
        }
    }
}


class RiverBox {
    constructor(x, y, z, length, width, height) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.width = width;
      this.height = height;
      this.length = length;
  
    
      this.baseRed = 0;
      this.baseGreen = 100;
      this.baseBlue = 255;
  
    
      this.myBox = new Box({
        x: this.x, 
        y: this.y, 
        z: this.z,
        width: this.width, 
        height: this.height, 
        depth: this.length,
        red: this.baseRed, 
        green: this.baseGreen, 
        blue: this.baseBlue
      });
  
    
      world.add(this.myBox);
  
    
      this.colorOffset = random(1000);
    }
  

    update() {
    
      let red = this.baseRed + abs(sin(frameCount * 0.05 + this.colorOffset) * 20);
      let green = this.baseGreen + sin(frameCount * 0.05 + this.colorOffset) * 20;
      let blue = this.baseBlue + sin(frameCount * 0.05 + this.colorOffset) * 20;
  
    
      this.myBox.setColor(red, green, blue);
    }
  }