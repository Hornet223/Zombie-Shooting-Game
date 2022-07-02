var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var heartImg, heart2Img, heart3Img;
var explosion_sound, lose_sound, win_sound;
var bat;
var bullet;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  
  explosion_sound = loadSound("assets/explosion.mp3")
  lose_sound = loadSound("assets/lose.mp3")
  win_sound = loadSound("assets/win.mp3")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  heartImg = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  batImg = loadAnimation("assets/bat1_png.png", "assets/bat2.0_png.png")

  bulletImg = loadImage("assets/bullet.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bat = createSprite(565, 80);
   bat.addAnimation("bat", batImg);
   bat.scale = 0.5;
   bat.frameDelay = 10;

   bullet = createSprite(player.x, player.y, 20, 10);
   bullet.visible = false;
}

function draw() {
  background(0); 

  if(keyDown("RIGHT_ARROW")){
    bullet.velocityX = 4;
  }

  bullet.x = player.x;
  bullet.y = player.y;

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 20
  player.changeImage(shooter_shooting)
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies()

drawSprites();

}
function spawnZombies(){
  if(frameCount % 80 === 0){
    var zombie = createSprite(windowWidth - 50, random(400,700),50,50);
    zombie.addImage(zombieImg);
    zombie.velocityX = -8;
    zombie.scale = 0.15;

  }
}