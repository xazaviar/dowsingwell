var searchKeyword;
var canSearch = true;

$(document).ready(function() {
	buildHome();
});


function buildpage(id,url){
	$(".main").empty();

	if(id === 0){
		buildHome();
	}else if (id === 1){
		buildWebsiteView(url);
	}
}

function buildHome(){
	$(".main").append('<div class="center"><div class="logo"></div></div>');
	$(".main .center").append('<form><input type="text" name="search" placeholder="Search" onfocus="this.placeholder =\'\'" onblur="this.placeholder =\'Search\'"><div class="exploring"><input type="radio" name="Searching" value="exploring" checked>Exploring</div><div class="indexed"><input type="radio" name="Searching" value="indexed">Indexed</div></form>');

	//Change The background color
	var colors = [[255,0,0,0.45],
				  [255,0,255,0.45],
				  [0,255,0,0.45],
				  [0,0,255,0.45],
				  [66,244,238,0.45],
				  [244,232,65,0.65],
				  [127,127,127,0.45],
				  [255,89,249,0.45],
				  [160,80,0,0.45]];
	var r = (parseInt(Math.random()*100))%colors.length;

	$(".main").css('background','linear-gradient(rgba('+colors[r][0]+','+colors[r][1]+','+colors[r][2]+',' +colors[r][3]+'),rgba('+colors[r][0]+','+colors[r][1]+','+colors[r][2]+',' +colors[r][3]+')),url("./images/background3.png") no-repeat center center fixed');


	$( "form" ).submit(function(e) {
		e.preventDefault();
		searchKeyword = $( "input:text" ).val();
		callSearch();
	});
}

function buildWebsiteView(url){
	
	$(".main").append('<ul class="ul"></ul> <iframe class="iframe" src="http://www.'+url+'" name="ifram_a"></iframe>');


	$(".main .ul").append('<img class="img" src="images/logo small.png" alt="Missing" height="65" width="60">');
	$(".main .ul").append('<button class="up button" type="button"></button>');
	$(".main .ul").append('<button class="down button" type="button"></button>');
	$(".main .ul").append('<button class="return button" type="button" onclick="callSearch();">Rerun</button>');
	$(".main .ul").append('<li class="li">'+searchKeyword+'</li>');

	
	$(".main .ul .img").click(function(){
		buildpage(0);
	});
		

}

function callSearch(){
	if(canSearch == true){
		canSearch = false;
		appendRandom(searchKeyword);

		setTimeout(function(){
			if(finalURL === ''){
				alert('NOT FOUND');
				canSearch = true;
			}else{
				buildpage(1,finalURL);
				canSearch = true;
			}
		},3000);
	}
}