function onSearch() {
    var param = parseInt($("#AuditWorkManageAuditProgress").val());
    if (validateRequired('#collapseSearch')) {
        callApi_auditservice(
            apiConfig.api.manageauditprogress.controller,
            apiConfig.api.manageauditprogress.action.searchmageauditprogress.path + "/" + param,
            apiConfig.api.manageauditprogress.action.searchmageauditprogress.method,
            null, 'fnSearchManageAuditProgress', 'msgError');
    }
}

function fnSearchManageAuditProgress(rspn) {
    showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        //Tab số 1
        var tbBodySchedule = $('#scheduletable tbody');
        $("#scheduletable").dataTable().fnDestroy();
        tbBodySchedule.html('');
        if (data.listschedule !== undefined && data.listschedule !== null) {
            var data_ = data.listschedule;
            _countSchedule = data_.length;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.work + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td class="text-center">' + obj.expected_date_schedule + '</td>' +
                    '<td class="text-center">' + obj.actual_date_schedule + '</td>' +
                    '<td style="text-align: center; width: 2%" class="col-action">' +
                    '<a type="button" data-toggle="modal" data-target="#modalEditDateSchedule" class="btn icon-default btn-action-custom" onclick="EditSchedule(' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBodySchedule.append(html);
            }
        }
        //Tab số 2
        var tbBodyMainstage = $('#mainStagetable tbody');
        $("#mainStagetable").dataTable().fnDestroy();
        tbBodyMainstage.html('');
        if (data.mainstage !== undefined && data.mainstage !== null) {
            var data_ = data.mainstage;
            _countMainstage = data_.length;
            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.stage + '</td>' +
                    '<td class="text-center">' + obj.expected_date_mainstage + '</td>' +
                    '<td class="text-center">' + obj.actual_date_mainstage + '</td>' +
                    '<td>' + obj.status + '</td>' +
                    '<td style="text-align: center; width: 2%" class="col-action">' +
                    '<a type="button" data-toggle="modal" data-target="#modalEditDateMainstage" class="btn icon-default btn-action-custom" onclick="EditMainstage(' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBodyMainstage.append(html);
            }
        }
    }
}
//function loadYearDefault() {
//    setTimeout(function () {
//        callApi_auditservice(
//            apiConfig.api.auditobserve.controller,
//            apiConfig.api.auditobserve.action.listyearauditworkdefault.path,
//            apiConfig.api.auditobserve.action.listyearauditworkdefault.method,
//            null, 'ListYearSuccess', 'msgError');
//    }, 100);
//}
window.onload = function () {
    clearMsgInvalid();
    $('#YearManageAuditProgress').val(null).trigger('change');
    $('#AuditWorkManageAuditProgress').val(null).trigger('change');
    //loadYearDefault();
}
//function ListYearSuccess(rs) {
//    var data = rs.data;
//    if (data != null) {
//        var newOption = new Option(data.id, data.year, true, false);
//        $('#YearManageAuditProgress').append(newOption).trigger('change');
//        onSearch();
//    } else {
//        onSearch();
//    }
//}
function setValueYear(elment) {
    $('#AuditWorkManageAuditProgress').val(null).trigger('change');
    $('#AuditWorkManageAuditProgress').html('');
}
//lịch trình công việc
function EditSchedule(id) {
    clearMsgInvalid();
    $("#formEditDateSchedule").find("#EditDateSchedule").val("");
    
    callApi_auditservice(
        apiConfig.api.manageauditprogress.controller,
        apiConfig.api.manageauditprogress.action.detailschedule.path + "/" + id,
        apiConfig.api.manageauditprogress.action.detailschedule.method,
        null, 'DetailScheduleSuccess', 'msgError');
}

function DetailScheduleSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formEditDateSchedule").find("#IdEditDateSchedule").val(data.id);
        $("#formEditDateSchedule").find("#EditDateSchedule").val(data.actual_date);
    }
}
function submitEditDateSchedule() {
    var obj = {
        'id': $('#IdEditDateSchedule').val(),
        'actual_date': $('#EditDateSchedule').val(),
    }
    if (validateRequired('#formEditDateSchedule')) {
        callApi_auditservice(
            apiConfig.api.manageauditprogress.controller,
            apiConfig.api.manageauditprogress.action.editschedule.path,
            apiConfig.api.manageauditprogress.action.editschedule.method,
            obj, 'EditScheduleSuccess', 'msgError');
    }
}
function EditScheduleSuccess(data) {
    if (data.code === '1') {
        createdLog("Quản lý tiến độ cuộc kiểm toán", "Chỉnh sửa ngày thực tế thực hiện của lịch trình công việc");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        //setTimeout(function () {
        //    window.location.href = "/ManageAuditProgress"
        //}, 2000);
        onSearch();
        $('#modalEditDateSchedule').modal('hide');
    } else if (data.code === "-1") {
        toastr.error(data.msg, "Lỗi!", { progressBar: true });
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}
//Giai đoạn chính
function EditMainstage(id) {
    clearMsgInvalid();
    $("#formEditDateMainstage").find("#EditDateMainstage").val("");
   
    callApi_auditservice(
        apiConfig.api.manageauditprogress.controller,
        apiConfig.api.manageauditprogress.action.detailmainstage.path + "/" + id,
        apiConfig.api.manageauditprogress.action.detailmainstage.method,
        null, 'DetailMainstageSuccess', 'msgError');
}

function DetailMainstageSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formEditDateMainstage").find("#IdEditDateMainstage").val(data.id);
        $("#formEditDateMainstage").find("#EditDateMainstage").val(data.actual_date);
        localStorage.setItem("stage", data.stage);
    }
}
function submitEditDateMainstage() {
    let checkstage = localStorage.getItem('stage');
    let _status = "";
    switch (checkstage) {
        case "Bắt đầu lập kế hoạch":
            _status = "Đang lập kế hoạch";
            break;
        case "Kết thúc lập kế hoạch":
            _status = "Chuẩn bị KT tại thực địa";
            break;
        case "Bắt đầu thực địa":
            _status = "Đang KT tại thực địa";
            break;
        case "Kết thúc thực địa":
            _status = "Đang lập BCKT";
            break;
        case "Phát hành báo cáo":
            _status = "Đã phát hành BCKT";
            break;
        default:
        //default
    }
    var obj = {
        'id': $('#IdEditDateMainstage').val(),
        'status': _status,
        'actual_date': $('#EditDateMainstage').val(),
    }
    if (validateRequired('#formEditDateMainstage')) {
        callApi_auditservice(
            apiConfig.api.manageauditprogress.controller,
            apiConfig.api.manageauditprogress.action.editmainstage.path,
            apiConfig.api.manageauditprogress.action.editmainstage.method,
            obj, 'EditMainstageSuccess', 'msgError');
    }
}

function EditMainstageSuccess(data) {
    if (data.code === '1') {
        createdLog("Quản lý tiến độ cuộc kiểm toán", "Chỉnh sửa ngày thực tế thực hiện của giai đoạn chính");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        //setTimeout(function () {
        //    window.location.href = "/ManageAuditProgress"
        //}, 2000);
        onSearch();
        $('#modalEditDateMainstage').modal('hide');
        localStorage.removeItem("stage");
    }
    else if(data.code === "-1"){
        toastr.error(data.msg, "Lỗi!", { progressBar: true });
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}

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