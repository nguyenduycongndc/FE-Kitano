$(function () {
    reCalculatPagesCustom(0);
    viewBtnActionPage();
});
function multipleselect(selector, placeholder, host, controller, action) {
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
function ClickShow(type) {
    var value = $("#dashboard tbody td .checkitem:checked").val();
    //localStorage["homeclick"] = 1;
    //localStorage["itemclick"] = value;
    switch (type) {
        case 1:
            window.location.href = "/AuditPlan";
            break;
        case 2:            
            window.location.href = "/AuditProgram";



            break;
        case 3:
            window.location.href = "/WorkingPaper";
            break;
        case 4:
            window.location.href = "/ReportAuditWork";
            break;
        case 5:
            window.location.href = "/AuditRequestMonitor";
            break;
        case 6:
            window.location.href = "/AuditWorkDashBoard";
            break;
        default:
    }
    //if (value == undefined || value == null) {
    //    return false;
    //}
    //else {
    //    switch (type) {
    //        case 1:
    //            window.location.href = "/AuditPlan";
    //            break;
    //        case 2:
    //            window.location.href = "/AuditProgram";
    //            break;
    //        case 3:
    //            window.location.href = "/WorkingPaper";
    //            break;
    //        case 4:
    //            window.location.href = "/ReportAuditWork";
    //            break;
    //        case 5:
    //            window.location.href = "/AuditRequestMonitor";
    //            break;
    //        case 6:
    //            window.location.href = "/AuditDetect";
    //            break;
    //        default:
    //    }
    //}
}
function openView(type, value, frmHeader) {
    var index = $("#view");
    var edit = $("#edit");
    if (type === 0) {
        index.show();
        edit.hide();
        LoadAuditWork();
        setTimeout(function () {
            onSearch();
        }, 100);
    }
    else if (type === 3) {
        $("#myTab li")[0].click();
        index.hide();
        edit.show();
        fnGetDetail(type, value);
        //LoadAuditWWorkEdit();
    }
}
function onSearch() {
    var year = new Date().getFullYear() + "";
    var obj = {
        'code': $("#filterFullName").val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val()),
        'year': year,
    }
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchprepareaudit.path,
        apiConfig.api.auditwork.action.searchprepareaudit.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchPrepareAuditSuccess', 'msgError');
}

function fnSearchPrepareAuditSuccess(rspn) {
    //showLoading();
    var tbBody = $('#dashboard tbody');
    $("#dashboard").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        LoadAuditWork();
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var testStatus = (obj.status == 1 ? "Bản nháp" : (obj.status == 2 ? "Chờ duyệt" : (obj.status == 3 ? "Đã duyệt" : (obj.status == 4 ? "Từ chối duyệt" : (obj.status == 5 ? "Ngừng sử dụng" : "")))));
            var testExecutionStatus = (obj.execution_status == 1 ? "Chưa thực hiện" : (obj.execution_status == 2 ? "Đang thực hiện" : (obj.execution_status == 3 ? "Hoàn thành" : "")));
            var html = [
                '<tr>' +
                '<td><input type="radio" class="checkitem" id="checkitem" name="checkitem" value="' + obj.id+'"/></td>'+
                '<td class="text-center">'+ (i+1)+'</td>' +
                '<td class="text-center">' + obj.year + '</td>' +
                '<td>' + obj.code + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td class="text-center">' + obj.start_date + '</td>' +
                '<td class="text-center">' + obj.end_date + '</td>' +
                '<td>' + obj.name_person_in_charge + '</td>' +
                '<td>' + obj.execution_status_str + '</td>' +
                '</tr>'
            ];
            tbBody.append(html);
        }
      
    }
    var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    var t = $("#dashboard").DataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "columnDefs": [
            {
                "targets": 1,
                "className": "text-center",
                "orderable": false,
                "data": null,
            },
            {
                "targets": [0,1],
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    t.on('order.dt search.dt', function () {
        t.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + page_size + 1;
        });
    }).draw();
    reCalculatPagesCustom(rspn.total);
    viewBtnActionPage();
}
function fnGetDetail(type, param) {
    LoadAuditWWorkEdit();
    var call_back = '';
    if (type === 3) {
        call_back = 'fnEditSuccess';
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.auditworkdetail.path + "/" + param,
        apiConfig.api.auditplan.action.auditworkdetail.method,
        null, call_back, 'msgError');
}

function fnEditSuccess(rspn) {
    //LoadAuditWWorkEdit();
    var frmModify = $("#num1");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#num1").clearQueue();
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#YearEdit").val(data.year);
        frmModify.find("#CodeEdit").val(data.code);
        frmModify.find("#NameEdit").val(data.name);
        frmModify.find("#TargetEdit").val(data.target);
        if (data.str_person_in_charge) {
            var _value = data.str_person_in_charge;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmModify.find("#PersonInChargeEdit").append(newOption).trigger('change');
        }
        frmModify.find("#ClassifyEdit").val(data.classify);
        frmModify.find("#FromDateEdit").val(data.start_date);
        frmModify.find("#ToDateEdit").val(data.end_date);
        frmModify.find("#StatusSuccessEdit").val(data.execution_status);
        frmModify.find("#StatusEdit").val(data.status);
        var tbBody = $('#auditworkNum2table tbody');
        $("#auditworkNum2table").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditpersonnel !== undefined && data.listauditpersonnel !== null) {
            var data_ = data.listauditpersonnel;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    /*'<td style="" class="text-center">' + (i + 1) + '</td>' +*/
                    '<td>' + obj.fullName + '</td>' +
                    '<td class="line-break">' + obj.email + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditPersonnel(\'' + obj.fullName + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }

        }
        //$("#auditworkNum2table").DataTable({
        //    "bPaginate": false,
        //    "bLengthChange": false,
        //    "bFilter": false,
        //    "bInfo": false,
        //    "columnDefs": [
        //        {
        //            "targets": [0, 1],
        //            "searchable": false,
        //            "orderable": false
        //        }
        //    ],
        //    "order": [],
        //    "drawCallback": function (settings) {
        //        $('[data-toggle="tooltip"]').tooltip();
        //    },
        //});
    }
}
function DeleteAuditPersonnel(fullName, id) {
    var _name = String(fullName);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditPersonnel(id);
        }
    });
}
function fnDeleteAuditPersonnel(id) {
    callApi_auditservice(
        apiConfig.api.auditassignment.controller,
        apiConfig.api.auditassignment.action.delete.path + "/" + id,
        apiConfig.api.auditassignment.action.delete.method,
        null, 'fnDeleteAuditPersonnelSuccess', 'msgError');
}

