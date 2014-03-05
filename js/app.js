$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sScrollX": "100%",
        	"sScrollXInner": "150%",
        	"bScrollCollapse": true,
		"bPaginate": false,
		"sAjaxSource": 'data/trends.json'
	} );
  new $.fn.dataTable.FixedColumns( oTable );
});
