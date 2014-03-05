$(function () {
  var oTable = $('#example').dataTable( {
  		"bJQueryUI": true,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": "700px",
		"sScrollX": "100%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );

});
