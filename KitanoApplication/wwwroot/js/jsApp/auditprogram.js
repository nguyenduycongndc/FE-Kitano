$(function () {   
    reCalculatPagesCustom(0);
    viewBtnActionPage();
    AppendStatus('#TrangThaiDuyet', 'M_APRG');
    setTimeout(function () {
        getFacilities()
    }, 100);
    setTimeout(function () {
        getActivities()
    }, 120);
    setTimeout(function () {
        getAuditProcess()
    }, 140);
    setTimeout(function () {
        getYearAuditWork(); getAuditWork();
    }, 160);
    setTimeout(function () {
        onSearch();
    }, 200);

});
$(document).on('click', '#AuditProposal', function () {
    if ($(this).prop("checked") == true) {
        $("#showControl").css("display", "block");
    }
    else {
        $("#showControl").css("display", "none");
       
    }
})
function fillMucdoanhhuong(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Potential_InfulenceLevel').html('');
    $('#Potential_InfulenceLevel').append(htmlOption);
    $('#Potential_InfulenceLevelDetail').html('');
    $('#Potential_InfulenceLevelDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#Potential_InfulenceLevel').append(html);
    $('#Potential_InfulenceLevelDetail').append(html);
}
function loadCategory1() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategorieswithsort.path,
        apiConfig.api.common.action.getCategorieswithsort.method,
        { 'gr': categories.mucdoanhhuong }, 'fillMucdoanhhuong');
}
function fillKhanangxayra(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Potential_Possibility').html('');
    $('#Potential_Possibility').append(htmlOption);
    $('#Potential_PossibilityDetail').html('');
    $('#Potential_PossibilityDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#Potential_Possibility').append(html);
    $('#Potential_PossibilityDetail').append(html);
}
function loadCategory2() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategorieswithsort.path,
        apiConfig.api.common.action.getCategorieswithsort.method,
        { 'gr': categories.khanangxayra }, 'fillKhanangxayra');
}
function CallAddAuditRisk() {
    swal({
        title: localizationResources.Confirm,
        text: "Bạn muốn thêm rủi ro từ thư viện?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            var frmDetail = $("#form-audit-program-edit");
            var _id = frmDetail.find("#Id").val();
            fnAddAuditRisk(_id);
        }
    });
}
function fnAddAuditRisk(id) {
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.addauditrisk.path + "/" + id,
        apiConfig.api.auditprogram.action.addauditrisk.method,
        null, 'fnAddAuditRiskSuccess', 'msgError');
}
function fnAddAuditRiskSuccess(rspn) {
    if (rspn.code === '1') {
        //swal(localizationResources.Successfully, "Lấy dữ liệu thành công.", "success");
        toastr.success("Lấy dữ liệu thành công.", "Thành công!", { progressBar: true });
        createdLog("Chương trình kiểm toán", "Lấy rủi ro từ thư viện");
    }
    else {
        //swal(localizationResources.Error, "Lấy dữ liệu không thành công.", "error");
        toastr.error("Lấy dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }

}
function multipleselect(selector, placeholder, host, controller, action) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: host + controller + action + "?auditworkid=" + $("#CuocKiemToanEditId").val(),
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
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}
$(".picker").bootstrapMaterialDatePicker({
    time: false,
    format: 'DD/MM/YYYY',
});
function callBackView(type) {
    if (type == 3) {
        var param = $("#form-scoring-audit-work").find("#IdProcess").val();
        openViewEdit(param)
    }
    if (type == 2) {
        var param_ = $("#form-audit-program-detail").find("#Id").val();
        openView(type, param_)
    }
    if (type == 9) {
        //var param_ = $("#form-audit-program-edit").find("#Id").val();
        var _index = $("#view");
        var _create = $("#create");
        var _edit = $("#edit");
        var _detail = $("#detail");
        var _modify_risk = $("#modify-risk");
        var _add_risk = $("#add-risk");
        var _detail_risk = $("#detail-risk");
        var _add_procedures = $("#add-procedures");
        var _history = $("#history-log");
        var _header_index = $("#header-view");
        var _header_create = $("#header-create");
        var _header_edit = $("#header-edit");
        var _header_detail = $("#header-detail");
        var _header_modify_risk = $("#header-modify-risk");
        var _header_add_risk = $("#header-add-risk");
        var _header_add_procedures = $("#header-add-procedures");
        var _header_history = $("#header-history");
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.show();
        _header_edit.show();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskNameEdit, #RiskCodeEdit").prop("readonly", false);
        $("#edit").find("#AuditProposalEdit").prop("disabled", false);
    }
    if (type == 4) {
        var _index = $("#view");
        var _create = $("#create");
        var _detail = $("#detail");
        var _modify_risk = $("#modify-risk");
        var _add_risk = $("#add-risk");
        var _add_procedures = $("#add-procedures");
        var _header_index = $("#header-view");
        var _header_create = $("#header-create");
        var _header_detail = $("#header-detail");
        var _header_modify_risk = $("#header-modify-risk");
        var _header_add_risk = $("#header-add-risk");
        var _header_add_procedures = $("#header-add-procedures");
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.show();
        _add_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.show();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        $("#CatRiskCode").prop("readonly", true);
        $("#CatRiskName").prop("readonly", true);
        $("#DescriptionCatRisk").prop("readonly", true);
        $("#ScorePotentialRisk").prop("readonly", true);
    }
}
function callBackViewEdit(type) {
    if (type == 3) {
        var param = $("#form-scoring-audit-work").find("#IdProcess").val();
        openViewEdit(param)
    }
    if (type == 2) {
        var param_ = $("#form-audit-program-detail").find("#Id").val();
        openView(type, param_)
    }
    if (type == 9) {
        var param_ = $("#form-audit-program-edit").find("#Id").val();
        openView(type, param_)
    }
    if (type == 4) {
        var _index = $("#view");
        var _create = $("#create");
        var _detail = $("#detail");
        var _modify_risk = $("#modify-risk");
        var _add_risk = $("#add-risk");
        var _add_procedures = $("#add-procedures");
        var _header_index = $("#header-view");
        var _header_create = $("#header-create");
        var _header_detail = $("#header-detail");
        var _header_modify_risk = $("#header-modify-risk");
        var _header_add_risk = $("#header-add-risk");
        var _header_add_procedures = $("#header-add-procedures");
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.show();
        _add_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.show();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        $("#CatRiskCode").prop("readonly", true);
        $("#CatRiskName").prop("readonly", true);
        $("#DescriptionCatRisk").prop("readonly", true);
        $("#ScorePotentialRisk").prop("readonly", true);
    }
}
function callBackViewDetail() {

    var type_ = $("#form-detail-scoring-audit-work").find("#roleview").val();
    var param_ = $("#form-detail-scoring-audit-work").find("#IdAuditScope").val();
    var type = type_ == undefined || type_ == null ? 0 : parseInt(type_);
    var param = param_ == undefined || param_ == null ? 0 : parseInt(param_);
    var _index = $("#view");
    var _create = $("#create");
    var _edit = $("#edit");
    var _detail = $("#detail");
    var _modify_risk = $("#modify-risk");
    var _add_risk = $("#add-risk");
    var _detail_risk = $("#detail-risk");
    var _add_procedures = $("#add-procedures");
    var _history = $("#history-log");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify-risk");
    var _header_add_risk = $("#header-add-risk");
    var _header_add_procedures = $("#header-add-procedures");
    var _header_history = $("#header-history");
    if (type == 2) {
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.show();
        _header_detail.show();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskName, #RiskCode").prop("readonly", false);
        $("#detail").find("#AuditProposal").prop("disabled", false);
        $(".showactionbutton").show();
        $("#form-audit-program-detail").find("#showbuttonApproval").hide();
        $("#form-audit-program-detail").find("#showRequestApproval").hide();
    }
    else if (type == 9) {
        
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.show();
        _header_edit.show();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskNameEdit, #RiskCodeEdit").prop("readonly", false);
        $("#edit").find("#AuditProposalEdit").prop("disabled", false);
    }
    else {
        openView(type, param);
    }
}
function openView(type, param) {
    var _index = $("#view");
    var _create = $("#create");
    var _edit = $("#edit");
    var _detail = $("#detail");
    var _modify_risk = $("#modify-risk");
    var _add_risk = $("#add-risk");
    var _detail_risk = $("#detail-risk");
    var _add_procedures = $("#add-procedures");
    var _history = $("#history-log");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify-risk");
    var _header_add_risk = $("#header-add-risk");
    var _header_add_procedures = $("#header-add-procedures");
    var _header_history = $("#header-history");
    $("input").prop("readonly", false);
    $("select").prop("disabled", false);
    $("textarea").prop("readonly", false);
    if (type === 0) {
        _index.show();
        _header_index.show();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        document.getElementById("form-create-audit-program").reset();
    } else if (type === 1) { // create
        _index.hide();
        _header_index.hide();
        _create.show();
        _header_create.show();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
    }
    else if (type === 2) { // detail
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.show();
        _header_detail.show();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskName, #RiskCode").prop("readonly", false);
        $("#detail").find("#AuditProposal").prop("disabled", false);
        fnGetData(2, param);
        $(".showactionbutton").show();
        $("#form-audit-program-detail").find("#showbuttonApproval").hide();
        $("#form-audit-program-detail").find("#showRequestApproval").hide();
    }
    else if (type === 3) { // modify_risk
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.show();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.show();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        setTimeout(function () {
            getCatRiskLevel(); loadCategory1(); loadCategory2()
        }, 50);
        setTimeout(function () {
            fnGetDataRisk(param,type);
        }, 1000);
        $("#CatRiskCode").prop("readonly", true);
        $("#CatRiskName").prop("readonly", true);
        $("#DescriptionCatRisk").prop("readonly", true);
        $("#ScorePotentialRisk").prop("readonly", true);
    }
    else if (type === 4) { // add_risk
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _detail_risk.hide();
        _header_modify_risk.hide();
        _add_risk.show();
        _add_procedures.hide();
        _header_add_risk.show();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        document.getElementById("formAddRisk").reset();
        var form_program = $("#form-audit-program-edit");        
        var unit = form_program.find("#DonViKiemToanEditID").val();
        var activity = form_program.find("#HoatDongEditID").val();
        var form = $("#formAddRisk");       
        form.find("#DonViLienQuan").val(unit).change().prop("disabled", true);
        form.find("#HoatDong").val(activity).prop("disabled", true);
        setTimeout(function () {
            var process = form_program.find("#QuyTrinhEditID").val();
            form.find("#QuyTrinh").val(process).change().prop("disabled", true);
        }, 1000);
       
       
    }
    else if (type === 5) { // add_procedures
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _header_modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.show();
        _header_add_risk.hide();
        _header_add_procedures.show();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        document.getElementById("formAddProcedures").reset();
        var _form_program = $("#form-audit-program-edit");
        var _unit = _form_program.find("#DonViKiemToanEditID").val();
        var _activity = _form_program.find("#HoatDongEditID").val();
        var _form = $("#formAddProcedures");
        _form.find("#DonViLienQuanProcedures").val(_unit).change().prop("disabled", true);
        _form.find("#HoatDongProcedures").val(_activity).prop("disabled", true);
        setTimeout(function () {
            var process = _form_program.find("#QuyTrinhEditID").val();
            _form.find("#QuyTrinhProcedures").val(process).change().prop("disabled", true);
        }, 1000);
        setTimeout(function () {
            getRiskControl();
        }, 100);
     
    }
    else if (type === 6) { // request
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.show();
        _header_detail.show();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskName, #RiskCode").prop("readonly", false);
        $("#detail").find("#AuditProposal").prop("disabled", false);
        fnGetData(2, param);

        $(".showactionbutton").show();
        $("#form-audit-program-detail").find("#showbuttonApproval").hide();
        $("#form-audit-program-detail").find("#showRequestApproval").show();
        $("#frmRequestModal").find("#approver").prop("disabled", false);
    } else if (type === 7) { // approval
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.show();
        _header_detail.show();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.hide();
        _header_edit.hide();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskName, #RiskCode").prop("readonly", false);
        $("#detail").find("#AuditProposal").prop("disabled", false);
        fnGetData(7, param);
        $(".showactionbutton").hide();
        $("#form-audit-program-detail").find("#showbuttonApproval").show();
        $("#form-audit-program-detail").find("#showRequestApproval").hide();
        $("#frmRejectModal").find("#reasonnote").prop("readonly", false);
        //$("#frmApprovalRequestModal").find("#approver_level").prop("disabled", false);
    }
    else if (type === 8) { // approval
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.show();
        _header_history.show();
        _edit.hide();
        _header_edit.hide();
        onSearchHistoryLogKitano(param,"M_APRG");
    }
    else if (type === 9) { // edit
        _index.hide();
        _header_index.hide();
        _create.hide();
        _header_create.hide();
        _detail.hide();
        _header_detail.hide();
        _modify_risk.hide();
        _add_risk.hide();
        _detail_risk.hide();
        _add_procedures.hide();
        _header_modify_risk.hide();
        _header_add_risk.hide();
        _header_add_procedures.hide();
        _history.hide();
        _header_history.hide();
        _edit.show();
        _header_edit.show();
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
        $("#RiskNameEdit, #RiskCodeEdit").prop("readonly", false);
        $("#edit").find("#AuditProposalEdit").prop("disabled", false);
        fnGetData(9, param);
    }
}
function openViewEdit(param) {
    var _index = $("#view");
    var _create = $("#create");
    var _edit = $("#edit");
    var _detail = $("#detail");
    var _modify_risk = $("#modify-risk");
    var _add_risk = $("#add-risk");
    var _detail_risk = $("#detail-risk");
    var _add_procedures = $("#add-procedures");
    var _history = $("#history-log");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify-risk");
    var _header_add_risk = $("#header-add-risk");
    var _header_add_procedures = $("#header-add-procedures");
    var _header_history = $("#header-history");

    _index.hide();
    _header_index.hide();
    _create.hide();
    _header_create.hide();
    _detail.hide();
    _header_detail.hide();
    _modify_risk.show();
    _add_risk.hide();
    _detail_risk.hide();
    _add_procedures.hide();
    _header_modify_risk.show();
    _header_add_risk.hide();
    _header_add_procedures.hide();
    _history.hide();
    _header_history.hide();
    _edit.hide();
    _header_edit.hide();
    $("input").prop("readonly", false);
    $("select").prop("disabled", false);
    $("textarea").prop("readonly", false);
    fnGetDataRiskForProduce(param);
    $("#CatRiskCode").prop("readonly", true);
    $("#CatRiskName").prop("readonly", true);
    $("#DescriptionCatRisk").prop("readonly", true);
    $("#ScorePotentialRisk").prop("readonly", true);
}
function openViewDetail(param,type) {
    var _index = $("#view");
    var _create = $("#create");
    var _edit = $("#edit");
    var _detail = $("#detail");
    var _modify_risk = $("#modify-risk");
    var _add_risk = $("#add-risk");
    var _detail_risk = $("#detail-risk");
    var _add_procedures = $("#add-procedures");
    var _history = $("#history-log");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
    var _header_modify_risk = $("#header-modify-risk");
    var _header_add_risk = $("#header-add-risk");
    var _header_add_procedures = $("#header-add-procedures");
    var _header_history = $("#header-history");
   
    _index.hide();
    _header_index.hide();
    _create.hide();
    _header_create.hide();
    _detail.hide();
    _header_detail.hide();
    _modify_risk.hide();
    _add_risk.hide();
    _detail_risk.show();
    _add_procedures.hide();
    _header_modify_risk.show();
    _header_add_risk.hide();
    _header_add_procedures.hide();
    _history.hide();
    _header_history.hide();
    _edit.hide();
    _header_edit.hide();
    $("#form-detail-scoring-audit-work").find("#roleview").val(type);
    setTimeout(function () {
        getCatRiskLevel(); loadCategory1(); loadCategory2()
    }, 50);
    setTimeout(function () {
        fnGetDataRisk(param,10);
    }, 1000);
    
    $("input").prop("readonly", true);
    $("select").prop("disabled", true);
    $("textarea").prop("readonly", true);
}
//$(document).on('change', '#KiemSoatProcedures', function () {
//    getRiskControl();
//});
function Delete(name, id) {
    var _name = String(name);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa chương trình: " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditProgram(id);
        }
    });
}
function fnDeleteAuditProgram(id) {
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.delete.path + "/" + id,
        apiConfig.api.auditprogram.action.delete.method,
        null, 'fnDeleteAuditProgramSuccess', 'msgError');
}
function fnDeleteAuditProgramSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        createdLog("Chương trình kiểm toán", "Xóa chương trình");
        onSearch();
    }
    else {
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}
function ViewDetail() {
    window.location.href = "/AuditProgram/Detail"
}
function DeleteRisk(id, name) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + " " + name,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteRisk(id);

        }
    });
}
function fnDeleteRisk(id) {
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.deleteRisk.path + "/" + id,
        apiConfig.api.auditprogram.action.deleteRisk.method,
        null, 'fnDeleteRiskSuccess', 'msgError');
}
function fnDeleteRiskSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Xóa rủi ro");
        //swal(localizationResources.Successfully, localizationResources.DeletedSuccessfully, "success");
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });
        var param = $("#form-audit-program-edit").find("#Id").val();
        openView(9, param);
    }
    else {
        //swal(localizationResources.Error, localizationResources.DeletedFailed, "error");
        toastr.error(localizationResources.DeletedFailed, "Lỗi!", { progressBar: true });
    }
}
function DeleteProcedures(id, name) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + " " + name,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteProcedures(id);
        }
    });
}
function fnDeleteProcedures(id) {
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.deleteProcedures.path + "/" + id,
        apiConfig.api.auditprogram.action.deleteProcedures.method,
        null, 'fnDeleteProceduresSuccess', 'msgError');
}
function fnDeleteProceduresSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Xóa thủ tục");
        //swal(localizationResources.Successfully, localizationResources.DeletedSuccessfully, "success");
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });

        var param = $("#form-scoring-audit-work").find("#IdProcess").val();
        openView(3, param);
    }
    else {
        //swal(localizationResources.Error, localizationResources.DeletedFailed, "error");
        toastr.error(localizationResources.DeletedFailed, "Lỗi!", { progressBar: true });
    }
}
function getFacilities() {
    var obj = {
        'code': '',
        'key': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillFacilityCombo');
}
function fillFacilityCombo(rspn) {
    var data = rspn.data;

    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#DonViKiemToan').html('');
    $('#DonViKiemToan').append(htmlOption);
    $('#DonViLienQuan').html('');
    $('#DonViLienQuan').append(htmlOption);
    $('#DonViLienQuanProcedures').html('');
    $('#DonViLienQuanProcedures').append(htmlOption);
    $('#unitcurrent').html('');
    $('#unitcurrent').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#DonViKiemToan').append(html);
    $('#DonViLienQuan').append(html);
    $('#DonViLienQuanProcedures').append(html);
    $('#unitcurrent').append(html);
}
function fillActivityCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#HoatDongLienQuan').html('');
    $('#HoatDongLienQuan').append(htmlOption);
    $('#HoatDong').html('');
    $('#HoatDong').append(htmlOption);
    $('#HoatDongProcedures').html('');
    $('#HoatDongProcedures').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#HoatDongLienQuan').append(html);
    $('#HoatDong').append(html);
    $('#HoatDongProcedures').append(html);
}
function getActivities() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillActivityCombo');
}
function getAuditProcess() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditProcess');
}
function getAuditProcess_Addrisk() {
    var _frmAddRisk = $("#formAddRisk");
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'facility_id': isNaN(parseInt(_frmAddRisk.find('#DonViLienQuan').val())) ? 0 : parseInt(_frmAddRisk.find('#DonViLienQuan').val()),
        'activity_id': isNaN(parseInt(_frmAddRisk.find('#HoatDong').val())) ? 0 : parseInt(_frmAddRisk.find('#HoatDong').val()),
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditProcess_Addrisk');
}
function fillAuditProcess_Addrisk(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#QuyTrinh').html('');
    $('#QuyTrinh').append(htmlOption);
    $('#QuyTrinhProcedures').html('');
    $('#QuyTrinhProcedures').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';
    }
    $('#QuyTrinh').append(html);
    $('#QuyTrinhProcedures').append(html);
}
function getAuditProcess_AddProcedures() {
    var _frmAddRisk = $("#formAddProcedures");
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'facility_id': isNaN(parseInt(_frmAddRisk.find('#DonViLienQuanProcedures').val())) ? 0 : parseInt(_frmAddRisk.find('#DonViLienQuanProcedures').val()),
        'activity_id': isNaN(parseInt(_frmAddRisk.find('#HoatDongProcedures').val())) ? 0 : parseInt(_frmAddRisk.find('#HoatDongProcedures').val()),
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditProcess_AddProcedures');
}
function fillAuditProcess_AddProcedures(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#QuyTrinhProcedures').html('');
    $('#QuyTrinhProcedures').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';;
    }
    $('#QuyTrinhProcedures').append(html);
}
function getCatControl() {
    var obj = {
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    }
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.search.path,
        apiConfig.api.catcontrol.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillCatControl');
}
function fillControlCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#controlCreate').html('');
    $('#controlCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#controlCreate').append(html);
    parentLoaded = true;
}
function getRiskControl() {
    var value = $("#form-scoring-audit-work").find("#IdAuditRisk").val();
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.getriskcontrol.path + "/" + value,
        apiConfig.api.catcontrol.action.getriskcontrol.method,
        null, 'fillRiskControl');
}
function fillRiskControl(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#KiemSoatProcedures').html('');
    $('#KiemSoatProcedures').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' +obj.code + "-" + obj.name + '</option>';;
    }
    $('#KiemSoatProcedures').append(html);
    parentLoaded = true;
}

