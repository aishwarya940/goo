class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
    this.distanceX = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  getxPos(){
  var playerCountRef = database.ref('posX'); 
  playerCountRef.on("value",(data)=>{ 
  posX = data.val();
  })
 } 
 
 updatexPos(Pos){ 
 database.ref('/').update({ 
   posX: Pos 
    });
   }

 update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      distanceX : this.distanceX
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd(){
    var CarsAtEnd = database.ref('CarsAtEnd');
    CarsAtEnd.on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updateCarsAtEnd(rank){
    database.ref('/').update({
      CarsAtEnd : rank
    })
  }
}
