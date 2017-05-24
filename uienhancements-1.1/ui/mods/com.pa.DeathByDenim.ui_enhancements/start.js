(function() {

	// Automatically open single and multiplayer menu on mouse over
	model.enableSinglePlayerMenu = function () {
		if (!model.allowNewOrJoinGame())
			return;
		model.showSinglePlayerMenu(true);
		model.showMultiplayerMenu(false);
	};
	model.enableMultiplayerMenu = function () {
		if (!model.allowNewOrJoinGame())
			return;
		model.showMultiplayerMenu(true);
		model.showSinglePlayerMenu(false);
	};
	model.disableSubmenus = function () {
		model.showMultiplayerMenu(false);
		model.showSinglePlayerMenu(false);
	};

	$('.nav_item').each(
		function(arg) {
			var olddatabind = $(this).attr('data-bind');

			var newdatabind = olddatabind.replace('click: toggleSinglePlayerMenu', 'event: { mouseover: enableSinglePlayerMenu }');
			if(newdatabind === olddatabind) {
				newdatabind = olddatabind.replace('click: toggleMultiplayerMenu', 'event: { mouseover: enableMultiplayerMenu }');
				if(newdatabind === olddatabind) {
					if($(this).parent().hasClass('nav_sub_item'))
						return;

					newdatabind = 'event: { mouseover: disableSubmenus }, ' + newdatabind;
					
				}
			}

			$(this).attr('data-bind', newdatabind)
		}
	);


	// Show current rank after badge.
	model.uienhancements_currentrank = ko.computed(function() {
		if(model.playerRatingInfo().LeaderboardPosition <= 0)
			return '';
		else
			return '#' + model.playerRatingInfo().LeaderboardPosition;
	});

	$('#ladder_badge').append('<div style="position: relative; width: 0; height: 0"><span data-bind="text: uienhancements_currentrank" style="position: absolute; top: .2em; left: 0em;"></span></div>')


	// Focus cursor on password field.
	setTimeout(function() {$('input.input_text')[1].focus();}, 1000);


})();
