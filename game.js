require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation', 'plugins/loadImage!BMO.png', 'plugins/loadImage!ChainsawBear.png', 'plugins/loadImage!Gunter.png', 'plugins/loadImage!KnifeBunny.png', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, bmoImg, bearImg, gunterImg, bunnyImg, keys){
  'use strict';

      /// global variables ///
  var angularVelocity = .03;
  var gameStart = false;
  var updateables = [];
  var rotateables = [];


      /// declare entities ///
  var simon = {
    sprite: new Sprite({x:0, y: -200, width: 544, height: 40, dx: 0, dy: 0, collisionRadius: 32}),
    angle: 0
  };
  var bear = {
    sprite: new Sprite({x: 175, y: 400, width: 8520, height: 128, dx: 0, dy: 0, collisionRadius: 120}),
    angle: 265
  };
  var gunter = {
    sprite: new Sprite({x: 640, y: 300, width: 100, height: 32, dx: 0, dy: 0, collisionRadius: 56}),
    angle: 90
  };
  var bunny = {
    sprite: new Sprite({x: 460, y: 540, width: 896, height: 40, dx: 0, dy: 0, collisionRadius: 56}),
    angle: 180
  };
  var newPosition = {x: 0, y: 0, width: 32, height: 40};
  updateables.push(simon);updateables.push(bear);updateables.push(gunter);updateables.push(bunny);
  rotateables.push(bear);rotateables.push(gunter);rotateables.push(bunny);
      /// load images ///
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var earth = rm.loadImage('images/outterRim.png');


      /// set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  simon.sprite.anim = Animation.prototype.createFromSheet(10,100,bmoImg, 32,40)
  bear.sprite.anim = Animation.prototype.createFromSheet(71, 100, bearImg, 120, 128);
  gunter.sprite.anim = Animation.prototype.createFromSheet(37, 100, gunterImg, 56, 32);
  bunny.sprite.anim = Animation.prototype.createFromSheet(16, 100, bunnyImg, 56, 40);

      /// converts degrees to radians for rotate function ///
  function degToRad(angle){
    return (angle*Math.PI)/180;
  }
      /// updates the real-time position of the main character ///
  function getPosition(a, angle){
    if (simon.sprite.y <-200){
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
      if (simon.sprite.y < -209){
        simon.sprite.y = -200;
      }
      if(im.keyActions[keys.LEFT_ARROW].isPressed() && gameStart === true){
        simon.angle -= angularVelocity;
      }
      if(im.keyActions[keys.RIGHT_ARROW].isPressed() && gameStart === true){
        simon.angle += angularVelocity;
      }
      if(im.keyActions[keys.UP_ARROW].isPressed()){
          simon.sprite.y -= 10;
      }
      if(im.keyActions[keys.ENTER].isPressed()){
        gameStart = true;
      }
    },
        /// updates the game state every millisecond ///
    update: function(millis){
      getPosition(newPosition, simon.angle);
      updateables.forEach(function(entity){
        entity.sprite.update(millis);
      })
    },
    draw: function(context){
      if (gameStart === false){
        context.drawImage(backImg,0,0, this.width, this.height);
        context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
        context.font = 'italic 28pt Calibri';
        context.fillStyle ='white';
        context.fillText('Welcome to Nevermore.', 300, backImg.height/2);
        context.fillText('Press ENTER to start.', 350, backImg.height/2 + 50);
      }
      else{
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(earth, backImg.width/2-earth.width/2, backImg.height/2-earth.height/2);
      // rotate(bunny.sprite, bunny.angle);
      // rotate(bear.sprite, bear.angle);
      // rotate(gunter.sprite, gunter.angle);
      rotateables.forEach(
        function rotate(entity){
          entity.angle = degToRad(entity.angle);
          context.save();
          context.translate(entity.sprite.x, entity.sprite.y);
          context.rotate(entity.angle);
          context.translate(-(entity.sprite.x), -(entity.sprite.y));
          entity.sprite.draw(context);
          context.restore();
        })
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(simon.angle);
      simon.sprite.draw(context);
      context.restore();
      if (collides(newPosition, gunter.sprite)===true){
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText('Hello World.', gunter.x+10, gunter.y);
      }
      if (collides(newPosition, bunny.sprite)===true) {
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText('Why is there a knife on my head?', bunny.x, bunny.y+10);
      }
      if (collides(newPosition, bear.sprite)===true){
        context.font = 'italic 12pt Calibri';
        context.fillStyle = 'black';
        context.fillText("I keep exploding and I don't know why", bear.x-10, bear.y);
      }
    }
  }
  });
  game.run();
});