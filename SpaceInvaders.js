var moveX = 0;

function drawBackground()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var background = new Image();
	background.onload = function() {
		context.drawImage(background, 0, 0);
	}
	background.src = "earth.jpg";

}


function playGame()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var img = new Image();
	drawBackground();
	moveX = canvas.width / 2;
	img.onload = function() {
		context.drawImage(img, moveX, (canvas.height - 42), 40, 40);
	}

	img.src = "cannon.png";
	document.onkeydown=keyPressed;
}


function keyPressed(e)
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");


	document.getElementById('info').innerHTML = canvas.width + ", moveX;" + moveX;

	var img = new Image();

	if ((e.keyCode == 37) && (moveX >= 5))  {
		moveX -= 5;
	} else if ((e.keyCode == 39) && (moveX <= (canvas.width - 43))) {
		moveX += 5;
	/*} else if ((e.keyCode == 38) && (moveY >= 5))  {
		moveY -= 5;
	} else if ((e.keyCode == 40) && (moveY <= canvas.height - 42)) {
		moveY += 5;*/
	} else {
		return;
	}
	drawBackground();
	img.onload = function() {
		context.drawImage(img, moveX, (canvas.height - 42), 40, 40);
	}

	img.src = "cannon.png";

}