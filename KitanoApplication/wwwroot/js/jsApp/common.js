String.prototype.isBlank = function () {
    if (this == undefined)
        return true;
    var result = this.trim();
    if (result.length > 0) {
        result = false;
    } else {
        result = true;
    }
    return result
}

function viewValue(val) {
    return val == undefined || val == null ? '' : val;
}
String.prototype.strStatus = function () {
    if (this == undefined)
        return localizationResources.InActive;
    var result = this.trim();
    if (result == 1 || result == true || result == 'true') {
        result = localizationResources.Active;
    } else {
        result = localizationResources.InActive;
    }
    return result
}
Boolean.prototype.strStatus = function () {
    if (this == undefined)
        return localizationResources.InActive;
    var result = localizationResources.InActive;
    if (this == true || this == 1) {
        result = localizationResources.Active;
    } else {
        result = localizationResources.InActive;
    }
    return result
}

function msgError(respon, status, error) {
    if (respon.status == 401)
        swal("Unauthorized!", localizationResources.Error401, "warning");
    else if (respon.status == 404)
        swal("Not found!", localizationResources.Error404, "warning");
    else
        swal(error + "!", localizationResources.Error500, "error");
}

function formatNumberByLocate(value) {
    if (value == undefined || value == null || value == "")
        return "0";
    return Number(value).toLocaleString('vi')
}

function rowNo(page, pageSize, i) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    i = parseInt(i);
    if (isNaN(page) || isNaN(pageSize) || isNaN(i))
        return 0;
    return (page - 1) * pageSize + i + 1;
}

function btnOnSearch() {
    $("#txtCurrentPage").val(1);
    onSearch();
}


function showLoading() {
    $('#preloader').css('display', 'block');
}
function hideLoading() {
    setTimeout(function () {
        var keys = Object.keys(localStorage);
        var isOk = true;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].startsWith('loading'))
                isOk = false;
        }
        if (isOk)
            $('#preloader').css('display', 'none');
    }, 500);
}
function fakeValue(value) {
    if (value == undefined || value == null || value == '')
        return 0;
    return value;
}

function clearMsgInvalid() {
    var inputInvalid = $('.is-invalid');
    var labelInvalid = $('.invalid-feedback');
    for (var i = 0; i < inputInvalid.length; i++) {
        $(inputInvalid[i]).removeClass('is-invalid');
    }
    for (var i = 0; i < labelInvalid.length; i++) {
        $(labelInvalid[i]).remove();
    }
}

function validateRequired(parent) {
    parent = !parent ? '' : parent;
    var allRequired = $(parent + ' .required');
    var isValid = true;
    var itemFocus = null;
    for (var i = 0; i < allRequired.length; i++) {
        var grInput = $(allRequired[i]).parent().find('input');
        var grSelect = $(allRequired[i]).parent().find('select');
        var grTextarea = $(allRequired[i]).parent().find('textarea');

        var msg = $(allRequired[i]).parent().find('label').text() + ' ' + localizationResources.CanNotNull;
        $(allRequired[i]).parent().find('.invalid-feedback').remove();

        if (grInput.length > 0 || grSelect.length > 0 || grTextarea.length > 0) {
            var eleWork = grInput.length > 0 ? grInput : grSelect.length > 0 ? grSelect : grTextarea;
            eleWork.removeClass('is-invalid');

            var val = eleWork.val();

            if (val == undefined || val == null || val.isBlank()) {
                itemFocus = itemFocus == null ? $(allRequired[i]) : itemFocus;
                eleWork.addClass('is-invalid');
                $(eleWork).parent().append('<div class="invalid-feedback">' + msg + '</div>')
                isValid = false;
            }
        }
    }
    if (!isValid)
        itemFocus.focus();
    return isValid;
}

function onFocus(parent) {
    parent = !parent ? 'body' : parent;
    var grInput = $(parent).find('input:not(:hidden)');
    var grSelect = $(parent).find('select');
    var grTextarea = $(parent).find('textarea');
    var eleWork = grInput.length > 0 ? grInput : grSelect.length > 0 ? grSelect : grTextarea;
    console.log(eleWork[0]);
    $(eleWork[0]).focus();
}

