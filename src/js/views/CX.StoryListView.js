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
			buffer.push(item.render().el);
		}, this);

		// Render all at once for minimal reflows
		this.$el.append(buffer);

		return this;
	} // End render()

//------------------------------------------------------------------------------

}); // End class