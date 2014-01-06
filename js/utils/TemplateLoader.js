var TemplateLoader = {
	
	loadTemplate: function ( name ) {
		
		return $.ajax({
					url: "/js/templates/" + name + ".html",
					contentType: 'text/html;charset=utf-8', 
					Type: "html",
				
					// This is the imporant part!!!
					beforeSend: function(jqXHR) {
						jqXHR.overrideMimeType( 'text/html;charset=utf-8' );
					}
		});
		
	}
};