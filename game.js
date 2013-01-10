
require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  var simonx = 400;
  var simony = 193;
  var rimx = 260;
  var rimy = 200;
  var simonSpeed = 2.5;
  var angularVelocity = .03;
  var angle = 0;


  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var rim = rm.loadImage('images/outterRim.png');
  var simon = rm.loadImage('images/simon.png');
  rim.x = 442;
  rim.y = 382;
  
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
        angle -= angularVelocity;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angle += angularVelocity;
      }

      // if(im.keyActions[keys.SPACE].isPressed()){
      //   simony-= simonSpeed;
      // }
    },
    update: function(millis){
      
    },
    draw: function(context, scale){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(rim, 260, 200);
      context.save();
      context.translate(rim.x+rimx*scale, rim.y+rimy*scale);
      context.rotate(angle);
      context.drawImage(simon, simonx, simony);
      context.translate(-(rim.x+rimx*scale), -(rim.y+rimy*scale));
      context.restore();
    }
  });


  game.run();
});