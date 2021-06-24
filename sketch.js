var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var survivalTime = 0;
var score;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyImage = loadAnimation("sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(400, 370);
  
  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("halt",monkeyImage);
  monkey.scale = 0.1;
  monkey.setCollider ("rectangle",0,0,250,580);
  monkey.debug = false;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
background(200);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,100,50);
  
  
  if (gameState===PLAY){
    
survivalTime =  Math.ceil(frameCount/frameRate());
    
    if(ground.x<0){
    ground.x = ground.width/2;
  }  
    
    if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);
    Food();
  Obstacle();
    
     if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    
  }

    
    else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("halt",monkeyImage);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
    }
   
  
  drawSprites();
  
}

function Food(){
  if(World.frameCount%80 === 0){
    banana = createSprite(375,400,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -6;
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}


function Obstacle(){
   if(World.frameCount%300 === 0){
     obstacle = createSprite(375,315,10,10);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.2;
     obstacle.velocityX = -5;
     obstacle.lifetime = 200;
     
     obstacleGroup.add(obstacle);
   }
}


