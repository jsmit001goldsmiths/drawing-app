function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";
	//position of mouse last time the drawing func was called
	//initially set to -1
	var startMouseX = -1;
	var startMouseY = -1;
	//if a line is being drawn or not. initially false
	var drawing = false;

	this.draw = function(){
		//when the mouse is pressed 
		//if the startMouse vars are still -1 update them to the current mouse pos
		//then set drawing to true as a line has begun being drawn
		//load pixels into a pixel array so they can be updated later
		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}
			//if the startMouse vars are not -1 aka if the mouse has been moved from the line start
			//update pixels to draw the current line
			// draw a line between the start and current mouse pos
			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
		//if mouse isnt pressed change drawing to false and reset startMouse vars
		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
