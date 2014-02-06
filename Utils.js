/* Create the canvas and make it visible.*/
function setupCanvas() {
	console.log(window.innerWidth);
	var divCanvas = document.getElementById("canvas");
	var canvasElement = document.createElement("canvas");
	canvasElement.setAttribute("id", "gameCanvas");

	canvasElement.setAttribute("width", 768);
	canvasElement.setAttribute("height", 576);
	canvasElement.setAttribute("tabindex", 1);
	divCanvas.appendChild(canvasElement);
}

/* Return a random integer from from to to, inclusive.
	from - the minimal number to return
	to - the maximum number to return 
	*/
function randomFromTo(from, to)
{
	return Math.floor(Math.random() * (to - from + 1) + from);
}

/* Change the focus to the canvas to clear other button selections.*/
function clearSelection () 
{
	document.getElementById("gameCanvas").focus();
}
