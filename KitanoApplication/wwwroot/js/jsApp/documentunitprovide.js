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

function getStatusName(code) {
    switch (code) {
        case "0":
            return "Chưa cung cấp";
            break;
        case "1":
            return "Đã cung cấp";
            break;
        case "2":
            return "Cung cấp một phần";
            break;
        default:
            return "Chưa cung cấp";
            break;



    }
}
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

function openView(type, value, year) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var detail = $("#detail");
    var modal = $("#modalDocumentUpload");
    var upload = $("#upload");

    if (type === 0) {
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        upload.hide();
        document.getElementById("FileDinhKem").value = null;
        document.getElementById("FileDinhKemEdit").value = null;
        document.getElementById("FileDinhKemUpload").value = null;
        document.getElementById("FileUpload").value = null;
        setTimeout(function () {
            getUnit(); getYear(); getAuditWork();
            onSearch(); getUnitCreate(); getUnitEdit(); getYearEdit();
            getUnitDetail(); getYearDetail(); getAuditDetail();
        }, 100);
        $("#nameCreateAlert").text("");
        $("#nameEditAlert").text("");
    }
    else if (type === 1) {
        index.hide();
        create.show();
        document.getElementById("nameCreate").focus();
        edit.hide();
        detail.hide();
        setTimeout(function () {
            getUnitCreate(); getAuditCreate(); getYearCreate();
        }, 100);

        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        upload.hide();
        fnGetDetail(type, value);
    }
    else if (type === 3) {
        index.hide();
        create.hide();
        edit.show();
        document.getElementById("nameEdit").focus();
        detail.hide();
        update.hide();
        fnGetDetail(type, value);

        getAuditEdit(year);


    }
    else if (type === 4) {
        index.show();
        modal.show();
        create.hide();
        edit.hide();
        update.hide();
        document.getElementById("nameEdit").focus();
        detail.hide();
        fnUploadDetail(type, value);
    }
    else if (type === 5) {
        index.hide();
        modal.hide();
        create.hide();
        edit.hide();
        detail.hide();
        upload.show();

        setTimeout(function () {
            getYearImport(); getAuditWorkImport();
        }, 100);
    }
}

