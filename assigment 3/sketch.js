
// Load high score from localStorage
let highScore = parseInt(localStorage.getItem('highScore') || '0');

if (!highScore) {
    highScore = 0;
    localStorage.setItem('highScore', '0');
}
document.getElementById('highScore').textContent = highScore;

let Score;
let whichcar = 0;
let rate = 0;
let gamestatus = "start";
let arrCars;
let carrs = [];
let carsctr = 0;
let difficulty = 0;
let currentScore = 0;
let prevScore = 0;
let lanes = [8,88,168,248,328];
let lanes2 = [0,0,0,0,0];

function preload(){
  imgg = loadImage('assets/maincar.png');
  car1 = loadImage('assets/car1.png');
  car2 = loadImage('assets/car2.png');
  car3 = loadImage('assets/car3.png');
  backgroundd = loadImage('assets/background.png');
  backgrounddd = loadImage('assets/final.gif');
  cargoing = loadSound('assets/mixkit-fast-car-drive-by-1538.wav');
  bomb = loadSound('assets/explo.mp3');
  startscreen = loadImage('assets/startscreen.png');
  done = loadImage('assets/gameover.png');
  maincar2 = loadImage('assets/maincar2.png');
  maincar3 = loadImage('assets/maincar3.png');
}

function setup() {
  createCanvas(400, 550);
  let cnv = createCanvas(400, 550);
  let dashboardElement = document.querySelector('.dashboard');
  dashboardElement.parentNode.insertBefore(cnv.elt, dashboardElement);
  maincar = new main_car();
  arrCars = [car1,car2,car3] ;
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

}


function keyPressed() {
  if(keyCode === ENTER){
     gamestatus = "running";
  }
  if (keyCode === UP_ARROW){
    
  }
  if(keyCode === LEFT_ARROW){
    rate = -8;
  }
  if(keyCode === RIGHT_ARROW){
    rate = 8;
  }
}


function keyReleased() 
{
  
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) 
  {
    rate = 0;
  }
  if(keyCode === ENTER){
     gamestatus = "running";
  }
  
}


function generateCars(){
  let rand = int(random(0, 100));
  let rand2 = int(random(0, 100));
  if(rand % 7 == 0 && carrs.length < 4){
    if(rand2 % 3 == 0){
      if(rand2 % 2 == 0 && rand % 2 == 0){
          carrs[carsctr] = new cars();
          carrs[carsctr].display();
          // console.log(carsctr);
          carsctr++;
        }
     }
  }
}

function displayCars(){
  for(let i = 0; i < carrs.length; i++){
    carrs[i].display();
    // console.log(">",carrs.length);
    
    let temp = false;
    
    if(maincar.didcollide(carrs[i])){
      carrs = []; 
      carsctr = 0;
      currentScore = 0;
      bomb.play();
      gamestatus = "start";
      // gamestatus = "end";
      // bomb.play();
    }else if(carrs[i].y > height || temp){
      checklanes(0,carrs[i]);
      cargoing.play();
      carrs.splice(i,1);
      carsctr--;
      currentScore++;
    }
  }
}

function updateHighScore(){
  if(currentScore > highScore){
    highScore = int(currentScore);
    localStorage.setItem('highScore', highScore.toString()); // update local storage with the new high score
  }
  // Score = currentScore;
  updateScoreDisplay(currentScore);

  textSize(22);
  fill(250);
  strokeWeight(5);
  stroke(0);
  text("Score: "+currentScore,20,50);
  text("High Score: " + highScore, 240, 50);  
}

function draw() {
  
  
  if(gamestatus == "running"){
    image(backgrounddd,0,0);
    maincar.display();
    generateCars();
    displayCars();
    updateHighScore();
  }else if(gamestatus == "end"){
    image(done, 0, 0);
    currentScore = 0;
    difficulty = 0;
    prevScore = 0;
  }else if (gamestatus == "start") {
    push();
    image(startscreen, 0, 0);
    // fill(255);
    // textSize(24);
    // textAlign(CENTER, CENTER);
    // text("Choose Difficulty", width/2, 150);
    // text("Easy", width/2, 215);
    // text("Medium", width/2, 265);
    // text("Hard", width/2, 315);
    pop();
  }
}

