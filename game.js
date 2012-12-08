//load the AMD modules we need
require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  var simonx = 100;
  var simony = 100;
  var simonSpeed = 2.5;

  //Resource Manager
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/backImg.png');
  var simon = rm.loadImage('images/simon.png');
  
  //GameCore
  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.SPACE);
    },
    handleInput: function(im){
      if (simony<(this.height-simon.height-2)){
       simony = simony + simonSpeed + 2;
      }

      if(im.keyActions[keys.LEFT_ARROW].isPressed() && simonx > 0){
        simonx-= simonSpeed;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed() && simonx < this.width){
        simonx+= simonSpeed;
      }

      if(im.keyActions[keys.SPACE].isPressed() && simony > 0){
        simony-= simonSpeed;
      }
    },

    //Update
    update: function(millis){
      
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(simon, simonx, simony);
    }
  });
  console.log(game);
  game.run();
});