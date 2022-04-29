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
var applyForLoaded = false;
var classTypeLoaded = false;
var formulaLoad = false;

$(function () {
    setTimeout(function () {
        loadCategory();
        onSearch();
    }, 100);

    reCalculatPages();
    viewBtnActionPage();


    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            parentLoaded = false;
            applyForLoaded = false;
            classTypeLoaded = false;
            formulaLoad = false;
            getParents();
            loadCategory();
            loadFomulas();
            var myVar1 = setInterval(function () {
                if (!parentLoaded || !classTypeLoaded || !formulaLoad)
                    return;
                else {
                    triggerOpenFormEdit('edit', idViewEdit());
                    clearInterval(myVar1);
                }
            }, 100);
        }
        else if (isViewDetail()) {
            parentLoaded = false;
            applyForLoaded = false;
            classTypeLoaded = false;
            formulaLoad = false;
            getParents();
            loadCategory();
            loadFomulas();
            var myVar2 = setInterval(function () {
                if (!parentLoaded || !classTypeLoaded || !formulaLoad)
                    return;
                else {
                    triggerOpenFormEdit('view', idViewDetail());
                    clearInterval(myVar2);
                }
            }, 100);
        }
    }, 200);
});


function onOpenCreate(ele) {
    parentLoaded = false;
    applyForLoaded = false;
    classTypeLoaded = false;
    formulaLoad = false;
    getParents();
    loadCategory();
    loadFomulas();
    var myVar = setInterval(function () {
        if (!parentLoaded || !applyForLoaded || !classTypeLoaded || !formulaLoad)
            return;
        else {
            onViewModalCreate(ele);
            clearInterval(myVar);
        }
    }, 100);
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
function fillParentCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#parent').html('');
    $('#parent').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0) {
        parentLoaded = true;
        return;
    }
    var html = generateComboOptions(data.data, 0, 'issues', 'ancestor');
    $('#parent').append(html);
    parentLoaded = true;
}

function getParents() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 99999,
        'start_number': 0
    };

    callApi(
        apiConfig.api.riskissue.controller,
        apiConfig.api.riskissue.action.search.path,
        apiConfig.api.riskissue.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillParentCombo');
}

function fillFormula(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#formula').html('');
    $('#formula').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds');
    $('#formula').append(html);
    formulaLoad = true;
}

function loadFomulas() {

    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };

    callApi(
        apiConfig.api.formula.controller,
        apiConfig.api.formula.action.search.path,
        apiConfig.api.formula.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillFormula');
}

function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#apply_for').html('');
    $('#search_apply_for').html('');
    $('#apply_for').append(htmlOption);
    $('#search_apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, null, 'code');
    $('#apply_for').append(html);
    $('#search_apply_for').append(html);
    applyForLoaded = true;
}

function fillClassType(data) {

    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#class_type').html('');
    $('#search_facility_type').html('');
    $('#class_type').append(htmlOption);
    $('#search_facility_type').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds');
    $('#class_type').append(html);
    $('#search_facility_type').append(html);

    var usingData = $.map(data.data, function (obj) {
        obj.text = obj.name;

        return obj;
    });

    $("#class_type").select2({
        placeholder: localizationResources.Choose,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: false,
        data: usingData
    });

    $("#search_facility_type").select2({
        placeholder: localizationResources.Choose,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: false,
        data: usingData
    });

    classTypeLoaded = true;
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');

    ////callApi_multipleselect("class_type", localizationResources.Choose, apiConfig.api.host, apiConfig.api.common.controller, apiConfig.api.common.action.unitTypes.path);

    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.unitTypes.path,
        apiConfig.api.common.action.unitTypes.method,
        {}, 'fillClassType');
}

