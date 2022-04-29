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

function openView(type, value, frmHeader) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var upload = $("#upload");
    if (type === 0 || isNaN(type)) {
        index.show();
        create.hide();
        edit.hide();
        upload.hide();
        document.getElementById("FileUpload").value = null;
        setTimeout(function () {
            onSearch(); getUnitSearch(); getActivitySearch(); getProcessSearch(); loadCategoryDetail();
        }, 100);
        $("#codeCreateAlert").text("");
        $("#codeEditAlert").text("");
        $("#nameCreateAlert").text("");
        $("#nameEditAlert").text("");

    }
    else if (type === 1) {
        localStorage.setItem("type", "1");
        index.hide();
        create.show();
        upload.hide();

        //document.getElementById("nameCreate").focus();
        edit.hide();
        setTimeout(function () {
            getUnit(); getActivity(); loadCategory();
        }, 100);
        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.show();
        upload.hide();
        document.getElementById("nameEdit").focus();
        setTimeout(function () {
            fnGetEditDetail($('#IdDetail').val());
            /*loadCategoryEdit();*/
        }, 100);
    }
    else if (type === 4) {
        index.hide();
        create.hide();
        edit.hide();
        upload.show();
    }
}

function statusChange() {
    localStorage.setItem('status', $('#Status').val());
}

