class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
        player.getxPos();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale = 0.4;
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.scale = 0.5;
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car3.scale = 0.4;
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    car4.scale = 0.5;
    cars = [car1, car2, car3, car4];
    rock1 = createSprite(200,200,10,10);
    rock1.addImage("rock1",rockImg);
    rock1.scale = 0.7;
    rock2 = createSprite(800,400,10,10);
    rock2.addImage("rock2",rockImg);
    rock2.scale = 0.7;

    rock1.debug = true;
    car1.debug = true;

    rock1.setCollider("circle",0,0,120);
    rock2.setCollider("circle",0,0,120);
    car1.setCollider("circle",0,0,80);
    car2.setCollider("circle",0,0,80);
    car3.setCollider("circle",0,0,80);
    car4.setCollider("circle",0,0,80);

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(backgroundImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
      if(frameCount%40==0){
        var coin = createSprite(random(0,displayWidth),random(0,displayHeight),10,10);
        coin.addImage("Coin",coinsImg);
        coin.scale = 0.08;
      }
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,120,120);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

        car1.collide(rock1);
        car1.collide(rock2);
        car2.collide(rock1);
        car2.collide(rock2);
        car3.collide(rock1);
        car3.collide(rock2);
        car4.collide(rock1);
        car4.collide(rock2);

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position);
      }

      if(keyCode === 32){
        bullets = createSprite(x,y,10,5);
        bullets.velocityY = -3;
     }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){ 
    //cars[index-1].x=cars [index-1].x-10
     player.distanceX=player.distanceX-10 
     player.update();
     } 
     
     if(keyIsDown(RIGHT_ARROW) && player.index !== null){ 
       //cars[index-1].x=cars [index-1].x-10 
       player.distanceX=player.distanceX+10 
       player.update(); 
      }

    if(player.distance > 4200){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
