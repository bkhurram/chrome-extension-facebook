var FB = {};

var templates = {};

var log = function( str ){
	console.log( str );
};

var changePage = function ( params ) {
	
	// # Underscore init ( global var in template )
	_.templateSettings.variable = "context";
	
	var dataObj = {};
	dataObj.id = FB.id;
	dataObj.numNotifiche = 2;
	
	console.log( params );
	
	// # change FB profile
	
	// # get name
	var defaultName = $( "._8_2" ).html();
	
	// # change name in blue bar
	$( ".headerTinymanName" ).html( params.name );
	
	// # change name in header
	$( "._8_2" ).html( params.name );
	
	// # change name in header sticky bar
	$( ".nameButton.uiButton.uiButtonOverlay .uiButtonText" ).html( params.name );
	
	// # change name in diario
	$( ".fcg .fwb a" ).html( params.name );
	
	// # change name in comment
	$( ".UFICommentActorName:contains('" + defaultName + "')" ).html( params.name );
	
	// # replace html in header
	$( ".actions._70j" ).html( _.template( templates.headerHtml, dataObj ) );

	// # fb composer post
	$( ".timelineUnitContainer.fbTimelineComposerUnit" ).html( _.template( templates.composerPostHtml, dataObj ) );
	
	
	// # big image
	$( ".coverPhotoImg.photo.img" ).attr( "src", params.bigImages );
	
	// # small image
	$( ".profileThumb img" ).attr( "src", params.smallImages );
	$( ".profilePicThumb img" ).attr( "src", params.smallImages );
	$( ".headerTinymanPhoto" ).attr( "src", params.smallImages );
	$( "._s0._50c7._54rt.img" ).attr( "src", params.smallImages );
	$( ".UFIComment .lfloat a[href*='" + FB.id + "'] img").attr( "src", params.smallImages );
};

$(function() {
	
	console.log( "content script ready" );
	
	// # get id
	FB.id = document.location.pathname.replace( "/", "" );
});
