//Own code—START

function BlurTool() {
    //set an icon and a name for the object
    this.icon = "assets/blur.png";
    this.name = "blur";
    this.toolTip = "Blurr";

    this.draw = function() {
        if(mouseIsPressed){
            //load the pixels so they can be maniupulated
            loadPixels();
            //loop through all pixels in a 25 square radius around the mouse
            for(let i = mouseX-25; i <mouseX+25; i++) {
                let constrainedI = constrain(i, 1, width -1);  
                for(let j = mouseY-25; j<mouseY+25; j++){
                    let constrainedJ = constrain(j, 1, 700);
                    //get the current pixel RGB values
                    let pxl = get(constrainedI,constrainedJ);
                    let newR =  pxl[0];
                    let newG = pxl[1];
                    let newB = pxl[2];
                    //loop through all the pixels around the current pixel and itself
                    for (let p=-1; p<2;p++) {
                        for (let q=-1; q<2; q++) {
                            //increase the RBG values by that of the pixels around the current pixel
                            let cPxl = get(constrainedI+p, constrainedJ+q);
                            newR += cPxl[0];
                            newG += cPxl[1];
                            newB += cPxl[2];
                        }
                    }
                    //divide the RGB values by 10 to get the average value and get the new RGB colour
                    let newPxl = color(newR/10, newG/10, newB/10);
                    //replace the current pixels old colour with the new, average one
                    set(constrainedI,constrainedJ,newPxl);
                }
            }
        //update the pixels so the new colours will be drawn on the canvas
        updatePixels();
        } 
    } 
}

//Own code—END