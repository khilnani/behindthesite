$(function () {
  $('#example').dataTable( {
		"bProcessing": true,
		"sScrollX": "800px",
		"bPaginate": false,
		"sAjaxSource": 'data/trends.json'
	} );
});
