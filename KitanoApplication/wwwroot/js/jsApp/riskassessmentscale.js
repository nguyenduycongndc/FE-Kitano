function createdLog(_module, _perform_tasks) {
    var obj = {
        module: _module,
        perform_tasks: _perform_tasks,
    };
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.add.path,
        apiConfig.api.systemlog.action.add.method,
        obj,
        "",
        ""
    );
}

$(function () {
    ////loginTest();
    ////$("#tblResultActivity").dataTable({
    ////    "bPaginate": false,
    ////    "bLengthChange": false,
    ////    "bFilter": false,
    ////    "bInfo": false,
    ////    "ordering": false
    ////});

    reCalculatPagesCustom(0);
    viewBtnActionPage();

    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            parentLoaded = false;
            classTypeLoaded = false;
            getRiskIssue();
            loadCategory();
            var myVar1 = setInterval(function () {
                if (!parentLoaded || !classTypeLoaded)
                    return;
                else {
                    triggerOpenFormEdit('edit', idViewEdit());
                    clearInterval(myVar1);
                }
            }, 100);
        }
        else if (isViewDetail()) {
            parentLoaded = false;
            classTypeLoaded = false;
            getRiskIssue();
            loadCategory();
            var myVar2 = setInterval(function () {
                if (!parentLoaded || !classTypeLoaded)
                    return;
                else {
                    triggerOpenFormEdit('view', idViewDetail());
                    clearInterval(myVar2);
                }
            }, 100);
        }
    }, 100);

    $('.for-quality').hide();
    $('.for-quantity').hide();
});

var parentLoaded = false;
var classTypeLoaded = false;
var fileUpload = '';

function onOpenCreate(ele) {
    parentLoaded = false;
    classTypeLoaded = false;
    getRiskIssue();
    loadCategory();
    var myVar = setInterval(function () {
        if (!parentLoaded || !classTypeLoaded)
            return;
        else {
            onViewModalCreate(ele);
            clearInterval(myVar);
        }
    }, 100);
}

function fillRiskIssueCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#risk_issue').html('');
    $('#risk_issue').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0) {
        parentLoaded = true;
        return;
    }
       
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#risk_issue').append(html);
    $('#risk_issue option[data-method_id="2"]').prop("disabled", true);
    parentLoaded = true;
}

function getRiskIssue() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.riskissue.controller,
        apiConfig.api.riskissue.action.search.path,
        apiConfig.api.riskissue.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillRiskIssueCombo');
}

function fillUpperCondition(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#max_condition').html('');
    $('#max_condition').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0) {
        classTypeLoaded = true;
        return;
    }
       
    for (let item of data.data) {
        var obj = item;
        var html = '<option value="' + obj.id + '">' + obj.name + '</option>';
        $('#max_condition').append(html);
    }
    classTypeLoaded = true;
}

function fillLowerCondition(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#min_condition').html('');
    $('#min_condition').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    for (let item of data.data) {
        var obj = item;
        var html = '<option value="' + obj.id + '">' + obj.name + '</option>';
        $('#min_condition').append(html);
    }
    classTypeLoaded = true;
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.dieukienTren }, 'fillUpperCondition');
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.dieukienDuoi }, 'fillLowerCondition');
}

function changeCheckAll(ele) {
    $('#risk_issue').prop('disabled', false);
    $('#risk_issue').parent().find('label').addClass('required');
    if (ele.checked) {
        $('#risk_issue').prop('disabled', true);
        $('#risk_issue').val('');
        $('#risk_issue').parent().find('label').removeClass('required');
    }
}

function onViewModalCreate(ele) {
    clearMsgInvalid();
    var button = $(ele);
    var recipient = button.data('whatever');
    var action = button.data('action');
    triggerOpenFormEdit(action, recipient);
}
function triggerOpenFormEdit(action, recipient) {
    var modal = $('#card-update');
    var cardManag = $('#card-index');
    var headerManager = $('#header-manager');
    var headerUpdate = $('#header-update');
    var headerCreate = $('#header-create');
    modal.show();
    cardManag.hide();
    fnChangeHeader(action);

    if (recipient > 0) {
        headerManager.hide();
        headerCreate.hide();
        headerUpdate.show();
    }
    else {
        headerManager.hide();
        headerCreate.show();
        headerUpdate.hide();
    }

    modal.find('form input.modal-identity-value').val(recipient);
    if (action == 'view') {
        modal.find('form input,select,textarea').prop('disabled', true);
        modal.find('#btnSubmit').hide();
        modal.find('.only-view').removeClass('d-none');
        location.hash = 'view-' + recipient;
    }
    else {
        modal.find('form input,select,textarea').prop('disabled', false);
        modal.find('#btnSubmit').show();
        modal.find('.only-view').addClass('d-none');
        location.hash = 'edit-' + recipient;
    }

    if (recipient > 0) loadDataItem(recipient);
    else viewDataItem(null);
}

