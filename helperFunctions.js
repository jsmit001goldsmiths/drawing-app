function HelperFunctions() {
	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255);

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas('myDrawing.png');
	});

	//event handler for the horizontal flip button. flips the canvas along
	//the horizontal axis
	select("#horizontalFlipButton").mouseClicked(function() {
		let currentCanvas = get(0,0,width, height);
		push();
		pixelDensity(1);
		scale(1, -1);
		image(currentCanvas, 0,-height);
		push();
	})

	//event handler for the vertical flip button. flips the canvas along
	//the vertial axis
	select("#verticalFlipButton").mouseClicked(function() {
		let currentCanvas = get(0,0,width, height);
		push();
		pixelDensity(1);
		scale(-1, 1);
		image(currentCanvas, -width,0);
		push();
	})

	//event handler for the rotate clockwise button. Rotates the canvas 180
	//degrees clockwise
	select("#rotateClockwiseButton").mouseClicked(function() {
		let currentCanvas = get(0,0,width, height);
		push();
		pixelDensity(1);
		imageMode(CENTER);
		translate(width/2, height/2);
		rotate(180);
		image(currentCanvas, 0,0);
		pop();
	})

	//event handler for the rotate counter clockwise button. Rotates the canvas 180
	//degrees counter clockwise
	select("#rotateCounterClockwiseButton").mouseClicked(function() {
		let currentCanvas = get(0,0,width, height);
		push();
		pixelDensity(1);
		imageMode(CENTER);
		translate(width/2, height/2);
		rotate(-180);
		image(currentCanvas, 0,0);
		pop();
	})

	
}

