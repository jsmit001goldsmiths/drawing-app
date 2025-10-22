function BucketTool() {
    //set an icon and a name for the object
    this.icon = "assets/bucket.png";
    this.name = "bucket";

    this.draw = function() {
        if(mouseIsPressed){
            loadPixels();

            let toFill = [];
            let isSame = true;
            let startX = mouseX;
            let startY = mouseY;
            let i = startX;
            let j = startY;
            let originalPxl = get(i,j);

            console.log("peep");

            for(i; i<width; i++) {
                let currentPxl = get(i,j);
                if(originalPxl[0] != currentPxl[0]) {
                    isSame = false;
                }
                if(isSame) {
                    toFill.push(i);
                }
            }
            i = startX;
            isSame = true;
            for(i; i>0; i--) {
                let currentPxl = get(i,j);
                if(originalPxl[0] != currentPxl[0]) {
                    isSame = false;
                }
                if(isSame) {
                    toFill.push(i);
                }
            }

            for(let p =0; p<toFill.length;p++) {
                isSame = true;
                j = startY;
                set(toFill[p], j, 0);
                for(j; j<height; j++) {
                    let currentPxl = get(toFill[p], j);
                    if(originalPxl[0] != currentPxl[0]) {
                        isSame = false;
                    }
                    if(isSame) {
                        set(toFill[p], j, 0);
                    }
                }

                isSame = true;
                j = startY;
                set(toFill[p], j, 0);
                for(j; j>0; j--) {
                    let currentPxl = get(toFill[p], j);
                    if(originalPxl[0] != currentPxl[0]) {
                        isSame = false;
                    }
                    if(isSame) {
                        set(toFill[p], j, 0);
                    }
                }
               

            }

            updatePixels();
        }
       
        
    }
}