function mousePressed() {
  userStartAudio();
  if(mouseX > 0 && mouseX < width){
    if (gamestatus === "start") {
      carrs = []; // Clear all cars
      carsctr = 0; // Reset the counter
      if (mouseY > 180 && mouseY < 270) {
        difficulty = 1;  // Easy
        gamestatus = "running";
        // console.log("1");
      } else if (mouseY > 270 && mouseY < 380) {
        difficulty = 2;  // Medium
        gamestatus = "running";
        // console.log("2");
      } else if (mouseY > 380 && mouseY < 500) {
        difficulty = 3;  // Hard
        gamestatus = "running";
        // console.log("3");
      }
    }
  }
}

function windowResized() {
  resizeCanvas(400, 550);
}

function increaseD() {
  let baseSpeed = 1;
  switch (difficulty) {
    case 1:  // Easy
      baseSpeed = 1;
      break;
    case 2:  // Medium
      baseSpeed = 3;
      break;
    case 3:  // Hard
      baseSpeed = 5;
      break;
  }
  return baseSpeed + random(0, 5) + difficulty;
}

function checklanes(x,other){
  while(x === 1 && lanes2[other.temp] === 1){
    other.temp = int(random(0,5));
    other.x = lanes[other.temp];
  }
  if(x === 1){
    lanes2[other.temp] = 1;
  }else if(x === 0){
    lanes2[other.temp] = 0;
  }
}


class cars{
  constructor(){
    this.temp = int(random(0,5));
    this.x = lanes[this.temp];
    this.y = -90;
    this.cartype =  int(random(0, 3));
    this.rateFall = increaseD();
    checklanes(1,this);
  }
  
  display(){
    image(arrCars[this.cartype],this.x,this.y);
    this.move();
  }
  move(){
    this.y += this.rateFall;
  }
  width(){
    return 70;
  }
  increaseD(){
    
  }
  
}





class main_car{
  constructor(){
    this.x = 200;
    this.y = 450;
    this.display();
    this.width = 70;
  }
  
  display(){
    imageMode(CENTER);
    if(whichcar === 0){
      image(imgg,this.x,this.y);
    }else if(whichcar === 1){
      image(maincar2,this.x,this.y);
    }else if(whichcar === 2){
      image(maincar3,this.x,this.y);
    }

    this.move();
    this.checkboundries();


    imageMode(CORNER);
  }
  
  move(){
    this.x += rate;
  }
  
  checkboundries(){
    if(this.x > width){
      this.x = 0;
    }else if(this.x < 0){
      this.x = width;
    }
  }
  
  didcollide(other){
    if ( (this.x <= (other.x + other.width())) && (this.x >= other.x)) {
      if ((this.y <= (90 + other.y + other.width())) && (this.y  >= other.y)){
        // print("Collision");
        return true;
      }      
      
    }
  }

}

document.getElementById('carSkinSelector').addEventListener('change', function() {
  var selectedValue = this.value;
  if (selectedValue == '1') {
      whichcar = 1;
  } else if (selectedValue == '2') {
      whichcar = 2;
  } else {
      whichcar = 0;  
  }
});

function updateScoreDisplay(newScore) {
  document.getElementById('Score').textContent = newScore;
}

document.getElementById('volumeSlider').addEventListener('input', function() {
  let volume = parseFloat(this.value);
  cargoing.setVolume(volume);
  bomb.setVolume(volume);
  // Add other audio assets here if needed
});


// var originalScoreFunction = currentScore;
// sccurrentScoreore = function() {
//     originalScoreFunction();
//     updateScoreDisplay(currentScore);
// }