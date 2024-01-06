let video;
let handpose;
let predictions = [];
let maze;
let player = { x: 1, y: 1 };
let cellSize = 30;
let cols, rows;
let endPoint = { x: 0, y: 0 };


function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    cols = Math.floor(width / cellSize);
    rows = Math.floor(height / cellSize);

    handpose = ml5.handpose(video, modelReady);
    handpose.on('predict', results => {
        predictions = results;
    });

    maze = generateMaze(rows, cols);
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    push(); //
    translate(width, 0); 
    scale(-1, 1); 
    image(video, 0, 0, width, height); 
    pop(); 
    drawMaze();
    drawKeypoints();
    handleMovement();
}

function generateMaze(rows, cols) {
    let maze = new Array(rows);
    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols).fill(1);
    }

    function carvePath(x, y) {
        const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        directions.sort(() => Math.random() - 0.5);

        for (let [dx, dy] of directions) {
            let nx = x + dx * 2, ny = y + dy * 2;
            if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === 1) {
                maze[ny][nx] = 0;
                maze[y + dy][x + dx] = 0;
                carvePath(nx, ny);
            }
        }
    }

    maze[1][1] = 0; 
    carvePath(1, 1);
    
    endPoint.x = cols - 2;
    endPoint.y = rows - 2;
    maze[endPoint.y][endPoint.x] = 0;

    return maze;
}

function drawMaze() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y] && maze[y][x] === 1) {
                fill(255, 255, 255, 100); 
            } else {
                fill(0, 0, 0, 100); 
            }
            noStroke();
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    fill(255, 0, 0, 100); 
    rect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);

    fill(0, 0, 255, 100); 
    rect(endPoint.x * cellSize, endPoint.y * cellSize, cellSize, cellSize);
}

function drawKeypoints() {
    for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j++) {
            
            const flippedX = width - prediction.landmarks[j][0];
            const keypointY = prediction.landmarks[j][1];

            fill(0, 255, 0);
            noStroke();
            ellipse(flippedX, keypointY, 10, 10);
        }
    }
}


function getHandOrientation(prediction) {
    let wrist = prediction.landmarks[0];
    let indexFingerTip = prediction.landmarks[8];
    let dx = indexFingerTip[0] - wrist[0];
    let dy = indexFingerTip[1] - wrist[1];
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;

    if (angle >= -45 && angle <= 45) {
        return "left";
    } else if (angle > 45 && angle < 135) {
        return "down";
    } else if (angle >= 135 || angle <= -135) {
        return "right";
    } else if (angle < -45 && angle > -135) {
        return "up";
    }
}

function handleMovement() {
    if (predictions.length > 0) {
        let direction = getHandOrientation(predictions[0]);
        if (direction === "right" && canMove(player.x + 1, player.y)) {
            player.x++;
        } else if (direction === "up" && canMove(player.x, player.y - 1)) {
            player.y--;
        } else if (direction === "left" && canMove(player.x - 1, player.y)) {
            player.x--;
        } else if (direction === "down" && canMove(player.x, player.y + 1)) {
            player.y++;
        }
    }
    if (player.x === endPoint.x && player.y === endPoint.y) {
        
        maze = generateMaze(rows, cols);
        player.x = 1;
        player.y = 1;
    }
}

function canMove(x, y) {
    return maze[y] && maze[y][x] === 0;
}