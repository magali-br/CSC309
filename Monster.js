var leftmostX;
var rightmostX;
var incrementX = 8;
var incrementY = 20;
var goingRight = true;


function Monster(canvas, x, y)
{
	if (canvas) {
		this.context = canvas.getContext("2d");
		this.x = x;
		this.y = y;
		this.intervalVar;
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
Monster.prototype.incrementX = 8;
Monster.prototype.incrementY = 8;
Monster.prototype.leftmostX = 0;

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


	// Update all monsters at once
	intervalVar = window.setInterval(function() {


		for (i = 0; i < monsters.length; i++) {
			var monster = monsters[i];

			if (goingRight) {
					monster.x += incrementX;
					if (monster.x + Monster.prototype.width > rightmostX) {
						rightmostX = monster.x + Monster.prototype.width;	
					}
					if (rightmostX >= canvas.width) {
						for (var i = 0; i < monsters.length; i++) {
							monsters[i].y += incrementY;
						}
						goingRight = false;
						//incrementX = incrementX * -1;
						//monster.y += incrementY;
						rightmostX = monster.x;
					}
				} else {
					monster.x -= incrementX;
					if (monster.x < leftmostX) {
						leftmostX = monster.x;
					}

					if (leftmostX <= 0) {
						goingRight = true;
						//incrementX = incrementX * -1;
						//monster.y += incrementY;
						for (var i = 0; i < monsters.length; i++) {
							monsters[i].y += incrementY;
						}
						leftmostX = monster.x;
					}
				}
				

				if ( (monster.y + monster.height) >= canvas.height) {
					// var index = monsters.indexOf(monster);
					// if (index > -1) {
					// 	monsters.splice(index, 1);
					// 	window.clearInterval(monster.intervalVar);
					// }
					// // game over
					// //playGame();
					alert("gameOver!");
					monsters = [];
					window.clearInterval(intervalVar);


				}
			}
		}, monsterSpeed);
}

function randomFromTo(from, to)
{
	return Math.floor(Math.random() * (to - from + 1) + from);
}


