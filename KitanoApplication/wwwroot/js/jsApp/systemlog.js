$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', getSessionToken());
        xhr.setRequestHeader('Accept-Language', 'vi-VN');
        showLoading();
    },
    complete: function (xhr, status, error) {
        hideLoading();

        if (xhr.status == 401)
            //swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
            toastr.error("Bạn cần phải đăng nhập vào hệ thống!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 404)
            //swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
            toastr.error("Không tìm thấy đối tượng để xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 500)
            //swal("Internal Server Error!", "Có lỗi xảy ra trong quá trình xử lý!", "warning");
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 400)
            //swal("Lỗi dữ liệu!", "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "warning");
            toastr.error("Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "Lỗi!", { progressBar: true });
        else if (xhr.status != 200)
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        //swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
    }
});
function callApi_multipleselect(selector, placeholder) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: apiConfig.api.host_user_service + apiConfig.api.systemusergroup.controller + apiConfig.api.systemusergroup.action.select.path,
            dataType: 'json',
            data: function (params) {
                var query = {
                    q: params.term,
                    type: 'public'
                }
                return query;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.full_name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}

//Tìm kiếm 
function onSearch() {
    var frmViewSystemLog = $("#formViewSystemLog");
    showLoading();
    if (localStorage.dataObj) {
        frmViewSystemLog.find("#Name").val(localStorage.name);
        frmViewSystemLog.find("#Module").val(localStorage.module);
        frmViewSystemLog.find("#FromDate").val(localStorage.fromDate);
        frmViewSystemLog.find("#ToDate").val(localStorage.toDate);
        callApi_userservice(
            apiConfig.api.systemlog.controller,
            apiConfig.api.systemlog.action.search.path,
            apiConfig.api.systemlog.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchSystemLogTableSuccess', 'msgError');
    } else if (!localStorage.dataObj) {
        frmViewSystemLog.find("#Name").val(localStorage.name);
        frmViewSystemLog.find("#Module").val(localStorage.module);
        frmViewSystemLog.find("#FromDate").val(localStorage.fromDate);
        frmViewSystemLog.find("#ToDate").val(localStorage.toDate);
        var obj = {
            'name': $('#Name').val().trim(),
            'module': $('#Module').val().trim(),
            'start_date': $('#FromDate').val(),
            'end_date': $('#ToDate').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_userservice(
            apiConfig.api.systemlog.controller,
            apiConfig.api.systemlog.action.search.path,
            apiConfig.api.systemlog.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchSystemLogTableSuccess', 'msgError');
    }

    var obj = {
        'name': $('#Name').val().trim(),
        'module': $('#Module').val().trim(),
        'start_date': $('#FromDate').val(),
        'end_date': $('#ToDate').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.search.path,
        apiConfig.api.systemlog.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSystemLogTableSuccess', 'msgError');
}
function fnSearchSystemLogTableSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#systemLogTable tbody');
        $("#systemLogTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td class="text-center">' + (x = (i + 1 + rspn.record_number)) + '</td>' +
                '<td>' + obj.module + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.perform_tasks + '</td>' +
                '<td class="text-center">' + obj.datetime + '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#systemLogTable").DataTable({
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
                },
                {
                    "targets": [0, 3, 4],
                    "searchable": false,
                    "orderable": false
                }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
        hideLoading();
    } else if (rspn.msg == "DateError") {
        swal("Lỗi dữ liệu đầu vào!", '"Từ ngày" không được lớn hơn "Đến ngày"!', "error");
    } else if (rspn.data == "") {
        var tbBody = $('#systemLogTable tbody');
        $("#systemLogTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#systemLogTable").DataTable({
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
                },
                {
                    "targets": [0, 3, 4],
                    "searchable": false,
                    "orderable": false
                }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustomNull();
        hideLoading();
    }
}
function clickMenu() {
    onSearch();
    localStorage.removeItem("name");
    localStorage.removeItem("module");
    localStorage.removeItem("fromDate");
    localStorage.removeItem("toDate");
}
function nameChange() {
    localStorage.setItem('name', $('#Name').val());
}
function moduleChange() {
    localStorage.setItem('module', $('#Module').val());
}
function fromDateChange() {
    localStorage.setItem('fromDate', $('#FromDate').val());
}
function toDateChange() {
    localStorage.setItem('toDate', $('#ToDate').val());
}
window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 100);

}