function loadDataItem(id) {
    callApi(
        apiConfig.api.riskassessmentscale.controller,
        apiConfig.api.riskassessmentscale.action.getItem.path + "/" + id,
        apiConfig.api.riskassessmentscale.action.getItem.method,
        {}, 'exDataItem');
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function checkNullOrUndefined(obj) {
    return obj == undefined || obj == null
        || obj.id == undefined || obj.id == null || obj.id == '' ? '' : obj.id;
}
function viewDataItem(obj) {
    if (obj == undefined || obj == null) {
        $('#id').val(0);
        $('#risk_issue').val('');
        $('#point').val('');
        $('#status').val(1);
        $('#condition').val('');
        $('#max_value').val('');
        $('#max_condition').val('');
        $('#min_value').val('');
        $('#min_condition').val('');

        $('#create_user').val('');
        $('#create_date').val('');
        $('#modified_user').val('');
        $('#modified_date').val('');

        $('#risk_issue').trigger('change');
    }
    else {
        $('#id').val(obj.id);
        $('#condition').val(obj.condition);
        $('#status').val(obj.status == "1" ? 1 : 0);
        $('#point').val(obj.point);

        var riskId = checkNullOrUndefined(obj.risk_issue);
        $('#risk_issue').val(riskId);


        var maxId = checkNullOrUndefined(obj.max_condition);
        $('#max_condition').val(maxId);
        $('#max_value').val(maxId == '' ? '' : obj.max_value);


        var minId = checkNullOrUndefined(obj.min_condition);
        $('#min_condition').val(minId);
        $('#min_value').val(minId == '' ? '' : obj.min_value);

        $('#create_user').val(obj.name_create);
        $('#create_date').val(obj.create_date_str);
        $('#modified_user').val(obj.name_modified);
        $('#modified_date').val(obj.last_modified_str);

        $('#risk_issue').trigger('change');
        var checkOption = $('#risk_issue option[value=' + riskId + ']').length;

        if (checkOption == 0) {
            setTimeout(function () { /*swal('Error', getStatusCode('206'), "error")*/ toastr.error(getStatusCode('206'), 'Error', { progressBar: true }) }, 200);
        }
    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
        if (data.id > 0) {
            createdLog("Thang điểm chấm điểm", "Chỉnh sửa thang điểm chấm điểm");
        } else {
            createdLog("Thang điểm chấm điểm", "Thêm mới thang điểm chấm điểm");
        }
        onBack();
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function fnSaveItemInfo() {
    var obj = {
        'id': $('#id').val(),
        'risk_issue': { 'id': $('#risk_issue').val() },
        'point': $('#point').val(),
        'status': $('#status').val() == '1',
        'condition': $('#condition').val(),
        'max_value': $('#max_value').val(),
        'max_condition': { 'id': $('#max_condition').val() },
        'min_value': $('#min_value').val(),
        'min_condition': { 'id': $('#min_condition').val() }
    };

    if (validateRequired("#form-modify")) {
        callApi(
            apiConfig.api.riskassessmentscale.controller,
            apiConfig.api.riskassessmentscale.action.update.path,
            apiConfig.api.riskassessmentscale.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Thang điểm chấm điểm", "Xóa thang điểm chấm điểm");
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: "Xác nhận?",
        text: localizationResources.DoDelete + title + localizationResources.AndSub,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
        closeOnConfirm: true
    },
        function () {
            var obj = {
                'id': id
            };
            callApi(
                apiConfig.api.riskassessmentscale.controller,
                apiConfig.api.riskassessmentscale.action.delete.path,
                apiConfig.api.riskassessmentscale.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function getcondition(obj) {
    if (obj.risk_issue == null)
        return '';
    if (obj.risk_issue.method_id == 1)
        return obj.condition;
    var min = '';
    var max = '';
    if (obj.min_value != null && obj.lower_condition != '')
        min = obj.min_value + " " + (obj.lower_condition_name == ">" ? "<" : "<=");
    if (obj.max_value != null && obj.upper_condition != '')
        max = obj.upper_condition_name + " " + obj.max_value;
    return min + " Giá trị " + max;
}
function renderhtml(obj, prId, index) {
    var html = '';
    var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
    rowCls += obj.status ? '' : ' table-warning'
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + rowNo($("#txtCurrentPage").val(), $("#cbPageSize").val(), index) + '</td>' +
        '<td>' + getCode(obj.risk_issue) + '</td>' +
        '<td>' + getName(obj.risk_issue) + '</td>' +
        '<td>' + getcondition(obj) + '</td>' +
        '<td>' + obj.point + '</td>' +
        '<td>' + (obj.risk_issue == null ? '' : getScoreMethod(obj.risk_issue.method_id)) + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_RAS', 'PER_DETAIL') === true)
        html += '<a   class="btn icon-default btn-action-custom" onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a   class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_RAS', 'PER_EDIT') === true)
        html += '<a   class="btn icon-default btn-action-custom" onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a   class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_RAS', 'PER_DEL') === true)
        html += '<a href="javascript:cfDelete(\'' + getName(obj.risk_issue) + '\',' + obj.id + ')" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    html += '</td>' +
        '</tr>';
    return html;
}
function getHtmlChild(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;';
    }
    var html = '';
    var index = 0;
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = 'collapRow' + obj.id;
            ////var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
            ////    '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' + colId + '">'
            ////    + '<i class="fa fa-minus-square" aria-hidden="true"></i></button>';
            html += renderhtml(obj, prId, index);
            index++
            if (obj.sub_activities != undefined && obj.sub_activities != null)
                html += getHtmlChild(obj.sub_activities, prId + ' ' + colId, n + 1);
        }
    }
    return html;
}

