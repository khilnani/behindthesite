$(function () {
  $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json'
	} );
});
