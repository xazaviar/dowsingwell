
	var dictionary = [];
	var max_search = 200;
	var max_timer = 5000;

	loadDictionary();
	//pingURL("google.com");
	//future dictionary text;

	// var button = document.getElementById("theButton");
	// button.onclick = function() {
	// 	var input = document.getElementById("formValueId").value;
	// 	appendRandom(input);
	// }
	function loadDictionary(){
		var allText = "";

		var file = new XMLHttpRequest();
		file.onreadystatechange = function(){
			if(file.readyState===4){
				if(file.status === 200 || file.status ==0){
					allText = file.responseText;
					loadToClientMemory(allText);
				}
			}
		}
		file.open("GET","words.txt",true);
		file.send();
	}

	function loadToClientMemory(allText){
	var index = 0;
	var buffer = "";
		for(var i = 0; i < allText.length; ++i){
			
			var chr = allText.charAt(i);
		
			if(chr == '\n'|| i == allText.length-1){
				if(buffer.length>0){
					dictionary[index] = buffer;
					buffer = "";
					++index;
				}	
				continue;
			}
			buffer = buffer + chr;
		}
		console.log("Words in dictionary: " + dictionary.length);
	}

	var isValid = false;
	var finalURL= "";
	var attempt = 0;
	function appendRandom(input){
		console.log(input);
		var url = "";
		finalURL = "";
		isValid = false;
		attempt = 0;
		while(!isValid && attempt < max_search){
			var rand1 = Math.random();
			var rand2 = Math.random();
			var rand3 = Math.ceil(Math.random()*dictionary.length-1);
			
			var closure = ".com"
			if(rand1> .9){
				closure = ".net";
			}
			else if( rand1 > .8){
				closure = ".org";
			}
			
			url = dictionary[rand3] + input + closure;
			if(rand2 > .5){
				url = input + dictionary[rand3] + closure;
			}
			
			makeRequest(url);
			
			attempt++;
		}
		
		window.setTimeout(pushToDB,max_timer);
		
	}

	function makeRequest(url){
		var req = new XMLHttpRequest();
		req.open("GET","./php/ping.php?url="+url, true);
		req.send();
		req.onreadystatechange= 
			function(){
				if (this.readyState == 4 && this.status == 200) {
					convertStringToBooleanl(req.responseText,url);
					}
			}		
	}


	function convertStringToBooleanl(string,url){
		//console.log("STRING: "+string+" | url: "+url);
		if(string.trim() === "true"){
			finalURL = url;
		}
	}

	function pushToDB(){
			var req = new XMLHttpRequest();
			req.open("GET","./php/insertDB.php?val="+finalURL,true);
			req.send();
			req.onreadystatechange = 
				function(){
					if(this.readyState == 4 && this.status == 200){
						console.log("LOGGED: "+finalURL);
						//console.log("pushingtoDB");
						//document.getElementById("tmp").innerHTML = req.responseText;
					}
				}
				
	}