function onSearch() {
    var frmView = $("#formView");
    //showLoading();
    if (localStorage.type && localStorage.dataObj) {
        var obj = {
            'unitid': $('#UnitDepartment').val(),
            'activationid': $('#Active').val(),
            'processid': $('#BusinessProcess').val(),
            'name': $('#Name').val().trim(),
            'code': $('#Code').val().trim(),
            'status': $('#Status').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        callApi_auditservice(
            apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.search.path,
            apiConfig.api.catrisk.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchCatRiskSuccess', 'msgError');

    } else if (!localStorage.type) {
        statusChange();
        var obj = {
            'unitid': $('#UnitDepartment').val(),
            'activationid': $('#Active').val(),
            'processid': $('#BusinessProcess').val(),
            'name': $('#Name').val().trim(),
            'code': $('#Code').val().trim(),
            'status': $('#Status').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        }
        localStorage.setItem('dataObj', JSON.stringify(obj));
        callApi_auditservice(
            apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.search.path,
            apiConfig.api.catrisk.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchCatRiskSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        callApi_auditservice(
            apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.search.path,
            apiConfig.api.catrisk.action.search.method,
            { 'jsonData': catrisk.dataObj }, 'fnSearchCatRiskSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function fnSearchCatRiskSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#riskPortfolioTable tbody');
        $("#riskPortfolioTable").dataTable().fnDestroy();
        setTimeout(function () {
            fnGetDetail(data[0].id);
        }, 100);

        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr class="nosticky">' +
                '<td onclick="fnGetDetail(' + obj.id + ',this)"' + (i == 0 ? 'class="active"' : '') + '>' + '<a style="color:#2F80ED"><p class="mb-1">' + obj.code + '</p><p class="mb-0">' + obj.name + '</p></a>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        fnGetDetail(data[0].id);
        reCalculatPagesCustom(rspn.total);
    }
    else if (rspn.data.length < 1) {
        var tbBody = $('#riskPortfolioTable tbody');
        $("#riskPortfolioTable").dataTable().fnDestroy();
        tbBody.html('');
        setTimeout(function () {
            fnGetDetail(0);
        }, 100);
        reCalculatPagesCustomNull();
    }
}

function fnGetDetail(param, input) {
    if (input != undefined) {
        $("td.active").removeClass("active");
        $(input).addClass("active");
    }
    call_back = 'fnGetDetailSuccess';

    localStorage.removeItem("id");
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.getItem.path + "/" + param,
        apiConfig.api.catrisk.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");
    call_back = 'fnGetActivitySuccess';

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        if (data != "") {
            setTimeout(function () {
                getActivityEdit();
                getUnitEdit();
                getProcessEdit(data.unitid, data.activationid);
                loadCategoryEdit();
            }, 100);
            frmModify.find("#IdDetail").val(data.id);
            frmModify.find("#NameDetail").val(data.name);
            frmModify.find("#CodeDetail").val(data.code);

            frmModify.find("#StatusDetail").val(data.status);
            frmModify.find("#DescriptionDetail").val(data.description);
            frmModify.find("#UnitDetail").val(data.unitname);
            frmModify.find("#StepDetail").val(data.relatestep);

            frmModify.find("#CreateDetail").val(data.createname);
            frmModify.find("#CreateDateDetail").val(data.createdate);
            frmModify.find("#EditDetail").val(data.editname);
            frmModify.find("#EditDateDetail").val(data.editdate);
            frmModify.find("#riskType").val(data.risktype);

            localStorage.setItem("id", $('#IdDetail').val());
            localStorage.setItem("type", "");

            if (data.activationid != null && data.activationid != 0) {
                setTimeout(function () {
                    callApi(
                        apiConfig.api.bussinessactivity.controller,
                        apiConfig.api.bussinessactivity.action.getItem.path + "/" + data.activationid,
                        apiConfig.api.bussinessactivity.action.getItem.method,
                        {}, 'fnGetActivitySuccess');
                }, 100);
            }
            else {
                frmModify.find("#ActivationDetail").val("");
            }

            setTimeout(function () {
                callApi(
                    apiConfig.api.auditprocess.controller,
                    apiConfig.api.auditprocess.action.getItem.path + "/" + data.processid,
                    apiConfig.api.auditprocess.action.getItem.method,
                    {}, 'fnGetProcessSuccess');
            }, 150);
            setTimeout(function () {
                callApi_auditservice(
                    apiConfig.api.riskcontrol.controller,
                    apiConfig.api.riskcontrol.action.getItemControl.path + "/" + data.id,
                    apiConfig.api.riskcontrol.action.getItemControl.method,
                    {}, 'fnGetControlSuccess');
            }, 200);
        } else {
            frmModify.find("#IdDetail").val("");
            frmModify.find("#NameDetail").val("");
            frmModify.find("#CodeDetail").val("");

            frmModify.find("#StatusDetail").val("");
            frmModify.find("#DescriptionDetail").val("");
            frmModify.find("#UnitDetail").val("");
            frmModify.find("#StepDetail").val("");
            frmModify.find("#ActivationDetail").val("");
            var tbBody = $('#controlTable tbody');
            frmModify.find("#ProcessDetail").val("");
            $("#controlTable").dataTable().fnDestroy();
            tbBody.html('');
        }
    }
}

function fnGetActivitySuccess(rspn) {
    var data = rspn.data;
    var frmModify = $("#formDetail");

    if (data != null) {
        frmModify.find("#ActivationDetail").val(data.name);
    }
    else {
        frmModify.find("#ActivationDetail").val("");
    }
}

function fnGetProcessSuccess(rspn) {
    var data = rspn.data;
    var frmModify = $("#formDetail");

    frmModify.find("#ProcessDetail").val(data.name);
}

function fnGetControlSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $('#controlTable tbody');
    $("#controlTable").dataTable().fnDestroy();

    tbBody.html('');
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var textfrequency = (obj.controlfrequency == 1 ? "Mỗi khi phát sinh" : (obj.controlfrequency == 2 ? "Nhiều lần trong ngày" : (obj.controlfrequency == 3 ? "Hàng ngày" : (obj.controlfrequency == 4 ? "Hàng tuần" : (obj.controlfrequency == 5 ? "Hàng tháng" : (obj.controlfrequency == 6 ? "Hàng quý" : (obj.controlfrequency == 7 ? "Hàng năm" : " ")))))));
        var texttype = (obj.controltype == 1 ? "Phòng ngừa" : (obj.controltype == 2 ? "Phát hiện" : ""));
        var textformat = (obj.controlformat == 1 ? "Tự động" : (obj.controlformat == 2 ? "Bán tự động" : (obj.controlformat == 3 ? "Thủ công" : "")));
        var html = '<tr>' +
            '<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +
            '<td>' + obj.code + '</td>' +
            '<td>' + obj.name + '</td>' +
            '<td>' + textfrequency + '</td>' +
            '<td>' + texttype + '</td>' +
            '<td>' + textformat + '</td>' +
            '</tr>';
        tbBody.append(html);
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

function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'code': $('#codeCreate').val().trim(),
        'status': $('#statusCreate').val(),
        'description': $('#descriptionCreate').val().trim(),
        'unitid': $('#unitCreate').val(),
        'activationid': $('#activityCreate').val(),
        'relatestep': $('#stepCreate').val().trim(),
        'processid': $('#processCreate').val(),
        'risktype': $('#riskTypeCreate').val(),
    }
    if (validateRequired('#formCreate')) {
        callApi_auditservice(
            apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.add.path,
            apiConfig.api.catrisk.action.add.method,
            obj, 'createCatRiskSuccess', 'msgError');
    }
}

