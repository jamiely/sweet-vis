		<!--
		// mouseover script homepage nav and icons
		function m_in(cid,showIcon) {
			if(showIcon) {
				var iconSource="http://knowledge.wharton.upenn.edu/images/icon-"+cid+"_glow.gif";
				eval("document.images.icon"+cid).src=iconSource;			
			}
			eval("document.getElementById("+"'tdcat"+cid+"'"+").bgColor='ffffff'");
		}
		// mouseout script homepage nav and icons
		function m_out(cid,showIcon) {
			if(showIcon) {
				var iconSource="http://knowledge.wharton.upenn.edu/images/icon-"+cid+".gif";
				eval("document.images.icon"+cid).src=iconSource;
			}
			eval("document.getElementById("+"'tdcat"+cid+"'"+").bgColor='#F3E8CC'");
		}

		//clears input text box
		function ClearField (thefield) {
			thefield.value = "";
			var changecolor = returnObjById("navsearch");
			changecolor.style.color = "black";
		}
	
	
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
	
		// css make the hidden div's disappear and appear
		//also sends the block or div to the back z-index
		function disappear(whichLayer){
			var styleOff = returnObjById(whichLayer);
			styleOff.style.zIndex = "-3";
			styleOff.style.display ="none";
		}
		function appear(whichLayer){
			var styleOn = returnObjById(whichLayer);
			styleOn.style.zIndex = "2";
			styleOn.style.display ="block";
		}		
	
		//shows a css layer...
		function layerOn(whichLayer){
			var styleOn = returnObjById(whichLayer);
			styleOn.style.display = "block";
		}

		//hides a css layer...
		function layerOff(whichLayer){
			var styleOff = returnObjById(whichLayer);
			styleOff.style.display = "none";
		}

		//generic element "Toggler"
		function toggleLayer(whichLayer){
				var styleToggle = returnObjById(whichLayer);
				styleToggle.style.display = styleToggle.style.display? "":"block";

		}
				
		// CLOSES all the divs for the key word matches on the related articles
		function closeKeywords(numofelements){
			for(var i=1;i<=numofelements;i++)
			{	
				var styleoff = returnObjById("key"+i);
				styleoff.style.display = "none";
				var textstyleoff = returnObjById("key"+i+"text");		
				textstyleoff.style.fontWeight = "normal";		
			
			}

		}

		// OPENS all the divs for the key word matches on the related articles
		function openKeywords(numofelements){
			for(var i=1;i<=numofelements;i++)
			{	
				var styleon = returnObjById("key"+i);
				styleon.style.display = "block";
				var textstyleon = returnObjById("key"+i+"text");		
				textstyleon.style.fontWeight = "bold";	
			}

		}		

		//this function closes all the related keyword divs and then opens the one selected
		function toggleRelated(whichLayer, numofelements){
			closeKeywords(numofelements);
			var style2 = returnObjById(whichLayer);
			var textstyleon = returnObjById(whichLayer+"text");
			style2.style.display = "block";
			textstyleon.style.fontWeight = "bold";
			//textstyleon.style.color = "black";		
		}
		
		//printer friendly function	
		function printpage() {
			window.print();  
		}
		
		/* 	DYNAMIC ROTATING CONTENT JAVASCRIPT
		  	COMMENTED OUT FOR NOW

		if (document.all || document.getElementById){ //if IE4 or NS6+
			document.write('<style type="text/css">\n')
			document.write('.dyncontent{display: none;}\n')
			//document.write('.dyncontent1{display: none;}\n')
			document.write('</style>')
			
		}

		var curcontentindex=0
		var messages=new Array()
		
		function getElementByClass(classname){
		var inc=0
		var alltags=document.all? document.all : document.getElementsByTagName("*")
		for (i=0; i<alltags.length; i++){
		if (alltags[i].className==classname)
		messages[inc++]=alltags[i]
		}
		}
		
		function rotatecontent(){
		//get current message index (to show it):
		curcontentindex=(curcontentindex<messages.length-1)? curcontentindex+1 : 0
		//get previous message index (to hide it):
		prevcontentindex=(curcontentindex==0)? messages.length-1 : curcontentindex-1
		messages[prevcontentindex].style.display="none" //hide previous message
		messages[curcontentindex].style.display="block" //show current message
		}
		
		
		window.onload=function(){
			if (document.all || document.getElementById){
				getElementByClass("dyncontent")
				setInterval("rotatecontent()", 4000)
			}
		}

		*/




// Cookie functions		

		// this function gets the cookie, if it exists
		function getCookie(name) {
			var start = document.cookie.indexOf( name + "=" );
			var len = start + name.length + 1;
			if ( ( !start ) &&
				( name != document.cookie.substring( 0, name.length ) ) )
			{
			return null;
			}
			if ( start == -1 ) return null;
			var end = document.cookie.indexOf( ";", len );
			if ( end == -1 ) end = document.cookie.length;
			return unescape( document.cookie.substring( len, end ) );
		}


		// this function will set the cookie of 'name' with 'value' passed to it
		function setCookie(name, value) {
		  var curCookie = name + "=" + escape(value) + "; expires=Wed, 07-Jun-2023 11:07:25 GMT; path=/; domain=.knowledge.wharton.upenn.edu";
		  document.cookie = curCookie;
		}
		
		function changeFontSize (newfontsize) {
			var newdoc = returnObjById("bodytext");
			newdoc.style.fontSize = newfontsize+"pt";
			setCookie('TEXTSIZE',newfontsize+"pt");
			location.reload();  
			//self.location.href = self.location.href; //window.location.href = window.location.href;
		}
		
	// -->