function fillCatControl(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#KiemSoatProcedures').html('');
    $('#KiemSoatProcedures').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';;
    }
    $('#KiemSoatProcedures').append(html);
}
function fillAuditProcess(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#QuyTrinhKiemToan').html('');
    $('#QuyTrinhKiemToan').append(htmlOption);
    $('#processcurrent').html('');
    $('#processcurrent').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';;
    }
    $('#QuyTrinhKiemToan').append(html);
    $('#processcurrent').append(html);
}
function getAuditWork() {
    var obj = {
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWork');
}
function getAuditWorkForCreate() {
    var _form = $("#form-create-audit-program");
    var obj = {
        'year': _form.find("#YearAuditWorkCreate").val(),
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWorkForCreate');
}
function getAuditWorkCopy() {
    var _form = $("#formCopyProgram");
    var obj = {
        'year': _form.find("#yearcopynew").val(),
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchauditworkapproval.path,
        apiConfig.api.auditwork.action.searchauditworkapproval.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWorkForCopy');
}
function fillAuditWork(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#AuditWork').html('');
    $('#AuditWork').append(htmlOption);
    $('#auditworkcurrent').html('');
    $('#auditworkcurrent').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.code +" - "+ obj.name + '</option>';;
    }
    $('#AuditWork').append(html);
    $('#auditworkcurrent').append(html);
}
function fillAuditWorkForCreate(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#AuditWorkCreate').html('');
    $('#AuditWorkCreate').append(htmlOption);
    $('#FacilityAuditWorkCreate').html('');
    $('#FacilityAuditWorkCreate').append(htmlOption);
    $('#ProcessAuditWorkCreate').html('');
    $('#ProcessAuditWorkCreate').append(htmlOption);
    
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#AuditWorkCreate').append(html);
  
}
function fillAuditWorkForCopy(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#auditworkcopynew').html('');
    $('#auditworkcopynew').append(htmlOption);
    $('#unitcopynew').html('');
    $('#unitcopynew').append(htmlOption);
    $('#processcopynew').html('');
    $('#processcopynew').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#auditworkcopynew').append(html);

}
function getFacilityCreate(value) {
    var _audit = value;
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getunitbyaudit.path +
        "/" +
        parseInt(_audit),
        apiConfig.api.auditworkscope.action.getunitbyaudit.method,
        null,
        "fillUnitCreate",
        "msgError"
    );
}
function getFacilityCopy(value) {
    var _audit = value;
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getunitbyaudit.path +
        "/" +
        parseInt(_audit),
        apiConfig.api.auditworkscope.action.getunitbyaudit.method,
        null,
        "fillUnitCopy",
        "msgError"
    );
}
function fillUnitCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#FacilityAuditWorkCreate").html("");
    $("#FacilityAuditWorkCreate").append(htmlOption);
    $("#ProcessAuditWorkCreate").html("");
    $("#ProcessAuditWorkCreate").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#FacilityAuditWorkCreate").append(html);
    parentLoaded = true;
}
function fillUnitCopy(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#unitcopynew").html("");
    $("#unitcopynew").append(htmlOption);
    $("#processcopynew").html("");
    $("#processcopynew").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#unitcopynew").append(html);
    parentLoaded = true;
}
function getValueProcessCreate(value, auditid) {
    var _audit = auditid;
    var _unit = value,
        call_back = "fillProcessCreate";
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getprocessbyunit.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)) +
        "/" +
        (isNaN(parseInt(_unit)) ? 0 : parseInt(_unit)),
        apiConfig.api.auditworkscope.action.getprocessbyunit.method,
        null,
        call_back,
        "msgError"
    );
}
function getValueProcessCopy(value, auditid) {
    var _audit = auditid;
    var _unit = value,
        call_back = "fillProcessCopy";
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getprocessbyunit.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)) +
        "/" +
        (isNaN(parseInt(_unit)) ? 0 : parseInt(_unit)),
        apiConfig.api.auditworkscope.action.getprocessbyunit.method,
        null,
        call_back,
        "msgError"
    );
}
function fillProcessCreate(rspn) {
    var data = rspn.data;
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    
    $("#ProcessAuditWorkCreate").html("");
    $("#ProcessAuditWorkCreate").append(htmlOption);
    if (data == undefined || data == null || data.length == 0) {
        return;
    }

    var html = generateComboOptions(data, 0, "childs");
  
    $("#ProcessAuditWorkCreate").append(html);
}
function fillProcessCopy(rspn) {
    var data = rspn.data;
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";

    $("#processcopynew").html("");
    $("#processcopynew").append(htmlOption);
    if (data == undefined || data == null || data.length == 0) {
        return;
    }

    var html = generateComboOptions(data, 0, "childs");

    $("#processcopynew").append(html);
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
function getYearAuditWorkApproval() {
    var obj = {
        'year': '',
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchyearapproved.path,
        apiConfig.api.auditwork.action.searchyearapproved.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearAuditWorkApproval');
}
function fillYearAuditWork(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Year').html('');
    $('#Year').append(htmlOption);
    $('#YearAuditWorkCreate').html('');
    $('#YearAuditWorkCreate').append(htmlOption);
    $('#yearprogramcurrent').html('');
    $('#yearprogramcurrent').append(htmlOption);
    $('#yearcopynew').html('');
    $('#yearcopynew').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.year + '">' + obj.year + '</option>';;
    }
    $('#Year').append(html);
    $('#YearAuditWorkCreate').append(html);
    $('#yearprogramcurrent').append(html);
    $('#yearcopynew').append(html);
}
function fillYearAuditWorkApproval(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';   
    $('#yearcopynew').html('');
    $('#yearcopynew').append(htmlOption);

    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.year + '">' + obj.year + '</option>';;
    }
    $('#yearcopynew').append(html);
}
function getCatRiskLevel() {
    var obj = {
        'name': '',
        'status': '1' ,
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
    $('#Potential_RiskRating').html('');
    $('#Potential_RiskRatingDetail').html('');
    $('#Remaining_RiskRating').html('');
    $('#Potential_RiskRating').append(htmlOption);
    $('#Remaining_RiskRating').append(htmlOption);
    $('#Potential_RiskRatingDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.id + '">' + obj.name + '</option>';;
    }
    $('#Potential_RiskRating').append(html);
    $('#Potential_RiskRatingDetail').append(html);
    $('#Remaining_RiskRating').append(html);
}
var count = 0;
function onSearch() {
    var obj = {
        'year': $('#Year').val(),
        'audit_work': parseInt($('#AuditWork').val()),
        'audit_process': parseInt($('#QuyTrinhKiemToan').val()),
        'facility': parseInt($('#DonViKiemToan').val()),
        'activity': parseInt($('#HoatDongLienQuan').val()),
        'status': $('#TrangThaiDuyet').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.search.path,
        apiConfig.api.auditprogram.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}

function fnSearchSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#programTable tbody');
        $("#programTable").dataTable().fnDestroy();
        tbBody.html('');
        var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        var level_approval = getApprovallevel("M_APRG");
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var _status = getApprovalStatus("M_APRG", obj.status);
            
            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td class="text-center">' + obj.year + '</td>' +
                '<td class="line-break"><input type="hidden" id="audit_work_name" name="audit_work_name">' + obj.audit_work + '</td>' +
                '<td class="line-break"><input type="hidden" id="audit_process_name" name="audit_process_name">' + obj.audit_process + '</td>' +
                '<td class="line-break"><input type="hidden" id="audit_facility_name" name="audit_facility_name">' + obj.audit_facility + '</td>' +
                '<td class="line-break"><input type="hidden" id="audit_activity_name" name="audit_activity_name">' + obj.audit_activity + '</td>' +
                '<td class="line-break">' + _status + '</td>' +
                '<td class="col-action">' +
               
                (IsCheckPemission('M_APRG', 'PER_DETAIL') === true ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>' : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>')
                +
                (IsCheckPemission('M_APRG', 'PER_EDIT') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(9,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_APRG', 'PER_DEL') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2")
                ? '<a class="btn icon-delete btn-action-custom btn-sm" onclick="Delete(\'' + obj.audit_work + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +
                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(8,' + obj.id + ')"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default  btn-action-custom btn-sm"  style=" display: flex; padding: 4px 6px 2px !important;" onclick="ExportInlist(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-excel" aria-hidden="true" data-original-title="Xuất excel" tyle="font-size: 16px;"></i>&nbsp Xuất excel</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_APRG', 'PER_REQUEST') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(6,' + obj.id + ')" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_APRG', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(7,' + obj.id + ')"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true"></i>&nbsp Phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_APRG', 'PER_ADD') === true
                ? '<a type="button" class="btn icon-default btn-action-custom btn-sm" style=" display: flex;"  data-toggle="modal" data-target="#modalCopyProgram" data-id="' + obj.id + '" data-year="' + obj.year + '" data-auditworkid="' + obj.audit_work_id + '" data-auditfacilityid="' + obj.audit_facility_id + '" data-auditprocessid="' + obj.audit_process_id + '"><i data-toggle="tooltip" title="Sao chép chương trình" class="fa fa-key" aria-hidden="true"></i>&nbsp Sao chép chương trình</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Sao chép chương trình" class="fa fa-clone" aria-hidden="true" ></i>&nbsp Sao chép</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_APRG', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
                ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.audit_work + '\',\'M_APRG\',\'Chương trình kiểm toán\')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
                : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_APRG', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_APRG') == 1
                ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.audit_work + '\',\'M_APRG\',\'Chương trình kiểm toán\',\'\')" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#programTable").DataTable({
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
                    render: function (data, type, row, meta) {
                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [7],
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
    else {
        var _tbBody = $('#programTable tbody');
        $("#programTable").dataTable().fnDestroy();
        _tbBody.html('');
        $("#programTable").dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
           // "scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 7],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
        });
        reCalculatPagesCustom(0);
        viewBtnActionPage();
    }
}

function fnGetData(type, param) {
    var _fnName = '';
    if (type === 1) {
        _fnName = 'fnGetDataSuccess';
    }
    else if (type === 2) {
        _fnName = 'fnGetDetailSuccess';
    }
    else if (type === 7) {
        _fnName = 'fnGetDetailApprovalSuccess';
    } else if (type === 9) {
        _fnName = 'fnGetEditSuccess';
    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.getItem.path + "/" + param,
        apiConfig.api.auditprogram.action.getItem.method,
        null, _fnName, 'msgError');
}

function fnGetDetailSuccess(rspn) {
    var frmDetail = $("#form-audit-program-detail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#NamKiemToanDetail").val(data.year);
        frmDetail.find("#CuocKiemToanDetail").val(data.audit_work);
        frmDetail.find("#CuocKiemToanId").val(data.audit_work_id);
        frmDetail.find("#HoatDongDetailID").val(data.audit_activity_id);
        frmDetail.find("#QuyTrinhDetail").val(data.audit_process);
        frmDetail.find("#QuyTrinhDetailID").val(data.audit_process_id);
        frmDetail.find('#DonViKiemToanDetail').val(data.audit_facility);
        frmDetail.find('#DonViKiemToanDetailID').val(data.audit_facility_id);
        frmDetail.find("#NguoiPhuTrachDetail").val(data.person_in_charge);
        frmDetail.find("#statusCodeDetail").val(data.status);
        frmDetail.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileApproval(' + obj.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#FileDetail").append(_append_data);
        }


        var tbBody = $('#levelRiskAssessmentTable tbody');
        $("#levelRiskAssessmentTable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.audit_risk_list !== undefined && data.audit_risk_list !== null) {
            var data_ = data.audit_risk_list;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.cat_risk_name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.cat_risk_code + '</td>' +
                    '<td class="line-break">' + obj.cat_risk_name + '</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_possibility)+'</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_infulence_level) +'</td>' +
                    '<td class="text-center">' + viewValue(obj.score_potential_risk) +'</td>' +
                    '<td class="line-break">' + viewValue(obj.potential_risk_rating_name) +'</td>' +
                    
                    '<td class="line-break">' + (obj.audit_proposal == 1 ? "Có" : "Không" )+'</td>' +
                    '<td class="line-break">' + viewValue(obj.working_paper) +'</td>' +
                    //'<td class="text-center">' + obj.score_remaining_risk + '</td>' +
                    '<td class="col-action" style="width:12% !important;">' +
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewDetail(' + obj.id + ',2)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#levelRiskAssessmentTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 9],
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

function fnGetEditSuccess(rspn) {
    var frmDetail = $("#form-audit-program-edit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
       
        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#NamKiemToanEdit").val(data.year);
        frmDetail.find("#CuocKiemToanEdit").val(data.audit_work);
        frmDetail.find("#CuocKiemToanEditId").val(data.audit_work_id);
        frmDetail.find("#HoatDongEditID").val(data.audit_activity_id);
        frmDetail.find("#QuyTrinhEdit").val(data.audit_process);
        frmDetail.find("#QuyTrinhEditID").val(data.audit_process_id);
        frmDetail.find('#DonViKiemToanEdit').val(data.audit_facility);
        frmDetail.find('#DonViKiemToanEditID').val(data.audit_facility_id);
        frmDetail.find("#NguoiPhuTrachEdit").val(data.person_in_charge);
        frmDetail.find("#statusCodeEdit").val(data.status);
        var tbBody = $('#levelRiskAssessmentTableEdit tbody');
        $("#levelRiskAssessmentTableEdit").dataTable().fnDestroy();
        tbBody.html('');
        if (data.audit_risk_list !== undefined && data.audit_risk_list !== null) {
            var data_ = data.audit_risk_list;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.cat_risk_name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.cat_risk_code + '</td>' +
                    '<td class="line-break">' + obj.cat_risk_name + '</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_possibility) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_infulence_level) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.score_potential_risk) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.potential_risk_rating_name) + '</td>' +

                    '<td class="line-break">' + (obj.audit_proposal == 1 ? "Có" : "Không") + '</td>' +
                    '<td class="line-break">' + viewValue(obj.working_paper) + '</td>' +
                    //'<td class="text-center">' + obj.score_remaining_risk + '</td>' +
                    '<td class="col-action" style="width:12% !important;">' +
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewDetail(' + obj.id + ',9)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRisk(' + obj.id + ',' + _name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#levelRiskAssessmentTableEdit").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 9],
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

function fnGetDetailApprovalSuccess(rspn) {
    var frmDetail = $("#form-audit-program-detail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#NamKiemToanDetail").val(data.year);
        frmDetail.find("#CuocKiemToanDetail").val(data.audit_work);
        frmDetail.find("#CuocKiemToanId").val(data.audit_work_id);
        frmDetail.find("#HoatDongDetailID").val(data.audit_activity_id);
        frmDetail.find("#QuyTrinhDetail").val(data.audit_process);
        frmDetail.find("#QuyTrinhDetailID").val(data.audit_process_id);
        frmDetail.find('#DonViKiemToanDetail').val(data.audit_facility);
        frmDetail.find('#DonViKiemToanDetailID').val(data.audit_facility_id);
        frmDetail.find("#NguoiPhuTrachDetail").val(data.person_in_charge);
        frmDetail.find("#statusCodeDetail").val(data.status);
        var tbBody = $('#levelRiskAssessmentTable tbody');
        $("#levelRiskAssessmentTable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.audit_risk_list !== undefined && data.audit_risk_list !== null) {
            var data_ = data.audit_risk_list;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.cat_risk_name + "'";
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.cat_risk_code + '</td>' +
                    '<td class="line-break">' + obj.cat_risk_name + '</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_possibility) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.potential_infulence_level) + '</td>' +
                    '<td class="text-center">' + viewValue(obj.score_potential_risk) + '</td>' +
                    '<td class="line-break">' + viewValue(obj.potential_risk_rating_name) + '</td>' +

                    '<td class="line-break">' + (obj.audit_proposal == 1 ? "Có" : "Không") + '</td>' +
                    '<td class="line-break">' + viewValue(obj.working_paper) + '</td>' +
                    //'<td class="text-center">' + obj.score_remaining_risk + '</td>' +
                    '<td class="col-action" style="width:12% !important;">' +
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewDetail(' + obj.id + ',2)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        $("#levelRiskAssessmentTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 9],
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

function onSearchDetail() {
    var obj = {
        'audit_work_scope_id': $('#form-audit-program-detail').find("#Id").val(),
        'risk_code': $('#RiskCode').val(),
        'risk_name': $('#RiskName').val(),
        'audit_proposal': $('#AuditProposal').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.searchRisk.path,
        apiConfig.api.auditprogram.action.searchRisk.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchRiskSuccess', 'msgError');
}

function fnSearchRiskSuccess(rspn) {
    var tbBody = $('#levelRiskAssessmentTable tbody');
    $("#levelRiskAssessmentTable").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var _name = "'" + obj.cat_risk_name + "'";
            var html = '<tr>' +
                '<td class="text-center">' + (i + 1) + '</td>' +
                '<td>' + obj.cat_risk_code + '</td>' +
                '<td class="line-break">' + obj.cat_risk_name + '</td>' +
                '<td class="text-center">' + viewValue(obj.potential_possibility) + '</td>' +
                '<td class="text-center">' + viewValue(obj.potential_infulence_level) + '</td>' +
                '<td class="text-center">' + viewValue(obj.score_potential_risk) + '</td>' +
                '<td class="line-break">' + viewValue(obj.potential_risk_rating_name) + '</td>' +

                '<td class="line-break">' + (obj.audit_proposal == 1 ? "Có" : "Không") + '</td>' +
                '<td class="line-break">' + viewValue(obj.working_paper) + '</td>' +
                //'<td class="text-center">' + obj.score_remaining_risk + '</td>' +
                '<td class="col-action" style="width:12% !important;">' +
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewDetail(' + obj.id + ',2)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
    }  
}

function onSearchEdit() {
    var obj = {
        'audit_work_scope_id': $('#form-audit-program-edit').find("#Id").val(),
        'risk_code': $('#RiskCodeEdit').val(),
        'risk_name': $('#RiskNameEdit').val(),
        'audit_proposal': $('#AuditProposalEdit').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.searchRisk.path,
        apiConfig.api.auditprogram.action.searchRisk.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchRiskEditSuccess', 'msgError');
}

function fnSearchRiskEditSuccess(rspn) {
    var tbBody = $('#levelRiskAssessmentTableEdit tbody');
    $("#levelRiskAssessmentTableEdit").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var _name = "'" + obj.cat_risk_name + "'";
            var html = '<tr>' +
                '<td class="text-center">' + (i + 1) + '</td>' +
                '<td>' + obj.cat_risk_code + '</td>' +
                '<td class="line-break">' + obj.cat_risk_name + '</td>' +
                '<td class="text-center">' + viewValue(obj.potential_possibility) + '</td>' +
                '<td class="text-center">' + viewValue(obj.potential_infulence_level) + '</td>' +
                '<td class="text-center">' + viewValue(obj.score_potential_risk) + '</td>' +
                '<td class="line-break">' + viewValue(obj.potential_risk_rating_name) + '</td>' +

                '<td class="line-break">' + (obj.audit_proposal == 1 ? "Có" : "Không") + '</td>' +
                '<td class="line-break">' + viewValue(obj.working_paper) + '</td>' +
                //'<td class="text-center">' + obj.score_remaining_risk + '</td>' +
                '<td class="col-action" style="width:12% !important;">' +
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewDetail(' + obj.id + ',9)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRisk(' + obj.id + ',' + _name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
    }
}

function fnGetDataRisk(param,type) {
    var callback = "";
    if (type == 3) {
        callback = "fnGetEditlRiskSuccess";
    }
    else if (type == 10) {
        callback = "fnGetDetailRiskSuccess";
    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.getItemProcessRisk.path + "/" + param,
        apiConfig.api.auditprogram.action.getItemProcessRisk.method,
        null, callback, 'msgError');
}

function fnGetEditlRiskSuccess(rspn) {
    var frmRiskDetail = $("#form-scoring-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmRiskDetail.find("#IdProcess").val(data.id);
        frmRiskDetail.find("#IdAuditScope").val(data.audiit_scope_id);
        frmRiskDetail.find("#IdAuditRisk").val(data.cat_risk_id);
        //frmRiskDetail.find("#IdAuditRisk").val(data.cat_risk_id);
        frmRiskDetail.find("#CatRiskCode").val(data.cat_risk_code);
        frmRiskDetail.find("#CatRiskName").val(data.cat_risk_name);
        frmRiskDetail.find('#DescriptionCatRisk').val(data.description_cat_risk);
        if (data.potential_possibility) {
            frmRiskDetail.find("#Potential_Possibility").val(data.potential_possibility).change();
        }
        else {
            frmRiskDetail.find("#Potential_Possibility").val(-1).change();
        }
        if (data.potential_infulence_level) {
            frmRiskDetail.find("#Potential_InfulenceLevel").val(data.potential_infulence_level).change();
        }
        else {
            frmRiskDetail.find("#Potential_InfulenceLevel").val(-1).change();
        }
        if (data.potential_risk_rating) {
            frmRiskDetail.find("#Potential_RiskRating").val(data.potential_risk_rating).change();
        } else {
            frmRiskDetail.find("#Potential_RiskRating").val(-1).change();
        }

        frmRiskDetail.find("#Potential_ReasonRating").val(data.potential_reason_rating);
        var _before = frmRiskDetail.find("#AuditProposal").prop("checked");
        if (_before == false) {
            if (data.audit_proposal == 1) {
                frmRiskDetail.find("#AuditProposal").prop("checked", true);
                frmRiskDetail.find("#showControl").css("display", "block");
            }
            else {
                frmRiskDetail.find("#AuditProposal").prop("checked", false);
                frmRiskDetail.find("#showControl").css("display", "none");
            }
        }

        if (data.remaining_possibility) {
            frmRiskDetail.find("#Remaining_Possibility").val(data.remaining_possibility).change();
        } else {
            frmRiskDetail.find("#Remaining_Possibility").val(-1).change();
        }

        if (data.remaining_infulence_level) {
            frmRiskDetail.find("#Remaining_InfulenceLevel").val(data.remaining_infulence_level).change();
        } else {
            frmRiskDetail.find("#Remaining_InfulenceLevel").val(-1).change();
        }

        if (data.remaining_risk_rating) {
            frmRiskDetail.find("#Remaining_RiskRating").val(data.remaining_risk_rating).change();
        } else {
            frmRiskDetail.find("#Remaining_RiskRating").val(-1).change();
        }
        frmRiskDetail.find("#Remaining_ReasonRating").val(data.remaining_reason_rating);

        var _tbBody = $('#auditControlTable tbody');
        $("#auditControlTable").dataTable().fnDestroy();
        _tbBody.html('');
        if (data.cat_control_list !== undefined && data.cat_control_list !== null) {
            var data_ = data.cat_control_list;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var tansuat = '';

                switch (obj.controlfrequency) {

                    case 1:
                        tansuat = "Mỗi khi phát sinh";
                        break;
                    case 2:
                        tansuat = "Nhiều lần trong ngày";
                        break;
                    case 3:
                        tansuat = "Hàng ngày";
                        break;
                    case 4:
                        tansuat = "Hàng tuần";
                        break;
                    case 5:
                        tansuat = "Hàng tháng";
                        break;
                    case 6:
                        tansuat = "Hàng quý";
                        break;
                    case 7:
                        tansuat = "Hàng năm";
                        break;
                }
                var loai = '';
                switch (obj.controltype) {

                    case 1:
                        loai = "Phòng ngừa";
                        break;
                    case 2:
                        loai = "Phát hiện";
                        break;

                }
                var hinhthuc = '';
                switch (obj.controlformat) {

                    case 1:
                        hinhthuc = "Tự động";
                        break;
                    case 2:
                        hinhthuc = "Bán tự động";
                        break;
                    case 3:
                        hinhthuc = "Thủ công";
                        break;

                }
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td class="line-break">' + obj.code + '</td>' +
                    '<td class="line-break">' + obj.description + '</td>' +
                    '<td class="line-break">' + tansuat + '</td>' +
                    '<td class="line-break">' + loai + '</td>' +
                    '<td class="line-break">' + hinhthuc + ' </td>' +
                    '</tr>';
                _tbBody.append(html);
            }

        }
        $("#auditControlTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        var tbBody = $('#auditProceduresTable tbody');
        $("#auditProceduresTable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.list_program_procedures !== undefined && data.list_program_procedures !== null) {
            var data_ = data.list_program_procedures;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center" style="width: 3% !important;">' + (i + 1) + '</td>' +
                    '<td class="line-break"><input type="hidden" id="risk_scoring_id" name="risk_scoring_id" value="' + obj.id + '"/>' + obj.control_code + '</td>' +
                    '<td class="line-break">' + obj.code + '</td>' +
                    '<td class="line-break">' + obj.name + '</td>' +
                    '<td class="line-break">' + obj.description + '</td>' +
                    '<td><select class="form-control usersid" id="Users_' + i + '" name="Users_' + i + '" style="padding:0;"></td>' +
                    '<td class="col-action">' +
                    '<a class="btn icon-delete btn-action-custom" onclick="DeleteProcedures(' + obj.id + ',' + _name + ')" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
                if (obj.lst_auditor != undefined && obj.lst_auditor != null && obj.lst_auditor != "") {
                    var value = obj.lst_auditor;
                    var newOption = new Option(value.split(':')[1], value.split(':')[0], true, true);
                    $("#Users_" + i).append(newOption).trigger('change');
                }
                multipleselect("Users_" + i, "Chọn người thực hiện..", apiConfig.api.host_audit_service, apiConfig.api.auditwork.controller, apiConfig.api.auditwork.action.SelectAuditor.path);
            }
        }
        $("#auditProceduresTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 4, 5],
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

function fnGetDetailRiskSuccess(rspn) {
    var frmRiskDetail = $("#form-detail-scoring-audit-work");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmRiskDetail.find("#IdProcess").val(data.id);
        frmRiskDetail.find("#IdAuditScope").val(data.audiit_scope_id);
        frmRiskDetail.find("#IdAuditRisk").val(data.cat_risk_id);
        //frmRiskDetail.find("#IdAuditRisk").val(data.cat_risk_id);
        frmRiskDetail.find("#CatRiskCodeDetail").val(data.cat_risk_code);
        frmRiskDetail.find("#CatRiskNameDetail").val(data.cat_risk_name);
        frmRiskDetail.find('#DescriptionCatRiskDetail').val(data.description_cat_risk);
        if (data.potential_possibility) {
            frmRiskDetail.find("#Potential_PossibilityDetail").val(data.potential_possibility).change();
        }
        else {
            frmRiskDetail.find("#Potential_PossibilityDetail").val(-1).change();
        }
        if (data.potential_infulence_level) {
            frmRiskDetail.find("#Potential_InfulenceLevelDetail").val(data.potential_infulence_level).change();
        }
        else{
            frmRiskDetail.find("#Potential_InfulenceLevelDetail").val(-1).change();
        }
        if (data.potential_risk_rating) {
            frmRiskDetail.find("#Potential_RiskRatingDetail").val(data.potential_risk_rating).change();
        } else {
            frmRiskDetail.find("#Potential_RiskRatingDetail").val(-1).change();
        }
           

        frmRiskDetail.find("#Potential_ReasonRatingDetail").val(data.potential_reason_rating);
        var _before = frmRiskDetail.find("#AuditProposalDetail").prop("checked");
        if (_before == false) {
            if (data.audit_proposal == 1) {
                frmRiskDetail.find("#AuditProposalDetail").prop("checked", true).prop("disabled", true);
                frmRiskDetail.find("#showControl").css("display", "block");
            }
            else {
                frmRiskDetail.find("#AuditProposalDetail").prop("checked", false).prop("disabled", true);
                frmRiskDetail.find("#showControl").css("display", "none");
            }
        }
        

        if (data.remaining_possibility) {
            frmRiskDetail.find("#Remaining_PossibilityDetail").val(data.remaining_possibility).change();
        }else {
            frmRiskDetail.find("#Remaining_PossibilityDetail").val(-1).change();
        }
            
        if (data.remaining_infulence_level) {
            frmRiskDetail.find("#Remaining_InfulenceLevelDetail").val(data.remaining_infulence_level).change();
        } else {
            frmRiskDetail.find("#Remaining_InfulenceLevelDetail").val(-1).change();
        }

        if (data.remaining_risk_rating) {
            frmRiskDetail.find("#Remaining_RiskRatingDetail").val(data.remaining_risk_rating).change();
        } else {
            frmRiskDetail.find("#Remaining_RiskRatingDetail").val(-1).change();
        }           
        frmRiskDetail.find("#Remaining_ReasonRatingDetail").val(data.remaining_reason_rating);

        var _tbBody = $('#auditControlTableDetail tbody');
        $("#auditControlTableDetail").dataTable().fnDestroy();
        _tbBody.html('');
        if (data.cat_control_list !== undefined && data.cat_control_list !== null) {
            var data_ = data.cat_control_list;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var tansuat = '';
                
                switch (obj.controlfrequency) {

                    case 1:
                        tansuat = "Mỗi khi phát sinh";
                        break;
                    case 2:
                        tansuat = "Nhiều lần trong ngày";
                        break;
                    case 3:
                        tansuat = "Hàng ngày";
                        break;
                    case 4:
                        tansuat = "Hàng tuần";
                        break;
                    case 5:
                        tansuat = "Hàng tháng";
                        break;
                    case 6:
                        tansuat = "Hàng quý";
                        break;
                    case 7:
                        tansuat = "Hàng năm";
                        break;
                }
                var loai = '';
                switch (obj.controltype) {

                    case 1:
                        loai = "Phòng ngừa";
                        break;
                    case 2:
                        loai = "Phát hiện";
                        break;
                   
                }
                var hinhthuc = '';
                switch (obj.controlformat) {

                    case 1:
                        hinhthuc = "Tự động";
                        break;
                    case 2:
                        hinhthuc = "Bán tự động";
                        break;
                    case 3:
                        hinhthuc = "Thủ công";
                        break;
                    
                }
                var html = '<tr>' +
                    '<td class="text-center">' + (i + 1) + '</td>' +
                    '<td class="line-break">' + obj.code + '</td>' +
                    '<td class="line-break">' + obj.description + '</td>' +
                    '<td class="line-break">' + tansuat +'</td>' +
                    '<td class="line-break">' + loai +'</td>' +
                    '<td class="line-break">' + hinhthuc +' </td>' +
                    '</tr>';
                _tbBody.append(html);
            }

        }
        $("#auditControlTableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        var tbBody = $('#auditProceduresTableDetail tbody');
        $("#auditProceduresTableDetail").dataTable().fnDestroy();
        tbBody.html('');
        if (data.list_program_procedures !== undefined && data.list_program_procedures !== null) {
            var data_ = data.list_program_procedures;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center" style="width: 3% !important;">' + (i + 1) + '</td>' +
                    '<td class="line-break"><input type="hidden" id="risk_scoring_id" name="risk_scoring_id" value="' + obj.id+'"/>' + obj.control_code + '</td>' +
                    '<td class="line-break">' + obj.code + '</td>' +
                    '<td class="line-break">' + obj.name + '</td>' +
                    '<td class="line-break">' + obj.description + '</td>' +
                    '<td><select class="form-control usersid" id="UsersDetail_' + i + '" name="UsersDetail_' + i + '" style="padding:0;"></td>' +                   
                    '</tr>';
                tbBody.append(html);
                if (obj.lst_auditor != undefined && obj.lst_auditor != null && obj.lst_auditor != "") {
                    var value = obj.lst_auditor;
                    var newOption = new Option(value.split(':')[1], value.split(':')[0], true, true);
                    $("#UsersDetail_" + i).append(newOption).trigger('change');
                }
                multipleselect("UsersDetail_" + i, "Chọn người thực hiện..", apiConfig.api.host_audit_service, apiConfig.api.auditwork.controller, apiConfig.api.auditwork.action.SelectAuditor.path);
                $("#UsersDetail_" + i).prop("disabled", true);
            }
        }
        $("#auditProceduresTableDetail").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 4, 5],
                    "searchable": false,
                    "orderable": false
                }
            ],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        getScorePotentialRiskDetail();
    }
}

function updateSuccess(data) {
    createdLog("Chương trình kiểm toán", "Cập nhật chương trình");
    //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("strHeader");
    setTimeout(function () {
        callBackViewEdit(9);
    }, 300);
}

var validateform;
var validateform1;
var validateform2;

$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#form-scoring-audit-work").validate({
        rules: {
            Potential_Possibility: { required: true},
            Potential_InfulenceLevel: { required: true },
            Potential_RiskRating: { required: true },
            Potential_ReasonRating: { required: true },
        },
        submitHandler: function () {
            var frmRiskDetail = $("#form-scoring-audit-work");

            var list_Procedures = [];
            $("#auditProceduresTable > tbody > tr").each(function (i, v) {
                var Procedures_item = {
                    id: $(v).find("#risk_scoring_id").val(),
                    auditor_id: $(v).find(".usersid").val(),
                }
                list_Procedures.push(Procedures_item);
            });
            var obj = {
                'id': frmRiskDetail.find("#IdProcess").val(),
                'audiit_scope_id': frmRiskDetail.find("#IdAuditScope").val(),
                'cat_risk_id': frmRiskDetail.find("#IdAuditRisk").val(),
                'potential_possibility': frmRiskDetail.find('#Potential_Possibility').val(),
                'potential_infulence_level': frmRiskDetail.find('#Potential_InfulenceLevel').val(),
                'potential_risk_rating': frmRiskDetail.find('#Potential_RiskRating').val(),
                'potential_risk_rating_name': frmRiskDetail.find('#Potential_RiskRating option:selected').text(),
                'potential_reason_rating': frmRiskDetail.find('#Potential_ReasonRating').val(),
                'audit_proposal': frmRiskDetail.find('#AuditProposal').prop("checked") == true ? 1 : 0,
                'remaining_possibility': frmRiskDetail.find('#Remaining_Possibility').val(),
                'remaining_infulence_level': frmRiskDetail.find('#Remaining_InfulenceLevel').val(),
                'remaining_risk_rating': frmRiskDetail.find('#Remaining_RiskRating').val(),
                'remaining_risk_rating_name': frmRiskDetail.find('#Remaining_RiskRating option:selected').text(),
                'remaining_reason_rating': frmRiskDetail.find("#Remaining_ReasonRating").val(),
                'list_procedures': list_Procedures,
            }
            if (frmRiskDetail.find('#IdProcess').val() === '0') {
                callApi_auditservice(
                    apiConfig.api.auditprogram.controller,
                    apiConfig.api.auditprogram.action.add.path,
                    apiConfig.api.auditprogram.action.add.method,
                    obj, 'updateSuccess', 'updateFail');
            }
            else {
                callApi_auditservice(
                    apiConfig.api.auditprogram.controller,
                    apiConfig.api.auditprogram.action.updateProcessRisk.path,
                    apiConfig.api.auditprogram.action.updateProcessRisk.method,
                    obj, 'updateSuccess', 'updateFail');
            }
        }
    });
    validateform1 = $("#formAddRisk").validate({
        rules: {
            DonViLienQuan: { required: true },
            //HoatDong: { required: true },
            QuyTrinh: { required: true },
            MaRuiRo: { required: true },
            MoTaRuiRo: { required: true },
            TenRuiRo: { required: true },
        },
        submitHandler: function () {
            var frmAddRisk = $("#formAddRisk");
            var frmDetail = $("#form-audit-program-edit");
            var obj = {
                'audit_work_scope_id': frmDetail.find("#Id").val(),
                'id': frmAddRisk.find("#Id").val(),
                'unitid': frmAddRisk.find("#DonViLienQuan").val(),
                'activationid': frmAddRisk.find("#HoatDong").val(),
                'processid': frmAddRisk.find('#QuyTrinh').val(),
                'relatestep': frmAddRisk.find('#BuocLienQuan').val(),
                'code': frmAddRisk.find('#MaRuiRo').val(),
                'name': frmAddRisk.find('#TenRuiRo').val(),
                'status': frmAddRisk.find('#TrangThai').val(),
                'description': frmAddRisk.find('#MoTaRuiRo').val(),
            }
            callApi_auditservice(
                apiConfig.api.auditprogram.controller,
                apiConfig.api.auditprogram.action.addauditrisk.path,
                apiConfig.api.auditprogram.action.addauditrisk.method,
                obj, 'updateRiskSuccess');
        }
    });
    validateform2 = $("#formAddProcedures").validate({
        rules: {
            DonViLienQuanProcedures: { required: true },
            /*HoatDongProcedures: { required: true },*/
            QuyTrinhProcedures: { required: true },
            MaRuiRoProcedures: { required: true },
            TenRuiRoProcedures: { required: true },
            MoTaRuiRoProcedures: { required: true },
            KiemSoatProcedures: { required: true },
        },
        submitHandler: function () {
            var frmAddProcedures = $("#formAddProcedures");
            var frmscope = $("#form-scoring-audit-work");
            var obj = {
                'risk_scoring_id': frmscope.find("#IdProcess").val(),
                'id': frmAddProcedures.find("#Id").val(),
                'unitid': frmAddProcedures.find("#DonViLienQuanProcedures").val(),
                'activationid': frmAddProcedures.find("#HoatDongProcedures").val(),
                'processid': frmAddProcedures.find('#QuyTrinhProcedures').val(),
                'control_id': frmAddProcedures.find('#KiemSoatProcedures').val(),
                'code': frmAddProcedures.find('#MaRuiRoProcedures').val(),
                'name': frmAddProcedures.find('#TenRuiRoProcedures').val(),
                'status': frmAddProcedures.find('#TrangThaiProcedures').val(),
                'description': frmAddProcedures.find('#MoTaRuiRoProcedures').val(),
            }
            callApi_auditservice(
                apiConfig.api.auditprogram.controller,
                apiConfig.api.auditprogram.action.addprocedures.path,
                apiConfig.api.auditprogram.action.addprocedures.method,
                obj, 'updateProceduresSuccess');
        }
    });
    $("#form-create-audit-program").validate({
        rules: {
            YearAuditWorkCreate: { required: true },
            FacilityAuditWorkCreate: { required: true },
            AuditWorkCreate: { required: true },
            ProcessAuditWorkCreate: { required: true },
        },
        submitHandler: function () {
            var frmAdd = $("#form-create-audit-program");
            var obj = {
                'auditwork_id': frmAdd.find("#AuditWorkCreate").val(),
                'auditprocess_id': frmAdd.find("#ProcessAuditWorkCreate").val(),
                'auditprocess_name': frmAdd.find("#ProcessAuditWorkCreate option:selected").text(),
                'auditfacilities_id': frmAdd.find("#FacilityAuditWorkCreate").val(),
                'auditfacilities_name': frmAdd.find("#FacilityAuditWorkCreate option:selected").text(),
                'year': frmAdd.find('#YearAuditWorkCreate').val(),
            }
            callApi_auditservice(
                apiConfig.api.auditprogram.controller,
                apiConfig.api.auditprogram.action.add.path,
                apiConfig.api.auditprogram.action.add.method,
                obj, 'createProgramSuccess');
        }
    });
    $('#modalCopyProgram').on('show.bs.modal', function (event) {
        document.getElementById("formCopyProgram").reset();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var year = button.data('year');
        var auditworkid = button.data('auditworkid');
        var auditfacilityid = button.data('auditfacilityid');
        var auditprocessid = button.data('auditprocessid');
        var modal = $(this);
        modal.find('#IdProgram').val(id);
        modal.find('#yearprogramcurrent').val(year).prop("disabled", true).change();
        modal.find('#auditworkcurrent').val(auditworkid).prop("disabled", true).change();
        modal.find('#unitcurrent').val(auditfacilityid).prop("disabled", true).change();
        modal.find('#processcurrent').val(auditprocessid).prop("disabled", true).change();

    });
    $("#formCopyProgram").validate({
        rules: {
            yearcopynew: { required: true },
            auditworkcopynew: { required: true },
            unitcopynew: { required: true },
            processcopynew: { required: true },
        },
        submitHandler: function () {
            var frmAdd = $("#formCopyProgram");
            var auditworkcurrent = frmAdd.find("#auditworkcurrent").val();
            var auditworkcopynew = frmAdd.find("#auditworkcopynew").val();
            var unitcurrent = frmAdd.find("#unitcurrent").val();
            var processcurrent = frmAdd.find("#processcurrent").val();
            var unitcopynew = frmAdd.find("#unitcopynew").val();
            var processcopynew = frmAdd.find("#processcopynew").val();
            var obj = {
                'id': frmAdd.find("#IdProgram").val(),
                'year': frmAdd.find("#yearcopynew").val(),
                'auditwork_id': frmAdd.find("#auditworkcopynew").val(),
                'auditwork_name': frmAdd.find("#auditworkcopynew option:selected").text(),              
                'auditfacilities_id': frmAdd.find("#unitcopynew").val(),
                'auditfacilities_name': frmAdd.find("#unitcopynew option:selected").text(),
                'auditprocess_id': frmAdd.find("#processcopynew").val(),
                'auditprocess_name': frmAdd.find("#processcopynew option:selected").text(),
            }
            if (unitcurrent == unitcopynew && processcurrent == processcopynew) {
                if (auditworkcurrent == auditworkcopynew) {
                    toastr.error("Trùng cuộc kiểm toán với đối tượng sao chép", "Lỗi!", { progressBar: true });
                    return false;
                }
                else {
                    callApi_auditservice(
                        apiConfig.api.auditprogram.controller,
                        apiConfig.api.auditprogram.action.copy.path,
                        apiConfig.api.auditprogram.action.copy.method,
                        obj, 'copyProgramSuccess');
                }
            }
            else {
                if (unitcurrent !== unitcopynew && processcurrent !== processcopynew) {
                    toastr.error("Đơn vị và quy trình không trùng với  đối tượng sao chép", "Lỗi!", { progressBar: true });
					return false;
                }
                if (unitcurrent !== unitcopynew) {
                    toastr.error("Đơn vị không trùng với đối tượng sao chép", "Lỗi!", { progressBar: true });
					return false;
                }
                if (processcurrent !== processcopynew) {
                    toastr.error("Quy trình không trùng với đối tượng sao chép", "Lỗi!", { progressBar: true });
					return false;
                }
            }
        }
    });
});

function createProgramSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Thêm chương tình kiểm toán");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        setTimeout(function () {
            location.href = '/AuditProgram';
        }, 100);
    }
    else {
        //swal(localizationResources.Error, "Thêm rủi ro không thành công!", "error");
        toastr.error("Thêm chương tình kiểm toán không thành công!", "Lỗi!", { progressBar: true });
    }
}
function copyProgramSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Sao chép chương tình kiểm toán");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success("Sao chép chương tình kiểm toán thành công", "Thành công!", { progressBar: true });
        $('#modalCopyProgram .close').click();
        setTimeout(function () {
            location.href = '/AuditProgram';
        }, 100);
    }
    else if (rspn.code === '0') {
     
        toastr.error("Trùng cuộc kiểm toán. Sao chép chương tình kiểm toán không thành công!", "Lỗi!", { progressBar: true });;
    }
    else {
        toastr.error("Sao chép chương tình kiểm toán không thành công!", "Lỗi!", { progressBar: true });
    }
}
function updateRiskSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Thêm rủi ro");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        callBackViewEdit(9);
    }
    else if (rspn.code === '0') {
        //swal(localizationResources.Error, "Mã rủi ro đã tồn tại", "error");
        toastr.error("Mã rủi ro đã tồn tại", "Lỗi!", { progressBar: true });
    }
    else {
        //swal(localizationResources.Error, "Thêm rủi ro không thành công!", "error");
        toastr.error("Thêm rủi ro không thành công!", "Lỗi!", { progressBar: true });
    }    
}

function updateProceduresSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Thêm thủ tục");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        callBackView(3);
    }
    else if (rspn.code === '0') {
        //swal(localizationResources.Error, "Mã thủ tục đã tồn tại", "error");
        toastr.error("Mã thủ tục đã tồn tại", "Lỗi!", { progressBar: true });
    }
    else {
        //swal(localizationResources.Error, "Thêm thủ tục không thành công!", "error");
        toastr.error("Thêm thủ tục không thành công!", "Lỗi!", { progressBar: true });
    }
   
}

function AddRiskLib() {
    var frmDetail = $("#form-audit-program-edit");
    var obj = {
        'scope_id': frmDetail.find("#Id").val(),
        'unitid': frmDetail.find("#DonViKiemToanEditID").val(),
        'processid': frmDetail.find('#QuyTrinhEditID').val(),

    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.addrisklib.path,
        apiConfig.api.auditprogram.action.addrisklib.method,
        obj, 'addrisklibSuccess');
}

function addrisklibSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Lấy rủi ro từ thư viện");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        setTimeout(function () {
            var param = $("#form-audit-program-edit").find("#Id").val();
            openView(9, param);
        }, 300);
    }
    else {
        //swal("Lỗi!", "Lấy rủi ro từ thư viện không thành công!", "error");
        toastr.error("Lấy rủi ro từ thư viện không thành công!", "Lỗi!", { progressBar: true });
    }
}

