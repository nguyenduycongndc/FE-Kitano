var validateform;
var validateform_modify;
var editor;
$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
    getStatus();
});
function createdLog(_module, _perform_tasks) {

    var obj = {
        'module': _module,
        'perform_tasks': _perform_tasks,
    }
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.add.path,
        apiConfig.api.systemlog.action.add.method,
        obj, '', '');
}

window.onload = function () {
    let checkLocalType = localStorage.getItem('type');
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem('id');
    let id = parseInt(checkLocalId);
    if (checkLocalType === null && checkLocalId === null) {
        type = 0;
        id = 0;
    }
    editor = CKEDITOR.replace('quality', {
        height: 300,
        disableObjectResizing: true
    });

    setTimeout(function () {
        openView(type, id);
    }, 100);
}
function openView(type, value) {
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _create = $("#create");
    var _header_index = $("#header-view");
    var _header_detail = $("#header-detail");
    var _header_modify = $("#header-modify");
    var _header_add = $("#header-add");
    if (type === 0) {

        _index.show();
        _header_index.show();
        _modify.hide();
        _header_modify.hide();
        _create.hide();
        _header_add.hide();
        _detail.hide();
        _header_detail.hide();
        setTimeout(function () {
            getYearAuditWork(); onSearch();
        }, 100);
        localStorage.setItem("type", 0);
    }
    else if (type === 1) { //add
        $("#formCreate")[0].reset();
        validateform.resetForm();
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify.hide();
        _create.show();
        _header_add.show();
        _detail.hide();
        _header_detail.hide();
        setTimeout(function () {
            getYearAuditWork();
        }, 100);
        localStorage.setItem("type", 1);
    }
    else if (type === 2 || type === 3 || type == 4 || type == 5) { // modify
        $("#formModify")[0].reset();
        editor.setData("");
        validateform_modify.resetForm();
        _index.hide();
        _header_index.hide();
        _modify.show();
        _header_modify.show();
        _create.hide();
        _header_add.hide();
        _detail.hide();
        _header_detail.hide();
        ViewDetail(type);
        fnGetDetail(value);
        localStorage.setItem("type", type);
        localStorage.setItem("id", value);
    }
}

function getYearAuditWork() {
    var obj = {
        'year': '',
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchyear.path,
        apiConfig.api.auditwork.action.searchyear.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearAuditWork');
}
function fillYearAuditWork(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Year').html('');
    $('#Year').append(htmlOption);
    $('#yearCreate').html('');
    $('#yearCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (let item of _data) {
        var obj = item;
        html += '<option value="' + obj.year + '">' + obj.year + '</option>';
    }
    $('#Year').append(html);
    $('#yearCreate').append(html);
}
//#region Create
function fnCreateSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán năm", "Thêm mới báo cáo");
        setTimeout(function () {
            openView(0, 0);
        }, 100);
    }
    else if (rspn.code === '0') {
        toastr.error("Báo cáo cuộc kiểm toán năm đã tồn tại!", "Lỗi!", { progressBar: true });
    }
    else {
        toastr.error("Thêm mới báo cáo không thành công!", "Lỗi!", { progressBar: true });
    }
}
//#endregion Create

