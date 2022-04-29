$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
});
var count = 0;
function openView(type, value, frmHeader) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("strHeader");
    localStorage.setItem("strHeader", frmHeader);
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _roles = $("#roles");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
    var _header_role = $("#header-role");
    $("input").prop("readonly", false);
    $("select").prop("disabled", false);
    $("textarea").prop("readonly", false);
    if (type === 0) { //view
        _index.show();
        _header_index.show();
        _modify.hide();
        _header_create.hide();
        _header_edit.hide();
        _detail.hide();
        _header_detail.hide();
        _roles.hide();
        _header_role.hide();
        if (count == 0) {
            setTimeout(function () {
                onSearch();
            }, 100);
            count++;
        }
    }
    else if (type === 1) { //modify
        _index.hide();
        _header_index.hide();
        _modify.show();
        _detail.hide();
        _header_detail.hide();
        _roles.hide();
        _header_role.hide();
        $("#frmHeader").text(frmHeader);
        document.getElementById("form-users").reset();
        if (value > 0) {
            _header_create.hide();
            _header_edit.show();
            fnGetData(type, value);
        }
        else {
            localStorage.setItem("id", value);
            localStorage.setItem("type", type);
            _header_create.show();
            _header_edit.hide();
        }
    }
    else if (type === 2) { // detail
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_create.hide();
        _header_edit.hide();
        _detail.show();
        _header_detail.show();
        _roles.hide();
        _header_role.hide();
        fnGetData(type, value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
    }
    else if (type === 3) { // permission
        localStorage.setItem("id", value);
        localStorage.setItem("type", type);
        _index.hide();
        _header_index.hide();
        _modify.hide();
        _header_create.hide();
        _header_edit.hide();
        _detail.hide();
        _header_detail.hide();
        _roles.show();
        _header_role.show();
        $("#permission_header").text(localizationResources.PermissionOfRole + ": " + frmHeader)
        $("#form-users-roles").find("#Id").val(value);
        var url = apiConfig.api.host_user_service + apiConfig.api.roles.controller + apiConfig.api.roles.action.getpermission.path;
        $.ajax({
            type: "GET",
            url: url,
            data: { id: value },
            dataType: "json",
            success: function (result) {
                if (result.code === '1') {
                    createJSTree(result.data);
                }
            }
        });
    }
}
function createJSTree(jsondata) {
    $.getScript('/js/jstree/jstree.min.js', function () {
        var tree = $('#treeview_div').jstree(true);
        if (tree != false) {
            tree.destroy();
        }
        tree = $('#treeview_div').jstree({
            'core': {
                'data': jsondata
            },
            "checkbox": {
                "keep_selected_style": true
            },
            "types": {
                "file": {
                    "icon": "fa fa-file-o",
                    "valid_children": []
                }
            },
            "plugins": ["checkbox", "types"]
        });


        $(".Open-TreeView").click(function () {
            tree.jstree('open_all');
        })
        $(".Close-TreeView").click(function () {
            tree.jstree('close_all');
        })
    });
}
function ActionSave() {
    var checked_ids = [];
    var result = $('#treeview_div').jstree("get_selected", true);
    result.filter((node) => {
        var _id = node.id;
        var _list = _id.split("_");
        if (_list.length > 2) _id = _id.substring(0, _id.length - 2);
        if ($.inArray(_id, checked_ids) === -1)
            checked_ids.push(node.id)
    })
    $("#treeview_div").find(".jstree-undetermined").each(function (i, element) {
        var _id = $(element).closest('.jstree-node').attr("id");
        if ($.inArray(_id, checked_ids) === -1)
            checked_ids.push(_id);
    });
    var obj = {
        'id': $("#form-users-roles").find("#Id").val(),
        'list_permission': checked_ids.sort(),
    }
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.updatepermission.path,
        apiConfig.api.roles.action.updatepermission.method,
        obj, 'updateSuccess', 'updateFail');
}
function Delete(id, name) {
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
            fnDelete(id);

        }
    });
}
function DeleteAll() {
    swal({
        title: localizationResources.Confirm,
        text: "Bạn có chắc muốn xóa nhóm vai trò được chọn!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAll();
        }
    });
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
function RolesActive(id, input) {
    var status = 1;
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}
function updateSuccess(data) {
    //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
    createdLogKitano("Quản lý vai trò", "Cập nhật vai trò", "");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("strHeader");
    setTimeout(function () {
        window.location.href = "/Roles"
    }, 2000);
}
function updateFail(request, status, error) {
    //swal(localizationResources.Error, localizationResources.SaveFail, "error");
    toastr.error(localizationResources.SaveFail, "Lỗi!", { progressBar: true });
}
function fnSearchSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#rolestable tbody');
        $("#rolestable").dataTable().fnDestroy();
        tbBody.html('');
        var key_edit = "'" + localizationResources["Edit"] + "'";
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var full_name = "'" + obj.full_name + "'";
            var html = '<tr>' +
                '<td class="text-center">' + (i + 1) + '</td>' +
                '<td class="line-break">' + obj.full_name + '</td>' +
                '<td class="text-center">'
                +
                (IsCheckPemission('M_R', 'PER_STATUS') === true ? '<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === 1 ? 'checked' : '') + ' onclick="RolesActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div>' : '<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === 1 ? 'checked' : '') + ' disabled ><label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div>')
                + '</td>' +
                '<td class="line-break">' + obj.description + '</td>' +
                '<td class="col-action">' +
                (IsCheckPemission('M_R', 'PER_DETAIL') === true ? '<a  class="btn icon-default btn-action-custom"  onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' : '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>')
                +
                (IsCheckPemission('M_R', 'PER_EDIT') === true ? '<a type="button" class="btn icon-default btn-action-custom"  onclick="openView(1,' + obj.id + ',' + key_edit + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>')
                 +
                (IsCheckPemission('M_R', 'PER_DEL') === true ? '<a type="button" class="btn icon-delete btn-action-custom"  onclick="Delete(' + obj.id + ',' + full_name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' : '<a class="btn icon-disabled btn-action-custom"  onclick="Delete(' + obj.id + ',' + full_name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>')
                +
                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_R', 'PER_EDIT') === true && obj.roleId !== 1 ?
                '<a class="btn icon-default btn-action-custom"  onclick="openView(3,' + obj.id + ',' + full_name + ')"><i data-toggle="tooltip" title="Gán quyền hạn" class="fa fa-gavel" aria-hidden="true"></i>&nbsp Gán quyền hạn</a>' :
                '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Gán quyền hạn" class="fa fa-gavel" aria-hidden="true"></i>&nbsp Gán quyền hạn</a>')
                +
                '</li>' +               
                '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#rolestable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": 0,
                    "className": "text-center",
                    "sortable": false,
                    "orderable": false,
                    "data": null,
                    render: function (data, type, row, meta) {
                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [2, 3, 4],
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
    }
    else {
        var _tbBody = $('#rolestable tbody');
        $("#rolestable").dataTable().fnDestroy();
        _tbBody.html('');
        $("#rolestable").dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": [0, 2, 3, 4],
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
function fnDeleteSuccess(rspn) {
    if (rspn.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.DeletedSuccessfully, "success");
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý vai trò", "Xóa vai trò", "");
        onSearch();
    }
    else {
        //swal(localizationResources.Error, localizationResources.DeletedFailed, "error");
        toastr.error(localizationResources.DeletedFailed, "Lỗi!", { progressBar: true });
    }
}
function fnActiveSuccess(rspn) {
    if (rspn.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.UpdateStatusSuccess, "success");
        toastr.success(localizationResources.UpdateStatusSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý vai trò", "Cập nhật trạng thái vai trò", "");
    }
    else {
        //swal(localizationResources.Error, localizationResources.UpdateStatusFailed, "error");
        toastr.error(localizationResources.UpdateStatusFailed, "Lỗi!", { progressBar: true });

    }
}

function fnGetDetailSuccess(rspn) {
    var frmDetail = $("#form-users-detail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#FullName").val(data.full_name);
        frmDetail.find("#Description").val(data.description);
        frmDetail.find('#Status').val(data.status).change();
        var _date_created_at;
        if (data.created_at) {
            _date_created_at = $.format.date(data.created_at, 'dd/MM/yyyy')
        }
        else {
            _date_created_at = data.created_at
        }
        var _date_modified_at;
        if (data.modified_at) {
            _date_modified_at = $.format.date(data.modified_at, 'dd/MM/yyyy')
        }
        else {
            _date_modified_at = data.modified_at
        }
        frmDetail.find("#CreateUser").val(data.created_by);
        frmDetail.find("#CreatorAt").val(_date_created_at);
        frmDetail.find("#UpdateUser").val(data.modified_by);
        frmDetail.find("#UpdateDate").val(_date_modified_at);

        localStorage.setItem("id", data.id);
        localStorage.setItem("type", "2");
    }
}
function onSearch() {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var obj = {
        'full_name': $('#filterFullName').val(),
        'description': $('#filterDescription').val(),
        'status': $('#filterStatus').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.search.path,
        apiConfig.api.roles.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}
function fnDelete(id) {
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.delete.path + "/" + id,
        apiConfig.api.roles.action.delete.method,
        null, 'fnDeleteSuccess', 'msgError');
}
function fnDeleteAll() {
    var _objList = $('input[class="checkitem"]:checked').map((_, el) => el.value).get();
    var obj = {
        'listID': _objList.join()
    }
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.deleteall.path,
        apiConfig.api.roles.action.deleteall.method,
        obj, 'fnDeleteSuccess', 'msgError');
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.active.path,
        apiConfig.api.roles.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}
