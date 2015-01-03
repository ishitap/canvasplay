/* adapted from http://perfectionkills.com/exploring-canvas-drawing-techniques/ */

var el = document.getElementById('c');
var ctx = el.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

tool.fixedDistance = 30;

var pixels = [];
var colors = ['red', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple'];
var densityInverse = 0.7;
var drawingEnabled = true;


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function drawPixels(x, y) {
  for (var i = -15; i < 15; i+= 4) {
    for (var j = -15; j < 15; j+= 4) {
      if (pixels.length > 10000)
        densityInverse = 0.9;
      if (Math.random() > densityInverse) {

        // update pixels data structure
        var pixel = new Pixel();
        pixel.x = x+i;
        pixel.y = y+j;
        pixel.color =  ctx.fillStyle = colors[getRandomInt(0,6)];
        pixels.push(pixel);

        // draw pixel
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x+i, y+j, 4, 4);
      }
    }
  }
}

function onMouseMove(event) {
  if (drawingEnabled)
    drawPixels(event.middlePoint.x, event.middlePoint.y);
}

//----

function Pixel ()
{
  this.scale = 1.0;
  this.x = 0;
  this.y = 0;
  this.color = "#000";
  this.velocityX = 0;
  this.velocityY = 0;
  this.target = 0;
  this.acceleration = 0.94

  this.update = function(ms)
  {
    this.x += this.velocityX * ms/1000.0;
    this.y += this.velocityY * ms/1000.0;

    this.velocityX *= this.acceleration;
    this.velocityY *= this.acceleration;
  };

  this.draw = function(ctx)
  {
    ctx.save();

    ctx.globalAlpha = 0.6
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 4, 4);

    ctx.restore();
  };
}

var cycles = 0
var myReq;
var rebound = false;

function update () {
  cycles++;


  // clear canvas
  ctx.globalAlpha=1;
  frameDelay = 1000/60;
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // update and draw particles
  for (var i=0; i<pixels.length; i++)
  {  
    var pixel = pixels[i];
    pixel.update(frameDelay);
    pixel.draw(ctx);
  }

  if (!rebound && cycles > 30) {
    for (var i = 0; i < pixels.length; i++) {
      pixels[i].velocityX = (pixels[i].x - ctx.canvas.width/2) * getRandomFloat(13,16);
      pixels[i].velocityY = (pixels[i].y - ctx.canvas.height/2) * getRandomFloat(13,16);
      pixels[i].acceleration = 1.02
      rebound = true;
    }
  }

  if (cycles < 10000) {
    myReq = requestAnimationFrame(update);
  }
}

var explode = function (e) {
  e.preventDefault();

  var cx_mean = ctx.canvas.width/2;
  var cy_mean = ctx.canvas.height/2;
  rebound = false;

  for (var i = 0; i < pixels.length; i++) {
    var r = getRandomFloat(2,4)

    var dest = getRandomPointOnCircle(cx_mean, cy_mean, getRandomInt(0,200));
    pixels[i].target = dest;

    pixels[i].velocityX = (dest.x - pixels[i].x) * r;
    pixels[i].velocityY = (dest.y - pixels[i].y) * r;
  }
  requestAnimationFrame(update);
  cancelAnimationFrame(myReq);
}

$("#arrow").click(function (e) {
  explode(e);

  $("#c").css("pointer-events", "none");
  drawingEnabled = false;

  // slide up letters
  window.setTimeout(function () {
    $("#header").animate({
      top: -40
    }, {duration: 700, queue: false});
    $("#subhead, #arrow").animate({
      opacity: 0
    }, {duration: 700, queue: false})
  }, 1500);

});


var getRandomPointOnCircle = function (cx, cy, r) {
  var theta = getRandomFloat(0, 2*Math.PI);
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return {x:cx+x, y:cy+y};
}