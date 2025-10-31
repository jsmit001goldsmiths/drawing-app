//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

	let self = this;

	this.tools = [];
	this.selectedTool = null;

	let toolbarItemClick = function() {
		//remove any existing borders
		let items = selectAll(".sideBarItem");
		for (let i in items) {
			items[i].style('border', '0');
		}

		let toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};

	//Own code—START

	//add a pink border to whichever tool icon is being hovered over
	let toolbarItemHoverStart = function() {
		select("#" + this.id()).style("border", "2px solid pink");
	}

	//remove the pink border once the icon is no longer hovered over
	let toolbarItemHoverFinish = function() {
		let toolName = this.id().split("sideBarItem")[0];
		if(toolName != self.selectedTool.name) {
			select("#" + this.id()).style("border", "0");
		} else {
			//if the current icon is the selected tool replace with blue border instead
			select("#" + toolName + "sideBarItem").style("border", "2px solid blue");
		}
	}

	//Own code—END

	//add a new tool icon to the html page
	let addToolIcon = function(icon, name, toolTip) {
		let sideBarItem = createDiv("<img src='" + icon + "'><span class='tooltip'>"+ toolTip+"</span></div>");
		sideBarItem.class("sideBarItem");
		sideBarItem.id(name + "sideBarItem");
		sideBarItem.parent("sidebar");

		sideBarItem.mouseClicked(toolbarItemClick);
		//Own code—START
		sideBarItem.mouseOver(toolbarItemHoverStart);
		sideBarItem.mouseOut(toolbarItemHoverFinish);
		//Own code—START
	};

	//add a tool to the tools array
	this.addTool = function(tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name") || !tool.hasOwnProperty("toolTip")) {
			alert("make sure your tool has both a name, a tool tip, and an icon");
		}
		this.tools.push(tool);
		addToolIcon(tool.icon, tool.name, tool.toolTip);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = function(toolName) {
		//search through the tools for one that's name matches
		//toolName
		for(let i in this.tools) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it
				
				//Own code—START
				if (this.selectedTool?.hasOwnProperty("unselectTool")) {
					this.selectedTool.unselectTool();
				}
				//Own code—END

				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];
				select("#" + toolName + "sideBarItem").style("border", "2px solid blue");

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();
				}
			}
		}
	};


}