function createCatRiskSuccess(data) {
    if (data.code === '1') {
        createdLog("Danh mục rủi ro", "Thêm mới danh mục rủi ro");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success("Thêm mới dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            /*window.location.href = "/RiskPortfolio"*/
            openView(0, 0);
        }, 2000);
    } else if (data.code == 0) {
        toastr.error("Thêm mới dữ liệu thành công!", "Thành công!", { progressBar: true });

        //swal("Error!", "Rủi ro không được để trống!", "warning");
    }
    else if (data.code === '2') {
        $("#nameCreateAlert").text("Rủi ro này đã tồn tại!");
        //swal("Error!", "Rủi ro này đã tồn tại!", "warning");
    } else if (data.code === '3') {
        $("#codeCreateAlert").text("Rủi ro này đã tồn tại!");
        //swal("Error!", "Rủi ro này đã tồn tại!", "warning");
    }
    else {
        //swal("Error!", "Thêm mới thất bại!", "error");
    }
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

function getActivity() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillActivityCreate');
}

function fillActivityCreate(data) {

    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-activity').html('');
    $('#activityCreate').html('');
    $('#search-activity').append(htmlOption);
    $('#activityCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#search-activity').append(html);
    $('#activityCreate').append(html);

}

function getValueUnitCreate(elment) {
    var _unit = $(elment).val();
    getProcess(_unit, $('#activityCreate').val());
}
function getValueActiveCreate(elment) {
    var _active = $(elment).val();
    getProcess($('#unitCreate').val(), _active);
}

function getProcess(unit, active) {
    var obj = {
        'facility_id': isNaN(parseInt(unit)) ? 0 : parseInt(unit),
        'activity_id': isNaN(parseInt(active)) ? 0 : parseInt(active),
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillProcessCreate');
}

function fillProcessCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#processCreate').html('');
    $('#processCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#processCreate').append(html);

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
    if ((checkLocalType === null || checkLocalType === "") && checkLocalId === null) {
        type = 0;
        id = 0;
    }
    openView(type, id);
}

function getUnitSearch() {
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
        { 'jsonData': JSON.stringify(obj) }, 'fillUnitSearch');
}

function fillUnitSearch(rspn) {
    var data = rspn.data;
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-facility').html('');
    $('#UnitDepartment').html('');
    $('#search-facility').append(htmlOption);
    $('#UnitDepartment').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#search-facility').append(html);
    $('#UnitDepartment').append(html);
}

function getActivitySearch() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillActivitySearch');
}

function fillActivitySearch(data) {

    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-activity').html('');
    $('#Active').html('');
    $('#search-activity').append(htmlOption);
    $('#Active').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#search-activity').append(html);
    $('#Active').append(html);

}

function getValueUnit(elment) {
    var _unit = $(elment).val();
    getProcessSearch(_unit, $('#Active').val());
}
function getValueActive(elment) {
    var _active = $(elment).val();
    getProcessSearch($('#UnitDepartment').val(), _active);
}

