
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

Monster.prototype.width = 25;
Monster.prototype.height = 25;
Monster.prototype.draw = function () 
{
	if (this.context) {
		this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function addMonster(canvas, monster) 
{
	monster.intervalVar = window.setInterval(function() {
		monster.y += 8;
		if (monster.y >= canvas.height) {
			var index = monsters.indexOf(monster);
			if (index > -1) {
				monsters.splice(index, 1);
				window.clearInterval(monster.intervalVar);
			}
		}
	}, 500);
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




