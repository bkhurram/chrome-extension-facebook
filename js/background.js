console.log( "global scope" );
	
chrome.extension.onRequest.addListener( function(request, sender, sendResponse){
	switch( request.fn ) {
		case "log": console.log( "log" );
		break;
		
		case "start": 
			chrome.tabs.executeScript({
				code: 'document.body.style.backgroundColor="red"'
			});
		break; 
	}      
});

var init = function(){
	var bgPage = chrome.extension.getBackgroundPage()
	bgPage.console.log( "dom ready" );
};

document.addEventListener( 'DOMContentLoaded', init );

// Look through all the pages in this extension to find one we can use.
var views = chrome.extension.getViews({ type: "tab" });