function getProcessSearch(unit, active) {
    var obj = {
        'facility_id': isNaN(parseInt(unit)) ? 0 : parseInt(unit),
        'activity_id': isNaN(parseInt(active)) ? 0 : parseInt(active),
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillProcessSearch');
}

function fillProcessSearch(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#BusinessProcess').html('');
    $('#BusinessProcess').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#BusinessProcess').append(html);

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

function getActivityEdit() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillActivityEdit');
}

function fillActivityEdit(data) {

    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#search-activity').html('');
    $('#activityEdit').html('');
    $('#search-activity').append(htmlOption);
    $('#activityEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#search-activity').append(html);
    $('#activityEdit').append(html);

}

function getValueUnitEdit(elment) {
    var _unit = $(elment).val();
    getProcessEdit(_unit, $('#activityEdit').val());
}
function getValueActiveEdit(elment) {
    var _active = $(elment).val();
    getProcessEdit($('#unitEdit').val(), _active);
}

function getProcessEdit(unit, active) {
    var obj = {
        'facility_id': isNaN(parseInt(unit)) ? 0 : parseInt(unit),
        'activity_id': isNaN(parseInt(active)) ? 0 : parseInt(active),
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillProcessEdit');
}

function fillProcessEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#processEdit').html('');
    $('#processEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#processEdit').append(html);
}

function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'code': $('#codeEdit').val().trim(),
        'name': $('#nameEdit').val().trim(),
        'unitid': $('#unitEdit').val(),
        'activationid': $('#activityEdit').val(),
        'processid': $('#processEdit').val(),
        'relatestep': $('#stepEdit').val(),
        'description': $('#descriptionEdit').val().trim(),
        'status': $('#statusEdit').val(),
        'risktype': $('#riskTypeEdit').val(),
    }
    if (validateRequired('#formEdit')) {
        callApi_auditservice(
            apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.update.path,
            apiConfig.api.catrisk.action.update.method,
            obj, 'updateCatRiskSuccess', 'msgError');
    }
}

function updateCatRiskSuccess(data) {
    if (data.code === '1') {
        createdLog("Danh mục rủi ro", "Chỉnh sửa Danh mục rủi ro");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
            //window.location.href = "/CatDetectType"
        }, 2000);
    } else if (data.code == 0) {
        //swal("Error!", "Danh mục rủi ro không được để trống!", "warning");
        toastr.error("Danh mục rủi ro không được để trống!", "Lỗi!", { progressBar: true });

    } else if (data.code == -1) {
        // swal("Error!", "!", "warning");
        toastr.error("Danh mục rủi ro này đã tồn tại!", "Lỗi!", { progressBar: true });

    }
    else if (data.code === '2') {
        //swal("Error!", "Mã rủi ro đã tồn tại!", "error");
        $("#codeEditAlert").text("Mã rủi ro đã tồn tại");
    } else if (data.code === '3') {
        //swal("Error!", "Tên rủi ro đã tồn tại!", "error");
        $("#nameEditAlert").text("Tên rủi ro đã tồn tại");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}

function fnGetEditDetail(param) {
    var call_back = 'fnEditSuccess';

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.getItem.path + "/" + param,
        apiConfig.api.catrisk.action.getItem.method,
        null, call_back, 'msgError');
}

function fnEditSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formEdit");

    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        //setTimeout(function () {
        //    getProcessEdit(data.unitid, data.activationid);
        //}, 100);

        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#unitEdit").val(data.unitid);
        frmModify.find("#activityEdit").val(data.activationid);
        frmModify.find("#processEdit").val(data.processid);
        frmModify.find("#stepEdit").val(data.relatestep);
        frmModify.find("#statusEdit").val(data.status);
        frmModify.find("#descriptionEdit").val(data.description);
        frmModify.find("#codeEdit").val(data.code);
        frmModify.find("#nameEdit").val(data.name);
        frmModify.find("#riskTypeEdit").val(data.risktype);
        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "2");
    }
}

