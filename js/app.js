$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "1%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable );
});
