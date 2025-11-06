//Own code—START

function BucketTool() {
    //set an icon and a name for the object
    this.icon = "assets/bucket.png";
    this.name = "bucket";
    this.mode = "flood";
    this.toolTip = "Bucket tool"

    let self = this;

    this.draw = function() {
        //fill shouldnt run when mouse is off the canvas
        if(mouseIsPressed && mouseX > 0 && mouseY < 700 && mouseY > 100){
            loadPixels();

            if(this.mode === "flood") {
                this.floodFill();
            } else {
                this.shapeFill();
            }
            
            //update pixels so the filled pixels will be drawn
            updatePixels();
        }

    }

    //this type of fill covers the whole screen where the colour of the pixel matches the colour of the clicked pixel
    this.floodFill = function() {
        //colour to flood
        let fillCol  = this.getFill();
        //colour that should be flooded
        let baseCol = get(mouseX, mouseY);

        //iterates through every pixel on the canvas and compares its colour to the base colour
        for(let i=0; i<width; i++){
            for(let j=0; j<height; j++){
                let currentCol = get(i,j);
                if (currentCol[0] == baseCol[0]
                    && currentCol[1] == baseCol[1]
                    && currentCol[2] == baseCol[2]
                    && currentCol[3] == baseCol[3]
                ) {
                    //where the current colour matches the base colour, set to fill colour
                    set(i,j,fillCol);
                } 
            }
        }
    }

    //this type of fill doesnt ignore borders when flooding the canvas
    this.shapeFill = function() {

            let toFill = [];
            let isSame = true;
            let startX = mouseX;
            let startY = mouseY;
            let i = startX;
            let j = startY;
            let originalPxl = get(i,j);

            //searches through the pixels to the right of the current pixel
            for(i; i<width; i++) {
                let currentPxl = get(i,j);
                //if the pixel is a different colour to the starting pixel it is a border and 
                //it will stop searching to the left
                if(originalPxl[0] != currentPxl[0]) {
                    isSame = false;
                }
                //if the pixel is the same colour as the starting pixel, add it to the array
                if(isSame) {
                    toFill.push(i);
                }
            }
            i = startX;
            isSame = true;
             //searches through the pixels to the left of the current pixel
            for(i; i>0; i--) {
                let currentPxl = get(i,j);
                //if the pixel is a different colour to the starting pixel it is a border and 
                //it will stop searching to the left
                if(originalPxl[0] != currentPxl[0]) {
                    isSame = false;
                }
                //if the pixel is the same colour as the starting pixel, add it to the array
                if(isSame) {
                    toFill.push(i);
                }
            }

             //using the left-to-right array of pixels toFill[]
            //search above and below each pixel in the array for pixels to fill
            for(let p of toFill) {
                isSame = true;
                j = startY;
                set(p, j, this.getFill());
                //searches through the pixels to the above the current pixel
                for(j; j<height; j++) {
                    let currentPxl = get(p, j);
                    //if the pixel is a different colour to the starting pixel it is a border and 
                    //it will stop searching above
                    if(originalPxl[0] != currentPxl[0]) {
                        isSame = false;
                    }
                     //if the pixel is the same colour as the starting pixel, set it to the new colour
                    if(isSame) {
                        set(p, j, this.getFill());
                    }
                }

                isSame = true;
                j = startY;
                set(p, j, this.getFill());
                 //searches through the pixels to the below the current pixel
                for(j; j>0; j--) {
                    let currentPxl = get(p, j);
                    //if the pixel is a different colour to the starting pixel it is a border and 
                    //it will stop searching below
                    if(originalPxl[0] != currentPxl[0]) {
                        isSame = false;
                    }
                    //if the pixel is the same colour as the starting pixel, set it to the new colour
                    if(isSame) {
                        set(p, j, this.getFill());
                    }
                }
            }
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
		});
	};

}

//Own code—END