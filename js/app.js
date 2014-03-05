$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "true",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable );
});
