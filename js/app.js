$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollY": "300px",
		"sScrollX": "100%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable, {
	"iLeftColumns": 1,
    	"iRightColumns": 0
    } );
});
