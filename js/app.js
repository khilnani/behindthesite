$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": "500px",
		"sScrollX": "100%",
		"bScrollCollapse": false,
		"bPaginate": true
	} );
 	new FixedColumns( oTable, {
 		"iLeftColumns": 1,
		"iLeftWidth": 150
 	} );
});