function collapseDelegate() {
    $('.btn-collapse').on('click', function (ele) {
        var target = ele.currentTarget.dataset["target"];

        if (target != undefined && target != null && target != '') {
            var clsList = ele.currentTarget.classList;
            if (clsList.contains('shown')) {
                ele.currentTarget.classList.remove('shown');
                ele.currentTarget.classList.add('hidden');
                $(target).hide();
                if (ele.currentTarget.childElementCount > 0)
                    ele.currentTarget.childNodes[0].classList.value = 'fas fa-plus';
            }
            else {
                ele.currentTarget.classList.remove('hidden');
                ele.currentTarget.classList.add('shown');
                $(target).show();
                if (ele.currentTarget.childElementCount > 0)
                    ele.currentTarget.childNodes[0].classList.value = 'fas fa-minus';


                var btn = $(ele.currentTarget.dataset["target"]).find('button.hidden');
                if (btn.length > 0) {
                    $(target).show();

                    for (var i = 0; i < btn.length; i++) {
                        var tg = btn[i].dataset['target'];
                        $(tg).hide();
                    }
                }
                else $(target).show();

            }
        }
    });
}

function onBack() {
    var modal = $('#card-update');
    var cardManag = $('#card-index');

    var headerManager = $('#header-manager');
    var headerCreate = $('#header-create');
    var headerUpdate = $('#header-update');
    var headerDetail = $('#header-detail');
    var headerImport = $('#header-import');

    modal.hide();
    cardManag.show();

    headerManager.show();
    headerCreate.hide();
    headerUpdate.hide();
    headerDetail.hide();
    headerImport.hide();
    localStorage[keyCurrentStage] = 'manager';
    location.hash = '';
}

function generateComboOptions(data, n, prop, extenal, idField, nameField) {
    var html = '';
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '-&nbsp';
    }
    idField = idField ? idField : 'id';
    nameField = nameField ? nameField : 'name';
    if (data != undefined && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var cls = obj[prop] == undefined || obj[prop] == null || obj[prop].length == 0 ? '' : ' class="font-weight-bold" ';
            var dataExtenal = '';
            if (extenal && obj[extenal]) {
                dataExtenal += ' data-' + extenal + '="' + obj[extenal] + '" ';
            }
            html += '<option ' + dataExtenal + cls + ' value="' + obj[idField] + '">' + nbsp + obj[nameField] + '</option>';
            html += generateComboOptions(obj[prop], n + 1, prop, extenal, idField, nameField);
        }
    }
    return html;
}

function generateComboOptions2(data, n, prop, extenal, idField, nameField) {
    var html = '';
    var nbsp = '';
    idField = idField ? idField : 'id';
    nameField = nameField ? nameField : 'name';
    for (var i = 0; i < n; i++) {
        nbsp += '- ';
    }
    if (data != undefined && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            html += '<option ' + ' data-value="' + obj[idField] + '"' + 'value="' + nbsp + obj[nameField] + '"></option>';
            html += generateComboOptions2(obj[prop], n + 1, prop, extenal, idField, nameField);
        }
    }
    return html;
}

function generateComboOptions3(data, n, prop, extenal, idField, nameField) {
    var html = '';
    var nbsp = '';
    idField = idField ? idField : 'id';
    nameField = nameField ? nameField : 'name';
    for (var i = 0; i < n; i++) {
        nbsp += '- ';
    }
    if (data != undefined && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            html += '<option ' + ' id="' + obj[idField] + '"' + 'value="' + nbsp + obj[nameField] + '"></option>';
            html += generateComboOptions3(obj[prop], n + 1, prop, extenal, idField, nameField);
        }
    }
    return html;
}

function generateComboyearOptions(data, n, prop, extenal, idField, nameField) {
    var html = '';
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '-&nbsp';
    }
    idField = idField ? idField : 'year';
    nameField = nameField ? nameField : 'year';
    if (data != undefined && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var cls = obj[prop] == undefined || obj[prop] == null || obj[prop].length == 0 ? '' : ' class="font-weight-bold" ';
            var dataExtenal = '';
            if (extenal && obj[extenal]) {
                dataExtenal += ' data-' + extenal + '="' + obj[extenal] + '" ';
            }
            html += '<option ' + dataExtenal + cls + ' value="' + obj[idField] + '">' + nbsp + obj[nameField] + '</option>';
            html += generateComboOptions(obj[prop], n + 1, prop, extenal, idField, nameField);
        }
    }
    return html;
}

function generateComboUserOptions(data, n, prop, extenal, idField, nameField) {
    var html = '';
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '-&nbsp';
    }
    idField = idField ? idField : 'id';
    nameField = nameField ? nameField : 'full_name';
    if (data != undefined && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var cls = obj[prop] == undefined || obj[prop] == null || obj[prop].length == 0 ? '' : ' class="font-weight-bold" ';
            var dataExtenal = '';
            if (extenal && obj[extenal]) {
                dataExtenal += ' data-' + extenal + '="' + obj[extenal] + '" ';
            }
            html += '<option ' + dataExtenal + cls + ' value="' + obj[idField] + '">' + nbsp + obj[nameField] + '</option>';
            html += generateComboOptions(obj[prop], n + 1, prop, extenal, idField, nameField);
        }
    }
    return html;
}

