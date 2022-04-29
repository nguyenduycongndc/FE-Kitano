var _index = 0;
var _count = 0;
var _indexriskedit = 0;
var _indexdocumentedit = 0;
var listrisk = [];
var listdocument = [];
var listriskedit = [];
var listdocumentedit = [];
var listselectrisk = [];
var listselectdocument = [];
var arrDefaulPersonnel = [];
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

function callApi_oneselect1(selector, placeholder, host, controller, action) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
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
                //arrDefaulPersonnel = data.data;
                if (arrChangePersonnel.length > 0 && arrChangePersonnel.length < data.data.length) {
                    return {
                        results: $.map(arrChangePersonnel, function (item) {
                            return {
                                email: item.email,
                                text: item.full_name,
                                id: item.id
                            }
                        })
                    };
                } else {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                email: item.email,
                                text: item.full_name,
                                id: item.id
                            }
                        })
                    };
                }
                //return {
                //    results: $.map(data.data, function (item) {
                //        return {
                //            email: item.email,
                //            text: item.full_name,
                //            id: item.id
                //        }
                //    })
                //};
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
            apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.search.path,
            apiConfig.api.catcontrol.action.search.method,
            { 'jsonData': localStorage.dataObj }, 'fnSearchCatControlSuccess', 'msgError');
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
            apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.search.path,
            apiConfig.api.catcontrol.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchCatControlSuccess', 'msgError');
    } else if (!localStorage.type && localStorage.dataObj) {
        callApi_auditservice(
            apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.search.path,
            apiConfig.api.catcontrol.action.search.method,
            { 'jsonData': catcontrol.dataObj }, 'fnSearchCatControlSuccess', 'msgError');
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    hideLoading();
}

function fnSearchCatControlSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#controlPortfolioTable tbody');
        $("#controlPortfolioTable").dataTable().fnDestroy();

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
        var tbBody = $('#controlPortfolioTable tbody');
        $("#controlPortfolioTable").dataTable().fnDestroy();
        tbBody.html('');
        reCalculatPagesCustomNull();
        $("#IdDetail").val("");
        $("#NameDetail").val("");
        $("#CodeDetail").val("");
        $("#StatusDetail").val("");
        $("#DescriptionDetail").val("");
        $("#UnitDetail").val("");
        $("#StepDetail").val("");
        $("#ActivationDetail").val("");
        $("#ProcessDetail").val("");
        var tbBody = $('#riskTable tbody');
        $("#riskTable").dataTable().fnDestroy();
        tbBody.html('');
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
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.getItem.path + "/" + param,
        apiConfig.api.catcontrol.action.getItem.method,
        null, call_back, 'msgError');
}

function fnGetEditDetail(param) {
    var call_back = '';
    call_back = 'fnEditSuccess';
    localStorage.removeItem("id");
    localStorage.removeItem("type");

    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.getItem.path + "/" + param,
        apiConfig.api.catcontrol.action.getItem.method,
        null, call_back, 'msgError');

    setTimeout(function () {
        callApi_auditservice(
            apiConfig.api.riskcontrol.controller,
            apiConfig.api.riskcontrol.action.getItemRisk.path + "/" + param,
            apiConfig.api.riskcontrol.action.getItemRisk.method,
            {}, 'fnGetRiskEditSuccess');

        callApi_auditservice(
            apiConfig.api.controldocument.controller,
            apiConfig.api.controldocument.action.getDocument.path + "/" + param,
            apiConfig.api.controldocument.action.getDocument.method,
            {}, 'fnGetDocumentEditSuccess');
    }, 100);
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
        frmModify.find("#statusEdit").val(data.status);
        frmModify.find("#descriptionEdit").val(data.description);
        frmModify.find("#codeEdit").val(data.code);
        frmModify.find("#nameEdit").val(data.name);
        //frmModify.find("#stepEdit").val(data.relatestep);
        frmModify.find("#actualEdit").val(data.actualcontrol);
        frmModify.find("#frequencyEdit").val(data.controlfrequency);
        frmModify.find("#typeEdit").val(data.controltype);
        frmModify.find("#formatEdit").val(data.controlformat);
        getRiskModalEdit(String(data.processid));
        getRiskModalEdit2(String(data.processid));
        getDocumentEdit();
        getDocumentEdit2();
        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "3");
    }
}

