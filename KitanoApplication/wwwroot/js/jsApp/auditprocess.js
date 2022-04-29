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
    setTimeout(fnGetComboData, 100);

    $('#modalSelectUser').on('show.bs.modal', function (event) {
        getUsers();
    });

    $('#modalSelectUser').on('hide.bs.modal', function (event) {
        getUserInfo();
    });

    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            triggerOpenFormEdit('edit', idViewEdit());
        }
        else if (isViewDetail()) {
            triggerOpenFormEdit('view', idViewDetail());
        }
    }, 200);

    $('th.sorting').on('click', function (ele) {

        var isAsc = ele.target.classList.contains('sorting_asc');
        var isDesc = ele.target.classList.contains('sorting_desc');
        var isSort = ele.target.classList.contains('sorting');

        $('th.sorting_asc').removeClass('sorting_asc').addClass('sorting');
        $('th.sorting_desc').removeClass('sorting_desc').addClass('sorting');

        if (isSort) {
            ele.target.classList.remove('sorting');
            ele.target.classList.add('sorting_asc');
        }
        else if (isAsc) {
            ele.target.classList.remove('sorting_asc');
            ele.target.classList.add('sorting_desc');
        }
        else if (isDesc) {
            ele.target.classList.remove('sorting_desc');
            ele.target.classList.add('sorting');
        }

        onSearch();
    });

});

var lstUsers = [];

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

function fnGetComboData() {
    getFacilities();
    getActivities();
}

function fillUserList(rspn) {
    lstUsers = [];
    if (rspn && rspn.data && rspn.data.length > 0) {
        lstUsers = rspn.data;
    }
    viewUserFromList(lstUsers);
}

function viewUserFromList(lst) {
    $('#tbodyUsers').html('');
    var strHtml = '';
    for (var i = 0; i < lst.length; i++) {
        var obj = lst[i];
        strHtml += '<tr>' +
            '<td><div class="form-check"><input id="selectionfor' + i + '" class="form-check-input" type="radio" name="flexSelectUser" value="0"><label class="form-check-label" for="selectionfor' + i + '">&nbsp;</label></div></td>' +
            '<td>' + (i + 1) + '</td>' +
            '<td class="td-name"><label for="selectionfor' + i + '">' + obj.full_name + '</label></td>' +
            '<td class="td-mail"><label for="selectionfor' + i + '">' + obj.email + '</label></td>' +
            '<td><label for="selectionfor' + i + '">' + obj.department_name + '</label></td>' +
            '</tr>';
    }
    $('#tbodyUsers').append(strHtml);
}

function getUsers() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.users.path,
        apiConfig.api.common.action.users.method,
        {}, 'fillUserList');

}

function onSelectUser() {
    var itemSelected = $('input[name=flexSelectUser]:checked');

    if (itemSelected.length == 0) {
        ////swal("Warning!", localizationResources.PersonChargeNotSelected, "warning");
        toastr.warning(localizationResources.PersonChargeNotSelected, "Warning!", { progressBar: true });
        ////return;
    }
    else $('#modalSelectUser').modal('hide');
}

function getUserInfo() {
    var itemSelected = $('input[name=flexSelectUser]:checked');

    if (itemSelected.length == 0) {
        return;
    }


    var personName = $(itemSelected[0].parentNode.parentNode.parentNode).find('td.td-name').text();
    var personMail = $(itemSelected[0].parentNode.parentNode.parentNode).find('td.td-mail').text();


    $('#person_charge').val(personName);
    $('#person_charge_email').val(personMail);
}

function fillFacilityCombo(rspn) {
    var data = rspn.data;

    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#facility').html('');
    $('#search-facility').append(htmlOption);
    $('#facility').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#facility').append(html);

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

function fillActivityCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-activity').html('');
    $('#activity').html('');
    $('#search-activity').append(htmlOption);
    $('#activity').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#search-activity').append(html);
    $('#activity').append(html);

    ////for (var i = 0; i < data.data.length; i++) {
    ////    var obj = data.data[i];
    ////    var html = '<option value="' + obj.id + '">' + obj.name + '</option>';
    ////    $('#search-activity').append(html);
    ////    $('#activity').append(html);
    ////}
}

