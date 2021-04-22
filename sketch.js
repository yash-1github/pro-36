var dog,sadDog,happyDog, db;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  db=firebase.database();
  createCanvas(1000,400);
  
  
  foodObj = new Food();


  foodStock=db.ref('Food');
  foodStock.on("value",readStock);
  

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedTheDog=createButton("Feed The Dog");
  FeedTheDog.position(400,95);
  FeedTheDog.mousePressed(feedDog);
  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  db.ref("FeedTime").on("value", feedingtime)
  
 
  //write code to display text lastFed time here
  lastFed = hour();

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
 
  foodS = foodS-1; 
  db.ref('/').update({
Food : foodS


  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}

function feedingtime(data){
store = data.val();
time = store.FeedTime;
}

function updatetime(){
  db.ref("FeedTime").update({
   time : lastFed
  })  
}