//lấy rủi ro đã chọn
function fnGetRiskEditSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $('#riskTableEdit tbody');
    $("#riskTableEdit").dataTable().fnDestroy();
    tbBody.html('');

    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var html = '<tr id="riskedit_' + obj.id + '">' +
            /*'<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +*/
            '<td style="width: 20% !important;">' + obj.code + '</a>' +
            '<td style="width: 30% !important;">' + obj.name + '</a>' +
            '<td style="width: 40% !important;">' + obj.description + '</a>' +
            '</td>' +
            '<td class="col-action text-center" style="width: 10% !important;">' +
            '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteCurrentRisk(\'' + obj.riskcontrolid + '\',\'' + obj.id + '\')" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
            /*'<td style="width: 10% !important;" hidden><input id="RiskEditJ_' + _indexriskedit + '" name="RiskEdit_' + _indexriskedit + '" value ="' + obj.id + '"></td>' +*/
            '</tr>';
        tbBody.append(html);
    }
}

function DeleteCurrentRisk(riskcontrolid, id) {

    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa rủi ro  !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteCurrentRisk(riskcontrolid, id);
        }
    });
}

function fnDeleteCurrentRisk(riskcontrolid, id) {
    callApi_auditservice(
        apiConfig.api.riskcontrol.controller,
        apiConfig.api.riskcontrol.action.delete.path + "/" + riskcontrolid,
        apiConfig.api.riskcontrol.action.delete.method,
        null, '', '');
    $('#riskedit_' + id + '').remove();
    $('#riskeditmodal2_' + id + '').show();
}

//lấy văn bản đã chọn
function fnGetDocumentEditSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $('#documentTableEdit tbody');
    $("#documentTableEdit").dataTable().fnDestroy();
    tbBody.html('');
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var html = '<tr id="Doceditadd_' + obj.id + '">' +
            '<td style="width: 20% !important;">' + obj.code + '</a>' +
            '<td style="width: 60% !important;">' + obj.name + '</a>' +
            '</td>' +
            '<td class="col-action text-center" style="width: 20% !important;">' +
            '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteCurrentDocument(\'' + obj.controldocumentid + '\',\'' + obj.id + '\')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
            '</tr>';
        tbBody.append(html);
    }
}

function DeleteCurrentDocument(controldocument, id) {

    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa tài liệu !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteCurrentDocument(controldocument, id);
        }
    });
}

function fnDeleteCurrentDocument(controldocument, id) {
    callApi_auditservice(
        apiConfig.api.controldocument.controller,
        apiConfig.api.controldocument.action.delete.path + "/" + controldocument,
        apiConfig.api.controldocument.action.delete.method,
        null, '', '');
    $('#Doceditadd_' + id + '').remove();
    $('#Docedit2' + id + '').show();
}

function fnGetDetailSuccess(rspn) {

    localStorage.removeItem("id");
    localStorage.removeItem("type");
    call_back = 'fnGetActivitySuccess';

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        setTimeout(function () {
            getActivityEdit();
            getProcessEdit();
            getUnitEdit();
            loadCategoryControlTypeEdit();
            loadCategoryControlFormatEdit();
            loadCategoryControlFrequencyEdit();            
        }, 100);

        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#NameDetail").val(data.name);
        frmModify.find("#CodeDetail").val(data.code);
        frmModify.find("#StatusDetail").val(data.status);
        frmModify.find("#UnitDetail").val(data.unitname);
        //frmModify.find("#StepDetail").val(data.relatestep);
        frmModify.find("#typeDetail").val(data.controltype);
        frmModify.find("#ActualDetail").val(data.actualcontrol);
        frmModify.find("#formatDetail").val(data.controlformat);
        frmModify.find("#DescriptionDetail").val(data.description);
        frmModify.find("#frequencyDetail").val(data.controlfrequency);
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
                apiConfig.api.riskcontrol.action.getItemRisk.path + "/" + data.id,
                apiConfig.api.riskcontrol.action.getItemRisk.method,
                {}, 'fnGetControlSuccess');
        }, 200);

        setTimeout(function () {
            callApi_auditservice(
                apiConfig.api.controldocument.controller,
                apiConfig.api.controldocument.action.getDocument.path + "/" + data.id,
                apiConfig.api.controldocument.action.getDocument.method,
                {}, 'fnGetDocumentSuccess');
        }, 200);

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
    var tbBody = $('#riskTable tbody');
    $("#riskTable").dataTable().fnDestroy();
    tbBody.html('');
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var html = '<tr>' +
            '<td class="text-center" style="width: 5% !important;">' + (i + 1) + '</td>' +
            '<td>' + obj.code + '</a>' +
            '<td>' + obj.name + '</a>' +
            '<td>' + obj.description + '</a>' +
            '</td>' +
            '</tr>';
        tbBody.append(html);
    }
}

function fnGetDocumentSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var listdoc = [];
    //listrisk.splice(0);


    for (var i = 0; i < data.length; i++) {

        if (i == 0) {
            var listdocdetail = {
                name: data[i].name,
            }
            listdoc.push(listdocdetail.name);
        }
        else {
            var listdocdetail = {
                name: ' ' + data[i].name,
            }
            listdoc.push(listdocdetail.name);
        }
    }
    $("#DocumentDetail").val(listdoc);
}

function openView(type, value, frmHeader) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var upload = $("#upload");
    $('#UnitDepartment').val(null).trigger('change');
    $('#UnitDepartment').html('');
    if (type === 0 || isNaN(type)) {
        index.show();
        create.hide();
        edit.hide();
        upload.hide();
        document.getElementById("FileUpload").value = null;
        setTimeout(function () {
            onSearch(); getUnitSearch(); getActivitySearch(); getProcessSearch(); loadCategoryControlTypeDetail(); loadCategoryControlFormatDetail(); loadCategoryControlFrequencyDetail();
        }, 100);
        $("#codeCreateValidate").text("");
        $("#codeEditValidate").text("");
        $("#nameCreateValidate").text("");
        $("#nameEditValidate").text("");
    }
    else if (type === 1) {
        index.hide();
        create.show();
        //document.getElementById("nameCreate").focus();
        edit.hide();
        setTimeout(function () {
            getUnit(); getActivity(); getDocument(); loadCategoryControlTypeCreate(); loadCategoryControlFormatCreate(); loadCategoryControlFrequencyCreate();
        }, 100);
        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
        $('#riskTableCreate > tbody').html('');
        $('#documentTableCreate > tbody').html('');
    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.show();
        upload.hide();
        //document.getElementById("nameEdit").focus();
        setTimeout(function () {
            fnGetEditDetail($('#IdDetail').val()); /*loadCategoryControlTypeEdit(); loadCategoryControlFormatEdit(); loadCategoryControlFrequencyEdit();*/
        }, 100);
        $('#riskTableEdit > tbody').html('');
        $('#documentTableEdit > tbody').html('');
        $('#riskTableEditAdd > tbody').html('');
        //_indexriskedit = 0;
        //_indexdocumentedit = 0;
    }
    else if (type === 4) {
        index.hide();
        create.hide();
        edit.hide();
        upload.show();
    }
}

function submitCreate() {
    listrisk.splice(0);
    for (var z = 0; z < $('#riskTableCreate > tbody > tr').length; z++) {
        var listriskcreate = {
            risk_id: $("#Risk_" + z).val(),
        }
        listrisk.push(listriskcreate)
    }
    listdocument.splice(0);
    for (var i = 0; i < $('#documentTableCreate > tbody > tr').length; i++) {
        var listdocumentcreate = {
            document_id: $("#Document_" + i).val(),
        }
        listdocument.push(listdocumentcreate)
    }
    var obj = {
        'name': $('#nameCreate').val().trim(),
        'code': $('#codeCreate').val().trim(),
        'status': $('#statusCreate').val(),
        'description': $('#descriptionCreate').val().trim(),
        'unitid': $('#unitCreate').val(),
        'activationid': $('#activityCreate').val(),
        //'relatestep': $('#stepCreate').val().trim(),
        'processid': $('#processCreate').val(),
        'actualcontrol': $('#actualCreate').val().trim(),
        'controlfrequency': $('#frequencyCreate').val(),
        'controltype': $('#typeCreate').val(),
        'controlformat': $('#formatCreate').val(),
        'listrisk': listrisk,
        'listdocument': listdocument,
    }
    if (validateRequired('#formCreate')) {
        callApi_auditservice(
            apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.add.path,
            apiConfig.api.catcontrol.action.add.method,
            obj, 'createCatControlSuccess', 'msgError');
    }
}

