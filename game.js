require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation', 'plugins/loadImage!Gunter.png', 'plugins/loadImage!KnifeBunny.png', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, gunterImg, bunnyImg, keys){
  'use strict';
  var earthx = 260;
  var earthy = 200;
  var angularVelocity = .03;
  var angle = 0;

      //new sprite object maintian position, and velocities
  // var bear = new Sprite({x:100,y:300, w:90, h: 128, dx: 0, dy: 0});
  var gunter = new Sprite({x:100,y:100, w:120, h: 128, dx: 0, dy: 0});
  var bunny = new Sprite({x:500,y:100, w:120, h: 128, dx: 0, dy: 0});

  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');
  var simon = rm.loadImage('images/simon.png');


  // set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  // bear.anim = Animation.prototype.createFromSheet(8, 100, bearImg, 96, 96, 10);
  gunter.anim = Animation.prototype.createFromSheet(8, 100, gunterImg, 96, 96);
  bunny.anim = Animation.prototype.createFromSheet(8, 100, bunnyImg, 96, 96);


  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.ENTER);
    },
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        angle -= angularVelocity;
      }
      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angle += angularVelocity;
      }

    },
    update: function(millis){
      // bear.update(millis);
      gunter.update(millis);
      bunny.update(millis);
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
      // bear.draw(context);
      gunter.draw(context);
      bunny.draw(context);
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(angle);
      context.drawImage(simon, 0, -earth.height/2-simon.height/2);
      context.restore();
    }
  });

  game.run();
});