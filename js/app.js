$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "100px",
		"sScrollXInner": "100%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable, {
	"iLeftColumns": 1,
    	"iRightColumns": 0
    } );
});
