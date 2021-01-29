var balloon,db,backgroundImg,position;

function preload() {
  backgroundImg=loadImage("images/bgImg");
  balloonImg=loadImage("images/balloonImg");
  balloonImg2=loadImage("images/balloonImg2");
  balloonImg3=loadImage("images/balloonImg3");
}

function setup() {
  createCanvas(500,500);
  db=firebase.database();
  balloon = createSprite(400, 200, 50, 50);
  
  var positionRef=db.ref("balloon/position");
    positionRef.on("value",readPosition,showError);
}

function draw() {
  background(255,255,255); 
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
    balloon.addAnimation("hotairballoon3",balloonImg3);
    
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(+1,0);
  balloon.addAnimation("hotairballoon4",balloonImg3);
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-1);
  balloon.addAnimation("hotairballoon",balloonImg);
  balloon.scale=balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  writePosition(0,+1);
  balloon.addAnimation("hotairballoon2",balloonImg2);
  balloon.scale=balloon.scale+0.01;
} 
textSize(15);
fill("blue");
text("Use arrow keys to control the balloon",100,50);
  drawSprites();
}
function writePosition(x,y){
  var positionRef=db.ref("balloon/position");
  positionRef.set({
      x:balloon.x + x,
      y:balloon.y+y
  })
}
function showError(){
  console.log("Error has occured");
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}