function clickMenu() {
    openView(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function onSearch() {
    var frmView = $("#formView");
    showLoading();
    if (localStorage.type && localStorage.dataObj) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        var obj = {
            'name': $('#Name').val().trim(),
            'auditworkid': $('#Audit').val(),
            'providestatus': $('#Status').val(),
            'unitid': $('#Unit').val(),
            'year': $('#Year').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        callApi_auditservice(
            apiConfig.api.documentunitprovide.controller,
            apiConfig.api.documentunitprovide.action.search.path,
            apiConfig.api.documentunitprovide.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchDocumentSuccess', 'msgError');
    } else if (!localStorage.type) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        statusChange();
        var obj = {
            'name': $('#Name').val().trim(),
            'auditworkid': $('#Audit').val(),
            'providestatus': $('#Status').val(),
            'unitid': $('#Unit').val(),
            'year': $('#Year').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_auditservice(
            apiConfig.api.documentunitprovide.controller,
            apiConfig.api.documentunitprovide.action.search.path,
            apiConfig.api.documentunitprovide.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchDocumentSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        callApi_auditservice(
            apiConfig.api.documentunitprovide.controller,
            apiConfig.api.documentunitprovide.action.search.path,
            apiConfig.api.documentunitprovide.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchDocumentSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function fnSearchDocumentSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#documenttable tbody');
        $("#documenttable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var textstatus = getStatusName(obj.providestatus);

            var html = '<tr>' +
                '<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +
                '<td style="width: 5% !important;">' + obj.year + '</td>' +
                '<td style="width: 30% !important;">' + obj.auditcode + ' - ' + obj.auditname + '</td>' +
                '<td style="width: 30% !important;">' + obj.name + '</td>' +
                '<td style="width: 25% !important;">' + obj.unitname + '</div></td>' +
                '<td style="width: 25% !important;">' + textstatus + '</div></td>' +

                '<td class="text-center" style="width: 10% !important;">' + obj.providedate + '</td>' +
                '<td class="text-center" style="width: 10% !important;">' + obj.expridate + '</td>' +

                '<td class="col-action text-center" style="width: 10% !important;">' +
                (IsCheckPemission('M_DUP', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,\'' + obj.id + '\')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title=" Chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>') +

                (IsCheckPemission('M_DUP', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,\'' + obj.id + '\',\'' + obj.year + '\')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>') +

                (IsCheckPemission('M_DUP', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalDocumentUpload" onclick="openView(4,\'' + obj.id + '\')"><i data-toggle="tooltip" title="Upload file" class="fas fa-upload" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-upload" aria-hidden="true"></i></a>') +
                //onclick="openView(3,\'' + obj.id + '\')"
                (IsCheckPemission('M_DUP', 'PER_DEL') === true && obj.roleId !== 1 ?
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
        createdLog("Tài liệu của đơn vị được kiểm toán cung cấp", "Xóa Tài liệu");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", { progressBar: true });
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        onSearch();
    }
    else {
        toastr.error("Xóa dữ liệu không thành công!", "Thông báo!", { progressBar: true });
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
    }
}

function fnDeleteDocument(id) {
    callApi_auditservice(
        apiConfig.api.documentunitprovide.controller,
        apiConfig.api.documentunitprovide.action.delete.path + "/" + id,
        apiConfig.api.documentunitprovide.action.delete.method,
        null, 'fnDeleteDocumentSuccess', 'msgError');
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_auditservice(
        apiConfig.api.documentunitprovide.controller,
        apiConfig.api.documentunitprovide.action.active.path,
        apiConfig.api.documentunitprovide.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}

function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'year': $('#yearCreate').val(),
        'description': $('#descriptionCreate').val().trim(),
        'auditworkid': $('#auditCreate').val(),
        'unitid': $('#unitCreate').val(),
        'email': $('#emailCreate').val(),
        'providestatus': $('#providestatusCreate').val(),
        'providedate': $('#providetimeCreate').val(),
        'expridate': $('#expireprovideCreate').val(),
    }
    var check = false;
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    var input = document.getElementById('FileDinhKem');
    var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip", "eml"];
    if (input.files.length > 0) {
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
                toastr.error("Dung lượng file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            formData.append("fileUpload[" + i + "]", imageFile);
        })
        if (validateRequired('#formCreate')) {
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.documentunitprovide.controller,
                    apiConfig.api.documentunitprovide.action.add.path,
                    formData, 'createDocumentSuccess', 'msgError');
            }
        }
    }
    else {
        if (validateRequired('#formCreate')) {

            callApi_auditservice_update(
                apiConfig.api.documentunitprovide.controller,
                apiConfig.api.documentunitprovide.action.add.path,
                formData, 'createDocumentSuccess', 'msgError');

        }
    }
}

function submitEdit() {

    var obj = {
        'name': $('#nameEdit').val().trim(),
        'year': $('#yearEdit').val(),
        'description': $('#descriptionEdit').val().trim(),
        'unitid': parseInt($('#unitEdit').val()),
        'id': parseInt($('#IdEdit').val()),
        'email': $('#emailEdit').val(),
        'providestatus': $('#providestatusEdit').val(),
        'providedate': $('#providetimeEdit').val(),
        'expridate': $('#expireprovideEdit').val(),
        'auditworkid': parseInt($('#auditEdit').val()),
    }
    var check = false;
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));

    var input = document.getElementById('FileDinhKemEdit');
    var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip", "eml"];

    if (input.files.length > 0) {

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
                toastr.error("Dung lượng file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }
            formData.append("fileUpload[" + i + "]", imageFile);
        })

        if (validateRequired('#formEdit')) {
            callApi_auditservice_update(
                apiConfig.api.documentunitprovide.controller,
                apiConfig.api.documentunitprovide.action.update.path,
                formData, 'updateDocumentSuccess', 'msgError');
        }
    }
    else {
        if (validateRequired('#formEdit')) {

            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.documentunitprovide.controller,
                    apiConfig.api.documentunitprovide.action.update.path,
                    formData, 'updateDocumentSuccess', 'msgError');
            }
        }
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
    callApi_auditservice(
        apiConfig.api.documentunitprovide.controller,
        apiConfig.api.documentunitprovide.action.getItem.path + "/" + "" + _param + "",
        apiConfig.api.documentunitprovide.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        console.log(data);

        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#nameDetail").val(data.name);
        frmModify.find("#providestatusDetail").val((data.providestatus != null && data.providestatus != "") ? data.providestatus : "0");
        frmModify.find("#emailDetail").val(data.email);
        frmModify.find("#yearDetail").val(data.year);
        frmModify.find("#auditDetail").val(data.auditworkid);
        frmModify.find("#unitDetail").val(data.unitid);
        frmModify.find("#providetimeDetail").val(data.providedate, 'dd/MM/yyyy');
        frmModify.find("#expireprovideDetail").val(data.expridate, 'dd/MM/yyyy');
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

function fnEditSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#yearEdit").val(data.year);
        frmModify.find("#auditEdit").val(data.auditworkid);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#providestatusEdit").val((data.providestatus != null && data.providestatus != "") ? data.providestatus : "0");
        
        frmModify.find("#emailEdit").val(data.email);
        frmModify.find("#unitEdit").val(data.unitid);
        frmModify.find("#providetimeEdit").val(data.providedate, 'dd/MM/yyyy');
        frmModify.find("#expireprovideEdit").val(data.expridate, 'dd/MM/yyyy');
        frmModify.find("#descriptionEdit").val(data.description);

        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "3");

        frmModify.find("#FileDetail").empty();

        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {
            var _append_data = "";

            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<div>';
                _append_data += '<a href="javascript:DownloadFile(' + obj.id + ');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefile(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += '</div>';
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
        modal.find('#StatusDetail').val((status != "" && status != "") ? status : "0");
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
            callApi_auditservice(
                apiConfig.api.documentunitprovide.controller,
                apiConfig.api.documentunitprovide.action.getItem.path,
                apiConfig.api.documentunitprovide.action.getItem.method);
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
            callApi_auditservice(
                apiConfig.api.documentunitprovide.controller,
                apiConfig.api.documentunitprovide.action.update.path,
                apiConfig.api.documentunitprovide.action.update.method);
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
    $('#search-facility').append(htmlOption);
    $('#unitCreate').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#unitCreate').append(html);
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

function Download() {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST",
        apiConfig.api.host_audit_service.concat(apiConfig.api.documentunitprovide.controller, apiConfig.api.documentunitprovide.action.download.path));
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_TaiLieuDVDKT_v0.1.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu!", "Lỗi!", { progressBar: true });
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra!", "Lỗi!", { progressBar: true });
        }
    }
    request.send();
}


function canDownload() {
    var id = $('#IdDetail').val();
    window.open(apiConfig.api.host_user_service + apiConfig.api.documentunitprovide.controller + '/DownloadAttach?id=' + id, 'Download');
}

//function downloadAttach() {
//    var id = $('#IdDetail').val();
//    callApi_auditservice(
//        apiConfig.api.documentunitprovide.controller, '/DownloadAttach', 'GET', { 'id': id }, 'canDownload');
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

function getAuditWorkCreate() {
    var obj = {
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWorkCreate');
}

function fillAuditWorkCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#auditCreate').html('');
    $('#auditCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value=' + obj.id + '>' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#auditCreate').append(html);
}

function getYearCreate() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearCreate');
}
function fillYearCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#yearCreate').html('');
    $('#yearCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#yearCreate').append(html);
}
function getValueYearCreate(value) {
    var _year = value;
    getAuditCreate(_year);
}

function getAuditCreate(year) {
    var obj = {
        'year': year,
        //'execution_status': 1,
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditCreate');
}
function fillAuditCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#auditCreate').html('');
    $('#auditCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#auditCreate').append(html);
}

function updateDocumentSuccess(data) {
    if (data.code === '1') {
        createdLog("Tài liệu do đơn vị được kiểm toán cung cấp", "Chỉnh sửa Tài liệu do đơn vị được kiểm toán cung cấp");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
        }, 100);
    } else if (data.code == 0) {
        swal("Error!", "Tài liệu không được để trống!", "warning");
    } else if (data.code == -1) {
        $("#nameEditAlert").text("Tài liệu này đã tồn tại!");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}

