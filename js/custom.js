$('.input-daterange').datepicker({
    format: "dd/mm/yyyy",
    weekStart: 1,
    endDate: "d",
    language: "da",
    autoclose: true,
    clearBtn: true,
});

$(".js-example-basic-single").select2({
    placeholder: {
        id: '-1',
        text: 'Vælg...'
    },
    minimumResultsForSearch: Infinity,
    width: '100%',
});


$('#selectType').on('select2:select', function (e) {
    var data = e.params.data;
    $('#type').val(data.id);
    if ($('#claimType').val())
        $('#btnSearch').removeAttr("disabled");

});

$('#selectClaimType').on('select2:select', function (e) {
    var data = e.params.data;
    $('#claimType').val(data.id);
});

$("#enterClaimValue").change(function () {
    $("#claimValue").val($("#enterClaimValue").val());
});

$('#datepicker').on('changeDate', function () {
    $('#startDate').val(
        $('#start').datepicker('getFormattedDate')
    );
    $('#endDate').val(
        $('#end').datepicker('getFormattedDate')
    );
    if ($('#type').val())
        $('#btnSearch').removeAttr("disabled");
});

$('#selectExportType').on('select2:select', function (e) {
    var data = e.params.data;
    $('#exportType').val(data.id);
    $('#btnExport').removeAttr("disabled");
});

$('#resultsInPage').on('select2:select', function (e) {
    var data = e.params.data;
    $('#numberOfResultsPerPage').val(data.id);
});

$('#lastPage').click(function () {
    $('#step').val('lastPage');
    $("#pagning").submit();
});

$('#firstPage').click(function () {
    $('#step').val('firstPage');
    $("#pagning").submit();
});

$('#backOnePage').click(function () {
    $('#step').val('backOne');
    $("#pagning").submit();
});

$('#forwardOnePage').click(function () {
    $('#step').val('forwardOne');
    $("#pagning").submit();
});

$('#lastPage').hover(function () {
    $(this).css('cursor', 'pointer');
});

$('#backOnePage').hover(function () {
    $(this).css('cursor', 'pointer');
});

$('#firstPage').hover(function () {
    $(this).css('cursor', 'pointer');
});

$('#forwardOnePage').hover(function () {
    $(this).css('cursor', 'pointer');
});

$("#btnExport").click(function () {
    $("#export").submit();
});
$("#btnSearch").click(function () {
    $("#search").submit();
});