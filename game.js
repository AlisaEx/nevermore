require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  // var simonx = (rimx.height/2-simon.height);
  // var simony = -130;
  var rimx = 260;
  var rimy = 200;
  var simonSpeed = 2.5;
  var angularVelocity = .03;
  var angle = 0;


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
        angle -= angularVelocity;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angle += angularVelocity;
        console.log(simon.x);
      }

    },
    update: function(millis){
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(rim, rimx, rimy);
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(angle);
      context.drawImage(simon, -(rim.height/2-simon.height), -(rim.width/2-simon.width));
      context.translate(-(rim.width/2), -(rim.height/2));
      context.restore();
    }
  });

  game.run();
});