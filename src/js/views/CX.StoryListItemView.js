/**
 * Draws a story list item
 *
 * @author Adam Roberts
 * @created 9/14/12
 */
CX.StoryListItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'list-item',
	template: _.template($('#list-item-template').html()),

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
		this.$el.html(this.template(this.model.toJSON()));
		return this; 
	} // End render()

//------------------------------------------------------------------------------

}); // End class