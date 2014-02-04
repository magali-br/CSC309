var leftmostX;
var rightmostX;
var monsterIncrementVertical = 8;
var monsterIncrementHorizontal = 20;
var goingRight = true;
var monsterIntervalVar;


function Monster(canvas, x, y)
{
	if (canvas) {
		this.context = canvas.getContext("2d");
		this.x = x;
		this.y = y;
		monsters.push(this);
	}
}

Monster.prototype.width = 30;
Monster.prototype.height = 30;
Monster.prototype.draw = function () 
{
	if (this.context) {
		this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function BlueMonster(canvas, x, y)
{
	Monster.call(this, canvas, x, y);
}
BlueMonster.prototype = new Monster();
BlueMonster.prototype.constructor = BlueMonster;
BlueMonster.prototype.img = new Image();
BlueMonster.prototype.img.src = "m1.png";

function RedMonster(canvas, x, y)
{
	Monster.call(this, canvas, x, y);
}
RedMonster.prototype = new Monster();
RedMonster.prototype.constructor = RedMonster;
RedMonster.prototype.img = new Image();
RedMonster.prototype.img.src = "m2.png";

function YellowMonster(canvas, x, y)
{
	Monster.call(this, canvas, x, y);
}
YellowMonster.prototype = new Monster();
YellowMonster.prototype.constructor = YellowMonster;
YellowMonster.prototype.img = new Image();
YellowMonster.prototype.img.src = "m3.png";

function setupMonsters(canvas)
{
	var initialLeftmostX = 200;
	var space = Monster.prototype.width + 10;
	var x = 50;
	var y = 50;
	var numRows = 5;
	var numColumns = 1;
	for (var i = 0; i < numRows; i++){
		x = initialLeftmostX;
		for (var j = 0; j < numColumns; j++) {
			var monsterTypes = [RedMonster, BlueMonster, YellowMonster];
			var monster = new monsterTypes[randomFromTo(0,2)](canvas, x, y);
			x += space;
		}
		y += space;
	}

	leftmostX = initialLeftmostX;
	rightmostX = x + Monster.prototype.width;
	goingRight = true;

	if (monsterIntervalVar) {
		window.clearInterval(monsterIntervalVar);
	}

	// Update all monsters at once
	monsterIntervalVar = window.setInterval(function() {
		var incrementY = 0;
		var incrementX = 0;

		if (goingRight) {

			if (rightmostX >= canvas.width) {
				incrementY = monsterIncrementVertical;

			} else {
				incrementX = monsterIncrementHorizontal;
			}
		} else {

			if (leftmostX <= 0) {
				incrementY = monsterIncrementVertical;

			} else {
				incrementX = monsterIncrementHorizontal * (-1);
			}
		}

		for (i = 0; i < monsters.length; i++) {
			var monster = monsters[i];
			monster.x += incrementX;
			monster.y += incrementY;

			if (goingRight) {
				if (monster.x + Monster.prototype.width > rightmostX) {
					rightmostX = monster.x + Monster.prototype.width;	
				}

			} else {

				if (monster.x < leftmostX) {
					leftmostX = monster.x;
				}
			}
				

			if ( (monster.y + monster.height) >= canvas.height) {
				alert("Game Over!");
				resetGame();
				window.clearInterval(monsterIntervalVar);
			}
		}

		if (incrementX == 0) {
			goingRight = !goingRight;
		}

	}, monsterSpeed);
}

function removeMonster(index)
{
	monsters.splice(index, 1);

	if (monsters.length == 0) {
		window.clearInterval(monsterIntervalVar);
		nextLevel();
	}

	score += 10;
}