function fnSearchSuccess(rspn) {
    dataList.Total = rspn.total;
    var tbBody = $('#tblResultActivity tbody');
    $("#tblResultActivity").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var html = getHtmlChild(data, '', 0);
        tbBody.append(html);

        $("#tblResultActivity").dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "ordering": false
        });
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
        collapseDelegate();
        triggerChangeHeader();
    }
}

function onSearch() {
    var obj = {
        'key': $('#search-key').val(),
        'code': $('#search-code').val(),
        'status': isNaN(parseInt($('#search-status').val())) ? 1 : parseInt($('#search-status').val()),
        'point': isNaN(parseInt($('#search-point').val())) ? 0 : parseInt($('#search-point').val()),
        'method': isNaN(parseInt($('#search-method').val())) ? -1 : parseInt($('#search-method').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.riskassessmentscale.controller,
        apiConfig.api.riskassessmentscale.action.search.path,
        apiConfig.api.riskassessmentscale.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

////function btnOnSearch() {
////    $("#txtCurrentPage").val(1);
////    onSearch();
////}

function changeRiskIssuesMethod(ele) {
    var methodId = $(ele).find(':selected').data('method_id');
    changeMethodAuto(parseInt(methodId));
}

function changeMethodAuto(methodId) {
    $('.for-quality').hide();
    $('.for-quantity').hide();
    if (methodId === 0) {
        $('.for-quantity').show();
        $('.for-quantity .unrequired').removeClass('unrequired').addClass('required');
        $('.for-quality .required').removeClass('required').addClass('unrequired');
    }
    else if (methodId === 1) {
        $('.for-quality').show();
        $('.for-quality .unrequired').removeClass('unrequired').addClass('required');
        $('.for-quantity .required').removeClass('required').addClass('unrequired');
    }
}

function openFormUpload(isOpen) {
    var modal = $('#card-index');
    var cardManag = $('#card-upload');
    var headerManager = $('#header-manager');
    var headerUpdate = $('#header-import');

    if (isOpen) {
        headerManager.hide();
        headerUpdate.show();
        modal.hide();
        cardManag.show();
    }
    else {
        headerManager.show();
        headerUpdate.hide();
        modal.show();
        cardManag.hide();
    }
}

function viewDataUpload(rspn) {
    var tbBody = $('#tblUpload tbody');
    $("#tblUpload").dataTable().fnDestroy();
    tbBody.html('');
    fileUpload = rspn.fileName;
    var hasError = false;
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var trClass = data[i].note == null || data[i].note.isBlank() ? '' : 'table-danger';
            if (!hasError && data[i].note != null && !data[i].note.isBlank())
                hasError = true;
            str += '<tr class="' + trClass + '">'
                + '<td class="text-center">' + (i + 1) + '</td>'
                + '<td>' + getCode(data[i].risk_issue) + '</td>'
                + '<td>' + data[i].condition + '</td>'
                + '<td>' + data[i].point + '</td>'
                + '<td>' + data[i].note + '</td>'
                + '</tr>';
        }
        tbBody.append(str);

        $("#tblUpload").dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "ordering": false
        });
    }
    if (hasError)
        ////swal("Error!", localizationResources.ExcelError, "error");
        toastr.error(localizationResources.ExcelError, "Error!", { progressBar: true });
    else
        ////swal("Successfully!", localizationResources.Import + ' ' + localizationResources.Successfully, "success");
        toastr.success(localizationResources.Import + ' ' + localizationResources.Successfully, "Successfully!", { progressBar: true });
}

function fnUploadFile() {
    var input = document.getElementById('fileToImport');

    if (input.files && input.files[0]) {
        var ext = $('#fileToImport').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['xlsx', 'xls']) == -1) {
            ////swal("Error!", localizationResources.ExcelAllow, "error");
            toastr.error(localizationResources.ExcelAllow, "Error!", { progressBar: true });
            return;
        }

        var formData = new FormData();
        var imageFile = input.files[0];
        formData.append("fileUpload", imageFile);

        callUpload(apiConfig.api.riskassessmentscale.controller,
            apiConfig.api.riskassessmentscale.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.riskassessmentscale.controller + '/Download?code=' + code.code, 'Download');
}

function downloadTemp() {
    callApi(apiConfig.api.riskassessmentscale.controller, '/DownloadTemp', 'GET', { 'fileName': 'RiskAssessmentScale.xlsx' }, 'canDownload');
}
window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 100);
}