function AddProceduresLib() {
    var frmDetail = $("#form-scoring-audit-work");
    var obj = {
        'cat_risk_id': frmDetail.find("#IdAuditRisk").val(),
        'process_risk_id': frmDetail.find('#IdProcess').val(),

    }
    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.addprocedureslib.path,
        apiConfig.api.auditprogram.action.addprocedureslib.method,
        obj, 'addProcedureslibSuccess');
}

function addProcedureslibSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Chương trình kiểm toán", "Lấy thủ tục từ thư viện");
        //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        callBackView(3);
    }
    else {
        //swal("Lỗi!", "Lấy rủi ro từ thư viện không thành công!", "error");
        toastr.error("Lấy thủ tục từ thư viện không thành công!", "Lỗi!", { progressBar: true });
    }

}

function getScorePotentialRisk() {
    var Potential_Possibility = $("#Potential_Possibility").val() == "" || $("#Potential_Possibility").val() == undefined ? 0 : parseInt($("#Potential_Possibility").val());
    var Potential_InfulenceLevel = $("#Potential_InfulenceLevel").val() == "" || $("#Potential_InfulenceLevel").val() == undefined ? 0 : parseInt($("#Potential_InfulenceLevel").val());
    var ScorePotentialRisk = Potential_Possibility * Potential_InfulenceLevel;
    $("#ScorePotentialRisk").val(ScorePotentialRisk);
}

