var dog,database,foodstock,foods
var dogimg,dogimg1,interiorimg

function preload()
{
	dogimg = loadImage('images/dogimg.png');
  interiorimg = loadImage('images/cottage.jpg');
  dogimg1 = loadImage('images/dogimg1.png');
}

function setup() {

  database = firebase.database();

  createCanvas(600,600);
  dog = createSprite(350,490,10,10);
  dog.scale=0.3;

 foodstock = database.ref('Food');
  foodstock.on("value",readStock);
}


function draw() {  

  background(interiorimg);

  dog.addImage(dogimg);

  if(keyWentDown(UP_ARROW)){
      writeStock(foods);

      dog.addImage(dogimg1);
  }
 
  drawSprites();
  textSize(30)
  fill("Yellow");
  stroke('black');
  strokeWeight(4)
  text("DogFood left : "+ foods,220,300);
  text("Press Up arrow to feed Tommy ",90,60);


}
function writeStock(x){

 
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
 
  database.ref('/').update({
    Food:x
  })
}

function readStock(data){

  foods=data.val();
}



