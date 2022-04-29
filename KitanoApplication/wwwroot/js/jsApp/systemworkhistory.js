$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
});
function fnSearchSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#workhistorytable tbody');
        $("#workhistorytable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];            
            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td>' + obj.user_name + '</td>' +
                '<td>' + obj.full_name + '</td>' +
                '<td>' + obj.department_name+'</td>' +
                '<td class="text-center">' + obj.date_of_joining + '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#workhistorytable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": 0,
                    "className": "text-center",
                    "orderable": false,
                    "data": null,
                    "order": [],
                    render: function (data, type, row, meta) {
                        return meta.row + page_size + 1;
                    }
                }                
            ],
            "order": [],
        });
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
    }
}
function fillParentCombo(data) {
    var htmlOption = '<option value="">----Chọn----</option>';
    $('#filterDeparment').html('');
    $('#filterDeparment').append(htmlOption);

    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'childs');
    $('#filterDeparment').append(html);
}
function getParents() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };

    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillParentCombo');

}
function onSearch() {   
    var obj = {
        'user_name': $('#filterUserName').val(),
        'department_id': $('#filterDeparment').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.searchhistory.path,
        apiConfig.api.systemuser.action.searchhistory.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}
