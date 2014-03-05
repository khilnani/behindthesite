$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "100px",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable, {
	"iLeftColumns": 1,
    	"iRightColumns": 0
    	
    } );
});
