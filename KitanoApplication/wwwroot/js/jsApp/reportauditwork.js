$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
    AppendStatus('#Status', 'M_RAW');
    moment.locale('en');
    moment().format("DD/MM/YYYY");
    setTimeout(function () {
        loadCategory()
    }, 50);
});

function multiselect(selector, placeholder, host, controller, action) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: host + controller + action,
            dataType: 'json',
            data: function (params) {
                return {
                    q: params.term,
                    type: 'public'
                };
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
var htmlgenerateComboOption = "";
var htmlgenerateComboOptionCustom = "";
function fillMucxephangkiemtoan(data) {
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    htmlgenerateComboOption = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    htmlgenerateComboOptionCustom = generateComboOptions(data.data, 0, 'noChilds', '', 'id');
}
function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategorieswithsort.path,
        apiConfig.api.common.action.getCategorieswithsort.method,
        { 'gr': categories.mucxephangkiemtoan }, 'fillMucxephangkiemtoan');
}
function fillAppendata(element,val) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $(element).html('');
    $(element).append(htmlOption);
    if (htmlgenerateComboOption == "")
        return;
    $(element).append(htmlgenerateComboOption);
    $(element).val(val).change();
}
function fillAppendataCustom(element, val) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $(element).html('');
    $(element).append(htmlOption);
    if (htmlgenerateComboOption == "")
        return;
    $(element).append(htmlgenerateComboOptionCustom);
    $(element).val(val).change();
}
function openView(type, value) {
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _create = $("#create");
    var _history = $("#history-log");
    var _detail_detect = $("#detail-detect");
    var _header_index = $("#header-view");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify");
    var _header_add_risk = $("#header-add");
    var _header_detail_detect = $("#header-detail-detect");
    var _header_history = $("#header-history");
    if (type === 0) {
        _index.show();
        _header_index.show();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        setTimeout(function () {
            getYearAuditWork(); onSearch();
        }, 100);
        $("input").prop("readonly", false);
        $("select").prop("disabled", false);
        $("textarea").prop("readonly", false);
    }
    else if (type === 1) { //add
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.show();
        _header_add_risk.show();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        setTimeout(function () {
            getYearAuditWork();
        }, 100);
        $("#auditWork").find('option').not(':first').remove();
        $("#formCreate").find("#statusCreate").prop("disabled", true);
    }
    else if (type === 2) { // modify

        _index.hide();
        _header_index.hide();
        _modify.show();
        _header_modify_risk.show();
        _create.hide();
        _header_add_risk.hide();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        ////$(".picker").bootstrapMaterialDatePicker({
        ////    time: false,
        ////    format: 'DD/MM/YYYY',
        ////}); 

        fnGetDetail(2, value);

    }
    else if (type === 3) { // detail
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.show();
        _header_detail.show();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        fnGetDetail(3, value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#form-detail-audit-work").find("#showbuttonApproval").hide();
        $("#form-detail-audit-work").find("#showRequestApproval").hide();

    }
    else if (type === 4) { // request
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.show();
        _header_detail.show();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        fnGetDetail(3, value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#form-detail-audit-work").find("#showbuttonApproval").hide();
        $("#form-detail-audit-work").find("#showRequestApproval").show();
        $("#frmRequestModal").find("#approver").prop("disabled", false);
        //$("#frmRequestApprove").find("#AprovalUser").prop("disabled", false);
    }
    else if (type === 5) { // pheduyet
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.show();
        _header_detail.show();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        fnGetDetail(3, value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#form-detail-audit-work").find("#showbuttonApproval").show();
        $("#form-detail-audit-work").find("#showRequestApproval").hide();
        //$("#frmRejectApprove").find("#reasonnote").prop("readonly", false);
        $("#frmRejectModal").find("#reasonnote").prop("readonly", false);
        //$("#frmApprovalRequestModal").find("#approver_level").prop("disabled", false);

    }
    else if (type === 6) { // detail 
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.show();
        _header_detail_detect.show();
        _history.hide();
        _header_history.hide();
        fnGetDetailDetect(value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);

    }
    if (type === 7) { // log
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.show();
        _header_history.show();
        onSearchHistoryLogKitano(value,"M_RAW");
    }
}
function openDetectDetailView(type, value) {
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _create = $("#create");
    var _history = $("#history-log");
    var _detail_detect = $("#detail-detect");
    var _header_index = $("#header-view");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify");
    var _header_add_risk = $("#header-add");
    var _header_detail_detect = $("#header-detail-detect");
    var _header_history = $("#header-history");
    _index.hide();
    _header_index.hide();
    _modify.hide();
    _header_modify_risk.hide();
    _create.hide();
    _header_add_risk.hide();
    _detail.hide();
    _header_detail.hide();
    _detail_detect.show();
    _header_detail_detect.show();
    _history.hide();
    _header_history.hide();
    fnGetDetailDetect(value);
    $("#formAuditDetectDetail").find("#RoleView").val(type);
    $("input").prop("readonly", true);
    $("select").prop("disabled", true);
    $("textarea").prop("readonly", true);
}
function openViewReturn() {
    var type = $("#formAuditDetectDetail").find("#RoleView").val();
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _create = $("#create");
    var _history = $("#history-log");
    var _detail_detect = $("#detail-detect");
    var _header_index = $("#header-view");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify");
    var _header_add_risk = $("#header-add");
    var _header_detail_detect = $("#header-detail-detect");
    var _header_history = $("#header-history");
    if (type ==="2") { // modify
        $("input").prop("readonly", false);
        $("select").prop("disabled", false);
        $("textarea").prop("readonly", false);
        _index.hide();
        _header_index.hide();
        _modify.show();
        _header_modify_risk.show();
        _create.hide();
        _header_add_risk.hide();
        _detail.hide();
        _header_detail.hide();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
    }
    else if (type === "3") { // detail
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_modify_risk.hide();
        _create.hide();
        _header_add_risk.hide();
        _detail.show();
        _header_detail.show();
        _detail_detect.hide();
        _header_detail_detect.hide();
        _history.hide();
        _header_history.hide();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#form-detail-audit-work").find("#showbuttonApproval").hide();
        $("#form-detail-audit-work").find("#showRequestApproval").hide();

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
function fnGetDetail(type, param) {
    var call_back = '';
    if (type === 2) {
        call_back = 'fnEditSuccess';
    }
    else if (type === 3) {
        call_back = 'fnGetDetailSuccess';
    }
    callApi_reportservice(
        apiConfig.api.reportaduditwork.controller,
        apiConfig.api.reportaduditwork.action.getItem.path + "/" + param,
        apiConfig.api.reportaduditwork.action.getItem.method,
        null, call_back, 'msgError');
}

function onSearch() {
    var obj = {
        'year': $('#Year').val(),
        'status': $('#Status').val(),
        'code': $('#Code').val(),
        'name': $('#Name').val(),
        'person_in_charge': $('#person_in_charge').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_reportservice(
        apiConfig.api.reportaduditwork.controller,
        apiConfig.api.reportaduditwork.action.search.path,
        apiConfig.api.reportaduditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}
function fnSearchSuccess(rspn) {
    var tbBody = $('#reportTable tbody');
    $("#reportTable").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        var level_approval = getApprovallevel("M_RAW");
        for (var item of data) {
            var obj = item;
            var _status = getApprovalStatus("M_RAW", obj.status);            
            var _start_date;
            if (obj.start_date) {
                _start_date = $.format.date(obj.start_date, 'dd/MM/yyyy')
            }
            else {
                _start_date = obj.start_date
            }
            var _end_date;
            if (obj.end_date) {
                _end_date = $.format.date(obj.end_date, 'dd/MM/yyyy')
            }
            else {
                _end_date = obj.end_date
            }
            var _append_data = "";
            if (obj.path != undefined && obj.path != null && obj.path != "") {
                ////var _arraypath = obj.path.split("\\");
                ////var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                var _arraypath = obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                var file_id = obj.file_id != null && obj.file_id != undefined ? obj.file_id : 0;
                _append_data += '<a href="javascript:DownloadFileApproval(' + file_id + ',\'' + file_name + '\');"><i class="fas fa-paperclip" aria-hidden="true"></i></a>';
            }

            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td class="text-center">' + viewValue(obj.year) + '</td>' +
                '<td class="line-break">' + viewValue(obj.code) + '</td>' +
                '<td class="line-break">' + viewValue(obj.name) + '</td>' +
                '<td class="line-break text-center">' + viewValue(_start_date) + '</td>' +
                '<td class="line-break text-center">' + viewValue(_end_date) + '</td>' +
                '<td class="line-break">' + viewValue(obj.str_person_in_charge) + '</td>' +
                '<td class="line-break">' + _status + '</td>' +
                '<td class="text-center" style="font-size: 20px; ">' + _append_data + '</td > ' +
                '<td class="col-action"  style="width:17% !important;"> ' +
                '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                (IsCheckPemission('M_RAW', 'PER_EDIT') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_RAW', 'PER_DEL') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2")
                    ? '<a class="btn icon-delete btn-action-custom btn-sm" onclick="Delete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +
                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(7,' + obj.id + ')"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom"  style=" display: flex;"  onclick="ExportFileWord(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word" ></i>&nbsp Xuất file word</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_RAW', 'PER_REQUEST') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_RAW', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(5,' + obj.id + ')"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true"></i>&nbsp Phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_RAW', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
                ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.name + '\',\'M_RAW\',\'Báo cáo cuộc kiểm toán\')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
                : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_RAW', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_RAW') == 1
                ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.name + '\',\'M_RAW\',\'Báo cáo cuộc kiểm toán\',\'\')" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>';
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
                "targets": [8, 9],
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

function onSearchAudit() {
    var obj = {
        'code': "",
        'page_size': 9999,
        'start_number': 0,
        'year': $("#formCreate").find("#yearCreate").val(),
    }
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchprepareauditapproved.path,
        apiConfig.api.auditwork.action.searchprepareauditapproved.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchPrepareAuditSuccess', 'msgError');
}

function fnSearchPrepareAuditSuccess(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#auditWork').html('');
    $('#auditWork').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (let item of _data) {
        var obj = item;
        html += '<option value="' + obj.id + '">' + obj.year + "-" + obj.name + '</option>';
    }
    $('#auditWork').append(html);
}
function Delete(name, id) {
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
function fnDelete(id) {
    callApi_reportservice(
        apiConfig.api.reportaduditwork.controller,
        apiConfig.api.reportaduditwork.action.delete.path + "/" + id,
        apiConfig.api.reportaduditwork.action.delete.method,
        null, 'fnDeleteSuccess', 'msgError');
}
function fnDeleteSuccess(rspn) {
    if (rspn.code === '1') {
        ////swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Xóa báo cáo");
        setTimeout(function () {
            onSearch();
        }, 100);

    }
    else {
        ////swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}

var validateform;
var validator_;
var validator__;

function fnEditSuccess(rspn) {
    validateform.resetForm();
    var frmModify = $("#form-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var _start_date;
        if (data.start_date_planning) {
            _start_date = $.format.date(data.start_date_planning, 'yyyy-MM-dd')
        }
        else {
            _start_date = ""
        }
        var _end_date;
        if (data.end_date_planning) {
            _end_date = $.format.date(data.end_date_planning, 'yyyy-MM-dd')
        }
        else {
            _end_date = ""
        }
        var _start_date_field;
        if (data.start_date_field) {
            _start_date_field = $.format.date(data.start_date_field, 'yyyy-MM-dd')
        }
        else {
            _start_date_field = ""
        }
        var _end_date_field;
        if (data.end_date_field) {
            _end_date_field = $.format.date(data.end_date_field, 'yyyy-MM-dd')
        }
        else {
            _end_date_field = ""
        }
        var _report_date;
        if (data.report_date) {
            _report_date = $.format.date(data.report_date, 'yyyy-MM-dd')
        }
        else {
            _report_date = ""
        }
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#Year").val(data.year).prop("readonly", true);
        frmModify.find("#AuditCode").val(data.code).prop("readonly", true);
        frmModify.find("#AuditName").val(data.name).prop("readonly", true);
        frmModify.find("#Target").val(data.target).prop("readonly", true);
        frmModify.find("#NguoiPhuTrach").val(data.str_person_in_charge).prop("readonly", true);
        frmModify.find("#Type").val(data.classify).change().prop("disabled", true);
        //frmModify.find("#Status").val(data.status).change().prop("disabled", true);
        frmModify.find("#Status").val(getApprovalStatus("M_RAW", data.status)).prop("readonly", true);
        frmModify.find("#NumberOfAuditor").val(data.num_of_auditor).prop("readonly", true);
        frmModify.find("#NameAuditor").val(data.str_auditor_name).prop("readonly", true);
        //frmModify.find("#NumberOfWork").val(data.num_of_workdays);
        frmModify.find("#StartDate").val(_start_date).prop("readonly", true);
        frmModify.find("#EndDate").val(_end_date).prop("readonly", true);
        //frmModify.find("#StartDateField").val(_start_date_field);
        //frmModify.find("#EndDateField").val(_end_date_field);
        //frmModify.find("#PhatHanh").val(_report_date);
        frmModify.find("#OutAuditScope").prop("readonly", true);
      
        frmModify.find("#rating_level_total").val(data.rating_level_audit).change();
        frmModify.find("#base_rating_total").val(data.rating_base_audit);
        frmModify.find("#general_conclusions").val(data.general_conclusions);
        frmModify.find("#OutAuditScope").val(data.out_of_audit_scope);
        frmModify.find("#AuditScope").val(data.audit_scope).prop("readonly", true);
       
        fillAppendata('#rating_level_total', data.rating_level_audit);
        debugger
        $("#OtherContentEdit").val("");
        $("#OtherContentEdit").val(data.other_content);
        if (CKEDITOR.instances['OtherContentEdit']) {
            CKEDITOR.instances['OtherContentEdit'].setData(data.other_content);
            CKEDITOR.instances['OtherContentEdit'].updateElement();
            
        }
        else {
            CKEDITOR.replace("OtherContentEdit", {
                height: 300,
                disableObjectResizing: true
            });
            CKEDITOR.instances['OtherContentEdit'].setData(data.other_content);
            CKEDITOR.instances['OtherContentEdit'].updateElement();
          
        }



        //var tbBody = $('#AuditScopeTable tbody');
        //$("#AuditScopeTable").dataTable().fnDestroy();
        //tbBody.html('');
        //if (data.audit_work_scope_list !== undefined && data.audit_work_scope_list !== null) {
        //    var data_ = data.audit_work_scope_list;
        //    for (var item of data_) {
        //        var obj = item;
        //        var html = '<tr>' +
        //            '<td class="line-break">' + viewValue(obj.audit_process_name) + '</td>' +
        //            '<td class="line-break">' + viewValue(obj.audit_facility_name) + '</td>' +
        //            '<td class="line-break">' + viewValue(obj.audit_activity_name) + '</td>' +
        //            '</tr>';
        //        tbBody.append(html);
        //    }

        //}
        //$("#AuditScopeTable").DataTable({
        //    "bPaginate": false,
        //    "bLengthChange": false,
        //    "bFilter": false,
        //    "bInfo": false,
        //    //"scrollX": true,
        //    "columnDefs": [
        //        {
        //            "targets": [0, 1, 2],
        //            "searchable": false,
        //            "orderable": false
        //        }
        //    ],
        //    "order": [],
        //});


        var tbBody_ = $('#FacitilyTable tbody');
        $("#FacitilyTable").dataTable().fnDestroy();
        tbBody_.html('');
        if (data.audit_work_facility_list !== undefined && data.audit_work_facility_list !== null) {
            data_ = data.audit_work_facility_list;
            for (var i = 0; i < data_.length; i++) {
                obj = data_[i];
                var _selected1 = "";
                var _selected2 = "";
                var _selected3 = "";
                var _selected4 = "";
                switch (obj.audit_rating_level_item) {
                    case 1:
                        _selected1 = "selected";
                        break;
                    case 2:
                        _selected2 = "selected";
                        break;
                    case 3:
                        _selected3 = "selected";
                        break;
                    case 4:
                        _selected4 = "selected";
                        break;
                    default:
                }
                var html = '<tr>' +
                    '<td class="line-break" style="width:35% !important;"><input type="hidden" class="scopeid" id="scopeid" name="scopeid" value="' + obj.id + '" /><input type="hidden" class="facility_id" id="facility_id" name="facility_id" value="' + obj.audit_facility_id + '" />' + viewValue(obj.audit_facility_name) + '</td>' +
                    '<td class="line-break" style="width:20% !important;"><select class="form-control audit_rating_item" id="AuditRating_' + i + '" name="AuditRating_' + i + '" style="padding:0;" disabled><option value="">— Chọn mức —</option></select></td>' +
                    '<td class="line-break" style="width:45% !important;"><input type="text" class="form-control rating_base_item" id="rating_base" name="rating_base" value="' + viewValue(obj.base_rating_item) + '" style="padding: 0 0 0 5px;"/></td>' +
                    '</tr>';
                tbBody_.append(html);
                fillAppendataCustom('#AuditRating_' + i, obj.audit_rating_level_item);
            }
        }
        $("#FacitilyTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });

        var __tbBody = $('#SumaryTable tbody');
        $("#SumaryTable").dataTable().fnDestroy();
        __tbBody.html('');
        var total_risk = 0;
        if (data.sumary_facility_list !== undefined && data.sumary_facility_list !== null) {
            data_ = data.sumary_facility_list;
            for (let item1 of data_) {
                obj = item1;
                total_risk += viewIntValue(obj.hight) + viewIntValue(obj.middle) + viewIntValue(obj.low);
                html = '<tr>' +
                    '<td class="line-break">' + viewValue(obj.classify_audit_detect_name) + '</td>' +
                    '<td class="text-right">' + (viewIntValue(obj.hight) + viewIntValue(obj.middle) + viewIntValue(obj.low)) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.hight) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.middle) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.low) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.agree) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.notAgree) + '</td>' +
                    '</tr>';
                __tbBody.append(html);
            }
        }
        $("#SumaryTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2, 3, 4],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });

        frmModify.find("#TotalRisk").text(total_risk);


        var _tbBody = $('#auditDetectTable tbody');
        $("#auditDetectTable").dataTable().fnDestroy();
        _tbBody.html('');
        if (data.audit_detect_list !== undefined && data.audit_detect_list !== null) {
            data_ = data.audit_detect_list;
            var count_i = 1;
            for (let item2 of data_) {
                obj = item2;
                var opinion_audit = (obj.opinion_audit == true ? "Đồng ý" : "Không đồng ý");
                html = '<tr>' +
                    '<td class="text-center" style="width: 3% !important;">' + (count_i) + '</td>' +
                    '<td class="line-break"><a href="javascript:void(0);" onclick="openDetectDetailView(2,' + obj.id + ')">' + viewValue(obj.code) + '</a></td>' +
                    '<td class="line-break">' + viewValue(obj.title) + '</td>' +
                    //'<td class="line-break">' + viewValue(obj.description) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.str_classify_audit_detect) + '</td>' +
                    '<td class="line-break">' + viewValue(getIssueLevelnew(obj.rating_risk)) + '</td>' +
                    '<td class="line-break">' + viewValue(opinion_audit) + '</td>' +
                    '</tr>';
                _tbBody.append(html);
                count_i++;
            }
        }
        $("#auditDetectTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2, 3, 4],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });
    }
}
function viewIntValue(val) {
    return val == undefined || val == null ? 0 : parseInt(val);
}
function getIssueLevelnew(val) {
    
    if (val == 1) return localizationResources.High;
    return val == 2 ? localizationResources.Mid : localizationResources.Low;
}
function fnGetDetailSuccess(rspn) {
    ////validateform.resetForm();
    var frmModify = $("#form-detail-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var _start_date;
        if (data.start_date_planning) {
            _start_date = $.format.date(data.start_date_planning, 'dd/MM/yyyy')
        }
        else {
            _start_date = data.start_date_planning
        }
        var _end_date;
        if (data.end_date_planning) {
            _end_date = $.format.date(data.end_date_planning, 'dd/MM/yyyy')
        }
        else {
            _end_date = data.end_date_planning
        }
        var _start_date_field;
        if (data.start_date_field) {
            _start_date_field = $.format.date(data.start_date_field, 'dd/MM/yyyy')
        }
        else {
            _start_date_field = data.end_date
        }
        var _end_date_field;
        if (data.end_date_field) {
            _end_date_field = $.format.date(data.end_date_field, 'dd/MM/yyyy')
        }
        else {
            _end_date_field = data.end_date_field
        }
        var _report_date;
        if (data.report_date) {
            _report_date = $.format.date(data.report_date, 'dd/MM/yyyy')
        }
        else {
            _report_date = data.report_date
        }
        frmModify.find("#Id").val(data.id);
        frmModify.find("#Year").val(data.year).prop("readonly", true);
        frmModify.find("#AuditCode").val(data.code).prop("readonly", true);
        frmModify.find("#AuditName").val(data.name).prop("readonly", true);
        frmModify.find("#Target").val(data.target).prop("readonly", true);
        frmModify.find("#NguoiPhuTrach").val(data.str_person_in_charge).prop("readonly", true);
        frmModify.find("#Type").val(data.classify).change().prop("disabled", true);
        frmModify.find("#statusCodeDetail").val(data.status);
        frmModify.find("#Status").val(getApprovalStatus("M_RAW", data.status)).prop("readonly", true);
        //frmModify.find("#Status").val(data.status).change().prop("disabled", true);
        frmModify.find("#NumberOfAuditor").val(data.num_of_auditor).prop("readonly", true);
        frmModify.find("#NameAuditor").val(data.str_auditor_name).prop("readonly", true);
        //frmModify.find("#NumberOfWork").val(data.num_of_workdays);
        frmModify.find("#StartDate").val(_start_date);
        frmModify.find("#EndDate").val(_end_date);
        //frmModify.find("#StartDateField").val(_start_date_field);
        //frmModify.find("#EndDateField").val(_end_date_field);
        //frmModify.find("#PhatHanh").val(_report_date);
        frmModify.find("#OutAuditScope").prop("readonly", true);
        frmModify.find("#rating_level_total").val(data.rating_level_audit).change();
        frmModify.find("#base_rating_total").val(data.rating_base_audit);
        frmModify.find("#general_conclusions").val(data.general_conclusions);
        frmModify.find("#OutAuditScope").val(data.out_of_audit_scope);
        frmModify.find("#AuditScope").val(data.audit_scope).prop("readonly", true);
        $("#OtherContentDetail").val("");
        $("#OtherContentDetail").val(data.other_content).prop("readonly", true);
        if (CKEDITOR.instances['OtherContentDetail']) {
            CKEDITOR.instances['OtherContentDetail'].setData(data.other_content);
            CKEDITOR.instances['OtherContentDetail'].updateElement();
           
        }
        else {
            CKEDITOR.replace("OtherContentDetail", {
                height: 300,
                disableObjectResizing: true
            });
            CKEDITOR.instances['OtherContentDetail'].setData(data.other_content);
            CKEDITOR.instances['OtherContentDetail'].updateElement();

        }
        //var tbBody = $('#AuditScopeTableDetail tbody');
        //$("#AuditScopeTableDetail").dataTable().fnDestroy();
        //tbBody.html('');
        //if (data.audit_work_scope_list !== undefined && data.audit_work_scope_list !== null) {
        //    var data_ = data.audit_work_scope_list;
        //    for (let item1 of data_) {
        //        var obj = item1;
        //        var html = '<tr>' +
        //            '<td class="line-break">' + viewValue(obj.audit_process_name) + '</td>' +
        //            '<td class="line-break">' + viewValue(obj.audit_facility_name) + '</td>' +
        //            '<td class="line-break">' + viewValue(obj.audit_activity_name) + '</td>' +
        //            '</tr>';
        //        tbBody.append(html);
        //    }
        //}
        //$("#AuditScopeTableDetail").DataTable({
        //    "bPaginate": false,
        //    "bLengthChange": false,
        //    "bFilter": false,
        //    "bInfo": false,
        //    //"scrollX": true,
        //    "columnDefs": [
        //        {
        //            "targets": [0, 1, 2],
        //            "searchable": false,
        //            "orderable": false
        //        }
        //    ],
        //    "order": [],
        //});

        var tbBody_ = $('#FacitilyTableDetail tbody');
        $("#FacitilyTableDetail").dataTable().fnDestroy();
        tbBody_.html('');
        if (data.audit_work_facility_list !== undefined && data.audit_work_facility_list !== null) {
            data_ = data.audit_work_facility_list;
            var i = 1;
            for (let item2 of data_) {
                obj = item2;
                var _selected1 = "";
                var _selected2 = "";
                var _selected3 = "";
                var _selected4 = "";
                switch (obj.audit_rating_level_item) {
                    case 1:
                        _selected1 = "selected";
                        break;
                    case 2:
                        _selected2 = "selected";
                        break;
                    case 3:
                        _selected3 = "selected";
                        break;
                    case 4:
                        _selected4 = "selected";
                        break;
                    default:
                }
                var html = '<tr>' +
                    '<td class="line-break" style="width:35% !important;"><input type="hidden" class="scopeid" id="scopeid" name="scopeid" value="' + obj.id + '" /><input type="hidden" class="facility_id" id="facility_id" name="facility_id" value="' + obj.audit_facility_id + '" />' + viewValue(obj.audit_facility_name) + '</td>' +
                    '<td class="line-break" style="width:20% !important;"><select class="form-control audit_rating_item" id="AuditRating_' + i + '" name="AuditRating_' + i + '" style="padding:0;" disabled><option value="">— Chọn mức —</option></select></td>' +
                    '<td class="line-break" style="width:45% !important;"><input type="text" class="form-control rating_base_item" id="rating_base" name="rating_base" value="' + viewValue(obj.base_rating_item) + '" style="padding: 0 0 0 5px;"/></td>' +
                    '</tr>';
                tbBody_.append(html);
                fillAppendataCustom('#AuditRating_' + i, obj.audit_rating_level_item);
                i++;
            }
        }
        $("#FacitilyTableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });

        var __tbBody = $('#SumaryTableDetail tbody');
        $("#SumaryTableDetail").dataTable().fnDestroy();
        __tbBody.html('');
        var total_risk = 0;
        if (data.sumary_facility_list !== undefined && data.sumary_facility_list !== null) {
            data_ = data.sumary_facility_list;
            for (let item3 of data_) {
                obj = item3;
                total_risk += viewIntValue(obj.hight) + viewIntValue(obj.middle) + viewIntValue(obj.low);
                html = '<tr>' +
                    '<td class="line-break">' + viewValue(obj.classify_audit_detect_name) + '</td>' +
                    '<td class="text-center">' + (viewIntValue(obj.hight) + viewIntValue(obj.middle) + viewIntValue(obj.low)) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.hight) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.middle) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.low) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.agree) + '</td>' +
                    '<td class="text-right">' + viewValue(obj.notAgree) + '</td>' +
                    '</tr>';
                __tbBody.append(html);
            }
        }
        $("#SumaryTableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2, 3, 4],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });

        frmModify.find("#TotalRiskDetail").text(total_risk);

        var _tbBody = $('#auditDetectTableDetail tbody');
        $("#auditDetectTableDetail").dataTable().fnDestroy();
        _tbBody.html('');
        if (data.audit_detect_list !== undefined && data.audit_detect_list !== null) {
            data_ = data.audit_detect_list;
            var i = 1;
            for (let item4 of data_) {
                obj = item4;
                html = '<tr>' +
                    '<td class="text-center" style="width: 3% !important;">' + (i) + '</td>' +
                    '<td class="line-break"><a href="javascript:void(0);" onclick="openDetectDetailView(3,' + obj.id + ')">' + viewValue(obj.code) + '</a></td>' +
                    '<td class="line-break">' + viewValue(obj.title) + '</td>' +
                    /*                    '<td class="line-break">' + viewValue(obj.description) + '</td>' +*/
                    '<td class="line-break">' + viewValue(obj.auditfacilities_name) + '</td>' +
                    '<td class="line-break">' + viewValue(getIssueLevelnew(obj.rating_risk)) + '</td>' +
                    '</tr>';
                _tbBody.append(html);
                i++;
            }
        }
        $("#auditDetectTableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 1, 2, 3, 4],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });
    }
}
function fnGetDetailDetect(param) {
    var call_back = 'fnGetDetailDetectSuccess';

    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.getItem.path + "/" + param,
        apiConfig.api.auditdetect.action.getItem.method,
        null, call_back, 'msgError');
}
function fnGetDetailDetectSuccess(rspn) {
    var frmDetail = $("#formAuditDetectDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formAuditDetectDetail").clearQueue();
        frmDetail.find("#IdDetail").val(data.id);
        if (data.str_followers) {
            var _value = data.str_followers;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#FollowerEdit").append(newOption).trigger('change');
        }
        if (data.str_year) {
            var _valueyear = data.str_year;
            var newOptionYear = new Option(_valueyear.split(':')[1], _valueyear.split(':')[0], true, true);
            frmDetail.find("#YearAuditWorkEdit").append(newOptionYear).trigger('change');
        }
        if (data.str_auditwork_name) {
            var _valueauditwork = data.str_auditwork_name;
            var newOptionAuditWork = new Option(_valueauditwork.split(':')[1], _valueauditwork.split(':')[0], true, true);
            frmDetail.find("#AuditWorkEdit").append(newOptionAuditWork).trigger('change');
        }
        if (data.str_auditprocess_name) {
            var _valueauditprocess = data.str_auditprocess_name;
            var newOptionAuditProcess = new Option(_valueauditprocess.split(':')[1], _valueauditprocess.split(':')[0], true, true);
            frmDetail.find("#AuditProcessEdit").append(newOptionAuditProcess).trigger('change');
        }
        if (data.str_auditfacilities_name) {
            var _valuesauditfacilities = data.str_auditfacilities_name;
            var newOptionAuditfacility = new Option(_valuesauditfacilities.split(':')[1], _valuesauditfacilities.split(':')[0], true, true);
            frmDetail.find("#AuditfacilityEdit").append(newOptionAuditfacility).trigger('change');
        }
        if (data.str_classify_audit_detect) {
            var _value = data.str_classify_audit_detect;
            var newOptionClassifyAuditDetectEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#ClassifyAuditDetectEdit").append(newOptionClassifyAuditDetectEdit).trigger('change');
        }
        frmDetail.find("#AuditDetectCodeDetail").val(data.code);
        frmDetail.find("#StatusDetail").val(data.statusName);
        frmDetail.find("#WorkingPaperCodeDetail").val(data.working_paper_code);

        //table quan sát
        var tbBody = $('#auditdetecttabledetail tbody');
        $("#auditdetecttabledetail").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditobserve !== undefined && data.listauditobserve !== null && data.listauditobserve.length != 0) {
            var data_ = data.listauditobserve;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditobserve == undefined || data.listauditobserve == null || data.listauditobserve.length == 0) {
            notdataTableAuditObserve();
        }

        frmDetail.find("#TitleDetail").val(data.title);
        frmDetail.find("#ShortTitleDetail").val(data.short_title);
        frmDetail.find("#DescriptionDetail").val(data.description);
        frmDetail.find("#EvidenceDetail").val(data.evidence);
        //frmDetail.find("#FileNameDetail").text(data.filename);
        frmDetail.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileAuditDetect(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#FileDetail").append(_append_data);
        }
        frmDetail.find("#AffectDetail").val(data.affect);
        frmDetail.find("#RatingRiskDetail").val(data.rating_risk);
        frmDetail.find("#CauseDetail").val(data.cause);
        if (data.audit_report == true)
            frmDetail.find("#AuditReportDetail").attr('checked', true);
        //frmDetail.find("#AuditReportEdit").val(data.audit_report);

        frmDetail.find("#SummaryAuditDetectDetail").val(data.summary_audit_detect);
        if (data.opinion_audit == true) {
            frmDetail.find(':radio[name=OpinionAuditDetail][value="1"]').prop('checked', true);
        } else {
            frmDetail.find(':radio[name=OpinionAuditDetail][value="2"]').prop('checked', true);
        }
        frmDetail.find("#ReasonDetail").val(data.reason);
        //table kiến nghị
        $("#auditrequestmonitortabledetail").dataTable().fnDestroy();
        $('#auditrequestmonitortabledetail tbody').html('');
        if (data.listauditrequestmonitor !== undefined && data.listauditrequestmonitor !== null && data.listauditrequestmonitor.length != 0) {
            var data_ = data.listauditrequestmonitor;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.code + '</td>' +
                    '<td>' + obj.content + '</td>' +
                    '<td>' + obj.auditrequesttype_name + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td>' + obj.unit_name + '</td>' +
                    '<td>' + obj.cooperateunit_name + '</td>' +
                    '<td class="text-center">' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    //'<td class="col-action">' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewDetail()"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewUpdate()"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor()"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    //'</td>' +
                    '</tr>';
                $('#auditrequestmonitortabledetail tbody').append(html);
            }
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitor();
        }
    }
}
function updateSuccess(data) {
    ////swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
    createdLog("Báo cáo cuộc kiểm toán", "Cập nhật báo cáo");
    setTimeout(function () {
        ////        window.location.href = "/ReportAuditWork";
        openView(0, 0)
    }, 100);

}
function updateAddSuccess(rspn) {
    if (rspn.code === '1') {
        ////swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Thêm mới báo cáo");
        setTimeout(function () {
            ////        window.location.href = "/ReportAuditWork";
            if (rspn.data != undefined && rspn.data != null) {
                openView(2, rspn.data);
            }
            else {
                openView(0, 0);
            }
        }, 100);
    }
    else if (rspn.code === '0') {
        ////swal(localizationResources.Error, "Báo cáo cuộc kiểm toán đã tồn tại", "error");
        toastr.error("Báo cáo cuộc kiểm toán đã tồn tại!", "Lỗi!", { progressBar: true });
    }
    else {
        ////swal(localizationResources.Error, "Thêm mới báo cáo không thành công!", "error");
        toastr.error("Thêm mới báo cáo không thành công!", "Lỗi!", { progressBar: true });
    }


} $.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    $("#formCreate").validate({
        rules: {
            yearCreate: { required: true },
            statusCreate: { required: true },
            auditWork: { required: true },
        },
        submitHandler: function () {
            var obj = {
                'year': $("#formCreate").find("#yearCreate").val(),
                'status': $("#formCreate").find("#statusCreate").val(),
                'auditWork_id': $("#formCreate").find('#auditWork').val(),
            }
            callApi_reportservice(
                apiConfig.api.reportaduditwork.controller,
                apiConfig.api.reportaduditwork.action.add.path,
                apiConfig.api.reportaduditwork.action.add.method,
                obj, 'updateAddSuccess');
        }
    });
    validateform = $("#form-audit-work").validate({
        rules: {
            rating_level_total: { required: true },
            base_rating_total: { required: true },
            general_conclusions: { required: true },
            //StartDate: { required: true },
            //EndDate: { required: true },
            //StartDateField: { required: true },
            //EndDateField: { required: true },
            //PhatHanh: { required: true },
        },
        submitHandler: function () {
            var list_facility_scope = [];
            $("#FacitilyTable > tbody > tr").each(function (i, v) {
                var scope_item = {
                    scopeid: $(v).find(".scopeid").val(),
                    audit_rating_level_item: $(v).find(".audit_rating_item").val(),
                    base_rating_item: $(v).find(".rating_base_item").val(),
                }
                list_facility_scope.push(scope_item);
            });
            var check = false;
            var start_date_ = $("#form-audit-work").find("#StartDate").val();
            var end_date_ = $("#form-audit-work").find("#EndDate").val();
            var start_date = start_date_ != undefined && start_date_ != "" ? new Date(start_date_) : null;
            var end_date = end_date_ != undefined && end_date_ != "" ? new Date(end_date_) : null;
            if (start_date > end_date) {
                ////swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                return false;
            }
            var start_date_field_ = $("#form-audit-work").find("#StartDateField").val();
            var end_date_field_ = $("#form-audit-work").find("#EndDateField").val();
            var start_date_field = start_date_field_ != undefined && start_date_field_ != "" ? new Date(start_date_field_) : null;
            var end_date_field = end_date_field_ != undefined && end_date_field_ != "" ? new Date(end_date_field_) : null;
            if (start_date_field > end_date_field) {
                ////swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                toastr.error("Ngày bắt đầu thực địa phải nhỏ hơn hoặc bằng ngày kết thúc thực địa!", "Lỗi!", { progressBar: true });
                return false;
            }
            var other_info = CKEDITOR.instances["OtherContentEdit"].getData();
            if (other_info != undefined && other_info != '') {
                other_info = $.trim(other_info);
            }
            var obj = {
                'id': $("#form-audit-work").find("#IdEdit").val(),
                //'start_date': $("#form-audit-work").find("#StartDate").val(),
                //'end_date': $("#form-audit-work").find("#EndDate").val(),
                //'start_date_field': $("#form-audit-work").find("#StartDateField").val(),
                //'end_date_field': $("#form-audit-work").find("#EndDateField").val(),
                //'report_date': $("#form-audit-work").find("#PhatHanh").val(),
                //'num_of_workdays': $("#form-audit-work").find("#NumberOfWork").val(),
                'audit_rating_level_total': $("#form-audit-work").find("#rating_level_total").val(),
                'base_rating_total': $("#form-audit-work").find("#base_rating_total").val(),
                'general_conclusions': $("#form-audit-work").find('#general_conclusions').val(),
                'list_facility_scope': list_facility_scope,
                'other_content': other_info,
            }
            if (!check) {
                callApi_reportservice(
                    apiConfig.api.reportaduditwork.controller,
                    apiConfig.api.reportaduditwork.action.update.path,
                    apiConfig.api.reportaduditwork.action.update.method,
                    obj, 'updateSuccess', 'updatefail');
            }

        }
    });
    $('#modelRequestApprove').on('show.bs.modal', function (event) {
        validator_.resetForm();
        ////var button = $(event.relatedTarget);
        var id = $("#form-detail-audit-work").find("#Id").val();
        var name = $("#form-detail-audit-work").find("#AuditName").val();
        ////var id = button.data('id');
        ////var name = button.data('name');
        var modal = $(this);
        modal.find('#reportid').val(id);
        modal.find('#reportname').val(name);
        multiselect("AprovalUser", "Chọn người duyệt...", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
    });
    validator_ = $("#frmRequestApprove").validate({
        rules: {
            AprovalUser: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmRequestApprove").find("#reportid").val();
            var approvaluser = $("#frmRequestApprove").find("#AprovalUser").val();
            var obj = {
                'report_audit_work_id': id,
                'approvaluser': approvaluser,
            }
            callApi_reportservice(
                apiConfig.api.reportaduditwork.controller,
                apiConfig.api.reportaduditwork.action.requestapproval.path,
                apiConfig.api.reportaduditwork.action.requestapproval.method,
                obj, 'fnRequestApprovalSuccess', 'msgError');
        }
    });
    $('#modelRejectApprove').on('show.bs.modal', function (event) {
        validator__.resetForm();
        var id = $("#form-detail-audit-work").find("#Id").val();
        var name = $("#form-detail-audit-work").find("#AuditName").val();
        var modal = $(this);
        modal.find('#reportid').val(id);
        modal.find('#reportname').val(name);
    });
    validator__ = $("#frmRejectApprove").validate({
        rules: {
            reasonnote: { required: true }
        },
        submitHandler: function () {
            var id = $("#frmRejectApprove").find("#reportid").val();
            var reasonnote = $("#frmRejectApprove").find("#reasonnote").val();
            var obj = {
                'report_audit_work_id': id,
                'reason_note': reasonnote,
            }
            callApi_reportservice(
                apiConfig.api.reportaduditwork.controller,
                apiConfig.api.reportaduditwork.action.rejectapproval.path,
                apiConfig.api.reportaduditwork.action.rejectapproval.method,
                obj, 'fnRejectApprovalSuccess', 'msgError');
        }
    });
});
window.onload = function () {
    let checkLocalType = localStorage.getItem('type');
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem('id');
    let id = parseInt(checkLocalId);
    if (checkLocalType === null && checkLocalId === null) {
        type = 0;
        id = 0;
    }
    setTimeout(function () {
        openView(type, id);
    }, 100);
}
function frmChangeStatus(id) {
    $('#frmChangeStatus').find("#IdReportAudit").val(id);
}
function updateChangeStatus() {

    var obj = {
        'id': $('#frmChangeStatus').find("#IdReportAudit").val(),
        'status': $('#frmChangeStatus').find("#StatusChange").val(),
        'browsedate': $('#frmChangeStatus').find("#DateChangeStatus").val(),
    }
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    var check = false;
    var isStatus = $("#StatusChange").val();
    if (isStatus == 3) {
        var input = document.getElementById('FileChangeStatus');
        var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
        if (input.files) {

            $.each(input.files, function (i, v) {
                var imageFile = v;
                var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    ////swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                    toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                    return false;
                }
                if (checkFilesize(imageFile)) {
                    ////swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                    toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                formData.append("fileUpload[" + i + "]", imageFile);
            })
        }
    }

    if (validateRequired('#frmChangeStatus')) {
        if (isStatus == 3) {
            if (check) {
                callApi_reportservice_update(
                    apiConfig.api.reportaduditwork.controller,
                    apiConfig.api.reportaduditwork.action.reportupdatestatus.path,
                    formData, 'ChangeStatusSuccess', 'msgError');
            }
        }
        else {
            callApi_reportservice_update(
                apiConfig.api.reportaduditwork.controller,
                apiConfig.api.reportaduditwork.action.reportupdatestatus.path,
                formData, 'ChangeStatusSuccess', 'msgError');
        }

    }
}
function ChangeStatusSuccess(res) {
    if (res.code === '1') {
        ////swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Cập nhật trạng thái");
        $('#modalChangeStatus').modal('hide');
        setTimeout(function () {
            window.location.href = "/ReportAuditWork"
        }, 300);
    }
    else {
        ////swal("Error!", "Cập nhật thất bại!", "error");
        toastr.error("Cập nhật thất bại!", "Lỗi!", { progressBar: true });
    }
}
function showFileUpload() {
    if ($('#StatusChange').val() == 3) {
        $('#fileUpload').show();
    } else {
        $('#fileUpload').hide();
    }
}
function DownloadFile(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditwork.controller + '/DownloadAttach?id=' + id, 'Download');
}
function SubmitApproval() {
    var _id = $("#form-detail-audit-work").find("#Id").val();
    var _name = $("#form-detail-audit-work").find("#AuditName").val();
    swal({
        title: "Thông báo",
        text: "Bạn muốn duyệt bản ghi: " + viewValue(_name) + " ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnSubmitApproval(_id);
        }
    });
}
function fnSubmitApproval(id) {
    callApi_reportservice(
        apiConfig.api.reportaduditwork.controller,
        apiConfig.api.reportaduditwork.action.submitapproval.path + "/" + id,
        apiConfig.api.reportaduditwork.action.submitapproval.method,
        null, 'fnSubmitApprovalSuccess', 'msgError');
}
function fnSubmitApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        ////swal("Thông báo!", "Phê duyệt thành công!", "success");
        toastr.success("Phê duyệt thành công!", "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Phê duyệt báo cáo");
        setTimeout(function () {
            window.location.href = "/ReportAuditWork";
        }, 300);
    }
    else {
        ////wal("Error!", "Phê duyệt không thành công!", "error");
        toastr.error("Phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnRejectApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRejectApprove .close').click();
        ////swal("Thông báo!", "Từ chối duyệt thành công!", "success");
        toastr.success("Từ chối duyệt thành công!", "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Từ chối phê duyệt báo cáo");
        setTimeout(function () {
            window.location.href = "/ReportAuditWork";
        }, 300);
    }
    else {
        ////swal("Error!", "Từ chối duyệt không thành công!", "error");
        toastr.error("Từ chối duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnRequestApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRequestApprove .close').click();
        ////swal("Thông báo!", "Gửi phê duyệt thành công!", "success");
        toastr.success("Gửi phê duyệt thành công!", "Thành công!", { progressBar: true });
        createdLog("Báo cáo cuộc kiểm toán", "Gửi phê duyệt báo cáo");
        setTimeout(function () {
            window.location.href = "/ReportAuditWork";
        }, 300);

    }
    else {
        ////swal("Error!", "Gửi phê duyệt không thành công!", "error");
        toastr.error("Gửi phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function DownloadFileReport(id) {
    window.open(apiConfig.api.host_report_service + apiConfig.api.reportaduditwork.controller + '/DownloadAttach?id=' + id, 'Download');
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
function notdataTableAuditObserve() {
    $('#auditdetecttabledetail tbody').html('');
    $("#auditdetecttabledetail").dataTable().fnDestroy();
    $("#auditdetecttabledetail").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

    $('#auditdetecttable tbody').html('');
    $("#auditdetecttable").dataTable().fnDestroy();
    $("#auditdetecttable").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
}

function ExportFileWord(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_report_service + apiConfig.api.reportaduditwork.controller + apiConfig.api.reportaduditwork.action.export.path + "/" + id,);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_BaoCaoKiemToan.docx";
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