function createCatControlSuccess(data) {
    if (data.code === '1') {
        createdLog("Danh mục kiểm soát", "Thêm mới danh mục kiểm soát");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success("Thêm mới dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
            _index = 0;
            _count = 0;
            //window.location.href = "/ControlList"
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Rủi ro không được để trống!", "warning");
    } else if (data.code === '2') {
        $("#nameCreateValidate").text("Kiểm soát này đã tồn tại!");
        //swal("Error!", "Kiểm soát này đã tồn tại!", "warning");
    } else if (data.code === '3') {
        $("#codeCreateValidate").text("Kiểm soát này đã tồn tại!");
        //swal("Error!", "Kiểm soát này đã tồn tại!", "warning");
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
    parentLoaded = true;
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
            fnDeleteCatControl(id);
        }
    });
}

function fnDeleteCatControl(id) {
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.delete.path + "/" + id,
        apiConfig.api.catcontrol.action.delete.method,
        null, 'fnDeleteCatControlSuccess', 'msgError');
}

function fnDeleteCatControlSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Danh mục kiểm soát", "Xóa Danh mục kiểm soát");
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa dữ liệu thành công!", "Thành công!", { progressBar: true });
        onSearch();
    }
    else if (rspn.code === '2') {
        swal("Error!", "Không xóa được kiểm soát đã có thủ tục kiểm toán!", "error");
    }
    else {
        swal("Error!", "Xóa dữ liệu không thành công!", "error");
    }
}

function getRisk(process) {
    var obj = {
        'processid': process,
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.search.path,
        apiConfig.api.catrisk.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchRiskSuccess', 'msgError');
}

function fnSearchRiskSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#riskTableCreateModal tbody');
        $("#riskTableCreateModal").dataTable().fnDestroy();

        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr id="' + obj.id + '">' +
                '<td class="text-center" style="width: 10% !important;" >' + (i + 1) + '</td>' +
                '<td style="width: 10% !important;">' + obj.code + '</td>' +
                '<td style="width: 70% !important;">' + obj.name + '</td>' +

                '<td style="width: 10% !important;" class="col-action text-center"><input style="margin-left: 45%;" type="checkbox" class="checkitem" name="showHide" value="' + obj.id + '"></td>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
    else {
        var tbBody = $('#riskTableCreateModal tbody');
        $("#riskTableCreateModal").dataTable().fnDestroy();

        tbBody.html('');
    }
}

function addrisk(id) {
    $('#' + id + '').hide();

    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.getItem.path + "/" + id,
        apiConfig.api.catrisk.action.getItem.method,
        {}, 'fnGetAddRiskSuccess');
}

function fnGetAddRiskSuccess(rspn) {
    var obj = rspn.data;

    var html = '<tr id="risk_' + obj.id + '">' +
        '<td>' + obj.code + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td>' + obj.description + '</td>' +
        '<td class="col-action text-center">' +
        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRiskCreate(' + obj.id + ')" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
        '<td style="width: 10% !important;" hidden><input id="Risk_' + _index + '" name="Risk_' + _index + '" value ="' + obj.id + '"></td>' +
        '</tr>';
    $('#riskTableCreate tbody').append(html);
    var recount = 0;
    $("#riskTableCreate > tbody > tr").each(function (i, v) {
        recount++;
    });
    _index++;
}