function fnGetData(type, param) {
    var _fnName = '';
    if (type === 1) {
        _fnName = 'fnGetDataSuccess';
    }
    else if (type === 2) {
        _fnName = 'fnGetDetailSuccess';
    }
    callApi_userservice(
        apiConfig.api.roles.controller,
        apiConfig.api.roles.action.getItem.path + "/" + param,
        apiConfig.api.roles.action.getItem.method,
        null, _fnName, 'msgError');

}
var validateform;
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#form-users").validate({
        rules: {
            FullName: { required: true, minlength: 2},
        },
        submitHandler: function () {
            var obj = {
                'id': $("#form-users").find('#Id').val(),
                'full_name': $("#form-users").find('#FullName').val(),
                'description': $("#form-users").find('#Description').val(),
                'status': $("#form-users").find('#Status').val(),
                'list_users_id': $("#form-users").find('#ListUsers').val(),
            }
            if ($("#form-users").find('#Id').val() === '0') {
                callApi_userservice(
                    apiConfig.api.roles.controller,
                    apiConfig.api.roles.action.add.path,
                    apiConfig.api.roles.action.add.method,
                    obj, 'updateSuccess', 'updateFail');
            }
            else {
                callApi_userservice(
                    apiConfig.api.roles.controller,
                    apiConfig.api.roles.action.update.path,
                    apiConfig.api.roles.action.update.method,
                    obj, 'updateSuccess', 'updateFail');
            }
        }
    });
});
function fnGetDataSuccess(rspn) {
    validateform.resetForm();
    var frmModify = $("#form-users");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmModify.find("#Id").val(data.id);
        frmModify.find("#FullName").val(data.full_name);
        frmModify.find("#Description").val(data.description);
        frmModify.find('#Status').val(data.status).change();
        localStorage.setItem("id", data.id);
        localStorage.setItem("type", "1");
    }
}
window.onload = function () {
    let checkLocalType = localStorage.getItem('type');
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem('id');
    let id = parseInt(checkLocalId);
    let LocalstrHeader = localStorage.getItem('strHeader');
    if (checkLocalType === null && checkLocalId === null) {
        type = 0;
        id = 0;
        LocalstrHeader = '';
    }
    setTimeout(function () {
        openView(type, id, LocalstrHeader);
    }, 100);

}
