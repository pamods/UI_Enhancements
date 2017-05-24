(function() {

	// Allows <Enter> after entering replay id to view replay.
	model.uienhancement_findenter = function(data, event) {
		if(event.keyCode === 13) {
			model.viewSelectedReplay();
			return false;
		}

		return true;
	}
	var olddatabind = $('#search-filter').attr('data-bind');
	$('#search-filter').attr('data-bind', olddatabind + ', event: { keypress: uienhancement_findenter }');

	
	// Focus cursor on text field.
	setTimeout(function() {$('#search-filter')[0].focus();}, 1000);


})();
