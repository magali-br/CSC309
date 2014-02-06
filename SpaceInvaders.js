// To track the game status
var score;
var lives;
var level;
var monsterSpeed;
var monsterMissileTimeInterval;

// To track the movement of the cannon
var cannonX = 0; // The cannon's horizontal position
var cannonY = 0; // The cannon's vertical position
var cannonImageWidth = 40; // The width of the cannon
var cannonImageHeight = 40; // The height of the cannon
var cannonImg; // The image of the cannon

// The background image
var backgroundImg;

// The array holding the missiles fired by the cannon
var missiles = [];

// The array holding the missiles fired by the monsters
var monsterMissiles = [];

// The array holding the monsters currently on the screen
var monsters = [];

// Whether the user is currently shooting by holding down the space button
var isShooting = false;

/* Redraw the background image, the cannon, the monsters, and the missiles.*/
function drawBackground()
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");

	context.drawImage(backgroundImg, 0, 0);
	for (var i = 0; i < missiles.length; i++) {
		missiles[i].draw();
		for (var j = 0; j < monsters.length; j++) {
			if (missileHitMonster(missiles[i], monsters[j])) {

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

/* Update the displayed score. 
	score - the current score for the game
	*/
function scoreUpdate(score) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("SCORE: " + score, 1, 22);
}

/* Update the displayed number of lives. 
	lives - the current number of lives remaining for the game
	*/
function livesUpdate(lives) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("LIVES: " + lives + "X", 650, 22);
}

/* Update the displayed level. 
	level - the current level at which the user is playing
	*/
function levelUpdate(level) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	context.fillStyle = "white";
	context.font = "bold 24px Arial";
	context.fillText("LEVEL: " + level, 1, 50);
}

/* Setup the game for the first time, load the images and set up the game.*/
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

/* Reset the game in order to start at base level. */
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

/* Reset the image to its start position, for example at a new level. */
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

/* Move onto the next level of the game. */
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

/* Notify the user that they have lost the game and reset the game.*/
function gameOver()
{
	alert("Game Over!");
	resetGame();
}

/* An event handler for the window for when a key is pressed (onkeydown).
	e - the object representing the key that has been pressed.
	*/
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
	} else if (e.keyCode == 32) {
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

/* An event handler for the window for when a key is released (onkeyup).
	e - the object representing the key that has been released.
	*/
function keyReleased(e)
{
	if ((e.keyCode == 32) || (e.keyCode == 38)) {
		isShooting = false;
		drawBackground();
	} else {
		return;
	}
}

