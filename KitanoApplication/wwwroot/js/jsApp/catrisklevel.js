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

function CatRiskLevelActive(id, input) {
    var status = 1;
    //if ($(input).hasClass("active")) {
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}


function updateCatRiskLevelSuccess(data) {
    if (data.code === '1') {
        createdLog("Loại kiến nghị kiểm toán", "Chỉnh sửa loại kiến nghị kiểm toán");
        swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        setTimeout(function () {
            openView(0, 0);
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Loại kiến nghị kiểm toán không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Loại kiến nghị kiểm toán này đã tồn tại!", "warning");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}

function createCatRiskLevelSuccess(data) {
    if (data.code === '1') {
        createdLog("Loại kiến nghị kiểm toán", "Thêm mới loại kiến nghị kiểm toán");
        swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        setTimeout(function () {
            window.location.href = "/CatRiskLevel"
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Loại kiến nghị kiểm toán không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Loại kiến nghị kiểm toán này đã tồn tại!", "warning");
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
            fnDeleteCatRiskLevel(id);
        }
    });
}

function fnDeleteCatRiskLevelSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Loại kiến nghị kiểm toán", "Xóa loại kiến nghị kiểm toán");
        swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        onSearch();
    }
    if (rspn.code === '2') {
        swal("Error!", "Tồn tại dữ liệu liên quan đến mức độ rủi ro này, bạn không thể xoá!", "error");
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
        setTimeout(function () {
            onSearch();
        }, 100);
    }
    else if (type === 1) {
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
        index.hide();
        create.hide();
        edit.show();
        document.getElementById("nameEdit").focus();
        detail.hide();
        fnGetDetail(type, value);
    }
}

function fnSearchCatRiskLevelSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#catriskleveltable tbody');
        $("#catriskleveltable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +
                '<td style="width: 30% !important;">' + obj.name + '</td>' +
                '<td class="text-center" style="width: 15% !important;"><div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' onclick="CatRiskLevelActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"></label> </div></td>' +
                '<td style="width: 35% !important;" class="ellipsis"><span>' + obj.description + '</span></td>' +
                '<td class="col-action text-center" style="width: 15% !important;">' +
                (IsCheckPemission('M_CATRL', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title=" Chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>') +
                (IsCheckPemission('M_CATRL', 'PER_EDIT') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật dữ liệu" class="fas fa-pencil-alt" aria-hidden="true"></i></a>') +
                (IsCheckPemission('M_CATAR', 'PER_DEL') === true && obj.roleId !== 1 ?
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())

        var t = $("#catriskleveltable").DataTable({
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
        var tbBody = $('#catriskleveltable tbody');
        $("#catriskleveltable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#catriskleveltable").DataTable({
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
        callApi_userservice(
            apiConfig.api.catrisklevel.controller,
            apiConfig.api.catrisklevel.action.search.path,
            apiConfig.api.catrisklevel.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchCatRiskLevelSuccess', 'msgError');
    } else if (!localStorage.type) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        statusChange();
        var obj = {
            'name': $('#Name').val().trim(),
            'status': $('#Status').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_userservice(
            apiConfig.api.catrisklevel.controller,
            apiConfig.api.catrisklevel.action.search.path,
            apiConfig.api.catrisklevel.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchCatRiskLevelSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        frmView.find("#Status").val(localStorage.status == "-1" ? -1 : localStorage.status == "1" ? 1 : 0);
        callApi_userservice(
            apiConfig.api.catrisklevel.controller,
            apiConfig.api.catrisklevel.action.search.path,
            apiConfig.api.catrisklevel.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchCatRiskLevelSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function fnDeleteCatRiskLevel(id) {
    callApi_userservice(
        apiConfig.api.catrisklevel.controller,
        apiConfig.api.catrisklevel.action.delete.path + "/" + id,
        apiConfig.api.catrisklevel.action.delete.method,
        null, 'fnDeleteCatRiskLevelSuccess', 'msgError');
}

function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_userservice(
        apiConfig.api.catrisklevel.controller,
        apiConfig.api.catrisklevel.action.active.path,
        apiConfig.api.catrisklevel.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}

function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'status': $('#statusCreate').val() == 1 ? true : false,
        'description': $('#descriptionCreate').val().trim(),
    }
    if (validateRequired('#formCreate')) {
        callApi_userservice(
            apiConfig.api.catrisklevel.controller,
            apiConfig.api.catrisklevel.action.add.path,
            apiConfig.api.catrisklevel.action.add.method,
            obj, 'createCatRiskLevelSuccess', 'msgError');
    }
}

function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'name': $('#nameEdit').val().trim(),
        'status': $('#StatusEdit').val() == 1 ? true : false,
        'description': $('#DescriptionEdit').val().trim(),
    }
    if (validateRequired('#formEdit')) {
        callApi_userservice(
            apiConfig.api.catrisklevel.controller,
            apiConfig.api.catrisklevel.action.update.path,
            apiConfig.api.catrisklevel.action.update.method,
            obj, 'updateCatRiskLevelSuccess', 'msgError');
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
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_userservice(
        apiConfig.api.catrisklevel.controller,
        apiConfig.api.catrisklevel.action.getItem.path + "/" + param,
        apiConfig.api.catrisklevel.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#nameCatRiskLevelDetail").val(data.name);
        frmModify.find("#StatusDetail").val(data.status == true ? 1 : 0);
        frmModify.find("#DescriptionDetail").val(data.description);

        frmModify.find("#CreatorNameDetail").val(data.creatorName);
        frmModify.find("#CreatedAtDetail").val(data.createdAt, 'dd/MM/yyyy');

        frmModify.find("#EditorNameDetail").val(data.editorName);
        frmModify.find("#ModifiedAtDetail").val(data.modifiedAt, 'dd/MM/yyyy');

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
        localStorage.setItem("type", "3");
    }
}

$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {

    $('#modalCatRiskLevelDetail').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idCatRiskLevel').val(id);
        modal.find('#nameCatRiskLevelDetail').val(name);
        modal.find('#StatusDetail').val(status == true ? 1 : 2);
        modal.find('#DescriptionDetail').val(description);

    });
    var validator = $("#modalCatRiskLevelDetail").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmCatRiskLevelDetail").find("#idCatRiskLevel").val();
            var name = $("#frmCatRiskLevelDetail").find("#nameCatRiskLevelDetail").val();
            var status = $("#frmCatRiskLevelDetail").find("#StatusDetail").val() == true ? 1 : 2;
            var description = $("#frmCatRiskLevelDetail").find("#DescriptionDetail").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.catrisklevel.controller,
                apiConfig.api.catrisklevel.action.getItem.path,
                apiConfig.api.catrisklevel.action.getItem.method);
        }
    });
    $('#modalCatRiskLevelEdit').on('show.bs.modal', function (event) {
        validator.resetForm();
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var name = button.data('name');
        var status = button.data('status');
        var description = button.data('description');
        var modal = $(this);
        modal.find('#idCatRiskLevelEdit').val(id);
        modal.find('#nameCatRiskLevelEdit').val(name);
        modal.find('#StatusEdit').val(status == true ? 1 : 2);
        modal.find('#DescriptionEdit').val(description);
    });
    var validator = $("#modalCatRiskLevelEdit").validate({
        rules: {
            Name: { required: true },
            Description: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmCatRiskLevelEdit").find("#idCatRiskLevelEdit").val();
            var name = $("#frmCatRiskLevelEdit").find("#nameCatRiskLevelEdit").val();
            var status = $("#frmCatRiskLevelEdit").find("#StatusEdit").val() == true ? 1 : 2;
            var description = $("#frmCatRiskLevelEdit").find("#DescriptionEdit").val();
            var obj = {
                'id': id,
                'name': name,
                'status': status,
                'description': description,
            }
            callApi_userservice(
                apiConfig.api.catrisklevel.controller,
                apiConfig.api.catrisklevel.action.update.path,
                apiConfig.api.catrisklevel.action.update.method);
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