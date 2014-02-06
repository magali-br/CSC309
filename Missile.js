function Missile(canvas, x, y, goingUp, colour)
{
	this.context = canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.intervalVar;
	this.goingUp = goingUp;
	this.colour = colour;
}

Missile.prototype.draw = function () 
{
	if (this.context) {
		this.context.fillStyle = this.colour;
		this.context.fillRect(this.x, this.y, 2, 9);
	}
}
function addCannonMissile() 
{
	addMissile(cannonX + 18, cannonY - 12, true);
}

function addMonsterMissile(monster)
{
	var x = monster.x + monster.width / 2;
	var y = monster.y + monster.height;
	addMissile(x, y, false);
}

function addMissile(x, y, goingUp) 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");

	if (goingUp) {
		var colour = "yellow";

		if (missiles.length == 0) {

			var missile = new Missile(canvas, x, y, goingUp, colour);

			missiles.push(missile);
			missile.intervalVar = window.setInterval(function() {

				missile.y -= 30; 

				if (missile.y <= 0) {
					var index = missiles.indexOf(missile);
					if (index > -1) {
						missiles.splice(index, 1);
						window.clearInterval(missile.intervalVar);
					}
					if (isShooting) {
						addMissile(x, y, goingUp);
					}
				}


			} , 100);
		}
	} else {
		var colour = "red";

		var missile = new Missile(canvas, x, y, goingUp, colour);

		monsterMissiles.push(missile);
		missile.intervalVar = window.setInterval(function() {

			missile.y += 10;

			if (missile.y >= canvas.height) {
				var index = monsterMissiles.indexOf(missile);
				if (index > -1) {
					monsterMissiles.splice(index, 1);
					window.clearInterval(missile.intervalVar);
				}
			}


		} , monsterMissileTimeInterval);
	}

	// to only allow one missile

}

function removeMissile(index) 
{
	window.clearInterval(missiles[index].intervalVar);
	missiles.splice(index, 1);
}

function missileHitMonster(missile, monster)
{
	if (missile && monster) {
		if ( (monster.x <= missile.x) 
			&& (missile.x <= (monster.x + monster.width) )
			&& (monster.y <= missile.y)
			&& (missile.y <= (monster.y + monster.height)) ) {
			return true;
		}
	}
	return false;
}

function missileHitCannon(missile)
{
	if (missile) {
		if ( (cannonX <= missile.x) 
			&& (missile.x <= (cannonX + cannonImageWidth) )
			&& (cannonY <= missile.y)
			&& (missile.y <= (cannonY + cannonImageHeight)) ) {
			return true;
		}
	}
	return false;
}