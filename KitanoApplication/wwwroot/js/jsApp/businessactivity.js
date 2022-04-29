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

var parentLoaded = false;
var fileUpload = '';

$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();

    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            
            parentLoaded = false;
            clearMsgInvalid();
            getActivities();
            var myVar1 = setInterval(function () {
                if (!parentLoaded)
                    return;
                else {
                    triggerOpenFormEdit('edit', idViewEdit());
                    clearInterval(myVar1);
                }
            }, 100);

        }
        else if (isViewDetail()) {
            parentLoaded = false;
            clearMsgInvalid();
            getActivities();
            var myVar2 = setInterval(function () {
                if (!parentLoaded)
                    return;
                else {
                    triggerOpenFormEdit('view', idViewDetail());
                    clearInterval(myVar2);
                }
            }, 100);

        }
    }, 200);
});


function fillActivityCombo(data) {
    $('#parent').html('');
    $('#parent').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0) {
        parentLoaded = true;
        return;
    }
    var html = generateComboOptions(data.data, 0, 'sub_activities', "ancestor");
    $('#parent').append(html);
    parentLoaded = true;
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

function onOpenCreate(ele) {
    
    clearMsgInvalid();
    parentLoaded = false;
    getActivities();
    var myVar = setInterval(function () {
        if (!parentLoaded)
            return;
        else {
            
            onViewModalCreate(ele);
            clearInterval(myVar);
        }
    }, 100);
}

function onViewModalCreate(ele) {
    var button = $(ele);
    debugger
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
    var headerDetail = $('#header-detail');
    modal.show();
    cardManag.hide();
    fnChangeHeader(action);

    if (recipient > 0) {
        headerManager.hide();
        headerCreate.hide();
        if (action == 'view')
            headerDetail.show();
        else
            headerUpdate.show();
    }
    else {
        headerManager.hide();
        headerCreate.show();
        headerUpdate.hide();
        headerDetail.hide();
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

function openFormUpload(isOpen) {
    var modal = $('#card-index');
    var cardUpload = $('#card-upload');

    var headerManager = $('#header-manager');
    var headerUpdate = $('#header-update');
    var headerCreate = $('#header-create');
    var headerDetail = $('#header-detail');
    var headerImport = $('#header-import');
    $("input#fileToImport").val("");
    if (isOpen) {
        $("input#fileToImport").val("");
        headerManager.hide();
        headerImport.show();
        headerDetail.hide();
        headerCreate.hide();
        modal.hide();
        cardUpload.show();
        location.hash = 'import';
    }
    else {
        headerManager.show();
        headerUpdate.hide();
        headerCreate.hide();
        headerDetail.hide();
        headerImport.hide();
        modal.show();
        cardUpload.hide();
        onFocus('#card-upload');
        location.hash = '';
    }
}

function renderhtml_upload(trClass, obj, index) {
    return '<tr class="' + trClass + '">'
        + '<td class="text-center">' + (index + 1) + '</td>'
        + '<td>' + viewValue(obj.code) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.parent_code) + '</td>'
        + '<td>' + viewValue(obj.description) + '</td>'
        + '<td>' + viewValue(getImportResult(obj.note)) + '</td>'
        + '</tr>';
}
function checkerror(hasError, rspn) {
    if (hasError)
        ////swal("Error!", localizationResources.ExcelError, "error");
        toastr.error(localizationResources.ExcelError, "Error!", { progressBar: true });
    else if (rspn.total > 0 && rspn.code == 1)
        ////swal("Successfully!", localizationResources.Import + ' ' + localizationResources.Successfully, "success");
        toastr.success(localizationResources.Import + ' ' + localizationResources.Successfully, "Successfully!", { progressBar: true });
    else if (rspn.code == "800")
        ////swal("Error!", localizationResources.Error800, "error");
        toastr.error(localizationResources.Error800, "Error!", { progressBar: true });
    else
        ////swal("Error!", localizationResources.NoDataImport, "error");
        toastr.error(localizationResources.NoDataImport, "Error!", { progressBar: true });
}
function viewDataUpload(rspn) {
    var tbBody = $('#tblUpload tbody');
    tbBody.html('');
    fileUpload = rspn.fileName;
    var hasError = false;
    var index = 0;
    if (rspn != undefined && rspn != null && (rspn.code == 1 || rspn.code == "800") && rspn.total > 0) {
        var data = rspn.data;
        var str = '';
        for (let item of data) {
            var trClass = item.note == null || item.note.isBlank() || item.note == '000' ? '' : 'table-danger';
            if (!hasError && item.note != null && !item.note.isBlank() && item.note != '000')
                hasError = true;
            str += renderhtml_upload(trClass, item, index);
        }

        tbBody.append(str);

    }
    checkerror(hasError, rspn);
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

        callUpload(apiConfig.api.bussinessactivity.controller,
            apiConfig.api.bussinessactivity.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.bussinessactivity.controller + '/Download?code=' + code.code, 'Download');
}

function downloadTemp() {
    callApi(apiConfig.api.bussinessactivity.controller, '/DownloadTemp', 'GET', { 'fileName': 'AuditActivities.xlsx' }, 'canDownload');
}

function loadDataItem(id) {
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.getItem.path + "/" + id,
        apiConfig.api.bussinessactivity.action.getItem.method,
        {}, 'exDataItem');
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function viewDataItem(obj) {
    $('#parent option').prop('disabled', false);

    if (obj == undefined || obj == null) {
        $('#id').val(0);
        $('#name').val('');
        $('#code').val('');
        $('#status').val(1);
        $('#description').val('');
        $('#parent').val(0);

        $('#create_user').val('');
        $('#create_date').val('');
        $('#modified_user').val('');
        $('#modified_date').val('');
    }
    else {
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#code').val(obj.code);

        $('#create_user').val(obj.name_create);
        $('#create_date').val(obj.create_date_str);
        $('#modified_user').val(obj.name_modified);
        $('#modified_date').val(obj.last_modified_str);

        $('#status').val(obj.status == '1' ? 1 : 0);
        $('#description').val(obj.description);

        var parentId = obj.parent == undefined || obj.parent == null
            || obj.parent.id == undefined || obj.parent.id == null || obj.parent.id == '' ? 0 : obj.parent.id;
        $('#parent').val(parentId);
        $('#parent option[value=' + obj.id + ']').prop('disabled', true);
        $('#parent option[data-ancestor*="' + ("|" + obj.id + "|") + '"]').prop('disabled', true);

    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Successfully, localizationResources.UpdateSuccess, "success");
        toastr.success(localizationResources.UpdateSuccess, localizationResources.Successfully, { progressBar: true })
        if (data.id > 0) {
            createdLog("Hoạt động", "Chỉnh sửa hoạt động");
        } else {
            createdLog("Hoạt động", "Thêm mới hoạt động");
        }
        onBack();
        onSearch();
        getActivities();
    }
    else {
        ////swal('Error', getStatusCode(data.code), "error");
        toastr.error(getStatusCode(data.code), 'Error', { progressBar: true })
    }
}

