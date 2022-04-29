//function callApi_oneselect(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            id: item.year,
//                            text: item.year,
//                            current_year: item.current_year,
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}
function callApi_multipleselect_auditwork(selector, placeholder, host, controller, action) {
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
                            year: item.year,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function callapi_multipleselect_auditprocess(selector, placeholder, host, controller, action) {
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
                            id: item.auditprocess_id,
                            text: item.auditprocess_name,
                            keyid: item.id,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function callapi_multipleselect_auditfacility(selector, placeholder, host, controller, action) {
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
                            id: item.auditfacilities_id,
                            text: item.auditfacilities_name,
                            keyid: item.id,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
//function callApi_multipleselect_follower(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            email: item.email,
//                            text: item.full_name,
//                            id: item.id
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}


//function callApi_multipleselect_discoverer(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            text: item.full_name,
//                            id: item.id
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}

//function callapi_multipleselect_catdetecttype(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            id: item.id,
//                            text: item.name,
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}

////select phân loại
//function callApi_catauditrequest(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            id: item.id,
//                            text: item.name,
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}
////select Đơn vị đầu mối
//function callApi_listfacilityselectone(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            id: item.id,
//                            text: item.name,
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}
////select Đơn vị phối hợp
//function callApi_listfacilitymutilselect(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: true,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            id: item.id,
//                            text: item.name,
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}

function callapi_oneselect_submitpersonbrowse(selector, placeholder, host, controller, action) {
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
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}


function LoadCatDetectType() {
    //setTimeout(function () {
    //    callapi_multipleselect_catdetecttype("ClassifyAuditDetectEdit", "Chọn Loại phát hiện...",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listcatdetecttype.path);
    //}, 60);
}
function LoadFollower() {
    //setTimeout(function () {
    //    callApi_multipleselect_follower("FollowerEdit", "Chọn người phụ trách..",
    //        apiConfig.api.host_user_service,
    //        apiConfig.api.systemuser.controller,
    //        apiConfig.api.systemuser.action.selectaudiWork.path);
    //}, 50);
}
function LoadYearAuditWork() {
    //setTimeout(function () {
    //    callApi_oneselect("YearAuditWork", "Chọn năm...",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditplan.controller,
    //        apiConfig.api.auditplan.action.listyearauditwork.path);
    //}, 50);
}
function LoadAuditWork() {
    //setTimeout(function () {
    //    callApi_multipleselect_auditwork("AuditWork", "Chọn cuộc kiểm toán...",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditplan.controller,
    //        apiConfig.api.auditplan.action.listauditwork.path/* + "?" + "year" + "=" + parseInt(_year)*/);
    //}, 90);
}
function LoadAuditfacility() {
    //setTimeout(function () {
    //    callapi_multipleselect_auditfacility("Auditfacility", "Chọn đơn vị được kiểm toán...",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditplan.controller,
    //        apiConfig.api.auditplan.action.listauditfacility.path);
    //}, 91);
}
function LoadAuditProcess() {
    //setTimeout(function () {
    //    callapi_multipleselect_auditprocess("AuditProcess", "Chọn quy trình được kiểm toán...", apiConfig.api.host_audit_service,
    //        apiConfig.api.auditplan.controller,
    //        apiConfig.api.auditplan.action.listauditprocess.path);
    //}, 92);
}
//load người chịu trách nhiệm
function LoadUser() {
    //setTimeout(function () {
    //    callApi_multipleselect_follower("CreateUser", "Chọn người chịu trách nhiệm..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listuserresponsible.path);
    //}, 50);
}
//load phân loại
function LoadCatAuditRequest() {
    //setTimeout(function () {
    //    callApi_catauditrequest("CreateCatAuditRequest", "Chọn phân loại..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listcatauditrequest.path);
    //}, 55);
}
//load đơn vị đầu mối
function LoadFacility() {
    //setTimeout(function () {
    //    callApi_listfacilityselectone("CreateUnit", "Chọn đơn vị đầu mối..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listfacility.path);
    //}, 60);
}
//load Đơn vị phối hợp
function LoadFacilityMutilSelect() {
    //setTimeout(function () {
    //   callApi_listfacilitymutilselect("CreateCooperateunit", "Chọn đơn vị phối hợp..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listfacility.path);
    //}, 65);
}
//load Đơn vị phối hợp
function LoadFacilityDetailMutilSelect() {
    //setTimeout(function () {
    //    callApi_listfacilitymutilselect("DetailCooperateunit", "Chọn đơn vị phối hợp..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listfacility.path);
    //}, 65);
}

//load người chịu trách nhiệm sửa
function LoadEditUser() {
    //setTimeout(function () {
    //    callApi_multipleselect_follower("EditUser", "Chọn người chịu trách nhiệm..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listuserresponsible.path);
    //}, 50);
}
//load phân loại sửa
function LoadEditCatAuditRequest() {
    //setTimeout(function () {
    //    callApi_catauditrequest("EditCatAuditRequest", "Chọn phân loại..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listcatauditrequest.path);
    //}, 55);
}
//load đơn vị đầu mối sửa
function LoadFacilityEdit() {
    //setTimeout(function () {
    //    callApi_listfacilityselectone("EditUnit", "Chọn đơn vị đầu mối..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listfacility.path);
    //}, 60);
}
//load Đơn vị phối hợp sửa
function LoadFacilityEditMutilSelect() {
    //setTimeout(function () {
    //    callApi_listfacilitymutilselect("EditCooperateunit", "Chọn đơn vị phối hợp..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listfacility.path);
    //}, 65);
}
function setValueYear(elment) {
    $('#AuditWork').val(null).trigger('change');
    $('#AuditProcess').val(null).trigger('change');
    $('#Auditfacility').val(null).trigger('change');
    $('#AuditWork').html('');
    $('#AuditProcess').html('');
    $('#Auditfacility').html('');
}
function setValueAuditWork(elment) {
    $('#Auditfacility').val(null).trigger('change');
    $('#AuditProcess').val(null).trigger('change');
    $('#Auditfacility').html('');
    $('#AuditProcess').html('');
}
function setValueAuditfacility(elment) {
    $('#AuditProcess').val(null).trigger('change');
    $('#AuditProcess').html('');
}

