/**
 * Defines a collection of stories
 * 
 * @author Adam Roberts
 * @created 9/14/12
 */
CX.StoryCollection = Backbone.Collection.extend({
	url: '../js/uidevtest-data.js',
	model: CX.Story,

//------------------------------------------------------------------------------

	/**
	 * Processes the fetch() response to the collection, to parse out data
	 * needed
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	parse: function(response)
	{
		// Data is located inside "objects"
		return response.objects;
	} // End parse()

//------------------------------------------------------------------------------
	
}); // End class