function clickMenu() {
    openView(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function Delete() {
    var id = $('#IdDetail').val()
    var _name = $('#NameDetail').val();
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteCatRisk(id);
        }
    });
}

function fnDeleteCatRisk(id) {
    createdLog("Danh mục rủi ro", "Xóa danh mục rủi ro");
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.delete.path + "/" + id,
        apiConfig.api.catrisk.action.delete.method,
        null, 'fnDeleteCatRiskSuccess', 'msgError');
    onSearch();
}

function fnDeleteCatRiskSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Loại kiến nghị kiểm toán", "Xóa loại kiến nghị kiểm toán");
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thành công!", { progressBar: true });
        onSearch();
    }
    else if (rspn.code === '2') {
        //swal("Error!", "Không xóa được rủi ro đã liên kết với kiểm soát!", "error");
        toastr.error("Không xóa được rủi ro đã liên kết với kiểm soát!", "Lỗi!", { progressBar: true });
        /// onSearch();
    }
    else if (rspn.code === '3') {
        //swal("Error!", "Không xóa được rủi ro đã được sử dụng để đánh giá rủi ro cấp độ quy trình!", "error");
        toastr.error("Không xóa được rủi ro đã được sử dụng để đánh giá rủi ro cấp độ quy trình!", "Lỗi!", { progressBar: true });
        //onSearch();
    }
    else {
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
        //onSearch();
    }
}

function Export2() {
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.exportexcel.path + "/" + id,
        apiConfig.api.catrisk.action.exportexcel.method,
        null, 'fnExportExcelSuccess');
}

function fnExportExcelSuccess(rspn) {
    if (rspn.data != undefined && rspn.data != null && rspn.data != "") {
        var bin = atob(rspn.data);
        var ab = s2ab(bin); // 
        var blob = new Blob([ab], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = rspn.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function Export() {

    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.catrisk.controller + apiConfig.api.catrisk.action.exportexcel.path);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_Danh_Muc_Rui_Ro.xlsx";
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

function fnUploadFile() {
    var input = document.getElementById('FileUpload');

    if (input.files && input.files[0]) {
        var ext = $('#FileUpload').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['xlsx', 'xls']) == -1) {
            ////swal("Error!", localizationResources.ExcelAllow, "error");
            toastr.error(localizationResources.ExcelAllow, "Error!", { progressBar: true });
            return;
        }

        var formData = new FormData();
        var imageFile = input.files[0];
        formData.append("FileUpload", imageFile);

        callUpload_audit(apiConfig.api.catrisk.controller,
            apiConfig.api.catrisk.action.upload.path,
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

function renderhtml_upload(trClass, obj, index) {
    return '<tr class="' + trClass + '">'
        + '<td class="text-center">' + (index + 1) + '</td>'
        + '<td>' + viewValue(obj.unitname) + '</td>'
        + '<td>' + viewValue(obj.activename) + '</td>'
        + '<td>' + viewValue(obj.processname) + '</td>'
        + '<td>' + viewValue(obj.relatestep) + '</td>'
        + '<td>' + viewValue(obj.code) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.description) + '</td>'
        + '<td>' + viewValue(getImportResult(obj.note)) + '</td>'
        + '</tr>';
}

function Download() {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.catrisk.controller + apiConfig.api.catrisk.action.download.path);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_Danh_Muc_Rui_Ro.xlsx";
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

function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#riskTypeCreate').html('');
    $('#riskTypeCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#riskTypeCreate').append(html);
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loairuiroquytrinh }, 'fillApplyForCombo');
}

function fillApplyForComboDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#riskType').html('');
    $('#riskType').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#riskType').append(html);
}

function loadCategoryDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loairuiroquytrinh }, 'fillApplyForComboDetail');
}

function fillApplyForComboEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#riskTypeEdit').html('');
    $('#riskTypeEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#riskTypeEdit').append(html);
}

function loadCategoryEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loairuiroquytrinh }, 'fillApplyForComboEdit');
}