function createDocumentSuccess(data) {
    if (data.code === '1') {
        createdLog("Tài liệu do đơn vị được kiểm toán cung cấp", "Thêm mới Tài liệu do đơn vị được kiểm toán cung cấp");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success("Thêm mới dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            window.location.href = "/DocumentUnitProvide"
        }, 100);
    } else if (data.code == 0) {
        swal("Error!", "Tài liệu không được để trống!", "warning");
    } else if (data.code == -1) {
        $("#nameCreateAlert").text("Tài liệu này đã tồn tại!");
    }
    else {
        swal("Error!", "Thêm mới thất bại!", "error");
    }
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
    callApi_auditservice(
        apiConfig.api.documentunitprovide.controller,
        apiConfig.api.documentunitprovide.action.deletefile.path + "/" + id,
        apiConfig.api.documentunitprovide.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}
function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        var param = $("#IdEdit").val();
        fnGetDetail(3, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}

function getYearEdit() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearEdit');
}

function fillYearEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#yearEdit').html('');
    $('#yearEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#yearEdit').append(html);
}

function getValueYearEdit(value) {
    var _year = value;
    getAuditEdit(_year);
}

function getAuditEdit(year) {
    var obj = {
        'year': year,
        //'execution_status': 1,
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditEdit');
}
function fillAuditEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#auditEdit').html('');
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#auditEdit').append(html);
    $('#auditEdit').append(htmlOption);
}

