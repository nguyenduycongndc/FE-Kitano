$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
    AppendStatus('#Status', 'M_AP');
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
function multiselect_auditor(selector, placeholder, host, controller, action, numEdit) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: host + controller + action + "?list_auditor=" + load_param(numEdit),
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
function load_param(numEdit) {
    var listAuditor = "";
    if (numEdit == 1) {
        $("#auditworktableEdit > tbody > tr").each(function (i, v) {
            var selected = $(v).find(".usersid").val();
            if (selected != undefined && selected != "" && selected != null) {
                listAuditor += selected + ",";
            }
        })
    }
    else {
        $("#auditworktable > tbody > tr").each(function (i, v) {
            var selected = $(v).find(".usersid").val();
            if (selected != undefined && selected != "" && selected != null) {
                listAuditor += selected + ",";
            }
        })
    }
   
    if (listAuditor != "") {
        listAuditor = listAuditor.substring(0, listAuditor.length - 1);
    }
    return listAuditor;
}
function callBackView(type) {
    if (type == 3) {
        var action = $("#form-detail-audit-work").find("#ActionEdit").val();
        if (action == "" || action == "1") {
            var param = $("#formEdit").find("#IdEdit").val();
            openViewEdit(type, param);
        }
        else {
            var _param = $("#formDetail").find("#IdDetail").val();
            var role = $("#formDetail").find("#ActionRole").val();
            openView(parseInt(role), _param);
        }
    }
    if (type == 5) {
        var action = $("#formAddScope").find("#DoAction").val();
        if (action == "0") {
            openView(type, 0);
        }
        else {
            openView(6, 0);
        }
    }
    if (type == 6) {
        openView(type, 0);
    }
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search_apply_for').html('');
    $('#search_apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#search_apply_for').append(html);
}
function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');
}
function getCatRiskLevel() {
    var obj = {
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_userservice(
        apiConfig.api.catrisklevel.controller,
        apiConfig.api.catrisklevel.action.search.path,
        apiConfig.api.catrisklevel.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillCatRiskLevel');
}
function fillCatRiskLevel(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-risk_level').html('');
    $('#search-risk_level').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';;
    }
    $('#search-risk_level').append(html);
}
function ChangeTypeDisplay() {
    var _all = $("#TableViewAll");
    var _dv = $("#TableViewDonVi");
    var _hd = $("#TableViewHoatDong");
    var _qt = $("#TableViewQuyTrinh");

    if ($('#TypeDisplay').val() == -1) {
        $('#search_apply_for').prop('disabled', false);
        $('#search_apply_for').val('').change();
    }
    else {
        if ($('#TypeDisplay').val() == 1) {
            $('#search_apply_for').val("DV").change();
        }
        if ($('#TypeDisplay').val() == 2) {
            $('#search_apply_for').val("HDKD").change();
        }
        if ($('#TypeDisplay').val() == 3) {
            $('#search_apply_for').val("QT").change();
        }
        $('#search_apply_for').prop('disabled', true);
    }
    $("#search_apply_for").change(function () {
        var tbBody = $('#tblRiskScore tbody');
        tbBody.html('');
        $("#tblRiskScore").dataTable().fnDestroy();
        var value = $(this).val();
        if (value == "") {
            $("#TypeShowTable").val(0);
            $("#checkAll").prop('checked', false);
            _all.show();
            _dv.hide();
            _hd.hide();
            _qt.hide();
            $("#checkAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "DV") {
            $("#TypeShowTable").val(1);
            $("#checkDonViAll").prop('checked', false);
            _all.hide();
            _dv.show();
            _hd.hide();
            _qt.hide();
            $("#checkDonViAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "HDKD") {
            $("#TypeShowTable").val(2);
            $("#checkHoatDongAll").prop('checked', false);
            _all.hide();
            _dv.hide();
            _hd.show();
            _qt.hide();
            $("#checkHoatDongAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "QT") {
            $("#TypeShowTable").val(3);
            $("#checkQuyTrinhAll").prop('checked', false);
            _all.hide();
            _dv.hide();
            _hd.hide();
            _qt.show();
            $("#checkQuyTrinhAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
    });
}
function changeStageValue() {
    if ($('#search-stage').val() == 3) {
        $('#search-stage_value').prop('disabled', false);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').addClass('required');
    }
    else {
        $('#search-stage_value').prop('disabled', true);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').removeClass('required');
    }
}
function onSearch() {
    var obj = {
        'year': $('#Year').val().trim(),
        'status': $('#Status').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.search.path,
        apiConfig.api.auditplan.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchAuditPlanSuccess', 'msgError');
}
function fnSearchAuditPlanSuccess(rspn) {
    var tbBody = $('#auditplantable tbody');
    $("#auditplantable").dataTable().fnDestroy();
    var html = '';
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        html += getHtmlChild(data, '', 0);
        tbBody.append(html);
    }
    $("#auditplantable").dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        //"scrollX": true,
        "columnDefs": [{
            "targets": [0, 3, 4, 5],
            "searchable": false,
            "orderable": false
        }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    reCalculatPagesCustom(rspn.total);
    viewBtnActionPage();
    collapseDelegate();
}
function SubmitApproval() {
    var _id = $("#formDetail").find("#IdDetail").val();
    var _name = $("#formDetail").find("#nameDetail").val();
    swal({
        title: "Thông báo",
        text: "Bạn có chắc chắn muốn duyệt bản ghi này?  " + _name,
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
    var obj = {
        'item_id': id,
        'function_name': "Kế hoạch kiểm toán năm",
        'function_code': "M_AP",
    }
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.submitapproval.path,
        apiConfig.api.approvalfunction.action.submitapproval.method,
        obj, 'fnSubmitApprovalSuccess');
    //callApi_auditservice(
    //    apiConfig.api.auditplan.controller,
    //    apiConfig.api.auditplan.action.submitapproval.path + "/" + id,
    //    apiConfig.api.auditplan.action.submitapproval.method,
    //    null, 'fnSubmitApprovalSuccess', 'msgError');
}
function fnSubmitApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRequestApprove .close').click();
        //swal("Thông báo!", "Phê duyệt thành công!", "success");
        toastr.success("Phê duyệt thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Phê duyệt kế hoạch kiểm toán năm", param_version);
           
        }
        setTimeout(function () {
            window.location.href = "/AuditPlan";
        }, 100);
    }
    else {
        //swal("Lỗi!", "Phê duyệt không thành công!", "error");
        toastr.error("Phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnRejectApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRejectApprove .close').click();
        //swal("Thông báo!", "Từ chối duyệt thành công!", "success");
        toastr.success("Từ chối duyệt thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Từ chối phê duyệt kế hoạch kiểm toán năm", param_version);
        }
        setTimeout(function () {
            window.location.href = "/AuditPlan";
        }, 100);
    }
    else {
        //swal("Error!", "Từ chối duyệt không thành công!", "error");
        toastr.error("Từ chối duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnRequestApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRequestApprove .close').click();
        //swal("Thông báo!", "Gửi phê duyệt thành công!", "success");
        toastr.success("Gửi phê duyệt thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Gửi duyệt kế hoạch kiểm toán năm ", param_version);
        }
        setTimeout(function () {
            window.location.href = "/AuditPlan";
        }, 100);
    }
    else {
        //swal("Error!", "Gửi phê duyệt không thành công!", "error");
        toastr.error("Gửi phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
var idAuditPlan = 0;
function getHtmlChild(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;&nbsp;';
    }
    var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    var html = '';
    if (childs != null && childs.length > 0) {
        var level_approval = getApprovallevel("M_AP");
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];

            var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
            var colId = 'collapRow' + obj.id;
            var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
            var StatusName = getApprovalStatus("M_AP", obj.status);
            var textVersion = (obj.version == undefined || obj.version == null) ? '' : 'v' + obj.version;
            var name = "'" + obj.name + "'";
          
            html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
                '<td class="' + rowCls + '" style="text-align:center;width: 8%">' + nbsp + btnShow + '</td>' +
                '<td class="text-center" style = "width: 10% !important">' + obj.year + '</td>' +
                '<td style = "width: 35% !important">' + obj.name + '</td>' +
                '<td class="text-center" style = "width: 10% !important">' + textVersion + '</td>' +
                '<td style = "width: 10% !important">' + StatusName + '</td>' +
                '<td class="col-action text-center" style="width: 15% !important">' +
                (IsCheckPemission('M_AP', 'PER_DETAIL') === true ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>')
                 +
                (IsCheckPemission('M_AP', 'PER_EDIT') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_AP', 'PER_DEL') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2")
                    ? '<a class="btn icon-delete btn-action-custom btn-sm" onclick="Delete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +
                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(10,' + obj.id + ',' + name + ')"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="ExportInlist(' + obj.id+')"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file"></i>&nbsp Xuất file</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AP', 'PER_REQUEST') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(11,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AP', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' + obj.id + ')"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true"></i>&nbsp Phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AP', 'PER_ADD') === true &&  obj.status == "3.1"
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="Copy(' + obj.id + ')" style=" display: flex;"><i data-toggle="tooltip" title="Sao chép kế hoạch năm" class="fa fa-clone" aria-hidden="true" ></i>&nbsp Tạo phiên bản mới</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Sao chép kế hoạch năm" class="fa fa-clone" aria-hidden="true" ></i>&nbsp Tạo phiên bản mới</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AP', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_AP') == 1
                ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="CallChangeStatusModal(' + obj.id + ',' + name + ',\'M_AP\',\'Kế hoạch kiểm toán năm\',' + obj.year + ')" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>';
            if (obj.sub_activities != undefined && obj.sub_activities != null)
                html += getHtmlChild(obj.sub_activities, prId + ' ' + colId, n + 1);
            idAuditPlan = obj.id;
        }
    }
    return html;
}
function getHtmlScopeNoTree(childs) {
    var html = '';
    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            var check = true;
            var last_audit_time;
            if (obj.last_audit_time) {
                last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
            }
            $("#auditscope > tbody > tr").each(function (i, v) {
                if ($(v).find(".process").val() == obj.process_id) {
                    check = false;
                }
            })
            if (check == true) {
                html += '<tr>' +
                    '<td style="text-align:center;width: 8%">' + rowNo(1, 9999, j) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,0)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
            }
        }
    }
    return html;
}
function getHtmlChildScope(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;&nbsp;';
    }
    var html = '';

    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {

            var obj = childs[j];
            var check = true;
            $("#auditscope > tbody > tr").each(function (i, v) {
                if ($(v).find(".process").val() == obj.process_id) {
                    check = false;
                }
            })
            if (check == true) {
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                rowCls += '';
                html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
                    '<td class="' + rowCls + '" style="text-align:center;width: 8%"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  />' + nbsp + btnShow + '</td>' +
                    '<td class="line-break"><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
                    '<td class="line-break">' + (obj.is_show == true ? '<input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) : "") + '</td>' +
                    '<td class="line-break">' + (obj.is_show == true ? (obj.risk_level_change != null ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_change) + '"  />' + viewValue(getIssueLevel(obj.risk_level_change)) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(getIssueLevel(obj.risk_level)))
                        : (obj.risk_level_change != null ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_change) + '"  />' : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />')) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(obj.last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null)
                    html += getHtmlChildScope(obj.sub_activities, prId + ' ' + colId, n + 1);
            }

        }
    }
    return html;
}
function getHtmlChildEditScope(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;&nbsp;';
    }
    var html = '';

    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {

            var obj = childs[j];
            var check = true;
            $("#auditscopeEdit > tbody > tr").each(function (i, v) {
                if ($(v).find(".process").val() == obj.process_id) {
                    check = false;
                }
            })
            if (check == true) {
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                rowCls += '';
                html += '<tr class="rowedit ' + rowCls + ' ' + prId + ' show">' +
                    '<td class="' + rowCls + '" style="text-align:center;width: 8%"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  />' + nbsp + btnShow + '</td>' +
                    '<td class="line-break"><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
                    '<td class="line-break">' + (obj.is_show == true ? '<input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) : "") + '</td>' +
                    '<td class="line-break">' + (obj.is_show == true ? (obj.risk_level_change != null ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_change) + '"  />' + viewValue(getIssueLevel(obj.risk_level_change)) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(getIssueLevel(obj.risk_level)))
                        : (obj.risk_level_change != null ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_change) + '"  />' : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />')) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(obj.last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,1)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null)
                    html += getHtmlChildEditScope(obj.sub_activities, prId + ' ' + colId, n + 1);
            }
        }
    }
    return html;
}
function getHtmlEditScopeNoTree(childs) {
    var html = '';
    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            var check = true;
            var last_audit_time;
            if (obj.last_audit_time) {
                last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
            }
            $("#auditscopeEdit > tbody > tr").each(function (i, v) {
                if ($(v).find(".process").val() == obj.process_id) {
                    check = false;
                }
            })
            if (check == true) {
                html += '<tr class="rowedit" >' +
                    '<td style="text-align:center;width: 8%">' + rowNo(1, 9999, j) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,1)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
            }
        }
    }
    return html;
}
function getHtmlChildGetDetailScope(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;&nbsp;';
    }
    var html = '';

    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
            var colId = 'collapRow' + obj.board_id;
            var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
            rowCls += '';
            html += '<tr class="rowedit ' + rowCls + ' ' + prId + ' show">' +
                '<td class="' + rowCls + '" style="text-align:center;width: 8%"><input type="hidden" class="board_id" value="' + viewValue(obj.board_id) + '"  />' + nbsp + btnShow + '</td>' +
                '<td class="line-break">' + viewValue(obj.auditprocess_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.auditfacilities_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.bussinessactivities_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.reason) + '</td>' +
                '<td class="line-break">' + viewValue(getIssueLevel(obj.risk_rating)) + '</td>' +
                '<td class="line-break">' + viewValue(obj.auditing_time_nearest) + '</td>' +
                '<td class="col-action" style="width: 5% !important;">' +
                '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,1)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            if (obj.sub_activities != undefined && obj.sub_activities != null)
                html += getHtmlChildGetDetailScope(obj.sub_activities, prId + ' ' + colId, n + 1);
        }
    }
    return html;
}
function getHtmlGetDetailNoTree(childs, num) {
    var html = '';
    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            html += '<tr>' +
                '<td  style="text-align:center;width: 8%">' + rowNo(1, 9999, j) + '</td>' +
                '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.board_id) + '"  /><input type="hidden" class="process" value="' + viewValue(obj.auditprocess_id) + '"/>' + viewValue(obj.auditprocess_name) + '</td>' +
                '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.auditfacilities_id) + '"/>' + viewValue(obj.auditfacilities_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.bussinessactivities_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.reason) + '</td>' +
                '<td class="line-break">' + viewValue(obj.risk_rating_name) + '</td>' +
                '<td class="line-break">' + viewValue(obj.auditing_time_nearest) + '</td>' +
                (num == 1 ? '<td class="col-action" style="width: 5% !important;">' +
                '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditWorkScope(\'' + obj.auditprocess_name + '\',' + obj.id + ',' + obj.auditfacilities_id +')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' : "") +
                '</tr>';
        }
    }
    return html;
}
function getHtmlChildDVSearchDetail(childs, objectid) {
    var _html = '';
    if (childs != null && childs.length > 0) {
        var colId = 'collapRow' + objectid;
        _html += '<tr class="' + colId + ' show"><td></td><td colspan="7">';
        var __html = '<table class="table"><thead style="background: #bde4f6 !important;">' +
            '<tr>' +
            '<th scope="col" style="width: 10rem">Mã quy trình</th>' +
            '<th scope="col" style="width: 20rem">Tên quy trình</th>' +
            '<th scope="col" style="width: 20rem">Hoạt động liên quan</th>' +
            '<th scope="col" style="width: 4rem" ><input type="checkbox" class="form-control checkitem_temp checkDonViDetailItem" id="checkDonViDetailItem" name="checkDonViDetailItem" style="margin: auto;" /></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            __html += '<tr>' +
                '<td>' + viewValue(obj.process_code) + '</td>' +
                '<td>' + viewValue(obj.process_name) + '</td>' +
                '<td>' + viewValue(obj.activity_name) + '</td>' +
                '<td class="col-action">' +
                '<input type="checkbox" class="form-control checkitem_temp checkitem" id="checkitem" name="checkitem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + objectid + '"/>' +
                '</td>' +
                '</tr>';
        }
        __html += '</tbody></table>';
        _html += __html;
        _html += '</td></tr>';
    }
    return _html;
}
function getHtmlChildHDKDSearchDetail(childs, objectid) {
    var _html = '';
    if (childs != null && childs.length > 0) {
        var colId = 'collapRow' + objectid;
        _html += '<tr class="' + colId + ' show"><td></td><td colspan="7">';
        var __html = '<table class="table"><thead style="background: #bde4f6 !important;">' +
            '<tr>' +
            '<th scope="col" style="width: 10rem">Mã quy trình</th>' +
            '<th scope="col" style="width: 20rem">Tên quy trình</th>' +
            '<th scope="col" style="width: 20rem">Đơn vị liên quan</th>' +
            '<th scope="col" style="width: 4rem"><input type="checkbox" class="form-control checkitem_temp checkHoatDongDetailItem" id="checkHoatDongDetailItem" name="checkHoatDongDetailItem" style="margin: auto;" /></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            __html += '<tr>' +
                '<td>' + viewValue(obj.process_code) + '</td>' +
                '<td>' + viewValue(obj.process_name) + '</td>' +
                '<td>' + viewValue(obj.facility_name) + '</td>' +
                '<td class="col-action">' +
                '<input type="checkbox" class="form-control checkitem_temp checkitem" id="checkitem" name="checkitem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + objectid + '"/>' +
                '</td>' +
                '</tr>';
        }
        __html += '</tbody></table>';
        _html += __html;
        _html += '</td></tr>';
    }
    return _html;
}
var y = new Date()
var count = 0;
var validateformAddScope;
function openView(type, value, frmHeader) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var browse = $("#browse");
    var detail = $("#detail");
    var addscope = $("#AddScope");
    var addAuditWork = $("#addAuditWork");
    var editAuditWork = $("#editAuditWork");
    var detailAuditWork = $("#detailAuditWork");
    var view_log = $("#view-log");
    $("input").prop("readonly", false);
    $("select").prop("disabled", false);
    $("textarea").prop("readonly", false)
    if (type === 0) {
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        if (count == 0) {
            setTimeout(function () {
                onSearch();
            }, 100);
            count++;
        }
    }
    else if (type === 1) {
        //localStorage.setItem("type", "1");
        index.hide();
        create.show();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        document.getElementById("formCreate").reset();
        document.getElementById("yearCreate").focus();
        $("#frmHeaderCreate").val(frmHeaderCreate);
        $("#yearCreate").val(y.getFullYear());

    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        //CKEDITOR.replace("OtherInformationDetail", {
        //    height: 300,
        //    disableObjectResizing: true
        //});
        fnGetDetail(type, value);
        $("#formDetail").find("#showbuttonApproval").hide();
        $("#formDetail").find("#showRequestApproval").hide();
        $("#formDetail").find("#ActionRole").val(type);
    }
    else if (type === 3) {
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
       
        //CKEDITOR.replace("OtherInformationEdit", {
        //    height: 300,
        //    disableObjectResizing: true
        //});
        fnGetDetail(type, value);
        document.getElementById("nameEdit").focus();

    }
    else if (type === 4) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        //CKEDITOR.replace("OtherInformationDetail", {
        //    height: 300,
        //    disableObjectResizing: true
        //});
        fnGetDetail(2, value);
        $("#formDetail").find("#showbuttonApproval").show();
        $("#formDetail").find("#showRequestApproval").hide();
        $("#formDetail").find("#ActionRole").val(type);
    }
    else if (type === 5) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.show();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        $("#form-audit-work").find("#NumOfAuditor").prop("readonly", true);
        //fnGetAuditWorkDetail(type, value);
    }
    else if (type === 6) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.show();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();

        //$("#StartDateEdit , #EndDateEdit").bootstrapMaterialDatePicker({
        //    time: false,
        //    format: 'DD/MM/YYYY',
        //});
        if (value > 0) {
            document.getElementById("form-edit-audit-work").reset();
            fnGetAuditWorkDetail(type, value);
        }
        $("#form-edit-audit-work").find("#NumOfAuditorEdit").prop("readonly", true);

    }
    else if (type === 7) { //detail 
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.show();
        addscope.hide();
        view_log.hide();
        fnGetAuditWorkDetail(type, value);
    }
    else if (type === 8 || type === 9) { //add scope
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.show();
        loadCategory();
        view_log.hide();
        if (type === 8) {
            $("#formAddScope").find("#DoAction").val(0);
        }
        else {
            $("#formAddScope").find("#DoAction").val(1);
        }
        setTimeout(function () {
            getCatRiskLevel()
        }, 120);
        $('#TypeDisplay').val(-1);
        changeStageValue();
        ChangeTypeDisplay();
        var tbBody = $('#tblRiskScore tbody');
        $("#tblRiskScore").dataTable().fnDestroy();
        tbBody.html('');
    }
    else if (type === 10) { //log 
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.show();
        $("#namekehoachnam").text(frmHeader);
        onSearchlog(value);
    }
    else if (type === 11) { //request approve
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        browse.hide();
        addAuditWork.hide();
        editAuditWork.hide();
        detailAuditWork.hide();
        addscope.hide();
        view_log.hide();
        //CKEDITOR.replace("OtherInformationDetail", {
        //    height: 300,
        //    disableObjectResizing: true
        //});
        fnGetDetail(2, value);
        $("#formDetail").find("#showbuttonApproval").hide();
        $("#formDetail").find("#showRequestApproval").show();
        $("#formDetail").find("#ActionRole").val(type);
    }
}
function openViewDetail(type, value) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var browse = $("#browse");
    var detail = $("#detail");
    var addscope = $("#AddScope");
    var addAuditWork = $("#addAuditWork");
    var editAuditWork = $("#editAuditWork");
    var detailAuditWork = $("#detailAuditWork");
    var view_log = $("#view-log");
    $("input").prop("readonly", true);
    $("select").prop("disabled", true);
    $("textarea").prop("readonly", true);
    index.hide();
    create.hide();
    edit.hide();
    detail.hide();
    browse.hide();
    addAuditWork.hide();
    editAuditWork.hide();
    detailAuditWork.show();
    addscope.hide();
    view_log.hide();
    var role = $("#formDetail").find("#ActionRole").val();
    $("#form-detail-audit-work").find("#ActionEdit").val(type);
    $("#form-detail-audit-work").find("#ActionRole").val(role);
    fnGetAuditWorkDetail(7, value);

}
function openViewEdit(type, value) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var browse = $("#browse");
    var detail = $("#detail");
    var addscope = $("#AddScope");
    var addAuditWork = $("#addAuditWork");
    var editAuditWork = $("#editAuditWork");
    var detailAuditWork = $("#detailAuditWork");
    var view_log = $("#view-log");
    index.hide();
    create.hide();
    edit.show();
    detail.hide();
    browse.hide();
    addAuditWork.hide();
    editAuditWork.hide();
    detailAuditWork.hide();
    addscope.hide();
    view_log.hide();
    fnGetDetailCustom(type, value);

}
function onSearchlog_delete(param) {
    var obj = {
        'auditplan_id': param + "",
        'name': "",
        'module': "Kế hoạch năm",
        'start_date': "",
        'end_date': "",
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.searchAuditPlan.path,
        apiConfig.api.systemlog.action.searchAuditPlan.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSystemLogTableSuccess', 'msgError');
}
function onSearchlog(param) {   
    var obj = {
        'item_id': param,
        'item_type': 1,
        'page_size': 9999,
        'start_number': 0,
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.search.path,
        apiConfig.api.discussionhistory.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSystemLogTableSuccess', 'msgError');
}
function fnSearchSystemLogTableSuccess_delete(rspn) {
    var tbBody = $('#auditPlanHistory tbody');
    $("#auditPlanHistory").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {

        var data = rspn.data;

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td>' + obj.datetime + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.perform_tasks + '</td>' +
                '<td>' + (obj.version != undefined && obj.version != null && obj.version != "" ? "v" + obj.version : "") + '</td>' +
                '</tr>';
            tbBody.append(html);
        }

    }
    var t = $("#auditPlanHistory").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3],
                "searchable": false,
                "orderable": false
            }],
        "order": [],
    });
    //reCalculatPagesCustom(rspn.total);
    //viewBtnActionPage();
}
function fnSearchSystemLogTableSuccess(rspn) {
    var tbBody = $('#KitanoFunctionHistory tbody');
    $("#KitanoFunctionHistory").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {

        var data = rspn.data;

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td>' + obj.created_at + '</td>' +
                '<td>' + obj.person_perform + '</td>' +
                '<td>' + obj.type + '</td>' +
                '<td class="text-center">' + (obj.version != undefined && obj.version != null && obj.version != "" ? "v" + obj.version : "") + '</td>' +
                '<td>' + obj.content + '</td>' +
                '</tr>';
            tbBody.append(html);
        }

    }
    var t = $("#KitanoFunctionHistory").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3],
                "searchable": false,
                "orderable": false
            }],
        "order": [],
    });
}
function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'year': $('#yearCreate').val(),
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.add.path,
        apiConfig.api.auditplan.action.add.method,
        obj, 'createAuditPlanSuccess', 'msgError');
}
function createAuditPlanSuccess(data) {
    if (data.code === '1') {
        //swal("Thông báo!", "Thêm mới kế hoạch kiểm toán thành công!", "success");
        toastr.success("Thêm mới kế hoạch kiểm toán thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (data.data != undefined && data.data != null) {
            var obj = data.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Tạo mới kế hoạch kiểm toán năm", param_version);
            SaveHistoryKitano(obj.id, "M_AP", "Tạo mới kế hoạch kiểm toán năm", "Tạo mới kế hoạch kiểm toán năm", viewValue(obj.version));
        }

        setTimeout(function () {
            openView(3, obj.id);
            //window.location.href = "/AuditPlan"
        }, 2000);
    }
    else if (data.code === '0') {
        //swal("Error!", "Đã có kế hoạch kiểm toán cho năm này, bạn vui lòng chọn lại năm!", "error");
        toastr.error("Đã có kế hoạch kiểm toán cho năm này, bạn vui lòng chọn lại năm!", "Lỗi!", { progressBar: true });
    }
    else {
        //swal("Error!", "Thêm mới thất bại!", "error");
        toastr.error("Thêm mới không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnGetDetail(type, param) {
    var call_back = '';
    if (type === 3) {
        call_back = 'fnEditSuccess';
    }
    else if (type === 2) {
        call_back = 'fnGetDetailSuccess';
    }
    else if (type === 4) {
        call_back = 'fnGetBrowseSuccess';
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.getItem.path + "/" + param,
        apiConfig.api.auditplan.action.getItem.method,
        null, call_back, 'msgError');
}
function fnGetDetailCustom(type, param) {
    var call_back = 'fnEditSuccessCustom';
  
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.getItem.path + "/" + param,
        apiConfig.api.auditplan.action.getItem.method,
        null, call_back, 'msgError');
}
function fnGetAuditWorkDetail(type, param) {
    var call_back = '';
    if (type === 6) {
        call_back = 'fnEditAuditWorkSuccess';
    }
    else if (type === 7) {
        call_back = 'fnGetDetailAuditWorkSuccess';
    }
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.getItem.path + "/" + param,
        apiConfig.api.auditwork.action.getItem.method,
        null, call_back, 'msgError');
}
function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'name': $('#nameEdit').val().trim(),
        'year': $('#yearEdit').val(),
        'note': $('#noteEdit').val().trim(),
        'target': $('#targetEdit').val().trim(),
        'status': $('#statusEdit').val(),

    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.update.path,
        apiConfig.api.auditplan.action.update.method,
        obj, 'updateAuditPlanSuccess', 'msgError');
}
function submitApprove() {
    var obj = {
        'id': $('#IdBrowse').val(),
        'name': $('#nameBrowse').val(),
        'year': $('#yearBrowse').val(),
        'note': $('#noteBrowse').val(),
        'target': $('#targetBrowse').val(),
        'status': $('#statusBrowse').val(),
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.update.path,
        apiConfig.api.auditplan.action.update.method,
        obj, 'approveAuditPlanSuccess', 'msgError');
}
function DeleteAuditWorkScope(fullName, id, unitid) {
    var _name = String(fullName);
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + _name + "!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            var facility_id = unitid;
            var count_dv = 0;
            $("#auditscopeEdit > tbody > tr").each(function (i, v) {
                var _facility_id = $(v).find(".facility").val();
                if (facility_id == _facility_id) {
                    count_dv++;
                }
            })
            var all = count_dv == 1 ? 1 : 0
            fnDeleteAuditWorkScope(id, all);
        }
    });
}
function fnDeleteAuditWorkScope(id, all) {
  

    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.deleteauditworkscope.path + "/" + id + "/" + all,
        apiConfig.api.auditwork.action.deleteauditworkscope.method,
        null, 'fnDeleteAuditWorkScopeSuccess', 'msgError');
}
function fnDeleteAuditWorkScopeSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        var param = $("#form-edit-audit-work").find("#IdWorkEdit").val();
        fnGetAuditWorkDetail(6, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}
