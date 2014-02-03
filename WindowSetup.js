function setupCanvas() {
	console.log(window.innerWidth);
	var divCanvas = document.getElementById("canvas");
	var canvasElement = document.createElement("canvas");
	canvasElement.setAttribute("id", "gameCanvas");
	canvasElement.setAttribute("width", window.innerWidth / 1.5);
	canvasElement.setAttribute("height", window.innerHeight * 2 / 3);
	divCanvas.appendChild(canvasElement);

}