function getStatusCode(code) {
    var val = localizationResources['Error' + code];
    return val ? val : code;
}
function getOptionValue(opt) {
    if (opt == undefined || opt == null || opt.name == undefined || opt.name == null)
        return '';
    return opt.name;
}
function getScoreMethod(opt) {
    if (opt == 0) return localizationResources.Automation;
    return opt == 1 ? localizationResources.Manual : "";
}
function updateFail(request, status, error) {
    swal("Error!", localizationResources.SaveFail, "error");
}
function getCode(obj) {
    return typeof (obj) != 'object' || obj == undefined || obj == null || obj == '' ? '' : obj.code;
}
function getName(obj) {
    return typeof (obj) != 'object' || obj == undefined || obj == null || obj == '' ? '' : obj.name;
}
function getIssueLevel(val) {
    return val == 1 ? localizationResources.Low : val == 2 ? localizationResources.Mid : val == 3 ? localizationResources.High : '';
}
function getIssueRange(min, max, minF, maxF) {

    var minStr = '';
    switch (minF) {
        case 'gte': minStr = '<=';
            break;
        case 'gt': minStr = '<';
            break;
        default: minStr = '';
            break;
    }
    var maxStr = '';
    switch (maxF) {
        case 'lte': maxStr = '<=';
            break;
        case 'lt': maxStr = '<';
            break;
        default: maxStr = '';
            break;
    }

    if (minStr == '' && maxStr == '')
        return '';

    return (minStr != '' ? (min + ' ' + minStr + ' ') : '') + localizationResources.Point + (maxStr != '' ? (' ' + maxStr + ' ' + max) : '');
}
function checkNumberValue(ele, compareWith, formula) {
    if (!ele || ele.type != 'number')
        return;
    var vl = parseFloat(ele.value);
    var min = parseFloat(ele.min);
    var max = parseFloat(ele.max);
    if (ele.min) {
        if (vl < min) {
            swal('Error', localizationResources.ValueInvalid, 'error');
            ele.value = min;
            return;
        }
    }
    if (ele.max) {
        if (vl > max) {
            swal('Error', localizationResources.ValueInvalid, 'error');
            ele.value = max;
            return;
        }
    }
    if (ele.max && ele.min && (vl > max || vl < min)) {
        swal('Error', localizationResources.ValueInvalid, 'error');
        ele.value = '';
        return;
    }
    if (compareWith && formula) {
        var compareValue = $(compareWith).val();
        var cp = parseFloat(compareValue);
        if (compareValue && !isNaN(cp)) {
            if (formula == 'gt' && vl < cp) {
                swal('Error', localizationResources.ValueInvalid, 'error');
                ele.value = '';
                return;
            }
            if (formula == 'lt' && vl > cp) {
                swal('Error', localizationResources.ValueInvalid, 'error');
                ele.value = '';
                return;
            }
        }
    }
}
function IsCheckPemission(menucode, permission_code) {
    if (localStorage["CurrentPermission"] != null && localStorage["CurrentPermission"] != undefined) {
        var list_permission = JSON.parse(localStorage["CurrentPermission"]);
        var _permission = menucode + "_" + permission_code;
        var ischeck = list_permission.some(el => el.permission === _permission);
        return ischeck;
    }
    return false;
}
function getAssessmentStage(val) {
    return val == 1 ? localizationResources.Year : val == 2 ? localizationResources.HalfYear : val == 3 ? localizationResources.Quarter : '';
}
function getAssessmentState(val) {
    return !val || val == 0 ? localizationResources.InProcess : localizationResources.Completed;
}
function getProcessState(val) {
    return val == -1 || val == null || val == undefined ? localizationResources.NotStart : val == 0 ? localizationResources.InProcess : localizationResources.Completed;
}
function getAssessmentPullState(val) {
    return localizationResources.InComplete;
}
function getAssessmentPullLast(val) {
    return '';
}

function getImportStatus(code) {
    code = (code + '').trim();
    if (!code || code == null || code == '')
        return '';
    var val = localizationResources['Import' + code];
    return val ? val : code;
}
function getImportResult(note) {
    if (!note || note == null || note == '')
        return '';
    var spt = note.split(',');

    var str = '';
    for (var i = 0; i < spt.length; i++) {
        var code = spt[i].trim();
        str += getImportStatus(code) + '<br/>';
    }
    return str;
}

