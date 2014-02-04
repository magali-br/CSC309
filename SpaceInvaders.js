// To Track Game Status
var score;
var lives;
var monsterSpeed;

// To track the movement of the cannon
var moveX = 0;
var moveY = 0;

var cannonImg;
var backgroundImg;

var missiles = [];
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
				window.clearInterval(missiles[i].intervalVar);
				missiles.splice(i, 1);

				// remove monster
				window.clearInterval(monsters[j].intervalVar);
				monsters.splice(j, 1);

				score += 10;

				if (isShooting) {
					addMissile();
				}
			}

		}
	}

	for (var i = 0; i < monsters.length; i++) {
		monsters[i].draw();
		console.log(monsters[i]);
	}
	if (monsters.length == 0) {
		nextLevel();
	}

	context.drawImage(cannonImg, moveX, moveY, 40, 40);
	scoreUpdate(score);
	livesUpdate(lives);

}

function missileHitMonster(missile, monster)
{
	if ( (monster.x <= missile.x) 
		&& (missile.x <= (monster.x + monster.width) )
		&& (monster.y <= missile.y)
		&& (missile.y <= (monster.y + monster.height)) ) {
			return true;
		}
	return false;
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
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	moveX = canvas.width / 2;
	moveY = canvas.height - 42;
	missiles = [];
	monsters = [];
	score = 0;
	lives = 3;
	monsterSpeed = 500;
	setupMonsters(canvas);
}

function nextLevel()
{
	monsterSpeed = monsterSpeed * 10;
	resetGame();
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
	} else if ((e.keyCode == 32) || (e.keyCode == 38)) {
		isShooting = true;
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

function keyReleased(e)
{
	if ((e.keyCode == 32) || (e.keyCode == 38)) {
		isShooting = false;
		drawBackground();
	} else {
		return;
	}
}