function setValueEditUser(elment) {
    $('#EditUser').val(null).trigger('change');
    $('#EditUser').html('');
}
function onSearch() {
    var obj = {
        'year': ($('#YearAuditWork').val() != null ? parseInt($('#YearAuditWork').val()) : $('#YearAuditWork').val()),
        'auditwork_id': ($('#AuditWork').val() != null ? parseInt($('#AuditWork').val()) : $('#AuditWork').val()),
        'auditprocess_id': ($('#AuditProcess').val() != null ? parseInt($('#AuditProcess').val()) : $('#AuditProcess').val()),
        'auditfacilities_id': ($('#Auditfacility').val() != null ? parseInt($('#Auditfacility').val()) : $('#Auditfacility').val()),
        'code': $('#DetectCode').val().trim(),
        'title': $('#DetectTitle').val().trim(),
        'working_paper_code': $('#WorkingPaperCode').val().trim(),
        'audit_report': parseInt($('#AuditReport').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.search.path,
        apiConfig.api.auditdetect.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchAuditDetectSuccess', 'msgError');
}

function fnSearchAuditDetectSuccess(rspn) {
    showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var level_approval = getApprovallevel("M_AD");
        var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        var data = rspn.data;
        var tbBody = $('#AuditDetectTable tbody');
        $("#AuditDetectTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var ratingRisk = (obj.rating_risk == 1 ? "Cao/Quan trọng" : (obj.rating_risk == 2 ? "Trung bình" : (obj.rating_risk == 3 ? "Thấp/Ít quan trọng" : "")));
            var auditReport = (obj.audit_report == 1 ? "Có" : "Không");
            var StatusName = getApprovalStatus("M_AD", obj.status);
            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td>' + obj.code + '</td>' +
                '<td>' + obj.title + '</td>' +
                '<td>' + ratingRisk + '</td>' +
                '<td>' + auditReport + '</td>' +
                '<td>' + obj.working_paper_code + '</td>' +
                '<td>' + obj.auditprocess_name + '</td>' +
                '<td>' + obj.auditfacilities_name + '</td>' +
                '<td>' + obj.auditwork_name + '</td>' +
                '<td class="text-center">' + obj.year + '</td>' +
                '<td>' + StatusName + '</td>' +
                '<td class="text-center col-action">' +
                //'<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +

                //các comment mở lại khi có quyền
                (IsCheckPemission('M_AD', 'PER_DETAIL') === true ?
                    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                +
                (/*&& obj.user_login_id == obj.created_by*/IsCheckPemission('M_AD', 'PER_EDIT') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")/* && obj.roleId !== 1*/
                    ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>') +
                ( /*&& obj.user_login_id == obj.created_by*/  IsCheckPemission('M_AD', 'PER_DEL') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2") /*&& obj.roleId !== 1*/
                    ? '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteDetect(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +

                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(6,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.title + '"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                '</li>' +
                '<li class="optioncustom">' +

                ((/*obj.status == 1 || obj.status == 4 && */IsCheckPemission('M_AD', 'PER_REQUEST') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1") /*&& obj.roleId !== 1*/)
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.title + '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +

                '</li>' +
                '<li class="optioncustom">' +
                /*((*//*obj.status == 2 && obj.flag_user_id == obj.user_login_id &&*//* IsCheckPemission('M_AD', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user == currentUser.id)) *//*&& obj.roleId !== 1*//*)*/
                (IsCheckPemission('M_AD', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(5,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.title + '" style=" display: flex;"><i data-toggle="tooltip" title="Kiểm duyệt" class="fa fa-check-square" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Kiểm duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Kiểm duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Kiểm duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AD', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
                ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.code + '\',\'M_AD\',\'Danh sách phát hiện\')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_AD', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_AD') == 1
                    ? '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.code + '\',\'M_AD\',\'Danh sách phát hiện\',\'\')"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '</ul>'
                + '</span>' +
                //các comment mở lại khi có quyền
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditDetectTable").DataTable({
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
        hideLoading();
    } else if (rspn.data == "") {
        var tbBody = $('#AuditDetectTable tbody');
        $("#AuditDetectTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditDetectTable").DataTable({
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
var idedit = null;
function notdataTableAuditObserve() {
    $('#auditdetecttablecreate tbody').html('');
    $("#auditdetecttablecreate").dataTable().fnDestroy();
    $("#auditdetecttablecreate").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    $('#auditdetecttabledetail tbody').html('');
    $("#auditdetecttabledetail").dataTable().fnDestroy();
    $("#auditdetecttabledetail").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

    $('#auditdetecttable tbody').html('');
    $("#auditdetecttable").dataTable().fnDestroy();
    $("#auditdetecttable").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
}
function notdataTableAuditRequestMonitor() {
    $('#auditrequestmonitortablecreate tbody').html('');
    $("#auditrequestmonitortablecreate").dataTable().fnDestroy();
    $("#auditrequestmonitortablecreate").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    $('#auditrequestmonitortabledetail tbody').html('');
    $("#auditrequestmonitortabledetail").dataTable().fnDestroy();
    $("#auditrequestmonitortabledetail").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

    $('#auditrequestmonitortableedit tbody').html('');
    $("#auditrequestmonitortableedit").dataTable().fnDestroy();
    $("#auditrequestmonitortableedit").DataTable({
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

                    return meta.row + 1;
                }
            },
            {
                "targets": 0,
                "searchable": false,
                "orderable": false
            }],
        "order": [],
        "drawCallback": function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
}
function openView(type, value) {
    //$('#YearAuditWorkCreate').val(null).trigger('change');
    //$('#AuditWorkCreate').val(null).trigger('change');
    //$('#AuditfacilityCreate').val(null).trigger('change');
    //$('#AuditProcessCreate').val(null).trigger('change');
    //$('#YearAuditWorkCreate').html('');
    //$('#AuditWorkCreate').html('');
    //$('#AuditfacilityCreate').html('');
    //$('#AuditProcessCreate').html('');

    //$('#YearAuditWorkEdit').val(null).trigger('change');
    //$('#AuditWorkEdit').val(null).trigger('change');
    //$('#AuditfacilityEdit').val(null).trigger('change');
    //$('#AuditProcessEdit').val(null).trigger('change');
    //$('#YearAuditWorkEdit').html('');
    //$('#AuditWorkEdit').html('');
    //$('#AuditfacilityEdit').html('');
    //$('#AuditProcessEdit').html('');

    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var detail = $("#detail");
    var censorship = $("#censorship");
    var sendBrowse = $("#sendBrowse");
    var historyLog = $("#history-log");
    if (type === 0) {
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
        setTimeout(function () {
            onSearch();
        }, 100);
        //loadYearDefault();
    }
    else if (type === 1) {
        $('#YearAuditWork').val(null).trigger('change');
        $('#YearAuditWork').html('');
        clearMsgInvalid();
        setValueYearCreate();
        localStorage.setItem("type", "1");
        notdataTableAuditObserve();
        notdataTableAuditRequestMonitor();
        index.hide();
        //create.show();
        edit.hide();
        detail.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
        loadCategoryCreate(); loadCategoryRatingRiskCreate();
        document.getElementById("formAuditDetectCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
        $("#ClassifyAuditDetectCreate").html('');
        $("#FollowerCreate").html('');
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.privatecode.path,
            apiConfig.api.auditdetect.action.privatecode.method,
            null, 'showfrmCreate', 'msgError');
    }
    else if (type === 2) {
        localStorage.setItem("type", "2");
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
        fnGetDetail(type, value);
        loadCategoryDetail(); loadCategoryRatingRiskDetail();
    }
    else if (type === 3) {
        clearMsgInvalid();
        localStorage.setItem("type", "3");
        //notdataTableAuditObserve();
        //notdataTableAuditRequestMonitor();
        idedit = value;
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        sendBrowse.hide();
        censorship.hide();
        historyLog.hide();
        fnGetDetail(type, value);
        loadCategoryEdit(); loadCategoryRatingRiskEdit();
    }
    else if (type === 4) {
        localStorage.setItem("type", "4");
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        sendBrowse.show();
        censorship.hide();
        historyLog.hide();
        fnGetDetail(type, value);
        loadCategorySendBrowse(); loadCategoryRatingRiskSendBrowse();
    }
    else if (type === 5) {
        localStorage.setItem("type", "5");
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        sendBrowse.hide();
        censorship.show();
        historyLog.hide();
        fnGetDetail(type, value);
        loadCategoryCensorship(); loadCategoryRatingRiskCensorship();
    }
    else if (type === 6) {
        localStorage.setItem("type", "6");
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        sendBrowse.hide();
        censorship.hide();
        historyLog.show();
        onSearchHistoryLog(value);
    }
}
function showfrmCreate(res) {
    //clearMsgInvalid();
    var create = $("#create");
    create.show();
    presentlyHiden();
    $("#formAuditDetectCreate").find("#AuditDetectCodeCreate").val(res.privatecode);
    $("#formAuditDetectCreate").find("#StatusCreate").val(res.statuscreate);
}
function PickCatDetectTypeCreate() {
    $('#CreateUser').val(null).trigger('change');
    $('#CreateUser').html('');
    $('#CreateCatAuditRequest').val(null).trigger('change');
    $('#CreateCatAuditRequest').html('');
    $('#CreateCompleteAt').val(null).trigger('change');
    $('#CreateCompleteAt').html('');
    $('#CreateUnit').val(null).trigger('change');
    $('#CreateUnit').html('');
    $('#CreateCooperateunit').val(null).trigger('change');
    $('#CreateCooperateunit').html('');
    $('#CreateNote').val(null).trigger('change');
    $('#CreateNote').html('');
    $('#CreateContent').val(null).trigger('change');
    $('#CreateContent').html('');
    clearMsgInvalid();
    $("#formCreateAuditRequestMonitor").find("#CreateCatAuditRequest").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateCompleteAt").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateUser").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateUnit").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateCooperateunit").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateNote").val("");
    $("#formCreateAuditRequestMonitor").find("#CreateContent").val("");
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.privatecodeauditrequestmonitor.path,
        apiConfig.api.auditdetect.action.privatecodeauditrequestmonitor.method,
        null, 'showcode', 'msgError');
    LoadUser();
    LoadCatAuditRequest();
    LoadFacility();
    LoadFacilityMutilSelect();
}
function showcode(res) {
    $("#formCreateAuditRequestMonitor").find("#CreateAuditRequestMonitorCode").val(res.privatecode);
}
function fnGetDetail(type, param) {
    //$('#AuditWorkEdit').val(null).trigger('change');
    //$('#AuditfacilityEdit').val(null).trigger('change');
    //$('#AuditProcessEdit').val(null).trigger('change');
    //$('#AuditWorkEdit').html('');
    //$('#AuditfacilityEdit').html('');
    //$('#AuditProcessEdit').html('');
    LoadFollower();
    LoadCatDetectType();
    //setTimeout(function () {
    //    callApi_oneselect("YearAuditWorkEdit", "Chọn năm...", apiConfig.api.host_audit_service,
    //        apiConfig.api.auditplan.controller,
    //        apiConfig.api.auditplan.action.listyearauditwork.path);
    //}, 55);
    var call_back = '';
    if (type === 3) {
        call_back = 'fnEditSuccess';
    }
    else if (type === 2) {
        call_back = 'fnGetDetailSuccess';
    }
    else if (type === 4) {
        call_back = 'fnSendBrowseSuccess';
    }
    else if (type === 5) {
        call_back = 'fnCensorshipSuccess';
    }
    else {
        call_back = 'fnDeleteSuccess';
    }
    //localStorage.removeItem("id");
    //localStorage.removeItem("type");
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.getItem.path + "/" + param,
        apiConfig.api.auditdetect.action.getItem.method,
        null, call_back, 'msgError');
}

//change setvalue year edit
function setValueYearEdit(elment) {
    $('#YearAuditWorkCreate').val(null).trigger('change');
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#YearAuditWorkCreate').html('');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');
    $('#AuditProcessCreate').html('');

    $('#AuditWorkEdit').val(null).trigger('change');
    $('#AuditfacilityEdit').val(null).trigger('change');
    $('#AuditProcessEdit').val(null).trigger('change');
    $('#AuditWorkEdit').html('');
    $('#AuditfacilityEdit').html('');
    $('#AuditProcessEdit').html('');
}
//change setvalue AuditWork edit
function setValueAuditWorkEdit(elment) {
    $('#YearAuditWorkCreate').val(null).trigger('change');
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#YearAuditWorkCreate').html('');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');
    $('#AuditProcessCreate').html('');

    $('#AuditfacilityEdit').val(null).trigger('change');
    $('#AuditProcessEdit').val(null).trigger('change');
    $('#AuditfacilityEdit').html('');
    $('#AuditProcessEdit').html('');
}
//change setvalue AuditProcess edit
function setValueAuditfacilityEdit(elment) {
    $('#YearAuditWorkCreate').val(null).trigger('change');
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#YearAuditWorkCreate').html('');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');
    $('#AuditProcessCreate').html('');

    $('#AuditProcessEdit').val(null).trigger('change');
    $('#AuditProcessEdit').html('');
}

function fnEditSuccess(rspn) {
    selectObserveUpdate.splice(0);
    auditRequestMonitorUpdate.splice(0);
    var frmModify = $("#formAuditDetectEdit");
    presentlyHidenEdit();
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formAuditDetectEdit").clearQueue();
        frmModify.find("#IdEdit").val(data.id);
        localStorage.setItem("id", data.id);
        if (data.str_followers) {
            var _value = data.str_followers;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmModify.find("#FollowerEdit").append(newOption).trigger('change');
        }
        if (data.str_year) {
            var _valueyear = data.str_year;
            var newOptionYear = new Option(_valueyear.split(':')[1], _valueyear.split(':')[0], true, true);
            frmModify.find("#YearAuditWorkEdit").append(newOptionYear).trigger('change');
        }
        if (data.str_auditwork_name) {
            var _valueauditwork = data.str_auditwork_name;
            var newOptionAuditWork = new Option(_valueauditwork.split(':')[1], _valueauditwork.split(':')[0], true, true);
            frmModify.find("#AuditWorkEdit").append(newOptionAuditWork).trigger('change');
        } else {
            frmSendBrowse.find("#AuditWorkEdit").append(null).trigger('change');
        }
        if (data.str_auditfacilities_name) {
            var _valuesauditfacilities = data.str_auditfacilities_name;
            var newOptionAuditfacility = new Option(_valuesauditfacilities.split(':')[1], _valuesauditfacilities.split(':')[0], true, true);
            frmModify.find("#AuditfacilityEdit").append(newOptionAuditfacility).trigger('change');
        } else {
            frmSendBrowse.find("#AuditfacilityEdit").append(null).trigger('change');
        }
        if (data.str_auditprocess_name) {
            var _valueauditprocess = data.str_auditprocess_name;
            var newOptionAuditProcess = new Option(_valueauditprocess.split(':')[1], _valueauditprocess.split(':')[0], true, true);
            frmModify.find("#AuditProcessEdit").append(newOptionAuditProcess).trigger('change');
        } else {
            frmSendBrowse.find("#AuditProcessEdit").append(null).trigger('change');
        }
        if (data.str_classify_audit_detect) {
            var _value = data.str_classify_audit_detect;
            var newOptionClassifyAuditDetectEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmModify.find("#ClassifyAuditDetectEdit").append(newOptionClassifyAuditDetectEdit).trigger('change');
        }
        frmModify.find("#AuditDetectCodeEdit").val(data.code);
        frmModify.find("#StatusEdit").val(data.statusName);
        frmModify.find("#WorkingPaperCodeEdit").val(data.working_paper_code);

        //table quan sát
        var tbBody = $('#auditdetecttable tbody');
        $("#auditdetecttable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditobserve !== undefined && data.listauditobserve !== null && data.listauditobserve.length > 0) {
            var data_ = data.listauditobserve;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                selectObserveUpdate.push(obj.id);
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="UncheckedAuditObserve(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
            hideLoading();
        } else if (data.listauditobserve == undefined || data.listauditobserve == null || data.listauditobserve.length == 0) {
            notdataTableAuditObserve();
        }

        frmModify.find("#TitleEdit").val(data.title);
        frmModify.find("#ShortTitleEdit").val(data.short_title);
        frmModify.find("#DescriptionEdit").val(data.description);
        frmModify.find("#EvidenceEdit").val(data.evidence);
        frmModify.find("#EvidenceEdit").val(data.evidence);
        //frmModify.find("#fileNameEdit").text(data.filename);
        frmModify.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += "<div>";
                _append_data += '<a href="javascript:DownloadFileAuditDetect(' + obj.id + ');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefile(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += "</div>";
            }
            frmModify.find("#FileDetail").append(_append_data);
        }
        //frmModify.find("#PathEdit").val(data.path_audit_detect);
        frmModify.find("#AffectEdit").val(data.affect);
        frmModify.find("#RatingRiskEdit").val(data.rating_risk);
        frmModify.find("#AdminFrameworkAuditDetectEdit").val(data.admin_framework);
        frmModify.find("#CauseEdit").val(data.cause);
        if (data.audit_report == true)
            frmModify.find("#AuditReportEdit").attr('checked', true);
        //frmModify.find("#AuditReportEdit").val(data.audit_report);

        frmModify.find("#SummaryAuditDetectEdit").val(data.summary_audit_detect);
        if (data.opinion_audit == true) {
            frmModify.find(':radio[name=OpinionAuditEdit][value="1"]').prop('checked', true);
        } else {
            frmModify.find(':radio[name=OpinionAuditEdit][value="2"]').prop('checked', true);
        }
        presentlyHidenEdit();
        frmModify.find("#ReasonEdit").val(data.reason);
        //table kiến nghị
        $("#auditrequestmonitortableedit").dataTable().fnDestroy();
        $('#auditrequestmonitortableedit tbody').html('');
        if (data.listauditrequestmonitor !== undefined && data.listauditrequestmonitor !== null && data.listauditrequestmonitor.length > 0) {
            var data_ = data.listauditrequestmonitor;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                auditRequestMonitorUpdate.push(obj.id);
                var html = '<tr>' +
                    '<td>' + obj.code + '</td>' +
                    '<td>' + obj.content + '</td>' +
                    '<td>' + obj.auditrequesttype_name + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td>' + obj.unit_name + '</td>' +
                    '<td>' + obj.cooperateunit_name + '</td>' +
                    '<td>' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" data-toggle="modal" data-target="#modalDetailAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="DetailAuditRequestMonitor(' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    '<a type="button" data-toggle="modal" data-target="#modalEditAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="EditlAuditRequestMonitor(' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor(\'' + obj.code + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                $('#auditrequestmonitortableedit tbody').append(html);
            }
            hideLoading();
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitor();
        }
    }
}
function fnGetDetailSuccess(rspn) {
    var frmDetail = $("#formAuditDetectDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formAuditDetectDetail").clearQueue();
        frmDetail.find("#IdDetail").val(data.id);
        localStorage.setItem("id", data.id);
        if (data.str_followers) {
            var _value = data.str_followers;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#FollowerEdit").append(newOption).trigger('change');
        }
        if (data.str_year) {
            var _valueyear = data.str_year;
            var newOptionYear = new Option(_valueyear.split(':')[1], _valueyear.split(':')[0], true, true);
            frmDetail.find("#YearAuditWorkEdit").append(newOptionYear).trigger('change');
        }
        if (data.str_auditwork_name) {
            var _valueauditwork = data.str_auditwork_name;
            var newOptionAuditWork = new Option(_valueauditwork.split(':')[1], _valueauditwork.split(':')[0], true, true);
            frmDetail.find("#AuditWorkEdit").append(newOptionAuditWork).trigger('change');
        }
        if (data.str_auditprocess_name) {
            var _valueauditprocess = data.str_auditprocess_name;
            var newOptionAuditProcess = new Option(_valueauditprocess.split(':')[1], _valueauditprocess.split(':')[0], true, true);
            frmDetail.find("#AuditProcessEdit").append(newOptionAuditProcess).trigger('change');
        }
        if (data.str_auditfacilities_name) {
            var _valuesauditfacilities = data.str_auditfacilities_name;
            var newOptionAuditfacility = new Option(_valuesauditfacilities.split(':')[1], _valuesauditfacilities.split(':')[0], true, true);
            frmDetail.find("#AuditfacilityEdit").append(newOptionAuditfacility).trigger('change');
        }
        if (data.str_classify_audit_detect) {
            var _value = data.str_classify_audit_detect;
            var newOptionClassifyAuditDetectEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#ClassifyAuditDetectEdit").append(newOptionClassifyAuditDetectEdit).trigger('change');
        }
        frmDetail.find("#AuditDetectCodeDetail").val(data.code);
        frmDetail.find("#StatusDetail").val(data.statusName);
        frmDetail.find("#WorkingPaperCodeDetail").val(data.working_paper_code);

        //table quan sát
        var tbBody = $('#auditdetecttabledetail tbody');
        $("#auditdetecttabledetail").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditobserve !== undefined && data.listauditobserve !== null && data.listauditobserve.length != 0) {
            var data_ = data.listauditobserve;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditobserve == undefined || data.listauditobserve == null || data.listauditobserve.length == 0) {
            notdataTableAuditObserve();
        }

        frmDetail.find("#TitleDetail").val(data.title);
        frmDetail.find("#ShortTitleDetail").val(data.short_title);
        frmDetail.find("#DescriptionDetail").val(data.description);
        frmDetail.find("#EvidenceDetail").val(data.evidence);
        //frmDetail.find("#FileNameDetail").text(data.filename);
        frmDetail.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileAuditDetect(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#FileDetail").append(_append_data);
        }
        frmDetail.find("#AffectDetail").val(data.affect);
        frmDetail.find("#RatingRiskDetail").val(data.rating_risk);
        frmDetail.find("#AdminFrameworkAuditDetectDetail").val(data.admin_framework);
        frmDetail.find("#CauseDetail").val(data.cause);
        if (data.audit_report == true)
            frmDetail.find("#AuditReportDetail").attr('checked', true);
        //frmDetail.find("#AuditReportEdit").val(data.audit_report);

        frmDetail.find("#SummaryAuditDetectDetail").val(data.summary_audit_detect);
        if (data.opinion_audit == true) {
            frmDetail.find(':radio[name=OpinionAuditDetail][value="1"]').prop('checked', true);
        } else {
            frmDetail.find(':radio[name=OpinionAuditDetail][value="2"]').prop('checked', true);
        }
        frmDetail.find("#ReasonDetail").val(data.reason);
        //table kiến nghị
        $("#auditrequestmonitortabledetail").dataTable().fnDestroy();
        $('#auditrequestmonitortabledetail tbody').html('');
        if (data.listauditrequestmonitor !== undefined && data.listauditrequestmonitor !== null && data.listauditrequestmonitor.length != 0) {
            var data_ = data.listauditrequestmonitor;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.code + '</td>' +
                    '<td>' + obj.content + '</td>' +
                    '<td>' + obj.auditrequesttype_name + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td>' + obj.unit_name + '</td>' +
                    '<td>' + obj.cooperateunit_name + '</td>' +
                    '<td>' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    //'<td class="col-action">' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewDetail()"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewUpdate()"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor()"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    //'</td>' +
                    '</tr>';
                $('#auditrequestmonitortabledetail tbody').append(html);
            }
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitor();
        }
    }
}

function UncheckedAuditObserve(name, id) {
    var _name = String(name);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa quan sát kiểm toán này" + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            var typeLS = localStorage.getItem('type');
            if (typeLS == 3) {
                callApi_auditservice(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.unchecked.path + "/" + id,
                    apiConfig.api.auditdetect.action.unchecked.method,
                    null, 'fnUncheckedAuditObserve', 'msgError');
            } else if (typeLS == 1) {
                var index = selectObserve.indexOf(id);
                if (index != -1) {
                    selectObserve.splice(index, 1);
                }
                callApi_auditservice(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.unchecked.path + "/" + id,
                    apiConfig.api.auditdetect.action.unchecked.method,
                    null, 'fnUncheckedAuditObserveCreate', 'msgError');
            }
        }
    });
}