function DeleteAuditWork(id, name) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + name + '!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditWork(id);
        }
    });
}
function fnDeleteAuditWork(id) {
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.deleteauditwork.path + "/" + id,
        apiConfig.api.auditwork.action.deleteauditwork.method,
        null, 'fnDeleteAuditWorkSuccess', 'msgError');
}
function fnDeleteAuditWorkSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Xóa cuộc kiểm toán", param_version);
            SaveHistoryKitano(obj.id, "M_AP", "Xóa cuộc kiểm toán", "Xóa cuộc kiểm toán", viewValue(obj.version));
        }
        var param = $("#formEdit").find("#IdEdit").val();
        fnGetDetail(3, param);
    }
    else {
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });

    }

}
function fnEditSuccess(rspn) {
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#PlanYear").val(data.year);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#yearEdit").val(data.year);
        $("#OtherInformationEdit").val(data.other_info);
        if (CKEDITOR.instances['OtherInformationEdit']) {
            CKEDITOR.instances['OtherInformationEdit'].setData(data.other_info);
            CKEDITOR.instances['OtherInformationEdit'].updateElement();
        }
        else {
            CKEDITOR.replace("OtherInformationEdit", {
                height: 300,
                disableObjectResizing: true
            });
        }
       
        
       
        if (data.is_copy == true) {
            frmModify.find("#yearEdit").prop("readonly", true);
        }
        frmModify.find("#noteEdit").val(data.note);
        frmModify.find("#targetEdit").val(data.target);
        frmModify.find("#statusCodeEdit").val(data.status);
        frmModify.find("#statusEdit").val(getApprovalStatus("M_AP", data.status)).prop("readonly", true);

        frmModify.find("#FileDetailPlan").empty();

        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
            var _append_data = "";
            //var _arraypath = data.path.replaceAll("/", "\\").split("\\");
            //var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
            //_append_data += '<a href="javascript:DownloadFileApproval(' + data.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += "<div>";
                _append_data += '<a href="javascript:DownloadFileApproval(' + obj.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefilePlan(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += "</div>";
            }
            frmModify.find("#FileDetailPlan").append(_append_data);
        }

        var tbBody = $('#audittable tbody');
        $("#audittable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.auditworklist !== undefined && data.auditworklist !== null) {
            var data_ = data.auditworklist;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
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
                var name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.code + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + obj.name + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditfacilities_name) + '</td>' +
                    //'<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditprocess_name) + '</td>' +
                    '<td class="text-center">' + _start_date + '</td>' +
                    '<td class="text-center">' + _end_date + '</td>' +
                    '<td>' + obj.person_in_charge + '</td>' +
                    '<td class="col-action" style="width: 12% !important;">' +
                    '<a class="btn icon-default btn-action-custom" onclick="openViewDetail(1,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '<a class="btn icon-default btn-action-custom" onclick="openView(6,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
                    '<a class="btn icon-delete btn-action-custom"  onclick="DeleteAuditWork(' + obj.id + ',' + name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#audittable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 6, 7],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    }
}
function fnEditSuccessCustom(rspn) {
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#PlanYear").val(data.year);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#yearEdit").val(data.year);
        //$("#OtherInformationEdit").text(data.other_info);
        $("#OtherInformationEdit").val(data.other_info);
        if (CKEDITOR.instances['OtherInformationEdit']) {
            CKEDITOR.instances['OtherInformationEdit'].setData(data.other_info);
            CKEDITOR.instances['OtherInformationEdit'].updateElement();
        }
        else {
            CKEDITOR.replace("OtherInformationEdit", {
                height: 300,
                disableObjectResizing: true
            });
        }        
        if (data.is_copy == true) {
            frmModify.find("#yearEdit").prop("readonly", true);
        }
        //frmModify.find("#statusEdit").val(data.status).prop("disabled", true);
        frmModify.find("#statusCodeEdit").val(data.status);
        frmModify.find("#statusEdit").val(getApprovalStatus("M_AP", data.status)).prop("readonly", true);

        var tbBody = $('#audittable tbody');
        $("#audittable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.auditworklist !== undefined && data.auditworklist !== null) {
            var data_ = data.auditworklist;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
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
                var name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.code + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + obj.name + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditfacilities_name) + '</td>' +
                    //'<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditprocess_name) + '</td>' +
                    '<td class="text-center">' + _start_date + '</td>' +
                    '<td class="text-center">' + _end_date + '</td>' +
                    '<td>' + obj.person_in_charge + '</td>' +
                    '<td class="col-action" style="width: 12% !important;">' +
                    '<a class="btn icon-default btn-action-custom" onclick="openViewDetail(1,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '<a class="btn icon-default btn-action-custom" onclick="openView(6,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
                    '<a class="btn icon-delete btn-action-custom"  onclick="DeleteAuditWork(' + obj.id + ',' + name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#audittable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 6, 7],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    }
}
function fnGetBrowseSuccess(rspn) {
    var frmModify = $("#formBrowse");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdBrowse").val(data.id);
        frmModify.find("#nameBrowse").val(data.name);
        frmModify.find("#yearBrowse").val(data.year);
        frmModify.find("#noteBrowse").val(data.note);
        frmModify.find("#targetBrowse").val(data.target);
    }
}
function fnGetDetailSuccess(rspn) {
    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var brown_date;
        if (data.browsedate) {
            brown_date = $.format.date(data.browsedate, 'dd/MM/yyyy')
        }
        else {
            brown_date = ""
        }
        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#nameDetail").val(data.name);
        frmModify.find("#yearDetail").val(data.year);
        frmModify.find("#ApproverDetail").val(data.approval_user);
        frmModify.find("#noteDetail").val(data.note);
        frmModify.find("#targetDetail").val(data.target);
        frmModify.find("#statusCodeDetail").val(data.status);
        frmModify.find("#statusDetail").val(getApprovalStatus("M_AP", data.status));//.prop("disabled", true);
        frmModify.find("#browsedateDetail").val(brown_date);
        frmModify.find("#versionDetail").val(data.version);
        $("#OtherInformationDetail").val(data.other_info).prop("disabled", true);
        if (CKEDITOR.instances['OtherInformationDetail']) {
            CKEDITOR.instances['OtherInformationDetail'].setData(data.other_info);
            CKEDITOR.instances['OtherInformationDetail'].updateElement();
        }
        else {
            CKEDITOR.replace("OtherInformationDetail", {
                height: 300,
                disableObjectResizing: true
            });
        }
        //if (CKEDITOR.instances['OtherInformationDetail']) {
        //    CKEDITOR.instances['OtherInformationDetail'].destroy();
        //}
        //CKEDITOR.replace("OtherInformationDetail", {
        //    height: 300,
        //    disableObjectResizing: true
        //});
        frmModify.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileApproval(' + obj.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
            }
            frmModify.find("#FileDetail").append(_append_data);
        }

        //var _append_data = "";
        //if (data.path != undefined && data.path != null && data.path != "") {
        //    var _arraypath = data.path.replaceAll("/", "\\").split("\\");
        //    var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
        //    _append_data += '<a href="javascript:DownloadFileApproval(' + data.id + ',' + file_name +');"><span>' + file_name + '</span></a>';
        //}
        //frmModify.find("#FileDetail").append(_append_data);
        var tbBody = $('#audittableDetail tbody');
        $("#audittableDetail").dataTable().fnDestroy();
        tbBody.html('');
        if (data.auditworklist !== undefined && data.auditworklist !== null) {
            var data_ = data.auditworklist;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
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
                var name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.code + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + obj.name + '</td>' +
                    '<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditfacilities_name) + '</td>' +
                    //'<td class="line-break" style="width: 15% !important">' + viewValue(obj.auditprocess_name) + '</td>' +
                    '<td class="text-center">' + _start_date + '</td>' +
                    '<td class="text-center">' + _end_date + '</td>' +
                    '<td>' + obj.person_in_charge + '</td>' +
                    '<td class="col-action" style="width: 12% !important;">' +
                    '<a class="btn icon-default btn-action-custom" onclick="openViewDetail(0,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#audittableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 6, 7],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    }
}
function updateAuditPlanSuccess(data) {
    if (data.code === '1') {
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (data.data != undefined && data.data != null) {
            var obj = data.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Cập nhật kế hoạch kiểm toán năm", param_version);
            SaveHistoryKitano(obj.id, "M_AP", "Cập nhật kế hoạch kiểm toán năm", "Cập nhật kế hoạch kiểm toán năm", viewValue(obj.version));
        }

        setTimeout(function () {
            window.location.href = "/AuditPlan"
        }, 300);
    }
    else if (data.code === '0') {
        //swal("Error!", "Đã có kế hoạch kiểm toán cho năm này, bạn vui lòng chọn lại năm!", "error");
        toastr.error("Đã có kế hoạch kiểm toán cho năm này, bạn vui lòng chọn lại năm!", "Lỗi!", { progressBar: true });
    }
    else {
       // swal("Error!", "Cập nhật thất bại!", "error");
        toastr.error("Cập nhật thất bại!", "Lỗi!", { progressBar: true });
    }
}
function approveAuditPlanSuccess(data) {
    if (data.code === '1') {
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", { progressBar: true });
        setTimeout(function () {
            window.location.href = "/AuditPlan"
        }, 2000);
    }
    else {
        //swal("Error!", "Cập nhật thất bại!", "error");
        toastr.error("Cập nhật thất bại!", "Lỗi!", { progressBar: true });
    }
}
function Delete(name, id) {
    var _name = String(name);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditPlan(id);
        }
    });
}
function fnDeleteAuditPlan(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.delete.path + "/" + id,
        apiConfig.api.auditplan.action.delete.method,
        null, 'fnDeleteAuditPlanSuccess', 'msgError');
}
function fnDeleteAuditPlanSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        createdLogKitano("Kế hoạch năm", "Xóa kế hoạch kiểm toán năm");
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            SaveHistoryKitano(obj.id, "M_AP", "Xóa kế hoạch kiểm toán năm", "Xóa kế hoạch kiểm toán năm", viewValue(obj.version));
        }

        onSearch();
    }
    else {
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}
function Copy(id) {
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn sao chép kế hoạch kiểm toán năm!",
        type: 'warning',
        showCancelButton: !0,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnCopyAuditPlan(id);
        }
    });
}
function fnCopyAuditPlan(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.copy.path + "/" + id,
        apiConfig.api.auditplan.action.copy.method,
        null, 'fnCopyAuditPlanSuccess', 'msgError');
}
function fnCopyAuditPlanSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Sao chép kế hoạch kiểm toán năm thành công!", "success");
        toastr.success("Sao chép kế hoạch kiểm toán năm thành công!", "Thông báo!", { progressBar: true });
        var param_version = "";
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            param_version = obj.id + "_" + viewValue(obj.version);
            createdLog("Kế hoạch năm", "Tạo phiên bản mới kế hoạch kiểm toán năm", param_version);
            SaveHistoryKitano(obj.id, "M_AP", "Tạo phiên bản mới kế hoạch kiểm toán năm", "Tạo phiên bản mới kế hoạch kiểm toán năm", viewValue(obj.version));
        }

        setTimeout(function () {
            onSearch();
        }, 300);

    }
    else if (rspn.code === '0') {
        //swal("Thông báo!", "Kế hoạch kiểm toán năm đã tồn tại bản sao!", "warning");
        toastr.error("Kế hoạch kiểm toán năm đã tồn tại bản sao!", "Lỗi!", { progressBar: true });
        //onSearch();
    }
    else {
        //swal("Error!", "Sao chép kế hoạch kiểm toán năm không thành công!", "error");
        toastr.error("Sao chép kế hoạch kiểm toán năm không thành công!", "Lỗi!", { progressBar: true });
    }
}
function createdLog(_module, _perform_tasks/*, _version*/) {
    var obj = {
        'module': _module,
        'perform_tasks': _perform_tasks,
        //'version': _version,
    }
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.addlogaudit.path,
        apiConfig.api.systemlog.action.addlogaudit.method,
        obj, '', '');
}
var _count = 0;
function LoadAuditWWork() {
    _count = 0;
    setTimeout(function () {
        multiselect("PersonInCharge", "Chọn người phụ trách..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
    }, 100);
    var tbBody = $("#auditworkbody");
    $("#auditworktable").dataTable().fnDestroy();
    tbBody.html('');
    //AddRow();
    //$("#auditworktable").dataTable({
    //    "bPaginate": false,
    //    "bLengthChange": false,
    //    "bFilter": false,
    //    "bInfo": false,
    //    "columnDefs": [
    //        {
    //            "targets": [0, 1, 2, 3],
    //            "searchable": false,
    //            "orderable": false
    //        }
    //    ],
    //    "order": [],
    //})
}
function LoadAuditWWorkEdit() {
    _count = 0;
    setTimeout(function () {
        multiselect("PersonInChargeEdit", "Chọn người phụ trách..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
    }, 100);
    var tbBody = $("#auditworkbodyEdit");
    $("#auditworktableEdit").dataTable().fnDestroy();
    tbBody.html('');
    //AddRow();
    //$("#auditworktable").dataTable({
    //    "bPaginate": false,
    //    "bLengthChange": false,
    //    "bFilter": false,
    //    "bInfo": false,
    //    "columnDefs": [
    //        {
    //            "targets": [0, 1, 2, 3],
    //            "searchable": false,
    //            "orderable": false
    //        }
    //    ],
    //    "order": [],
    //})
}
function AddRow() {
    var table_row = "";
    table_row += '<tr> ' +
        ' <td><select class="form-control usersid" id="Users_' + _count + '" name="Users_' + _count + '" style="padding:0;"></td>' +
        ' <td><input type="date" class="form-control picker start_date" id="StartDate_' + _count + '" name="StartDate_' + _count + '" ></td>' +
        ' <td><input type="date" class="form-control picker end_date" id="EndDate_' + _count + '" name="EndDate_' + _count + '" ></td>' +
        '<td class="col-action">' +
        '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
        /*(_count != 0 ? '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' : "") +*/
        '</td>' +
        ' </tr>';
    $("#auditworkbody").append(table_row);
    multiselect_auditor("Users_" + _count, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectauditor.path,0);
    //$("#EndDate_" + _count).bootstrapMaterialDatePicker({
    //    time: false,
    //    format: 'DD/MM/YYYY',
    //});
    //$("#StartDate_" + _count).bootstrapMaterialDatePicker({
    //    time: false,
    //    format: 'DD/MM/YYYY',
    //}).on('change', function (e, date) {
    //    if ($("#EndDate_" + _count).val() == undefined || moment(date._d).format('DD/MM/YYYY') > $("#EndDate_" + _count).val()) {
    //        $("#EndDate_" + _count).val(moment(date._d).format('DD/MM/YYYY'))
    //    }
    //    $("#EndDate_" + _count).bootstrapMaterialDatePicker('setMinDate', date)
    //});
    var recount = 0;
    $("#auditworktable > tbody > tr").each(function (i, v) {
        recount++;
    });
    $("#form-audit-work").find("#NumOfAuditor").val(recount);
    _count++;
}
function AddRowEdit() {
    var table_row = "";
    table_row += '<tr> ' +
        ' <td><select class="form-control usersid" id="UsersEdit_' + _count + '" name="UsersEdit_' + _count + '" style="padding:0;"></td>' +
        ' <td><input type="date" class="form-control picker start_date" id="StartDateEdit_' + _count + '" name="StartDateEdit_' + _count + '" ></td>' +
        ' <td><input type="date" class="form-control picker end_date" id="EndDateEdit_' + _count + '" name="EndDateEdit_' + _count + '" ></td>' +
        '<td class="col-action">' +
        '<a class="btn icon-delete btn-action-custom" onclick="DeleteRowEdit(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
        /*(_count != 0 ? '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' : "") +*/
        '</td>' +
        ' </tr>';
    $("#auditworkbodyEdit").append(table_row);
    multiselect_auditor("UsersEdit_" + _count, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectauditor.path,1);
    //$("#EndDateEdit_" + _count).bootstrapMaterialDatePicker({
    //    time: false,
    //    format: 'DD/MM/YYYY',
    //});
    //$("#StartDateEdit_" + _count).bootstrapMaterialDatePicker({
    //    time: false,
    //    format: 'DD/MM/YYYY',
    //}).on('change', function (e, date) {
    //    if ($("#EndDateEdit_" + _count).val() == undefined || moment(date._d).format('DD/MM/YYYY') > $("#EndDateEdit_" + _count).val()) {
    //        $("#EnEndDateEdit_dDate_" + _count).val(moment(date._d).format('DD/MM/YYYY'))
    //    }
    //    $("#EndDateEdit_" + _count).bootstrapMaterialDatePicker('setMinDate', date)
    //});
    var recount = 0;
    $("#auditworktableEdit > tbody > tr").each(function (i, v) {
        recount++;
    });
    $("#form-edit-audit-work").find("#NumOfAuditorEdit").val(recount);
    _count++;
}
function DeleteRow(element) {
    var $tr = $(element).closest("tr");
    $tr.remove();
    var recount = 0;
    $("#auditworktable > tbody > tr").each(function (i, v) {
        recount++;
    });
    $("#form-audit-work").find("#NumOfAuditor").val(recount);
}
function DeleteRowEdit(element) {
    var $tr = $(element).closest("tr");
    $tr.remove();
    var recount = 0;
    $("#auditworktableEdit > tbody > tr").each(function (i, v) {
        recount++;
    });
    $("#form-edit-audit-work").find("#NumOfAuditorEdit").val(recount);
}
function onSearchScope() {
    if (validateRequired('#panelSearch')) {
        var _panelSearch = $("#panelSearch");
        var obj = {
            'year': isNaN(parseInt(_panelSearch.find('#search-year').val())) ? null : parseInt(_panelSearch.find('#search-year').val()),
            'stage': isNaN(parseInt(_panelSearch.find('#search-stage').val())) ? null : parseInt(_panelSearch.find('#search-stage').val()),
            'value': isNaN(parseInt(_panelSearch.find('#search-stage_value').val())) ? null : parseInt(_panelSearch.find('#search-stage_value').val()),
            'apply_for': _panelSearch.find('#search_apply_for').val(),
            'risk_level': _panelSearch.find('#search-risk_level').val(),
            'risk_level_name': _panelSearch.find('#search-risk_level option:selected').text(),
            'keyprocess': _panelSearch.find('#QuyTrinhSearch').val(),
            'keyfacility': _panelSearch.find('#DonViSearch').val(),
            'keyactive': _panelSearch.find('#HoatDongSearch').val(),
        };
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.resultSearchScope.path,
            apiConfig.api.scoreboard.action.resultSearchScope.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccessScope');
    }
   
}
function fnSearchSuccessScope(rspn) {
    var tbBody = $('#tblRiskScore tbody');
    tbBody.html('');
    $("#tblRiskScore").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.data.length > 0) {
        var data = rspn.data;
        var applay_for = $("#panelSearch").find('#search_apply_for').val();
        if (applay_for == "") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr>' +
                    '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + viewValue(obj.apply_for) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td class="text-center">' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    '<input type="checkbox" class="form-control checkitem_temp checkitem" id="checkitem" name="checkitem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '" />' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
        else if (applay_for == "DV") {
            
            for (var i = 0; i < data.length; i++) {
                debugger
                var obj = data[i];
                var inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkitem checkDonViItem" id="checkDonViItem" name="checkDonViItem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '" />';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0) {
                    inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkDonViItem" id="checkDonViItem" name="checkDonViItem" style="margin: auto;" />';
                }
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                var html = '<tr class="' + rowCls + ' show">' +
                    '<td class="' + rowCls + '" style="text-align:center">' + btnShow + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td class="text-center">' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    inputCheck
                    //(obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0 ? '<input type="checkbox" class="form-control checkDonViItem" id="checkDonViItem" name="checkDonViItem"/>'
                    //: '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id +'"/>'
                    //) 
                    +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0)
                    html += getHtmlChildDVSearchDetail(obj.sub_activities, obj.id)
                tbBody.append(html);
            }
        }
        else if (applay_for == "HDKD") {
            for (var i = 0; i < data.length; i++) {
                debugger
                var obj = data[i];
                var inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkitem checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '" />';
                if(obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0) {
                    inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem" style="margin: auto;" />';
                }
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                var html = '<tr class="' + rowCls + ' show">' +
                    '<td class="' + rowCls + '" style="text-align:center">' + btnShow + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +

                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td class="text-center">' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    inputCheck
                    //(obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0 ? '<input type="checkbox" class="form-control checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem"/>'
                    //: '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id +'" />'
                    //)
                    +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0)
                    html += getHtmlChildHDKDSearchDetail(obj.sub_activities, obj.id)
                tbBody.append(html);
            }
        }
        else if (applay_for == "QT") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr>' +
                    '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + viewValue(obj.facility_name) + '</td>' +
                    '<td>' + viewValue(obj.activity_name) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td class="text-center">' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    '<input type="checkbox" class="form-control checkitem_temp checkitem" id="checkitem" name="checkitem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '"/>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
    }
    collapseDelegate();
}
$(document).on('click', '#checkAll', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViItem', function () {
    var table = $(this).closest("tr").next().find("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkHoatDongItem', function () {
    var table = $(this).closest("tr").next().find("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViDetailItem', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkHoatDongDetailItem', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
function addSuccessAuditWork(data) {
    //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    toastr.success(localizationResources.SaveSuccess, "Thông báo!", { progressBar: true });
    var param_version = "";

    if (data.data != undefined && data.data != null) {
        var obj = data.data
        param_version = obj.id + "_" + viewValue(obj.version);
        createdLog("Kế hoạch năm", "Tạo mới cuộc kiểm toán", param_version);
        SaveHistoryKitano(obj.id, "M_AP", "Tạo mới cuộc kiểm toán", "Tạo mới cuộc kiểm toán", viewValue(obj.version));
    }
    setTimeout(function () {
        var param = $("#formEdit").find("#IdEdit").val();
        openViewEdit(3, param);
    }, 300);

}
function updateSuccessAuditWork(data) {
    //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    toastr.success(localizationResources.SaveSuccess, "Thông báo!", { progressBar: true });
    var param_version = "";

    if (data.data != undefined && data.data != null) {
        var obj = data.data
        param_version = obj.id + "_" + viewValue(obj.version);
        createdLog("Kế hoạch năm", "Cập nhật cuộc kiểm toán ", param_version);
        SaveHistoryKitano(obj.id, "M_AP", "Cập nhật cuộc kiểm toán", "Cập nhật cuộc kiểm toán", viewValue(obj.version));
    }
    setTimeout(function () {
        var param = $("#formEdit").find("#IdEdit").val();
        openViewEdit(3, param);
    }, 300);
}
function fnEditAuditWorkSuccess(rspn) {
    var frmModify = $("#form-edit-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmModify.find("#IdWorkEdit").val(data.id);
        frmModify.find("#NameEdit").val(data.name);
        frmModify.find("#TargetEdit").val(data.target);
        frmModify.find("#StartDateEdit").val(data.start_date);
        frmModify.find("#EndDateEdit").val(data.end_date);
        frmModify.find("#NumOfWorkdaysEdit").val(data.num_of_workdays);
        frmModify.find("#NumOfAuditorEdit").val(data.num_of_auditor);
        frmModify.find("#ReqSkillForAuditEdit").val(data.req_skill_audit);
        frmModify.find("#ReqOutsourcingEdit").val(data.req_outsourcing);
        frmModify.find("#ReqOtherEdit").val(data.req_other);
        frmModify.find("#ScaleOfAuditEdit").val(data.scale_of_audit).change();
        frmModify.find("#ScopeEdit").val(data.audit_scope);
        frmModify.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
            
            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += "<div>";
                _append_data += '<a href="javascript:DownloadFile(' + obj.id + ');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefile(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += "</div>";
            }
            frmModify.find("#FileDetail").append(_append_data);
        }
        if (data.str_person_in_charge != undefined && data.str_person_in_charge != null && data.str_person_in_charge != "") {
            var value = data.str_person_in_charge;
            var newOption = new Option(value.split(':')[1], value.split(':')[0], true, true);
            frmModify.find("#PersonInChargeEdit").append(newOption).trigger('change');
        }
        _count = 0;
        setTimeout(function () {
            multiselect("PersonInChargeEdit", "Chọn người phụ trách..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
        }, 100);
        var tbBody = $("#auditworkbodyEdit");
        $("#auditworktableEdit").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.listauditor.length; i++) {
            var obj = data.listauditor[i];
            var table_row = "";
            table_row += '<tr> ' +
                ' <td><select class="form-control usersid" id="UsersEdit_' + i + '" name="UsersEdit_' + i + '" style="padding:0;"></td>' +
                ' <td><input type="date" class="form-control picker start_date" id="StartDateEdit_' + i + '" name="StartDateEdit_' + i + '" value="' + obj.start_date + '"></td>' +
                ' <td><input type="date" class="form-control picker end_date" id="EndDateEdit_' + i + '" name="EndDateEdit_' + i + '" value="' + obj.end_date + '"></td>' +
                '<td class="col-action">' +
                '<a class="btn icon-delete btn-action-custom" onclick="DeleteRowEdit(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                ' </tr>';
            tbBody.append(table_row);
            multiselect("UsersEdit_" + i, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
            //$("#EndDateEdit_" + i).bootstrapMaterialDatePicker({
            //    time: false,
            //    format: 'DD/MM/YYYY',
            //});
            //$("#StartDateEdit_" + i).bootstrapMaterialDatePicker({
            //    time: false,
            //    format: 'DD/MM/YYYY',
            //}).on('change', function (e, date) {
            //    if ($("#EndDateEdit_" + i).val() == undefined || moment(date._d).format('DD/MM/YYYY') > $("#EndDateEdit_" + _count).val()) {
            //        $("#EndDateEdit_" + i).val(moment(date._d).format('DD/MM/YYYY'))
            //    }
            //    $("#EndDateEdit_" + i).bootstrapMaterialDatePicker('setMinDate', date)
            //});

            var _value = obj.auditor;
            var _newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmModify.find("#UsersEdit_" + i).append(_newOption).trigger('change');
            _count = i;
            _count++;
        }
        var _tbBody = $('#auditscopeEdit tbody');
        $("#auditscopeEdit").dataTable().fnDestroy();
        _tbBody.html("");
        var html = '';
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            var _data = data.listauditworkscope;
            html += getHtmlGetDetailNoTree(_data, 1);
            _tbBody.append(html);
        }


        var _tbBody_dv = $('#auditscopeFacilityEdit tbody');
        $("#auditscopeFacilityEdit").dataTable().fnDestroy();
        _tbBody_dv.html("");
        var html_dv = '';
        if (data.listauditworkscopefacility !== undefined && data.listauditworkscopefacility !== null) {
            var _data_dv = data.listauditworkscopefacility;
            for (var i = 0; i < _data_dv.length; i++) {
                var obj = _data_dv[i];
                html_dv += '<tr>' +
                    '<td style="text-align:center;width: 8%">' + (i + 1) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.board_id) + '"  /><input type="hidden" class="facility" value="' + viewValue(obj.auditfacilities_id) + '"/>' + viewValue(obj.auditfacilities_name) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.reason) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.risk_rating_name) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.auditing_time_nearest) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteFacilityScope(\'' + obj.auditfacilities_name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
            }
            //html_dv += getHtmlGetDetailNoTree(_data_dv, 1);
            _tbBody_dv.append(html_dv);
        }
    }
}
function fnGetDetailAuditWorkSuccess(rspn) {
    var frmDetail = $("#form-detail-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetail.find("#IdWorkDetail").val(data.id);
        frmDetail.find("#NameDetail").val(data.name);
        frmDetail.find("#TargetDetail").val(data.target);
        frmDetail.find("#StartDateDetail").val(data.start_date);
        frmDetail.find("#EndDateDetail").val(data.end_date);
        frmDetail.find("#NumOfWorkdaysDetail").val(data.num_of_workdays);
        frmDetail.find("#NumOfAuditorDetail").val(data.num_of_auditor);
        frmDetail.find("#ReqSkillForAuditDetail").val(data.req_skill_audit);
        frmDetail.find("#ReqOutsourcingDetail").val(data.req_outsourcing);
        frmDetail.find("#ReqOtherDetail").val(data.req_other);
        frmDetail.find("#ScaleOfAuditDetail").val(data.scale_of_audit).change();
        frmDetail.find("#ScopeDetail").val(data.audit_scope);
        frmDetail.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
          
            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFile(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#FileDetail").append(_append_data);
        }
        if (data.str_person_in_charge != undefined && data.str_person_in_charge != null && data.str_person_in_charge != "") {
            var value = data.str_person_in_charge;
            frmDetail.find("#PersonInChargeDetail").val(value.split(':')[1]);
        }
        var tbBody = $("#auditworkbodyDetail");
        $("#auditworktableDetail").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.listauditor.length; i++) {
            var obj = data.listauditor[i];
            var table_row = "";
            table_row += '<tr> ' +
                ' <td><input class="form-control usersid" id="UsersDetail_' + i + '" name="UsersDetail_' + i + '" style="padding:5;"></td>' +
                ' <td><input type="date" class="form-control" value="' + obj.start_date + '"></td>' +
                ' <td><input type="date" class="form-control" value="' + obj.end_date + '"></td>' +
                ' </tr>';
            tbBody.append(table_row);
            var _value = obj.auditor;
            frmDetail.find("#UsersDetail_" + i).val(_value.split(':')[1]);
        }

        var _tbBody = $('#auditscopeDetail tbody');
        $("#auditscopeDetail").dataTable().fnDestroy();
        _tbBody.html("");
        var html = '';
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            var _data = data.listauditworkscope;
            html += getHtmlGetDetailNoTree(_data, 0);
            _tbBody.append(html);
        }
        var _tbBody_dv = $('#auditscopeFacilityDetail tbody');
        $("#auditscopeFacilityDetail").dataTable().fnDestroy();
        _tbBody_dv.html("");
        var html_dv = '';
        if (data.listauditworkscopefacility !== undefined && data.listauditworkscopefacility !== null) {
            var _data_dv = data.listauditworkscopefacility;
            for (var i = 0; i < _data_dv.length; i++) {
                var obj = _data_dv[i];
                html_dv += '<tr>' +
                    '<td style="text-align:center;width: 8%">' + (i + 1) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.board_id) + '"  /><input type="hidden" class="facility" value="' + viewValue(obj.auditfacilities_id) + '"/>' + viewValue(obj.auditfacilities_name) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.reason) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.risk_rating_name) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.auditing_time_nearest) + '</td>' +
                    '</tr>';
            }
            //html_dv += getHtmlGetDetailNoTree(_data_dv, 1);
            _tbBody_dv.append(html_dv);
        }
    }
    $("input").prop("readonly", true);
    $("select").prop("disabled", true);
    $("textarea").prop("readonly", true)
}
var validateform;
var validateformEdit;
var validator_;
var validator__;
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#form-audit-work").validate({
        rules: {
            Name: { required: true, minlength: 2},
            Target: { required: true, minlength: 2},
            StartDate: { required: true },
            EndDate: { required: true },
            PersonInCharge: { required: true, minlength: 1 },
            NumOfAuditor: { required: true },
            Scope: { required: true },
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "PersonInCharge") {
                error.insertAfter(element.next());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function () {
            var check = false;
            var start_ = $("#form-audit-work").find('#StartDate').val();
            var end_ = $("#form-audit-work").find('#EndDate').val();
            var start = start_ != undefined && start_ != "" ? new Date(start_) : null;
            var end = end_ != undefined && end_ != "" ? new Date(end_) : null;
            if (start > end) {
                //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            var list_asign = [];
            $("#auditworktable > tbody > tr").each(function (i, v) {
                var _user = $(v).find(".usersid").val();
                if (_user == undefined || _user == null) {
                    //swal("Error!", "Nnân sự không được để trống!", "error");
                    toastr.error("Nnân sự không được để trống!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                var start__ = $(v).find(".start_date").val();
                var end__ = $(v).find(".end_date").val();
                var _start = start__ != undefined && start__ != "" ? new Date(start__) : null;
                var _end = end__ != undefined && end__ != "" ? new Date(end__) : null;
                if (start > _start) {
                    //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày bắt đầu phân công!", "error");
                    toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày bắt đầu phân công!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (_start > _end) {
                    //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                    toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (_end > end) {
                    //swal("Error!", "Ngày kết thúc phân công phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                    toastr.error("Ngày kết thúc phân công phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                var asign_item = {
                    user_id: $(v).find(".usersid").val(),
                    full_name: $(v).find(".usersid").text(),
                    start_date: $(v).find(".start_date").val(),
                    end_date: $(v).find(".end_date").val(),
                }
                list_asign.push(asign_item);
            });
            var list_scope = [];
            $("#auditscope > tbody > tr").each(function (i, v) {
                var scope_item = {
                    board_id: $(v).find(".board_id").val(),
                    auditprocess_id: $(v).find(".process").val(),
                    auditprocess_name: $(v).find(".process").data("text"),
                    bussinessactivities_id: $(v).find(".activity").val(),
                    bussinessactivities_name: $(v).find(".activity").data("text"),
                    auditfacilities_id: $(v).find(".facility").val(),
                    auditfacilities_name: $(v).find(".facility").data("text"),
                    risk_rating_name: $(v).find(".risk_level").val(),
                    reason: $(v).find(".audit_reason").val(),
                    auditing_time_nearest: $(v).find(".last_audit").val(),
                }
                list_scope.push(scope_item);
            });
            var list_scope_dv = [];
            $("#auditscopeFacility > tbody > tr").each(function (i, v) {
                var scope_item = {
                    board_id: $(v).find(".board_id").val(),
                    auditfacilities_id: $(v).find(".facility").val(),
                    auditfacilities_name: $(v).find(".facility").data("text"),
                    risk_rating_name: $(v).find(".risk_level").val(),
                    reason: $(v).find(".audit_reason").val(),
                    auditing_time_nearest: $(v).find(".last_audit").val(),
                }
                list_scope_dv.push(scope_item);
            });
            var _id = $("#form-audit-work").find('#Id').val();
            var obj = {
                'id': _id,
                'auditplan_id': $("#formEdit").find("#IdEdit").val(),
                'year_plan': $("#formEdit").find("#PlanYear").val(),
                'name': $("#form-audit-work").find('#Name').val().trim(),
                'target': $("#form-audit-work").find('#Target').val().trim(),
                'start_date': $("#form-audit-work").find('#StartDate').val(),
                'end_date': $("#form-audit-work").find('#EndDate').val(),
                'num_of_workdays': $("#form-audit-work").find("#NumOfWorkdays").val(),
                'person_in_charge': $("#form-audit-work").find('#PersonInCharge').val(),
                'num_of_auditor': $("#form-audit-work").find("#NumOfAuditor").val(),
                'req_skill_audit': $("#form-audit-work").find("#ReqSkillForAudit").val().trim(),
                'req_outsourcing': $("#form-audit-work").find("#ReqOutsourcing").val().trim(),
                'req_other': $("#form-audit-work").find("#ReqOther").val().trim(),
                'scale_of_audit': $("#form-audit-work").find("#ScaleOfAudit").val(),
                'audit_scope': $("#form-audit-work").find("#Scope").val().trim(),
                "list_assign": list_asign,
                "list_scope": list_scope,
                "list_scope_facility": list_scope_dv,
            }
            var formData = new FormData();
            formData.append("data", JSON.stringify(obj));

            var input = document.getElementById('FileDinhKem');
            var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
            if (input.files) {

                $.each(input.files, function (i, v) {
                    var imageFile = v;
                    var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                    if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                        //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                        toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    if (checkFilesize(imageFile) == true) {
                        //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                        toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    formData.append("fileUpload[" + i + "]", imageFile);
                })
            }
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditwork.controller,
                    apiConfig.api.auditwork.action.add.path,
                    formData, 'addSuccessAuditWork', 'updateFail');
            }
        }
    });
    validateformEdit = $("#form-edit-audit-work").validate({
        rules: {
            NameEdit: { required: true, minlength: 2},
            TargetEdit: { required: true, minlength: 2},
            StartDateEdit: { required: true },
            EndDateEdit: { required: true },
            PersonInChargeEdit: { required: true },
            NumOfAuditorEdit: { required: true },
            ScopeEdit: { required: true },
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "PersonInChargeEdit") {
                error.insertAfter(element.next());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function () {
            var check = false;
            var start_ = $("#form-edit-audit-work").find('#StartDateEdit').val();
            var end_ = $("#form-edit-audit-work").find('#EndDateEdit').val();
            var start = start_ != undefined && start_ != "" ? new Date(start_) : null;
            var end = end_ != undefined && end_ != "" ? new Date(end_) : null;
            if (start > end) {
                //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            var list_asign = [];
            $("#auditworktableEdit > tbody > tr").each(function (i, v) {
                var _user = $(v).find(".usersid").val();
                if (_user == undefined || _user == null) {
                    //swal("Error!", "Nnân sự không được để trống!", "error");
                    toastr.error("Nnân sự không được để trống!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                var start__ = $(v).find(".start_date").val();
                var end__ = $(v).find(".end_date").val();
                var _start = start__ != undefined && start__ != "" ? new Date(start__) : null;
                var _end = end__ != undefined && end__ != "" ? new Date(end__) : null;
                if (start > _start) {
                    //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày bắt đầu phân công!", "error");
                    toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày bắt đầu phân công!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (_start > _end) {
                    //swal("Error!", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                    toastr.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (_end > end) {
                    //swal("Error!", "Ngày kết thúc phân công phải nhỏ hơn hoặc bằng ngày kết thúc!", "error");
                    toastr.error("Ngày kết thúc phân công phải nhỏ hơn hoặc bằng ngày kết thúc!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                var asign_item = {
                    user_id: $(v).find(".usersid").val(),
                    full_name: $(v).find(".usersid").text(),
                    start_date: $(v).find(".start_date").val(),
                    end_date: $(v).find(".end_date").val(),
                }
                list_asign.push(asign_item);
            });
            var list_scope = [];
            $("#auditscopeEdit > tbody > tr.rowedit").each(function (i, v) {
                var scope_item = {
                    board_id: $(v).find(".board_id").val(),
                    auditprocess_id: $(v).find(".process").val(),
                    auditprocess_name: String($(v).find(".process").data("text")),
                    bussinessactivities_id: $(v).find(".activity").val(),
                    bussinessactivities_name: String($(v).find(".activity").data("text")),
                    auditfacilities_id: $(v).find(".facility").val(),
                    auditfacilities_name: String($(v).find(".facility").data("text")),
                    risk_rating_name: $(v).find(".risk_level").val(),
                    reason: $(v).find(".audit_reason").val(),
                    auditing_time_nearest: $(v).find(".last_audit").val(),
                }
                list_scope.push(scope_item);
            });
            var list_scope_dv = [];
            $("#auditscopeFacilityEdit > tbody > tr.rowedit").each(function (i, v) {
                var scope_item = {
                    board_id: $(v).find(".board_id").val(),                 
                    auditfacilities_id: $(v).find(".facility").val(),
                    auditfacilities_name: String($(v).find(".facility").data("text")),
                    risk_rating_name: $(v).find(".risk_level").val(),
                    reason: $(v).find(".audit_reason").val(),
                    auditing_time_nearest: $(v).find(".last_audit").val(),
                }
                list_scope_dv.push(scope_item);
            });

            var _id = $("#form-edit-audit-work").find('#IdWorkEdit').val();
            var obj = {
                'id': _id,
                'auditplan_id': $("#formEdit").find("#IdEdit").val(),
                'year_plan': $("#formEdit").find("#PlanYear").val(),
                'name': $("#form-edit-audit-work").find('#NameEdit').val().trim(),
                'target': $("#form-edit-audit-work").find('#TargetEdit').val().trim(),
                'start_date': $("#form-edit-audit-work").find('#StartDateEdit').val(),
                'end_date': $("#form-edit-audit-work").find('#EndDateEdit').val(),
                'num_of_workdays': $("#form-edit-audit-work").find("#NumOfWorkdaysEdit").val(),
                'person_in_charge': $("#form-edit-audit-work").find('#PersonInChargeEdit').val(),
                'num_of_auditor': $("#form-edit-audit-work").find("#NumOfAuditorEdit").val(),
                'req_skill_audit': $("#form-edit-audit-work").find("#ReqSkillForAuditEdit").val().trim(),
                'req_outsourcing': $("#form-edit-audit-work").find("#ReqOutsourcingEdit").val().trim(),
                'req_other': $("#form-edit-audit-work").find("#ReqOtherEdit").val().trim(),
                'scale_of_audit': $("#form-edit-audit-work").find("#ScaleOfAuditEdit").val(),
                'audit_scope': $("#form-edit-audit-work").find("#ScopeEdit").val().trim(),
                "list_assign": list_asign,
                "list_scope": list_scope,
                "list_scope_facility": list_scope_dv,
            }
            var formData = new FormData();
            formData.append("data", JSON.stringify(obj));

            var input = document.getElementById('FileDinhKemEdit');
            var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
            if (input.files) {

                $.each(input.files, function (i, v) {
                    var imageFile = v;
                    var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                    if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                        //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                        toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    if (checkFilesize(imageFile) == true) {
                        //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                        toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    formData.append("fileUpload[" + i + "]", imageFile);
                })
            }
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditwork.controller,
                    apiConfig.api.auditwork.action.update.path,
                    formData, 'updateSuccessAuditWork', 'updateFail');
            }

        }
    });

    validateformAddScope = $("#formAddScope").validate({
        submitHandler: function () {

            var list_asign = [];
            $('#tblRiskScore tbody td .checkitem:checked').each(function (i, v) {
                var lst_item = {
                    'select_id': $(v).val(),
                    'main_id': $(v).data("mainid"),
                    'apply_for': $("#search_apply_for").val(),
                    'year': $("#search-year").val(),
                }
                list_asign.push(lst_item);
            });
            var obj = {
                'list_asign': list_asign,
            }
            //var listassign = list_asign.join();
            callApi(
                apiConfig.api.scoreboard.controller,
                apiConfig.api.scoreboard.action.getDataScopeResult.path,
                apiConfig.api.scoreboard.action.getDataScopeResult.method,
                obj, 'fnAddScope');
        }
    });
    $('#modelRequestApprove').on('show.bs.modal', function (event) {
        validator_.resetForm();
        //var button = $(event.relatedTarget);
        var id = $("#formDetail").find("#IdDetail").val();
        var name = $("#formDetail").find("#nameDetail").val();
        //var id = button.data('id');
        //var name = button.data('name');
        var modal = $(this);
        modal.find('#auditplanid').val(id);
        modal.find('#auditplanname').val(name);
        multiselect("AprovalUser", "Chọn người duyệt...", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
    });
    //validator_ = $("#frmRequestApprove").validate({
    //    rules: {
    //        AprovalUser: { required: true },
    //    },
    //    submitHandler: function () {
    //        var id = $("#frmRequestApprove").find("#auditplanid").val();
    //        var approvaluser = $("#frmRequestApprove").find("#AprovalUser").val();
    //        var obj = {
    //            'auditplanid': id,
    //            'approvaluser': approvaluser,
    //        }
    //        callApi_auditservice(
    //            apiConfig.api.auditplan.controller,
    //            apiConfig.api.auditplan.action.requestapproval.path,
    //            apiConfig.api.auditplan.action.requestapproval.method,
    //            obj, 'fnRequestApprovalSuccess', 'msgError');
    //    }
    //});
    validator_ = $("#frmRequestApprove").validate({
        rules: {
            AprovalUser: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmRequestApprove").find("#auditplanid").val();
            var approvaluser = $("#frmRequestApprove").find("#AprovalUser").val();
            var obj = {
                'item_id': id,
                'approvaluser': approvaluser,
                'function_name': "Kế hoạch kiểm toán năm",
                'function_code': "M_AP",
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.requestapproval.path,
                apiConfig.api.approvalfunction.action.requestapproval.method,
                obj, 'fnRequestApprovalSuccess');
        }
    });
    $('#modelRejectApprove').on('show.bs.modal', function (event) {
        validator__.resetForm();
        var button = $(event.relatedTarget);
        var id = $("#formDetail").find("#IdDetail").val();
        var name = $("#formDetail").find("#nameDetail").val();
        var modal = $(this);
        modal.find('#auditplanid').val(id);
        modal.find('#auditplanname').val(name);
    });
    //validator__ = $("#frmRejectApprove").validate({
    //    rules: {
    //        reasonnote: { required: true }
    //    },
    //    submitHandler: function () {
    //        var id = $("#frmRejectApprove").find("#auditplanid").val();
    //        var reasonnote = $("#frmRejectApprove").find("#reasonnote").val();
    //        var obj = {
    //            'auditplanid': id,
    //            'reason_note': reasonnote,
    //        }
    //        callApi_auditservice(
    //            apiConfig.api.auditplan.controller,
    //            apiConfig.api.auditplan.action.rejectapproval.path,
    //            apiConfig.api.auditplan.action.rejectapproval.method,
    //            obj, 'fnRejectApprovalSuccess', 'msgError');
    //    }
    //});
    validator__ = $("#frmRejectApprove").validate({
        rules: {
            reasonnote: { required: true }
        },
        submitHandler: function () {
            var id = $("#frmRejectApprove").find("#auditplanid").val();
            var reasonnote = $("#frmRejectApprove").find("#reasonnote").val();
            var obj = {
                'item_id': id,
                'function_name': "Kế hoạch kiểm toán năm",
                'function_code': "M_AP",
                'reason_note': reasonnote,
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.rejectapproval.path,
                apiConfig.api.approvalfunction.action.rejectapproval.method,
                obj, 'fnRejectApprovalSuccess');
        }
    });
   
    $("#formCreate").validate({
        rules: {
            yearCreate: { required: true },
            nameCreate: { required: true, minlength: 2 },
        },
        submitHandler: function () {
            var obj = {
                'name': $("#formCreate").find('#nameCreate').val().trim(),
                'year': $("#formCreate").find('#yearCreate').val(),
            }
            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.add.path,
                apiConfig.api.auditplan.action.add.method,
                obj, 'createAuditPlanSuccess', 'msgError');
        }
    });
    //$("#formEdit").validate({
    //    rules: {
    //        yearEdit: { required: true },
    //        nameEdit: { required: true, minlength: 2 },
    //        targetEdit: { required: true },
    //    },
    //    submitHandler: function () {
    //        var other_info = CKEDITOR.instances["OtherInformationEdit"].getData();
    //        if (other_info != undefined && other_info != '') {
    //            other_info = $.trim(other_info);
    //        }
    //        var obj = {
    //            'id': $("#formEdit").find('#IdEdit').val(),
    //            'name': $("#formEdit").find('#nameEdit').val().trim(),
    //            'year': $("#formEdit").find('#yearEdit').val(),
    //            'note': $("#formEdit").find('#noteEdit').val().trim(),
    //            'target': $("#formEdit").find('#targetEdit').val().trim(),
    //            'status_code': $("#formEdit").find('#statusCodeEdit').val(),
    //            'other_info': other_info,
    //        }
    //        callApi_auditservice(
    //            apiConfig.api.auditplan.controller,
    //            apiConfig.api.auditplan.action.update.path,
    //            apiConfig.api.auditplan.action.update.method,
    //            obj, 'updateAuditPlanSuccess', 'msgError');
    //    }
    //});
    $("#formEdit").validate({
        rules: {
            yearEdit: { required: true },
            nameEdit: { required: true, minlength: 2 },
            //targetEdit: { required: true },
        },
        submitHandler: function () {
            var check = false;
            var other_info = CKEDITOR.instances["OtherInformationEdit"].getData();
            if (other_info != undefined && other_info != '') {
                other_info = $.trim(other_info);
            }
            var obj = {
                'id': $("#formEdit").find('#IdEdit').val(),
                'name': $("#formEdit").find('#nameEdit').val().trim(),
                'year': $("#formEdit").find('#yearEdit').val(),
                'note': $("#formEdit").find('#noteEdit').val().trim(),
                'target': $("#formEdit").find('#targetEdit').val().trim(),
                'status_code': $("#formEdit").find('#statusCodeEdit').val(),
                'other_info': other_info,
            }
            var formData = new FormData();
            formData.append("data", JSON.stringify(obj));

            var input = document.getElementById('FileDinhKemPlan');
            var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
            if (input.files) {
                $.each(input.files, function (i, v) {
                    var imageFile = v;
                    var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                    if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                        //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                        toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    if (checkFilesize(imageFile) == true) {
                        //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                        toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                        check = true;
                        return false;
                    }
                    formData.append("fileUpload[" + i + "]", imageFile);
                })
            }
            if (!check) {
                callApi_auditservice_update(
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.updateplan.path,
                    formData, 'updateAuditPlanSuccess', 'msgError');
            }

        }
    });
});
function CallAddAuditWork() {
    var id = $("#formEdit").find("#IdEdit").val();
    openView(5, id);
    LoadAuditWWork();
    document.getElementById("form-audit-work").reset();
    validateform.resetForm();
    $("#PersonInCharge").val("").change();
    var tbBody = $('#auditscope tbody');
    $("#auditscope").dataTable().fnDestroy();
    tbBody.html("");

    var _tbBody = $('#auditscopeFacility tbody');
    $("#auditscopeFacility").dataTable().fnDestroy();
    _tbBody.html("");
}
function fnAddScope(rspn) {
    var _type = $("#formAddScope").find("#DoAction").val();
    if (_type == "0") {
        var tbBody = $('#auditscope tbody');
        $("#auditscope").dataTable().fnDestroy();
        var html = '';

        var tbBody_facility = $('#auditscopeFacility tbody');
        $("#auditscopeFacility").dataTable().fnDestroy();
        var html_facility = '';
        if (rspn !== undefined && rspn !== null && rspn.code === '1') {
            var data = rspn.data;
            html += getHtmlScopeNoTree(data);
            tbBody.append(html);

            var data_facility = rspn.data_facility;
            for (var i = 0; i < data_facility.length; i++) {
                var obj = data_facility[i];
                var check = true;
                var last_audit_time;
                if (obj.last_audit_time) {
                    last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
                }
                $("#auditscopeFacility > tbody > tr").each(function (i, v) {
                    if ($(v).find(".facility").val() == obj.facility_id) {
                        check = false;
                    }
                })
                if (check == true) {
                    html_facility += '<tr>' +
                        '<td style="text-align:center;width: 8%">' + (i + 1) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                        '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                        '<td class="col-action" style="width: 5% !important;">' +
                        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScopeFacility(this,0)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                        '</td>' +
                        '</tr>';
                }
            }
            tbBody_facility.append(html_facility);
        }
        var t = $("#auditscope").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
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
                cell.innerHTML = i + 1;
            });
        }).draw();
        callBackView(5);
    }
    else {
        var tbBody = $('#auditscopeEdit tbody');
        $("#auditscopeEdit").dataTable().fnDestroy();
        var html = '';
        //---------------------------
        var tbBody_facility = $('#auditscopeFacilityEdit tbody');
        $("#auditscopeFacilityEdit").dataTable().fnDestroy();
        var html_facility = '';
        if (rspn !== undefined && rspn !== null && rspn.code === '1') {
            var data = rspn.data;
            html += getHtmlEditScopeNoTree(data);
            tbBody.append(html);
            //---------------------------
            var data_facility = rspn.data_facility;
            for (var i = 0; i < data_facility.length; i++) {
                var obj = data_facility[i];
                var check = true;
                var last_audit_time;
                if (obj.last_audit_time) {
                    last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
                }
                $("#auditscopeFacilityEdit > tbody > tr").each(function (i, v) {
                    if ($(v).find(".facility").val() == obj.facility_id) {
                        check = false;
                    }
                })
                if (check == true) {
                    html_facility += '<tr class="rowedit" >' +
                        '<td style="text-align:center;width: 8%">' + (i+1) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>'+
                        '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                        '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                        '<td class="col-action" style="width: 5% !important;">' +
                        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScopeFacility(this,1)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                        '</td>' +
                        '</tr>';
                }
            }
            tbBody_facility.append(html_facility);
        }
        var tt = $("#auditscopeEdit").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        tt.on('order.dt search.dt', function () {
            tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
       
        callBackView(6);
    }

}
function DeleteRowScope(element, num) {
    var $tr = $(element).closest("tr");
    var facility_id = $tr.find(".facility").val();
    if (num == 0) {
        $("#auditscope").dataTable().fnDestroy();
        var t = $("#auditscope").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
        });
        t.row($tr).remove().draw(true);
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        var check_all = true;
        $("#auditscope > tbody > tr").each(function (i, v) {
            var _facility_id = $(v).find(".facility").val();
            if (facility_id == _facility_id) {
                check_all = false;
            }
        })
        if (check_all) {
            $("#auditscopeFacility").dataTable().fnDestroy();
            var _t = $("#auditscopeFacility").DataTable({
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                //"scrollX": true,
                "columnDefs": [{
                    "targets": [0, 1, 2, 3, 4, 5],
                    "searchable": false,
                    "orderable": false
                }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            $("#auditscopeFacility > tbody > tr").each(function (i, v) {
                var __facility_id = $(v).find(".facility").val();
                if (facility_id == __facility_id) {
                    _t.row(v).remove().draw(true);
                    _t.on('order.dt search.dt', function () {
                        _t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }).draw();
                }
            })
        }
    }
    else if (num == 1) {
        $("#auditscopeEdit").dataTable().fnDestroy();
        var tt = $("#auditscopeEdit").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        tt.row($tr).remove().draw(true);
        tt.on('order.dt search.dt', function () {
            tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        var _check_all = true;
        $("#auditscopeEdit > tbody > tr").each(function (i, v) {
            var _facility_id = $(v).find(".facility").val();
            if (facility_id == _facility_id) {
                _check_all = false;
            }
        })
        if (_check_all) {
            $("#auditscopeFacilityEdit").dataTable().fnDestroy();
            var _tt = $("#auditscopeFacilityEdit").DataTable({
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                //"scrollX": true,
                "columnDefs": [{
                    "targets": [0, 1, 2, 3, 4, 5],
                    "searchable": false,
                    "orderable": false
                }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            $("#auditscopeFacilityEdit > tbody > tr").each(function (i, v) {
                var __facility_id = $(v).find(".facility").val();
                if (facility_id == __facility_id) {
                    _tt.row(v).remove().draw(true);
                    _tt.on('order.dt search.dt', function () {
                        _tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }).draw();
                }
            })
        }
    }
    $.each($('.tooltip'), function (index, element) {
        $(this).remove();
    });
}
function DeleteRowScopeFacility(element, num) {
    var $tr = $(element).closest("tr");
    var facility_id = $tr.find(".facility").val();
    if (num == 0) {
        $("#auditscopeFacility").dataTable().fnDestroy();
        var t = $("#auditscopeFacility").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0,1,2,3,4,5],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
        });
        t.row($tr).remove().draw(true);
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();


        $("#auditscope").dataTable().fnDestroy();
        var _t = $("#auditscope").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
        });
        $("#auditscope > tbody > tr").each(function (i, v) {
            var _facility_id = $(v).find(".facility").val();
            if (facility_id == _facility_id) {
                _t.row(v).remove().draw(true);
                _t.on('order.dt search.dt', function () {
                    _t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();
            }
        })
    }
    else if (num == 1) {
        $("#auditscopeFacilityEdit").dataTable().fnDestroy();
        var tt = $("#auditscopeFacilityEdit").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 1, 2, 3, 4, 5],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        tt.row($tr).remove().draw(true);
        tt.on('order.dt search.dt', function () {
            tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        $("#auditscopeEdit").dataTable().fnDestroy();
        var _tt = $("#auditscopeEdit").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0, 4, 7],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        $("#auditscopeEdit > tbody > tr.rowedit").each(function (i, v) {
            var _facility_id = $(v).find(".facility").val();
            if (facility_id == _facility_id) {
                _tt.row(v).remove().draw(true);
                _tt.on('order.dt search.dt', function () {
                    _tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();
            }
        })

    }
    $.each($('.tooltip'), function (index, element) {
        $(this).remove();
    });
}

function frmChangeStatus(id) {
    $('#frmChangeStatus').find("#IdAuditPlan").val(id);
}

function updateChangeStatus() {
    var obj = {
        'id': $("#IdAuditPlan").val(),
        'status': $("#StatusChange").val(),
        'browsedate': $("#DateChangeStatus").val(),
    }
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));

    var isStatus = $("#StatusChange").val();
    if (isStatus == 3) {
        var input = document.getElementById('FileChangeStatus');
        var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
        if (input.files) {
            $.each(input.files, function (i, v) {
                var imageFile = v;
                var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                    toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                    return false;
                }
                if (checkFilesize(imageFile) == true) {
                    //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
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
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.aditupdatestatus.path,
                    formData, 'ChangeStatusAuditPlanSuccess', 'msgError');
            }
        }
        else {
            callApi_auditservice_update(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.aditupdatestatus.path,
                formData, 'ChangeStatusAuditPlanSuccess', 'msgError');
        }
       
    }
}
function ChangeStatusAuditPlanSuccess(res) {
    if (res.code === '1') {
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", { progressBar: true });
        $('#modalChangeStatus').modal('hide');
        setTimeout(function () {
            window.location.href = "/AuditPlan"
        }, 2000);
    }
    else {
        //swal("Error!", "Cập nhật thất bại!", "error");
        toastr.error("Cập nhật dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}
function showFileUpload() {
    var _file = $("#frmChangeStatus #fileUpload");
    _file.html('');
    if ($('#StatusChange').val() == 3) {
        $('#fileUpload').show();
        var html =
            '<label for="FileChangeStatus" class="col-form-label">' + "File đính kèm" + '</label>' +
            '<input type="file" class="form-control required" id="FileChangeStatus" />';
        _file.append(html);
    } else {
        $('#fileUpload').hide();
        _file.html('');
    }
}
function DownloadFile(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditwork.controller + '/DownloadAttach?id=' + id, 'Download');
}
function DownloadFilePlan(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + '/DownloadAttach?id=' + id, 'Download');
}
function Export2() {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.exportexcel.path + "/" + id,
        apiConfig.api.auditplan.action.exportexcel.method,
        null, 'fnExportExcelSuccess');
}
function fnExportExcelSuccess(rspn) {
    if (rspn.data != undefined && rspn.data != null && rspn.data != "") {
        var bin = atob(rspn.data);
        var ab = s2ab(bin); // 
        var blob = new Blob([ab], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = rspn.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
function Export() {
    var id = $("#formEdit").find("#IdEdit").val();
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportexcel.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Ke_hoach_kiem_toan_nam.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu!", "Lỗi!", { progressBar: true });
            //notify.alert("Không tìm thấy dữ liệu", 'ERROR', TITLE_STATUS_DANGER);
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra!", "Lỗi!", { progressBar: true });
            //notify.alert("Có lỗi xảy ra", 'ERROR', TITLE_STATUS_DANGER);
        }
    }
    request.send();
}
function ExportWord() {
    var id = $("#formEdit").find("#IdEdit").val();
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportwordplan.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Ke_hoach_kiem_toan_nam.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu!", "Lỗi!", { progressBar: true });
            //notify.alert("Không tìm thấy dữ liệu", 'ERROR', TITLE_STATUS_DANGER);
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra!", "Lỗi!", { progressBar: true });
            //notify.alert("Có lỗi xảy ra", 'ERROR', TITLE_STATUS_DANGER);
        }
    }
    request.send();
}
function ExportInlist(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportwordplan.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Ke_hoach_kiem_toan_nam.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu!", "Lỗi!", { progressBar: true });
            //notify.alert("Không tìm thấy dữ liệu", 'ERROR', TITLE_STATUS_DANGER);
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra!", "Lỗi!", { progressBar: true });
            //notify.alert("Có lỗi xảy ra", 'ERROR', TITLE_STATUS_DANGER);
        }
    }
    request.send();
}
function deletefile(id) {
    swal({
        title: localizationResources.Confirm,
        text: "Bạn có chắc chắn muốn xóa file!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteFileScope(id);
        }
    });
}
function fnDeleteFileScope(id) {
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.deletefile.path + "/" + id,
        apiConfig.api.auditwork.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}