function getYearDetail() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearDetail');
}

function fillYearDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#yearDetail').html('');
    $('#yearDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#yearDetail').append(html);
}

function getAuditDetail() {
    var obj = {
        //'execution_status': 1,
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditDetail');
}
function fillAuditDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#auditDetail').html('');
    $('#auditDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#auditDetail').append(html);
}

function DownloadFile(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.documentunitprovide.controller + '/DownloadAttach?id=' + id, 'Download');
}

function getYear() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYear');
}

function getYearImport() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearImport');
}

function fillYear(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#Year').html('');
    $('#Year').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#Year').append(html);
}

function fillYearImport(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#YearImport').html('');
    $('#YearImport').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#YearImport').append(html);
}

function getValueYear(value) {
    var _year = value;
    getAuditWork(_year);
}

function getAuditWork(year) {
    var obj = {
        'year': year,
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWork');
}

function getAuditWorkImport(year) {
    var obj = {
        'year': year,
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWorkImport');
}

function fillAuditWork(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#Audit').html('');
    $('#Audit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value=' + obj.id + '>' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#Audit').append(html);
}

function fillAuditWork(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#AuditImport').html('');
    $('#AuditImport').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value=' + obj.id + '>' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#AuditImport').append(html);
}

function uploadfile() {

    var obj = {
        'id': parseInt($('#IdDocumentUpload').val()),
        'name': $('#DocName').val().trim(),
        'description': $('#DocDescription').val().trim(),
        'unitid': parseInt($('#DocUnit').val()),
        'email': $('#DocEmail').val(),
        'expridate': $('#DocExpireprovide').val(),
        'auditworkid': parseInt($('#DocAudit').val()),
        'year': parseInt($('#DocYear').val()),
    }
    var check = false;
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));

    var input = document.getElementById('FileDinhKemUpload');
    var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip" , "eml"];

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
                toastr.error("Dung lượng file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                check = true;
                return false;
            }

            formData.append("fileUpload[" + i + "]", imageFile);
        })
        if (check != true) {
            callApi_auditservice_update(
                apiConfig.api.documentunitprovide.controller,
                apiConfig.api.documentunitprovide.action.update.path,
                formData, 'updateDocumentSuccess', 'msgError');
            $('#modalDocumentUpload').modal('hide');
        }

    }
    else {
        callApi_auditservice_update(
            apiConfig.api.documentunitprovide.controller,
            apiConfig.api.documentunitprovide.action.update.path,
            formData, 'updateDocumentSuccess', 'msgError');
        $('#modalDocumentUpload').modal('hide');
    }
}