function fnUncheckedAuditObserve(data) {
    if (data.code === '1') {
        createdLog("Phát hiện kiểm toán", "Xóa quan sát liên quan");
        //swal("Thông báo!", "Xóa quan sát kiểm toán liên quan thành công!", "success");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        setTimeout(function () {
            openView(3, $('#IdEdit').val());
        }, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
        //swal("Error!", "Xóa quan sát kiểm toán liên quan thất bại!", "error");
    }
}

function fnUncheckedAuditObserveCreate(res) {
    showLoading();
    setTimeout(function () {
        createdLog("Phát hiện kiểm toán", "Xóa quan sát liên quan");
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
    }, 80);
    $('#auditdetecttablecreate tbody').html('');
    $("#auditdetecttablecreate").dataTable().fnDestroy();
    if (res.code === '1' && res.data.length != 0) {
        for (var i = 0; i < res.data.length; i++) {
            var obj = res.data[i];
            var index = arrWorkingPaperCode.indexOf(obj.working_paper_code);
            if (index == -1) {
                arrWorkingPaperCode.push(obj.working_paper_code);
            }
            var html = '<tr>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.description + '</td>' +
                '<td>' + obj.working_paper_code + '</td>' +
                '<td class="text-center col-action">' +
                '<a type="button" class="btn icon-delete btn-action-custom" onclick="UncheckedAuditObserve(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            $('#auditdetecttablecreate tbody').append(html);
        }
        let strWorkingPaperCode = arrWorkingPaperCode.join(", ");
        $("#formAuditDetectCreate").find("#WorkingPaperCodeCreate").val(strWorkingPaperCode);
        //swal("Thông báo!", "Xóa quan sát kiểm toán liên quan thành công!", "success");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        hideLoading();
    } else if (res.data.length == 0) {
        notdataTableAuditObserve();
    }
    else {
        //swal("Error!", "Xóa quan sát kiểm toán liên quan thất bại!", "error");
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
window.onload = function () {
    //$('#YearAuditWork').val(null).trigger('change');
    //$('#AuditWork').val(null).trigger('change');
    //$('#AuditProcess').val(null).trigger('change');
    //$('#Auditfacility').val(null).trigger('change');

    //LoadYearAuditWork();
    LoadAuditWork();
    LoadAuditfacility();
    LoadAuditProcess();
    loadYearDefault();
}

function DeleteDetect(id) {
    fnGetDetail(null, id);
}
function fnDeleteSuccess(rspn) {
    var data = rspn.data;
    swal({
        title: "Thông báo",
        text: 'Bạn có chắc chắn muốn xoá bản ghi' + ' ' + '"' + data.code + '"',
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteDetect(data.id);
            createdLog("Phát hiện kiểm toán", "Xóa phát hiện kiểm toán");
        }
    });
}

function fnDeleteDetect(id) {
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.deletedetect.path + "/" + id,
        apiConfig.api.auditdetect.action.deletedetect.method,
        null, 'fnDeleteDetectSuccess', 'msgError');
}
function fnDeleteDetectSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }

}
//change setvalue year create
function setValueYearCreate(elment) {
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');
    $('#AuditProcessCreate').html('');

    //$('#YearAuditWorkEdit').val(null).trigger('change');
    //$('#AuditWorkEdit').val(null).trigger('change');
    //$('#AuditfacilityEdit').val(null).trigger('change');
    //$('#AuditProcessEdit').val(null).trigger('change');
    //$('#YearAuditWorkEdit').html('');
    //$('#AuditWorkEdit').html('');
    //$('#AuditfacilityEdit').html('');
    //$('#AuditProcessEdit').html('');
}
//change setvalue AuditWork edit
function setValueAuditWorkCreate(elment) {

    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').html('');
    $('#AuditProcessCreate').html('');

    //$('#AuditWorkEdit').val(null).trigger('change');
    //$('#AuditfacilityEdit').val(null).trigger('change');
    //$('#AuditProcessEdit').val(null).trigger('change');
    //$('#AuditWorkEdit').html('');
    //$('#AuditfacilityEdit').html('');
    //$('#AuditProcessEdit').html('');
}
//change setvalue AuditProcess edit
function setValueAuditfacilityCreate(elment) {
    $('#AuditProcessCreate').val(null).trigger('change');
    $('#AuditProcessCreate').html('');

    //$('#AuditfacilityEdit').val(null).trigger('change');
    //$('#AuditProcessEdit').val(null).trigger('change');
    //$('#AuditfacilityEdit').html('');
    //$('#AuditProcessEdit').html('');
}

