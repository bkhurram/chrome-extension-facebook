console.log( "start" );

BG = chrome.extension.getBackgroundPage();

var PopupController = {
	
	templates: {},
	
	init : function() {
		
		var self = this;
		var form = {};
		
		// # Async template Loading
		var JQXHRHeader = TemplateLoader.loadTemplate( "header" );
		var JQXHRComposerPost = TemplateLoader.loadTemplate( "composerPost" );
		
		$.when( JQXHRHeader, JQXHRComposerPost ).done( function( headerResponse, composerPostResponse ) {
			
			// # set response in to temlate object
			self.templates.headerHtml = headerResponse[ 0 ];
			self.templates.composerPostHtml = composerPostResponse[ 0 ];
		});
		
		// # event click
		$( "#modifica" ).on( "click", function( event ) {
			
			// # get value
			form.name = $( "#name" ).val();
			form.smallImages = $( "#smallpicture" ).val();
			form.bigImages = $( "#bigpicture" ).val();
			
			// # console log
			chrome.tabs.executeScript( null, { code: "log( 'Modifica' );" } );
			
			// # execute code on content_scripts of page
			chrome.tabs.executeScript( null, { code: "templates = " + JSON.stringify( self.templates ) + "; changePage( " + JSON.stringify( form ) + " );" } );
		
			chrome.tabs.executeScript( null, { code: "log( templates );" } );
		});

	}
	
};

$( function() {
	PopupController.init();
});

// # send request to Background script
chrome.extension.sendRequest({ fn: "log" });