function fnSaveItemInfo() {
    if ($('#status').val() != '1') {
        swal({
            title: localizationResources.Confirm,
            text: localizationResources.ConfirmDisable,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: localizationResources.Accept,
            cancelButtonText: localizationResources.Cancel,
            closeOnConfirm: true
        },
            function () {
                cfSaveDisabled();
            });
    }
    else cfSaveDisabled();
}

function cfSaveDisabled() {
    var obj = {
        'id': $('#id').val(),
        'code': $('#code').val(),
        'name': $('#name').val(),
        'parent': { 'id': $('#parent').val() },
        'status': $('#status').val() == '1',
        'description': $('#description').val()
    };
    if (validateRequired('#card-update')) {
        callApi(
            apiConfig.api.bussinessactivity.controller,
            apiConfig.api.bussinessactivity.action.update.path,
            apiConfig.api.bussinessactivity.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Hoạt động", "Xóa hoạt động");
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: localizationResources.Confirm,
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
                apiConfig.api.bussinessactivity.controller,
                apiConfig.api.bussinessactivity.action.delete.path,
                apiConfig.api.bussinessactivity.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function renderhtml(obj, prId, nbsp, colId) {
    var html = "";
    var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? (obj.parent_id == 0 ? 'row-parent' : '') : 'row-parent';
    var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
        '<button style="padding: 0" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
        + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + nbsp + btnShow + '</td>' +
        '<td>' + viewValue(obj.code) + '</td>' +
        '<td>' + viewValue(obj.name) + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_BA', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"  class="btn icon-default btn-action-custom" onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"   class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_BA', 'PER_EDIT') === true)
        html += '<a class="btn icon-default btn-action-custom"  class="btn icon-default btn-action-custom" onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"   class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_BA', 'PER_DEL') === true)
        html += '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    html += '</td>' +
        '</tr>';
    return html;
}
function getHtmlChild(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&emsp;&emsp;';
    }
    var html = '';
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = 'collapRow' + obj.id;
            html += renderhtml(obj, prId, nbsp, colId);
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
    }
    $("#tblResultActivity").dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "ordering": false,
        'bAutoWidth': false
    });
    reCalculatPagesCustom(rspn.total);
    viewBtnActionPage();
    collapseDelegate();
    triggerChangeHeader();
}

function onSearch() {
    var obj = {
        'key': $('#search-key').val(),
        'code': $('#search-code').val(),
        'status': isNaN(parseInt($('#search-status').val())) ? 1 : parseInt($('#search-status').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

////function btnOnSearch() {
////    $("#txtCurrentPage").val(1);
////    onSearch();
////}
function checkSameId() {
    var mainId = $("#card-update").find("#id").val();
    var selected = $("#card-update").find("#parent").val();
    if (mainId == selected) {
        toastr.error("Không thể chọn Hoạt động cha", 'Error', { progressBar: true });
        $("#card-update").find("#parent").val("0");
    }
}
window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 100);
}