function presentlyHiden() {
    var isReason = $('#OpinionAuditCreateTrue:checked').val() != undefined ? true : false;
    var _reason = $("#formAuditDetectCreate #presentlyReason");
    _reason.html('');
    /*if (isReason == false) {*/
        $('#presentlyReason').show();
        var html =
            '<div class="form-group row">' +
            '<label class="col-form-label col-lg-2" for="ReasonCreate">' +
            "Ý kiến" +
            '<span class="text-danger">' + "*" + '</span>' +
            '</label>' +
            '<div class="col-lg-10">' +
            '<textarea type="text" class="form-control required" id="ReasonCreate" name="ReasonCreate">' +
            '</textarea>' +
            '</div>' +
            '</div>';
        _reason.append(html);
    //} else {
    //    $('#presentlyReason').hide();
    //    _reason.html('');
    //}
}
function presentlyHidenEdit() {
    var isReasonEdit = $('#OpinionAuditEditTrue:checked').val() != undefined ? true : false;
    var _reason = $("#formAuditDetectEdit #presentlyReasonEdit");
    _reason.html('');
    //if (isReasonEdit == false) {
        $('#presentlyReasonEdit').show();
        var html =
            '<div class="form-group row">' +
            '<label class="col-form-label col-lg-2" for="ReasonEdit">' +
            "Ý kiến" +
            '<span class="text-danger">' + "*" + '</span>' +
            '</label>' +
            '<div class="col-lg-10">' +
            '<textarea type="text" class="form-control required" id="ReasonEdit" name="ReasonEdit">' +
            '</textarea>' +
            '</div>' +
            '</div>';
        _reason.append(html);
    //} else {
    //    $('#presentlyReasonEdit').hide();
    //    _reason.html('');
    //}
}
//thêm mới
function submitCreate() {
    if (selectObserve.length <= 0) {
        toastr.error("Vui lòng chọn quan sát", "Thông báo!", { progressBar: true });
    } else if (auditRequestMonitor.length <= 0) {
        toastr.error("Vui lòng chọn kiến nghị", "Thông báo!", { progressBar: true });
    } else {
        var opt = $('#OpinionAuditCreateTrue:checked').val() != undefined ? true : false;
        var obj = {
            'year': $('#YearAuditWorkCreate').val(),
            'auditwork_id': $('#AuditWorkCreate').val(),
            'auditfacilities_id': $('#AuditfacilityCreate').val(),
            'auditprocess_id': $('#AuditProcessCreate').val(),
            //'status': $('#StatusCreate').val(),
            'title': $('#TitleCreate').val().trim(),
            'short_title': $('#ShortTitleCreate').val().trim(),
            'description': $('#DescriptionCreate').val().trim(),
            'evidence': $('#EvidenceCreate').val().trim(),
            'affect': $('#AffectCreate').val().trim(),
            'rating_risk': $('#RatingRiskCreate').val(),
            'admin_framework': $('#AdminFrameworkAuditDetectCreate').val(),
            'cause': $('#CauseCreate').val().trim(),
            'audit_report': $('#AuditReportCreate:checked').val() != undefined ? true : false,
            'classify_audit_detect': $('#ClassifyAuditDetectCreate').val(),
            'summary_audit_detect': $('#SummaryAuditDetectCreate').val().trim(),
            'followers': $('#FollowerCreate').val(),
            'opinion_audit': $('#OpinionAuditCreateTrue:checked').val() != undefined ? true : false,
            'reason': /*opt == true ? null :*/ $('#ReasonCreate').val().trim(),
            //'name': $('#NameAuditDetectCreate').val().trim(),
        }
        var check = false;
        var formData = new FormData();
        formData.append("data", JSON.stringify(obj));
        var input = document.getElementById('PathCreate');
        var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip", "eml", "msg",];
        if (input.files) {

            $.each(input.files, function (i, v) {
                var imageFile = v;
                var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (checkFilesize(imageFile) == true) {
                    toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                formData.append("fileUpload[" + i + "]", imageFile);
            })
        }
        if (validateRequired('#formAuditDetectCreate')) {
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.createauditdetect.path,
                    formData, 'createAuditDetectSuccess', 'msgError');
            }
        }

    }
}
function createAuditDetectSuccess(data) {
    if (data.code === '1') {
        auditRequestMonitor.splice(0);
        selectObserve.splice(0);
        createdLog("Phát hiện kiểm toán", "Tạo mới phát hiện kiểm toán");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        setTimeout(function () {
            window.location.href = "/AuditDetect"
        }, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
//tim kiem modal Observe
function submitPick(plag) {
    $("#checkAllAuditObserve").prop('checked', false);
    var typeLS = localStorage.getItem('type');
    if (plag == 1) {
        $('#Discoverer').val(null).trigger('change');
        $('#Discoverer').html('');
        $("#AuditObserveName").val("");
        $("#WorkingPaperCodeObserve").val("");
    }
    //setTimeout(function () {
    //    callApi_multipleselect_discoverer("Discoverer", "Chọn người phát hiện...",
    //        apiConfig.api.host_user_service,
    //        apiConfig.api.systemuser.controller,
    //        apiConfig.api.systemuser.action.selectaudiWork.path);
    //}, 50);
    if (typeLS == 1) {
        var obj = {
            'year': ($('#YearAuditWorkCreate').val() != null ? parseInt($('#YearAuditWorkCreate').val()) : $('#YearAuditWorkCreate').val()),
            'auditwork_id': ($('#AuditWorkCreate').val() != null ? parseInt($('#AuditWorkCreate').val()) : $('#AuditWorkCreate').val()),
            'discoverer': parseInt($('#Discoverer').val()),
            'auditfacilities_id': parseInt($('#AuditfacilityCreate').val()),
            'auditprocess_id': parseInt($('#AuditProcessCreate').val()),
            'name': $('#AuditObserveName').val().trim(),
            'working_paper_code': $('#WorkingPaperCodeObserve').val().trim(),
        }
    } else if (typeLS == 3) {
        var obj = {
            'year': ($('#YearAuditWorkEdit').val() != null ? parseInt($('#YearAuditWorkEdit').val()) : $('#YearAuditWorkEdit').val()),
            'auditwork_id': ($('#AuditWorkEdit').val() != null ? parseInt($('#AuditWorkEdit').val()) : $('#AuditWorkEdit').val()),
            'auditfacilities_id': parseInt($('#AuditfacilityEdit').val()),
            'auditprocess_id': parseInt($('#AuditProcessEdit').val()),
            'discoverer': parseInt($('#Discoverer').val()),
            'name': $('#AuditObserveName').val().trim(),
            'working_paper_code': $('#WorkingPaperCodeObserve').val().trim(),
        }
    }
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.searchmodalobserve.path,
        apiConfig.api.auditdetect.action.searchmodalobserve.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchModalObserveSuccess', 'msgError');
}

function fnSearchModalObserveSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        $('#tblAuditObserve tbody').html('');
        var strHtml = '';
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];

            strHtml += '<tr>' +
                '<td class="text-center"><input type="checkbox" class="checkitem" name="checkitem" value="' + obj.id + '"></td>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + obj.code + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.discoverer_name + '</td>' +
                '<td>' + obj.working_paper_code + '</td>' +
                '</tr>';
        }
        $('#tblAuditObserve tbody').append(strHtml);
    } else {
        $('#tblAuditObserve tbody').html('');
    }

}
$("#checkAllAuditObserve").click(function () {
    $('.checkitem').not(this).prop('checked', this.checked);
});

var selectObserve = [];
var selectObserveUpdate = [];
function onSelectObserve() {
    var _objList = $('input[class="checkitem"]:checked').map((_, el) => el.value).get();
    var obj = {
        'listID': _objList.join()
    }
    var typeLS = localStorage.getItem('type');
    if (typeLS == 1) {
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.chooseobserve.path,
            apiConfig.api.auditdetect.action.chooseobserve.method,
            obj, 'onSelectObserveSuccess', 'msgError');
    } else if (typeLS == 3) {
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.chooseobserveupdate.path + "/" + idedit,
            apiConfig.api.auditdetect.action.chooseobserveupdate.method,
            obj, 'onSelectObserveSuccess', 'msgError');
    }
}
var arrWorkingPaperCode = [];
var arrWorkingDescription = [];
function onSelectObserveSuccess(rs) {
    $('#modalSelectAuditObserve').modal('hide');

    var typeLS = localStorage.getItem('type');
    if (typeLS == 1) {
        if (rs !== undefined && rs !== null && rs.code === '1' && rs.total > 0) {
            var data = rs.data;
            createdLog("Phát hiện kiểm toán", "Chọn quan sát liên quan");
            $("#auditdetecttablecreate").dataTable().fnDestroy();
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                selectObserve.push(obj.id);
                var index = arrWorkingPaperCode.indexOf(obj.working_paper_code);
                if (index == -1) {
                    arrWorkingPaperCode.push(obj.working_paper_code);
                }
                var indexDescription = arrWorkingDescription.indexOf(obj.description);
                if (indexDescription == -1) {
                    arrWorkingDescription.push(obj.description);
                }
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + (obj.working_paper_code != null ? obj.working_paper_code : "") + '</td>' +
                    '<td class="text-center col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="UncheckedAuditObserve(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                $('#auditdetecttablecreate tbody').append(html);
            }
            let strWorkingPaperCode = arrWorkingPaperCode.join(", ");
            $("#formAuditDetectCreate").find("#WorkingPaperCodeCreate").val(strWorkingPaperCode);
            let strWorkingDescription = arrWorkingDescription.join(", ");
            $("#formAuditDetectCreate").find("#DescriptionCreate").val(strWorkingDescription);
        } else if (rs.total == 0) {
            //$('#auditdetecttablecreate tbody').html('');
            //$("#auditdetecttablecreate").dataTable().fnDestroy();
            notdataTableAuditObserve();
        }
    } else if (typeLS == 3) {
        if (rs !== undefined && rs !== null && rs.code === '1' && rs.total > 0) {
            var data_ = rs.data;
            createdLog("Phát hiện kiểm toán", "Chọn quan sát liên quan");
            $("#auditdetecttable").dataTable().fnDestroy();
            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                selectObserveUpdate.push(obj.id);
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="UncheckedAuditObserve(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                $('#auditdetecttable tbody').append(html);
            }
            hideLoading();
        } else if (rs.total == 0) {
            //$('#auditdetecttable tbody').html('');
            //$("#auditdetecttable").dataTable().fnDestroy();
            notdataTableAuditObserve();
        }
    }

}

