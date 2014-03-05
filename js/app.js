$(function () {
  var oTable = $('#example').dataTable( {
  		"bJQueryUI": true,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"bPaginate": false
	} );

});
