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
			
			self.save( form );
			
			// # console log
			chrome.tabs.executeScript( null, { code: "log( 'Modifica' );" } );
			
			// # execute code on content_scripts of page
			chrome.tabs.executeScript( null, { code: "templates = " + JSON.stringify( self.templates ) + "; changePage( " + JSON.stringify( form ) + " );" } );
		
			chrome.tabs.executeScript( null, { code: "log( templates );" } );
		});
		
		$( "#name" ).on( "keydown", function( event ) { console.log( "key down" ); chrome.tabs.executeScript( null, { code: "log( 'key down' );" } ); });

	},
	
	save: function ( form ) {
		chrome.storage.local.set({ 'name' : form.name });
		chrome.storage.local.set({ 'smallImages': form.smallImages });
		chrome.storage.local.set({ 'bigImages': form.bigImages });
	},
	
	load: function () {
		
	    var name = "";
	    var smallImages = "";
	    var bigImages = "";
	    
	    chrome.storage.local.get( 'name', function (result) {
	    	name = result.name;
	        $( "#name" ).val( name );
	    });


	    chrome.storage.local.get( 'smallImages', function (result) {
	    	smallImages = result.smallImages;
	        $( "#smallpicture" ).val( smallImages );
	    });

	    chrome.storage.local.get( 'bigImages', function (result) {
	    	bigImages = result.bigImages;
	        $( "#bigpicture" ).val( bigImages );
	    });
	}
	
};

$( function() {
	PopupController.load();
	PopupController.init();
});

// # send request to Background script
chrome.extension.sendRequest({ fn: "log" });