/* adapted from http://perfectionkills.com/exploring-canvas-drawing-techniques/ */

tool.fixedDistance = 30;

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

// el.onmousemove = function(e) {
//   drawPixels(e.clientX, e.clientY);
//   lastPoint = { x: e.clientX, y: e.clientY };
// };