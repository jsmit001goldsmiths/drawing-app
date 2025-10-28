//UNDER CONSTRUCTION !!!!!

function BucketTool() {
    //set an icon and a name for the object
    this.icon = "assets/bucket.png";
    this.name = "bucket";
    this.mode = "flood";
    this.toolTip = "test1"

    let self = this;

    this.draw = function() {
        console.log(this.mode);
        //fill shouldnt run when mouse is off the canvas
        if(mouseIsPressed && mouseX > 0 && mouseY < 700 && mouseY > 100){
            //FOR TESTING
            console.log("bucket start");
            loadPixels();

            if(this.mode === "flood") {
                this.floodFill();
            } else {
                this.shapeFill();
            }
            
            //update pixels so the filled pixels will be drawn
            updatePixels();
            //FOR TESTING
            console.log("bucket finished");
        }

    }

    //this type of fill covers the whole screen where the colour of the pixel matches the colour of the clicked pixel
    this.floodFill = function() {
        let fillCol  = this.getFill();
        let baseCol = get(mouseX, mouseY);

        for(let i=0; i<width; i++){
            for(let j=0; j<height; j++){
                let currentCol = get(i,j);
                if (currentCol[0] == baseCol[0]
                    && currentCol[1] == baseCol[1]
                    && currentCol[2] == baseCol[2]
                    && currentCol[3] == baseCol[3]
                ) {
                    set(i,j,fillCol);
                } 
            }
        }
    }

    //this type of fill doesnt ignore borders when flooding the canvas
    this.shapeFill = function() {
        //FOR TESTING
        console.log("quack");
    }

    //get the current fill colour
    this.getFill = function() {
        return color(drawingContext.fillStyle);
    }

    //when the tool is deselected update the pixels to just show the drawing and
	//hide the buttons
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

	//adds a button and click handler to the options area. When clicked
	//change the fill mode of the bucket tool
	this.populateOptions = function() {
		select(".options").html(
			"<button id='modeButton'>Shape Fill</button>");
		//click handler
		select("#modeButton").mouseClicked(function() {
			let button = select("#" + this.elt.id);
			if (self.mode == "flood") {
				self.mode = 'shape';
				button.html('Flood Fill');
			} else {
                self.mode = "flood";
				button.html('Shape Fill');
			}
            console.log(self.mode);
		});
	};

}