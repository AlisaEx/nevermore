require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){
  var earthx = 260;
  var earthy = 200;
  var simonSpeed = 2.5;
  var angularVelocity = .05;
  var angle = 0;


  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');
  var simon = rm.loadImage('images/simon.png');
  
  var simonx = (-(earthx-(earth.width/2)));
  var simony = (-(earthy-(earth.height/2)));

  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
    },
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        angle -= angularVelocity;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angle += angularVelocity;
        console.log(-(earthx-(earth.width/2)));
      }

    },
    update: function(millis){
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(earth, earthx, earthy);
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(angle);
      context.drawImage(simon,((earthx/2)-(earth.width/2)),((earthy/2)-(earth.height/2)));
      context.translate(-(backImg.width/2), -(backImg.height/2));
      context.restore();
    }
  });

  game.run();
});