function fnUploadDetail(type, param) {

    var _param = String(param);

    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_auditservice(
        apiConfig.api.documentunitprovide.controller,
        apiConfig.api.documentunitprovide.action.getItem.path + "/" + "" + _param + "",
        apiConfig.api.documentunitprovide.action.getItem.method,
        null, 'fnGetUpdateDetailSuccess', 'msgError');
}

function fnUploadFile() {
    var input = document.getElementById('FileUpload');

    //tiennv2 todo validate 2 textbox.
    if (input.files && input.files[0]) {
        var ext = $('#FileUpload').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['xlsx', 'xls']) == -1) {
            toastr.error(localizationResources.ExcelAllow, "Error!", { progressBar: true });
            return;
        }

        var formData = new FormData();
        var imageFile = input.files[0];
        formData.append("FileUpload", imageFile);

        callUpload_audit(apiConfig.api.documentunitprovide.controller,
            apiConfig.api.documentunitprovide.action.upload.path,
            formData, 'viewDataUpload', 'updateFail');
    }
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


function renderhtml_upload(trClass, obj, index) {
    return '<tr class="' + trClass + '">'
        + '<td class="text-center">' + (index + 1) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.description) + '</td>'
        + '<td>' + viewValue(obj.unitname) + '</td>'
        + '<td>' + viewValue(obj.email) + '</td>'
        + '<td>' + viewValue(obj.expridate) + '</td>'
        + '<td>' + viewValue(obj.providedate) + '</td>'
        + '<td>' + viewValue(obj.providestatus) + '</td>'
        + '<td>' + viewValue(getImportResult(obj.note)) + '</td>'
        + '</tr>';
}

function checkerror(hasError, rspn) {
    if (hasError)
        toastr.error(localizationResources.ExcelError, "Error!", { progressBar: true });
    else if (rspn.total > 0 && rspn.code == 1)
        toastr.success(localizationResources.Import + ' ' + localizationResources.Successfully, "Successfully!", { progressBar: true });
    else if (rspn.code == "800")
        toastr.error(localizationResources.Error800, "Error!", { progressBar: true });
    else
        toastr.error(localizationResources.NoDataImport, "Error!", { progressBar: true });
}

function updateFail(request, status, error) {
    //swal(localizationResources.Error, localizationResources.SaveFail, "error");
    toastr.error(localizationResources.SaveFail, "Lỗi!", { progressBar: true });
}

function fnGetUpdateDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formDocumentUpload");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdDocumentUpload").val(data.id);
        frmModify.find("#DocName").val(data.name);
        frmModify.find("#DocEmail").val(data.email);
        frmModify.find("#DocYear").val(data.year);
        frmModify.find("#DocAudit").val(data.auditworkid);
        frmModify.find("#DocUnit").val(data.unitid);
        frmModify.find("#DocExpireprovide").val(data.expridate, 'dd/MM/yyyy');
        frmModify.find("#DocDescription").val(data.description);
    }
}