function DeleteRiskCreate(id) {

    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa rủi ro !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteRiskCreate(id);
        }
    });
}
function fnDeleteRiskCreate(id) {
    $('#' + id + '').show();
    $('#risk_' + id + '').remove();
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

function submitEdit() {

    listriskedit.splice(0);
    for (var z = 0; z < $('#riskTableEditAdd > tbody > tr').length; z++) {
        var listriskcreate = {
            risk_id: $("#RiskEdit_" + z).val(),
        }
        listriskedit.push(listriskcreate)
    }
    listdocumentedit.splice(0);
    for (var i = 0; i < $('#documentTableEdit > tbody > tr').length; i++) {
        var listdocumentcreate = {
            document_id: $("#DocumentEdit_" + i).val(),
        }
        listdocumentedit.push(listdocumentcreate)
    }

    var obj = {
        'id': $('#IdEdit').val(),
        'name': $('#nameEdit').val().trim(),
        'code': $('#codeEdit').val().trim(),
        'status': $('#statusEdit').val(),
        'description': $('#descriptionEdit').val().trim(),
        'unitid': $('#unitEdit').val(),
        'activationid': $('#activityEdit').val(),
        //'relatestep': $('#stepEdit').val().trim(),
        'processid': $('#processEdit').val(),
        'actualcontrol': $('#actualEdit').val().trim(),
        'controlfrequency': $('#frequencyEdit').val(),
        'controltype': $('#typeEdit').val(),
        'controlformat': $('#formatEdit').val(),
        'listriskedit': listriskedit,
        'listdocumentedit': listdocumentedit,
    }
    if (validateRequired('#formEdit')) {
        callApi_auditservice(
            apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.update.path,
            apiConfig.api.catcontrol.action.update.method,
            obj, 'updatecatcontrolSuccess', 'msgError');
    }
}

function updatecatcontrolSuccess(data) {
    if (data.code === '1') {
        createdLog("Danh mục kiểm soát", "Chỉnh sửa danh mục kiểm soát");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success("Cập nhật dữ liệu thành công!", "Thành công!", { progressBar: true });
        setTimeout(function () {
            openView(0, 0);
            _indexriskedit = 0;
            _indexdocumentedit = 0;
            //window.location.href = "/CatDetectType"
        }, 2000);
    }  else if (data.code == "3") {
        $("#codeEditValidate").text("Kiểm soát này đã tồn tại!");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
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

function getValueProcessCreate(elment) {
    var _process = $(elment).val();
    getRisk(_process);
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

function getDocument() {
    var obj = {
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.search.path,
        apiConfig.api.document.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchDocumentSuccess', 'msgError');
}

function fnSearchDocumentSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#documentTableCreateModal tbody');
        $("#documentTableCreateModal").dataTable().fnDestroy();

        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr id="Doc' + obj.id + '">' +
                '<td style="width: 20% !important;">' + obj.code + '</td>' +
                '<td style="width: 70% !important;">' + obj.name + '</td>' +
                '<td class="col-action text-center" style="width: 10% !important;"><input type="checkbox" class="checkitem" name="showHideDocument" style="margin-left: 45%;" value="\'' + obj.id + '\'"></td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
}

function adddocument(id) {
    $('#' + id + '').hide();

    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.getItem.path + "/" + id.substring(3),
        apiConfig.api.document.action.getItem.method,
        {}, 'fnGetAddDocumentSuccess');
}

function fnGetAddDocumentSuccess(rspn) {
    var obj = rspn.data;

    var html = '<tr id="Docadd' + obj.id + '">' +
        '<td >' + obj.code + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td class="col-action text-center">' +
        '<a type="button" class="btn icon-delete btn-action-custom" onclick ="DeleteDocumentCreate(\'' + obj.id + '\')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
        '<td style="width: 10% !important;" hidden  ><input id="Document_' + _count + '" name="Document_' + _count + '" value ="' + obj.id + '"></td>' +
        '</tr>';
    $('#documentTableCreate tbody').append(html);
    var recount = 0;
    $("#documentTableCreate > tbody > tr").each(function (i, v) {
        recount++;
    });
    _count++;
}

function DeleteDocumentCreate(id) {
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa tài liệu !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteDocumentCreate(id);
        }
    });
}

function fnDeleteDocumentCreate(id) {
    $('#Doc' + id + '').show();
    $('#Docadd' + id + '').remove();
}

