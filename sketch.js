var balloon,balloonImg,balloonAnimation;
var bg;
var database;
var position;

function preload(){
    balloonImg = loadImage('Hot Air Ballon-02.png');
    balloonAnimation = loadAnimation('Hot Air Ballon-02.png','Hot Air Ballon-03.png','Hot Air Ballon-04.png');
    bg = loadImage('Hot Air Ballon-01.png');
}

function setup(){
    database = firebase.database();
    createCanvas(800,400);
    balloon = createSprite(102,252,10,10);
    balloon.addImage(balloonImg);
    balloon.scale = 0.5;

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    fill(100,100,100);
    text("Use arrow keys to move",50,50);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        balloon.addAnimation("ballon",balloonAnimation);
        balloon.scale = balloon.scale - 0.003;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        balloon.scale = balloon.scale + 0.003;
    }
    drawSprites();
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function writePosition(x,y){
    database.ref('balloon/position').set({
        'x':position.x + x,
        'y':position.y + y
    })
}

function showError(){
    console.log("Error is printing in the console");
}