function getScorePotentialRiskDetail() {
    var Potential_Possibility = $("#Potential_PossibilityDetail").val() == "" || $("#Potential_PossibilityDetail").val() == undefined ? 0 : parseInt($("#Potential_PossibilityDetail").val());
    var Potential_InfulenceLevel = $("#Potential_InfulenceLevelDetail").val() == "" || $("#Potential_InfulenceLevelDetail").val() == undefined ? 0 : parseInt($("#Potential_InfulenceLevelDetail").val());
    var ScorePotentialRisk = Potential_Possibility * Potential_InfulenceLevel;
    $("#ScorePotentialRiskDetail").val(ScorePotentialRisk);
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

function fnGetDataRiskForProduce(param) {

    callApi_auditservice(
        apiConfig.api.auditprogram.controller,
        apiConfig.api.auditprogram.action.getItemProcessRisk.path + "/" + param,
        apiConfig.api.auditprogram.action.getItemProcessRisk.method,
        null, 'fnGetDetailRiskForProduceSuccess', 'msgError');
}

function fnGetDetailRiskForProduceSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var tbBody = $('#auditProceduresTable tbody');
        $("#auditProceduresTable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.list_program_procedures !== undefined && data.list_program_procedures !== null) {
            var data_ = data.list_program_procedures;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var _name = "'" + obj.name + "'";
                var html = '<tr>' +
                    '<td class="text-center" style="width: 3% !important;">' + (i + 1) + '</td>' +
                    '<td class="line-break"><input type="hidden" id="risk_scoring_id" name="risk_scoring_id" value="' + obj.id + '"/>' + obj.control_code + '</td>' +
                    '<td class="line-break">' + obj.code + '</td>' +
                    '<td class="line-break">' + obj.name + '</td>' +
                    '<td class="line-break">' + obj.description + '</td>' +
                    '<td><select class="form-control usersid" id="Users_' + i + '" name="Users_' + i + '" style="padding:0;"></td>' +
                    '<td class="col-action">' +
                    '<a class="btn icon-delete btn-action-custom" onclick="DeleteProcedures(' + obj.id + ',' + _name + ')" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
                if (obj.lst_auditor != undefined && obj.lst_auditor != null && obj.lst_auditor != "") {
                    var value = obj.lst_auditor;
                    var newOption = new Option(value.split(':')[1], value.split(':')[0], true, true);
                    $("#Users_" + i).append(newOption).trigger('change');
                }
                multipleselect("Users_" + i, "Chọn người thực hiện..", apiConfig.api.host_audit_service, apiConfig.api.auditwork.controller, apiConfig.api.auditwork.action.SelectAuditor.path);
            }
        }
        $("#auditProceduresTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [
                {
                    "targets": [0, 4, 5],
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

//Bổ sung chức năng sao chép chương trình kiểm toán

function ExportInlist(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.auditprogram.controller + apiConfig.api.auditprogram.action.exportexcel.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_ChuongTrinhKiemToan.xlsx";
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