function getActivities() {
    var obj = {
        'code': '',
        'key': '',
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

function loadDataItem(id) {
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.getItem.path + "/" + id,
        apiConfig.api.auditprocess.action.getItem.method,
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
        $('#person_charge').val('');
        $('#person_charge_email').val('');

        $('#facility').val('');
        $('#activity').val('');

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
        var facilityId = obj.facility_id == undefined || obj.facility_id == null || obj.facility_id == '' ? '' : obj.facility_id;
        var activityId = obj.activity_id == undefined || obj.activity_id == null || obj.activity_id == '' ? '' : obj.activity_id;
        $('#facility').val(facilityId);
        $('#activity').val(activityId);
        $('#person_charge').val(obj.person_charge);
        $('#person_charge_email').val(obj.person_charge_email);
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
        onBack();
    }
    else {
        ////swal("Error!", getStatusCode(data.code), "error");
        toastr.error(getStatusCode(data.code), "Error!", { progressBar: true });
    }
}

function fnSaveItemInfo() {
    var obj = {
        'id': $('#id').val(),
        'name': $('#name').val(),
        'code': $('#code').val(),
        'facility_id': $('#facility').val(),
        'activity_id': $('#activity').val(),
        'status': $('#status').val() == '1',
        'description': $('#description').val(),
        'person_charge': $('#person_charge').val(),
        'person_charge_email': $('#person_charge_email').val()
    };

    if (validateRequired("#form-modify")) {
        callApi(
            apiConfig.api.auditprocess.controller,
            apiConfig.api.auditprocess.action.update.path,
            apiConfig.api.auditprocess.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Quy trình", "Xóa quy trình");
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + title + "'!",
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
                apiConfig.api.auditprocess.controller,
                apiConfig.api.auditprocess.action.delete.path,
                apiConfig.api.auditprocess.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function renderhtml(obj, trClass, index) {
    var html = '<tr class="' + trClass + '">' +
        '<td style="text-align:center">' + rowNo($("#txtCurrentPage").val(), $("#cbPageSize").val(), index) + '</td>' +
        '<td>' + obj.activity_name + '</td>' +
        '<td>' + obj.facility_name + '</td>' +
        '<td>' + viewValue(obj.code) + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td>' + obj.status.strStatus() + '</td>' +
        '<td class="col-action">';
    if (IsCheckPemission('M_APR', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (IsCheckPemission('M_APR', 'PER_EDIT') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission('M_APR', 'PER_DEL') === true)
        html += '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    html += '</td>' +
        '</tr>';
    return html;
}

function fnSearchSuccess(rspn) {
    var tbBody = $('#tblResultSearch tbody');
    tbBody.html('');
    dataList.Total = rspn.total;
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var index = 0;
        for (let item of data) {
            var obj = item;
            var trClass = obj.status ? '' : 'table-warning'
            var html = renderhtml(obj, trClass, index);
            tbBody.append(html);
            index++;
        }

        reCalculatPages();
        viewBtnActionPage();
        collapseDelegate();
        triggerChangeHeader();
    }
}

function onSearch() {

    var byAsc = $('th.sorting_asc');
    var byDesc = $('th.sorting_desc');
    var sortKey = '';
    var sortType = 'asc';
    if (byAsc.length > 0) {
        sortKey = byAsc[0].dataset["sortCode"];
        ////sortType = 'asc';
    }
    else if (byDesc.length > 0) {
        sortKey = byDesc[0].dataset["sortCode"];
        sortType = 'desc'
    }

    sortKey = sortKey == undefined || sortKey == null || sortKey == '' ? 'Id' : sortKey;
    sortType = sortType == undefined || sortType == null || sortType == '' ? 'asc' : sortType;

    var obj = {
        'key': $('#search-key').val(),
        'code': '',
        'status': isNaN(parseInt($('#search-status').val())) ? 1 : parseInt($('#search-status').val()),
        'facility_id': isNaN(parseInt($('#search-facility').val())) ? 0 : parseInt($('#search-facility').val()),
        'activity_id': isNaN(parseInt($('#search-activity').val())) ? 0 : parseInt($('#search-activity').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': ((parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())),
        'sorting': sortKey,
        'sort_type': sortType
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

////function btnOnSearch() {
////    $("#txtCurrentPage").val(1);
////    onSearch();
////}

function filterUsers() {
    var fullName = $('#modalSelectUser #user-fullname').val();
    fullName = (fullName + '').trim().toLowerCase();
    var department = $('#modalSelectUser #user-department').val();
    department = (department + '').trim().toLowerCase();
    var email = $('#modalSelectUser #user-email').val();
    email = (email + '').trim().toLowerCase();
    var lst = [];
    if (lstUsers && lstUsers.length > 0) {
        for (let user of lstUsers) {
            var obj = user;
            var objFullName = (obj.full_name + '').trim().toLowerCase();
            var objDept = (obj.department_name + '').trim().toLowerCase();
            var objEmail = (obj.email + '').trim().toLowerCase();

            if (objFullName.indexOf(fullName) >= 0
                && objDept.indexOf(department) >= 0
                && objEmail.indexOf(email) >= 0)
                lst.push(obj);
        }
        viewUserFromList(lst);
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
        onSearch();
    }
}
function renderhtml_upload(trClass, obj, index) {
    return '<tr class="' + trClass + '">'
        + '<td class="text-center">' + (index + 1) + '</td>'
        + '<td>' + viewValue(obj.facility_name) + '</td>'
        + '<td>' + viewValue(obj.activity_name) + '</td>'
        + '<td>' + viewValue(obj.code) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.risk_type_name) + '</td>'
        + '<td>' + viewValue(obj.description) + '</td>'
        + '<td>' + viewValue(obj.person_charge) + '</td>'
        + '<td>' + viewValue(obj.person_charge_email) + '</td>'
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
            index++;
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

        callUpload(apiConfig.api.auditprocess.controller,
            apiConfig.api.auditprocess.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');

    }

}

function canDownload(code) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host + apiConfig.api.auditprocess.controller+ '/Download?code=' + code.code);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_DanhSachQuyTrinh_v0.1.xlsx";
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

function downloadTemp() {
    callApi(apiConfig.api.auditprocess.controller, '/DownloadTemp', 'GET', { 'fileName': 'Kitano_DanhSachQuyTrinh_v0.1.xlsx' }, 'canDownload');
}
window.onload = function () {

    setTimeout(function () {
        onSearch();
    }, 120);

}