(function($, window){ 

"use script";
				
	var app = {
		name: "LocalStorage",
		version: "1.0.0"
	};
	
	app.defaults = {
		navbar: {
			theme: 'primary',
			themes: ['primary', 'success', 'warning', 'danger', 'pink', 'purple', 'inverse', 'dark']
		}
	};
	
	app.$navbar = $("#app-navbar");
	app.settings = app.defaults;
	var appSettings = app.name+"Settings";
	app.storage = $.localStorage; 
	
	if(app.storage.isEmpty(appSettings)) {
		app.storage.set(appSettings, app.settings);
	} else {
		app.settings = app.storage.get(appSettings); 
	}
	
	app.saveSettings = function() {
		app.storage.set(appSettings, app.settings);
	} 
	app.$navbar.removeClass('primary').addClass(app.settings.navbar.theme);
	$('[data-theme='+app.settings.navbar.theme+']').prop('checked', 'checked'); 
	
	window.app = app;  
	
	
	// NAV BAR
	var $navbar = app.$navbar;
	var navbar = {}; 
	
	navbar.getAppliedTheme  = function() {
		var appliedTheme = "", 
			themes = app.settings.navbar.themes,
			theme;
		for(theme in themes) {
			if($navbar.hasClass(themes[theme])) {
				appliedTheme = themes[theme];
				break;
			}
		}
		return appliedTheme;
	};
	
	navbar.getCurrentTheme = function() {
		return app.settings.navbar.theme;
	}; 
	
	navbar.setTheme = function(theme) {
		if(theme) app.settings.navbar.theme = theme;
	};
	
	navbar.applyTheme = function() {
		var appliedTheme = this.getAppliedTheme();
		var currentTheme = this.getCurrentTheme();
	
		$navbar.removeClass(appliedTheme)
				. addClass(currentTheme);
	}
	
	window.app.navbar = navbar;  
	
	
	// Customizer
	var customizer = {};  
	$('[name="navbar-theme"]').on('change', function(e){
		var $selectTheme = $(this); 
		if(app.navbar.getCurrentTheme() !== $selectTheme.attr('data-theme')) {
			app.navbar.setTheme($selectTheme.attr('data-theme')); 
			app.navbar.applyTheme();
			app.saveSettings();
		}
	});
	
	$('#navbar-reset-btn').on('click', function(e){
		app.settings.navbar = app.defaults.navbar;
		app.storage.remove();
		app.saveSettings(); 
	});
	
	window.app.customizer = customizer;  


}(jQuery, window));  
