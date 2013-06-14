require(['frozen/GameCore', 'frozen/ResourceManager', 'frozen/Sprite', 'frozen/Animation', 'utils/degreesToRadians.js','plugins/loadImage!images/BMO.png', 'plugins/loadImage!images/ChainsawBear.png', 'plugins/loadImage!images/Gunther.png', 'plugins/loadImage!images/KnifeBunny.png', 'plugins/loadSound!/sounds/guntherNoise.mp3', 'dojo/keys'],
  function(GameCore, ResourceManager, Sprite, Animation, degreesToRadians, bmoImg, bearImg, guntherImg, bunnyImg, guntherSnd, keys){
  'use strict';

      /// global variables ///
  var gameStart       = false;
  var updateables     = [];
  var rotateables     = [];
  var collidables     = [];
  var playCnt         = 0;

      /// declare entities ///
  var simon  = {
    sprite: new Sprite({x:0, y: -200, width: 544, height: 40, dx: 0, dy: 0, collisionRadius: 32}),
    angularVelocity: 0.03,
    angle: 0,
    translatedPosition: {x: 0, y: 0, width: 32, height: 40},
    drawImg: function(context){
      context.save();
      context.translate(backImg.width/2, backImg.height/2);
      context.rotate(simon.angle);
      simon.sprite.draw(context);
      context.restore();      
    }
  };
  var gunther = {
    sprite: new Sprite({x: 640, y: 300, width: 100, height: 32, dx: 0, dy: 0, collisionRadius: 56}),
    angle: 90,
    doesCollide: function (context){
      context.font = 'italic 12pt Calibri';
      context.fillStyle = 'black';
      context.fillText('Meep.', gunther.sprite.x+10, gunther.sprite.y);}
  };
  var bunny  = {
    sprite: new Sprite({x: 460, y: 540, width: 896, height: 40, dx: 0, dy: 0, collisionRadius: 56}),
    angle: 180,
    doesCollide: function (context){
      context.font = 'italic 12pt Calibri';
      context.fillStyle = 'black';
      context.fillText('Why is there a knife on my head?', bunny.sprite.x, bunny.sprite.y+10);}
  };
  var bear   = {
  sprite: new Sprite({x: 175, y: 400, width: 8520, height: 128, dx: 0, dy: 0, collisionRadius: 120}),
  angle: 265,
  doesCollide: function (context){
    context.font = 'italic 12pt Calibri';
    context.fillStyle = 'black';
    context.fillText("Why do I keep exploding?", bear.sprite.x-10, bear.sprite.y);}
  };
      /// push objects to their respective arrays ///
  collidables.push(gunther);collidables.push(bunny);collidables.push(bear);
  updateables.push(simon);updateables.push(gunther);updateables.push(bunny);updateables.push(bear);
  rotateables.push(gunther);rotateables.push(bunny);rotateables.push(bear);

      /// Resource Manager ///
  var rm = new ResourceManager({
    imageDir: 'images/'
  });
      /// Load Images ///
  var backImg = rm.loadImage('background.png');
  var earth = rm.loadImage('outterRim.png');

      /// set the sprite animation to use 8 frames, 100 millis/frame, spritesheet, 96x96 pixels
  simon.sprite.anim = Animation.prototype.createFromSheet(10,100,bmoImg, 32,40)
  bear.sprite.anim = Animation.prototype.createFromSheet(71, 100, bearImg, 120, 128);
  gunther.sprite.anim = Animation.prototype.createFromSheet(37, 100, guntherImg, 56, 32);
  bunny.sprite.anim = Animation.prototype.createFromSheet(16, 100, bunnyImg, 56, 40);

      /// updates the real-time position of the main character ///
  function getPosition(a, angle){
    if (simon.sprite.y <-200){
      a.x = (backImg.width/2)+(((earth.width/2)+10)*Math.cos(angle - degreesToRadians(90)));
      a.y = (backImg.height/2)+(((earth.height/2)+10)*Math.sin(angle - degreesToRadians(90)));
    }
    else{
      a.x = (backImg.width/2)+((earth.width/2)*Math.cos(angle - degreesToRadians(90)));
      a.y = (backImg.height/2)+((earth.height/2)*Math.sin(angle - degreesToRadians(90)));
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
        simon.angle -= simon.angularVelocity;
      }
      if(im.keyActions[keys.RIGHT_ARROW].isPressed() && gameStart === true){
        simon.angle += simon.angularVelocity;
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
      getPosition(simon.translatedPosition, simon.angle);
      updateables.forEach(function(entity){
        entity.sprite.update(millis);
      })
      if (collides(simon.translatedPosition, gunther.sprite)===true && playCnt < 1){
        guntherSnd.play();
        playCnt = 1;
      }
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
      rotateables.forEach(function rotate(entity){
          context.save();
          context.translate(entity.sprite.x, entity.sprite.y);
          context.rotate(degreesToRadians(entity.angle));
          context.translate(-(entity.sprite.x), -(entity.sprite.y));
          entity.sprite.draw(context);
          context.restore();
        })
      simon.drawImg(context);
      collidables.forEach(function(entity){
        if (collides(simon.translatedPosition, entity.sprite)===true){
            entity.doesCollide(context);
          }
      })
    }
  },
  });
  game.run();
});