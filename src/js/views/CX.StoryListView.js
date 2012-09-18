/**
 * Draws a story list item
 *
 * @author Adam Roberts
 * @created 9/14/12
 */
CX.StoryListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'story-list',
	collection: null,

//------------------------------------------------------------------------------

	/**
	 * Initialize the object
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	initialize: function (options)
	{ 
		// Apply options
		$.extend(this, options);

		_.bindAll(this, 'render');
	}, // End initialize()

//------------------------------------------------------------------------------

	/**
	 * Render the object
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	render: function ()
	{ 
		// Render snippets
		var buffer = [];
		this.collection.each(function(story) {
			item = new CX.StoryListItemView({model: story})
			item.on('itemselected', this.onItemSelected, this);
			buffer.push(item.render().el);
		}, this);

		// Render all at once for minimal reflows
		this.$el.append(buffer);

		return this;
	}, // End render()

//------------------------------------------------------------------------------

	/**
	 * Handles when a list item is selected
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	onItemSelected: function(item, model)
	{
		console.log('list item selected');
		this.trigger('itemselected', item, model);
	} // End onItemSelected()

//------------------------------------------------------------------------------

}); // End class