//#region List
function renderhtml(obj, currentUser, level_approval) {
    var html = '';
    html = '<tr>' +
        '<td class="text-center"></td>' +
        '<td class="text-center">' + viewValue(obj.year) + '</td>' +
        '<td class="line-break">' + viewValue(obj.name) + '</td>' +
        '<td class="text-left">' + viewValue(obj.statusname) + '</td>' +
        '<td class="col-action"  style="width:17% !important;"> ' +
        (IsCheckPemission("M_RAP", "PER_DETAIL") === true ?
            '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>') +
        ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1") && IsCheckPemission("M_RAP", "PER_EDIT") === true ?
            '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>') +
        ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2") && IsCheckPemission("M_RAP", "PER_DEL") === true ?
            '<a class="btn icon-delete btn-action-custom btn-sm" onclick="Delete(' + obj.id + ',\'' + obj.name + '\')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +
        '<span class="dropdown">' +
        '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' +
        obj.id +
        '"><i class="fas fa-ellipsis-v"></i></a>' +
        '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' +
        obj.id +
        '">' +
        '<li class="optioncustom">' +
        '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="Export(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word"></i>&nbsp Xuất file word</a>' +
        '</li>' +
        '<li class="optioncustom">' +
        ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1") &&
            IsCheckPemission("M_RAP", "PER_REQUEST") === true
            ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' +
            obj.id +
            ')" data-id="' +
            obj.id +
            '" data-name="' +
            obj.name +
            '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
        "</li>" +
        '<li class="optioncustom">' +
        (((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id)) &&
            IsCheckPemission("M_RAP", "PER_APPROVE") === true
            ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(5,' +
            obj.id +
            ')"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true"></i>&nbsp Phê duyệt</a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Phê duyệt</a>') +
        "</li>" +
        '<li class="optioncustom">' +

        (IsCheckPemission('M_RAP', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
        ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.name + '\',\'M_RAP\',\'Báo cáo kiểm toán năm \')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
        : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
        '</li>' +
        '<li class="optioncustom">' +
        ((IsCheckPemission('M_RAP', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_RAP') == 1)
            ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.name + '\',\'M_RAP\',\'Báo cáo kiểm toán năm\',' + obj.year + ')" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
            : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
        '</li>' +
        "</ul>" +
        "</span>" +
        '</td>' +
        '</tr>';
    return html;
}
function fnSearchSuccess(rspn) {
    var tbBody = $('#reportTable tbody');
    $("#reportTable").dataTable().fnDestroy();
    var level_approval = getApprovallevel("M_RAP");
    tbBody.html('');
    var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        for (let obj of data) {
            var html = renderhtml(obj, currentUser, level_approval);
            tbBody.append(html);
        }
    }
    var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    var t = $("#reportTable").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        //"scrollX": true,
        "columnDefs": [
            {
                "targets": 0,
                "className": "text-center",
                "orderable": false,
                "data": null,
                render: function (data_table, type, row, meta) {
                    return meta.row + page_size + 1;
                }
            },
            {
                "targets": [1, 2, 3],
                "searchable": false,
                "orderable": false
            }
        ],
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
}
function onSearch() {
    var obj = {
        'year': $('#Year').val(),
        'status': $('#Status').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_reportservice(
        apiConfig.api.reportaduditworkyear.controller,
        apiConfig.api.reportaduditworkyear.action.search.path,
        apiConfig.api.reportaduditworkyear.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}
//#endregion List

//#region Delete
function fnDeleteSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán năm", "Xóa báo cáo");
        setTimeout(function () {
            onSearch();
        }, 100);

    }
    else {
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnDelete(id) {
    callApi_reportservice(
        apiConfig.api.reportaduditworkyear.controller,
        apiConfig.api.reportaduditworkyear.action.delete.path + "/" + id,
        apiConfig.api.reportaduditworkyear.action.delete.method,
        null, 'fnDeleteSuccess', 'msgError');
}
function Delete(id, name) {
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDelete(id);
        }
    });
}
//#endregion

function gettype(type) {
    switch (type) {
        case 1:
            return "Trong hạn";
        case 2:
            return "Quá hạn";
        case 3:
            return "< 30 ngày";
        case 4:
            return "30 - 60 ngày";
        case 5:
            return "60 - 90 ngày";
        case 6:
            return "> 90 ngày";
        case 7:
            return "Gia hạn";
        case 8:
            return "Tổng số";

    }
}
function fnUpdateSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán năm năm", "Cập nhật báo cáo");
        setTimeout(function () {
            openView(0, 0);
        }, 100);
    }
    else {
        toastr.error("Cập nhật báo cáo không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnGetDetailSuccess(rspn) {
    var frmModify = $("#formModify");
    var obj;
    var html;
    var __tbBody;
    var index = 0;
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var report1 = rspn.report1;
        var report2 = rspn.report2;
        var report3 = rspn.report3;
        var report4 = rspn.report4;
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#StatusEdit").val(data.status);
        frmModify.find("#year").val(data.year);
        frmModify.find("#name").val(data.name);
        frmModify.find("#evaluation").val(data.evaluation);
        frmModify.find("#concerns").val(data.concerns);
        frmModify.find("#reason").val(data.reason);
        frmModify.find("#note").val(data.note);
        frmModify.find("#overcome").val(data.overcome);
        editor.setData(data.quality);
        frmModify.find("#audit_plan_current").text(report1.audit_plan_current);
        frmModify.find("#audit_completed_current").text(report1.audit_completed_current);
        frmModify.find("#completed_current").text(report1.completed_current);
        frmModify.find("#audit_expected_current").text(report1.audit_expected_current);
        frmModify.find("#audit_plan_previous").text(report1.audit_plan_previous);
        frmModify.find("#audit_completed_previous").text(report1.audit_completed_previous);
        frmModify.find("#completed_previous").text(report1.completed_previous);
        frmModify.find("#audit_expected_previous").text(report1.audit_expected_previous);
        frmModify.find("#audit_plan_volatility").text(report1.audit_plan_volatility);
        frmModify.find("#audit_completed_volatility").text(report1.audit_completed_volatility);


        __tbBody = $('#tableresult tbody');
        $("#tableresult").dataTable().fnDestroy();
        __tbBody.html('');
        index = 1;
        for (let item of report2) {
            obj = item;
            html = '<tr>' +
                '<td>' + index + '</td>' +
                '<td class="line-break">' + viewValue(obj.audit_name) + '</td>' +
                '<td class="text-center">' + viewValue(obj.audit_time) + '</td>' +
                '<td class="text-center">' + viewValue(obj.report_date) + '</td>' +
                '<td>' + viewValue(obj.level) + '</td>' +
                '<td class="text-center">' + viewValue(obj.risk_high) + '</td>' +
                '<td class="text-center">' + viewValue(obj.risk_medium) + '</td>' +
                '</tr>';
            __tbBody.append(html);
            index++;
        }

        __tbBody = $('#tableobserve tbody');
        $("#tableobserve").dataTable().fnDestroy();
        __tbBody.html('');
        index = 1;
        for (let item of report3) {
            obj = item;
            html = '<tr>' +
                '<td>' + index + '</td>' +
                '<td class="line-break">' + viewValue(obj.audit_name) + '</td>' +
                '<td class="text-left">' + viewValue(obj.audit_summary) + '</td>' +
                '<td class="text-left">' + viewValue(obj.audit_request_content) + '</td>' +
                '<td class="text-left">' + viewValue(obj.audit_request_status) + '</td>' +
                '</tr>';
            __tbBody.append(html);
            index++;
        }

        __tbBody = $('#tableauditrequest tbody');
        $("#tableauditrequest").dataTable().fnDestroy();
        __tbBody.html('');
        index = 1;
        for (let item of report4) {
            obj = item;
            html = '<tr>' +
                '<td>' + gettype(obj.type) + '</td>' +
                '<td class="text-center">' + obj.beginning_high + '</td>' +
                '<td class="text-center">' + obj.notclose_high + '</td>' +
                '<td class="text-center">' + obj.close_high + '</td>' +
                '<td class="text-center">' + obj.ending_high + '</td>' +
                '<td class="text-center">' + obj.beginning_medium + '</td>' +
                '<td class="text-center">' + obj.notclose_medium + '</td>' +
                '<td class="text-center">' + obj.close_medium + '</td>' +
                '<td class="text-center">' + obj.ending_medium + '</td>' +
                //'<td class="text-center">' + obj.total + '</td>' +
                '</tr>';
            __tbBody.append(html);
            index++;
        }
    }

    $("#tableresult").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "ordering": false,
    });

    $("#tableobserve").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "ordering": false,
    });
    $("#tableauditrequest").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "ordering": false,

    });

}
function fnGetDetail(param) {
    var call_back = 'fnGetDetailSuccess';
    callApi_reportservice(
        apiConfig.api.reportaduditworkyear.controller,
        apiConfig.api.reportaduditworkyear.action.getItem.path + "/" + param,
        apiConfig.api.reportaduditworkyear.action.getItem.method,
        null, call_back, 'msgError');
}


