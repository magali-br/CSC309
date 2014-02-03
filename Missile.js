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

function addMissile() 
{
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");
	var missile = new Missile(canvas, moveX + 18, moveY - 12);

	missiles.push(missile);
	missile.intervalVar = window.setInterval(function() {
				missile.y -= 10; 
				if (missile.y <= 0) {
					var index = missiles.indexOf(missile);
					if (index > -1) {
						missiles.splice(index, 1);
						window.clearInterval(missile.intervalVar);
					}
				}
			}, 100);
}