//thêm mới kiến nghị
var auditRequestMonitor = [];
var auditRequestMonitorUpdate = [];
function submitCreateAuditRequestMonitor() {
    var typeLS = localStorage.getItem('type');
    if (typeLS == 1) {
        var obj = {
            'id': 0,
            'content': $('#CreateContent').val().trim(),
            'audit_request_type_id': $('#CreateCatAuditRequest').val(),
            'complete_at': $('#CreateCompleteAt').val(),
            'user_id': $('#CreateUser').val(),
            'unit_id': $('#CreateUnit').val(),
            'cooperateunit_id': $('#CreateCooperateunit').val(),
            'note': $('#CreateNote').val().trim(),
        }
    } else if (typeLS == 3) {
        var obj = {
            'id': $('#IdEdit').val(),
            'content': $('#CreateContent').val().trim(),
            'audit_request_type_id': $('#CreateCatAuditRequest').val(),
            'complete_at': $('#CreateCompleteAt').val(),
            'user_id': $('#CreateUser').val(),
            'unit_id': $('#CreateUnit').val(),
            'cooperateunit_id': $('#CreateCooperateunit').val(),
            'note': $('#CreateNote').val().trim(),
        }
    }
    if (validateRequired('#formCreateAuditRequestMonitor')) {
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.createauditrequestmonitor.path,
            apiConfig.api.auditdetect.action.createauditrequestmonitor.method,
            obj, 'CreateAuditRequestMonitorSuccess', 'msgError');
    }
}
function CreateAuditRequestMonitorSuccess(rs) {
    auditRequestMonitor.push(rs.idAuditRequestMonitor);
    auditRequestMonitorUpdate.push(rs.idAuditRequestMonitor);
    var typeLS = localStorage.getItem('type');
    $('#modalCreateAuditRequestMonitor').modal('hide');
    if (rs.idAuditRequestMonitor != null || rs.idAuditRequestMonitor != undefined) {
        createdLog("Phát hiện kiểm toán", "Thêm mới kiến nghị kiểm toán");
        //swal("Thông báo!", "Thêm mới dữ liệu thành công!", "success");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        if (typeLS == 1) {
            callApi_auditservice(
                apiConfig.api.auditdetect.controller,
                apiConfig.api.auditdetect.action.detailauditrequestmonitor.path + "/" + rs.idAuditRequestMonitor,
                apiConfig.api.auditdetect.action.detailauditrequestmonitor.method,
                null, 'showTableAuditRequestMonitor', 'msgError');
        } else if (typeLS == 3) {
            setTimeout(function () {
                openView(3, $('#IdEdit').val());
            }, 2000);
        }
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 50);
    }
}
function showTableAuditRequestMonitor(rs) {
    //var typeLS = localStorage.getItem('type');
    //if (typeLS == 1) {
    //$('#auditrequestmonitortablecreate tbody').html('');
    $("#auditrequestmonitortablecreate").dataTable().fnDestroy();
    if (rs !== undefined && rs !== null && rs.code === '1') {
        //for (var i = 0; i < 1; i++) {
        var html = '<tr>' +
            '<td>' + rs.data.code + '</td>' +
            '<td>' + rs.data.content + '</td>' +
            '<td>' + rs.data.audit_request_type_name + '</td>' +
            '<td>' + rs.data.responsible_person + '</td>' +
            '<td>' + rs.data.unit_name + '</td>' +
            '<td>' + rs.data.cooperateunit_name + '</td>' +
            '<td>' + (rs.data.complete_at == null ? "" : rs.data.complete_at) + '</td>' +
            '<td class="text-center col-action">' +
            '<a type="button" data-toggle="modal" data-target="#modalDetailAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="DetailAuditRequestMonitor(' + rs.data.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
            '<a type="button" data-toggle="modal" data-target="#modalEditAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="EditlAuditRequestMonitor(' + rs.data.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
            '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor(\'' + rs.data.code + '\',' + rs.data.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
            '</td>' +
            '</tr>';
        $('#auditrequestmonitortablecreate tbody').append(html);
        //}
    }
    //} else if (typeLS == 3) {
    //    if (rs !== undefined && rs !== null && rs.code === '1' && rs.total > 0) {
    //        var data_ = rs.data;
    //        for (var i = 0; i < data_.length; i++) {
    //            var obj = data_[i];
    //            var html = '<tr>' +
    //                '<td>' + obj.name + '</td>' +
    //                '<td>' + obj.description + '</td>' +
    //                '<td>' + obj.working_paper_code + '</td>' +
    //                '<td class="col-action">' +
    //                '<a type="button" class="btn icon-delete btn-action-custom" onclick="UncheckedAuditObserve(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
    //                '</td>' +
    //                '</tr>';
    //            $('#auditdetecttable tbody').append(html);
    //        }
    //        hideLoading();
    //    }
    //}
}
function DetailAuditRequestMonitor(id) {
    LoadFacilityDetailMutilSelect();
    $("#formDetailAuditRequestMonitor").find("#DetailAuditRequestMonitorCode").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailCatAuditRequest").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailUser").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailUnit").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailCooperateunit").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailCompleteAt").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailNote").val("");
    $("#formDetailAuditRequestMonitor").find("#DetailContent").val("");
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.detailauditrequestmonitor.path + "/" + id,
        apiConfig.api.auditdetect.action.detailauditrequestmonitor.method,
        null, 'DetailAuditRequestMonitorSuccess', 'msgError');
}
function DetailAuditRequestMonitorSuccess(rs) {
    if (rs !== undefined && rs !== null && rs.code === '1') {
        var data = rs.data;

        $("#formDetailAuditRequestMonitor").find("#IdDetailAuditRequestMonitor").val(data.id);
        $("#formDetailAuditRequestMonitor").find("#DetailAuditRequestMonitorCode").val(data.code);
        if (data.str_audit_request_type_id) {
            var value_str_audit_request_type = data.str_audit_request_type_id;
            var newOption = new Option(value_str_audit_request_type.split(':')[1], value_str_audit_request_type.split(':')[0], true, true);
            $("#formDetailAuditRequestMonitor").find("#DetailCatAuditRequest").append(newOption).trigger('change');
        }
        if (data.str_user_name) {
            var value_str_user_name = data.str_user_name;
            var newOptionUser = new Option(value_str_user_name.split(':')[1], value_str_user_name.split(':')[0], true, true);
            $("#formDetailAuditRequestMonitor").find("#DetailUser").append(newOptionUser).trigger('change');
        }
        if (data.str_unit_name) {
            var value_str_unit_name = data.str_unit_name;
            var newOptionUnit = new Option(value_str_unit_name.split(':')[1], value_str_unit_name.split(':')[0], true, true);
            $("#formDetailAuditRequestMonitor").find("#DetailUnit").append(newOptionUnit).trigger('change');
        }
        var _list = data.str_cooperateunit_name;
        if (_list) {
            var arr_data = _list.split(', ');
            if (arr_data.length > 0) {
                $(arr_data).each(function () {
                    var newOptionCooperateunit = new Option(this.split(':')[1], this.split(':')[0], true, true);
                    $("#formDetailAuditRequestMonitor").find("#DetailCooperateunit").append(newOptionCooperateunit).trigger('change');
                });
            }
        }
        $("#formDetailAuditRequestMonitor").find("#DetailCompleteAt").val(data.complete_at);
        $("#formDetailAuditRequestMonitor").find("#DetailNote").val(data.note);
        $("#formDetailAuditRequestMonitor").find("#DetailContent").val(data.content);
    }
}
function EditlAuditRequestMonitor(id) {
    var typeLS = localStorage.getItem('type');
    LoadFacilityEdit();
    LoadFacilityEditMutilSelect();
    $("#formEditAuditRequestMonitor").find("#EditAuditRequestMonitorCode").val("");
    $("#formEditAuditRequestMonitor").find("#EditCatAuditRequest").val("");
    $("#formEditAuditRequestMonitor").find("#EditUser").val("");
    $("#formEditAuditRequestMonitor").find("#EditUnit").val("");
    $("#formEditAuditRequestMonitor").find("#EditCooperateunit").val("");
    $('#EditCooperateunit').val(null).trigger('change');
    $('#EditCooperateunit').html('');
    $("#formEditAuditRequestMonitor").find("#EditCompleteAt").val("");
    $("#formEditAuditRequestMonitor").find("#EditContent").val("");
    $("#formEditAuditRequestMonitor").find("#DetailContent").val("");
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.detailauditrequestmonitor.path + "/" + id,
        apiConfig.api.auditdetect.action.detailauditrequestmonitor.method,
        null, 'EditAuditRequestMonitorSuccess', 'msgError');

}
function EditAuditRequestMonitorSuccess(rs) {
    if (rs !== undefined && rs !== null && rs.code === '1') {
        var data = rs.data;

        $("#formEditAuditRequestMonitor").find("#IdEditAuditRequestMonitor").val(data.id);
        $("#formEditAuditRequestMonitor").find("#EditAuditRequestMonitorCode").val(data.code);
        if (data.str_audit_request_type_id) {
            var value_str_audit_request_type = data.str_audit_request_type_id;
            var newOption = new Option(value_str_audit_request_type.split(':')[1], value_str_audit_request_type.split(':')[0], true, true);
            $("#formEditAuditRequestMonitor").find("#EditCatAuditRequest").append(newOption).trigger('change');
        }
        if (data.str_unit_name) {
            var value_str_unit_name = data.str_unit_name;
            var newOptionUnit = new Option(value_str_unit_name.split(':')[1], value_str_unit_name.split(':')[0], true, true);
            $("#formEditAuditRequestMonitor").find("#EditUnit").append(newOptionUnit).trigger('change');
        }
        if (data.str_user_name) {
            var value_str_user_name = data.str_user_name;
            var newOptionUser = new Option(value_str_user_name.split(':')[1], value_str_user_name.split(':')[0], true, true);
            $("#formEditAuditRequestMonitor").find("#EditUser").append(newOptionUser).trigger('change');
        }
        var _list = data.str_cooperateunit_name;
        if (_list) {
            var arr_data = _list.split(', ');
            if (arr_data.length > 0) {
                $(arr_data).each(function () {
                    var newOptionCooperateunit = new Option(this.split(':')[1], this.split(':')[0], true, true);
                    $("#formEditAuditRequestMonitor").find("#EditCooperateunit").append(newOptionCooperateunit).trigger('change');
                });
            }
        }
        $("#formEditAuditRequestMonitor").find("#EditCompleteAt").val(data.complete_at);
        $("#formEditAuditRequestMonitor").find("#EditNote").val(data.note);
        $("#formEditAuditRequestMonitor").find("#EditContent").val(data.content);
    }
}
function submitEditAuditRequestMonitor() {
    var obj = {
        'id': $('#IdEditAuditRequestMonitor').val(),
        'content': $('#EditContent').val().trim(),
        'audit_request_type_id': $('#EditCatAuditRequest').val(),
        'complete_at': $('#EditCompleteAt').val() != "" ? $('#EditCompleteAt').val() : null,
        'user_id': $('#EditUser').val(),
        'unit_id': $('#EditUnit').val(),
        'cooperateunit_id': $('#EditCooperateunit').val(),
        'note': $('#EditNote').val().trim(),
    }
    if (validateRequired('#formEditAuditRequestMonitor')) {
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.editauditrequestmonitor.path,
            apiConfig.api.auditdetect.action.editauditrequestmonitor.method,
            obj, 'SubmitEditAuditRequestMonitorSuccess', 'msgError');
    }
}
function SubmitEditAuditRequestMonitorSuccess(data) {
    $('#modalEditAuditRequestMonitor').modal('hide');
    if (data.code === '1') {
        createdLog("Phát hiện kiểm toán", "Cập nhật kiến nghị kiểm toán");
        //swal("Thông báo!", "Cập nhật dữ liệu thành công!", "success");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        //localStorage.removeItem("type");
        //setTimeout(function () {
        //    openView(3, $('#IdEdit').val());
        //}, 2000);
        var typeLS = localStorage.getItem('type');
        if (typeLS == 1) {
            callApi_auditservice(
                apiConfig.api.auditdetect.controller,
                apiConfig.api.auditdetect.action.listauditrequestmonitorcreateauditdetect.path,
                apiConfig.api.auditdetect.action.listauditrequestmonitorcreateauditdetect.method,
                null, 'showTableAuditRequestMonitorUpdate', 'msgError');
        }
        else if (typeLS == 3) {
            setTimeout(function () {
                openView(3, $('#IdEdit').val());
            }, 2000);
        }
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 50);
    }
}

