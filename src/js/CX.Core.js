/**
 * The core application
 *
 * @author Adam Roberts
 * @created 9/17/12
 */
CX = {};
CX.Core = (function()
{
	////////////////////
	// Private
	////////////////////

	// Constants
	var DEBUG = true;

	var stories,
		storyList;

	/**
	 * Initialize the application
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/17/12
	 */
	function _init()
	{
		if(!DEBUG) { // Disable console logging for non-debug mode
            console = {
                log: function() {},
                info: function() {},
                warn: function() {},
                error: function() {},
            };
        }

		stories = new CX.StoryCollection();
		storyList = new CX.StoryListView({ collection: stories });

		storyList.on('itemselected', _showStory, this);
		$(window).on('resize', _.debounce(_doLayout, 50));

		stories.fetch({
			success: function() {
				_parseURL();
			},
			error: function() {
				$('container').html('There ws an error loading news stories.');
			}
		});
	} // End _init()

//------------------------------------------------------------------------------

	/**
	 * Parses the current URL and determines what action to take
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	function _parseURL()
	{
		var hashes = window.location.search.substr(1).split('&');
		var params = {};
		_.each(hashes, function(hash) {
			var splithash = hash.split('=');
			params[splithash[0]] = splithash[1];
		});

		if(params.story) {
			var id = parseInt(params.story.substr(3), 10);
			var model = stories.at(id-1);
			_showStory(null, model);
		}
		else {
			_showStories();
		}
	} // End _parseURL()

//------------------------------------------------------------------------------

	/**
	 * Displays a list of news stories
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	function _showStories()
	{
		$('container').empty();
		$('#container').append(storyList.render().el);
	} // End _showStories()

//------------------------------------------------------------------------------

	/**
	 * Show a single selected story
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	function _showStory(item, model)
	{
		$('#container').empty();
		if(model) {
			$('#container').html(_.template($('#story-column-view-template').html(), model.toJSON()));
		}
		else {
			$('#container').html('<p>Story not found</p>');
		}
		_doLayout();
	} // End _showStory()

//------------------------------------------------------------------------------

	/**
	 * Handle re-ordering of a few elements on resize that can't be done with
	 * CSS
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	function _doLayout()
	{
		var photo = $('#container').children('.lead-photo');
		if(photo.length && $(window).width() > 480) { // Must be in article view
			// Wide
			$('#social-links').insertAfter(photo);
			$('.story-timestamp').insertAfter($('h1'));
		}
		else if(photo.length) {
			// Narrow
			$('#social-links').insertBefore(photo);
			$('.story-timestamp').insertBefore($('h1'));
		}
	} // End _doLayout()

//------------------------------------------------------------------------------

	////////////////////
	// Public
	////////////////////

	return {
		init: _init
	};

//------------------------------------------------------------------------------

}()); // End class

$(function() {
	// Auto init
	CX.Core.init();
});