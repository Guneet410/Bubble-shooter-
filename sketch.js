var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;



var lives =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  lifeheading = createElement("h1")
  scoreheading= createElement("h1")
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y=mouseY  

    if(keyDown ("space")){
      shootBullets();
    }
    
    if(frameCount % 80 === 0 )  {
      drawBlueBubbles();
    }

    if(frameCount % 100 === 0 )  {
      drawRedBubbles();
    }
 
    if(redBubbleGroup.isTouching(backBoard) ){
      lives = lives - 1;
      redBubbleGroup.destroyEach()
    }
    if(blueBubbleGroup.isTouching(backBoard)){
      blueBubbleGroup.destroyEach()
    lives=lives-1   }
 
    if(lives=== 0){
      gameState = 2
    }

    if(bulletGroup.isTouching(redBubbleGroup)){
       blast = createSprite(bullet.x,bullet.y,10,10);
       blast.addImage("burst", blastImg);    
       blast.scale = 0.2
       blast.lifetime = 20
 
       redBubbleGroup.destroyEach();
       bulletGroup.destroyEach();
       score = score+1
     }

    if(bulletGroup.isTouching(blueBubbleGroup)){
     blast = createSprite(bullet.x,bullet.y,10,10);
      blast.addImage("burst", blastImg);    
      blast.scale = 0.2
      blast.lifetime = 20
      score = score+5
      blueBubbleGroup.destroyEach();
      bulletGroup.destroyEach();
    }
   

    drawSprites();
  }


  if(gameState === 2){
lost()
  }
    
  lifeheading.html("Lives: " + lives)
  lifeheading.position(width - 250,20)
  
  scoreheading.html("Score: " + score)
  scoreheading.position(width - 250,50)


}

function shootBullets(){
  bullet = createSprite(gun.x,gun.y-35,20,20);
  bullet.addImage("bullets", bulletImg);
  bullet.scale= 0.2
  bullet.velocityX = 5
  gun.depth = bullet.depth+1
  bulletGroup.add(bullet);
  bulletGroup.setLifetimeEach(180)
}
function drawRedBubbles() 
{
  rBubble = createSprite(810 ,random(50,700),10,10)
  rBubble.addImage("red",redBubbleImg);
  rBubble.velocityX =-4  ;
  rBubble.scale = 0.08

  
  redBubbleGroup.add(rBubble);
  redBubbleGroup.setLifetimeEach(180)
}

function drawBlueBubbles() 
{
  bBubble = createSprite(810 ,random(50,700),10,10)
  bBubble.addAnimation("blue",blueBubbleImg);
  bBubble.velocityX =-4  ;
  bBubble.scale = 0.08

  blueBubbleGroup.add(bBubble);
  blueBubbleGroup.setLifetimeEach(180)
}

function lost(){
  swal ({

    title : `Game over`,
    text: "Oops you lost the game...!!!",
    text: "Your score is " + score,
    imageUrl :"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png", 
    imageSize : "100x100",
    confirmButtonText:"Thanks For Playing"
  }    )
}