function isViewUpload() {
    return location.hash == '#import';
}
function isViewEdit() {
    return location.hash.indexOf('#edit-') >= 0;
}
function isViewDetail() {
    return location.hash.indexOf('#view-') >= 0;
}
function idViewEdit() {
    return location.hash.replace('#edit-', '');
}
function idViewDetail() {
    return location.hash.replace('#view-', '');
}
function triggerChangeHeader() {
    $('a.btn.icon-default.btn-action-custom').off('click');
    $('a.btn.icon-default.btn-action-custom').on('click', function (ele) {
        var button = null;
        if (ele.target.tagName === 'A')
            button = $(ele.target);
        else if (ele.target.tagName === 'I')
            button = $(ele.target.parentNode);
        else return;

        var action = button.data('action');
        if (action == undefined || action == null || action == '')
            return;
        fnChangeHeader(action);
    });
}

function fnChangeHeader(action) {
    if (action == 'view')
        $('#header-update').text($('#header-update').text().replace(localizationResources.Update, localizationResources.Detail))
    else
        $('#header-update').text($('#header-update').text().replace(localizationResources.Detail, localizationResources.Update))
}

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
                            text: item.full_name ?? item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function callApi_select(selector, placeholder, host, controller, action) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
        closeOnSelect: true,
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
                            text: item.full_name ?? item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function ResetPageSize() {
    $("#txtCurrentPage").val(1);
    reCalculatPagesCustom(0);
    viewBtnActionPage();
}
function checkFilesize(files) {

    var result = false;
    if (localStorage["SystemParam"] != null && localStorage["SystemParam"] != undefined) {
        var list_param = JSON.parse(localStorage["SystemParam"]);
        var param = list_param.find(el => el.name === "FILESIZE");
        var filesize = parseInt(param.value);
        const k = 1024;
        const dm = 2;
        var convert_size = files.size / Math.pow(k, dm);
        if (convert_size > filesize) {
            result = true;
        }
    }
    return result;
}
function getFilesizeSystem() {
    var _size = "0 MB";
    if (localStorage["SystemParam"] != null && localStorage["SystemParam"] != undefined) {
        var list_param = JSON.parse(localStorage["SystemParam"]);
        var param = list_param.find(el => el.name === "FILESIZE");
        _size = param.value + " MB";
    }
    return _size;
}

