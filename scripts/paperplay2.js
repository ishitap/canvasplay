/* adapted from http://perfectionkills.com/exploring-canvas-drawing-techniques/ */

tool.fixedDistance = 30;
var pixels = [];

function drawPixels(x, y) {
  for (var i = -15; i < 15; i+= 4) {
    for (var j = -15; j < 15; j+= 4) {
      if (Math.random() > 0.7) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 
                         'light-blue', 'blue', 'purple'][getRandomInt(0,6)];
        ctx.fillRect(x+i, y+j, 4, 4);
      }
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');

ctx.lineJoin = ctx.lineCap = 'round';
var lastPoint;

function onMouseMove(event) {
  drawPixels(event.middlePoint.x, event.middlePoint.y);
}

//----

function Particle ()
{
  this.scale = 1.0;
  this.x = 0;
  this.y = 0;
  this.radius = 20;
  this.color = "#000";
  this.velocityX = 0;
  this.velocityY = 0;
  //this.scaleSpeed = 0.5;

  this.update = function(ms)
  {
    // shrinking
    //this.scale -= this.scaleSpeed * ms / 1000.0;

    if (this.scale <= 0)
    {
      this.scale = 0;
    }
    // moving away from explosion center
    this.x += this.velocityX * ms/1000.0;
    this.y += this.velocityY * ms/1000.0;
  };

  this.draw = function(context2D)
  {
    // translating the 2D context to the particle coordinates
    context2D.save();
    context2D.translate(this.x, this.y);

    context2D.fillStyle = this.color;
    context2D.fillRect(this.x, this.y, 4, 4);

    context2D.restore();
  };
}