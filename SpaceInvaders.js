// To Track Game Status
var score = 0;
var lives = 3;

// To Track Movement
var moveX = 0;
var moveY = 0;

var missiles = [];

function Missile(canvas, x, y)
{
	this.context = canvas.getContext("2d");
	this.x = x;
	this.y = y;

	// this.setUpInterval = function() {
	// 	this.y -= 10; 
	// }

	this.setUp = function() {
		window.setInterval(function() {this.y -= 10;},100);
	}
	//var intervalVar = 


	this.draw = function() {
		this.context.fillStyle = "yellow";
		this.context.fillRect(this.x + 18, this.y - 10,2,12);
		console.log(this.x + ", " + this.y);
	}
}

function addMissile() {


	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var missile = new Missile(canvas, moveX, moveY - 1);
	console.log(missile);
	//missile.draw();
	missile.setUp();
	missiles.push(missile);
	//missile.draw();
	drawBackground();
}

function Monster(canvas, x, y)
{
	this.context = canvas.getContext("2d");
	this.x = x;
	this.y = y;
}


function drawBackground()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var background = new Image();
	background.onload = function() {
		context.drawImage(background, 0, 0);
	}
	background.src = "earth.jpg";

	for (var i = 0; i < missiles.length; i++) {
		missiles[i].draw();
	}
}

function clearSelection () {
	if (document.selection)
		document.selection.empty();
	else if (window.getSelection)
		window.getSelection().removeAllRanges();
}


function scoreUpdate(score) {
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("SCORE: " + score, 1, 22);
}


function livesUpdate(lives) {
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
	var img = new Image();
	drawBackground();
	moveX = canvas.width / 2;
	moveY = canvas.height - 42;
	img.onload = function() {
		context.drawImage(img, moveX, moveY, 40, 40);
		scoreUpdate(score);
		livesUpdate(lives);
	}

	img.src = "cannon.png";
	document.onkeydown=keyPressed;

	clearSelection();
}


function keyPressed(e)
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");


	var img = new Image();

	if ((e.keyCode == 37) && (moveX >= 5))  {
		moveX -= 5;
	} else if ((e.keyCode == 39) && (moveX <= (canvas.width - 43))) {
		moveX += 5;
	/*} else if ((e.keyCode == 38) && (moveY >= 5))  {
		moveY -= 5;
	} else if ((e.keyCode == 40) && (moveY <= canvas.height - 42)) {
		moveY += 5;*/
	} else if (e.keyCode == 38) {
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

