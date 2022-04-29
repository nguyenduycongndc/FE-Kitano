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

    setTimeout(function () {
        loadRiskLevel();
        onSearch();
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            triggerOpenFormEdit('edit', idViewEdit());
        }
        else if (isViewDetail()) {
            triggerOpenFormEdit('view', idViewDetail());
        }
    }, 100);
    setTimeout(function () {
        loadCategory();
    }, 150);
});

var parentLoaded = false;
var fileUpload = '';

function fillRiskLevel(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-risk_level').html('');
    $('#risk_level').html('');
    $('#search-risk_level').append(htmlOption);
    $('#risk_level').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, '');
    $('#search-risk_level').append(html);
    $('#risk_level').append(html);
}

function loadRiskLevel() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.riskLevel.path,
        apiConfig.api.common.action.riskLevel.method,
        {}, 'fillRiskLevel');
}

function onOpenCreate(ele) {
    onViewModalCreate(ele);
}

function onViewModalCreate(ele) {
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
        apiConfig.api.ratingscale.controller,
        apiConfig.api.ratingscale.action.getItem.path + "/" + id,
        apiConfig.api.ratingscale.action.getItem.method,
        {}, 'exDataItem');
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function viewDataItem(obj) {
    if (obj == undefined || obj == null) {
        $('#id').val(0);
        $('#name').val('');
        $('#code').val('');
        $('#status').val(1);
        $('#risk_level').val('');
        $('#description').val('');
        $('#min').val('');
        $('#max').val('');
        $('#min-funtion').val('');
        $('#max-funtion').val('');
        $('#apply_for').val('');

        $('#create_user').val('');
        $('#create_date').val('');
        $('#modified_user').val('');
        $('#modified_date').val('');
        
    }
    else {
        $('#id').val(obj.id);
        $('#name').val(obj.name);
        $('#code').val(obj.code);
        $('#status').val(obj.status == '1' ? 1 : 0);
        $('#risk_level').val(obj.risk_level);
        $('#description').val(obj.description);
        $('#min').val(obj.min);
        $('#max').val(obj.max);
        $('#min-funtion').val(obj.min_function);
        $('#max-funtion').val(obj.max_function);
        $('#apply_for').val(obj.apply_for);

        $('#create_user').val(obj.name_create);
        $('#create_date').val(obj.create_date_str);
        $('#modified_user').val(obj.name_modified);
        $('#modified_date').val(obj.last_modified_str);
    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess,"Thành công" , { progressBar: true });
        if (data.id > 0) {
            createdLog("Thang điểm xếp hạng", "Chỉnh sửa thang điểm xếp hạng");
        } else {
            createdLog("Thang điểm xếp hạng", "Thêm mới thang điểm xếp hạng");
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
        'code': $('#code').val(),
        'name': $('#name').val(),
        'min': $('#min').val(),
        'max': $('#max').val(),
        'risk_level': $('#risk_level').val(),
        'min_function': $('#min-funtion').val(),
        'max_function': $('#max-funtion').val(),
        'status': $('#status').val() == '1',
        'description': $('#description').val(),
        'apply_for': $('#apply_for').val()
    };
    if (validateRequired("#form-modify")) {
        obj.min = parseFloat(obj.min);
        if (obj.max != '') {
            obj.max = parseFloat(obj.max);
            if (obj.min > obj.max) {
                ////swal('Error', localizationResources.InputInvalid, 'error');
                toastr.error(localizationResources.InputInvalid, 'Error', { progressBar: true });
                return;
            }

            if (obj.max_function.isBlank()) {
                ////swal('Error', localizationResources.InputInvalid, 'error');
                toastr.error(localizationResources.InputInvalid, 'Error', { progressBar: true });
                return;
            }
        }

        callApi(
            apiConfig.api.ratingscale.controller,
            apiConfig.api.ratingscale.action.update.path,
            apiConfig.api.ratingscale.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Thang điểm xếp hạng", "Xóa thang điểm xếp hạng");
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: "Xác nhận?",
        text: localizationResources.RatingScaleDelConf,
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
                apiConfig.api.ratingscale.controller,
                apiConfig.api.ratingscale.action.delete.path,
                apiConfig.api.ratingscale.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}
function renderhtml(obj, prId, index) {
    var html = '';
    var rowCls = obj.status ? '' : ' table-warning';
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + rowNo($("#txtCurrentPage").val(), $("#cbPageSize").val(), index) + '</td>' +
        '<td>' + obj.risk_name + '</td>' +
        '<td>' + getApplyForname(obj.apply_for) + '</td>' +
        '<td>' + getIssueRange(obj.min, obj.max, obj.min_function, obj.max_function) + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_RS', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"   ><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_RS', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_RS', 'PER_DEL') === true)
        html += '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    html += '</td>' +
        '</tr>';
    return html;
}
function getHtmlChild(childs, prId, n) {
    ////var nbsp = '';
    ////for (var i = 0; i < n; i++) {
    ////    nbsp += '&nbsp;&nbsp;';
    ////}
    var html = '';
    var index = 0;
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            html += renderhtml(obj, prId, index)
            index++;
        }
    }
    return html;
}

function fnSearchSuccess(rspn) {
    dataList.Total = rspn.total;
    var tbBody = $('#tblResultActivity tbody');
    tbBody.html('');
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
        'risk_level': isNaN(parseInt($('#search-risk_level').val())) ? null : parseInt($('#search-risk_level').val()),
        'status': isNaN(parseInt($('#search-status').val())) ? 1 : parseInt($('#search-status').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.ratingscale.controller,
        apiConfig.api.ratingscale.action.search.path,
        apiConfig.api.ratingscale.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
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
                + '<td>' + data[i].code + '</td>'
                + '<td>' + data[i].name + '</td>'
                + '<td>' + data[i].rating_point + '</td>'
                + '<td>' + data[i].description + '</td>'
                + '<td>' + data[i].note + '</td>'
                + '</tr>';
        }

        console.log(str);
        tbBody.append(str);

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

        callUpload(apiConfig.api.ratingscale.controller,
            apiConfig.api.ratingscale.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.ratingscale.controller + '/Download?code=' + code.code, 'Download');
}

function downloadTemp() {
    callApi(apiConfig.api.ratingscale.controller, '/DownloadTemp', 'GET', { 'fileName': 'RatingScale.xlsx' }, 'canDownload');
}
function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#apply_for').html('');
    $('#apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#apply_for').append(html);
}
function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');
}