function showTableAuditRequestMonitorUpdate(rs) {
    //var typeLS = localStorage.getItem('type');
    //if (typeLS == 1) {
    $('#auditrequestmonitortablecreate tbody').html('');
    $("#auditrequestmonitortablecreate").dataTable().fnDestroy();
    if (rs !== undefined && rs !== null && rs.code === '1') {
        for (var i = 0; i < rs.data.length; i++) {
            var html = '<tr>' +
                '<td>' + rs.data[i].code + '</td>' +
                '<td>' + rs.data[i].content + '</td>' +
                '<td>' + rs.data[i].audit_request_type_name + '</td>' +
                '<td>' + rs.data[i].responsible_person + '</td>' +
                '<td>' + rs.data[i].unit_name + '</td>' +
                '<td>' + rs.data[i].cooperateunit_name + '</td>' +
                '<td>' + (rs.data[i].complete_at == null ? "" : rs.data[i].complete_at) + '</td>' +
                '<td class="text-center col-action">' +
                '<a type="button" data-toggle="modal" data-target="#modalDetailAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="DetailAuditRequestMonitor(' + rs.data[i].id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" data-toggle="modal" data-target="#modalEditAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="EditlAuditRequestMonitor(' + rs.data[i].id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor(\'' + rs.data[i].code + '\',' + rs.data[i].id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                '</td>' +
                '</tr>';
            $('#auditrequestmonitortablecreate tbody').append(html);
        }
    }
}
function DeleteAuditRequestMonitor(code, id) {
    var _code = String(code);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa kiến nghị này" + _code + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            var typeLS = localStorage.getItem('type');
            if (typeLS == 3) {
                callApi_auditservice(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.deleteauditrequestmonitor.path + "/" + id,
                    apiConfig.api.auditdetect.action.deleteauditrequestmonitor.method,
                    null, 'fnDeleteAuditRequestMonitor', 'msgError');
            } else if (typeLS == 1) {
                var index = auditRequestMonitor.indexOf(id);
                if (index != -1) {
                    auditRequestMonitor.splice(index, 1);
                }
                callApi_auditservice(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.deleteauditrequestmonitor.path + "/" + id,
                    apiConfig.api.auditdetect.action.deleteauditrequestmonitor.method,
                    null, 'fnDeleteAuditRequestMonitorCreate', 'msgError');
            }
        }
    });
}


function fnDeleteAuditRequestMonitor(data) {
    if (data.code === '1') {
        createdLog("Phát hiện kiểm toán", "Xóa kiến nghị kiểm toán");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        setTimeout(function () {
            openView(3, $('#IdEdit').val());
        }, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}

function fnDeleteAuditRequestMonitorCreate(res) {
    showLoading();
    setTimeout(function () {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        createdLog("Phát hiện kiểm toán", "Xóa kiến nghị kiểm toán");
    }, 80);
    $('#auditrequestmonitortablecreate tbody').html('');
    $("#auditrequestmonitortablecreate").dataTable().fnDestroy();
    if (res.code === '1' && res.data.length != 0) {
        for (var i = 0; i < res.data.length; i++) {
            callApi_auditservice(
                apiConfig.api.auditdetect.controller,
                apiConfig.api.auditdetect.action.detailauditrequestmonitor.path + "/" + res.data[i].id,
                apiConfig.api.auditdetect.action.detailauditrequestmonitor.method,
                null, 'showTableCreateAuditRequestMonitor', 'msgError');
        }

        hideLoading();
    } else if (res.data.length == 0) {
        notdataTableAuditRequestMonitor();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
function showTableCreateAuditRequestMonitor(rs) {
    if (rs !== undefined && rs !== null && rs.code === '1') {
        var html = '<tr>' +
            '<td>' + rs.data.code + '</td>' +
            '<td>' + rs.data.content + '</td>' +
            '<td>' + rs.data.audit_request_type_name + '</td>' +
            '<td>' + rs.data.responsible_person + '</td>' +
            '<td>' + rs.data.unit_name + '</td>' +
            '<td>' + rs.data.cooperateunit_name + '</td>' +
            '<td>' + rs.data.complete_at + '</td>' +
            '<td class="text-center col-action">' +
            '<a type="button" data-toggle="modal" data-target="#modalDetailAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="DetailAuditRequestMonitor(' + rs.data.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
            '<a type="button" data-toggle="modal" data-target="#modalEditAuditRequestMonitor" class="btn icon-default btn-action-custom" onclick="EditlAuditRequestMonitor(' + rs.data.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
            '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor(\'' + rs.data.code + '\',' + rs.data.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
            '</td>' +
            '</tr>';
        $('#auditrequestmonitortablecreate tbody').append(html);
    }
}
function clearDetectCodeNew() {
    arrWorkingPaperCode.splice(0);
    arrWorkingDescription.splice(0);
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.cleardetectcodenew.path,
        apiConfig.api.auditdetect.action.cleardetectcodenew.method,
        null, '', 'msgError');
    loadYearDefault();
}
function submitEdit() {
    if (selectObserveUpdate.length <= 0) {
        toastr.error("Vui lòng chọn quan sát", "Thông báo!", { progressBar: true });
    } else if (auditRequestMonitorUpdate.length <= 0) {
        toastr.error("Vui lòng chọn kiến nghị", "Thông báo!", { progressBar: true });
    } else {
        var _id = $("#formAuditDetectEdit").find('#IdEdit').val();
        var optEdit = $('#OpinionAuditEditTrue:checked').val() != undefined ? true : false;
        var obj = {
            'id': _id,
            'year': $('#YearAuditWorkEdit').val(),
            'auditwork_id': $('#AuditWorkEdit').val(),
            'auditfacilities_id': $('#AuditfacilityEdit').val(),
            'auditprocess_id': $('#AuditProcessEdit').val(),
            'title': $('#TitleEdit').val().trim(),
            'short_title': $('#ShortTitleEdit').val().trim(),
            'description': $('#DescriptionEdit').val().trim(),
            'evidence': $('#EvidenceEdit').val().trim(),
            'affect': $('#AffectEdit').val().trim(),
            'rating_risk': $('#RatingRiskEdit').val(),
            'admin_framework': $('#AdminFrameworkAuditDetectEdit').val(),
            'cause': $('#CauseEdit').val().trim(),
            'audit_report': $('#AuditReportEdit:checked').val() != undefined ? true : false,
            'classify_audit_detect': $('#ClassifyAuditDetectEdit').val(),
            'summary_audit_detect': $('#SummaryAuditDetectEdit').val().trim(),
            'followers': $('#FollowerEdit').val(),
            'opinion_audit': $('#OpinionAuditEditTrue:checked').val() != undefined ? true : false,
            'reason': /*optEdit == true ? null :*/ $('#ReasonEdit').val().trim(),
        }
        var check = false;
        var formData = new FormData();
        formData.append("data", JSON.stringify(obj));

        var input = document.getElementById('PathEdit');
        var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip", "eml", "msg",];
        if (input.files) {

            $.each(input.files, function (i, v) {
                var imageFile = v;
                var fileType = v.name.substr((v.name.lastIndexOf('.') + 1));
                //if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                //    swal("Error!", "Định dạng file " + fileType + " không được hỗ trợ!", "error");
                //    return false;
                //}
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    toastr.error("Định dạng file " + fileType + " không được hỗ trợ!", "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                if (checkFilesize(imageFile) == true) {
                    toastr.error("Dung lương file cho phép là " + getFilesizeSystem(), "Lỗi!", { progressBar: true });
                    check = true;
                    return false;
                }
                formData.append("fileUpload[" + i + "]", imageFile);
            })
        }
        if (validateRequired('#formAuditDetectEdit')) {
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditdetect.controller,
                    apiConfig.api.auditdetect.action.editauditdetect.path,
                    formData, 'updateSuccessAuditDetect', 'updateFail');
            }
        }
    }
}
function updateSuccessAuditDetect(data) {
    if (data.code == "1") {
        auditRequestMonitorUpdate.splice(0);
        selectObserveUpdate.splice(0);
        createdLog("Phát hiện kiểm toán", "Cập nhật phát hiện kiểm toán");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        setTimeout(function () {
            window.location.href = "/AuditDetect"
        }, 2000)
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
function DownloadFileAuditDetect(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditdetect.controller + '/DownloadAttachAuditDetect?id=' + id, 'Download');
}
function ChangeFileCreate() {
    var input = $("#PathCreate");
    if (input[0].files) {
        input.css('color', '#333');
    } else {
        input.css('color', 'transparent');
    }
}
function ChangeFileEdit() {
    var input = $("#PathEdit");
    if (input[0].files) {
        //$('#FileOldDetect').hide();
        input.css('color', '#333');
    } else {
        input.css('color', 'transparent');
    }
}

function fnSendBrowseSuccess(rspn) {
    var frmSendBrowse = $("#formAuditDetectSendBrowse");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formAuditDetectSendBrowse").clearQueue();
        frmSendBrowse.find("#IdSendBrowse").val(data.id);
        if (data.str_followers) {
            var _value = data.str_followers;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmSendBrowse.find("#FollowerEdit").append(newOption).trigger('change');
        }
        if (data.str_year) {
            var _valueyear = data.str_year;
            var newOptionYear = new Option(_valueyear.split(':')[1], _valueyear.split(':')[0], true, true);
            frmSendBrowse.find("#YearAuditWorkEdit").append(newOptionYear).trigger('change');
        }
        if (data.str_auditwork_name) {
            var _valueauditwork = data.str_auditwork_name;
            var newOptionAuditWork = new Option(_valueauditwork.split(':')[1], _valueauditwork.split(':')[0], true, true);
            frmSendBrowse.find("#AuditWorkEdit").append(newOptionAuditWork).trigger('change');
        } else {
            frmSendBrowse.find("#AuditWorkEdit").append(null).trigger('change');
        }
        if (data.str_auditprocess_name) {
            var _valueauditprocess = data.str_auditprocess_name;
            var newOptionAuditProcess = new Option(_valueauditprocess.split(':')[1], _valueauditprocess.split(':')[0], true, true);
            frmSendBrowse.find("#AuditProcessEdit").append(newOptionAuditProcess).trigger('change');
        } else {
            frmSendBrowse.find("#AuditProcessEdit").append(null).trigger('change');
        }
        if (data.str_auditfacilities_name) {
            var _valuesauditfacilities = data.str_auditfacilities_name;
            var newOptionAuditfacility = new Option(_valuesauditfacilities.split(':')[1], _valuesauditfacilities.split(':')[0], true, true);
            frmSendBrowse.find("#AuditfacilityEdit").append(newOptionAuditfacility).trigger('change');
        } else {
            frmSendBrowse.find("#AuditfacilityEdit").append(null).trigger('change');
        }
        if (data.str_classify_audit_detect) {
            var _value = data.str_classify_audit_detect;
            var newOptionClassifyAuditDetectEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmSendBrowse.find("#ClassifyAuditDetectEdit").append(newOptionClassifyAuditDetectEdit).trigger('change');
        }
        frmSendBrowse.find("#AuditDetectCodeSendBrowse").val(data.code);
        frmSendBrowse.find("#StatusSendBrowse").val(data.statusName);
        frmSendBrowse.find("#WorkingPaperCodeSendBrowse").val(data.working_paper_code);

        //table quan sát
        var tbBody = $('#auditdetecttableSendBrowse tbody');
        $("#auditdetecttableSendBrowse").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditobserve !== undefined && data.listauditobserve !== null && data.listauditobserve.length != 0) {
            var data_ = data.listauditobserve;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditobserve == undefined || data.listauditobserve == null || data.listauditobserve.length == 0) {
            notdataTableAuditObserve();
        }

        frmSendBrowse.find("#TitleSendBrowse").val(data.title);
        frmSendBrowse.find("#ShortTitleSendBrowse").val(data.short_title);
        frmSendBrowse.find("#DescriptionSendBrowse").val(data.description);
        frmSendBrowse.find("#EvidenceSendBrowse").val(data.evidence);
        frmSendBrowse.find("#FileNameSendBrowse").text(data.filename);
        frmSendBrowse.find("#AffectSendBrowse").val(data.affect);
        frmSendBrowse.find("#RatingRiskSendBrowse").val(data.rating_risk);
        frmSendBrowse.find("#AdminFrameworkAuditSendBrowse").val(data.admin_framework);
        frmSendBrowse.find("#CauseSendBrowse").val(data.cause);
        if (data.audit_report == true)
            frmSendBrowse.find("#AuditReportSendBrowse").attr('checked', true);
        //frmSendBrowse.find("#AuditReportEdit").val(data.audit_report);

        frmSendBrowse.find("#SummaryAuditDetectSendBrowse").val(data.summary_audit_detect);
        if (data.opinion_audit == true) {
            frmSendBrowse.find(':radio[name=OpinionAuditSendBrowse][value="1"]').prop('checked', true);
        } else {
            frmSendBrowse.find(':radio[name=OpinionAuditSendBrowse][value="2"]').prop('checked', true);
        }
        frmSendBrowse.find("#ReasonSendBrowse").val(data.reason);
        //table kiến nghị
        $("#auditrequestmonitortableSendBrowse").dataTable().fnDestroy();
        $('#auditrequestmonitortableSendBrowse tbody').html('');
        if (data.listauditrequestmonitor !== undefined && data.listauditrequestmonitor !== null && data.listauditrequestmonitor.length != 0) {
            var data_ = data.listauditrequestmonitor;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.code + '</td>' +
                    '<td>' + obj.content + '</td>' +
                    '<td>' + obj.auditrequesttype_name + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td>' + obj.unit_name + '</td>' +
                    '<td>' + obj.cooperateunit_name + '</td>' +
                    '<td>' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    //'<td class="col-action">' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewSendBrowse()"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-default btn-action-custom" onclick="viewUpdate()"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    //'<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditRequestMonitor()"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    //'</td>' +
                    '</tr>';
                $('#auditrequestmonitortableSendBrowse tbody').append(html);
            }
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitor();
        }
    }
}