function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        var param = $("#form-edit-audit-work").find("#IdWorkEdit").val();
        fnGetAuditWorkDetail(6, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}

function DeleteFacilityScope(_name,id) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + _name + "!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteFacilityScope(id);
        }
    });
}
function fnDeleteFacilityScope(id) {
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.deletefacilityscope.path + "/" + id,
        apiConfig.api.auditwork.action.deletefacilityscope.method,
        null, 'fnDeleteFacilityScopeSuccess', 'msgError');
}
function fnDeleteFacilityScopeSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        var param = $("#form-edit-audit-work").find("#IdWorkEdit").val();
        fnGetAuditWorkDetail(6, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}

window.onload = function () {
    let checkLocalStatus = localStorage.getItem('status');
    if (checkLocalStatus == null) {
        localStorage.setItem('status', "1");
    }
    let checkLocalType = localStorage.getItem('type');
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem('id');
    let id = parseInt(checkLocalId);
    let LocalstrHeader = localStorage.getItem('strHeader');
    if ((checkLocalType === null || checkLocalType === "") && checkLocalId === null) {
        type = 0;
        id = 0;
        LocalstrHeader = '';
    }
    setTimeout(function () {
        openView(type, id, LocalstrHeader);
        //$("#StartDate , #EndDate").bootstrapMaterialDatePicker({
        //    time: false,
        //    format: 'DD/MM/YYYY',
        //});
    }, 100);
}
function deletefilePlan(id) {
    swal({
        title: localizationResources.Confirm,
        text: "Bạn có chắc chắn muốn xóa file!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteFilePlan(id);
        }
    });
}
function fnDeleteFilePlan(id) {
    debugger
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.deletefileattach.path + "/" + id,
        apiConfig.api.approvalfunction.action.deletefileattach.method,
        null, 'fnDeleteFilePlanSuccess');
}
function fnDeleteFilePlanSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        setTimeout(function () {
            var param = $("#formEdit").find("#IdEdit").val();
            openView(3, param);
        }, 300);
    }
    else {
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}