function setupCanvas() {
	console.log(window.innerWidth);
	var divCanvas = document.getElementById("canvas");
	var canvasElement = document.createElement("canvas");
	canvasElement.setAttribute("id", "gameCanvas");

	//<canvas id="gameCanvas" width="768" height="576">
	canvasElement.setAttribute("width", window.innerWidth / 1.5);
	canvasElement.setAttribute("height", window.innerHeight * 2 / 3);
	divCanvas.appendChild(canvasElement);
}