function LoadSubmitPersonBrowse() {
    setTimeout(function () {
        callapi_oneselect_submitpersonbrowse("PersonBrowse", "Chọn người gửi..",
            apiConfig.api.host_audit_service,
            apiConfig.api.auditplan.controller,
            apiConfig.api.auditplan.action.selectusertype.path);
    }, 100);
}
function submitSendBrowseAuditDetect() {
    LoadSubmitPersonBrowse();
    $('#PersonBrowse').val(null).trigger('change');
    var id = $('#IdSendBrowse').val();
    $("#formmodalSubmitSendBrowseAuditDetect").find("#IdAuditDetect").val(id);
}

//Gửi duyệt
function onclickSubmitSendBrowse() {
    var user_id = parseInt($('#PersonBrowse').val());
    var _idAuditDetect = parseInt($("#IdAuditDetect").val());

    if (validateRequired('#formModalSubmitApproval')) {
        var obj = {
            'item_id': parseInt($("#IdAuditDetect").val()),
            'item_type': 4,
            'type': 'Gửi duyệt',
            'content': 'Đã gửi duyệt',
            'version': '',
        }
        callApi_auditservice(
            apiConfig.api.discussionhistory.controller,
            apiConfig.api.discussionhistory.action.savediscussionhistory.path,
            apiConfig.api.discussionhistory.action.savediscussionhistory.method,
            obj, '', 'msgError');
        //callApi_auditservice(
        //    apiConfig.api.auditdetect.controller,
        //    apiConfig.api.auditdetect.action.sendbrowseauditdetect.path + "/" + _idAuditDetect + "?" + "user_id" + "=" + user_id,
        //    apiConfig.api.auditdetect.action.sendbrowseauditdetect.method,
        //    null, 'SubmitSendBrowseSuccess', 'msgError');
        var obj = {
            'item_id': _idAuditDetect,
            'approvaluser': user_id,
            'function_name': "Danh sách phát hiện",
            'function_code': "M_AD",
        }
        callApi_userservice(
            apiConfig.api.approvalfunction.controller,
            apiConfig.api.approvalfunction.action.requestapproval.path,
            apiConfig.api.approvalfunction.action.requestapproval.method,
            obj, 'SubmitSendBrowseSuccess');
    }
}
function SubmitSendBrowseSuccess(rs) {
    if (rs.code === '1') {
        createdLog("Phát hiện kiểm toán", "Gửi duyệt duyệt", "");
        setTimeout(function () {
            toastr.success(localizationResources.SendBrowse, { progressBar: true })
        }, 500);
        $('#modalSubmitApproval').modal('hide');
        //openView(0, 0);
        setTimeout(function () {
            window.location.href = "/AuditDetect"
        }, 1000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}

//kiểm duyệt


function fnCensorshipSuccess(rspn) {
    var frmCensorship = $("#formAuditDetectCensorship");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        $("#formAuditDetectCensorship").clearQueue();
        frmCensorship.find("#IdCensorship").val(data.id);
        frmCensorship.find("#statusCodeCensorship").val(data.status);
        if (data.str_followers) {
            var _value = data.str_followers;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmCensorship.find("#FollowerEdit").append(newOption).trigger('change');
        }
        if (data.str_year) {
            var _valueyear = data.str_year;
            var newOptionYear = new Option(_valueyear.split(':')[1], _valueyear.split(':')[0], true, true);
            frmCensorship.find("#YearAuditWorkEdit").append(newOptionYear).trigger('change');
        }
        if (data.str_auditwork_name) {
            var _valueauditwork = data.str_auditwork_name;
            var newOptionAuditWork = new Option(_valueauditwork.split(':')[1], _valueauditwork.split(':')[0], true, true);
            frmCensorship.find("#AuditWorkEdit").append(newOptionAuditWork).trigger('change');
        } else {
            frmSendBrowse.find("#AuditWorkEdit").append(null).trigger('change');
        }
        if (data.str_auditprocess_name) {
            var _valueauditprocess = data.str_auditprocess_name;
            var newOptionAuditProcess = new Option(_valueauditprocess.split(':')[1], _valueauditprocess.split(':')[0], true, true);
            frmCensorship.find("#AuditProcessEdit").append(newOptionAuditProcess).trigger('change');
        } else {
            frmSendBrowse.find("#AuditProcessEdit").append(null).trigger('change');
        }
        if (data.str_auditfacilities_name) {
            var _valuesauditfacilities = data.str_auditfacilities_name;
            var newOptionAuditfacility = new Option(_valuesauditfacilities.split(':')[1], _valuesauditfacilities.split(':')[0], true, true);
            frmCensorship.find("#AuditfacilityEdit").append(newOptionAuditfacility).trigger('change');
        } else {
            frmSendBrowse.find("#AuditfacilityEdit").append(null).trigger('change');
        }
        if (data.str_classify_audit_detect) {
            var _value = data.str_classify_audit_detect;
            var newOptionClassifyAuditDetectEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmCensorship.find("#ClassifyAuditDetectEdit").append(newOptionClassifyAuditDetectEdit).trigger('change');
        }
        frmCensorship.find("#AuditDetectCodeCensorship").val(data.code);
        frmCensorship.find("#StatusCensorship").val(data.statusName);
        frmCensorship.find("#WorkingPaperCodeCensorship").val(data.working_paper_code);

        //table quan sát
        var tbBody = $('#auditdetecttableCensorship tbody');
        $("#auditdetecttableCensorship").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditobserve !== undefined && data.listauditobserve !== null && data.listauditobserve.length != 0) {
            var data_ = data.listauditobserve;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.working_paper_code + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditobserve == undefined || data.listauditobserve == null || data.listauditobserve.length == 0) {
            notdataTableAuditObserve();
        }

        frmCensorship.find("#TitleCensorship").val(data.title);
        frmCensorship.find("#ShortTitleCensorship").val(data.short_title);
        frmCensorship.find("#DescriptionCensorship").val(data.description);
        frmCensorship.find("#EvidenceCensorship").val(data.evidence);
        frmCensorship.find("#FileNameCensorship").text(data.filename);
        frmCensorship.find("#AffectCensorship").val(data.affect);
        frmCensorship.find("#RatingRiskCensorship").val(data.rating_risk);
        frmCensorship.find("#AdminFrameworkAuditDetectCensorship").val(data.admin_framework);
        frmCensorship.find("#CauseCensorship").val(data.cause);
        if (data.audit_report == true)
            frmCensorship.find("#AuditReportCensorship").attr('checked', true);

        frmCensorship.find("#SummaryAuditDetectCensorship").val(data.summary_audit_detect);
        if (data.opinion_audit == true) {
            frmCensorship.find(':radio[name=OpinionAuditCensorship][value="1"]').prop('checked', true);
        } else {
            frmCensorship.find(':radio[name=OpinionAuditCensorship][value="2"]').prop('checked', true);
        }
        frmCensorship.find("#ReasonCensorship").val(data.reason);
        //table kiến nghị
        $("#auditrequestmonitortableCensorship").dataTable().fnDestroy();
        $('#auditrequestmonitortableCensorship tbody').html('');
        if (data.listauditrequestmonitor !== undefined && data.listauditrequestmonitor !== null && data.listauditrequestmonitor.length != 0) {
            var data_ = data.listauditrequestmonitor;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    '<td>' + obj.code + '</td>' +
                    '<td>' + obj.content + '</td>' +
                    '<td>' + obj.auditrequesttype_name + '</td>' +
                    '<td>' + obj.user_name + '</td>' +
                    '<td>' + obj.unit_name + '</td>' +
                    '<td>' + obj.cooperateunit_name + '</td>' +
                    '<td>' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    '</tr>';
                $('#auditrequestmonitortableCensorship tbody').append(html);
            }
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitor();
        }
    }
}
//Duyệt / từ chối duyệt

