/*
$(function () {
  var oTable = $('#example').dataTable( {
  		"bJQueryUI": false,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"bPaginate": false
	} );
});

*/

$(function () {
  var oTable = $('#example').dataTable( {
  		"bJQueryUI": false,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": "700px",
		"sScrollX": "100%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
 	new FixedColumns( oTable, {
 		"iLeftColumns": 1,
		"iLeftWidth": 150
 	} );

});

