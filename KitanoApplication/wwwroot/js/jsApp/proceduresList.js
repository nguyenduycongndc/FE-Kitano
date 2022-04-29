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
            apiConfig.api.catauditprocedure.controller,
            apiConfig.api.catauditprocedure.action.search.path,
            apiConfig.api.catauditprocedure.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchCatAuditProceduresSuccess', 'msgError');
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
            apiConfig.api.catauditprocedure.controller,
            apiConfig.api.catauditprocedure.action.search.path,
            apiConfig.api.catauditprocedure.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchCatAuditProceduresSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        callApi_auditservice(
            apiConfig.api.catauditprocedure.controller,
            apiConfig.api.catauditprocedure.action.search.path,
            apiConfig.api.catauditprocedure.action.search.method,
            { 'jsonData': catauditprocedure.dataObj }, 'fnSearchCatAuditProceduresSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
}

function fnSearchCatAuditProceduresSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#procedurePortfolioTable tbody');
        $("#procedurePortfolioTable").dataTable().fnDestroy();
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
    else if (rspn.data == "") {
        var tbBody = $('#procedurePortfolioTable tbody');
        $("#procedurePortfolioTable").dataTable().fnDestroy();
        tbBody.html('');
        reCalculatPagesCustomNull();
        setTimeout(function () {
            fnGetDetail(0);
        }, 100);
    }
}

function statusChange() {
    localStorage.setItem('status', $('#Status').val());
}

function fnGetDetail(param, input) {
    if (input != undefined) {
        $("td.active").removeClass("active");
        $(input).addClass("active");
    }
    call_back = 'fnGetDetailSuccess';

    localStorage.removeItem("id");
    callApi_auditservice(
        apiConfig.api.catauditprocedure.controller,
        apiConfig.api.catauditprocedure.action.getItem.path + "/" + param,
        apiConfig.api.catauditprocedure.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetEditDetail(param) {
    var call_back = '';

    call_back = 'fnEditSuccess';
    localStorage.removeItem("id");
    localStorage.removeItem("type");

    callApi_auditservice(
        apiConfig.api.catauditprocedure.controller,
        apiConfig.api.catauditprocedure.action.getItem.path + "/" + param,
        apiConfig.api.catauditprocedure.action.getItem.method,
        null, call_back, 'msgError');
}

function fnEditSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formEdit");

    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#unitEdit").val(data.unitid);
        frmModify.find("#activityEdit").val(data.activationid);
        frmModify.find("#processEdit").val(data.processid);
        frmModify.find("#controlEdit").val(data.cat_control_id);
        frmModify.find("#statusEdit").val(data.status);
        frmModify.find("#descriptionEdit").val(data.description);
        frmModify.find("#codeEdit").val(data.code);
        frmModify.find("#nameEdit").val(data.name);

        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "3");
    }
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
                getControlEdit(data.processid.toString());
            }, 100);
            frmModify.find("#IdDetail").val(data.id);
            frmModify.find("#NameDetail").val(data.name);
            frmModify.find("#CodeDetail").val(data.code);

            frmModify.find("#StatusDetail").val(data.status);
            frmModify.find("#DescriptionDetail").val(data.description);
            frmModify.find("#UnitDetail").val(data.unitname);
            frmModify.find("#ControlDetail").val(data.controlname);

            frmModify.find("#CreateDetail").val(data.createname);
            frmModify.find("#CreateDateDetail").val(data.createdate);
            frmModify.find("#EditDetail").val(data.editname);
            frmModify.find("#EditDateDetail").val(data.editdate);

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
                    apiConfig.api.riskcontrol.action.getItemRisk.path + "/" + data.cat_control_id,
                    apiConfig.api.riskcontrol.action.getItemRisk.method,
                    {}, 'fnGetControlSuccess');
            }, 200);
        }
        else {
            frmModify.find("#IdDetail").val("");
            frmModify.find("#NameDetail").val("");
            frmModify.find("#CodeDetail").val("");

            frmModify.find("#StatusDetail").val("");
            frmModify.find("#DescriptionDetail").val("");
            frmModify.find("#UnitDetail").val("");
            frmModify.find("#ControlDetail").val("");
            frmModify.find("#ActivationDetail").val("");
            frmModify.find("#ProcessDetail").val("");
            var tbBody = $('#controlPortfolioSonTable tbody');
            $("#controlPortfolioSonTable").dataTable().fnDestroy();

            tbBody.html('');
        }
    }
}

function fnGetControlSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $('#controlPortfolioSonTable tbody');
    $("#controlPortfolioSonTable").dataTable().fnDestroy();

    tbBody.html('');
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var html = '<tr>' +

            '<td class="text-center" style="width: 10% !important;">' + (i + 1) + '</a>' +
            '<td style="width: 30% !important;">' + obj.code + '</a>' +
            '<td style="width: 60% !important;">' + obj.name + '</a>' +
            '</td>' +
            '</tr>';
        tbBody.append(html);
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

//function openV() {
//    swal("!", "Có lỗi trong quá trình xử lý!", "error");
//}
function openView(type, value, frmHeader) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    if (type === 0 || isNaN(type)) {
        index.show();
        create.hide();
        edit.hide();
        setTimeout(function () {
            onSearch(); getUnitSearch(); getActivitySearch(); getProcessSearch(); getControlSearch();
        }, 100);
        $("#codeCreateValidate").text("");
        $("#codeEditValidate").text("");
        $("#nameCreateValidate").text("");
        $("#nameEditValidate").text("");
        $('#controlCreate').html('');
    }
    else if (type === 1) {
        index.hide();
        create.show();
        document.getElementById("nameCreate").focus();
        edit.hide();
        setTimeout(function () {
            getUnit(); getActivity(); // getProcess();
        }, 100);
        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
    }

    else if (type === 2) {
        index.hide();
        create.hide();
        edit.show();
        document.getElementById("nameEdit").focus();
        setTimeout(function () {
            fnGetEditDetail($('#IdDetail').val());
        }, 200);

    }
}

function submitCreate() {
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'code': $('#codeCreate').val().trim(),
        'status': $('#statusCreate').val(),
        'description': $('#descriptionCreate').val().trim(),
        'unitid': $('#unitCreate').val(),
        'activationid': $('#activityCreate').val(),
        'cat_control_id': $('#controlCreate').val().trim(),
        'processid': $('#processCreate').val(),
    }
    if (validateRequired('#formCreate')) {
        callApi_auditservice(
            apiConfig.api.catauditprocedure.controller,
            apiConfig.api.catauditprocedure.action.add.path,
            apiConfig.api.catauditprocedure.action.add.method,
            obj, 'createCatControlSuccess', 'msgError');
    }
}

