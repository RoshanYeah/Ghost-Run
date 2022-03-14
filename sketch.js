var tower,towerImg;
var ghost,ghostImg;
var arrow,arrowImg,arrowGroup;
var invisibleWall1,invisibleWall2;
var gameState='start' 
var gameOver,restart;
var gameOverImg,restartImg
var score=0;
var startGame,startGameImg;

function preload(){  
  
towerImg = loadImage("tower.png")
ghostImg = loadImage("ghost-jumping-to-the-right.png")
arrowImg = loadImage("Fire_arrow_left.png")
gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")
startGameImg = loadImage("start-game.png")

}

function setup() {
  createCanvas(600,600)

  tower = createSprite(300,300)
  tower.addImage("tower",towerImg)
  tower.velocityX=-2

  ghost = createSprite(100,300,20,20)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.2

  invisibleWall1 = createSprite(300,70,600,10)
  invisibleWall2 = createSprite(300,530,600,10)

  gameOver = createSprite(300,300,20,20)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale = 0.7

  restart = createSprite(300,350,20,20)
  restart.addImage("restart",restartImg)
  restart.scale = 0.5

  startGame = createSprite(300,300,20,20)
  startGame.addImage("startGame",startGameImg)
  startGame.scale = 0.3

  arrowGroup = new Group()

 // ghost.debug = true
  ghost.setCollider("circle",0,0,40)
}

function draw() {
  background(0);
  
if(gameState==='start'){

if(tower.x<0){
  tower.x=300
}

arrowGroup.setVelocityXEach(0)
gameOver.visible=false
restart.visible=false
ghost.visible=false

if(mousePressedOver(startGame)){
start()
}

}

else if(gameState=='play'){
  if(tower.x<0){
    tower.x=300
  }

  score = score + Math.round(getFrameRate()/20)

  tower.velocityX = -(4+3*score/100)

  tower.velocityX = -2
  
  ghost.visible=true
  gameOver.visible=false
  restart.visible=false
  startGame.visible=false
  invisibleWall1.visible=false
  invisibleWall2.visible=false

  if(keyDown("UP_ARROW")){
    ghost.y=ghost.y-6
  }
  
  if(keyDown("DOWN_ARROW")){
    ghost.y=ghost.y+6
  }
  
  if(ghost.isTouching(invisibleWall1) || ghost.isTouching(invisibleWall2)){
    ghost.collide(invisibleWall1)
    ghost.collide(invisibleWall2)
  }

  spawnArrows()

  if(ghost.isTouching(arrowGroup)){
    gameState='end'
  }
  
}
else if(gameState==='end'){

  gameOver.visible=true
  restart.visible=true
  startGame.visible=false

tower.velocityX = 0

arrowGroup.setVelocityXEach(0)
arrowGroup.setLifetimeEach(-1)

if(mousePressedOver(restart)){
  reset()
}


}



  drawSprites()
  textSize(15)
  fill("white")
  text("Score: "+ score,500,20)
}


function spawnArrows(){
  if(frameCount%20===0){
    score.velocityX = -(6+score/100)  
    var arrow = createSprite(590,300,10,5)
    arrow.scale = 0.2
    arrow.y = Math.round(random(90,510))
    arrow.addImage("arrow", arrowImg)
    arrow.velocityX = -7
    arrow.lifetime = 300
    arrowGroup.add(arrow)

    arrowGroup.depth = gameOver.depth
    gameOver.depth = gameOver.depth +1

    arrowGroup.depth = restart.depth
    restart.depth = restart.depth +1
  }
}

function reset(){
  gameState='play'
  arrowGroup.destroyEach()
  score=0 
}

function start(){
  gameState='play'
}