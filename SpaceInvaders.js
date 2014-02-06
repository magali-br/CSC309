// To Track Game Status
var score;
var lives;
var level;
var monsterSpeed;
var monsterMissileTimeInterval;

// To track the movement of the cannon
var cannonX = 0;
var cannonY = 0;
var cannonImageWidth = 40;
var cannonImageHeight = 40;

var cannonImg;
var backgroundImg;

var missiles = [];
var monsterMissiles = [];
var monsters = [];

var isShooting = false;


function drawBackground()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");

	context.drawImage(backgroundImg, 0, 0);
	for (var i = 0; i < missiles.length; i++) {
		missiles[i].draw();
		for (var j = 0; j < monsters.length; j++) {
			if (missileHitMonster(missiles[i], monsters[j])) {

				// remove missile
				removeMissile(missiles, i);
				removeMonster(j);

				if (isShooting) {
					addCannonMissile();
				}
			}

		}
	}

	for (var i = 0; i < monsterMissiles.length; i++) {
		monsterMissiles[i].draw();
		if (missileHitCannon(monsterMissiles[i])) {
			lives -= 1;
			if (lives == 0) {
				gameOver();
			}
			cannonX = canvas.width / 2;
			missiles = [];
			monsterMissiles = [];
		}
	}

	for (var i = 0; i < monsters.length; i++) {
		monsters[i].draw();
	}

	context.drawImage(cannonImg, cannonX, cannonY, cannonImageWidth, cannonImageHeight);
	scoreUpdate(score);
	livesUpdate(lives);
	levelUpdate(level);

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

function levelUpdate(level) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("LEVEL: " + level, 1, 50);
}


function playGame()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	resetGame();

	backgroundImg = new Image();
	backgroundImg.onload = function() {
		drawBackground();

	}
	backgroundImg.src = "earth.jpg";

	cannonImg = new Image();
	cannonImg.onload = function() {
		drawBackground();
	}
	cannonImg.src = "cannon.png";

	document.onkeydown = keyPressed;
	document.onkeyup = keyReleased;
	window.setInterval("drawBackground()", 50);

	clearSelection();
}

function resetGame()
{
	level = 1;
	score = 0;
	lives = 3;
	monsterSpeed = 800;
	monsterMissileTimeInterval = 100;
	if (monsterIntervalVar) window.clearInterval(monsterIntervalVar);
	if (monsterFireIntervalVar) window.clearInterval(monsterFireIntervalVar);
	resetImage();
}

function resetImage()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	cannonX = canvas.width / 2;
	cannonY = canvas.height - 42;
	missiles = [];
	monsters = [];
	monsterMissiles = [];
	setupMonsters(canvas, monsterSpeed);
}

function nextLevel()
{
	monsterSpeed = monsterSpeed - 200;
	level += 1;
	if (level == 5) {
		alert("You Won The Game! Your Score Is " + score + "!");
		resetGame();
	} else {
		resetImage();
	}
}

function gameOver()
{
	alert("Game Over!");
	resetGame();
}


function keyPressed(e)
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");


	var img = new Image();

	if ((e.keyCode == 37) && (cannonX >= 5))  {
		cannonX -= 10;
	} else if ((e.keyCode == 39) && (cannonX <= (canvas.width - 43))) {
		cannonX += 10;
	/*} else if ((e.keyCode == 38) && (moveY >= 5))  {
		moveY -= 5;
	} else if ((e.keyCode == 40) && (moveY <= canvas.height - 42)) {
		moveY += 5;*/
	} else if ((e.keyCode == 32) || (e.keyCode == 38)) {
		isShooting = true;
		addCannonMissile();
	} else {
		return;
	}
	drawBackground();
	img.onload = function() {
		context.drawImage(img, cannonX, cannonY, 40, 40);
		scoreUpdate(score);
		livesUpdate(lives);
	}

	img.src = "cannon.png";

}

function keyReleased(e)
{
	if ((e.keyCode == 32) || (e.keyCode == 38)) {
		isShooting = false;
		drawBackground();
	} else {
		return;
	}
}

