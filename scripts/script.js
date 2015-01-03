// function drawPixels(x, y) {
//   for (var i = -10; i < 10; i+= 4) {
//     for (var j = -10; j < 10; j+= 4) {
//       if (Math.random() > 0.7) {
//         ctx.globalAlpha = 0.4;
//         ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 
//                          'light-blue', 'blue', 'purple'][getRandomInt(0,6)];
//         ctx.fillRect(x+i, y+j, 4, 4);
//       }
//     }
//   }
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var el = document.getElementById('c');
// var ctx = el.getContext('2d');

// ctx.lineJoin = ctx.lineCap = 'round';
// var isDrawing, lastPoint;

// el.onmousemove = function(e) {
//   if (!isDrawing) return;
  
//   drawPixels(e.clientX, e.clientY);
  
//   lastPoint = { x: e.clientX, y: e.clientY };
// };


var resizeCanvas = function () {
  var w = ($(window).width() - $("#header").width())/2;
  $("#header").css("left", w);
  $("#header").css("top", $(window).height()/2 - 100);

  w = ($(window).width() - $("#arrow").width())/2;
  $("#arrow").css("left", w);
  $("#arrow").css("top", $(window).height() - 124);
}

$(window).resize(resizeCanvas);

$(document).ready(function() {
  resizeCanvas();
  //isDrawing = true;
});
