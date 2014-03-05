$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sScrollX": "100%",
        	"bScrollCollapse": true,
		"sAjaxSource": 'data/trends.json'
	} );
    new FixedColumns( oTable );
});
