var params = {};

var log = function( str ){
	console.log( str );
};

var changePage = function () {
	console.log( params.name );
	$( "._8_2" ).html( params.name );
};

$(function(){
	console.log( "content script ready" );
});
