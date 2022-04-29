//$(function () {
//    $("##unitTypeTable").dataTable({
//        "bPaginate": false,
//        "bLengthChange": false,
//        "bFilter": false,
//        "bInfo": false
//    });
//    reCalculatPages();
//    viewBtnActionPage();

//const { local } = require("d3-selection");

//});
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


function fnDeleteSuccess(rspn) {
    var data = rspn.data;
    swal({
        title: "Thông báo",
        text: 'Bạn có chắc chắn muốn xoá bản ghi' + ' ' + '"' + data.name + '"',
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteUnitType(data.id);
            createdLog("Loại đơn vị", "Xóa loại đơn vị");
        }
    });
}
function Delete(id) {
    fnGetDetail(null, id);
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

function UnitTypeActive(id, input) {
    var status = 1;
    //if ($(input).hasClass("active")) {
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}
function updateUnitTypeSuccess(data) {
    if (data.code === '1') {
        createdLog("Loại đơn vị", "Chỉnh sửa loại đơn vị");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        setTimeout(function () {
            window.location.href = "/UnitType"
        }, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}
function createUnitTypeSuccess(data) {
    if (data.code === '1') {
        createdLog("Loại đơn vị", "Thêm mới loại đơn vị");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        setTimeout(function () {
            window.location.href = "/UnitType"
        }, 2000);
    } 
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 50);
    }
}
function updateFail(request, status, error) {
    swal("Error!", "Lưu dữ liệu thất bại!", "error");
}

function validateObj(obj) {
    if (obj.name.isBlank()) {
        swal("Lỗi dữ liệu!", "Tên hoạt động không được để trống!", "error");
        return false;
    }

    return true;
}
function fnDeleteUnitTypeSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }

}
function fnActiveSuccess(rspn) {
    if (rspn.code === '1' && rspn.data.status == true) {
        toastr.success(localizationResources.Active, null, { progressBar: true });
        onSearch();
    } else if (rspn.code === '1' && rspn.data.status == false) {
        toastr.success(localizationResources.InActive, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 100);
    }
}

