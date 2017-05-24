(function() {

	if(api.content.usingTitans())
	{
		// Add Product filter
		model.productFilter = ko.observable('any');
		$('.section_controls').append(
			'                    <div class="form-group">\n' +
			'                        <label for="product">\n' +
			'                            <loc>Product</loc>\n' +
			'                        </label>\n' +
			'                        <select class="selectpicker form-control" id="Select2" name="product" data-bind="selectPicker: productFilter">\n' +
			'\n' +
			'                            <option value="any">Any</option>\n' +
			'\n' +
			'                            <option value="classic">Classic</option>\n' +
			'\n' +
			'                            <option value="titans">Titans</option>\n' +
			'                        </select>\n' +
			'                    </div>\n'
		);

		// Insert the new filter in the filtering algorithm. The only way
		// this can be done without completely rewriting the filter
		// function, is to just filter the source.
		model.allGames = ko.computed(function () {
			var gamelist = model.gameList().concat(model.lanGameList(),model.customGameList());
			if(model.productFilter() === 'classic')
			{
				_.remove(gamelist, function (game) {
					return game.titans;
				});
			}
			else if(model.productFilter() === 'titans')
			{
				_.remove(gamelist, function (game) {
					return !game.titans;
				});
			}

			return gamelist;
		});
	}


	// Restore filter settings.
	if(!_.isUndefined(localStorage.uienhancements_serverbrowsersettings))
	{
		var filtersettings = decode(localStorage.uienhancements_serverbrowsersettings);
		console.log(filtersettings);
		model.gameStateFilter(filtersettings['gameStateFilter']);
		model.gameStatusFilter(filtersettings['gameStatusFilter']);
		model.gameModeFilter(filtersettings['gameModeFilter']);

		model.planetCountMinFilter(filtersettings['planetCountMinFilter']);
		model.planetCountMaxFilter(filtersettings['planetCountMaxFilter']);
		model.playerCountMinFilter(filtersettings['playerCountMinFilter']);
		model.playerCountMaxFilter(filtersettings['playerCountMaxFilter']);
		model.regionFilter(filtersettings['regionFilter']);
		model.gameTagFilter(filtersettings['gameTagFilter']);
		model.lockedFilter(filtersettings['lockedFilter']);
		if(api.content.usingTitans())
			model.productFilter(filtersettings['product']);
	}


	// Remember filter settings.
	$(window).unload(function() {
		console.log("Saving settings");
		var filtersettings = {
			'gameStateFilter': model.gameStateFilter(),
			'gameStatusFilter': model.gameStatusFilter(),
			'gameModeFilter': model.gameModeFilter(),

			'planetCountMinFilter': model.planetCountMinFilter(),
			'planetCountMaxFilter': model.planetCountMaxFilter(),
			'playerCountMinFilter': model.playerCountMinFilter(),
			'playerCountMaxFilter': model.playerCountMaxFilter(),
			'regionFilter': model.regionFilter(),
			'gameTagFilter': model.gameTagFilter(),
			'lockedFilter': model.lockedFilter()
		};
		if(api.content.usingTitans())
			filtersettings['product'] = model.productFilter();

		localStorage.uienhancements_serverbrowsersettings = encode(filtersettings);
	});

})();
