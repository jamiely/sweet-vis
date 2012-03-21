	//cross browser ID retriever
	function returnObjById( elementId ) 
	{ 
	    if (document.getElementById) 
       		var returnVar = document.getElementById(elementId); 
	    else if (document.all) 
	        var returnVar = document.all[elementId]; 
	    else if (document.layers) 
       		var returnVar = document.layers[elementId]; 
	    return returnVar; 
	} 	

	function setOpacity(obj, opacity) {
		opacity = (opacity == 100)?99.999:opacity;	  
	  	// IE/Win
	  	obj.style.filter = "alpha(opacity:"+opacity+")";
	  	// Safari<1.2, Konqueror
	  	obj.style.KHTMLOpacity = opacity/100;
 	  	// Older Mozilla and Firefox
	  	obj.style.MozOpacity = opacity/100;
	  	// Safari 1.2, newer Firefox and Mozilla, CSS3
	  	obj.style.opacity = opacity/100;
	}

	// The fadeIn function uses a Timeout to call itself every 100ms with an object Id and an opacity. The opacity is specified as a percentage and increased 10% at a time. The loop stops once the opacity reaches 100%:
	function fadeIn(objId,opacity) {
	  	if (document.getElementById) {
	    	obj = document.getElementById(objId);
	    	if (opacity <= 100) {
	      		setOpacity(obj, opacity);
	      		opacity += 10;
	      		window.setTimeout("fadeIn('"+objId+"',"+opacity+")", 50);
	    	}
	  	}
	}	



	function prev(){
		if (currentFrame <= 1){
		 currentFrame = titleArray.length-1;
		}
		else{
		 currentFrame = currentFrame-1;
		}
	switcher();
	}
	
	function next(){
		if (currentFrame == titleArray.length-1){
	  	 currentFrame = 1;
		}
		else{
		 currentFrame = currentFrame+1;
		}
	switcher();
	}

	function turnOn(ID){
		currentFrame = ID;
		switcher();
	}
		
function popUpTimeline(URL) {
URL = 'http://knowledge.wharton.upenn.edu/special_sections/subprime/timeline.cfm';
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=700,height=570,left = 150,top = 150');");
}

function glossaryWindow(URL) {
URL = 'http://knowledge.wharton.upenn.edu/special_sections/subprime/glossary.cfm?keyword=' + URL;
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=550,height=325,left = 150,top = 150');");
}

function popUpDominos() {
URL = 'http://knowledge.wharton.upenn.edu/special_sections/subprime/dominowindow.cfm';
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=550,height=500,left = 150,top = 150');");
}