function hideSelected() {
    var oTable = document.getElementById("riskTableCreateModal");
    var oRows = oTable.getElementsByTagName("tr");

    for (var i = 0; i < oRows.length; i++) {
        var oInputs = oRows[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHide") {
                if (oInputs[j].checked) {
                    oRows[i].style.display = "none";
                    addrisk(oRows[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    $('#modalRiskCreate').modal('hide');
}

function hideSelectedRiskEdit() {
    var oTable = document.getElementById("riskTableEditModal");
    var oRows = oTable.getElementsByTagName("tr");

    for (var i = 0; i < oRows.length; i++) {
        var oInputs = oRows[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHide") {
                if (oInputs[j].checked) {
                    oRows[i].style.display = "none";
                    addrisk(oRows[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    $('#modalRiskEdit').modal('hide');
}

function hideSelectedDocument() {
    var oTable = document.getElementById("documentTableCreateModal");
    var oRows = oTable.getElementsByTagName("tr");

    for (var i = 0; i < oRows.length; i++) {
        var oInputs = oRows[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHideDocument") {
                if (oInputs[j].checked) {
                    oRows[i].style.display = "none";
                    adddocument(oRows[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    $('#modalDocumentCreate').modal('hide');
}

function getValueProcessEdit(elment) {
    var _process = $(elment).val();
    getRiskModalEdit(_process);
}

function getRiskModalEdit(process) {
    var obj = {
        'controlid': $("#IdEdit").val(),
        'processid': process,
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.searchtest.path,
        apiConfig.api.catrisk.action.searchtest.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchRiskModalEditSuccess', 'msgError');
}

// lay du lieu rui ro tren form edit , tren form nay lay cacs rui ro chua dc chon
function fnSearchRiskModalEditSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#riskTableEditModal tbody');
        $("#riskTableEditModal").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr id="riskeditmodal_' + obj.id + '">' +
                '<td class="text-center" style="width: 10% !important;" >' + (i + 1) + '</td>' +
                '<td style="width: 30% !important;">' + obj.code + '</td>' +
                '<td style="width: 50% !important;">' + obj.name + '</td>' +
                '<td style="width: 10% !important;" class="col-action text-center"><input style="margin-left: 45%;" type="checkbox" class="checkitem" name="showHideRiskEdit" value="' + obj.id + '"></td>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
}

// lay du lieu rui ro tren form edit , tren bang nay lay cacs rui ro
function getRiskModalEdit2(process) {
    var obj = {
        'processid': process,
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.search.path,
        apiConfig.api.catrisk.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchRiskModalEditSuccess2', 'msgError');
}

function fnSearchRiskModalEditSuccess2(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {

        var data = rspn.data;
        var tbBody = $('#riskTableEditModal2 tbody');
        $("#riskTableEditModal2").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr id="riskeditmodal2_' + obj.id + '" style="display: none;">' +
                '<td class="text-center" style="width: 10% !important;" >' + (i + 1) + '</td>' +
                '<td style="width: 30% !important;">' + obj.code + '</td>' +
                '<td style="width: 50% !important;">' + obj.name + '</td>' +
                '<td style="width: 10% !important;" class="col-action text-center"><input style="margin-left: 45%;" type="checkbox" class="checkitem" name="showHideRiskEdit" value="' + obj.id + '"></td>' +
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
}

function hideSelectedEditRisk() {
    var oTable = document.getElementById("riskTableEditModal");
    var oRows = oTable.getElementsByTagName("tr");

    for (var i = 0; i < oRows.length; i++) {
        var oInputs = oRows[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHideRiskEdit") {
                if (oInputs[j].checked) {
                    oRows[i].style.display = "none";
                    addriskedit(oRows[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    var oTable2 = document.getElementById("riskTableEditModal2");
    var oRows2 = oTable2.getElementsByTagName("tr");

    for (var i = 0; i < oRows2.length; i++) {
        var oInputs = oRows2[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHideRiskEdit") {
                if (oInputs[j].checked) {
                    oRows2[i].style.display = "none";
                    addriskedit2(oRows2[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    $('#modalRiskEdit').modal('hide');
}

function addriskedit(id) {
    $('#' + id + '').hide();
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.getItem.path + "/" + id.substring(14),
        apiConfig.api.catrisk.action.getItem.method,
        {}, 'fnGetAddRiskEditSuccess');
}

function addriskedit2(id) {
    $('#' + id + '').hide();
    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.getItem.path + "/" + id.substring(15),
        apiConfig.api.catrisk.action.getItem.method,
        {}, 'fnGetAddRiskEditSuccess');
}

function fnGetAddRiskEditSuccess(rspn) {
    var obj = rspn.data;
    var html = '<tr id="riskedit_' + obj.id + '">' +
        '<td style="width: 20% !important;">' + obj.code + '</td>' +
        '<td style="width: 30% !important;">' + obj.name + '</td>' +
        '<td style="width: 40% !important;">' + obj.description + '</td>' +
        '<td class="col-action text-center" style="width: 10% !important;">' +
        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRiskEdit(' + obj.id + ')" ><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
        '<td style="width: 0% !important;" hidden><input id="RiskEdit_' + _indexriskedit + '" name="RiskEdit_' + _indexriskedit + '" value ="' + obj.id + '"></td>' +
        '</tr>';
    $('#riskTableEditAdd tbody').append(html);
    var recount = 1;
    $("#riskTableEditAdd > tbody > tr").each(function (i, v) {
        recount++;
    });
    _indexriskedit++;
}

function DeleteRiskEdit(id) {
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa rủi ro !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteRiskEdit(id);
        }
    });
}

function fnDeleteRiskEdit(id) {
    $('#riskeditmodal2_' + id + '').show();
    $('#riskedit_' + id + '').remove();
}

function getDocumentEdit() {
    var obj = {
        'controlid': $("#IdEdit").val(),
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.searchedit.path,
        apiConfig.api.document.action.searchedit.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchDocumentEditSuccess', 'msgError');
}

function fnSearchDocumentEditSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#documentTableEditModal tbody');
        $("#documentTableEditModal").dataTable().fnDestroy();

        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr id="Docedit' + obj.id + '">' +
                '<td style="width: 20% !important;">' + obj.code + '</td>' +
                '<td style="width: 70% !important;">' + obj.name + '</td>' +

                '<td class="col-action text-center" style="width: 10% !important;"><input type="checkbox" class="checkitem" name="showHideDocumentEdit" style="margin-left: 45%;" value="\'' + obj.id + '\'"></td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
}

function getDocumentEdit2() {
    var obj = {
        'unitid': null,
        'activationid': null,
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.search.path,
        apiConfig.api.document.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchDocumentEditSuccess2', 'msgError');
}

function fnSearchDocumentEditSuccess2(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#documentTableEditModal2 tbody');
        $("#documentTableEditModal2").dataTable().fnDestroy();

        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr id="Docedit2' + obj.id + '" style="display: none;">' +
                '<td style="width: 20% !important;">' + obj.code + '</td>' +
                '<td style="width: 70% !important;">' + obj.name + '</td>' +

                '<td class="col-action text-center" style="width: 10% !important;"><input type="checkbox" class="checkitem" name="showHideDocumentEdit" value="\'' + obj.id + '\'"></td>' +
                '</tr>';
            tbBody.append(html);
        }
        reCalculatPagesCustom(rspn.total);
    }
}

function hideSelectedDocumentEdit() {
    var oTable = document.getElementById("documentTableEditModal");
    var oRows = oTable.getElementsByTagName("tr");

    for (var i = 0; i < oRows.length; i++) {
        var oInputs = oRows[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHideDocumentEdit") {
                if (oInputs[j].checked) {
                    oRows[i].style.display = "none";
                    adddocumentedit(oRows[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    var oTable2 = document.getElementById("documentTableEditModal2");
    var oRows2 = oTable2.getElementsByTagName("tr");

    for (var i = 0; i < oRows2.length; i++) {
        var oInputs = oRows2[i].getElementsByTagName("input");
        for (var j = 0; j < oInputs.length; j++) {
            if (oInputs[j].name == "showHideDocumentEdit") {
                if (oInputs[j].checked) {
                    oRows2[i].style.display = "none";
                    adddocumentedit2(oRows2[i].id);
                    oInputs[j].checked = false
                }
                break;
            }
        }
    }
    $('#modalDocumentEdit').modal('hide');
}

function adddocumentedit(id) {
    $('#' + id + '').hide();

    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.getItem.path + "/" + id.substring(7),
        apiConfig.api.document.action.getItem.method,
        {}, 'fnGetAddDocumentEditSuccess');
}

function adddocumentedit2(id) {
    $('#' + id + '').hide();

    callApi_userservice(
        apiConfig.api.document.controller,
        apiConfig.api.document.action.getItem.path + "/" + id.substring(8),
        apiConfig.api.document.action.getItem.method,
        {}, 'fnGetAddDocumentEditSuccess');
}

function fnGetAddDocumentEditSuccess(rspn) {
    var obj = rspn.data;
    var html = '<tr id="Doceditadd' + obj.id + '">' +
        '<td >' + obj.code + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td class="col-action text-center">' +
        '<a type="button" class="btn icon-delete btn-action-custom" onclick ="DeleteDocumentEdit(\'' + obj.id + '\')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' + '</td>' +
        '<td style="width: 10% !important;" hidden ><input id="DocumentEdit_' + _indexdocumentedit + '" name="DocumentEdit_' + _indexdocumentedit + '" value ="' + obj.id + '"></td>' +
        '</tr>';
    $('#documentTableEdit tbody').append(html);
    var recount = 0;
    $("#documentTableEdit > tbody > tr").each(function (i, v) {
        recount++;
    });
    _indexdocumentedit++;
}

function DeleteDocumentEdit(id) {

    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa tài liệu !",
        //type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteDocumentEdit(id);
        }
    });
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

        callUpload_audit(apiConfig.api.catcontrol.controller,
            apiConfig.api.catcontrol.action.upload.path,
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
        + '<td>' + viewValue(obj.code) + '</td>'
        + '<td>' + viewValue(obj.name) + '</td>'
        + '<td>' + viewValue(obj.description) + '</td>'
        + '<td>' + viewValue(obj.controlfrequency) + '</td>'
        + '<td>' + viewValue(obj.controltype) + '</td>'
        + '<td>' + viewValue(obj.controlformat) + '</td>'
        + '<td>' + viewValue(obj.actualcontrol) + '</td>'
        + '<td>' + viewValue(getImportResult(obj.note)) + '</td>'
        + '</tr>';
}

function Download() {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service.concat(apiConfig.api.catcontrol.controller.concat(apiConfig.api.catcontrol.action.download.path)));
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_DanhMucKiemSoat.xlsx";
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

function fnDeleteDocumentEdit(id) {
    $('#Docedit' + id + '').show();
    $('#Doceditadd' + id + '').remove();
}

function Export2() {
    callApi_auditservice(
        apiConfig.api.catcontrol.controller,
        apiConfig.api.catcontrol.action.exportexcel.path,
        apiConfig.api.catcontrol.action.exportexcel.method,
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
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.catcontrol.controller + apiConfig.api.catcontrol.action.exportexcel.path);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_Danh_Muc_Kiem_Soat.xlsx";
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

function loadCategoryControlTypeEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loaikiemsoat }, 'fillApplyForComboControlTypeEdit');
}

function fillApplyForComboControlTypeEdit(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#typeEdit').html('');
    $('#typeEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#typeEdit').append(html);
}

function loadCategoryControlTypeCreate() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loaikiemsoat }, 'fillApplyForComboControlTypeCreate');
}

function fillApplyForComboControlTypeCreate(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#typeCreate').html('');
    $('#typeCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#typeCreate').append(html);
}

function loadCategoryControlTypeDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.loaikiemsoat }, 'fillApplyForComboControlTypeDetail');
}

function fillApplyForComboControlTypeDetail(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#typeDetail').html('');
    $('#typeDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#typeDetail').append(html);
}

function loadCategoryControlFormatEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.hinhthuckiemsoat }, 'fillApplyForComboControlFormatEdit');
}

function fillApplyForComboControlFormatEdit(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#formatEdit').html('');
    $('#formatEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#formatEdit').append(html);
}

function loadCategoryControlFormatCreate() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.hinhthuckiemsoat }, 'fillApplyForComboControlFormatCreate');
}

function fillApplyForComboControlFormatCreate(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#formatCreate').html('');
    $('#formatCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#formatCreate').append(html);
}

function loadCategoryControlFormatDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.hinhthuckiemsoat }, 'fillApplyForComboControlFormatDetail');
}

function fillApplyForComboControlFormatDetail(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#formatDetail').html('');
    $('#formatDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#formatDetail').append(html);
}

function loadCategoryControlFrequencyEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.tansuatkiemsoat }, 'fillApplyForComboControlFrequencyEdit');
}

function fillApplyForComboControlFrequencyEdit(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#frequencyEdit').html('');
    $('#frequencyEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#frequencyEdit').append(html);
}

function loadCategoryControlFrequencyCreate() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.tansuatkiemsoat }, 'fillApplyForComboControlFrequencyCreate');
}

function fillApplyForComboControlFrequencyCreate(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#frequencyCreate').html('');
    $('#frequencyCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#frequencyCreate').append(html);
}

function loadCategoryControlFrequencyDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.tansuatkiemsoat }, 'fillApplyForComboControlFrequencyDetail');
}

function fillApplyForComboControlFrequencyDetail(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#frequencyDetail').html('');
    $('#frequencyDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#frequencyDetail').append(html);
}