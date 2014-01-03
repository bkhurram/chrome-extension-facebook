console.log( "start" );

BG = chrome.extension.getBackgroundPage();

var PopupController = {
	init : function() {
		var form = {};
		$( "#modifica" ).on( "click", function( event ) {
			form.name = $( "#name" ).val();
			//chrome.tabs.executeScript( null, { code: "log(\"Modifica\");" } );
			chrome.tabs.executeScript( null, { code: "params = " + JSON.stringify( form ) + "; changePage();" } );
		});

	}
};

$( function() {
	PopupController.init();
});


chrome.extension.sendRequest({ fn: "log" });