function fnDeleteAuditPersonnelSuccess(rspn) {
    if (rspn.code === '1') {
        swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        fnGetDetail(3, rspn.id);
    }
    else {
        swal("Error!", "Xóa dữ liệu không thành công!", "error");
    }
}
$(document).on("click", "li.nav-item", function () {
    $("li.nav-item").removeAttr("style");
    $(this).css("border-bottom-color", "#2f80ed");

    console.log(this)
})
function LoadAuditWork() {
    setTimeout(function () {
        multipleselect("PersonInCharge", "Chọn người phụ trách..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.select.path);
    }, 100);
}
function LoadAuditWWorkEdit() {
    setTimeout(function () {
        multipleselect("PersonInChargeEdit", "Chọn người phụ trách..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.select.path);
    }, 100);
}
var _count = 0;
function AddRow() {
    var table_row = "";
    table_row += '<tr> ' +
        ' <td><select onchange="clickName(this)" class="form-control usersid" id="Users_' + _count + '" name="Users_' + _count + '" style="padding:0;"></td>' +
        ' <td><input disabled type="text" class="form-control picker email" id="Email_' + _count + '" name="Email_' + _count + '"></td>' +
        '<td class="col-action">' +
        '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
        '</td>' +
        ' </tr>';
    $("#auditworkNum2body").append(table_row);
    multipleselect("Users_" + _count, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
    var recount = 0;
    $("#auditworkNum2table > tbody > tr").each(function (i, v) {
        recount++;
    });
    _count++;
}
var _userid = "";
function clickName(elment) {
    _userid = "";
    _userid = $(elment).attr('id');
    var _user = $(elment).val();
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.detailuseraudiwork.path + "/" + _user,
        apiConfig.api.systemuser.action.detailuseraudiwork.method,
        null, 'findEmail', 'msgError');
    //$("#auditworkNum2table > tbody > tr").each(function (i, v) {
    //    debugger
    //    var _user = parseInt($(v).find(".usersid").val());
    //    _userid = "";
    //    _userid = $(v).find('select').attr('id');
    //    callApi_userservice(
    //        apiConfig.api.systemuser.controller,
    //        apiConfig.api.systemuser.action.detailuseraudiwork.path + "/" + _user,
    //        apiConfig.api.systemuser.action.detailuseraudiwork.method,
    //        null, 'findEmail', 'msgError');
    //});

}
function findEmail(rspn) {
    var data = rspn.data;
    $("#auditworkNum2body").find('#' + _userid).closest('td').next().find('.email').val(data.email)
    //test.find("#Email_"+ _count).val(data.email);
}
function DeleteRow(element) {
    var $tr = $(element).closest("tr");
    $tr.remove();
    var recount = 0;
    $("#auditworkNum2table > tbody > tr").each(function (i, v) {
        recount++;
    });
}
function submitEdit() {
    var obj = {
        'id': $('#IdEdit').val(),
        'year': $('#YearEdit').val().trim(),
        'code': $('#CodeEdit').val().trim(),
        'name': $('#NameEdit').val().trim(),
        'target': $('#TargetEdit').val().trim(),
        'person_in_charge': $('#PersonInChargeEdit').val(),
        'classify': $('#ClassifyEdit').val(),
        'start_date': $('#FromDateEdit').val(),
        'end_date': $('#ToDateEdit').val(),
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.prepareauditupdate.path,
        apiConfig.api.auditplan.action.prepareauditupdate.method,
        obj, 'updateAuditWorkSuccess', 'msgError');
}
function updateAuditWorkSuccess(data) {
    if (data.code === '1') {
        //createdLog("Loại đơn vị", "Chỉnh sửa loại đơn vị");
        swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        setTimeout(function () {
            window.location.href = "/PrepareAuditPlan"
        }, 2000);
    } else if (data.code == 0) {
        swal("Error!", "Loại đơn vị không được để trống!", "warning");
    } else if (data.code == -1) {
        swal("Error!", "Loại đơn vị này đã tồn tại!", "warning");
    }
    else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}
window.onload = function () {
    //let checkLocalStatus = localStorage.getItem('status');
    //if (checkLocalStatus == null) {
    //    localStorage.setItem('status', "-1");
    //}
    //let checkLocalType = localStorage.getItem('type');
    //let type = parseInt(checkLocalType);
    //let checkLocalId = localStorage.getItem('id');
    //let id = parseInt(checkLocalId);
    //if (checkLocalType === null && checkLocalId === null) {
    //    type = 0;
    //    id = 0;
    //}
    type = 0;
    id = 0;
    setTimeout(function () {
        openView(type, id);
    }, 100);

}