function loadDataItem(id) {
    callApi(
        apiConfig.api.riskissue.controller,
        apiConfig.api.riskissue.action.getItem.path + "/" + id,
        apiConfig.api.riskissue.action.getItem.method,
        {}, 'exDataItem');
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function viewDataItem(obj) {
    clearMsgInvalid();
    $('#parent option').prop('disabled', false);
    if (obj == undefined || obj == null) {
        $('#id').val(0);
        $('#parent').val('');
        $('#name').val('');
        $('#code').val('');
        $('#status').val(1);
        $('#apply_for').val('');
        $('#formula').val('');
        $('#class_type').val('').trigger('change');
        $('#proportion').val('');
        $('#method').val(2);
        $('#description').val('');

        $('#create_user').val('');
        $('#create_date').val('');
        $('#modified_user').val('');
        $('#modified_date').val('');

        onChangeFormula('');
        onChangeApplyFor();
    }
    else {
        $('#id').val(obj.id);
        var parentId = obj.parent == undefined || obj.parent == null ||
            obj.parent.id == undefined || obj.parent.id == null || obj.parent.id == '' ? '' : obj.parent.id;
        $('#parent').val(parentId);
        $('#parent option[value=' + obj.id + ']').prop('disabled', true);
        $('#parent option[data-ancestor*="' + ("|" + obj.id + "|") + '"]').prop(
            "disabled",
            true
        );
        $('#name').val(obj.name);
        $('#code').val(obj.code);
        $('#status').val(obj.status == 1 ? 1 : 0);
        var applyFor = obj.apply_for == undefined || obj.apply_for == null ||
            obj.apply_for.id == undefined || obj.apply_for.id == null || obj.apply_for.id == '' ? '' : obj.apply_for.id;
        $('#apply_for').val(applyFor);
        var formula = obj.formula == undefined || obj.formula == null ||
            obj.formula.id == undefined || obj.formula.id == null || obj.formula.id == '' ? '' : obj.formula.id;
        $('#formula').val(formula);

        $('#class_type').val(obj.class_type.split(';')).trigger('change');
        $('#proportion').val(obj.proportion);
        $('#method').val(obj.method_id);
        $('#description').val(obj.description);

        $('#create_user').val(obj.name_create);
        $('#create_date').val(obj.create_date_str);
        $('#modified_user').val(obj.name_modified);
        $('#modified_date').val(obj.last_modified_str);

        //$('#card-update #parent').trigger('change');
        changeParent_edit();
        onChangeApplyFor();
    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
        if (data.id > 0) {
            createdLog("Yếu tố rủi ro", "Chỉnh sửa yếu tố rủi ro");
        } else {
            createdLog("Yếu tố rủi ro", "Thêm mới yếu tố rủi ro");
        }
        $('#modelUpdateItem').modal('hide');
        onSearch();
        getParents();
        onBack();
    }
    else /*swal("Error!", getStatusCode(data.code), "error*//*");*/ toastr.error(getStatusCode(data.code), "Error!", { progressBar: true });
}

function fnSaveItemInfo() {
    var obj = {
        'id': $('#id').val(),
        'parent': { 'id': $('#parent').val() },
        'name': $('#name').val(),
        'code': $('#code').val(),
        'status': $('#status').val() == '1',
        'apply_for': { 'id': $('#apply_for').val() },
        'class_type': $('#class_type').val().join(';'),
        'formula': { 'id': $('#formula').val() },
        'proportion': $('#proportion').val(),
        'method_id': $('#method').val(),
        'description': $('#description').val()
    };

    obj.parent.id = obj.parent.id == null || obj.parent.id == '' ? 0 : obj.parent.id;

    if (validateRequired('#card-update')) {
        callApi(
            apiConfig.api.riskissue.controller,
            apiConfig.api.riskissue.action.update.path,
            apiConfig.api.riskissue.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Yếu tố rủi ro", "Xóa yếu tố rủi ro");
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
                apiConfig.api.riskissue.controller,
                apiConfig.api.riskissue.action.delete.path,
                apiConfig.api.riskissue.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function renderHtml(obj, prId, nbsp, colId) {
    var html = "";
    var rowCls = obj.issues == undefined || obj.issues == null || obj.issues.length == 0 ? (obj.parent_id == 0 ? 'row-parent' : '') : 'row-parent';
    var btnShow = obj.issues == undefined || obj.issues == null || obj.issues.length == 0 ? '' :
        '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' + colId + '">'
        + '<i class="fa fa-minus" aria-hidden="true"></i></button>';
    rowCls += obj.status ? '' : ' table-warning'
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + nbsp + btnShow + '</td>' +
        '<td>' + viewValue(obj.code) + '</td>' +
        '<td>' + viewValue(obj.name) + '</td>' +
        '<td>' + viewValue(obj.proportion) + '</td>' +
        '<td>' + getScoreMethod(obj.method_id) + '</td>' +
        '<td>' + getOptionValue(obj.formula) + '</td>' +
        '<td>' + getOptionValue(obj.apply_for) + '</td>' +
        '<td>' + viewValue(obj.class_type_name) + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_RI', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_RI', 'PER_EDIT') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_RI', 'PER_DEL') === true)
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
            html += renderHtml(obj, prId, nbsp, colId);
            if (obj.issues != undefined && obj.issues != null)
                html += getHtmlChild(obj.issues, prId + ' ' + colId, n + 1);
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
        'name': $('#search-key').val(),
        'apply_for': $('#search_apply_for').val(),
        'class_type': $('#search_facility_type').val() == undefined || $('#search_facility_type').val() == null ? '' : $('#search_facility_type').val().join(';'),
        'method': $('#search-method').val(),
        'status': isNaN(parseInt($('#search-status').val())) ? 1 : parseInt($('#search-status').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.riskissue.controller,
        apiConfig.api.riskissue.action.search.path,
        apiConfig.api.riskissue.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

function viewDefaultByParent(rspn) {
    $('#apply_for').prop('disabled', false);
    if (rspn.data) {
        var obj = rspn.data;
        var applyFor = obj.apply_for == undefined || obj.apply_for == null ||
            obj.apply_for.id == undefined || obj.apply_for.id == null || obj.apply_for.id == '' ? 0 : obj.apply_for.id;
        if (applyFor && $('#apply_for option[value=' + applyFor + ']').length > 0) {
            $('#apply_for').val(applyFor);
            $('#apply_for').prop('disabled', true);
        }
        else $('#apply_for').val('');
        ////var formula = obj.formula == undefined || obj.formula == null ||
        ////obj.formula.id == undefined || obj.formula.id == null || obj.formula.id == '' ? 0 : obj.formula.id;
        var formulaCode = obj.formula == undefined || obj.formula == null ||
            obj.formula.id == undefined || obj.formula.id == null || obj.formula.id == '' ? '' : obj.formula.code;
        ////$('#formula').val(formula);
        $('#class_type').val(obj.class_type.split(';')).trigger('change');
        $('#method').val(2);
        onChangeFormula(formulaCode);
    }
}
function viewDefaultByParent_Edit(rspn) {
    $('#apply_for').prop('disabled', false);
    if (rspn.data) {
        var obj = rspn.data;
        var applyFor = obj.apply_for == undefined || obj.apply_for == null ||
            obj.apply_for.id == undefined || obj.apply_for.id == null || obj.apply_for.id == '' ? 0 : obj.apply_for.id;
        if (applyFor && $('#apply_for option[value=' + applyFor + ']').length > 0) {
            $('#apply_for').val(applyFor);
            $('#apply_for').prop('disabled', true);
        }
        else $('#apply_for').val('');
        ////var formula = obj.formula == undefined || obj.formula == null ||
        ////obj.formula.id == undefined || obj.formula.id == null || obj.formula.id == '' ? 0 : obj.formula.id;
        var formulaCode = obj.formula == undefined || obj.formula == null ||
            obj.formula.id == undefined || obj.formula.id == null || obj.formula.id == '' ? '' : obj.formula.code;
        ////$('#formula').val(formula);
        $('#class_type').val(obj.class_type.split(';')).trigger('change');      
        onChangeFormula_edit(formulaCode);
    }
}
function changeParent(ele) {
    var id = $("#id").val();
    if (id == undefined || id == null || id == '' || id == "0") {
        $('#apply_for').val('').trigger('change');
        $("#class_type").val('').trigger('change');
        $('#apply_for').prop('disabled', false);
    }
    var val = $('#card-update #parent').val();
    if (val != undefined && val != null && val != '') {
        callApi(
            apiConfig.api.riskissue.controller,
            apiConfig.api.riskissue.action.getItem.path + "/" + val,
            apiConfig.api.riskissue.action.getItem.method,
            {}, 'viewDefaultByParent');
    }
    else {
        $('#card-update label[for=proportion]').addClass('required');
        $('#card-update #proportion').prop('disabled', isViewDetail());
    }
}
function changeParent_edit() {
    var id = $("#id").val();
    if (id == undefined || id == null || id == '' || id == "0") {
        $('#apply_for').val('').trigger('change');
        $("#class_type").val('').trigger('change');
        $('#apply_for').prop('disabled', false);
    }
    var val = $('#card-update #parent').val();
    if (val != undefined && val != null && val != '') {
        callApi(
            apiConfig.api.riskissue.controller,
            apiConfig.api.riskissue.action.getItem.path + "/" + val,
            apiConfig.api.riskissue.action.getItem.method,
            {}, 'viewDefaultByParent_Edit');
    }
    else {
        $('#card-update label[for=proportion]').addClass('required');
        $('#card-update #proportion').prop('disabled', isViewDetail());
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
    tbBody.html('');
    ////var fileUpload = rspn.fileName;
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
                + '<td>' + data[i].code + '</td>' +
                '<td>' + data[i].name + '</td>' +
                '<td>' + data[i].proportion + '</td>' +
                '<td>' + getScoreMethod(data[i].method_id) + '</td>' +
                '<td>' + getOptionValue(data[i].formula) + '</td>' +
                '<td>' + getOptionValue(data[i].apply_for) + '</td>' +
                '<td>' + getOptionValue(data[i].class_type) + '</td>'
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

        callUpload(apiConfig.api.riskissue.controller,
            apiConfig.api.riskissue.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.riskissue.controller + '/Download?code=' + code.code, 'Download');
}

function downloadTemp() {
    callApi(apiConfig.api.riskissue.controller, '/DownloadTemp', 'GET', { 'fileName': 'RiskIssue.xlsx' }, 'canDownload');
}

function onChangeFormula(code) {
    ////var val = $('#card-update #formula').val();
    if (code == "BINHQUANGIAQUYEN") {
        $('#card-update label[for=proportion]').addClass('required');
        $('#card-update #proportion').prop('disabled', isViewDetail());
    }
    else {
        ////$('#apply_for').prop('disabled', false);
        ////$('#apply_for').val('');
        $('#method').val(2);
        ////$('#class_type').val('').trigger('change');
        $('#formula').val('');

        var parentVal = $('#card-update #parent').val();

        if (parentVal == undefined || parentVal == null || parentVal == '') {
            $('#card-update label[for=proportion]').addClass('required');
            $('#card-update #proportion').prop('disabled', isViewDetail());
        }
        else {
            $('#card-update label[for=proportion]').removeClass('required');
            $('#card-update #proportion').prop('disabled', isViewDetail() || true);
        }
    }
}
function onChangeFormula_edit(code) {
    ////var val = $('#card-update #formula').val();
    if (code == "BINHQUANGIAQUYEN") {
        $('#card-update label[for=proportion]').addClass('required');
        $('#card-update #proportion').prop('disabled', isViewDetail());
    }
    else {      
        var parentVal = $('#card-update #parent').val();
        if (parentVal == undefined || parentVal == null || parentVal == '') {
            $('#card-update label[for=proportion]').addClass('required');
            $('#card-update #proportion').prop('disabled', isViewDetail());
        }
        else {
            $('#card-update label[for=proportion]').removeClass('required');
            $('#card-update #proportion').prop('disabled', isViewDetail() || true);
        }
    }
}
function onChangeApplyFor(ele) {
    ele = ele == undefined ? $('#apply_for')[0] : ele;
    var selectedOption = ele.selectedOptions[0];
    if (selectedOption != undefined && selectedOption != null) {
        var codeSelected = ele.selectedOptions[0].dataset["code"];
        if (codeSelected != 'DV') {
            $('#class_type').prop('disabled', isViewDetail() || true);
            $("#class_type").val('').trigger('change');
        }
        else {
            $('#class_type').prop('disabled', isViewDetail());
        }
    }
    else {
        $('#class_type').prop('disabled', isViewDetail() || true);
        $("#class_type").val('').trigger('change');
    }
}