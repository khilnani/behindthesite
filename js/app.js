$(function () {
  var dTable = $('#dataTable').dataTable( {
  	"bJQueryUI": false,
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": $( window ).height() - 200,
		"sScrollX": "150%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
 	new FixedColumns( dTable, {
 		"iLeftColumns": 1,
		"iLeftWidth": 150
 	} );
});

