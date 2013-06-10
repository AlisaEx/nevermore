require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation', 'plugins/loadImage!BMO.png', 'plugins/loadImage!ChainsawBear.png', 'plugins/loadImage!Gunter.png', 'plugins/loadImage!KnifeBunny.png', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, bmoImg, bearImg, gunterImg, bunnyImg, keys){
  'use strict';

      /// global variables ///
  var angularVelocity = .03;
  var angleSimon = 0;
  var angleBunny = 180;
  var angleGunter = 90;
  var angleBear = 265;
  var gameStart = false;
    /// variable to save updated location for collision ///
  var newPosition = {
    x: 0,
    y: 0,
    width: 32,
    height: 40
  };
  var bearObj = {
    x: 175,
    y: 400,
    width: 120,
    height: 128
  };

      /// new sprite object maintian position, and velocities ///
  var simon = new Sprite({x:0, y: -200, width: 544, height: 40, dx: 0, dy: 0, collisionRadius: 32});
  var bear = new Sprite({x: 175, y: 400, width: 8520, height: 128, dx: 0, dy: 0, collisionRadius: 120});
  var gunter = new Sprite({x: 640, y: 300, width: 100, height: 32, dx: 0, dy: 0, collisionRadius: 56});
  var bunny = new Sprite({x: 460, y: 540, width: 896, height: 40, dx: 0, dy: 0, collisionRadius: 56});

      /// load images ///
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');


      /// set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  simon.anim = Animation.prototype.createFromSheet(10,100,bmoImg, 32,40)
  bear.anim = Animation.prototype.createFromSheet(71, 100, bearImg, 120, 128);
  gunter.anim = Animation.prototype.createFromSheet(37, 100, gunterImg, 56, 32);
  bunny.anim = Animation.prototype.createFromSheet(16, 100, bunnyImg, 56, 40);

      /// converts degrees to radians for rotate function ///
  function degToRad(angle){
    return (angle*Math.PI)/180;
  }
      /// updates the real-time position of the main character ///
  function getPosition(a, angle){
    if (simon.y <-200){
      a.x = (backImg.width/2)+(((earth.width/2)+10)*Math.cos(angle - degToRad(90)));
      a.y = (backImg.height/2)+(((earth.height/2)+10)*Math.sin(angle - degToRad(90)));
    }
    else{
      a.x = (backImg.width/2)+((earth.width/2)*Math.cos(angle - degToRad(90)));
      a.y = (backImg.height/2)+((earth.height/2)*Math.sin(angle - degToRad(90)));
    }
    return (a.x,a.y);
  }

      /// collision detection function ///
  function collides(a, b) {
    return a.x < b.x + b.collisionRadius && 
           a.x + a.width > b.x &&
           a.y < b.y + b.height && 
           a.y + a.height > b.y;
  }

      ///create new gameCore instance ///
  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ 
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.UP_ARROW);
      im.addKeyAction(keys.ENTER);
    },
        /// handles input ///
    handleInput: function(im){
      if (simon.y < -209){
        simon.y = -200;
      }
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        angleSimon -= angularVelocity;
      }
      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        angleSimon += angularVelocity;
      }
      if(im.keyActions[keys.UP_ARROW].isPressed()){
          simon.y -= 10;
      }
      if(im.keyActions[keys.ENTER].isPressed()){
        gameStart = true;
      }
    },
        /// updates the game state every millisecond ///
    update: function(millis){
      getPosition(newPosition, angleSimon);
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
      if (collides(newPosition, gunter)===true){
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText('Hello World.', gunter.x+10, gunter.y);
      }
      if (collides(newPosition, bunny)===true) {
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText('Why is there a knife on my head?', bunny.x, bunny.y+10);
      }
      if (collides(newPosition, bear)===true){
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText("I keep exploding and I don't know why", bear.x-10, bear.y);
      }
    // }
  }
  });
  game.run();
});