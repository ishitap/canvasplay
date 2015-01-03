var resizeCanvas = function () {
  var w = ($("#first").width() - $("#header").width())/2;
  $("#header").css("left", w);
  $("#header").css("top", $("#first").height()/2 - 100);

  w = ($(window).width() - $("#arrow").width())/2;
  $("#arrow").css("left", w);
  $("#arrow").css("top", $("#first").height() - 124);
}

$(window).resize(resizeCanvas);

$(document).ready(function() {

	$("#arrow").click(function(e) {
	 e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#second").offset().top
    }, {duration: 600, queue: false});

    $("#first").animate({
    	opacity:1
    }, {duration: 600, queue: false});

	});
  resizeCanvas();
});

//-----

