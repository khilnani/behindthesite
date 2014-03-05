$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "100%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
 	new FixedColumns( oTable, {
 		"iLeftColumns": 2,
		"iLeftWidth": 350
 	} );
});