function submitContent() {
    $('#textContent').val("");
    var id = $('#IdCensorship').val();
    $("#formmodalSubmitContent").find("#IdAuditDetectModal").val(id);
}
//Từ chối duyệt
function onclickSubmitContent(param) {
    var _idCensorship = parseInt($("#IdCensorship").val());
    var obj = {
        'item_id': _idCensorship,
        'item_type': 4,
        'type': 'Từ chối duyệt',
        'content': $("#textContent").val(),
        'version': '',
    }
    if (validateRequired('#formmodalSubmitContent')) {
        callApi_auditservice(
            apiConfig.api.discussionhistory.controller,
            apiConfig.api.discussionhistory.action.savediscussionhistory.path,
            apiConfig.api.discussionhistory.action.savediscussionhistory.method,
            obj, '', 'msgError');
        //callApi_auditservice(
        //    apiConfig.api.auditdetect.controller,
        //    apiConfig.api.auditdetect.action.censorshipauditdetect.path + "/" + _idCensorship + "?" + "param" + "=" + param,
        //    apiConfig.api.auditdetect.action.censorshipauditdetect.method,
        //    null, 'SubmitBrowserRefuseSuccess', 'msgError');
        //từ chối duyệt
        var obj = {
            'item_id': _idCensorship,
            'function_name': "Danh sách phát hiện",
            'function_code': "M_AD",
            'reason_note': $("#textContent").val(),
        }
        callApi_userservice(
            apiConfig.api.approvalfunction.controller,
            apiConfig.api.approvalfunction.action.rejectapproval.path,
            apiConfig.api.approvalfunction.action.rejectapproval.method,
            obj, 'SubmitRejectApprovalSuccess');
    }
}
//Duyệt
function submitBrowserRefuse(param) {
    var _idCensorship = parseInt($("#IdCensorship").val());
    var obj = {
        'item_id': _idCensorship,
        'item_type': 4,
        'type': 'Duyệt',
        'content': 'Đã duyệt',
        'version': '',
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.savediscussionhistory.path,
        apiConfig.api.discussionhistory.action.savediscussionhistory.method,
        obj, '', 'msgError');
    //duyệt
    var obj = {
        'item_id': _idCensorship,
        'function_name': "Danh sách phát hiện",
        'function_code': "M_AD",
    }
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.submitapproval.path,
        apiConfig.api.approvalfunction.action.submitapproval.method,
        obj, 'SubmitBrowserRefuseSuccess');
}

//duyêt
function SubmitBrowserRefuseSuccess(rs) {
    if (rs.code === '1') {
        createdLog("Phát hiện kiểm toán", "Phê duyệt Kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.CensorshipSuccess, { progressBar: true })
        setTimeout(function () {
            window.location.href = "/AuditDetect"
        }, 100);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rs.code), 'Error', { progressBar: true }) }, 50);
    }
}

//từ chối duyệt
function SubmitRejectApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Từ chối duyệt thành công!", "Thông báo!", { progressBar: true });
        createdLog("Phát hiện kiểm toán", "Từ chối duyệt phát hiện kiểm toán");
        setTimeout(function () {
            window.location.href = "/AuditDetect";
        }, 100);
    }
    else {
        toastr.error("Từ chối duyệt không thành công!", "Lỗi!", { progressBar: true });
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

function setValueCreateUser(elment) {
    $('#CreateUser').val(null).trigger('change');
    $('#CreateUser').html('');
    //var _facilityid = $(elment).val();
    //if (_facilityid != 0 || _facilityid != null || _facilityid != "" || _facilityid != undefined || _facilityid != NaN) {
    //    callApi_multipleselect_follower("CreateUser", "Chọn người chịu trách nhiệm..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listuserresponsible.path + "?" + "facility_id" + "=" + parseInt(_facilityid));
    //} else {
    //    callApi_multipleselect_follower("CreateUser", "Chọn người chịu trách nhiệm..",
    //        apiConfig.api.host_audit_service,
    //        apiConfig.api.auditdetect.controller,
    //        apiConfig.api.auditdetect.action.listuserresponsible.path);
    //}
}
function loadYearDefault() {
    setTimeout(function () {
        callApi_auditservice(
            apiConfig.api.auditobserve.controller,
            apiConfig.api.auditobserve.action.listyearauditworkdefault.path,
            apiConfig.api.auditobserve.action.listyearauditworkdefault.method,
            null, 'ListYearSuccess', 'msgError');
    }, 100);
}
function ListYearSuccess(rs) {
    var data = rs.data;
    if (data != null) {
        var newOption = new Option(data.id, data.year, true, false);
        $('#YearAuditWork').append(newOption).trigger('change');
    }


    let checkLocalType = localStorage.getItem("type");
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem("id");
    let id = parseInt(checkLocalId);
    if (checkLocalType === null && checkLocalId === null) {
        type = 0;
        id = 0;
    }
    if (type == 9) { // open from dashboard 
        setTimeout(function () {
            openView(3, id);
        }, 100);
    }
    else {
        setTimeout(function () {
            openView(0, 0);
        }, 100);
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
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.deletefile.path + "/" + id,
        apiConfig.api.auditdetect.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}
function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        var param = $("#IdEdit").val();
        //fnGetAuditWorkDetail(6, param);
        fnGetDetail(3, param)
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}
//Xem lịch sử*/
function onSearchHistoryLog(param) {
    var obj = {
        'item_id': param,
        'item_type': 4,
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.search.path,
        apiConfig.api.discussionhistory.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchHistoryLogSuccess', 'msgError');
}
function fnSearchHistoryLogSuccess(rspn) {
    var tbBody = $('#auditDetectHistory tbody');
    $("#auditDetectHistory").dataTable().fnDestroy();
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
    var t = $("#auditDetectHistory").DataTable({
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
//Xem lịch sử*/
//trở lại khi lưu
function outEdit() {
    if (selectObserveUpdate.length <= 0) {
        toastr.error("Vui lòng chọn quan sát", "Thông báo!", { progressBar: true });
    } else if (auditRequestMonitorUpdate.length <= 0) {
        toastr.error("Vui lòng chọn kiến nghị", "Thông báo!", { progressBar: true });
    }
}
//xuất excel

function Export() {

    var obj = {
        'year': ($('#YearAuditWork').val() != null ? parseInt($('#YearAuditWork').val()) : $('#YearAuditWork').val()),
        'auditwork_id': ($('#AuditWork').val() != null ? parseInt($('#AuditWork').val()) : $('#AuditWork').val()),
        'auditprocess_id': ($('#AuditProcess').val() != null ? parseInt($('#AuditProcess').val()) : $('#AuditProcess').val()),
        'auditfacilities_id': ($('#Auditfacility').val() != null ? parseInt($('#Auditfacility').val()) : $('#Auditfacility').val()),
        'code': $('#DetectCode').val().trim(),
        'title': $('#DetectTitle').val().trim(),
        'working_paper_code': $('#WorkingPaperCode').val().trim(),
        'audit_report': parseInt($('#AuditReport').val()),
        'page_size': 1,
        'start_number': 1
    };

    var jsonData = JSON.stringify(obj);

    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditdetect.controller +
        apiConfig.api.auditdetect.action.exportexcel.path + "?jsonData=" + jsonData);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_ThongKePhatHien_v0.2.xlsx";
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

function fillApplyForComboCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#AdminFrameworkAuditDetectCreate').html('');
    $('#AdminFrameworkAuditDetectCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#AdminFrameworkAuditDetectCreate').append(html);
}

function loadCategoryCreate() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.phathienkiemtoan }, 'fillApplyForComboCreate');
}

function fillApplyForComboEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#AdminFrameworkAuditDetectEdit').html('');
    $('#AdminFrameworkAuditDetectEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#AdminFrameworkAuditDetectEdit').append(html);
}

function loadCategoryEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.phathienkiemtoan }, 'fillApplyForComboEdit');
}

function fillApplyForComboDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#AdminFrameworkAuditDetectDetail').html('');
    $('#AdminFrameworkAuditDetectDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#AdminFrameworkAuditDetectDetail').append(html);
}

function loadCategoryDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.phathienkiemtoan }, 'fillApplyForComboDetail');
}

function fillApplyForComboSendBrowse(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#AdminFrameworkAuditDetectSendBrowse').html('');
    $('#AdminFrameworkAuditDetectSendBrowse').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#AdminFrameworkAuditDetectSendBrowse').append(html);
}

function loadCategorySendBrowse() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.phathienkiemtoan }, 'fillApplyForComboSendBrowse');
}

function fillApplyForComboCensorship(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#AdminFrameworkAuditDetectCensorship').html('');
    $('#AdminFrameworkAuditDetectCensorship').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#AdminFrameworkAuditDetectCensorship').append(html);
}

function loadCategoryCensorship() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.phathienkiemtoan }, 'fillApplyForComboCensorship');
}

function fillApplyForComboRatingRiskCreate(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#RatingRiskCreate').html('');
    $('#RatingRiskCreate').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#RatingRiskCreate').append(html);
}

function loadCategoryRatingRiskCreate() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.xephangruiro }, 'fillApplyForComboRatingRiskCreate');
}

function fillApplyForComboRatingRiskEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#RatingRiskEdit').html('');
    $('#RatingRiskEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#RatingRiskEdit').append(html);
}

function loadCategoryRatingRiskEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.xephangruiro }, 'fillApplyForComboRatingRiskEdit');
}

function fillApplyForComboRatingRiskDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#RatingRiskDetail').html('');
    $('#RatingRiskDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#RatingRiskDetail').append(html);
}

function loadCategoryRatingRiskDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.xephangruiro }, 'fillApplyForComboRatingRiskDetail');
}

function fillApplyForComboRatingRiskSendBrowse(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#RatingRiskSendBrowse').html('');
    $('#RatingRiskSendBrowse').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#RatingRiskSendBrowse').append(html);
}

function loadCategoryRatingRiskSendBrowse() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.xephangruiro }, 'fillApplyForComboRatingRiskSendBrowse');
}

function fillApplyForComboRatingRiskCensorship(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#RatingRiskCensorship').html('');
    $('#RatingRiskCensorship').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#RatingRiskCensorship').append(html);
}

function loadCategoryRatingRiskCensorship() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.xephangruiro }, 'fillApplyForComboRatingRiskCensorship');
}