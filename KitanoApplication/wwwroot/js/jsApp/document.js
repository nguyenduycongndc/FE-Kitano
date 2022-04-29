$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', getSessionToken());
        xhr.setRequestHeader('Accept-Language', 'vi-VN');
        showLoading();
    },
    complete: function (xhr, status, error) {
        hideLoading();

        if (xhr.status == 401)
            //swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
            toastr.error("Bạn cần phải đăng nhập vào hệ thống!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 404)
            //swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
            toastr.error("Không tìm thấy đối tượng để xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 500)
            //swal("Internal Server Error!", "Có lỗi xảy ra trong quá trình xử lý!", "warning");
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 400)
            //swal("Lỗi dữ liệu!", "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "warning");
            toastr.error("Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "Lỗi!", { progressBar: true });
        else if (xhr.status != 200)
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        //swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
    }
});

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

function DocumentActive(id, input) {
    var status = 1;
    //if ($(input).hasClass("active")) {
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}


function updateDocumentSuccess(data) {
    if (data.code === '1') {
        createdLog("Tài liệu", "Chỉnh sửa Tài liệu");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", { progressBar: true });

        setTimeout(function () {
            openView(0, 0);
        }, 100);
    } else if (data.code == 0) {
        swal("Error!", "Tài liệu không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Tài liệu này đã tồn tại!", "warning");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}

function createDocumentSuccess(data) {
    if (data.code === '1') {
        createdLog("Tài liệu", "Thêm mới Tài liệu");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success("Thêm mới dữ liệu thành công!", "Thông báo!", { progressBar: true });
        setTimeout(function () {
            window.location.href = "/Document"
        }, 100);
    } else if (data.code == 0) {
        swal("Error!", "Tài liệu không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Tài liệu này đã tồn tại!", "warning");
    }
    else {
        swal("Error!", "Thêm mới thất bại!", "error");
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

function Delete(name, id) {
    var _name = String(name);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteDocument(id);
        }
    });
}

function fnDeleteDocumentSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Tài liệu", "Xóa Tài liệu");
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        onSearch();
    }
    else {
        swal("Error!", "Xóa dữ liệu không thành công!", "error");
    }
}

function fnActiveSuccess(rspn) {
    if (rspn.code === '1') {
        swal("Thông báo!", "Cập nhật trạng thái  thành công!", "success");
    }
    else {
        swal("Error!", "Cập nhật trạng thái không thành công!", "error");
    }
}

