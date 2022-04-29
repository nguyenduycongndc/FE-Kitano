
function callApi_multipleselect(selector, placeholder, host, controller, action) {
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

function updateSuccess(data) {
    swal(localizationResources.Successfully, localizationResources.SaveSuccess, "success");
    setTimeout(function () {
        window.location.href = "/UsersGroup"
    }, 2000);
}
function updateFail(request, status, error) {
    swal(localizationResources.Error, localizationResources.SaveFail, "error");
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
        apiConfig.api.systemusergroup.controller,
        apiConfig.api.systemusergroup.action.search.path,
        apiConfig.api.systemusergroup.action.search.method,
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
    callApi_userservice(
        apiConfig.api.systemusergroup.controller,
        apiConfig.api.systemusergroup.action.getItem.path + "/" + param,
        apiConfig.api.systemusergroup.action.getItem.method,
        null, _fnName, 'msgError');
}
var validateform;
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#form-audit-work").validate({
        rules: {
            Name: { required: true, minlength: 2, hasdoubleWhiteSpace: true, nospechars: true },
            Target: { required: true, minlength: 2, hasdoubleWhiteSpace: true, nospechars: true },
            StartDate: { required: true},
            EndDate: { required: true},
            PersonInCharge: { required: true},
            NumOfAuditor: { required: true},
        },
        submitHandler: function () {
            var list_asign = [];
            $("#auditworktable > tbody > tr").each(function (i, v) {
                var asign_item = {
                    user_id: $(v).find(".usersid").val(),
                    start_date: $(v).find(".start_date").val(),
                    end_date: $(v).find(".end_date").val(),
                }
                list_asign.push(asign_item);
            });
            var obj = {
                'id': $('#Id').val(),
                'name': $('#Name').val(),
                'target': $('#Target').val(),
                'start_date': $('#StartDate').val(),
                'end_date': $('#EndDate').val(),
                'num_of_workdays': $("#NumOfWorkdays").val(),
                'person_in_charge': $('#PersonInCharge').val(),
                'num_of_auditor': $("#NumOfAuditor").val(),
                'req_skill_audit': $("#ReqSkillForAudit").val(),
                'req_outsourcing': $("#ReqOutsourcing").val(),
                'req_other': $("#ReqOther").val(),
                'scale_of_audit': $("#ScaleOfAudit").val(),
                "list_assign": list_asign,
            }
            if ($('#Id').val() === '0') {
                callApi_auditservice(
                    apiConfig.api.auditwork.controller,
                    apiConfig.api.auditwork.action.add.path,
                    apiConfig.api.auditwork.action.add.method,
                    obj, 'updateSuccess', 'updateFail');
            }
            else {
                callApi_auditservice(
                    apiConfig.api.auditwork.controller,
                    apiConfig.api.auditwork.action.update.path,
                    apiConfig.api.auditwork.action.update.method,
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
        var _list = data.list_users;
        if (_list.length > 0) {
            $(_list).each(function () {
                var newOption = new Option(this.split(':')[1], this.split(':')[0], true, true);
                frmModify.find("#ListUsers").append(newOption).trigger('change');
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

