$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sScrollX": "100%",
        	"bScrollCollapse": true,
		"bPaginate": false,
		"sAjaxSource": 'data/trends.json'
	} );
    new FixedColumns( oTable );
});
