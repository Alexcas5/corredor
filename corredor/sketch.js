var ghost, ghostp,fantasma;
var door, tower, climber;
var puerta,torre,barra;
 var puertag;
var invisibleBlockGroup, invisibleBlock; 
var gamestate="play";
var sound;
function preload(){
 torre=loadImage("tower.png");
  puerta=loadImage("door.png");
  puertag=new Group();
  barra=loadImage("climber.png");
  barrag=new Group();
  ghost=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("torre",torre);
  tower.velocityY=4;
  fantasma=createSprite(300,400,50,50);
  fantasma.addImage("ghost",ghost);
  fantasma.scale=0.4;
  invisibleBlockGroup=new Group(); 
    sound.loop();
}

function draw(){
  background(0);
  if(gamestate==="play"){
  if(tower.y>400){
    tower.y=300;
  }

  if(keyDown("w")){
    fantasma.velocityY=-3; 
    
  }
  fantasma.velocityY=fantasma.velocityY+0.8;
  
  if(keyDown("a")){
    fantasma.x=fantasma.x-2;
  }
  
  if(keyDown("d")){
    fantasma.x=fantasma.x+2;
  }
  if(fantasma.isTouching(barrag)){
    fantasma.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(fantasma) || fantasma.y > 600) { 
    fantasma.destroy(); 
  gamestate="over";
  } 
    spawndoors();
  }
  drawSprites();
  if(gamestate==="over"){
 
    stroke("yellow");
    fill("red");
    textSize(100);  
    text("Game Over",10,300);
  }
console.log(gamestate);
  
  
}

function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("puerta",puerta);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    puertag.add(door);
    
    climber=createSprite(200,10);
    climber.addImage("barra",barra);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    barrag.add(climber);
    
    invisibleBlock = createSprite(200,15); 
    invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    fantasma.depth=door.depth;
    fantasma.depth=fantasma.depth+1;
  } 

}


