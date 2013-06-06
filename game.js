require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation','plugins/loadImage!BMO.png', 'plugins/loadImage!ChainsawBear.png', 'plugins/loadImage!Gunter.png', 'plugins/loadImage!KnifeBunny.png', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, bmoImg, bearImg, gunterImg, bunnyImg, keys){
  'use strict';

      /// global variables ///
  var earthx = 260;
  var earthy = 200;
  var angularVelocity = .03;
  var angleSimon = 0;
  var angleBunny = 180;
  var angleGunter = 90;
  var angleBear = 265;
  var gameStart = false;


      /// new sprite object maintian position, and velocities ///
  var simon = new Sprite({x:0, y: -200, width: 544, height: 40, dx: 0, dy: 0})
  var bear = new Sprite({x:175, y:400, width:8520, height: 128, dx: 0, dy: 0});
  var gunter = new Sprite({x:640, y:300, width:100, height: 32, dx: 0, dy: 0});
  var bunny = new Sprite({x:460, y:540, width:896, height: 40, dx: 0, dy: 0});

      /// load images ///
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');


      /// set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  simon.anim = Animation.prototype.createFromSheet(10,100,bmoImg, 32,40)
  bear.anim = Animation.prototype.createFromSheet(71, 100, bearImg, 120, 128);
  gunter.anim = Animation.prototype.createFromSheet(37, 100, gunterImg, 56, 32);
  bunny.anim = Animation.prototype.createFromSheet(16, 100, bunnyImg, 56, 40);

      /// collision detection function ///
  function collides(a, b) {
    return a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;
  }
      /// converts degrees to radians for rotate function ///
  function degToRad(angle){
    return (angle*Math.PI)/180
  }

      ///create new gameCore instance ///
  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.ENTER);
    },

        /// handles input ///
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        angleSimon -= angularVelocity;
      }
      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angleSimon += angularVelocity;
      }
      if(im.keyActions[keys.ENTER].isPressed()){
        gameStart = true;
      }
    },

        /// updates the game state every millisecond ///
    update: function(millis){
      simon.update(millis);
      bunny.update(millis);
      bear.update(millis);
      gunter.update(millis);
    },
    draw: function(context){
      function rotate(sprite, angle){
        angle = degToRad(angle);
        context.save();
        context.translate(sprite.x, sprite.y);
        context.rotate(angle);
        context.translate(-(sprite.x), -(sprite.y));
        sprite.draw(context);
        context.restore();
      }
      // if (gameStart === false){
      //   context.drawImage(backImg,0,0, this.width, this.height);
      //   context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
      //   context.font = 'italic 28pt Calibri';
      //   context.fillStyle ='black';
      //   context.fillText('Welcome to Nevermore.', 300, backImg.height/2);
      //   context.fillText('Press ENTER to start.', 350, backImg.height/2 + 50);
      // }
      // else{
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
      rotate(bunny, angleBunny);
      rotate(bear, angleBear);
      rotate(gunter, angleGunter);
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(angleSimon);
      simon.draw(context);
      context.restore();
    // }
  }
  });

  game.run();
});