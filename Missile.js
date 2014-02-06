/* A missile object.
	canvas - the canvas on which to draw it
	x - the missile's horizontal start position
	y - the missile's 
	*/
function Missile(canvas, x, y, goingUp, colour)
{
	this.context = canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.intervalVar;
	this.goingUp = goingUp;
	this.colour = colour;
}

/* Draw the missile on the canvas.*/
Missile.prototype.draw = function () 
{
	if (this.context) {
		this.context.fillStyle = this.colour;
		this.context.fillRect(this.x, this.y, 2, 9);
	}
}

/* Add a missile shot by the cannon.*/
function addCannonMissile() 
{
	addMissile(cannonX + 18, cannonY - 12, true);
}

/* Add a missile shot by a monster.
	monster - the monster that shot the missile
	*/
function addMonsterMissile(monster)
{
	var x = monster.x + monster.width / 2;
	var y = monster.y + monster.height;
	addMissile(x, y, false);
}

/* Add a missile.
	x - the starting horizontal position of the missile
	y - the starting vertical position of the missile
	goingUp - true if the missile should move upwards, false otherwise
	*/
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

/* Remove a missile from the screen.
	missileArray - the array of missiles to remove a monster from
	index - the index in missileArray of the monster to be removed
	*/
function removeMissile(missileArray, index) 
{
	if (index > -1) {
		window.clearInterval(missileArray[index].intervalVar);
		missileArray.splice(index, 1);
	}
}

/* Calculate whether a monster was hit by a missile.
	missile - the missile that might have hit
	monster - the monster that might have been hit
	*/
function missileHitMonster(missile, monster)
{
	if (monster) {
		return missileHit(missile, monster.x, monster.y, 
			monster.width, monster.height);
	}
	return false;
}

/* Calculate whether the cannon was hit by a missile.
	missile - the missile that might have hit the cannon
	*/
function missileHitCannon(missile)
{
	return missileHit(missile, cannonX, cannonY, 
		cannonImageWidth, cannonImageHeight);
}

/* Calculate whether a missile hit a specific rectangle on the screen.
	missile - the missile that might have hit
	x - the horizontal position of the upper left corner of the rectangle
	y - the vertical position of the upper left corner of the rectangle
	width - the width of the rectangle
	height - the height of the rectangle
	*/
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