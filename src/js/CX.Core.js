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

		console.log('Application init.');

		stories = new CX.StoryCollection();
		storyList = new CX.StoryListView({ collection: stories });

		storyList.on('itemselected', _showStory, this);
		_showStories();
	} // End _init()

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
		stories.fetch({
			success: function() {
				console.log('success');
				$('#container').append(storyList.render().el);
			},
			error: function() {

			}
		});
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
		$('#container').html(_.template($('#story-column-view-template').html(), model.toJSON()));
	} // End _showStory()

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