function clickMenu() {
    openView(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function openView(type, value) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var detail = $("#detail");
    if (type === 0) {
        //localStorage.removeItem("id");
        //localStorage.removeItem("type");
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        setTimeout(function () {
            onSearch();
        }, 100);
    }
    else if (type === 1) {
        clearMsgInvalid();
        localStorage.setItem("type", "1");
        index.hide();
        create.show();
        document.getElementById("nameCreate").focus();
        edit.hide();
        detail.hide();
        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();

        fnGetDetail(type, value);
    }
    else if (type === 3) {
        clearMsgInvalid();
        index.hide();
        create.hide();
        edit.show();
        document.getElementById("nameEdit").focus();
        detail.hide();
        fnGetDetail(type, value);
    }
}

function fnSearchUnitTypeSuccess(rspn) {
    showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#unitTypeTable tbody');
        $("#unitTypeTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td>' + obj.name + '</td>' +

                '<td class="text-center">' +
                //mở lại comment khi có quyền
                //'<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' onclick="UnitTypeActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"> <a hidden>' + obj.status + '<a></label></div>' +
                (IsCheckPemission('M_UT', 'PER_STATUS') === true && obj.roleId !== 1 ? '<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' onclick="UnitTypeActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"> <a hidden>' + obj.status + '<a></label> </div>' : '<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' disabled ><label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div>')
                +
                '</td>' +

                '<td>' + obj.description + '</td>' +
                '<td class="text-center col-action">' +
                (IsCheckPemission('M_UT', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_UT', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>')
                +
                (IsCheckPemission('M_UT', 'PER_DEL') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +
                //mở lại comment khi có quyền

                //'<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                //'<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                //'<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#unitTypeTable").DataTable({
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
                    "targets": [0, 3, 4],
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

        //$("#unitTypeTable").dataTable({
        //    "bPaginate": false,
        //    "bLengthChange": false,
        //    "bFilter": false,
        //    "bInfo": false,
        //    "columnDefs": [
        //        //{
        //        //    "targets": 0,
        //        //    "className": "text-center",
        //        //    "sortable": false,
        //        //    "orderable": false,
        //        //    "data": rspn.total,
        //        //    render: function (data, type, row, meta) {
        //        //        return meta.row + meta.settings._iDisplayStart + 1;
        //        //    }
        //        //},
        //        {
        //            "targets": [0, 3, 4],
        //            "searchable": false,
        //            "orderable": false
        //        }],
        //    "order": [],
        //    "drawCallback": function (settings) {
        //        $('[data-toggle="tooltip"]').tooltip();
        //    },
        //});
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
        hideLoading();
    } else if (rspn.data == "") {
        var tbBody = $('#unitTypeTable tbody');
        $("#unitTypeTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#unitTypeTable").DataTable({
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
                    "targets": [0, 3, 4],
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
        //$("#unitTypeTable").dataTable({
        //    "bPaginate": false,
        //    "bLengthChange": false,
        //    "bFilter": false,
        //    "bInfo": false,
        //    "columnDefs": [
        //        //{
        //        //    "targets": 0,
        //        //    "className": "text-center",
        //        //    "sortable": false,
        //        //    "orderable": false,
        //        //    "data": null,
        //        //    render: function (data, type, row, meta) {
        //        //        return meta.row + meta.settings._iDisplayStart + 1;
        //        //    }
        //        //},
        //        {
        //            "targets": [0, 3, 4],
        //            "searchable": false,
        //            "orderable": false
        //        }],
        //    "order": [[0, 'asc']],
        //    "drawCallback": function (settings) {
        //        $('[data-toggle="tooltip"]').tooltip();
        //    },
        //});
        reCalculatPagesCustomNull();
        hideLoading();
    }
}
function onSearch() {
    var frmView = $("#formView");
    showLoading();
    if (localStorage.type && localStorage.dataObj) {
        //frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        //frmView.find("#Name").val(localStorage.name);
        callApi_userservice(
            apiConfig.api.systemunittype.controller,
            apiConfig.api.systemunittype.action.search.path,
            apiConfig.api.systemunittype.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchUnitTypeSuccess', 'msgError');
    } else if (!localStorage.type) {
        //frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        //frmView.find("#Name").val(localStorage.name);
        var obj = {
            'name': $('#Name').val().trim(),
            'status': $('#Status').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_userservice(
            apiConfig.api.systemunittype.controller,
            apiConfig.api.systemunittype.action.search.path,
            apiConfig.api.systemunittype.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchUnitTypeSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        //frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        //frmView.find("#Name").val(localStorage.name);
        callApi_userservice(
            apiConfig.api.systemunittype.controller,
            apiConfig.api.systemunittype.action.search.path,
            apiConfig.api.systemunittype.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchUnitTypeSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}


function fnDeleteUnitType(id) {
    callApi_userservice(
        apiConfig.api.systemunittype.controller,
        apiConfig.api.systemunittype.action.delete.path + "/" + id,
        apiConfig.api.systemunittype.action.delete.method,
        null, 'fnDeleteUnitTypeSuccess', 'msgError');
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_userservice(
        apiConfig.api.systemunittype.controller,
        apiConfig.api.systemunittype.action.active.path,
        apiConfig.api.systemunittype.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}
function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'status': $('#statusCreate').val() == 1 ? true : false,
        'description': $('#descriptionCreate').val() != '' ? $('#descriptionCreate').val().trim() : '',
    }
    if (validateRequired('#formCreate')) {
        callApi_userservice(
            apiConfig.api.systemunittype.controller,
            apiConfig.api.systemunittype.action.add.path,
            apiConfig.api.systemunittype.action.add.method,
            obj, 'createUnitTypeSuccess', 'msgError');
    }
}

function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'name': $('#nameEdit').val().trim(),
        'status': $('#StatusEdit').val() == 1 ? true : false,
        'description': $('#DescriptionEdit').val() != '' ? $('#DescriptionEdit').val() : '',
    }
    if (validateRequired('#formEdit')) {
        callApi_userservice(
            apiConfig.api.systemunittype.controller,
            apiConfig.api.systemunittype.action.update.path,
            apiConfig.api.systemunittype.action.update.method,
            obj, 'updateUnitTypeSuccess', 'msgError');
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
    else {
        call_back = 'fnDeleteSuccess';
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_userservice(
        apiConfig.api.systemunittype.controller,
        apiConfig.api.systemunittype.action.getItem.path + "/" + param,
        apiConfig.api.systemunittype.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetDetailSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#nameUnitTypeDetail").val(data.name);

        frmModify.find("#CreatorNameDetail").val(data.creatorName);
        frmModify.find("#CreatedAtDetail").val(data.createdAt);

        frmModify.find("#EditorNameDetail").val(data.editorName);
        frmModify.find("#ModifiedAtDetail").val(data.modifiedAt);

        frmModify.find("#StatusDetail").val(data.status == true ? 1 : 0);
        frmModify.find("#DescriptionDetail").val(data.description);

        localStorage.setItem("id", $('#IdDetail').val());
        localStorage.setItem("type", "2");
    }
}
function fnEditSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formEdit");

    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#StatusEdit").val(data.status == true ? 1 : 0);
        frmModify.find("#DescriptionEdit").val(data.description);

        localStorage.setItem("id", $('#IdEdit').val());
        //localStorage.setItem("name", $('#nameEdit').val());
        //localStorage.setItem("status", $('#StatusEdit').val());
        //localStorage.setItem("description", $('#DescriptionEdit').val());
        localStorage.setItem("type", "3");
    }
}
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {

    $('#modalUnitTypeDetail').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idUnitType').val(id);
        modal.find('#nameUnitTypeDetail').val(name);
        modal.find('#StatusDetail').val(status == true ? 1 : 2);
        modal.find('#DescriptionDetail').val(description);

    });
    var validator = $("#modalUnitTypeDetail").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmUnitTypeDetail").find("#idUnitType").val();
            var name = $("#frmUnitTypeDetail").find("#nameUnitTypeDetail").val();
            var status = $("#frmUnitTypeDetail").find("#StatusDetail").val() == true ? 1 : 2;
            var description = $("#frmUnitTypeDetail").find("#DescriptionDetail").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.systemunittype.controller,
                apiConfig.api.systemunittype.action.getItem.path,
                apiConfig.api.systemunittype.action.getItem.method);
        }
    });
    $('#modalUnitTypeEdit').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idUnitTypeEdit').val(id);
        modal.find('#nameUnitTypeEdit').val(name);
        modal.find('#StatusEdit').val(status == true ? 1 : 2);
        modal.find('#DescriptionEdit').val(description);

    });
    var validator = $("#modalUnitTypeEdit").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmUnitTypeEdit").find("#idUnitTypeEdit").val();
            var name = $("#frmUnitTypeEdit").find("#nameUnitTypeEdit").val();
            var status = $("#frmUnitTypeEdit").find("#StatusEdit").val() == true ? 1 : 2;
            var description = $("#frmUnitTypeEdit").find("#DescriptionEdit").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.systemunittype.controller,
                apiConfig.api.systemunittype.action.update.path,
                apiConfig.api.systemunittype.action.update.method);
        }
    });
});

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

window.onload = function () {
    //let checkLocalStatus = localStorage.getItem('status');
    //if (checkLocalStatus == null) {
    //    localStorage.setItem('status', "-1");
    //}
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