//drop năm
function callApi_oneselect(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.year,
                            text: item.year,
                            current_year: item.current_year,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//cuộc kiểm toán người phụ trách
function callApi_oneselectperson(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            email: item.email,
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
//cuộc kiểm toán thêm mới year
function callapi_selectyearapproved(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.year,
                            id: item.year
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//Phân loại phát hiện (AuditDetect)
function callapi_multipleselect_catdetecttype(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//select phân loại (AuditDetect)
function callApi_catauditrequest(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//select Đơn vị đầu mối (AuditDetect)
function callApi_listfacilityselectone(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//select Đơn vị phối hợp (AuditDetect)
function callApi_listfacilitymutilselect(selector, placeholder, host, controller, action) {
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
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function getApprovalStatus(menucode, statuscode) {
    var status_name = "";
    if (localStorage["ApprovalStatus"] != null && localStorage["ApprovalStatus"] != undefined) {
        var list_approval_status = JSON.parse(localStorage["ApprovalStatus"]);
        var get_status = list_approval_status.find(el => el.function_code === menucode && el.status_code === statuscode);
        if (get_status != undefined && get_status != null) {
            status_name = get_status.status_name;
        }
    }
    if (statuscode == "0.0") {
        status_name = "Hết hiệu lực";
    }
    return status_name;
}
function getStatusByMenuCode(menucode) {
    var lstStatus = [];
    if (localStorage["ApprovalStatus"] != null && localStorage["ApprovalStatus"] != undefined) {
        var list_approval_status = JSON.parse(localStorage["ApprovalStatus"]);
        lstStatus = list_approval_status.filter(el => el.function_code === menucode).map(obj => {
            let rObj = {
                "status_code": obj.status_code,
                "status_name": obj.status_name,
               
            }
           
            return rObj
        });
        if (menucode == "M_AP") {
            let rObj = {
                "status_code": "0.0",
                "status_name": "Hết hiệu lực",
            }
            lstStatus.push(rObj);
        }
    }
    return lstStatus.length > 0 ? lstStatus.sort((a, b) => (a.status_code != "0.0" && parseFloat(a.status_code) - parseFloat(b.status_code))) : lstStatus;
}
function getApprovallevel(menucode) {
    var level = 1;
    if (localStorage["ApprovalStatus"] != null && localStorage["ApprovalStatus"] != undefined) {
        var list_approval_status = JSON.parse(localStorage["ApprovalStatus"]);
        var get_status = list_approval_status.find(el => el.function_code === menucode);
        if (get_status != undefined && get_status != null) {
            level = get_status.level;
        }
    }
    return level;
}
function getApprovaloutSide(menucode) {
    var result = 0;
    if (localStorage["ApprovalStatus"] != null && localStorage["ApprovalStatus"] != undefined) {
        var list_approval_status = JSON.parse(localStorage["ApprovalStatus"]);
        var get_status = list_approval_status.find(el => el.function_code === menucode);
        if (get_status != undefined && get_status != null) {
            result = get_status.outside;
        }
    }
    return result;
}
function CallRequestModal(form_id, attr_id_, attr_name, function_code, function_name) { // id form, id dữ liệu, tên dữ liệu, function_code : menu_code, function_name: menu_name
    $("#modelRequest").modal('show');
    $("#modelRequest").on('shown.bs.modal', function (event) {
        document.getElementById("frmRequestModal").reset();
        var id = $(form_id).find(attr_id_).val();
        var name = $(form_id).find(attr_name).val();
        var modal = $(this);
        modal.find('#item_id').val(id);
        modal.find('#item_name').val(name);
        modal.find('#function_code').val(function_code);
        modal.find('#function_name').val(function_name);
        callApi_select("approver", "Chọn người duyệt...", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
        modal.find('#approver').val(null).change();
    });
}
function CallRejectModal(form_id, attr_id_, attr_name, function_code, function_name) {// id form, id dữ liệu, tên dữ liệu , function_code : menu_code, function_name: menu_name
    $("#modelReject").modal('show');
    $("#modelReject").on('shown.bs.modal', function (event) {
        document.getElementById("frmRejectModal").reset();
        var id = $(form_id).find(attr_id_).val();
        var name = $(form_id).find(attr_name).val();
        var modal = $(this);
        modal.find('#item_id').val(id);
        modal.find('#item_name').val(name);
        modal.find('#function_code').val(function_code);
        modal.find('#function_name').val(function_name);

    });
}
function CallChangeStatusModal(id, name, function_code, function_name, year) {// id dữ liệu, tên dữ liệu, function_code : menu_code,function_name: menu_name
    $("#modalChangeStatusApproval").modal('show');
    $("#modalChangeStatusApproval").on('shown.bs.modal', function (event) {
        document.getElementById("frmChangeStatusModal").reset();
        var modal = $(this);
        modal.find('#item_id').val(id);
        modal.find('#item_name').val(name);
        modal.find('#function_code').val(function_code);
        modal.find('#function_name').val(function_name);
        modal.find('#year').val(year);
        modal.find("#StatusChange").html('');
        var html = '<option value="3.1">' + getApprovalStatus(function_code, "3.1") + '</option>';
        html += '<option value="3.2" selected >' + getApprovalStatus(function_code, "3.2") + '</option>';
        modal.find("#StatusChange").append(html);
    });
}
function CallCancelModal(attr_id_, attr_name, function_code, function_name) {// id form, id dữ liệu, tên dữ liệu , function_code : menu_code, function_name: menu_name
    $("#modelCancelApproval").modal('show');
    $("#modelCancelApproval").on('shown.bs.modal', function (event) {
        document.getElementById("frmCancelApproval").reset();
        var modal = $(this);
        modal.find('#item_id').val(attr_id_);
        modal.find('#item_name').val(attr_name);
        modal.find('#function_code').val(function_code);
        modal.find('#function_name').val(function_name);

    });
}
function SubmitApproval(form_id, attr_id_, attr_name, function_code, function_name, attr_year, attr_status) { //chức năng kế hoạch kiểm toán năm sẽ có thêm param year, các chức năng khá để trống
    var level_approval = getApprovallevel(function_code);
    var _id = $(form_id).find(attr_id_).val();
    var _name = $(form_id).find(attr_name).val();
    var _year = $(form_id).find(attr_year).val();
    var _status = $(form_id).find(attr_status).val();
    var _outside = getApprovaloutSide(function_code);
    if (level_approval == 1 || _status == "2.1" || _outside == 1) {

        swal({
            title: "Thông báo",
            text: "Bạn có chắc chắn muốn duyệt bản ghi này?  " + _name,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: localizationResources.Accept,
            cancelButtonText: localizationResources.Cancel,
        }, function (isConfirm) {
            if (isConfirm) {
                fnSubmitApproval(_id, function_code, function_name, _year);
            }
        });
    }
    else if (level_approval > 1) {        
        $("#modelApprovalAndRequest").modal('show');
        $("#modelApprovalAndRequest").on('shown.bs.modal', function (event) {
            document.getElementById("frmApprovalRequestModal").reset();
            var modal = $(this);
            modal.find('#item_id').val(_id);
            modal.find('#item_name').val(_name);
            modal.find('#function_code').val(function_code);
            modal.find('#function_name').val(function_name);
            modal.find('#year').val(_year);
            if (getApprovaloutSide(function_code) == 1) {
                modal.find('#showTitle').hide();
                modal.find('#approver_level').prop("disabled",true);
            }
            else {
                modal.find('#showTitle').show();
                callApi_select("approver_level", "Chọn người duyệt...", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
                modal.find('#approver_level').val(null).change();
                $("#frmApprovalRequestModal").find("#approver_level").prop("disabled", false);
            }
           
        });
    }
}
function fnSubmitApproval(id, function_code, function_name, year) {
    var obj = {
        'item_id': id,
        'function_name': function_name,
        'function_code': function_code,
        'year': year
    }
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.submitapproval.path,
        apiConfig.api.approvalfunction.action.submitapproval.method,
        obj, 'fnApprovalSuccess');

    var obj_log = {
        'item_id': id,
        'item_type': getTypeLogKitano(function_code),
        'type': 'Duyệt',
        'content': 'Đã duyệt',
        'version': $("#formDetail").find("#versionDetail").val(),
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.savediscussionhistory.path,
        apiConfig.api.discussionhistory.action.savediscussionhistory.method,
        obj_log, '', 'msgError');
}
function fnApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Phê duyệt thành công!", "Thông báo!", { progressBar: true });
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            createdLogKitano(obj.function_name, "Phê duyệt dữ liệu");
        }
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    $("#frmRequestModal").validate({
        rules: {
            approver: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmRequestModal").find("#item_id").val();
            var approvaluser = $("#frmRequestModal").find("#approver").val();
            var function_code = $("#frmRequestModal").find("#function_code").val();
            var function_name = $("#frmRequestModal").find("#function_name").val();
            var obj = {
                'item_id': id,
                'approvaluser': approvaluser,
                'function_name': function_name,
                'function_code': function_code,
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.requestapproval.path,
                apiConfig.api.approvalfunction.action.requestapproval.method,
                obj, 'fnRequestApprovalSuccess');
            var obj_log = {
                'item_id': parseInt(id),
                'item_type': getTypeLogKitano(function_code),
                'type': 'Gửi duyệt',
                'content': 'Đã gửi duyệt',
                'version': $("#formDetail").find("#versionDetail").val(),
            }
            callApi_auditservice(
                apiConfig.api.discussionhistory.controller,
                apiConfig.api.discussionhistory.action.savediscussionhistory.path,
                apiConfig.api.discussionhistory.action.savediscussionhistory.method,
                obj_log, '', 'msgError');
            
        }
    });
    $("#frmRejectModal").validate({
        rules: {
            reasonnote: { required: true }
        },
        submitHandler: function () {
            var id = $("#frmRejectModal").find("#item_id").val();
            var reasonnote = $("#frmRejectModal").find("#reasonnote").val();
            var function_code = $("#frmRejectModal").find("#function_code").val();
            var function_name = $("#frmRejectModal").find("#function_name").val();
            var obj = {
                'item_id': id,
                'function_name': function_name,
                'function_code': function_code,
                'reason_note': reasonnote,
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.rejectapproval.path,
                apiConfig.api.approvalfunction.action.rejectapproval.method,
                obj, 'fnRejectApprovalSuccess');
            var obj_log = {
                'item_id': parseInt(id),
                'item_type': getTypeLogKitano(function_code),
                'type': 'Từ chối phê duyệt',
                'content': reasonnote,
                'version': $("#formDetail").find("#versionDetail").val(),
            }
            callApi_auditservice(
                apiConfig.api.discussionhistory.controller,
                apiConfig.api.discussionhistory.action.savediscussionhistory.path,
                apiConfig.api.discussionhistory.action.savediscussionhistory.method,
                obj_log, '', 'msgError');
        }
    });
    $("#frmApprovalRequestModal").validate({
        rules: {
            approver: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmApprovalRequestModal").find("#item_id").val();
            var approvaluser = $("#frmApprovalRequestModal").find("#approver_level").val();
            var function_code = $("#frmApprovalRequestModal").find("#function_code").val();
            var function_name = $("#frmApprovalRequestModal").find("#function_name").val();
            var year = $("#frmApprovalRequestModal").find("#year").val();
            var obj = {
                'item_id': id,
                'approvaluser': approvaluser,
                'function_name': function_name,
                'function_code': function_code,
                'year': year
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.submitapproval.path,
                apiConfig.api.approvalfunction.action.submitapproval.method,
                obj, 'fnApprovalSuccess');

            var obj_log = {
                'item_id': id,
                'item_type': getTypeLogKitano(function_code),
                'type': 'Duyệt',
                'content': 'Đã duyệt',
                'version': $("#formDetail").find("#versionDetail").val(),
            }
            callApi_auditservice(
                apiConfig.api.discussionhistory.controller,
                apiConfig.api.discussionhistory.action.savediscussionhistory.path,
                apiConfig.api.discussionhistory.action.savediscussionhistory.method,
                obj_log, '', 'msgError');
        }
    });
    $("#frmCancelApproval").validate({
        rules: {
            reasonnote: { required: true }
        },
        submitHandler: function () {
            var id = $("#frmCancelApproval").find("#item_id").val();
            var reasonnote = $("#frmCancelApproval").find("#reasonnote").val();
            var function_code = $("#frmCancelApproval").find("#function_code").val();
            var function_name = $("#frmCancelApproval").find("#function_name").val();
            var obj = {
                'item_id': id,
                'function_name': function_name,
                'function_code': function_code,
                'reason_note': reasonnote,
            }
            callApi_userservice(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.cancelapproval.path,
                apiConfig.api.approvalfunction.action.cancelapproval.method,
                obj, 'fnCancelApprovalSuccess');
            var obj_log = {
                'item_id': parseInt(id),
                'item_type': getTypeLogKitano(function_code),
                'type': 'Hủy phê duyệt',
                'content': reasonnote,
                'version': $("#formDetail").find("#versionDetail").val(),
            }
            callApi_auditservice(
                apiConfig.api.discussionhistory.controller,
                apiConfig.api.discussionhistory.action.savediscussionhistory.path,
                apiConfig.api.discussionhistory.action.savediscussionhistory.method,
                obj_log, '', 'msgError');
        }
    });
});

function fnRequestApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelRequest').modal('hide');
        toastr.success("Gửi phê duyệt thành công!", "Thông báo!", { progressBar: true });
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            createdLogKitano(obj.function_name, "Gửi phê duyệt dữ liệu");
        }
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Gửi phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function fnRejectApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelReject').modal('hide');
        toastr.success("Từ chối duyệt thành công!", "Thông báo!", { progressBar: true });
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            createdLogKitano(obj.function_name, "Từ chối phê duyệt dữ liệu");
        }
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Từ chối duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}

function fnCancelApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        $('#modelReject').modal('hide');
        toastr.success("Hủy duyệt thành công!", "Thông báo!", { progressBar: true });
        if (rspn.data != undefined && rspn.data != null) {
            var obj = rspn.data
            createdLogKitano(obj.function_name, "Hủy phê duyệt dữ liệu");
        }
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Hủy phê duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
function createdLogKitano(_module, _perform_tasks) {
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
//Xem lịch sử*/
function onSearchHistoryLogKitano(param, function_code) {
    var obj = {
        'item_id': param,
        'item_type': getTypeLogKitano(function_code),
        'page_size': 9999,
        'start_number': 0,
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.search.path,
        apiConfig.api.discussionhistory.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchHistoryLogKitanoSuccess', 'msgError');
}
function fnSearchHistoryLogKitanoSuccess(rspn) {
    var tbBody = $('#KitanoFunctionHistory tbody');
    $("#KitanoFunctionHistory").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {

        var data = rspn.data;

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            var html = '<tr>' +
                '<td>' + obj.created_at + '</td>' +
                '<td>' + obj.person_perform + '</td>' +
                '<td>' + obj.type + '</td>' +
                '<td>' + obj.content + '</td>' +
                '</tr>';
            tbBody.append(html);
        }

    }
    var t = $("#KitanoFunctionHistory").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3],
                "searchable": false,
                "orderable": false
            }],
        "order": [],
    });
}
function SaveHistoryKitano(item_id, function_code, type, content,version) {
    var obj = {
        'item_id': parseInt(item_id),
        'item_type': getTypeLogKitano(function_code),
        'type': type,
        'content': content,
        'version': version +"",
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.savediscussionhistory.path,
        apiConfig.api.discussionhistory.action.savediscussionhistory.method,
        obj, '', 'msgError');
}
function showFileUpload() {
    var _file = $("#frmChangeStatusModal #fileUploadModal");
    _file.html('');
    var status = $('#frmChangeStatusModal').find('#StatusChange').val()
    if (status == '3.1') {
        $('#fileUploadModal').show();
        $('#frmChangeStatusModal').find('#shownote').hide();
        var html =
            '<label for="FileChangeStatusApproval" class="col-form-label">' + "File đính kèm" + '</label><span class="text-danger">*</span>' +
            '<input type="file" class="form-control required" id="FileChangeStatusApproval" multiple/>';
        _file.append(html);
    } else {
        $('#fileUploadModal').hide();
        $('#frmChangeStatusModal').find('#shownote').show();
        $('#frmChangeStatusModal').find('#shownote').val("");
        _file.html('');
    }
}
function updateChangeStatusApproval() {
    var obj = {
        'item_id': $("#frmChangeStatusModal").find("#item_id").val(),
        'status_code': $("#frmChangeStatusModal").find("#StatusChange").val(),
        'function_name': $("#frmChangeStatusModal").find("#function_name").val(),
        'function_code': $("#frmChangeStatusModal").find("#function_code").val(),
        'browsedate': $("#frmChangeStatusModal").find("#DateChangeStatus").val(),
        'reason_note': $("#frmChangeStatusModal").find("#reasonnote").val(),
        'year': $("#frmChangeStatusModal").find("#year").val(),
    }
    var formData = new FormData();
    formData.append("data", JSON.stringify(obj));

    var Status = $('#frmChangeStatusModal').find("#StatusChange").val();
    var check = false;
    if (Status == '3.1') {
        var input = document.getElementById('FileChangeStatusApproval');
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
    }
    if (validateRequired('#frmChangeStatusModal')) {
        if (Status == '3.1') {
            if (check != true) {
                callApi_userservice_update(
                    apiConfig.api.approvalfunction.controller,
                    apiConfig.api.approvalfunction.action.updatestatus.path,
                    formData, 'ChangeStatusApprovalSuccess');
            }
        }
        else {
            callApi_userservice_update(
                apiConfig.api.approvalfunction.controller,
                apiConfig.api.approvalfunction.action.updatestatus.path,
                formData, 'ChangeStatusApprovalSuccess');
        }

    }
}
function ChangeStatusApprovalSuccess(res) {
    if (res.code === '1') {
        $('#modalChangeStatusApproval').modal('hide');
        toastr.success("Cập nhật trạng thái thành công!", "Thông báo!", { progressBar: true });

        if (res.data != undefined && res.data != null) {
            var obj = res.data
            var content = $("#frmChangeStatusModal").find("#reasonnote").val();
            if (content == undefined || content == "") {
                content = "Cập nhật trạng thái"
            }
            createdLogKitano(obj.function_name, content);
            SaveHistoryKitano(obj.item_id, obj.function_code, "Cập nhật trạng thái", content, viewValue(obj.version));
        }
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Cập nhật trạng thái không thành công!", "Lỗi!", { progressBar: true });
    }
}
function DownloadFileApproval(id, name_file) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_user_service + apiConfig.api.approvalfunction.controller + apiConfig.api.approvalfunction.action.downloadfileattach.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = name_file;//"Ke_hoach_kiem_toan_nam.xlsx";
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
function deletefileApproval(id) {
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
            fnDeleteFileApproval(id);
        }
    });
}
function fnDeleteFileApproval(id) {
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.deletefileattach.path + "/" + id,
        apiConfig.api.approvalfunction.action.deletefileattach.method,
        null, 'fnDeleteFileApprovalSuccess');
}
function fnDeleteFileApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        setTimeout(function () {
            location.reload();
        }, 300);
    }
    else {
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}
function getTypeLogKitano(code) {
    var type = 0;
    switch (code) {
        case "M_AP":
            type = 1;
            break;
        case "M_PAP":
            type = 2;
            break;
        case "M_WP":
            type = 3;
            break;
        case "M_AD":
            type = 4;
            break;
        case "M_RAW":
            type = 5;
            break;
        case "M_APRG":
            type = 6;
            break;
        case "M_RAP":
            type = 7;
            break;

    }
    return type;
}
function AppendStatus(element,menu_code) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $(element).html('');
    $(element).append(htmlOption);
    var lstStatus = getStatusByMenuCode(menu_code);
    var html = "";
    lstStatus.forEach(function (v) {
        html += '<option value="' + v.status_code + '">' + v.status_name + '</option>';
    });
    $(element).append(html);
}

//Mức xếp hạng KT (AuditMinutes)
function callapi_ratting_auditminutes(selector, placeholder, host, controller, action) {
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
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            id: item.id,
                            text: item.name,
                        }
                    })
                };
            },
            cache: true
        }
    });
}

function getApplyForname(value) {

    var name = '';
    switch (value) {
        case 'QT': name = 'Quy trình';
            break;
        case 'DV': name = 'Đơn vị';
            break;
        case 'HDKD': name = 'Hoạt động';
            break;
    }
    return name;
}