function clickMenu() {
    openView(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function openView(type, value, frmHeader) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var detail = $("#detail");
    if (type === 0) {
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        document.getElementById("FileDinhKemCreate").value = null;
        document.getElementById("FileDinhKemEdit").value = null;
        setTimeout(function () {
            onSearch(); getUnit(); getUnitEdit();
            getUnitDetail();
        }, 100);
    }
    else if (type === 1) {
        index.hide();
        create.show();
        document.getElementById("nameCreate").focus();
        edit.hide();
        detail.hide();
        setTimeout(function () {
            getUnitCreate();
        }, 100);

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
        index.hide();
        create.hide();
        edit.show();
        document.getElementById("nameEdit").focus();
        detail.hide();
        fnGetDetail(type, value);
    }
}

function fnSearchDocumentSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#documenttable tbody');
        $("#documenttable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var textstatus = (obj.status == true ? "Sử dụng" : "Không sử dụng");

            var html = '<tr>' +
                '<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +
                '<td style="width: 10% !important;">' + obj.code + '</td>' +
                '<td style="width: 30% !important;">' + obj.name + '</td>' +
                '<td class="text-center" style="width: 10% !important;">' + obj.public_date + '</td>' +

                '<td class="text-center" style="width:25% !important;">' + obj.unitname + '</div></td>' +
                '<td style="width: 10% !important;" class="ellipsis"><span>' + textstatus + '</span></td>' +
                '<td class="col-action text-center" style="width: 10% !important;">' +
                (IsCheckPemission('M_DOC', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,\'' + obj.id + '\')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title=" Chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>') +

                (IsCheckPemission('M_DOC', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,\'' + obj.id + '\')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>') +

                (IsCheckPemission('M_DOC', 'PER_DEL') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(\'' + obj.name + '\',\'' + obj.id + '\')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +

                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())

        var t = $("#documenttable").DataTable({
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
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
    }
    else if (rspn.data == "") {
        var tbBody = $('#documenttable tbody');
        $("#documenttable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#documenttable").DataTable({
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

        reCalculatPagesCustomNull();
        hideLoading();
    }
}

function statusChange() {
    localStorage.setItem('status', $('#Status').val());
}

function onSearch() {
    var frmView = $("#formView");
    showLoading();
    if (localStorage.type && localStorage.dataObj) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        var obj = {
            'name': $('#Name').val().trim(),
            'code': $('#Code').val().trim(),
            'status': $('#Status').val(),
            'unitid': $('#Unit').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        callApi_userservice(
            apiConfig.api.document.controller,
            apiConfig.api.document.action.search.path,
            apiConfig.api.document.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchDocumentSuccess', 'msgError');
    } else if (!localStorage.type) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        statusChange();
        var obj = {
            'name': $('#Name').val().trim(),
            'code': $('#Code').val().trim(),
            'status': $('#Status').val(),
            'unitid': $('#Unit').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_userservice(
            apiConfig.api.document.controller,
            apiConfig.api.document.action.search.path,
            apiConfig.api.document.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchDocumentSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        callApi_userservice(
            apiConfig.api.document.controller,
            apiConfig.api.document.action.search.path,
            apiConfig.api.document.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchDocumentSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function fnDeleteDocument(id) {
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.delete.path + "/" + id,
        apiConfig.api.document.action.delete.method,
        null, 'fnDeleteDocumentSuccess', 'msgError');
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.active.path,
        apiConfig.api.document.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}
function submitCreate() {
    var obj = {
        'code': $('#codeCreate').val().trim(),
        'name': $('#nameCreate').val().trim(),
        'status': $('#statusCreate').val() == 1 ? true : false,
        'description': $('#descriptionCreate').val().trim(),
        'unitid': $('#unitCreate').val(),
        'public_date': $('#publicdateCreate').val(),
    }

    var check = false;
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    var input = document.getElementById('FileDinhKemCreate');
    var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
    if (input.files) {
        $.each(input.files, function (i, v) {
            var imageFile = v;
            var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
            if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            if (checkFilesize(imageFile) == true) {
                //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            formData.append("fileUpload[" + i + "]", imageFile);
        })
    }
    if (validateRequired('#formCreate')) {
        if (check != true) {
            callApi_userservice_update(
                apiConfig.api.document.controller,
                apiConfig.api.document.action.add.path,
                formData, 'createDocumentSuccess', 'msgError');
        }
    }
}

function submitEdit() {

    var obj = {
        'code': $('#codeEdit').val().trim(),
        'name': $('#nameEdit').val().trim(),
        'status': $('#statusEdit').val() == 1 ? true : false,
        'description': $('#descriptionEdit').val().trim(),
        'unitid': parseInt($('#unitEdit').val()),
        'public_date': $('#publicdateEdit').val(),
        'id': $('#IdEdit').val(),
    }

    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));

    var input = document.getElementById('FileDinhKemEdit');
    var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];

    if (input.files) {

        $.each(input.files, function (i, v) {
            var imageFile = v;
            var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
            if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                //swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            if (checkFilesize(imageFile) == true) {
                //swal("Error!", "Dung lương file cho phép là " + getFilesizeSystem(), "error");
                toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            formData.append("fileUpload[" + i + "]", imageFile);
        })
    }
    if (validateRequired('#formEdit')) {
        callApi_userservice_update(
            apiConfig.api.document.controller,
            apiConfig.api.document.action.update.path,
            formData, 'updateDocumentSuccess', 'msgError');
    }
}

function fnGetDetail(type, param) {
    var _param = String(param);
    var call_back = '';
    if (type === 3) {

        call_back = 'fnEditSuccess';
    }
    else if (type === 2) {

        call_back = 'fnGetDetailSuccess';
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.getItem.path + "/" + "" + _param + "",
        apiConfig.api.document.action.getItem.method,
        null, call_back, 'msgError');

}

function fnGetDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#nameDetail").val(data.name);
        frmModify.find("#statusDetail").val(data.status == true ? 1 : 0);
        frmModify.find("#codeDetail").val(data.code);
        frmModify.find("#unitDetail").val(data.unitid);
        frmModify.find("#publicdateDetail").val(data.public_date, 'dd/MM/yyyy');
        frmModify.find("#descriptionDetail").val(data.description);

        frmModify.find("#FileDetail").empty();

        localStorage.setItem("id", $('#IdDetail').val());
        localStorage.setItem("type", "2");

        frmModify.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFile(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmModify.find("#FileDetail").append(_append_data);
        }
        else {
            frmModify.find("#FileDetail").append('');
        }
    }
}

function DownloadFile(id) {
    window.open(apiConfig.api.host_user_service + apiConfig.api.document.controller + '/DownloadAttach?id=' + id, 'Download');
}

function fnEditSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#statusEdit").val(data.status == true ? 1 : 0);
        frmModify.find("#codeEdit").val(data.code);
        frmModify.find("#unitEdit").val(data.unitid);
        frmModify.find("#publicdateEdit").val(data.public_date, 'dd/MM/yyyy');
        frmModify.find("#descriptionEdit").val(data.description);

        frmModify.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += "<div>";
                _append_data += '<a href="javascript:DownloadFile(' + obj.id + ');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefile(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += "</div>";
            }
            frmModify.find("#FileDetail").append(_append_data);
        }
        else {
            frmModify.find("#FileDetail").append('');
        }

        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "3");
    }
}

$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {

    $('#modalDocumentDetail').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idDocument').val(id);
        modal.find('#nameDocumentDetail').val(name);
        modal.find('#StatusDetail').val(status == true ? 1 : 2);
        modal.find('#DescriptionDetail').val(description);

    });
    var validator = $("#modalDocumentDetail").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmDocumentDetail").find("#idDocument").val();
            var name = $("#frmDocumentDetail").find("#nameDocumentDetail").val();
            var status = $("#frmDocumentDetail").find("#StatusDetail").val() == true ? 1 : 2;
            var description = $("#frmDocumentDetail").find("#DescriptionDetail").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.document.controller,
                apiConfig.api.document.action.getItem.path,
                apiConfig.api.document.action.getItem.method);
        }
    });
    $('#modalDocumentEdit').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idEdit').val(id);
        modal.find('#nameEdit').val(name);
        modal.find('#statusEdit').val(status == true ? 1 : 2);
        modal.find('#descriptionEdit').val(description);
    });
    var validator = $("#modalDocumentEdit").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmDocumentEdit").find("#idDocumentEdit").val();
            var name = $("#frmDocumentEdit").find("#nameDocumentEdit").val();
            var status = $("#frmDocumentEdit").find("#StatusEdit").val() == true ? 1 : 2;
            var description = $("#frmDocumentEdit").find("#DescriptionEdit").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.document.controller,
                apiConfig.api.document.action.update.path,
                apiConfig.api.document.action.update.method);
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
    let checkLocalStatus = localStorage.getItem('status');
    if (checkLocalStatus == null) {
        localStorage.setItem('status', "1");
    }
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

