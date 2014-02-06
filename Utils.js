function setupCanvas() {
	console.log(window.innerWidth);
	var divCanvas = document.getElementById("canvas");
	var canvasElement = document.createElement("canvas");
	canvasElement.setAttribute("id", "gameCanvas");

	//<canvas id="gameCanvas" width="768" height="576">
	// for adapting canvas size
	//canvasElement.setAttribute("width", window.innerWidth / 1.5);
	//canvasElement.setAttribute("height", window.innerHeight * 2 / 3);

	// For bigger screen 
	canvasElement.setAttribute("width", 768);
	canvasElement.setAttribute("height", 576);
	canvasElement.setAttribute("tabindex", 1);
	divCanvas.appendChild(canvasElement);
}

function randomFromTo(from, to)
{
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function clearSelection () 
{
	document.getElementById("gameCanvas").focus();
}
