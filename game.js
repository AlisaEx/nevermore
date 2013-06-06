require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation', 'plugins/loadImage!ChainsawBear.png', 'plugins/loadImage!Gunter.png', 'plugins/loadImage!KnifeBunny.png', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, bearImg, gunterImg, bunnyImg, keys){
  'use strict';
  var earthx = 260;
  var earthy = 200;
  var angularVelocity = .03;
  var angle = 0;

      //new sprite object maintian position, and velocities
  var bear = new Sprite({x:230, y:250, w:8640, h: 128, dx: 0, dy: 0});
  var gunter = new Sprite({x:600, y:300, w:100, h: 32, dx: 0, dy: 0});
  var bunny = new Sprite({x:430, y:470, w:896, h: 40, dx: 0, dy: 0});

  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');
  var simon = rm.loadImage('images/simon.png');


  // set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  bear.anim = Animation.prototype.createFromSheet(72, 100, bearImg, 120, 128);
  gunter.anim = Animation.prototype.createFromSheet(37, 100, gunterImg, 56, 32);
  bunny.anim = Animation.prototype.createFromSheet(16, 100, bunnyImg, 56, 40);


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
      bunny.update(millis);
      bear.update(millis);
      gunter.update(millis);
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
      bunny.draw(context);
      bear.draw(context);
      gunter.draw(context);
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(angle);
      context.drawImage(simon, 0, -earth.height/2-simon.height/2);
      context.restore();
    }
  });

  game.run();
});