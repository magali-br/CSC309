// To Track Game Status
var score = 0;
var lives = 3;

// To track the movement of the cannon
var moveX = 0;
var moveY = 0;

var cannonImg;
var backgroundImg;

var missiles = [];
var monsters = [];


function drawBackground()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");

	context.drawImage(backgroundImg, 0, 0);
	for (var i = 0; i < missiles.length; i++) {
		missiles[i].draw();
		for (var j = 0; j < monsters.length; j++) {
			if ( (monsters[j].x <= missiles[i].x) 
				&& (missiles[i].x <= (monsters[j].x + monsters[j].width) ) ) {
				//&& ( (monsters[j].y + monsters[j].height) == missiles[i].height) ) {

				// remove missile
				window.clearInterval(missiles[i].intervalVar);
				missiles.splice(i, 1);

				// remove monster
				window.clearInterval(monsters[j].intervalVar);
				monsters.splice(j, 1);


				// maybe change number of rows or columns
			}
		}
	}

	for (var i = 0; i < monsters.length; i++) {
		monsters[i].draw();
		console.log(monsters[i]);
	}

	context.drawImage(cannonImg, moveX, moveY, 40, 40);
	scoreUpdate(score);
	livesUpdate(lives);


}

function clearSelection () 
{
	if (document.selection)
		document.selection.empty();
	else if (window.getSelection)
		window.getSelection().removeAllRanges();
}


function scoreUpdate(score) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("SCORE: " + score, 1, 22);
}


function livesUpdate(lives) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("LIVES: " + lives + "X", 650, 22);
}


function playGame()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	cannonImg = new Image();
	moveX = canvas.width / 2;
	moveY = canvas.height - 42;
	missiles = [];
	monsters = [];

	backgroundImg = new Image();
	backgroundImg.onload = function() {
		drawBackground();

	}
	backgroundImg.src = "earth.jpg";

	cannonImg.onload = function() {
		drawBackground();
	}
	cannonImg.src = "cannon.png";

	var monster1 = new BlueMonster(canvas, 50, 50);
	addMonster(canvas, monster1);

	var monster2 = new RedMonster(canvas, 100, 50);
	addMonster(canvas, monster2);

	var monster3 = new YellowMonster(canvas, 150, 50);
	addMonster(canvas, monster3);

	document.onkeydown=keyPressed;
	window.setInterval("drawBackground()", 100);

	clearSelection();
}


function keyPressed(e)
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");


	var img = new Image();

	if ((e.keyCode == 37) && (moveX >= 5))  {
		moveX -= 10;
	} else if ((e.keyCode == 39) && (moveX <= (canvas.width - 43))) {
		moveX += 10;
	/*} else if ((e.keyCode == 38) && (moveY >= 5))  {
		moveY -= 5;
	} else if ((e.keyCode == 40) && (moveY <= canvas.height - 42)) {
		moveY += 5;*/
	} else if (e.keyCode == 32 || e.keycode == 38) {
		addMissile();
	} else {
		return;
	}
	drawBackground();
	img.onload = function() {
		context.drawImage(img, moveX, moveY, 40, 40);
		scoreUpdate(score);
		livesUpdate(lives);
	}

	img.src = "cannon.png";

}

