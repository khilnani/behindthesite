$(function () {
  var dTable = $('#dataTable').dataTable( {
  	"bJQueryUI": false,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": "700px",
		"sScrollX": "150%",
		"bScrollCollapse": true,
		"bPaginate": true
	} );
 	new FixedColumns( dTable, {
 		"iLeftColumns": 1,
		"iLeftWidth": 150
 	} );
});

