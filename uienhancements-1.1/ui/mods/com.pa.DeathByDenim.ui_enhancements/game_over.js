(function() {

	// Show your new rank in the game over screen.
	model.uienhancements_leaderBoardPosition = ko.observable(' (#??)');
	model.getLeaderBoardPosition = function () {
		model.uienhancements_leaderBoardPosition(' (#??)');

		engine.asyncCall('ubernet.getPlayerRating', MatchmakingUtility.getMatchmakingType()).done(function (data) {
			data = JSON.parse(data)
			if(data.LeaderboardPosition <= 0)
				model.uienhancements_leaderBoardPosition('');
			else
				model.uienhancements_leaderBoardPosition(' (#' + data.LeaderboardPosition + ')');
		});
	};

	var old_handlers_rating_updated = handlers.rating_updated;
	handlers.rating_updated = function(payload) {
		model.getLeaderBoardPosition();
		old_handlers_rating_updated(payload);
	}

	model.leagueText = ko.computed(function () {
		return MatchmakingUtility.getTitle(model.league()) + model.uienhancements_leaderBoardPosition();
	});

})();
