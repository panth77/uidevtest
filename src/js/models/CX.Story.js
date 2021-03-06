/**
 * Defines a news story
 *
 * @author Adam Roberts
 * @created 9/14/12
 */
CX.Story = Backbone.Model.extend({
	numColumns: 2,
	
//------------------------------------------------------------------------------

	/**
	 * Initialize the model
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	initialize: function() 
	{
		this.set('pub_date', Date.parse(this.get('pub_date')));
		this.set('updated', Date.parse(this.get('updated')));
		this.calcColumns();
	}, // End initialize()

//------------------------------------------------------------------------------

	/**
	 * Splits the text into columns without breaking paragraphs
	 * @private
	 *
	 * @author Adam Roberts
	 * @created 9/14/12
	 */
	calcColumns: function()
	{
		var columns = [];

		// Calc columns by splitting count of paragraphs
		var str = this.get('story'),
			rawparagraphs = str.split(/<\/p>\s*<p>/),
			paragraphs = [];

		_.each(rawparagraphs, function(par) {
			paragraphs.push('<p>'+par.replace(/(<p>|<\/p>)/, '')+'</p>');
		});

		var perCol = Math.floor(paragraphs.length / this.numColumns);

		for(x = 0; x < this.numColumns; x++) {
			if(x === this.numColumns-1) { // Last column gets leftovers
				columns[x] = paragraphs.slice(x*perCol).join('');
			}
			else {
				columns[x] = paragraphs.slice((x*perCol), (x*perCol)+perCol).join('');
			}
		}
		this.set('columns', columns);
	} // End calcColumns()

//------------------------------------------------------------------------------

}); // End class