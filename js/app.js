$(function () {
  var oTable = $('#example').dataTable( {
		"bProcessing": true,
		"sAjaxSource": 'data/trends.json',
		"sScrollX": "10%",
		"bScrollCollapse": true,
		"bPaginate": false
	} );
    new FixedColumns( oTable );
});
