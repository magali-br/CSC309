// To Track Game Status
var score = 0;
var lives = 3;

// To track the movement of the cannon
var moveX = 0;
var moveY = 0;

var cannonImg;
var backgroundImg;

var missiles = [];

function Missile(canvas, x, y)
{
	this.context = canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.intervalVar;


	 // this.setUp = function() {
	 // 	window.setInterval(function() {console.log("the old y is" + this.y), \
	 // 		this.y -= 10; console.log("the new y is " + this.y); },1000);
	 // }



	this.draw = function() {
		this.context.fillStyle = "yellow";
		this.context.fillRect(this.x, this.y, 2, 9);
		console.log(this.x + ", " + this.y);
	}
}

function addMissile() {


	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var missile = new Missile(canvas, moveX + 18, moveY - 12);
	console.log(missile);

	//missile.setUp();
	missiles.push(missile);
	missile.intervalVar = window.setInterval(function() {
				console.log("the old y is" + missile.y); 
				missile.y -= 10; 
				console.log("the new y is " + missile.y); 
				if (missile.y <= 0) {
					var index = missiles.indexOf(missile);
					if (index > -1) {
						missiles.splice(index, 1);
						console.log("Missile removed");
						window.clearInterval(missile.intervalVar);
					}
				}
			}, 100);
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

	context.drawImage(backgroundImg, 0, 0);
	for (var i = 0; i < missiles.length; i++) {
		//missiles[i].y -= 10;
		missiles[i].draw();
	}

	context.drawImage(cannonImg, moveX, moveY, 40, 40);
	scoreUpdate(score);
	livesUpdate(lives);


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
	cannonImg = new Image();
	//drawBackground();
	moveX = canvas.width / 2;
	moveY = canvas.height - 42;

	backgroundImg = new Image();
	backgroundImg.onload = function() {
		drawBackground();

	}
	backgroundImg.src = "earth.jpg";
	
	cannonImg.onload = function() {
		drawBackground();
	}

	cannonImg.src = "cannon.png";
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
		moveX -= 5;
	} else if ((e.keyCode == 39) && (moveX <= (canvas.width - 43))) {
		moveX += 5;
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

