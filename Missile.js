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
					removeMissile(missiles, missiles.indexOf(missile));

					if (isShooting) {
						addCannonMissile();
					}
				}


			} , 50);
		}
	} else {
		var colour = "red";

		var missile = new Missile(canvas, x, y, goingUp, colour);

		monsterMissiles.push(missile);
		missile.intervalVar = window.setInterval(function() {

			missile.y += 10;

			if (missile.y >= canvas.height) {
				removeMissile(monsterMissiles, monsterMissiles.indexOf(missile));
			}


		} , monsterMissileTimeInterval);
	}

}

function removeMissile(missileArray, index) 
{
	if (index > -1) {
		window.clearInterval(missileArray[index].intervalVar);
		missileArray.splice(index, 1);
	}
}

function missileHitMonster(missile, monster)
{
	if (monster) {
		return missileHit(missile, monster.x, monster.y, monster.width, monster.height);
	}
	return false;
}

function missileHitCannon(missile)
{
	return missileHit(missile, cannonX, cannonY, cannonImageWidth, cannonImageHeight);
}

function missileHit(missile, x, y, width, height)
{
	if (missile) {
		if ( (x <= missile.x) 
			&& (missile.x <= (x + width) )
			&& (y <= missile.y)
			&& (missile.y <= (y + height)) ) {
			return true;
		}
	}
	return false;
}