function createCatControlSuccess(data) {
    if (data.code === '1') {
        createdLog("Danh sách thủ tục", "Thêm mới Danh sách thủ tục");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success("Thêm mới dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
            /*window.location.href = "/ProceduresList"*/
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Thủ tục không được để trống!", "warning");
    } else if (data.code === '2') {
        $("#nameCreateValidate").text("Thủ tục này đã tồn tại!");
        //swal("Error!", "thủ tục này đã tồn tại!", "warning");
    } else if (data.code === '3') {
        $("#codeCreateValidate").text("Thủ tục này đã tồn tại!");
        //swal("Error!", "thủ tục này đã tồn tại!", "warning");
    }
    else {
        swal("Error!", "Thêm mới thất bại!", "error");
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
    parentLoaded = true;
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

function getActivitySearch(unit, active) {
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
    parentLoaded = true;
}

function getValueActive(elment) {
    var _active = $(elment).val();
    getProcessSearch($('#UnitDepartment').val(), _active);
}

function getValueProcess(elment) {
    var _process = isNaN($(elment).val()) ? 0 : $(elment).val();
    getControl(_process);
}

function getControl(process) {
    var obj = {
        'processid': process,
        'key': '',
        'code': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.search.path,
        apiConfig.api.catcontrol.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillControlCreate');
}

function fillControlCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#controlCreate').html('');
    $('#controlCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#controlCreate').append(html);
    parentLoaded = true;
}

function getControlSearch() {
    var obj = {
        'key': '',
        'code': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.search.path,
        apiConfig.api.catcontrol.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillControlSearch');
}

function fillControlSearch(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#controlSearch').html('');
    $('#controlSearch').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#controlSearch').append(html);
    parentLoaded = true;
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
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
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
    parentLoaded = true;
}

function getValueProcessEdit(elment) {
    var _process = $(elment).val();
    getControlEdit(_process);
}

function getControlEdit(process) {
    var obj = {
        'processid': process,
        'key': '',
        'code': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.search.path,
        apiConfig.api.catcontrol.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillControlEdit');
}

function fillControlEdit(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#controlEdit').html('');
    $('#controlEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'issues', 'method_id');
    $('#controlEdit').append(html);
    parentLoaded = true;
}

function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'code': $('#codeEdit').val().trim,
        'name': $('#nameEdit').val().trim(),
        'unitid': $('#unitEdit').val(),
        'activationid': $('#activityEdit').val(),
        'processid': $('#processEdit').val(),
        'cat_control_id': $('#controlEdit').val(),
        'description': $('#descriptionEdit').val().trim(),
        'status': $('#statusEdit').val(),
    }
    if (validateRequired('#formEdit')) {
        callApi_auditservice(
            apiConfig.api.catauditprocedure.controller,
            apiConfig.api.catauditprocedure.action.update.path,
            apiConfig.api.catauditprocedure.action.update.method,
            obj, 'updateCatauditprocedureSuccess', 'msgError');
    }
}

function updateCatauditprocedureSuccess(data) {
    if (data.code === '1') {
        createdLog("Thủ tục", "Chỉnh sửa Thủ tục");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
            //window.location.href = "/CatDetectType"
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Thủ tục không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Thủ tục này đã tồn tại!", "warning");
    }
    else if (data.code === '2') {
        //swal("Error!", "Mã Thủ tục đã tồn tại!", "error");
        $("#codeEditValidate").text("Thủ tục này đã tồn tại!");
    } else if (data.code === '3') {
        //swal("Error!", "Tên Thủ tục đã tồn tại!", "error");
        $("#nameEditValidate").text("Thủ tục này đã tồn tại!");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
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
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteCatAuditRequest(id);
        }
    });
}

function fnDeleteCatAuditRequest(id) {
    callApi_auditservice(
        apiConfig.api.catauditprocedure.controller,
        apiConfig.api.catauditprocedure.action.delete.path + "/" + id,
        apiConfig.api.catauditprocedure.action.delete.method,
        null, 'fnDeleteCatAuditRequestSuccess', 'msgError');
}

function fnDeleteCatAuditRequestSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Danh sách thủ tục", "Xóa Danh sách thủ tục");
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thành công!", { progressBar: true });
        onSearch();
    }
    else if (rspn.code === '2') {
        //swal("Error!", "Không thể xoá thủ tục đã được sử dụng ở chương trình kiểm toán!", "error");
        toastr.error("Không thể xoá thủ tục đã được sử dụng ở chương trình kiểm toán!", "Lỗi!", { progressBar: true });
    }
    else {
        //swal("Error!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa dữ liệu không thành công!", "Lỗi!", { progressBar: true });
    }
}

function Export2() {
    callApi_auditservice(
        apiConfig.api.catauditprocedure.controller,
        apiConfig.api.catauditprocedure.action.exportexcel.path,
        apiConfig.api.catauditprocedure.action.exportexcel.method,
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
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.catauditprocedure.controller + apiConfig.api.catauditprocedure.action.exportexcel.path);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_Danh_Muc_Thu_Tuc_Kiem_Toan.xlsx";
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