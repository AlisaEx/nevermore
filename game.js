
require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  var simonx = 400;
  var simony = 195;
  var simonSpeed = 2.5;


  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var rim = rm.loadImage('images/outterRim.png');
  var simon = rm.loadImage('images/simon.png');
  
  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.SPACE);
      im.addKeyAction(keys.ENTER);
    },
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        x-= simonSpeed;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        x+= simonSpeed;
      }

      if(im.keyActions[keys.SPACE].isPressed()){
        y-= simonSpeed;
      }
    },
    update: function(millis){
      
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(rim, 260,200);
      context.drawImage(simon, simonx, simony);
    }
  });


  game.run();
});