function getUnit() {
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
        { 'jsonData': JSON.stringify(obj) }, 'fillUnit');
}

function fillUnit(rspn) {
    var data = rspn.data;
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#Unit').html('');
    $('#search-facility').append(htmlOption);
    $('#Unit').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#Unit').append(html);
}

function getUnitCreate() {
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
        { 'jsonData': JSON.stringify(obj) }, 'fillUnitCreate');
}

function fillUnitCreate(rspn) {
    var data = rspn.data;
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#unitCreate').html('');
    //$('#unitCreate2').html('');
    $('#search-facility').append(htmlOption);
    $('#unitCreate').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#unitCreate').append(html);
    //var html2 = generateComboOptions2(data, 0, 'childs');
    //$('#unitCreate2').append(html2);
}

function getUnitEdit() {
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
        { 'jsonData': JSON.stringify(obj) }, 'fillUnitEdit');
}

function fillUnitEdit(rspn) {
    var data = rspn.data;
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#unitEdit').html('');
    $('#search-facility').append(htmlOption);
    $('#unitEdit').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#unitEdit').append(html);
}

function getUnitDetail() {
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
        { 'jsonData': JSON.stringify(obj) }, 'fillUnitDetail');
}

function fillUnitDetail(rspn) {
    var data = rspn.data;
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#unitDetail').html('');
    $('#search-facility').append(htmlOption);
    $('#unitDetail').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#unitDetail').append(html);
}

function canDownload() {
    var id = $('#IdDetail').val();
    window.open(apiConfig.api.host_user_service + apiConfig.api.document.controller + '/DownloadAttach?id=' + id, 'Download');
}

//function downloadAttach() {
//    var id = $('#IdDetail').val();
//    callApi_userservice(
//        apiConfig.api.document.controller, '/DownloadAttach', 'GET', { 'id': id }, 'canDownload');
//}

window.onload = function () {
    let checkLocalStatus = localStorage.getItem('status');
    if (checkLocalStatus == null) {
        localStorage.setItem('status', "1");
    }
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

function deletefile(id) {
    swal({
        title: localizationResources.Confirm,
        text: "Bạn có chắc chắn muốn xóa file!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteFileScope(id);
        }
    });
}
function fnDeleteFileScope(id) {
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.deletefile.path + "/" + id,
        apiConfig.api.document.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}
function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        var param = $("#IdEdit").val();
        fnGetDetail(2, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}