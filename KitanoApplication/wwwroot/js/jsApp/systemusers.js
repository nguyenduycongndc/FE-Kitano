$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
});
function callApi_multipleselect(selector, placeholder, host, controller, action) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: false,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: host + controller + action,
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
var count = 0;
function openView(type, value, frmHeader) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("strHeader");
    localStorage.setItem("strHeader", frmHeader);
    var _index = $("#view");
    var _modify = $("#modify");
    var _detail = $("#detail");
    var _header_index = $("#header-view");
    var _header_create = $("#header-create");
    var _header_edit = $("#header-edit");
    var _header_detail = $("#header-detail");
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
        if (count == 0) {
            setTimeout(function () {
                getParents();
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
        document.getElementById("form-users").reset();
        $("#frmHeader").text(frmHeader);
        $("#UsersGroup").empty();
        $("#RoleId").empty();
        changeStatusPass();
        if (value > 0) {
            _header_create.hide();
            _header_edit.show();
            $("#form-users").find("#showdatasource").hide();
            fnGetData(type, value);
        }
        else {
            localStorage.setItem("id", value);
            localStorage.setItem("type", type);
            _header_create.show();
            _header_edit.hide();
            $("#form-users").find("#showdatasource").show();
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
        $("#UsersGroupDetail").empty();
        $("#RoleIdDetail").empty();
        fnGetData(type, value);
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);
        $("textarea").prop("readonly", true);
    }
}
function Edit(id) {
    window.location.href = "/Users/Edit?id=" + id;
}
function View(id) {
    window.location.href = "/Users/Details?id=" + id;
}
function Delete(id, username) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + " " + username,
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
        text: "Bạn có chắc muốn xóa người dùng được chọn!",
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
function UserActive(id, input) {
    var status = 1;
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}
function updateUserSuccess(data) {
    //swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    if (data.code === '1') {
        toastr.success(localizationResources.SaveSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Cập nhật người dùng", "");
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        localStorage.removeItem("strHeader");
        setTimeout(function () {
            window.location.href = "/Users"
        }, 300);
    }
    else if (data.code === '2'){
        toastr.error("Tên đăng nhập đã tồn tại", "Lỗi!", { progressBar: true });
    }
    else if (data.code === '3') {
        toastr.error("Email đã tồn tại", "Lỗi!", { progressBar: true });
    }
    else {
        toastr.error(localizationResources.SaveFail, "Lỗi!", { progressBar: true });
    }
   
}
function updateFail(request, status, error) {
    //swal(localizationResources.Error, localizationResources.SaveFail, "error");
    toastr.error(localizationResources.SaveFail, "Lỗi!", { progressBar: true });
}
function changepassSuccess(data) {
    if (data.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.ChangePasswordSuccess, "success");
        toastr.success(localizationResources.ChangePasswordSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Cập nhật mật khẩu", "");
        onSearch();
        $('#modelChangePass .close').click();
    }
    else {
        //swal(localizationResources.Error, localizationResources.ChangePasswordFailed, "error");
        toastr.error(localizationResources.ChangePasswordFailed, "Lỗi!", { progressBar: true });
    }
}
function changepassUserSuccess(data) {
    if (data.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.ChangePasswordSuccess, "success");
        toastr.success(localizationResources.ChangePasswordSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Cập nhật mật khẩu", "");
        //onSearch();
    }
    else if (data.code === '0') {
        //swal(localizationResources.Error, "Mật khẩu hiện tại không đúng!", "error");
        toastr.error("Mật khẩu hiện tại không đúng!", "Lỗi!", { progressBar: true });

    }
    else {
        //swal(localizationResources.Error, localizationResources.ChangePasswordFailed, "error");
        toastr.error(localizationResources.ChangePasswordFailed, "Lỗi!", { progressBar: true });

    }
}
function changeWorkplaceSuccess(data) {
    if (data.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.ChangeWorkPlaceSuccess, "success");
        toastr.success(localizationResources.ChangeWorkPlaceSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Cập nhật nơi công tác", "");
        onSearch();
        $('#modelChangeWorkplace .close').click();

    }
    else {
        //swal(localizationResources.Error, localizationResources.ChangeWorkPlaceFailed, "error");
        toastr.error(localizationResources.ChangeWorkPlaceFailed, "Lỗi!", { progressBar: true });
    }
}
function fnSearchSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#usertable tbody');
        $("#usertable").dataTable().fnDestroy();
        tbBody.html('');
        var key_edit = "'" + localizationResources["Edit"] + "'";
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var _usertype = '';
            switch (obj.users_type) {
                case 1:
                    _usertype = 'Kiểm toán nội bộ';
                    break;
                case 2:
                    _usertype = 'Đơn vị được kiểm toán';
                    break;
                case 3:
                    _usertype = 'Khác';
                    break;
                default:
            }
            var _department = '';
            switch (obj.department_id) {
                case 1:
                    _department = 'Phòng Kế Toán';
                    break;
                case 2:
                    _department = 'Phòng IT';
                    break;
                case 3:
                    _department = 'Phòng Marketing';
                    break;
                default:
            }
            var user_name = "'" + obj.user_name + "'";
            var keyfocus = "'FullName'";
           
            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td class="line-break">' + obj.user_name + '</td>' +
                '<td class="line-break">' + obj.full_name + '</td>' +
                '<td class="text-center">' +
                (IsCheckPemission('M_U', 'PER_STATUS') === true && obj.roleId !== 1 ? '<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === 1 ? 'checked' : '') + ' onclick="UserActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div>' : '<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === 1 ? 'checked' : '') + ' disabled ><label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div>')
                +
                '</td>' +
                '<td class="line-break">' + _usertype + '</td>' +
                '<td class="line-break">' + obj.department_name + '</td>' +
                '<td class="col-action">' +
                (IsCheckPemission('M_U', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                +
                (IsCheckPemission('M_U', 'PER_EDIT') === true && obj.roleId !== 1 ?
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(1,' + obj.id + ',' + key_edit + ')" onmouseup="setTimeout(function () { document.getElementById(' + keyfocus +').focus() }, 10); "><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>')
                +
                (IsCheckPemission('M_U', 'PER_DEL') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(' + obj.id + ',' + user_name + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +
                '<span class="dropdown">' +
                    '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                    '<li class="optioncustom">' +
                (IsCheckPemission('M_U', 'PER_EDIT') === true && obj.roleId !== 1 && obj.data_source != 1 ?
                '<a type="button" class="btn icon-default btn-action-custom"  data-toggle="modal" data-target="#modelChangePass" data-id="' + obj.id + '" data-username="' + obj.user_name + '" ><i data-toggle="tooltip" title="Thiết lập lại mật khẩu" class="fa fa-key" aria-hidden="true"></i>&nbsp Thiết lập mật khẩu</a>' :
                        '<a type="button" class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Thiết lập mật khẩu" class="fa fa-key" aria-hidden="true"></i>&nbsp Thiết lập mật khẩu</a>')
                    +
                    '</li>' +
                    '<li class="optioncustom">' +
                (IsCheckPemission('M_U', 'PER_EDIT') === true && obj.roleId !== 1 && obj.data_source != 1 ?
                '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modelChangeWorkplace" data-id="' + obj.id + '" data-username="' + obj.user_name + '" data-department="' + obj.department_id + '" ><i data-toggle="tooltip" title="Cập nhật nơi làm việc" class="fa fa-briefcase" aria-hidden="true"></i>&nbsp Cập nhật nơi làm việc</a>' :
                        '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật nơi làm việc" class="fa fa-briefcase" aria-hidden="true"></i>&nbsp Cập nhật nơi làm việc</a>')
                    +
                    '</li>' +  
                    '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#usertable").DataTable({
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
                    "targets": [3, 4, 5, 6],
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
        var _tbBody = $('#usertable tbody');
        $("#usertable").dataTable().fnDestroy();
        _tbBody.html('');
        $("#usertable").dataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": [0, 3, 4, 5, 6],
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

function fnGetDetailSuccess(rspn) {
    var frmDetail = $("#form-users-detail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var _date;
        if (data.date_of_joining) {
            _date = $.format.date(data.date_of_joining, 'dd/MM/yyyy')
        }
        else {
            _date = data.date_of_joining
        }
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

        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#FullNameDetail").val(data.full_name);
        frmDetail.find("#EmailDetail").val(data.email);
        frmDetail.find("#UserNameDetail").val(data.user_name);
        frmDetail.find("#UserTypeDetail").val(data.users_type).change();
        frmDetail.find('#StatusDetail').val(data.status).change();
        frmDetail.find("#CreateUser").val(data.created_by);
        frmDetail.find("#CreatorAt").val(_date_created_at);
        frmDetail.find("#UpdateUser").val(data.modified_by);
        frmDetail.find("#UpdateDate").val(_date_modified_at);
        frmDetail.find("#data_source").val(data.data_source).change();
        $('#DeparmentDetail').val(data.department_id).change();
        frmDetail.find("#DateOfJoiningDetailDetail").val(_date);
        if (frmDetail.find('#LastOnlineDetail').length > 0) {
            var _date1;
            if (data.last_online_at) {
                _date1 = $.format.date(data.last_online_at, 'dd/MM/yyyy HH:mm:ss')
            }
            else {
                _date1 = ""
            }
            frmDetail.find('#LastOnlineDetail').val(_date1);
        }
        var _list = data.list_group;
        if (_list.length > 0) {
            $(_list).each(function () {
                var newOption = new Option(this.split(':')[1], this.split(':')[0], true, true);
                frmDetail.find("#UsersGroupDetail").append(newOption).trigger('change');
            });
        }
        var _listRoles = data.list_roles;
        if (_listRoles.length > 0) {
            $(_listRoles).each(function () {
                var newOption = new Option(this.split(':')[1], this.split(':')[0], true, true);
                frmDetail.find("#RoleIdDetail").append(newOption).trigger('change');
            });
        }
        localStorage.setItem("id", data.id);
        localStorage.setItem("type", "2");
    }
}
function fnGetDetailChangePassSuccess(rspn) {
    var frmDetail = $("#form-change-pass-users");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetail.find("#Id").val(data.id);
        frmDetail.find("#FullName").val(data.full_name).prop("readonly",true);
        frmDetail.find("#Email").val(data.email).prop("readonly", true);
        frmDetail.find("#UserName").val(data.user_name).prop("readonly", true);
    }
}
function fnDeleteSuccess(rspn) {
    if (rspn.code === '1') {
        //swal(localizationResources.Successfully, localizationResources.DeletedSuccessfully, "success");
        toastr.success(localizationResources.DeletedSuccessfully, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Xóa người dùng", "");
        onSearch();
    }
    else if (rspn.code === '0') {
        //swal(localizationResources.Error, localizationResources.UserManipulateData, "error");
        toastr.error(localizationResources.UserManipulateData, "Lỗi!", { progressBar: true });
    }
    else {
        //swal(localizationResources.Error, localizationResources.DeletedFailed, "error");
        toastr.error(localizationResources.DeletedFailed, "Lỗi!", { progressBar: true });
    }

}
function fnActiveSuccess(rspn) {
    if (rspn.code === '1') {
       // swal(localizationResources.Successfully, localizationResources.UpdateStatusSuccess, "success");
        toastr.success(localizationResources.UpdateStatusSuccess, "Thành công!", { progressBar: true });
        createdLogKitano("Quản lý người dùng", "Cập nhật trạng thái", "");
    }
    else {
       // swal(localizationResources.Error, localizationResources.UpdateStatusFailed, "error");
        toastr.error(localizationResources.UpdateStatusFailed, "Lỗi!", { progressBar: true });

    }
}
function fillParentCombo(data) {
    var htmlOption = '<option value="">----Chọn----</option>';
    $('#filterDeparment').html('');
    $('#DeparmentDetail').html('');
    $('#frmChangeWorkplace').find("#DeparmentChange").html('');

    $('#filterDeparment').append(htmlOption);
    $('#frmChangeWorkplace').find("#DeparmentChange").append(htmlOption);
    $('#DeparmentDetail').append(htmlOption);

    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'childs');

    $('#filterDeparment').append(html);
    $('#frmChangeWorkplace').find("#DeparmentChange").append(html);
    $('#DeparmentDetail').append(html);
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
function onSearch() {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var obj = {
        'full_name': $('#filterFullName').val(),
        'users_type': $('#filterUserType').val(),
        'user_name': $('#filterUserName').val(),
        'department_id': $('#filterDeparment').val(),
        'status': $('#filterStatus').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.search.path,
        apiConfig.api.systemuser.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess', 'msgError');
}
function fnGetData(type, param) {
    var _fnName = '';
    if (type === 1) {
        _fnName = 'fnGetDataSuccess';
    }
    else if (type === 2) {
        _fnName = 'fnGetDetailSuccess';
    }
    else if (type === 3) {
        _fnName = 'fnGetDetailChangePassSuccess';
    }
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.getItem.path + "/" + param,
        apiConfig.api.systemuser.action.getItem.method,
        null, _fnName, 'msgError');
}
function fnDelete(id) {
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.delete.path + "/" + id,
        apiConfig.api.systemuser.action.delete.method,
        null, 'fnDeleteSuccess', 'msgError');
}
function fnDeleteAll() {
    var _objList = $('input[class="checkitem"]:checked').map((_, el) => el.value).get();
    var obj = {
        'listID': _objList.join()
    }
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.deleteall.path,
        apiConfig.api.systemuser.action.deleteall.method,
        obj, 'fnDeleteSuccess', 'msgError');
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.active.path,
        apiConfig.api.systemuser.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
$(document).on('change', '#FullName', function () {
    var main = titleCase($(this).val());
    $(this).val(main);
})
$(document).on('change', '#UserName', function () {
    var temp = $(this).val();
    var main = temp != undefined && temp != "" ? temp.toLowerCase() : temp;
    $(this).val(main);
})
var validateform;
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#form-users").validate({
        rules: {
            FullName: { required: true, minlength: 2 },
            UserName: { required: true, hasWhiteSpace: true, minlength: 2 },
            Email: { required: true, checkmail: true, minlength: 2},
            Password: {
                minlength: 6,
                maxlength: 30,
                required: true,
                checklower: true,
                checkupper: true,
                checkdigit: true,
                pwcheckspechars: true
            }
        },
        submitHandler: function () {
            var obj = {
                'id': $("#form-users").find('#Id').val(),
                'full_name': $("#form-users").find('#FullName').val(),
                'email': $("#form-users").find('#Email').val(),
                'user_name': $("#form-users").find('#UserName').val(),
                'password': $("#form-users").find('#Password').val(),
                'users_type': $("#form-users").find('#UserType').val(),
                'status': $("#form-users").find('#Status').val(),
                'department_id': $("#form-users").find('#Deparment').val(),
                'date_of_joining': $("#form-users").find('#DateOfJoining').val(),
                'list_group_id': $("#form-users").find("#UsersGroup").val(),
                'list_role_id': $("#form-users").find("#RoleId").val(),
                'data_source': $("#form-users").find("#data_source").val(),
            }
            if ($("#form-users").find('#Id').val() === '0') {
                callApi_userservice(
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.add.path,
                    apiConfig.api.systemuser.action.add.method,
                    obj, 'updateUserSuccess');
            }
            else {
                callApi_userservice(
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.update.path,
                    apiConfig.api.systemuser.action.update.method,
                    obj, 'updateUserSuccess');
            }
        }
    });
    $('#modelChangePass').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var username = button.data('username');
        var modal = $(this);
        modal.find('#iduser').val(id);
        modal.find('#user_name').val(username);
        modal.find('#iduser').val(id);

    });
    $('#modelChangeWorkplace').on('show.bs.modal', function (event) {
        validator_.resetForm();
        document.getElementById("frmChangeWorkplace").reset();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var username = button.data('username');
        var department_id = button.data('department');
        var modal = $(this);
        modal.find('#iduser').val(id);
        modal.find('#user_name').val(username);
        modal.find('#iduser').val(id);
        if (department_id != undefined && department_id != "" && department_id != null) {
            modal.find('#DeparmentChange').val(department_id).change();
        }
    });
    var validator = $("#frmChangePass").validate({
        rules: {
            Newpassword: {
                minlength: 6,
                maxlength: 30,
                required: true,
                checklower: true,
                checkupper: true,
                checkdigit: true,
                pwcheckspechars: true
            },
            ConfirmNewpassword: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmChangePass").find("#iduser").val();
            var pass = $("#frmChangePass").find("#Newpassword").val();
            var confirmpass = $("#frmChangePass").find("#ConfirmNewpassword").val();
            if (pass === confirmpass) {
                var obj = {
                    'id': id,
                    'password': pass,
                }
                callApi_userservice(
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.changepass.path,
                    apiConfig.api.systemuser.action.changepass.method,
                    obj, 'changepassSuccess', 'msgError');
            }
            else {
                //swal(localizationResources.Error401, localizationResources.CheckMatchPassword, "warning");
                toastr.warning(localizationResources.CheckMatchPassword, "Thông báo!", { progressBar: true });
            }

        }
    });
    $("#form-change-pass-users").validate({
        rules: {
            PasswordOld: { required: true },
            PasswordNew: {
                minlength: 6,
                maxlength: 30,
                required: true,
                checklower: true,
                checkupper: true,
                checkdigit: true,
                pwcheckspechars: true
            },
            ConfirmPassword: { required: true },
        },
        submitHandler: function () {
            var id = $("#form-change-pass-users").find("#Id").val();
            var pass = $("#form-change-pass-users").find("#PasswordNew").val();
            var confirmpass = $("#form-change-pass-users").find("#ConfirmPassword").val();
            var oldpass = $("#form-change-pass-users").find("#PasswordOld").val();
            if (pass === confirmpass) {
                var obj = {
                    'id': id,
                    'new_password': pass,
                    'old_password': oldpass,
                }
                callApi_userservice(
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.changepassuser.path,
                    apiConfig.api.systemuser.action.changepassuser.method,
                    obj, 'changepassUserSuccess', 'msgError');
            }
            else {
                //swal(localizationResources.Error401, localizationResources.CheckMatchPassword, "warning");
                toastr.warning(localizationResources.CheckMatchPassword, "Thông báo!", { progressBar: true });
            }

        }
    });
    var validator_ = $("#frmChangeWorkplace").validate({
        rules: {
            DeparmentChange: { required: true },
            DateOfJoiningChange: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmChangeWorkplace").find("#iduser").val();
            var deparment = $("#frmChangeWorkplace").find("#DeparmentChange").val();
            var dateofjoining = $("#frmChangeWorkplace").find("#DateOfJoiningChange").val();
            var obj = {
                'id': id,
                'departmentId': deparment,
                'dateofjoining': dateofjoining,
            }
            callApi_userservice(
                apiConfig.api.systemuser.controller,
                apiConfig.api.systemuser.action.changeworkplace.path,
                apiConfig.api.systemuser.action.changeworkplace.method,
                obj, 'changeWorkplaceSuccess', 'msgError');
        }
    });
});
function fnGetDataSuccess(rspn) {
    validateform.resetForm();
    var frmModify = $("#form-users");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var _date;
        if (data.date_of_joining) {
            _date = $.format.date(data.date_of_joining, 'dd/MM/yyyy')
        }
        else {
            _date = data.date_of_joining
        }
        frmModify.find("#Id").val(data.id);
        frmModify.find("#FullName").val(data.full_name);
        frmModify.find("#Email").val(data.email);
        frmModify.find("#UserName").val(data.user_name);
        frmModify.find("#UserName").prop("readonly", true);
        frmModify.find("#UserType").val(data.users_type).change();
        frmModify.find("#UserType").prop("disabled", true);
        frmModify.find('#Status').val(data.status).change();
        frmModify.find('#Deparment').val(data.department_id).change();
        frmModify.find('#Password').val("Tinhvan@123");
        frmModify.find('#Password').prop("readonly", true);
        frmModify.find("#showdatasource").hide();
        frmModify.find("#DateOfJoining").val(_date);
        var _list = data.list_group;
        if (_list.length > 0) {
            $(_list).each(function () {
                var newOption = new Option(this.split(':')[1], this.split(':')[0], true, true);
                frmModify.find("#UsersGroup").append(newOption).trigger('change');
            });
        }

        var _listRoles = data.list_roles;
        if (_listRoles.length > 0) {
            $(_listRoles).each(function () {
                var newOption = new Option(this.split(':')[1], this.split(':')[0], true, true);
                frmModify.find("#RoleId").append(newOption).trigger('change');
            });
        }

        localStorage.setItem("id", data.id);
        localStorage.setItem("type", "1");
    }
}
function changeStatusPass() {
    var value = $("#form-users").find("#data_source").val();
    if (value == "1") {
        $("#form-users").find("#Password").val("Tinhvan@123");
        $("#form-users").find("#Password").prop("readonly", true);
    }
    else {
        $("#form-users").find("#Password").prop("readonly", false);
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