function getStatus() {
    callApi_reportservice(
        apiConfig.api.reportaduditworkyear.controller,
        apiConfig.api.reportaduditworkyear.action.liststatusreportyear.path,
        apiConfig.api.reportaduditworkyear.action.liststatusreportyear.method,
        null, 'fillStatus', 'msgError');
}
function fillStatus(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Status').html('');
    $('#Status').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (let item of _data) {
        var obj = item;
        html += '<option value="' + obj.status_code + '">' + obj.status_name + '</option>';
    }
    $('#Status').append(html);
}

function ViewDetail(type) {
    if (type == 3) {
        $("#formModify textarea").prop("disabled", true);
        $("#btn-sendbrowse").hide();
        $("#btn-edit").hide();
        $("#btn-approve-reject").hide();
        editor.setReadOnly(true);

    }
    else if (type == 2) {
        $("#formModify textarea").prop("disabled", false);
        $("#btn-sendbrowse").hide();
        $("#btn-edit").show();
        $("#btn-approve-reject").hide();
        editor.setReadOnly(false);

    }
    else if (type == 4) {
        $("#formModify textarea").prop("disabled", true);
        $("#btn-sendbrowse").show();
        $("#btn-edit").hide();
        $("#btn-approve-reject").hide();
        editor.setReadOnly(true);

    }
    else {
        $("#formModify textarea").prop("disabled", true);
        $("#btn-sendbrowse").hide();
        $("#btn-edit").hide();
        $("#btn-approve-reject").show();
        editor.setReadOnly(true);

    }
}
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#formCreate").validate({
        rules: {
            year: { required: true },
            name: { required: true },
        },
        submitHandler: function () {
            var obj = {
                'year': $("#formCreate").find("#yearCreate").val(),
                'name': $("#formCreate").find("#nameCreate").val(),
            }
            callApi_reportservice(
                apiConfig.api.reportaduditworkyear.controller,
                apiConfig.api.reportaduditworkyear.action.add.path,
                apiConfig.api.reportaduditworkyear.action.add.method,
                obj, 'fnCreateSuccess', 'msgError');
        }
    });
    validateform_modify = $("#formModify").validate({
        rules: {
            evaluation: { required: true },
            concerns: { required: true },
        },
        submitHandler: function () {
            var obj = {
                'id': $("#formModify").find("#IdEdit").val(),
                'evaluation': $("#formModify").find("#evaluation").val(),
                'concerns': $("#formModify").find("#concerns").val(),
                'reason': $("#formModify").find("#reason").val(),
                'note': $("#formModify").find("#note").val(),
                'quality': editor.getData(),
                'overcome': $("#formModify").find("#overcome").val(),
            }
            callApi_reportservice(
                apiConfig.api.reportaduditworkyear.controller,
                apiConfig.api.reportaduditworkyear.action.update.path,
                apiConfig.api.reportaduditworkyear.action.update.method,
                obj, 'fnUpdateSuccess', 'msgError');
        }
    });
});
function Export(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_report_service + apiConfig.api.reportaduditworkyear.controller + apiConfig.api.reportaduditworkyear.action.export.path + "/" + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Bao_Cao_kiem_toan_nam.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu!", "Lỗi!", { progressBar: true });
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra!", "Lỗi!", { progressBar: true });
        }
    }
    request.send();
}