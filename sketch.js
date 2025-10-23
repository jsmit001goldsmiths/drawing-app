/*
Credits 
*	1. https://www.flaticon.com/free-icons/horizontal
*	Horizontal icon created by nawicon - Flaticon
*
*	2. https://www.flaticon.com/free-icons/photo-editing
*	Photo editing icon created by nawicon - Flaticon
*
*	3. https://www.flaticon.com/free-icons/rotate
*	Rotate icons created by Afian Rochmah Afif - Flaticon
*
*	4. https://www.flaticon.com/free-icons/save 
*	Save icon created by Yogi Aprelliyanto - Flaticon
*
*	5. https://www.flaticon.com/free-icons/clear
*	Clear icon created by LAFS - Flaticon
*
*	6. https://www.flaticon.com/free-icons/blur
*	Blur icons created by Cuputo - Flaticon
*	
*	7. https://www.flaticon.com/free-icons/paint
*	Paint icons created by Freepik - Flaticon
*
*	8. https://stackoverflow.com/questions/48178383/p5-js-get-current-fill-stroke-color
*	bucketTool.js, this.getFill = function() solution
*/

// Global variables that will store the toolbox colour palette
// and the helper functions.
let toolbox = null;
let colourP = null;
let helpers = null;

function setup() {
	//create a canvas to fill the content div from index.html
	let canvasContainer = select('#content');
	let c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new MirrorDrawTool()); 
	toolbox.addTool(new BucketTool());
	toolbox.addTool(new BlurTool());
	background(255);

	angleMode(DEGREES);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
