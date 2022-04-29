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
    reCalculatPages();
    viewBtnActionPage();
    setTimeout(getParents, 110);
    setTimeout(loadCategory, 100);


    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            triggerOpenFormEdit('edit', idViewEdit());
        }
        else if (isViewDetail()) {
            triggerOpenFormEdit('view', idViewDetail());
        }
    }, 200);
});

function onOpenCreate(ele) {
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

function fillParentCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-parent').html('');
    $('#parent').html('');
    $('#search-parent').append(htmlOption);
    $('#parent').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'childs', "ancestor");
    $('#search-parent').append(html);
    $('#parent').append(html);

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

function fillCategoryCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#objectcls').html('');
    $('#search-class').html('');
    $('#objectcls').append(htmlOption);
    $('#search-class').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    for (let item of data.data) {
        var obj = item;
        var html = '<option value="' + obj.id + '">' + obj.name + '</option>';
        $('#objectcls').append(html);
        $('#search-class').append(html);
    }
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.unitTypes.path,
        apiConfig.api.common.action.unitTypes.method,
        {}, 'fillCategoryCombo');
}

function loadDataItem(id) {
    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.getItem.path + "/" + id,
        apiConfig.api.auditfacility.action.getItem.method,
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
        $('#parent').val('');
        $('#objectcls').val('');

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
        var parentId = obj.parent_id == undefined || obj.parent_id == null || obj.parent_id == '' ? 0 : obj.parent_id;
        var objectcls = obj.object_class_id == undefined || obj.object_class_id == null || obj.object_class_id == '' ? 0 : obj.object_class_id;
        $('#parent').val(parentId);
        $('#parent option').prop('disabled', false);
        $('#parent option[value=' + obj.id + ']').prop('disabled', true);
        $('#parent option[data-ancestor*="' + ("|" + obj.id + "|") + '"]').prop('disabled', true);

        $('#objectcls').val(objectcls);
    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
        if (data.id > 0) {
            createdLog("Quy trình", "Chỉnh sửa quy trình");
        } else {
            createdLog("Quy trình", "Thêm mới quy trình");
        }
        $('#modelUpdateItem').modal('hide');
        onSearch();
        getParents();
        onBack();
    }
    else {
        ////swal("Error!", getStatusCode(data.code), "error");
        toastr.error(getStatusCode(data.code), "Error!", { progressBar: true });
    }
}

function cfSaveDisabled() {
    var obj = {
        'id': $('#id').val(),
        'name': $('#name').val(),
        'code': $('#code').val(),
        'parent_id': $('#parent').val(),
        'object_class_id': $('#objectcls').val(),
        'status': $('#status').val() == '1',
        'description': $('#description').val()
    };
    obj.parent_id = obj.parent_id == '' ? 0 : obj.parent_id;

    if (validateRequired("#form-modify")) {
        callApi(
            apiConfig.api.auditfacility.controller,
            apiConfig.api.auditfacility.action.update.path,
            apiConfig.api.auditfacility.action.update.method,
            obj, 'updateSuccess', 'updateFail');
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

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Quy trình", "Xóa quy trình");
        onSearch();
        getParents();
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
                apiConfig.api.auditfacility.controller,
                apiConfig.api.auditfacility.action.delete.path,
                apiConfig.api.auditfacility.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function renderhtml(obj, prId, nbsp, colId) {
    var html = "";
    var rowCls = obj.childs == undefined || obj.childs == null || obj.childs.length == 0 ? (obj.parent_id == 0 ? 'row-parent' : '') : 'row-parent';
    var btnShow = obj.childs == undefined || obj.childs == null || obj.childs.length == 0 ? '' :
        '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' + colId + '">'
        + '<i class="fas fa-plus" aria-hidden="true"></i></button>';
    rowCls += obj.status ? '' : ' table-warning'
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + nbsp + btnShow + '</td>' +
        '<td>' + viewValue(obj.code) + '</td>' +
        '<td>' + viewValue(obj.name) + '</td>' +
        '<td>' + viewValue(obj.object_class_name) + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_AF', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_AF', 'PER_EDIT') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_AF', 'PER_DEL') === true)
        html += '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
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
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = 'collapRow' + obj.id;
            html += renderhtml(obj, prId, nbsp, colId);
            if (obj.childs != undefined && obj.childs != null)
                html += getHtmlChild(obj.childs, prId + ' ' + colId, n + 1);
        }
    }
    return html;
}

function fnSearchSuccess(rspn) {
    var tbBody = $('#tblResultSearch tbody');
    tbBody.html('');
    dataList.Total = rspn.total;
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var html = getHtmlChild(data, '', 0);
        tbBody.append(html);

        reCalculatPages();
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
        'object_id': isNaN(parseInt($('#search-class').val())) ? 0 : parseInt($('#search-class').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

////function btnOnSearch() {
////    $("#txtCurrentPage").val(1);
////    onSearch();
////}

function openFormUpload(isOpen) {
    var modal = $('#card-index');
    var cardManag = $('#card-upload');

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
        cardManag.show();
        location.hash = 'import';
    }
    else {
        headerManager.show();
        headerUpdate.hide();
        headerCreate.hide();
        headerDetail.hide();
        headerImport.hide();
        modal.show();
        cardManag.hide();
        location.hash = '';
    }
}


function renderhtml_upload(trClass, obj, index) {
    return '<tr class="' + trClass + '">'
        + '<td class="text-center">' + (index + 1) + '</td>'
        + '<td>' + viewValue(obj.code) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.parent_code) + '</td>'
        + '<td>' + viewValue(obj.object_class_name) + '</td>'
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

        callUpload(apiConfig.api.auditfacility.controller,
            apiConfig.api.auditfacility.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.auditfacility.controller + '/Download?code=' + code.code, 'Download');
}

function downloadTemp() {
    callApi(apiConfig.api.auditfacility.controller, '/DownloadTemp', 'GET', { 'fileName': 'AuditFacility.xlsx' }, 'canDownload');
}
window.onload = function () {

    setTimeout(function () {
        onSearch();
    }, 120);

}