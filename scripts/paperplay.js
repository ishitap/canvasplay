project.currentStyle.fillColor = 'black';

path = new Path();
path.fullySelected = true;
path.fillColor = 'white';

var maxLength = 15;

tool.fixedDistance = 30;

var colors = ['red', 'orange', 'yellow', 'green', 
                         'light-blue', 'blue', 'purple'];

var rectangles = [];

for (var i = 0; i < colors.length; i++) {
	var rectPath = new Path.Rectangle(0, 0,4,4);
	rectPath.fillColor = colors[i];
	rectPath.opacity = 0.6;
	var symbol = new Symbol(rectPath);
	rectangles.push(symbol);
}

var push_array = [];


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawPixels(event) {
	var x = event.middlePoint.x;
	var y = event.middlePoint.y;

  var pixels = [];

  for (var i = -15; i < 15; i+= 4) {
    for (var j = -15; j < 15; j+= 4) {
      if (Math.random() > 0.6) {
      	var placed = rectangles[getRandomInt(0,6)].place(new Point(x+i, y+j));
        pixels.push(placed);
      }
    }
  }

  push_array.unshift(pixels);
  if(push_array.length == maxLength) {
    var toRemove = push_array.pop();
    for(var i = 0; i < toRemove.length; i++) {
      toRemove[i].remove();
    }
  }
}

function onMouseMove(event) {
	drawPixels(event);
}
