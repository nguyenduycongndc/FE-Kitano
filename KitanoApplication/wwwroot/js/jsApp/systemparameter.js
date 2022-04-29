////$.ajaxSetup({
////    beforeSend: function (xhr) {
////        xhr.setRequestHeader('Authorization', getSessionToken());
////        xhr.setRequestHeader('Accept-Language', 'vi-VN');
////        showLoading();
////    },
////    complete: function (xhr, status, error) {
////        hideLoading();

////        if (xhr.status == 401)
////            swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
////        else if (xhr.status == 404)
////            swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
////        else if (xhr.status == 500)
////            swal("Internal Server Error!", "Có lỗi xảy ra trong quá trình xử lý!", "warning");
////        else if (xhr.status == 400)
////            swal("Lỗi dữ liệu!", "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "warning");
////        else if (xhr.status != 200)
////            swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
////    }
////});
function callApi_multipleselect(selector, placeholder) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: apiConfig.api.host_user_service + apiConfig.api.systemusergroup.controller + apiConfig.api.systemusergroup.action.select.path,
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
function updateSystemParameterSuccess(data) {
    if (data.code === '1') {
        toastr.success(localizationResources.Successfully, { progressBar: true })
        setTimeout(function () {
            window.location.href = "/SystemParameter"
        }, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}
function updateFail(request, status, error) {
    swal("Error!", "Lưu dữ liệu thất bại!", "error");
}
function openViewSystemParameter(type, value, frmHeader) {
    var index = $("#view");
    var edit = $("#edit");
    var detail = $("#detail");
    if (type === 0) {
        index.show();
        edit.hide();
        detail.hide();
        setTimeout(function () {
            onSearch();
        }, 100);
    }
    else if (type === 1) {
        index.hide();
        edit.hide();
        detail.show();
        fnGetDetailSystemParameter(type, value);
    }
    else if (type === 2) {
        index.hide();
        edit.show();
        detail.hide();
        fnGetDetailSystemParameter(type, value);
    }
}

//Tìm kiếm tham số
function onSearch() {
    var frmViewSystemParameter = $("#formViewSystemParameter");
    showLoading();
    if (localStorage.type && localStorage.dataObj) {
        frmViewSystemParameter.find("#Subsystem").val(localStorage.subsystem);
        frmViewSystemParameter.find("#Parameters").val(localStorage.parameters);
        callApi_userservice(
            apiConfig.api.systemparameter.controller,
            apiConfig.api.systemparameter.action.search.path,
            apiConfig.api.systemparameter.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchSystemParameterTableSuccess', 'msgError');
    } else if (!localStorage.type) {
        frmViewSystemParameter.find("#Subsystem").val(localStorage.subsystem);
        frmViewSystemParameter.find("#Parameters").val(localStorage.parameters);
        var obj = {
            'sub_system': $('#Subsystem').val().trim(),
            'parameter_name': $('#Parameters').val().trim(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_userservice(
            apiConfig.api.systemparameter.controller,
            apiConfig.api.systemparameter.action.search.path,
            apiConfig.api.systemparameter.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchSystemParameterTableSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        frmViewSystemParameter.find("#Subsystem").val(localStorage.subsystem);
        frmViewSystemParameter.find("#Parameters").val(localStorage.parameters);
        callApi_userservice(
            apiConfig.api.systemparameter.controller,
            apiConfig.api.systemparameter.action.search.path,
            apiConfig.api.systemparameter.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchSystemParameterTableSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");

}
function fnSearchSystemParameterTableSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#systemParameterTable tbody');
        $("#systemParameterTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td class="text-center">' + (x = (i + 1 + rspn.record_number)) + '</td>' +
                '<td>' + obj.sub_system + '</td>' +
                '<td>' + obj.parameter_name + '</td>' +
                '<td>' + obj.value + '</td>' +
                '<td>' + obj.note + '</td>' +
                '<td class="text-center col-action">' +
                //comment mở khi có quyền
                (IsCheckPemission('M_SYSPAR', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewSystemParameter(1,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_SYSPAR', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openViewSystemParameter(2,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>')
                +
                (IsCheckPemission('M_SYSPAR', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a class="btn icon-delete btn-action-custom" onclick="Reset(' + obj.id + ')"><i data-toggle="tooltip" title="Reset" class="fas fa-sync" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Reset" class="fas fa-sync" aria-hidden="true"></i></a>')
                +
                //comment mở khi có quyền
                
                //'<a class="btn icon-default btn-action-custom" onclick="openViewSystemParameter(1,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                //'<a class="btn icon-default btn-action-custom" onclick="openViewSystemParameter(2,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                //'<a class="btn icon-delete btn-action-custom" onclick="Reset(' + obj.id + ')"><i data-toggle="tooltip" title="Reset" class="fas fa-sync" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#systemParameterTable").DataTable({
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

                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [0, 4, 5],
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
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
        hideLoading();
    } else if (rspn.data == "") {
        var tbBody = $('#systemParameterTable tbody');
        $("#systemParameterTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#systemParameterTable").DataTable({
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

                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [0, 4, 5],
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
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustomNull();
        hideLoading();
    }
}

//Reset tham số
function Reset(id) {
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn thiết lập lại tham số này!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnReset(id);
        }
    });
}
function fnReset(id) {
    callApi_userservice(
        apiConfig.api.systemparameter.controller,
        apiConfig.api.systemparameter.action.reset.path + "/" + id,
        apiConfig.api.systemparameter.action.reset.method,
        null, 'fnResetSuccess', 'msgError');
}

function fnResetSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Tham số hệ thống", "Thiết lập dữ liệu tham số hệ thống");
        toastr.success(localizationResources.ResetSuccess, { progressBar: true })
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}

//Chi tiết
function fnGetDetailSystemParameter(type, param) {
    var call_back = '';
    if (type === 2) {
        call_back = 'fnEditSystemParameterSuccess';
    }
    else if (type === 1) {
        call_back = 'fnGetDetailSystemParameterSuccess';
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_userservice(
        apiConfig.api.systemparameter.controller,
        apiConfig.api.systemparameter.action.getItem.path + "/" + param,
        apiConfig.api.systemparameter.action.getItem.method,
        null, call_back, 'msgError');
}
function fnGetDetailSystemParameterSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        var detail_value = $("#detail_value");
        var detail_encode = $("#detail_encode");
        var detail_value_CKE = $("#detail_value_CKE");
        if (data.parameter_name == "MAIL_PASSWORD") {
            detail_value.hide();
            detail_encode.show();
            detail_value_CKE.hide();
            frmModify.find("#ValueDetailEnCode").val(data.value);
        } else if (data.parameter_name == "REPORT_HEADER") {
            detail_value.hide();
            detail_encode.hide();
            detail_value_CKE.show();

            var cardHeader = $('#detail_value_CKE');
            cardHeader.html('');
            var html =
                '<label for="ValueDetailEnCode" class="col-form-label">' + "Giá trị" +
                '</label>' +
                '<textarea style="display: none" name="Note" class="form-control mb-3" id="NoteCKEUp" disabled>' + (data.value != null ? data.value : "") +
                '</textarea>';

            cardHeader.append(html)
            CKEDITOR.replace("NoteCKEUp", {
                height: 300,
                disableObjectResizing: true
            });
        } else {
            detail_value.show();
            detail_encode.hide();
            detail_value_CKE.hide();
            frmModify.find("#ValueDetail").val(data.value);
        }

        frmModify.find("#Id").val(data.id);
        frmModify.find("#SubsystemDetail").val(data.sub_system);
        frmModify.find("#ParametersDetail").val(data.parameter_name);
        //frmModify.find("#ValueDetail").val(data.value);
        //frmModify.find("#ValueDetail").val(data.parameter_name != "MAIL_PASSWORD" ? data.value : "************");
        frmModify.find("#NoteDetail").val(data.note);
        localStorage.setItem("id", $('#Id').val());
        localStorage.setItem("type", "1");
    }
}

//Cập nhật tham số
function submitEditSystemParameter() {

    var obj = {
        'id': $('#IdEdit').val(),
        'sub_system': $('#SubsystemEdit').val(),
        'parameter_name': $('#ParametersEdit').val(),
        'value': $('#ValueEdit').val() ? $('#ValueEdit').val() : $('#ValueEditEnCode').val() ? $('#ValueEditEnCode').val() : $.trim(CKEDITOR.instances["NoteCKEUpEdit"].getData()),
        'note': $('#NoteEdit').val(),
    }
    callApi_userservice(
        apiConfig.api.systemparameter.controller,
        apiConfig.api.systemparameter.action.update.path,
        apiConfig.api.systemparameter.action.update.method,
        obj, 'updateSystemParameterSuccess', 'msgError');
}
function fnEditSystemParameterSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var edit_value = $("#edit_value");
        var edit_encode = $("#edit_encode");
        var edit_value_CKE = $("#edit_value_CKE");
        if (data.parameter_name == "MAIL_PASSWORD") {
            edit_value.hide();
            edit_encode.show();
            edit_value_CKE.hide();
            frmModify.find("#ValueEditEnCode").val(data.value);
        } else if (data.parameter_name == "REPORT_HEADER") {
            edit_value.hide();
            edit_encode.hide();
            edit_value_CKE.show();

            var cardHeader = $('#edit_value_CKE');
            cardHeader.html('');
            var html =
                '<label for="ValueEditEnCode" class="col-form-label">' + "Giá trị" +
                '</label>' +
                '<textarea style="display: none" name="Note" class="form-control mb-3" id="NoteCKEUpEdit">' + (data.value != null ? data.value : "") +
                '</textarea>';

            cardHeader.append(html)
            CKEDITOR.replace("NoteCKEUpEdit", {
                height: 300,
                disableObjectResizing: true
            });
        } else {
            edit_value.show();
            edit_encode.hide();
            edit_value_CKE.hide();
            frmModify.find("#ValueEdit").val(data.value);
        }
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#SubsystemEdit").val(data.sub_system);
        frmModify.find("#ParametersEdit").val(data.parameter_name);
        /*frmModify.find("#ValueEdit").val(data.value);*/
        frmModify.find("#NoteEdit").val(data.note);

        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "2");
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
function clickMenu() {
    openViewSystemParameter(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("subsystem");
    localStorage.removeItem("parameters");
}
function subsystemChange() {
    localStorage.setItem('subsystem', $('#Subsystem').val());
}
function parametersChange() {
    localStorage.setItem('parameters', $('#Parameters').val());
}
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
        openViewSystemParameter(type, id);
    }, 100);

}