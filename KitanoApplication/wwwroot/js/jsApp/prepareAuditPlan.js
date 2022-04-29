var arrDefaulPersonnel = [];
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
                } else if (arrChangePersonnel.length > 0 && arrChangePersonnel.length > data.data.length) {
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
//function callApi_oneselectperson(selector, placeholder, host, controller, action) {
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
function callApi_selectmulti(selector, placeholder, host, controller, action) {
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


function callApi_oneselect_leader(selector, placeholder, host, controller, action) {
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
                            id: item.user_id,
                            text: item.fullName,
                            keyid: item.id,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function callApi_selectmulti_auditor(selector, placeholder, host, controller, action) {
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
                            id: item.user_id,
                            text: item.fullName,
                            keyid: item.id,
                        }
                    })
                };
            },
            cache: true
        }
    });
}
function callapi_multipleselect_auditassaignment(selector, placeholder, host, controller, action) {
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
                            id: item.user_id,
                            text: item.fullName,
                            keyid: item.id,
                        }
                    })
                };
            },
            cache: true
        }
    });
}

//function callapi_selectyearapproved(selector, placeholder, host, controller, action) {
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
//                            text: item.year,
//                            id: item.year
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}

//function callapi_selectnameauditwork(selector, placeholder, host, controller, action) {
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
//                            text: item.name,
//                            id: item.name
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}


function callApi_oneselect_submitapproval(selector, placeholder, host, controller, action) {
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
function openView(type, value) {
    var index = $("#view");
    var create = $("#create");
    var detail = $("#detail");
    var edit = $("#edit");
    var censorship = $("#censorship");
    var sendBrowse = $("#sendBrowse");
    var historyLog = $("#history-log");

    $('#YearCreateDrop').val(null).trigger('change');
    $('#YearCreateDrop').html('');
    $('#PersonInCharge').val(null).trigger('change');
    $('#PersonInCharge').html('');
    $('#PersonInChargeEdit').val(null).trigger('change');
    $('#PersonInChargeEdit').html('');
    $('#YearCreateDrop').val(null).trigger('change');
    $('#YearCreateDrop').html('');
    $('#NameAuditCreateDrop').html('');
    $('#NameAuditCreateDrop').val(null).trigger('change');
    $('#formAuditWorkCreate').find("#YearCreate").val("");
    $('#formAuditWorkCreate').find("#NameAuditCreate").val("");
    clearMsgInvalid();
    if (type === 0) {
        index.show();
        edit.hide();
        detail.hide();
        create.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
        //LoadAuditWork();
        setTimeout(function () {
            onSearch();
        }, 100);
    }
    else if (type === 1) {
        //LoadYear();
        index.hide();
        edit.hide();
        create.show();
        detail.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
    }
    else if (type === 2) {
        $("#myTabDetail li")[0].click();
        index.hide();
        create.hide();
        edit.hide();
        censorship.hide();
        sendBrowse.hide();
        detail.show();
        historyLog.hide();
        fnGetDetail(type, value);
    }
    else if (type === 3) {
        //$("#myTab li")[0].click();
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.hide();
        fnGetDetail(type, value);
    }
    else if (type === 4) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        censorship.show();
        sendBrowse.hide();
        historyLog.hide();
        fnGetDetail(type, value);
    }
    else if (type === 5) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        censorship.hide();
        sendBrowse.show();
        historyLog.hide();
        fnGetDetail(type, value);
    }
    else if (type === 6) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        censorship.hide();
        sendBrowse.hide();
        historyLog.show();
        onSearchHistoryLog(value);
    }
}
function onSearch() {
    var obj = {
        'year': $('#Year').val().trim(),
        'classify': parseInt($('#Classify').val()),
        'code': $('#Code').val().trim(),
        'name': $('#Name').val().trim(),
        'person_in_charge': $('#PersonInCharge').val() != null ? parseInt($('#PersonInCharge').val()) : $('#PersonInCharge').val(),
        'execution_status_str': $('#StatusSuccess').val(),
        'status': $('#Status').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.searchprepareaudit.path,
        apiConfig.api.auditplan.action.searchprepareaudit.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchPrepareAuditSuccess', 'msgError');
}

function fnSearchPrepareAuditSuccess(rspn) {
    //showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var level_approval = getApprovallevel("M_PAP");
        var data = rspn.data;
        var tbBody = $('#prepareAuditPlanTable tbody');
        $("#prepareAuditPlanTable").dataTable().fnDestroy();
        tbBody.html('');
        var currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        //LoadAuditWork();
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            //var testStatus = (obj.status == 1 ? "Bản nháp" : (obj.status == 2 ? "Chờ duyệt" : (obj.status == 3 ? "Đã duyệt" : (obj.status == 4 ? "Từ chối duyệt" : (obj.status == 5 ? "Ngừng sử dụng" : "")))));
            //var testExecutionStatus = (obj.execution_status_str == 1 ? "Chưa thực hiện" : (obj.execution_status_str == 2 ? "Đang thực hiện" : (obj.execution_status_str == 3 ? "Hoàn thành" : "")));
            var StatusName = getApprovalStatus("M_PAP", obj.status);
            var html = [
                '<tr>' +
                '<td class="text-center"></td>' +
                '<td>' + obj.year + '</td>' +
                '<td>' + obj.code + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td class="text-center">' + obj.start_date + '</td>' +
                '<td class="text-center">' + obj.end_date + '</td>' +
                '<td>' + obj.name_person_in_charge + '</td>' +
                '<td>' + StatusName + '</td>' +
                '<td>' + obj.execution_status_str + '</td>' +
                '<td class="text-center col-action" style="width: 15% !important">' +
                //'<a class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +

                (IsCheckPemission('M_PAP', 'PER_DETAIL') === true ?
                    '<a class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' :
                    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                +
                ( /*&& obj.user_login_id == obj.created_by*/IsCheckPemission('M_PAP', 'PER_EDIT') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")/*&& obj.roleId !== 1*/
                    ? '<a class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>')
                +
                (/*&& obj.user_login_id == obj.created_by*/IsCheckPemission('M_PAP', 'PER_DEL') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2") /*&& obj.roleId !== 1*/
                    ? '<a class="btn icon-delete btn-action-custom" onclick="DeleteAuditWork(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" style="font-size: 16px;"></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>')
                +

                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(6,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                '</li>' +
                '<li class="optioncustom">' +
                //'<a class="btn icon-default  btn-action-custom"  style=" display: flex;"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word"></i>&nbsp Xuất file word</a>' +

                ((IsCheckPemission('M_PAP', 'PER_EXPORT') === true/* && obj.roleId !== 1*/)
                    ? '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="ExportFileWord(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word"></i>&nbsp Xuất file word</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Xuất file word" class="fas fa-file-word" aria-hidden="true" ></i>&nbsp Xuất file word"</a>') +

                '</li>' +
                '<li class="optioncustom">' +
                //'<a class="btn icon-default  btn-action-custom"  style=" display: flex;"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word"></i>&nbsp Xuất file word</a>' +

                ((IsCheckPemission('M_PAP', 'PER_EXPORT') === true/* && obj.roleId !== 1*/)
                    ? '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="ExportFileWordOutline(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-download" aria-hidden="true" data-original-title="Xuất đề cương kiểm toán"></i>&nbsp Xuất đề cương kiểm toán</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Xuất đề cương kiểm toán" class="fas fa-download" aria-hidden="true" ></i>&nbsp Xuất đề cương kiểm toán"</a>') +

                '</li>' +
                '<li class="optioncustom">' +
                //'<a class="btn icon-default  btn-action-custom"  style=" display: flex;"  data-toggle="modal" data-target="#modalRenderNotification" onclick="RenderNotification(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fa fa-bell" aria-hidden="true" data-original-title="Xuất Thông báo kiểm toán"></i>&nbsp Xuất Thông báo KT</a>' +
                '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="ExportNotificationWord(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fa fa-bell" aria-hidden="true" data-original-title="Xuất Thông báo kiểm toán"></i>&nbsp Xuất Thông báo KT</a>' +
                //((IsCheckPemission('M_PAP', 'PER_EXPORT') === true/* && obj.roleId !== 1*/)
                //: '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Xuất Thông báo kiểm toán" class="fa fa-bell" aria-hidden="true" ></i>&nbsp Xuất Thông báo KT"</a>') +

                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_PAP', 'PER_REQUEST') === true && (obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1")
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(5,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_PAP', 'PER_APPROVE') === true && ((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '" style=" display: flex;"><i data-toggle="tooltip" title="Kiểm duyệt" class="fa fa-check-square" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Kiểm duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Kiểm duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Kiểm duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_PAP', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.name + '\',\'M_PAP\',\'Kế hoạch cuộc kiểm toán\')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_PAP', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_PAP') == 1
                    ? '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.name + '\',\'M_PAP\',\'Kế hoạch cuộc kiểm toán\',\'\')"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '</ul>'
                + '</span>' +
                '</td>' +
                '</tr>'
            ];
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#prepareAuditPlanTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
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
                    "targets": [3, 9],
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
        var tbBody = $('#prepareAuditPlanTable tbody');
        $("#prepareAuditPlanTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#prepareAuditPlanTable").DataTable({
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
                    "targets": [3, 9],
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
function fnGetDetail(type, param) {
    localStorage.removeItem("id");
    //LoadAuditWWorkEdit();
    var call_back = '';
    if (type === 3) {
        call_back = 'fnEditSuccess';
        localStorage.setItem("id", param);
    } else if (type === 2) {
        call_back = 'fnDetailSuccess';
    } else if (type === 4) {
        call_back = 'fnCensorshipSuccess';
    } else if (type === 5) {
        call_back = 'fnSendBrowseSuccess';
    } else if (type === null) {
        call_back = 'fnDeleteSuccess';
    }
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.auditworkdetail.path + "/" + param,
        apiConfig.api.auditplan.action.auditworkdetail.method,
        null, call_back, 'msgError');
}
var _auditplanId = "";
var _dataAuditWorkId = [];
var _dataAuditWorkScopeFacilityId = [];
var _userid = "";
var listprepareaudit = [];
var arrauditworkscope = [];
var list_schedule = [];
var _listworkscope = [];
var _countSchedule = 0;
var _countCollap = "";
var _idauditstrategyrisk = "";
var _indexPersonnel = 0;
var arrtest = [];
function loadDataDropdownPersonnel() {
    setTimeout(function () {
        callApi_auditservice(
            apiConfig.api.auditdetect.controller,
            apiConfig.api.auditdetect.action.datadropdownpersonnel.path,
            apiConfig.api.auditdetect.action.datadropdownpersonnel.method,
            null, 'DataDropPersonnel', 'msgError');
    }, 100);
}
function fnEditSuccess(rspn) {
    arrPersonnel.splice(0);
    arrChangePersonnel.splice(0);
    arrDefaulPersonnel.splice(0);
    loadDataDropdownPersonnel();
    _dataAuditWorkId.splice(0);
    _dataAuditWorkScopeFacilityId.splice(0);
    //checkPersonnel();
    var frmModify = $("#generalInformationEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        //tab số 1
        var data = rspn.data;
        _auditplanId = data.auditplan_id;
        $("#generalInformationEdit").clearQueue();

        $("#budgetEdit").find("#budgetEditNew").val(data.id);

        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#YearEdit").val(data.year);
        $("#scopeEdit").find("#OutsideAudit").val(data.audit_scope_outside);
        $("#scopeEdit").find("#AuditScopeEdit").val(data.audit_scope);
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
        frmModify.find("#EndDatePlanningEdit").val(data.end_date_planning);
        frmModify.find("#StartDateRealEdit").val(data.start_date_real);
        frmModify.find("#ReleaseDateEdit").val(data.release_date);
        frmModify.find("#ToDateEdit").val(data.end_date);
        frmModify.find("#StatusSuccessEdit").val(data.execution_status_str);
        frmModify.find("#StatusEdit").val(data.statusName);
        frmModify.find("#NumberAuditorsEdit").val(data.num_of_auditor);
        frmModify.find("#NumberWorkdayEdit").val(data.num_of_workdays);

        frmModify.find("#fromDEdit").val(data.from_date);
        frmModify.find("#toDEdit").val(data.to_date);

        //Tab số 2
        var tbBody = $('#auditworkNum2table tbody');
        $("#auditworkNum2table").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditpersonnel !== undefined && data.listauditpersonnel !== null) {
            var data_ = data.listauditpersonnel;
            _indexPersonnel = 0;
            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                //arrtest.push(obj.user_id);
                var html = '<tr>' +
                    ' <td style="width: 48% !important;"><select onchange="clickName(this)" class="form-control usersid" id="Users_' + _indexPersonnel + '" name="Users_' + _indexPersonnel + '" style="padding:0;"></td>' +
                    ' <td style="width: 48% !important;"><input disabled type="text" class="form-control picker email" id="Email_' + _indexPersonnel + '" name="Email_' + _indexPersonnel + '"></td>' +
                    '<td class="col-action" style="width: 4% !important;">' +
                    //'<a class="btn icon-delete btn-action-custom" onclick="DeleteAuditPersonnel(\'' + obj.fullName + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    ' </tr>';
                $("#auditworkNum2body").append(html);
                callApi_oneselect1("Users_" + _indexPersonnel, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);

                if (data_[i].str_fullName) {
                    var value_fullName = data_[i].str_fullName;
                    var newOptionFullName = new Option(value_fullName.split(':')[1], value_fullName.split(':')[0], true, true);
                    $("#personnelEdit").find("#Users_" + i).append(newOptionFullName).trigger('change');
                }
                $("#personnelEdit").find("#Email_" + i).val(obj.email);

                //var recount = 0;
                //$("#auditworkNum2table > tbody > tr").each(function (i, v) {
                //    recount++;
                //});
                _indexPersonnel++;
                //var html = '<tr id="' + obj.user_id + '">' +
                //    /*'<td style="" class="text-center">' + (i + 1) + '</td>' +*/
                //    '<td>' + obj.fullName + '</td>' +
                //    '<td class="line-break">' + obj.email + '</td>' +
                //    '<td class="col-action">' +
                //    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditPersonnel(\'' + obj.fullName + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                //    '</td>' +
                //    '</tr>';
                //tbBody.append(html);
            }
        }
        //Tab số 3
        var tbBodyN3 = $('#auditworkNum3table tbody');
        $("#auditworkNum3table").dataTable().fnDestroy();
        tbBodyN3.html('');
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            //arrauditworkscope.splice(0);

            var data_ = data.listauditworkscope;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditprocess_name + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + obj.bussinessactivities_name + '</td>' +
                    '<td>' + (obj.reason == null ? "" : obj.reason) + '</td>' +
                    '<td>' + (obj.risk_rating == null ? "" : obj.risk_rating) + '</td>' +
                    '<td class="text-center">' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '<td><select class="form-control leaderid" id="Leader_' + i + '" name="Leader_' + i + '" style="padding:0;"></td>' +
                    '<td><select class="form-control auditorid" id="Auditor_' + i + '" name="Auditor_' + i + '" style="padding:0;"></td>' +
                    '<td class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditWorkScope(\'' + obj.auditprocess_name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBodyN3.append(html);
                //callApi_oneselectperson("Leader_" + i, "",
                //    apiConfig.api.host_user_service,
                //    apiConfig.api.systemuser.controller,
                //    apiConfig.api.systemuser.action.selectaudiWork.path);
                callApi_oneselect_leader("Leader_" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));


                if (data_[i].audit_team_leader) {
                    var value_audit_team_leader = data_[i].audit_team_leader;
                    var newOptionLeader = new Option(value_audit_team_leader.split(':')[1], value_audit_team_leader.split(':')[0], true, true);
                    $("#scopeEdit").find("#Leader_" + i).append(newOptionLeader).trigger('change');
                }


                callApi_selectmulti_auditor("Auditor_" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));

                var _list = data_[i].auditor;
                if (_list) {
                    var arr_data = _list.split(', ');
                    if (arr_data.length > 0) {
                        $(arr_data).each(function () {
                            var newOptionAuditor = new Option(this.split(':')[1], this.split(':')[0], true, true);
                            $("#scopeEdit").find("#Auditor_" + i).append(newOptionAuditor).trigger('change');
                        });
                        var valueAuditor = $("#Auditor_" + i).val();
                    }
                    var _leaderId = $("#Leader_" + i).val();
                    var listmapping = {
                        id: data_[i].id,
                        audit_team_leader: _leaderId,
                        auditor: valueAuditor,
                    }
                    arrauditworkscope.push(listmapping);
                }
                _dataAuditWorkId.push(data_[i].id);
            }
        }
        //table auditscopeFacility
        var tbBodyauditscopeFacilitytable = $('#auditscopeFacilitytable tbody');
        $("#auditscopeFacilitytable").dataTable().fnDestroy();
        tbBodyauditscopeFacilitytable.html('');
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var data_ = data.listauditfacility;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + (obj.reason/* == null ? "" : obj.reason*/) + '</td>' +
                    '<td>' + (obj.risk_rating/* == null ? "" : obj.risk_rating*/) + '</td>' +
                    '<td class="text-center">' + (obj.auditing_time_nearest/* == null ? "" : obj.auditing_time_nearest*/) + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditWorkScopeFacility(\'' + obj.auditfacilities_name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBodyauditscopeFacilitytable.append(html);
                _dataAuditWorkScopeFacilityId.push(obj.id);
            }
        }
        //Tab số 4
        var tbBodyN4 = $('#auditworkNum4table tbody');
        $("#auditworkNum4table").dataTable().fnDestroy();
        tbBodyN4.html('');
        if (data.listschedule !== undefined && data.listschedule !== null) {
            var data_ = data.listschedule;
            _countSchedule = data_.length;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                var html = '<tr>' +
                    //'<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td style="text-align: center; width: 15%"><input type="text" class="form-control picker work" id="Work_' + i + '" name="Work_' + i + '"></td>' +
                    '<td style="width: 5%"><select class="form-control useid" id="UsersAuditAssignment_' + i + '" name="UsersAuditAssignment_' + i + '" style="padding:0;"></td>' +
                    '<td style="text-align: center; width: 7%"><input type="date" class="form-control picker expecteddate" id="ExpectedDate_' + i + '" name="ExpectedDate_' + i + '"></td>' +
                    '<td style="text-align: center; width: 2%" class="col-action">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteSchedule(\'' + obj.work + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBodyN4.append(html);
                callapi_multipleselect_auditassaignment("UsersAuditAssignment_" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));

                if (data_[i].str_person_in_charge) {
                    var value_str_person_in_charge = data_[i].str_person_in_charge;
                    var newOptionSchedule = new Option(value_str_person_in_charge.split(':')[1], value_str_person_in_charge.split(':')[0], true, true);
                    $("#scheduleEdit").find("#UsersAuditAssignment_" + i).append(newOptionSchedule).trigger('change');
                }
                $("#scheduleEdit").find("#Work_" + i).val(obj.work);
                $("#scheduleEdit").find("#ExpectedDate_" + i).val(obj.expected_date);
                var listmapping = {
                    auditwork_id: data_[i].auditwork_id,
                    work: data_[i].work,
                    user_id: data_[i].user_id,
                    expected_date: data_[i].expected_date,
                    //actual_date: data_[i].actual_date,
                }
                list_schedule.push(listmapping);
            }
        }
        //tab số 5
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var _dt = data.listauditfacility;
            _countCollap = 0;
            var cardHeader = $('#unitInformationEdit #accordion');
            cardHeader.html('');
            $('#unitInformationEdit #accordion').html("");
            var dfhtml = "<p>I.&nbsp;&nbsp;Th&ocirc;ng tin cơ bản về đơn vị được kiểm to&aacute;n<br />1.&nbsp;&nbsp; Hoạt động ch&iacute;nh của Đơn vị được kiểm to&aacute;n <br />2.&nbsp;&nbsp; Cơ cấu tổ chức của Đơn vị được kiểm to&aacute;n <br />3.&nbsp;&nbsp; M&ocirc;i trường kiểm so&aacute;t <br />4.&nbsp;&nbsp; Th&ocirc;ng tin cơ bản về c&aacute;c quy tr&igrave;nh &nbsp; <br />5.&nbsp;&nbsp; Hoạt động của bộ m&aacute;y kiểm tra / kiểm so&aacute;t nội bộ của doanh nghiệp(nếu c&oacute;) <br />6.&nbsp;&nbsp;&nbsp; M&ocirc;i trường kinh doanh v&agrave; ph&aacute;p l&yacute; b&ecirc;n ngo&agrave;i doanh nghiệp / tổ chức <br />7.&nbsp;&nbsp;&nbsp; Hệ thống C&ocirc;ng nghệ th&ocirc;ng tin <br />8.&nbsp;&nbsp;&nbsp; C&aacute;c Dự &aacute;n &nbsp; <br />II.&nbsp;&nbsp; Ph&acirc;n t&iacute;ch th&ocirc;ng tin về chiến lược, t&agrave;i ch&iacute;nh, phi t&agrave;i ch&iacute;nh <br />III.C&aacute;c vấn đề rủi ro đ&atilde; được x&aacute;c định <br />IV.C&aacute;c quan ngại của BLĐ v&agrave; c&aacute;c b&ecirc;n li&ecirc;n quan <br />V.&nbsp;&nbsp; Lịch sử về hiệu quả kiểm so&aacute;t</p >"
            for (var i = 0; i < _dt.length; i++) {
                var obj = _dt[i];
                var html =
                    '<div class="card">' +
                    '<div class="card-header" id="heading_' + _countCollap + '" name="heading_' + _countCollap + '">' +
                    '<button onclick="DetailAuditStrategyRisk(id)" class="btn collapsed" data-toggle="collapse" data-target="#collapse_' + _countCollap + '" aria-expanded="false" aria-controls="collapse_' + _countCollap + '" id="' + obj.id + '"><i class="fa fa-plus"></i>&emsp;'
                    + obj.auditfacilities_name +
                    '</button>' +
                    '</div>' +
                    '<div id="collapse_' + _countCollap + '" class="collapse" aria-labelledby="heading_' + _countCollap + '" data-parent="#accordion">' +
                    '<div class="card-body">' +
                    '<h5>' + "Đánh giá sơ bộ" + '</h5>' +
                    '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
                    '<textarea name="Note" class="form-control mb-3" id="NoteCKE_' + _countCollap + '">' + (obj.brief_review != "" ? obj.brief_review : dfhtml) +
                    '</textarea>' +
                    '</div>' +
                    '<h5 class="mt-3">' + "Rủi ro chính và chiến lược kiểm toán" + '</h5>' +
                    '<button class="btn btn-info" data-toggle="modal" data-target="#modalCreateRisk" onclick="ClearData();" id="' + obj.id + '">'
                    + "Thêm rủi ro" +
                    '</button>' +
                    '<div class="table-responsive custom-table-scroll ">' +
                    '<table id="Table_' + obj.id + '" class="table table-striped table-bordered zero-configuration">' +
                    '<thead class="contain-header-custom m-gray">' +
                    '<tr>' +
                    '<th style="text-align: center; max-width: 2%">' + "STT" + '</th>' +
                    '<th style="text-align: center;">' + "Tên rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Mô tả" + '</th>' +
                    '<th style="text-align: center;">' + "Mức độ rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Chiến lược KT" + '</th>' +
                    '<th style="text-align: center;">' + "Tác vụ" + '</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="Body_' + obj.id + '" class="contain-tbody-custom">' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div class="col-md-12 row mb-3">' +
                    '<label class="col-form-label col-lg-1" for="Path">' + "File đính kèm" +
                    '</label>' +
                    '<div class="col-lg-11">' +
                    '<input type="file" class="custorm" onchange="ChangeFile(' + _countCollap + ')" id="Path_' + _countCollap + '" name="Path_' + _countCollap + '" multiple>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-12 row mb-3">' +
                    '<label  class="col-form-label col-lg-1">' +
                    '</label>' +
                    '<div class="col-lg-10 FileDetailClass_' + obj.id + '" style=" display: flex; flex-direction: column;" id="FileDetail_' + _countCollap + '" name="FileDetail_' + obj.id + '">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                cardHeader.append(html);
                CKEDITOR.replace("NoteCKE_" + _countCollap + "", {
                    height: 300,
                    disableObjectResizing: true
                });
                $("#FileDetail_" + _countCollap).empty();
                if (obj.list_files !== undefined && obj.list_files !== null && obj.list_files.length > 0) {
                    var _append_data = "";
                    for (var z = 0; z < obj.list_files.length; z++) {
                        var objfile = obj.list_files[z];
                        var _arraypath = (objfile.path == undefined || objfile.path == null) ? [] : objfile.path.replaceAll("/", "\\").split("\\");
                        var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                        _append_data += "<div>";
                        _append_data += '<a href="javascript:DownloadFilePrepareAuditPlan(' + objfile.id + ');"><span>' + file_name + '</span></a>';
                        _append_data += '   <a href="javascript:deletefile(' + objfile.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                        _append_data += "</div>";
                    }
                    $("#FileDetail_" + _countCollap).append(_append_data);
                }
                _countCollap++;
            }
        } else {
            var cardHeader = $('#unitInformationEdit #accordion');
            cardHeader.html('');
        }
    }
}
function creatRisk() {
    var obj = {
        'auditwork_scope_id': _idauditstrategyrisk,
        'name_risk': $('#nameRiskCreate').val().trim(),
        'description': $('#descriptionCreate').val().trim(),
        'risk_level': $('#riskLevelCreate').val(),
        'audit_strategy': $('#auditStrategyCreate').val().trim(),
    }
    if (validateRequired('#frmCreateRisk')) {
        callApi_auditservice(
            apiConfig.api.auditplan.controller,
            apiConfig.api.auditplan.action.createauditstrategyrisk.path,
            apiConfig.api.auditplan.action.createauditstrategyrisk.method,
            obj, 'creatRiskSuccess', 'msgError');
    }
}

function creatRiskSuccess(data) {
    if (data.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Thêm mới rủi ro hoạch cuộc kiểm toán");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        $('#modalCreateRisk').modal('hide');
        DetailAuditStrategyRisk(_idauditstrategyrisk);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 50);
    }
}
function DetailAuditStrategyRisk(id) {
    _idauditstrategyrisk = id;
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.auditworkdetailcollapse.path + "/" + id,
        apiConfig.api.auditplan.action.auditworkdetailcollapse.method,
        null, 'fnDetailCollapse', 'msgError');
}
function fnDetailCollapse(res) {
    if (res !== undefined && res !== null && res.code === '1') {
        var data = res.data;
        var tbBody = $("#Body_" + data.id + "");
        var tbBodyDetail = $("#BodyDetail_" + data.id + "");
        $("#Table_" + data.id + "").dataTable().fnDestroy();
        $("#TableDetail_" + data.id + "").dataTable().fnDestroy();
        tbBody.html('');
        tbBodyDetail.html('');
        if (data.listauditstrategyrisk !== undefined && data.listauditstrategyrisk !== null) {
            var dt = data.listauditstrategyrisk;
            for (var i = 0; i < dt.length; i++) {
                var obj = dt[i];
                var _risklevel = (obj.risk_level == 1 ? "Cao" : (obj.risk_level == 2 ? "Trung bình" : (obj.risk_level == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td class="text-center"></td>' +
                    '<td>' + obj.name_risk + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + _risklevel + '</td>' +
                    '<td>' + obj.audit_strategy + '</td>' +
                    '<td class="col-action">' +
                    '<a type="button" data-toggle="modal" data-target="#modalEditRisk" class="btn icon-default btn-action-custom" onclick="EditAuditStrategyRisk(' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteAuditStrategyRisk(\'' + obj.name_risk + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
                var htmldetail = '<tr>' +
                    '<td class="text-center"></td>' +
                    '<td>' + obj.name_risk + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + _risklevel + '</td>' +
                    '<td>' + obj.audit_strategy + '</td>' +
                    '</tr>';
                tbBodyDetail.append(htmldetail);
            }
            var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
            var t = $("#Table_" + data.id + "").DataTable({
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                //"scrollX": true,
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
                        "targets": 0,
                        "searchable": false,
                        "orderable": false
                    }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            //t.on('order.dt search.dt', function () {
            //    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            //        cell.innerHTML = i + page_size + 1;
            //    });
            //}).draw();
            reCalculatPagesCustom(res.total);
            viewBtnActionPage();
            hideLoading();
            //table chi tiết
            var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
            var t = $("#TableDetail_" + data.id + "").DataTable({
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                //"scrollX": true,
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
                        "targets": 0,
                        "searchable": false,
                        "orderable": false
                    }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            //t.on('order.dt search.dt', function () {
            //    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            //        cell.innerHTML = i + page_size + 1;
            //    });
            //}).draw();
            reCalculatPagesCustom(res.total);
            viewBtnActionPage();
            hideLoading();
        }
        else if (res.data == "") {
            var tbBody = $("#Body_" + data.id + "");
            $("#Table_" + data.id + "").dataTable().fnDestroy();
            tbBody.html('');

            var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
            var t = $("#Table_" + data.id + "").DataTable({
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
                        "targets": 0,
                        "searchable": false,
                        "orderable": false
                    }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            //t.on('order.dt search.dt', function () {
            //    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            //        cell.innerHTML = i + page_size + 1;
            //    });
            //}).draw();
            reCalculatPagesCustomNull();
            hideLoading();

            //table chi tiết
            var tbBodyDetail = $("#BodyDetail_" + data.id + "");
            $("#TableDetail_" + data.id + "").dataTable().fnDestroy();
            tbBodyDetail.html('');
            var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
            var t = $("#TableDetail_" + data.id + "").DataTable({
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
                        "targets": 0,
                        "searchable": false,
                        "orderable": false
                    }],
                "order": [],
                "drawCallback": function (settings) {
                    $('[data-toggle="tooltip"]').tooltip();
                },
            });
            //t.on('order.dt search.dt', function () {
            //    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            //        cell.innerHTML = i + page_size + 1;
            //    });
            //}).draw();
            reCalculatPagesCustomNull();
            hideLoading();
        }
        if (data.list_file !== undefined && data.list_file !== null && data.list_file.length > 0) {
            $(".FileDetailClass_" + data.id).empty();
            if (data.list_file !== undefined && data.list_file !== null && data.list_file.length > 0) {
                var _append_data = "";
                for (var z = 0; z < data.list_file.length; z++) {
                    var objfile = data.list_file[z];
                    var _arraypath = (objfile.path == undefined || objfile.path == null) ? [] : objfile.path.replaceAll("/", "\\").split("\\");
                    var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                    _append_data += "<div>";
                    _append_data += '<a href="javascript:DownloadFilePrepareAuditPlan(' + objfile.id + ');"><span>' + file_name + '</span></a>';
                    _append_data += '   <a href="javascript:deletefile(' + objfile.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                    _append_data += "</div>";
                }
                $(".FileDetailClass_" + data.id).append(_append_data);
            }
        }
    }
}
//Xóa tab 2
//function DeleteAuditPersonnel(fullName, id) {
//    var _name = String(fullName);
//    swal({
//        title: "Thông báo",
//        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
//        type: 'warning',
//        showCancelButton: !0,
//    }, function (isConfirm) {
//        if (isConfirm) {
//            fnDeleteAuditPersonnel(id);
//        }
//    });
//}
//function fnDeleteAuditPersonnel(id) {
//    callApi_auditservice(
//        apiConfig.api.auditassignment.controller,
//        apiConfig.api.auditassignment.action.delete.path + "/" + id,
//        apiConfig.api.auditassignment.action.delete.method,
//        null, 'fnDeleteAuditPersonnelSuccess', 'msgError');
//}
//function fnDeleteAuditPersonnelSuccess(rspn) {
//    if (rspn.code === '1') {
//        swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
//        fnGetDetail(3, rspn.id);
//    }
//    else {
//        swal("Error!", "Xóa dữ liệu không thành công!", "error");
//    }
//}
//xóa tab 2

//Xóa tab 3
function DeleteAuditWorkScope(fullName, id) {
    var _name = String(fullName);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditWorkScope(id);
        }
    });
}
function fnDeleteAuditWorkScope(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteauditworkscope.path + "/" + id,
        apiConfig.api.auditplan.action.deleteauditworkscope.method,
        null, 'fnDeleteAuditWorkScopeSuccess', 'msgError');
}
function fnDeleteAuditWorkScopeSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        fnGetDetail(3, rspn.id);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
//xóa tab 3

//Xóa tab 4
function DeleteSchedule(fullName, id) {
    var _name = String(fullName);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteSchedule(id);
        }
    });
}
function fnDeleteSchedule(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteschedule.path + "/" + id,
        apiConfig.api.auditplan.action.deleteschedule.method,
        null, 'fnDeleteScheduleSuccess', 'msgError');
}
function fnDeleteScheduleSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        fnGetDetail(3, rspn.id);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
//xóa tab 4

//Xóa tab 5
function DeleteAuditStrategyRisk(fullName, id) {
    var _name = String(fullName);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteDeleteAuditStrategyRisk(id);
        }
    });
}
function fnDeleteDeleteAuditStrategyRisk(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteauditstrategyrisk.path + "/" + id,
        apiConfig.api.auditplan.action.deleteauditstrategyrisk.method,
        null, 'fnDeleteAuditStrategyRisk', 'msgError');
}
function fnDeleteAuditStrategyRisk(res) {
    if (res.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Xóa rủi ro của kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        DetailAuditStrategyRisk(res.auditwork_scope_id);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}
//xóa tab 5



$(document).on("click", "li.nav-item", function () {
    $("li.nav-item").removeAttr("style");
    $(this).css("border-bottom-color", "#2f80ed");
})
//function LoadAuditWork() {
//setTimeout(function () {
//    callApi_oneselectperson("PersonInCharge", "Chọn người phụ trách..",
//        apiConfig.api.host_user_service,
//        apiConfig.api.systemuser.controller,
//        apiConfig.api.systemuser.action.selectaudiWork.path);
//}, 100);
//}
//function LoadAuditWWorkEdit() {
//setTimeout(function () {
//    callApi_oneselectperson("PersonInChargeEdit", "Chọn người phụ trách..",
//        apiConfig.api.host_user_service,
//        apiConfig.api.systemuser.controller,
//        apiConfig.api.systemuser.action.selectaudiWork.path);
//}, 100);
//}
function AddRow() {
    if ($('#auditworkNum2table > tbody').length > 0) {
        var table_row = "";
        table_row += '<tr> ' +
            ' <td><select onchange="clickName(this)" class="form-control usersid" id="Users_' + _indexPersonnel + '" name="Users_' + _indexPersonnel + '" style="padding:0;"></td>' +
            ' <td><input disabled type="text" class="form-control picker email" id="Email_' + _indexPersonnel + '" name="Email_' + _indexPersonnel + '"></td>' +
            '<td class="col-action" id="userName_' + _indexPersonnel + '">' +
            '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
            '</td>' +
            ' </tr>';
        $("#auditworkNum2body").append(table_row);
        callApi_oneselect1("Users_" + _indexPersonnel, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
        var recount = 0;
        $("#auditworkNum2table > tbody > tr").each(function (i, v) {
            recount++;
        });
        _indexPersonnel++;
        //}
    } else {
        _indexPersonnel = 0;
        var table_row = "";
        table_row += '<tr> ' +
            ' <td><select onchange="clickName(this)" class="form-control usersid" id="Users_' + _indexPersonnel + '" name="Users_' + _indexPersonnel + '" style="padding:0;"></td>' +
            ' <td><input disabled type="text" class="form-control picker email" id="Email_' + _indexPersonnel + '" name="Email_' + _indexPersonnel + '"></td>' +
            '<td class="col-action" id="userName_' + _indexPersonnel + '">' +
            '<a class="btn icon-delete btn-action-custom" onclick="DeleteRow(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
            '</td>' +
            ' </tr>';
        $("#auditworkNum2body").append(table_row);
        callApi_oneselect1("Users_" + _indexPersonnel, "Chọn người dùng..", apiConfig.api.host_user_service, apiConfig.api.systemuser.controller, apiConfig.api.systemuser.action.selectaudiWork.path);
        var recount = 0;
        $("#auditworkNum2table > tbody > tr").each(function (i, v) {
            recount++;
        });
        _indexPersonnel++;
    }
}
//thêm row tab 4
function AddRowTabNum4() {
    var table_row = "";
    //_countSchedule ++;
    table_row += '<tr> ' +
        ' <td style="text-align: center; width: 15%"><input type="text" class="form-control picker work" id="Work_' + _countSchedule + '" name="Work_' + _countSchedule + '"></td>' +
        ' <td style="width: 5%"><select class="form-control usersauditassignmentid" id="UsersAuditAssignment_' + _countSchedule + '" name="UsersAuditAssignment_' + _countSchedule + '" style="padding:0;"></td>' +
        ' <td style="text-align: center; width: 7%"><input type="date" class="form-control picker expecteddate" id="ExpectedDate_' + _countSchedule + '" name="ExpectedDate_' + _countSchedule + '"></td>' +
        '<td style="text-align: center; width: 2%" class="col-action">' +
        //'<a class="btn icon-default btn-action-custom" onclick="SaveChange(this)"><i data-toggle="tooltip" title="Lưu" class="fas fa-save" aria-hidden="true"></i></a>' +
        '<a class="btn icon-delete btn-action-custom" onclick="DeleteRowTabNum4(this)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
        '</td>' +
        ' </tr>';
    $("#auditworkNum4body").append(table_row);
    callapi_multipleselect_auditassaignment("UsersAuditAssignment_" + _countSchedule, "Chọn người ...",
        apiConfig.api.host_audit_service,
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));
    var recount = 0;
    $("#auditworkNum4body > tbody > tr").each(function (i, v) {
        recount++;
    });
    var listmapping = {
        auditwork_id: parseInt(localStorage.getItem('id')),
        work: $("#Work_" + _countSchedule).val().trim(),
        user_id: $("#UsersAuditAssignment_" + _countSchedule).val(),
        expected_date: $("#ExpectedDate_" + _countSchedule).val(),
    }
    list_schedule.push(listmapping);
    _countSchedule++;
}
var arrPersonnel = [];//mảng Nhân sự được chọn
var arrChangePersonnel = [];// mảng khi thay đổi Nhân sự KT
function clickName(elment) {
    listprepareaudit.splice(0);
    _userid = "";
    _userid = $(elment).attr('id');
    var _user = $(elment).val();
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.detailuseraudiwork.path + "/" + _user,
        apiConfig.api.systemuser.action.detailuseraudiwork.method,
        null, 'findEmail', 'msgError');
    checkPersonnel();
}

function findEmail(rspn) {
    var data = rspn.data;
    $("#auditworkNum2body").find('#' + _userid).closest('td').next().find('.email').val(data.email)
}
function DataDropPersonnel(rspn) {//dữ liệu dropdown nhân sự KT
    arrDefaulPersonnel = rspn.data;
    checkPersonnel();
}
function checkPersonnel() {// check trùng tên
    arrPersonnel.splice(0);
    var props = ['id', 'full_name', 'email'];
    if ($('#auditworkNum2table > tbody > tr').length != 0) {
        for (var z = 0; z < _indexPersonnel; z++) {
            var listauditassignment = {
                id: parseInt($("#Users_" + z).val()),
                full_name: $("#Users_" + z).text(),
                email: $("#Email_" + z).val(),
            }
            arrPersonnel.push(listauditassignment);
            callApi_oneselect1("Users_" + z, "Chọn người dùng..",
                apiConfig.api.host_user_service,
                apiConfig.api.systemuser.controller,
                apiConfig.api.systemuser.action.selectaudiWork.path);
        }
        arrChangePersonnel = arrDefaulPersonnel.filter(function (o1) {
            return !arrPersonnel.some(function (o2) {
                return o1.id === o2.id;
            });
        }).map(function (o) {
            return props.reduce(function (newo, name) {
                newo[name] = o[name];
                return newo;
            }, {});
        });
        //arrDefaulPersonnel = arrChangePersonnel;
    }
}
//xóa Nhân sự KT
function DeleteRow(element) {
    arrPersonnel.splice(0);
    arrChangePersonnel.splice(0);
    loadDataDropdownPersonnel();
    var $tr = $(element).closest("tr");
    $tr.remove();
    var recount = 0;
    $("#auditworkNum2table > tbody > tr").each(function (i, v) {
        recount++;
    });
    if ($('#auditworkNum2table > tbody > tr').length == 0) {
        arrChangePersonnel.splice(0);
    }
    else {
        checkPersonnel();
    }
}
function DeleteRowTabNum4(element) {
    var $tr = $(element).closest("tr");
    $tr.remove();
    var recount = 0;
    $("#auditworkNum4table > tbody > tr").each(function (i, v) {
        recount++;
    });
}
function submitEdit() {
    list_schedule.splice(0);
    arrauditworkscope.splice(0);
    _listworkscope.splice(0);
    listprepareaudit.splice(0);
   
    for (var z = 0; z < _indexPersonnel; z++) {//tab 2
        var listauditassignment = {
            user_id: $("#Users_" + z).val(),
            auditwork_id: $('#IdEdit').val(),
        }
        listprepareaudit.push(listauditassignment);
    }
    for (var i = 0; i < /*$('#auditworkNum4table > tbody  > tr').length*/_countSchedule; i++) {
        var listmappingschedule = {
            auditwork_id: parseInt(localStorage.getItem('id')),
            work: $("#Work_" + i).val(),
            user_id: $("#UsersAuditAssignment_" + i).val(),
            expected_date: $("#ExpectedDate_" + i).val(),
        }
        list_schedule.push(listmappingschedule);
    }
    for (var i = 0; i < $('#auditworkNum3table > tbody  > tr').length; i++) {
        var listmappingworkscope = {
            id: _dataAuditWorkId[i],
            audit_team_leader: $("#Leader_" + i).val(),
            auditor: $("#Auditor_" + i).val(),
        }
        arrauditworkscope.push(listmappingworkscope);
    }
    for (var i = 0; i < $('#unitInformationEdit #accordion .card').length; i++) {
        var objworkscope = {
            'id': _dataAuditWorkScopeFacilityId[i],
            'brief_review': $.trim(CKEDITOR.instances["NoteCKE_" + i].getData()),
        }
        var check = false;
        var formData = new FormData();
        formData.append("data", JSON.stringify(objworkscope));
        var input = $("#Path_" + i);
        var validImageTypes = ["doc", "docx", "xls", "xlsx", "pdf", "jpg", "png", "jpeg", "mp3", "mp4", "rar", "zip"];
        if (input[0].files) {

            $.each(input[0].files, function (i, v) {
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
            if (check != true) {
                callApi_auditservice_update(
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.uploadfile.path,
                    formData, '', 'msgError');
            }
        }
        //var listmapping = {
        //    id: _dataAuditWorkId[i],
        //    brief_review: $.trim(CKEDITOR.instances["NoteCKE_" + i].getData()),
        //    /*path: $("#Path_" + i).val(),*/
        //}
        //_listworkscope.push(listmapping)
    }
    //if ($('#unitInformationEdit #accordion .card').length == 0) {
    var data = {
        'id': $('#IdEdit').val(),
        'year': $('#YearEdit').val().trim(),
        'code': $('#CodeEdit').val().trim(),
        'name': $('#NameEdit').val().trim(),
        'target': $('#TargetEdit').val().trim(),
        'person_in_charge': $('#PersonInChargeEdit').val(),
        'classify': $('#ClassifyEdit').val(),
        'start_date': $('#FromDateEdit').val(),
        'end_date_planning': $('#EndDatePlanningEdit').val(),
        'start_date_real': $('#StartDateRealEdit').val(),
        'release_date': $('#ReleaseDateEdit').val(),
        'end_date': $('#ToDateEdit').val(),
        'from_date': $('#fromDEdit').val(),
        'to_date': $('#toDEdit').val(),
        'num_of_workdays': $('#NumberWorkdayEdit').val() == '' ? null : $('#NumberWorkdayEdit').val(),
        'num_of_auditor': $('#NumberAuditorsEdit').val() != null ? $('#NumberAuditorsEdit').val() : null,
        'execution_status_str': $('#StatusSuccessEdit').val(),
        //'budget': $.trim(CKEDITOR.instances["NoteCKEUp"].getData()),
        'auditplan_id': _auditplanId,
        "audit_scope_outside": $('#OutsideAudit').val().trim(),
        "audit_scope": $('#AuditScopeEdit').val().trim(),
        "listauditpersonnel": listprepareaudit,
        "listauditworkscope": arrauditworkscope,
        "listschedule": list_schedule,
    }
    if (check != true) {
        if (validateRequired('#generalInformationEdit')) {

            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.prepareauditupdate.path,
                apiConfig.api.auditplan.action.prepareauditupdate.method,
                data, 'updateAuditWorkSuccess', 'msgError');
        }
    }
}

function updateAuditWorkSuccess(data) {
    if (data.code === '1') {
        var check = false;
        var valCKE = $('#NoteCKEUp').val();
        if (valCKE != undefined) {
            var objupdate = {
                'id': $('#IdEdit').val(),
                'budget': $.trim(CKEDITOR.instances["NoteCKEUp"].getData()),
            }
            if (check != true) {
                if (validateRequired('#generalInformationEdit')) {
                    callApi_auditservice(
                        apiConfig.api.auditplan.controller,
                        apiConfig.api.auditplan.action.budgetupdate.path,
                        apiConfig.api.auditplan.action.budgetupdate.method,
                        objupdate, '', 'msgError');
                }
            }
        }
        var valCKEOther = $('#NoteCKEOther').val();
        if (valCKEOther != undefined) {
            var objupdateother = {
                'id': $('#IdEdit').val(),
                'other': $.trim(CKEDITOR.instances["NoteCKEOther"].getData()),
            }
            if (check != true) {
                if (validateRequired('#generalInformationEdit')) {
                    callApi_auditservice(
                        apiConfig.api.auditplan.controller,
                        apiConfig.api.auditplan.action.otherupdate.path,
                        apiConfig.api.auditplan.action.otherupdate.method,
                        objupdateother, '', 'msgError');
                }
            }
        }
        createdLog("Kế hoạch cuộc kiểm toán", "Cập nhật kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        setTimeout(function () {
            openView(3, localStorage.getItem('id'));
        }, 2000);

    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}


function EditAuditStrategyRisk(id) {
    clearMsgInvalid();
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.detailauditstrategyrisk.path + "/" + id,
        apiConfig.api.auditplan.action.detailauditstrategyrisk.method,
        null, 'fnAuditStrategyRiskSuccess', 'msgError');
}
function fnAuditStrategyRiskSuccess(rspn) {
    var frmModify = $("#frmEditRisk");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmModify.find("#IdRisk").val(data.id);
        frmModify.find("#IdAuditWorkScope").val(data.auditwork_scope_id);
        frmModify.find("#nameRiskEdit").val(data.name_risk);
        frmModify.find("#descriptionEdit").val(data.description);
        frmModify.find("#riskLevelEdit").val(data.risk_level);
        frmModify.find("#auditStrategyEdit").val(data.audit_strategy);
    }
}
function editRisk() {
    var obj = {
        'id': $('#IdRisk').val(),
        'auditwork_scope_id': $('#IdAuditWorkScope').val(),
        'name_risk': $('#nameRiskEdit').val().trim(),
        'description': $('#descriptionEdit').val().trim(),
        'risk_level': $('#riskLevelEdit').val(),
        'audit_strategy': $('#auditStrategyEdit').val().trim(),
    }
    if (validateRequired('#frmEditRisk')) {
        callApi_auditservice(
            apiConfig.api.auditplan.controller,
            apiConfig.api.auditplan.action.editauditstrategyrisk.path,
            apiConfig.api.auditplan.action.editauditstrategyrisk.method,
            obj, 'editRiskSuccess', 'msgError');
    }
}

function editRiskSuccess(data) {
    if (data.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Cập nhật rủi ro của kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        $('#modalEditRisk').modal('hide');
        DetailAuditStrategyRisk(_idauditstrategyrisk);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 70);
    }
}

function DeleteAuditWork(id) {
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
            fnDeleteAuditWork(data.id);
        }
    });
}

function fnDeleteAuditWork(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteauditwork.path + "/" + id,
        apiConfig.api.auditplan.action.deleteauditwork.method,
        null, 'fnDeleteAuditWorkSuccess', 'msgError');
}
function fnDeleteAuditWorkSuccess(rspn) {
    if (rspn.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Xóa kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }

}
window.onload = function () {
    setTimeout(function () {
        getStatus();
    }, 50);
    type = 0;
    id = 0;
    setTimeout(function () {
        openView(type, id);
    }, 100);
}

//modal chon pham vi
function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search_apply_for').html('');
    $('#search_apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#search_apply_for').append(html);
}
function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');
}
function showModalScope() {
    loadCategory();

    setTimeout(function () {
        getCatRiskLevel()
    }, 120);
    $('#TypeDisplay').val(-1);
    changeStageValue();
    ChangeTypeDisplay();
    var tbBody = $('#tblRiskScore tbody');
    $("#tblRiskScore").dataTable().fnDestroy();
    tbBody.html('');
}

function ChangeTypeDisplay() {
    var _all = $("#TableViewAll");
    var _dv = $("#TableViewDonVi");
    var _hd = $("#TableViewHoatDong");
    var _qt = $("#TableViewQuyTrinh");

    if ($('#TypeDisplay').val() == -1) {
        $('#search_apply_for').prop('disabled', false);
        $('#search_apply_for').val('').change();
    }
    else {
        if ($('#TypeDisplay').val() == 1) {
            $('#search_apply_for').val("DV").change();
        }
        if ($('#TypeDisplay').val() == 2) {
            $('#search_apply_for').val("HDKD").change();
        }
        if ($('#TypeDisplay').val() == 3) {
            $('#search_apply_for').val("QT").change();
        }
        $('#search_apply_for').prop('disabled', true);
    }
    $("#search_apply_for").change(function () {
        var tbBody = $('#tblRiskScore tbody');
        tbBody.html('');
        $("#tblRiskScore").dataTable().fnDestroy();
        var value = $(this).val();
        if (value == "") {
            $("#TypeShowTable").val(0);
            $("#checkAll").prop('checked', false);
            _all.show();
            _dv.hide();
            _hd.hide();
            _qt.hide();
            $("#checkAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem").not(this).prop('checked', this.checked);
                var tablenew = $(this).closest("table");
                tablenew.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "DV") {
            $("#TypeShowTable").val(1);
            $("#checkDonViAll").prop('checked', false);
            _all.hide();
            _dv.show();
            _hd.hide();
            _qt.hide();
            $("#checkDonViAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem").not(this).prop('checked', this.checked);
                var tablenew = $(this).closest("table");
                tablenew.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "HDKD") {
            $("#TypeShowTable").val(2);
            $("#checkHoatDongAll").prop('checked', false);
            _all.hide();
            _dv.hide();
            _hd.show();
            _qt.hide();
            $("#checkHoatDongAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem").not(this).prop('checked', this.checked);
                var tablenew = $(this).closest("table");
                tablenew.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
        if (value == "QT") {
            $("#TypeShowTable").val(3);
            $("#checkQuyTrinhAll").prop('checked', false);
            _all.hide();
            _dv.hide();
            _hd.hide();
            _qt.show();
            $("#checkQuyTrinhAll").click(function () {
                var table = $(this).closest("table");
                table.find(".checkitem").not(this).prop('checked', this.checked);
                var tablenew = $(this).closest("table");
                tablenew.find(".checkitem_temp").not(this).prop('checked', this.checked);
            });
        }
    });
}
function changeStageValue() {
    if ($('#search-stage').val() == 3) {
        $('#search-stage_value').prop('disabled', false);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').addClass('required');
    }
    else {
        $('#search-stage_value').prop('disabled', true);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').removeClass('required');
    }
}

function getCatRiskLevel() {
    var obj = {
        'name': '',
        'status': '1',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_userservice(
        apiConfig.api.catrisklevel.controller,
        apiConfig.api.catrisklevel.action.search.path,
        apiConfig.api.catrisklevel.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillCatRiskLevel');
}
function onSearchScope() {
    var obj = {
        'year': $('#search-year').val() == isNaN ? null : parseInt($('#search-year').val()),
        'stage': $('#search-stage').val() == isNaN ? null : parseInt($('#search-stage').val()),
        'value': $('#search-stage_value').val() == isNaN ? null : parseInt($('#search-stage_value').val()),
        'apply_for': $('#search_apply_for').val(),
        'risk_level': $('#search-risk_level').val(),
        'keyprocess': $('#QuyTrinhSearch').val().trim(),
        'keyfacility': $('#DonViSearch').val().trim(),
        'keyactive': $('#HoatDongSearch').val().trim(),
    };
    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.resultSearchScope.path,
        apiConfig.api.scoreboard.action.resultSearchScope.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccessScope');
}
function fnSearchSuccessScope(rspn) {
    var tbBody = $('#tblRiskScore tbody');
    $("#tblRiskScore").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.data.length > 0) {
        var data = rspn.data;
        var applay_for = $('#search_apply_for').val();
        if (applay_for == "") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr>' +
                    '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + viewValue(obj.apply_for) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td>' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id + '" />' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
        else if (applay_for == "DV") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkitem checkDonViItem" id="checkDonViItem" name="checkDonViItem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '" />';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0) {
                    inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkDonViItem" id="checkDonViItem" name="checkDonViItem" style="margin: auto;" />';
                }
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                var html = '<tr class="' + rowCls + ' show">' +
                    '<td style="text-align:center">' + btnShow + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td>' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    inputCheck
                    //(obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0 ? '<input type="checkbox" class="form-control checkDonViItem" id="checkDonViItem" name="checkDonViItem"/>'
                    //: '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id +'"/>'
                    //) 
                    +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0)
                    html += getHtmlChildDVSearchDetail(obj.sub_activities, obj.id)
                tbBody.append(html);
            }

        }
        else if (applay_for == "HDKD") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkitem checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + obj.id + '" />';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0) {
                    inputCheck = '<input type="checkbox" class="form-control checkitem_temp checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem" style="margin: auto;" />';
                }
                var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
                var colId = 'collapRow' + obj.id;
                var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
                    '<button style="padding: 0 2px 0 2px;border: 1px solid #d5dce5 !important;vertical-align: middle;" type="button" class="btn btn-collapse shown" data-target=".' + colId + '">'
                    + '<i class="fas fa-minus" aria-hidden="true"></i></button>';
                var html = '<tr class="' + rowCls + ' show">' +
                    '<td class="' + rowCls + '" style="text-align:center">' + btnShow + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +

                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td class="text-center">' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    inputCheck
                    //(obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0 ? '<input type="checkbox" class="form-control checkHoatDongItem" id="checkHoatDongItem" name="checkHoatDongItem"/>'
                    //: '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id +'" />'
                    //)
                    +
                    '</td>' +
                    '</tr>';
                if (obj.sub_activities != undefined && obj.sub_activities != null && obj.sub_activities.length > 0)
                    html += getHtmlChildHDKDSearchDetail(obj.sub_activities, obj.id)
                tbBody.append(html);
            }
        }
        else if (applay_for == "QT") {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr>' +
                    '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                    '<td>' + viewValue(obj.object_code) + '</td>' +
                    '<td>' + viewValue(obj.assessment_object) + '</td>' +
                    '<td>' + viewValue(obj.facility_name) + '</td>' +
                    '<td>' + viewValue(obj.activity_name) + '</td>' +
                    '<td>' + (viewValue(obj.risk_level_name) != "" ? obj.risk_level_name : viewValue(obj.risk_level)) + '</td>' +
                    '<td>' + obj.last_audit + '</td>' +
                    '<td>' + viewValue(obj.audit_cycle) + '</td>' +
                    '<td>' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="col-action">' +
                    '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + obj.id + '"/>' +
                    '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
    }
    collapseDelegate();
}
$(document).on('click', '#checkAll', function () {
    var table = $(this).closest("table");
    table.find(".checkitem").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViItem', function () {
    var table = $(this).closest("tr").next().find("table");
    table.find(".checkitem").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViDetailItem', function () {
    var table = $(this).closest("table");
    table.find(".checkitem").not(this).prop('checked', this.checked);
});
$(document).on('click', '#checkAll', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViItem', function () {
    var table = $(this).closest("tr").next().find("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkHoatDongItem', function () {
    var table = $(this).closest("tr").next().find("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkDonViDetailItem', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
$(document).on('click', '.checkHoatDongDetailItem', function () {
    var table = $(this).closest("table");
    table.find(".checkitem_temp").not(this).prop('checked', this.checked);
});
function getHtmlChildDVSearchDetail(childs, objectid) {
    var _html = '';
    if (childs != null && childs.length > 0) {
        var colId = 'collapRow' + objectid;
        _html += '<tr class="' + colId + ' show"><td></td><td colspan="7">';
        var __html = '<table class="table"><thead class="contain-header-custom m-gray" style="background: #bde4f6 !important;">' +
            '<tr>' +
            '<th scope="col" style="width: 10rem">Mã quy trình</th>' +
            '<th scope="col" style="width: 20rem">Tên quy trình</th>' +
            '<th scope="col" style="width: 20rem">Hoạt động liên quan</th>' +
            '<th scope="col" style="width: 4rem" ><input type="checkbox" class="form-control checkitem_temp checkDonViDetailItem" id="checkDonViDetailItem" name="checkDonViDetailItem" /></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            __html += '<tr>' +
                '<td>' + viewValue(obj.process_code) + '</td>' +
                '<td>' + viewValue(obj.process_name) + '</td>' +
                '<td>' + viewValue(obj.activity_name) + '</td>' +
                '<td class="col-action">' +
                '<input type="checkbox" class="form-control checkitem" id="checkitem" name="checkitem" value="' + obj.id + '" data-mainid="' + objectid + '"/>' +
                '</td>' +
                '</tr>';
        }
        __html += '</tbody></table>';
        _html += __html;
        _html += '</td></tr>';
    }
    return _html;
}
function getHtmlChildHDKDSearchDetail(childs, objectid) {
    var _html = '';
    if (childs != null && childs.length > 0) {
        var colId = 'collapRow' + objectid;
        _html += '<tr class="' + colId + ' show"><td></td><td colspan="7">';
        var __html = '<table class="table"><thead style="background: #bde4f6 !important;">' +
            '<tr>' +
            '<th scope="col" style="width: 10rem">Mã quy trình</th>' +
            '<th scope="col" style="width: 20rem">Tên quy trình</th>' +
            '<th scope="col" style="width: 20rem">Đơn vị liên quan</th>' +
            '<th scope="col" style="width: 4rem"><input type="checkbox" class="form-control checkitem_temp checkHoatDongDetailItem" id="checkHoatDongDetailItem" name="checkHoatDongDetailItem" style="margin: auto;" /></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            __html += '<tr>' +
                '<td>' + viewValue(obj.process_code) + '</td>' +
                '<td>' + viewValue(obj.process_name) + '</td>' +
                '<td>' + viewValue(obj.facility_name) + '</td>' +
                '<td class="col-action">' +
                '<input type="checkbox" class="form-control checkitem_temp checkitem" id="checkitem" name="checkitem" style="margin: auto;" value="' + obj.id + '" data-mainid="' + objectid + '"/>' +
                '</td>' +
                '</tr>';
        }
        __html += '</tbody></table>';
        _html += __html;
        _html += '</td></tr>';
    }
    return _html;
}
function onSubmitScope() {
    var list_asign = [];
    //$('#tblRiskScore tbody td .checkitem:checked').each(function (i, v) {
    //    var lst_item = {
    //        'select_id': $(v).val(),
    //        'main_id': $(v).data("mainid"),
    //        'apply_for': $("#search_apply_for").val(),
    //    }
    //    list_asign.push(lst_item);
    //});
    $('#tblRiskScore tbody td .checkitem:checked').each(function (i, v) {
        var lst_item = {
            'select_id': $(v).val(),
            'main_id': $(v).data("mainid"),
            'apply_for': $("#search_apply_for").val(),
            'year': $("#search-year").val(),
        }
        list_asign.push(lst_item);
    });
    var obj = {
        'list_asign': list_asign,
    }
    //var listassign = list_asign.join();
    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.getDataScopeResult.path,
        apiConfig.api.scoreboard.action.getDataScopeResult.method,
        obj, 'fnAddScope');
}
function fnAddScope(rspn) {
    var _type = $("#formAddScope").find("#DoAction").val();
    if (_type == "0") {
        var tbBody = $('#auditworkNum3table tbody');
        $("#auditworkNum3table").dataTable().fnDestroy();
        var html = '';
        var tbBody_facility = $('#auditscopeFacility tbody');
        $("#auditscopeFacility").dataTable().fnDestroy();
        var html_facility = '';
        if (rspn !== undefined && rspn !== null && rspn.code === '1') {
            var data = rspn.data;
            html += getHtmlScopeNoTree(data);
            tbBody.append(html);

            var data_facility = rspn.data_facility;
            for (var i = 0; i < data_facility.length; i++) {
                var obj = data_facility[i];
                var check = true;
                var last_audit_time;
                if (obj.last_audit_time) {
                    last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
                }
                $("#auditscopeFacility > tbody > tr").each(function (i, v) {
                    if ($(v).find(".facility").val() == obj.facility_id) {
                        check = false;
                    }
                })
                if (check == true) {
                    html_facility += '<tr>' +
                        '<td style="text-align:center;width: 8%">' + (i + 1) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                        '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                        '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                        '<td class="col-action" style="width: 5% !important;">' +
                        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScopeFacility(this,0)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                        '</td>' +
                        '</tr>';
                }
            }
            tbBody_facility.append(html_facility);
        }

        var t = $("#auditworkNum3table").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0],
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
                cell.innerHTML = i + 1;
            });
        }).draw();
        $('#modalSelectScope').modal('hide');
        openView(3, $('#IdEdit').val());
    }
    else {
        var tbBody = $('#auditworkNum3table tbody');
        $("#auditworkNum3table").dataTable().fnDestroy();
        var html = '';
        var tbBodyAuditScopeFacilitytable = $('#auditscopeFacilitytable tbody');
        $("#auditscopeFacilitytable").dataTable().fnDestroy();
        var htmlAuditScopeFacility = '';
        if (rspn !== undefined && rspn !== null && rspn.code === '1') {
            var data = rspn.data;
            //html += getHtmlEditScopeNoTree(data);
            getHtmlEditScopeNoTree(data);
            tbBody.append(html);
            var dataAuditScopeFacility = rspn.data_facility;
            /*htmlAuditScopeFacility += */getHtmlEditAuditScopeFacilityNoTree(dataAuditScopeFacility);
            tbBodyAuditScopeFacilitytable.append(htmlAuditScopeFacility);
        }
        var tt = $("#auditworkNum3table").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        tt.on('order.dt search.dt', function () {
            tt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        //$('#modalSelectScope').modal('hide');
        var tt1 = $("#auditscopeFacilitytable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "columnDefs": [{
                "targets": [0],
                "searchable": false,
                "orderable": false
            }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        tt1.on('order.dt search.dt', function () {
            tt1.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        $('#modalSelectScope').modal('hide');
        openView(3, $('#IdEdit').val());
    }
}

function getHtmlScopeNoTree(childs) {
    var html = '';
    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            var check = true;
            var last_audit_time;
            if (obj.last_audit_time) {
                last_audit_time = $.format.date(obj.last_audit_time, 'MM/yyyy')
            }
            $("#auditworkNum3table > tbody > tr").each(function (i, v) {
                if ($(v).find(".board_id").val() == obj.id && $(v).find(".process").val() == obj.process_id) {
                    check = false;
                }
            })
            if (check == true) {
                html += '<tr>' +
                    '<td style="text-align:center;width: 8%">' + rowNo(1, 9999, j) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
                    '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
                    '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
                    '<td class="col-action" style="width: 5% !important;">' +
                    '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,0)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';
            }
        }
    }
    return html;
}
function getHtmlEditScopeNoTree(childs) {
    //var html = '';
    if (childs != null && childs.length > 0) {
        for (var j = 0; j < childs.length; j++) {
            var obj = childs[j];
            var data = {
                'auditwork_id': $('#IdEdit').val(),
                'year': $('#YearEdit').val(),
                'score_board_id': obj.id,
                'auditprocess_id': obj.process_id,
                'bussinessactivities_id': obj.activity_id,
                'auditfacilities_id': obj.facility_id,
                'auditprocess_name': obj.process_name,
                'auditfacilities_name': obj.facility_name,
                'bussinessactivities_name': obj.activity_name,
                'reason': obj.audit_reason,
                'risk_level': obj.risk_level,
                //'risk_rating_name': obj.risk_level_name,
            }
            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.createauditworkscope.path,
                apiConfig.api.auditplan.action.createauditworkscope.method,
                data, '', 'msgError');
            //var check = true;
            //$("#auditworkNum3table > tbody > tr").each(function (i, v) {
            //    if ($(v).find(".board_id").val() == obj.id && $(v).find(".process").val() == obj.process_id) {
            //        check = false;
            //    }
            //})
            //if (check == true) {
            //    html += '<tr class="rowedit" >' +
            //        '<td style="text-align:center;width: 8%">' + rowNo(1, 9999, j) + '</td>' +
            //        '<td class="line-break"><input type="hidden" class="board_id" value="' + viewValue(obj.id) + '"  /><input type="hidden" class="process" value="' + viewValue(obj.process_id) + '"  data-text="' + viewValue(obj.process_name) + '"/>' + viewValue(obj.process_name) + '</td>' +
            //        '<td class="line-break"><input type="hidden" class="facility" value="' + viewValue(obj.facility_id) + '"  data-text="' + viewValue(obj.facility_name) + '"/>' + viewValue(obj.facility_name) + '</td>' +
            //        '<td class="line-break"><input type="hidden" class="activity" value="' + viewValue(obj.activity_id) + '"  data-text="' + viewValue(obj.activity_name) + '"/>' + viewValue(obj.activity_name) + '</td>' +
            //        '<td class="line-break"><input type="hidden" class="audit_reason" value="' + viewValue(obj.audit_reason) + '"  />' + viewValue(obj.audit_reason) + '</td>' +
            //        '<td class="line-break">' + (viewValue(obj.risk_level_name) != "" ? '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level_name) + '"  />' + viewValue(obj.risk_level_name) : '<input type="hidden" class="risk_level" value="' + viewValue(obj.risk_level) + '"  />' + viewValue(obj.risk_level)) + '</td>' +
            //        '<td class="line-break"><input type="hidden" class="last_audit" value="' + viewValue(obj.last_audit_time) + '"  />' + viewValue(obj.last_audit) + '</td>' +
            //        '<td><select class="form-control leaderId" id="Leader_' + j + '" name="Leader_' + j + '" style="padding:0;"></td>' +
            //        '<td><select class="form-control auditorId" id="Auditor_' + j + '" name="Auditor_' + j + '" style="padding:0;"></td>' +
            //        '<td class="col-action" style="width: 5% !important;">' +
            //        '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteRowScope(this,1)"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
            //        '</td>' +
            //        '</tr>';

            //}
            //setTimeout(function () {
            //    callApi_oneselectperson("Leader_" + j, "",
            //        apiConfig.api.host_user_service,
            //        apiConfig.api.systemuser.controller,
            //        apiConfig.api.systemuser.action.selectaudiWork.path);
            //    //if (childs[j].audit_team_leader) {
            //    //    var value_audit_team_leader = childs[j].audit_team_leader;
            //    //    var newOptionLeader = new Option(value_audit_team_leader.split(':')[1], value_audit_team_leader.split(':')[0], true, true);
            //    //    $("#scopeEdit").find("#Leaders_" + j).append(newOptionLeader).trigger('change');
            //    //}
            //}, 200);


            //setTimeout(function () {
            //    callApi_selectmulti("Auditor_" + j, "",
            //        apiConfig.api.host_user_service,
            //        apiConfig.api.systemuser.controller,
            //        apiConfig.api.systemuser.action.selectaudiWork.path);
            //    //var _list = childs[j].auditor;
            //    //if (_list) {
            //    //    var arr_data = _list.split(', ');
            //    //    if (arr_data.length > 0) {
            //    //        $(arr_data).each(function () {
            //    //            var newOptionAuditor = new Option(this.split(':')[1], this.split(':')[0], true, true);
            //    //            $("#scopeEdit").find("#Auditors_" + j).append(newOptionAuditor).trigger('change');
            //    //        });
            //    //        var valueAuditor = $("#Auditors_" + j).val();
            //    //    }
            //    //    var _leaderId = $("#Leaders_" + j).val();
            //    //    var listmapping = {
            //    //        id: childs[j].id,
            //    //        audit_team_leader: _leaderId,
            //    //        auditor: valueAuditor,
            //    //    }
            //    //    arrauditworkscope.push(listmapping);
            //    //}
            //}, 200);


        }
        //openView(3, $('#IdEdit').val());
    }
    //return html;
}
function getHtmlEditAuditScopeFacilityNoTree(res) {
    if (res != null && res.length > 0) {
        for (var j = 0; j < res.length; j++) {
            var obj = res[j];
            var data = {
                'auditwork_id': $('#IdEdit').val(),
                'year': $('#YearEdit').val(),
                'score_board_id': obj.id,
                'auditfacilities_id': obj.facility_id,
                'auditfacilities_name': obj.facility_name,
                'reason': obj.audit_reason,
                'risk_rating_name': obj.risk_level,
                'last_audit_time': obj.last_audit_time,
            }
            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.createauditworkscopefacility.path,
                apiConfig.api.auditplan.action.createauditworkscopefacility.method,
                data, '', 'msgError');
        }
        //openView(3, $('#IdEdit').val());
    }
}
function SelectOption() {
    clearMsgInvalid();
    if ($('#ClassifyCreate').val() == 1) {
        $('#flowPlan').show();
        $('#unFlowPlan').hide();
    } else {
        $('#flowPlan').hide();
        $('#unFlowPlan').show();
    }
}
//function LoadYear() {
//    callapi_selectyearapproved("YearCreateDrop", "Chọn cuộc kiểm toán...",
//        apiConfig.api.host_audit_service,
//        apiConfig.api.auditplan.controller,
//        apiConfig.api.auditplan.action.selectyearapproved.path);
//}
//function setValueYearCreate(elment) {
//    $('#NameAuditCreateDrop').val(null).trigger('change');
//    var _year = $(elment).val();
//    callapi_selectnameauditwork("NameAuditCreateDrop", "Chọn cuộc kiểm toán...",
//        apiConfig.api.host_audit_service,
//        apiConfig.api.auditplan.controller,
//        apiConfig.api.auditplan.action.selectnameauditwork.path + "?" + "year" + "=" + parseInt(_year));
//}
function submitAuditWorkCreate() {
    if ($('#ClassifyCreate').val() == 1) {
        var obj = {
            'classify': $('#ClassifyCreate').val(),
            'year': $('#YearCreateDrop').val(),
            'name': $('#NameAuditCreateDrop').val(),
        }
        if (validateRequired('#flowPlan')) {
            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.createauditwork.path,
                apiConfig.api.auditplan.action.createauditwork.method,
                obj, 'auditWorkCreateSuccess', 'msgError');
        }
    } else {
        var obj = {
            'classify': $('#ClassifyCreate').val(),
            'year': $('#YearCreate').val().trim(),
            'name': $('#NameAuditCreate').val().trim(),
        }
        if (validateRequired('#unFlowPlan')) {
            callApi_auditservice(
                apiConfig.api.auditplan.controller,
                apiConfig.api.auditplan.action.createauditwork.path,
                apiConfig.api.auditplan.action.createauditwork.method,
                obj, 'auditWorkCreateSuccess', 'msgError');
        }
    }
}
function auditWorkCreateSuccess(rs) {
    if (rs.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Thêm mới kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        openView(3, rs.idAuditWork);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rs.code), 'Error', { progressBar: true }) }, 50);
    }
}
function fnDetailSuccess(rspn) {
    var frmDetail = $("#generalInformationDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        //tab số 1
        var data = rspn.data;
        _auditplanId = data.auditplan_id;
        $("#generalInformationDetail").clearQueue();
        frmDetail.find("#IdDetail").val(data.id);
        frmDetail.find("#YearDetail").val(data.year);
        $("#scopeDetail").find("#OutsideAudit").val(data.audit_scope_outside);
        frmDetail.find("#CodeDetail").val(data.code);
        frmDetail.find("#NameDetail").val(data.name);
        frmDetail.find("#TargetDetail").val(data.target);
        if (data.str_person_in_charge) {
            var _value = data.str_person_in_charge;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#PersonInChargeDetail").append(newOption).trigger('change');
        }
        frmDetail.find("#ClassifyDetail").val(data.classify);
        frmDetail.find("#FromDateDetail").val(data.start_date);
        frmDetail.find("#EndDatePlanningDetail").val(data.end_date_planning);
        frmDetail.find("#StartDateRealDetail").val(data.start_date_real);
        frmDetail.find("#ReleaseDateDetail").val(data.release_date);
        frmDetail.find("#ToDateDetail").val(data.end_date);
        frmDetail.find("#StatusSuccessDetail").val(data.execution_status_str);
        frmDetail.find("#StatusDetail").val(data.statusName);
        frmDetail.find("#NumberAuditorsDetail").val(data.num_of_auditor);
        frmDetail.find("#NumberWorkdayDetail").val(data.num_of_workdays);

        frmDetail.find("#ApprovalFunctionFileDetail").empty();

        frmDetail.find("#fromDDetail").val(data.from_date);
        frmDetail.find("#toDDetail").val(data.to_date);
        $("#scopeDetail").find("#AuditScopeDettail").val(data.audit_scope);

        if (data.list_approval_function_file != undefined && data.list_approval_function_file != null && data.list_approval_function_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_approval_function_file.length; i++) {
                var obj = data.list_approval_function_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileApproval(' + obj.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#ApprovalFunctionFileDetail").append(_append_data);
        }

        //Tab số 2
        var tbBody = $('#auditworkpersonnelDetailtable tbody');
        $("#auditworkpersonnelDetailtable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditpersonnel !== undefined && data.listauditpersonnel !== null) {
            var data_ = data.listauditpersonnel;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    /*'<td style="" class="text-center">' + (i + 1) + '</td>' +*/
                    '<td>' + obj.fullName + '</td>' +
                    '<td class="line-break">' + obj.email + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
        //Tab số 3
        var tbBodyN3 = $('#auditworkscopeDetailtable tbody');
        $("#auditworkscopeDetailtable").dataTable().fnDestroy();
        tbBodyN3.html('');
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            arrauditworkscope.splice(0);
            var data_ = data.listauditworkscope;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditprocess_name + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + obj.bussinessactivities_name + '</td>' +
                    '<td>' + obj.reason + '</td>' +
                    '<td>' + obj.risk_rating + '</td>' +
                    '<td>' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '<td><select disabled class="form-control leaderid" id="LeaderDetail_' + i + '" name="LeaderDetail_' + i + '" style="padding:0;"></td>' +
                    '<td><select disabled class="form-control auditorid" id="AuditorDetail_' + i + '" name="AuditorDetail_' + i + '" style="padding:0;"></td>' +
                    '</tr>';
                tbBodyN3.append(html);
                callApi_oneselectperson("LeaderDetail_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                if (data_[i].audit_team_leader) {
                    var value_audit_team_leader = data_[i].audit_team_leader;
                    var newOptionLeader = new Option(value_audit_team_leader.split(':')[1], value_audit_team_leader.split(':')[0], true, true);
                    $("#scopeDetail").find("#LeaderDetail_" + i).append(newOptionLeader).trigger('change');
                }


                callApi_selectmulti("AuditorDetail_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                var _list = data_[i].auditor;
                if (_list) {
                    var arr_data = _list.split(', ');
                    if (arr_data.length > 0) {
                        $(arr_data).each(function () {
                            var newOptionAuditor = new Option(this.split(':')[1], this.split(':')[0], true, true);
                            $("#scopeDetail").find("#AuditorDetail_" + i).append(newOptionAuditor).trigger('change');
                        });
                        var valueAuditor = $("#AuditorDetail_" + i).val();
                    }
                    var _leaderId = $("#LeaderDetail_" + i).val();
                    var listmapping = {
                        id: data_[i].id,
                        audit_team_leader: _leaderId,
                        auditor: valueAuditor,
                    }
                    arrauditworkscope.push(listmapping);
                }
                _dataAuditWorkId.push(data_[i].id);
            }
        }

        //table auditscopeFacility
        var tbBodyauditscopeFacilityDetailtable = $('#auditscopeFacilityDetailtable tbody');
        $("#auditscopeFacilityDetailtable").dataTable().fnDestroy();
        tbBodyauditscopeFacilityDetailtable.html('');
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var data_ = data.listauditfacility;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + (obj.reason == null ? "" : obj.reason) + '</td>' +
                    '<td>' + (obj.risk_rating == null ? "" : obj.risk_rating) + '</td>' +
                    '<td class="text-center">' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '</tr>';
                tbBodyauditscopeFacilityDetailtable.append(html);
            }
        }
        //Tab số 4
        var tbBodyN4 = $('#auditworkscheduleDetailtable tbody');
        $("#auditworkscheduleDetailtable").dataTable().fnDestroy();
        tbBodyN4.html('');
        if (data.listschedule !== undefined && data.listschedule !== null) {
            var data_ = data.listschedule;
            _countSchedule = data_.length;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                var html = '<tr>' +
                    //'<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td><input disabled type="text" class="form-control picker work" id="WorkDetail_' + i + '" name="WorkDetail_' + i + '"></td>' +
                    '<td><select disabled class="form-control useid" id="UsersAuditAssignmentDetail__' + i + '" name="UsersAuditAssignmentDetail__' + i + '" style="padding:0;"></td>' +
                    '<td class="text-center"><input disabled type="date" class="form-control picker expecteddate" id="ExpectedDateDetail_' + i + '" name="ExpectedDateDetail_' + i + '"></td>' +
                    '</tr>';
                tbBodyN4.append(html);
                callapi_multipleselect_auditassaignment("UsersAuditAssignmentDetail__" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));

                if (data_[i].str_person_in_charge) {
                    var value_str_person_in_charge = data_[i].str_person_in_charge;
                    var newOptionSchedule = new Option(value_str_person_in_charge.split(':')[1], value_str_person_in_charge.split(':')[0], true, true);
                    $("#scheduleDetail").find("#UsersAuditAssignmentDetail__" + i).append(newOptionSchedule).trigger('change');
                }
                $("#scheduleDetail").find("#WorkDetail_" + i).val(obj.work);
                $("#scheduleDetail").find("#ExpectedDateDetail_" + i).val(obj.expected_date);
                var listmapping = {
                    auditwork_id: data_[i].auditwork_id,
                    work: data_[i].work,
                    user_id: data_[i].user_id,
                    expected_date: data_[i].expected_date,
                    //actual_date: data_[i].actual_date,
                }
                list_schedule.push(listmapping);
            }
        }
        //tab số 5
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var _dt = data.listauditfacility;
            _countCollap = 0;
            var cardHeader = $('#unitInformationDetail #accordionDetail');
            cardHeader.html('');
            $('#unitInformationDetail #accordionDetail').html("");
            for (var i = 0; i < _dt.length; i++) {
                var obj = _dt[i];
                var html =
                    '<div class="card">' +
                    '<div class="card-header" id="headingDetail_' + _countCollap + '" name="headingDetail_' + _countCollap + '">' +
                    '<button onclick="DetailAuditStrategyRisk(id)" class="btn collapsed" data-toggle="collapse" data-target="#collapseDetail_' + _countCollap + '" aria-expanded="false" aria-controls="collapseDetail_' + _countCollap + '" id="' + obj.id + '"><i class="fa fa-plus"></i>&emsp;'
                    + obj.auditfacilities_name +
                    '</button>' +
                    '</div>' +
                    '<div id="collapseDetail_' + _countCollap + '" class="collapse" aria-labelledby="headingDetail_' + _countCollap + '" data-parent="#accordionDetail">' +
                    '<div class="card-body">' +
                    '<h5>' + "Đánh giá sơ bộ" + '</h5>' +
                    '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
                    '<textarea disabled name="Note" class="form-control mb-3" id="NoteCKEDetail_' + _countCollap + '">' + (obj.brief_review != null ? obj.brief_review : "") +
                    '</textarea>' +
                    '</div>' +
                    '<h5 class="mt-3">' + "Rủi ro chính và chiến lược kiểm toán" + '</h5>' +
                    '<div class="table-responsive custom-table-scroll ">' +
                    '<table id="TableDetail_' + obj.id + '" class="table table-striped table-bordered zero-configuration">' +
                    '<thead class="contain-header-custom m-gray">' +
                    '<tr>' +
                    '<th style="text-align: center; max-width: 2%">' + "STT" + '</th>' +
                    '<th style="text-align: center;">' + "Tên rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Mô tả" + '</th>' +
                    '<th style="text-align: center;">' + "Mức độ rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Chiến lược KT" + '</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="BodyDetail_' + obj.id + '" class="contain-tbody-custom">' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div class="col-md-12 row mb-3">' +
                    '<label class="col-form-label col-lg-1" for="Path">' + "File đính kèm" +
                    '</label>' +
                    '<div class="col-lg-11" style=" display: flex; flex-direction: column;" id="FileDetails_' + _countCollap + '">' +
                    '</div>' +
                    //'<div class="col-lg-11 mt-2">' +
                    //'<a href="javascript:DownloadFilePrepareAuditPlan(' + obj.id + ')">' +
                    //'<span id="PathDetail_' + _countCollap + '">' + obj.filename + '</span>' +
                    //'</a>' +
                    //'</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                cardHeader.append(html);
                CKEDITOR.replace("NoteCKEDetail_" + _countCollap + "", {
                    height: 300,
                    disableObjectResizing: true
                });
                $("#FileDetails_" + _countCollap).empty();
                if (obj.list_files !== undefined && obj.list_files !== null && obj.list_files.length > 0) {
                    var _append_data = "";
                    for (var z = 0; z < obj.list_files.length; z++) {
                        var objfile = obj.list_files[z];
                        var _arraypath = (objfile.path == undefined || objfile.path == null) ? [] : objfile.path.replaceAll("/", "\\").split("\\");
                        var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                        _append_data += '<a href="javascript:DownloadFilePrepareAuditPlan(' + objfile.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
                    }
                    $("#FileDetails_" + _countCollap).append(_append_data);
                }
                _countCollap++;
            }
        } else {
            var cardHeader = $('#unitInformationDetail #accordionDetail');
            cardHeader.html('');
        }
    }
}

function LoadSubmitApproval() {
    setTimeout(function () {
        callApi_oneselect_submitapproval("Approved", "Chọn người gửi..",
            apiConfig.api.host_audit_service,
            apiConfig.api.auditplan.controller,
            apiConfig.api.auditplan.action.selectusertype.path);
    }, 100);
}
function submitApproval() {
    LoadSubmitApproval();
    $('#Approved').val(null).trigger('change');
    var id = $('#IdSendBrowse').val();
    $("#formModalSubmitApproval").find("#IdAuditWork").val(parseInt(id));
}
//Gửi duyệt
function onclickSubmitApproval() {
    var user_id = parseInt($('#Approved').val());
    var _idAuditWork = parseInt($('#IdSendBrowse').val());
    if (validateRequired('#formModalSubmitApproval')) {
        var obj = {
            'item_id': _idAuditWork,
            'item_type': 2,
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
        //    apiConfig.api.auditplan.controller,
        //    apiConfig.api.auditplan.action.sendbrowseauditwork.path + "/" + _idAuditWork + "?" + "user_id" + "=" + user_id,
        //    apiConfig.api.auditplan.action.sendbrowseauditwork.method,
        //    null, 'SubmitApprovalSuccess', 'msgError');
        var obj = {
            'item_id': _idAuditWork,
            'approvaluser': user_id,
            'function_name': "Kế hoạch cuộc kiểm toán",
            'function_code': "M_PAP",
        }
        callApi_userservice(
            apiConfig.api.approvalfunction.controller,
            apiConfig.api.approvalfunction.action.requestapproval.path,
            apiConfig.api.approvalfunction.action.requestapproval.method,
            obj, 'SubmitApprovalSuccess');
    }

}

function SubmitApprovalSuccess(rs) {
    if (rs.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Gửi duyệt Kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.SendBrowse, { progressBar: true })
        //localStorage.removeItem("id");
        //localStorage.removeItem("type");
        $('#modalSubmitApproval').modal('hide');
        //openView(0, 0);
        setTimeout(function () {
            window.location.href = "/PrepareAuditPlan"
        }, 1000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rs.code), 'Error', { progressBar: true }) }, 50);
    }
}
function fnCensorshipSuccess(rspn) {
    var frmCensorship = $("#generalInformationCensorship");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        //tab số 1
        var data = rspn.data;
        _auditplanId = data.auditplan_id;
        frmCensorship.find("#statusCodeCensorship").val(data.status);
        $("#generalInformationCensorship").clearQueue();
        frmCensorship.find("#IdCensorship").val(data.id);
        frmCensorship.find("#YearCensorship").val(data.year);
        $("#scopeCensorship").find("#OutsideAudit").val(data.audit_scope_outside);
        frmCensorship.find("#CodeCensorship").val(data.code);
        frmCensorship.find("#NameCensorship").val(data.name);
        frmCensorship.find("#TargetCensorship").val(data.target);
        if (data.str_person_in_charge) {
            var _value = data.str_person_in_charge;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmCensorship.find("#PersonInCensorship").append(newOption).trigger('change');
        }
        frmCensorship.find("#ClassifyCensorship").val(data.classify);
        frmCensorship.find("#FromDateCensorship").val(data.start_date);
        frmCensorship.find("#EndDatePlanningCensorship").val(data.end_date_planning);
        frmCensorship.find("#StartDateRealCensorship").val(data.start_date_real);
        frmCensorship.find("#ReleaseDateCensorship").val(data.release_date);
        frmCensorship.find("#ToDateCensorship").val(data.end_date);
        frmCensorship.find("#StatusSuccessCensorship").val(data.execution_status_str);
        frmCensorship.find("#StatusCensorship").val(data.statusName);
        frmCensorship.find("#NumberAuditorsCensorship").val(data.num_of_auditor);
        frmCensorship.find("#NumberWorkdayCensorship").val(data.num_of_workdays);

        frmCensorship.find("#fromDCensorship").val(data.from_date);
        frmCensorship.find("#toDCensorship").val(data.to_date);
        $("#scopeCensorship").find("#AuditScopeCensorship").val(data.audit_scope);
        //Tab số 2
        var tbBody = $('#auditworkpersonnelCensorshiptable tbody');
        $("#auditworkpersonnelCensorshiptable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditpersonnel !== undefined && data.listauditpersonnel !== null) {
            var data_ = data.listauditpersonnel;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    /*'<td style="" class="text-center">' + (i + 1) + '</td>' +*/
                    '<td>' + obj.fullName + '</td>' +
                    '<td class="line-break">' + obj.email + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
        //Tab số 3
        var tbBodyN3 = $('#auditworkscopeCensorshiptable tbody');
        $("#auditworkscopeCensorshiptable").dataTable().fnDestroy();
        tbBodyN3.html('');
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            arrauditworkscope.splice(0);
            var data_ = data.listauditworkscope;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditprocess_name + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + obj.bussinessactivities_name + '</td>' +
                    '<td>' + obj.reason + '</td>' +
                    '<td>' + obj.risk_rating + '</td>' +
                    '<td class="text-center">' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '<td><select disabled class="form-control leaderid" id="LeaderCensorship_' + i + '" name="LeaderCensorship_' + i + '" style="padding:0;"></td>' +
                    '<td><select disabled class="form-control auditorid" id="AuditorCensorship_' + i + '" name="AuditorCensorship_' + i + '" style="padding:0;"></td>' +
                    '</tr>';
                tbBodyN3.append(html);
                callApi_oneselectperson("LeaderCensorship_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                if (data_[i].audit_team_leader) {
                    var value_audit_team_leader = data_[i].audit_team_leader;
                    var newOptionLeader = new Option(value_audit_team_leader.split(':')[1], value_audit_team_leader.split(':')[0], true, true);
                    $("#scopeCensorship").find("#LeaderCensorship_" + i).append(newOptionLeader).trigger('change');
                }


                callApi_selectmulti("AuditorCensorship_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                var _list = data_[i].auditor;
                if (_list) {
                    var arr_data = _list.split(', ');
                    if (arr_data.length > 0) {
                        $(arr_data).each(function () {
                            var newOptionAuditor = new Option(this.split(':')[1], this.split(':')[0], true, true);
                            $("#scopeCensorship").find("#AuditorCensorship_" + i).append(newOptionAuditor).trigger('change');
                        });
                        var valueAuditor = $("#AuditorCensorship_" + i).val();
                    }
                    var _leaderId = $("#LeaderCensorship_" + i).val();
                    var listmapping = {
                        id: data_[i].id,
                        audit_team_leader: _leaderId,
                        auditor: valueAuditor,
                    }
                    arrauditworkscope.push(listmapping);
                }
                _dataAuditWorkId.push(data_[i].id);
            }
        }
        //table auditscopeFacility
        var tbBodyauditscopeFacilityCensorshiptable = $('#auditscopeFacilityCensorshiptable tbody');
        $("#auditscopeFacilityCensorshiptable").dataTable().fnDestroy();
        tbBodyauditscopeFacilityCensorshiptable.html('');
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var data_ = data.listauditfacility;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + (obj.reason == null ? "" : obj.reason) + '</td>' +
                    '<td>' + (obj.risk_rating == null ? "" : obj.risk_rating) + '</td>' +
                    '<td class="text-center">' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '</tr>';
                tbBodyauditscopeFacilityCensorshiptable.append(html);
            }
        }
        //Tab số 4
        var tbBodyN4 = $('#auditworkscheduleCensorshiptable tbody');
        $("#auditworkscheduleCensorshiptable").dataTable().fnDestroy();
        tbBodyN4.html('');
        if (data.listschedule !== undefined && data.listschedule !== null) {
            var data_ = data.listschedule;
            _countSchedule = data_.length;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                var html = '<tr>' +
                    //'<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td><input disabled type="text" class="form-control picker work" id="WorkCensorship_' + i + '" name="WorkCensorship_' + i + '"></td>' +
                    '<td><select disabled class="form-control useid" id="UsersAuditAssignmentCensorship__' + i + '" name="UsersAuditAssignmentCensorship__' + i + '" style="padding:0;"></td>' +
                    '<td><input disabled type="date" class="form-control picker expecteddate" id="ExpectedDateCensorship_' + i + '" name="ExpectedDateCensorship_' + i + '"></td>' +
                    '</tr>';
                tbBodyN4.append(html);
                callapi_multipleselect_auditassaignment("UsersAuditAssignmentCensorship__" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));

                if (data_[i].str_person_in_charge) {
                    var value_str_person_in_charge = data_[i].str_person_in_charge;
                    var newOptionSchedule = new Option(value_str_person_in_charge.split(':')[1], value_str_person_in_charge.split(':')[0], true, true);
                    $("#scheduleCensorship").find("#UsersAuditAssignmentCensorship__" + i).append(newOptionSchedule).trigger('change');
                }
                $("#scheduleCensorship").find("#WorkCensorship_" + i).val(obj.work);
                $("#scheduleCensorship").find("#ExpectedDateCensorship_" + i).val(obj.expected_date);
                var listmapping = {
                    auditwork_id: data_[i].auditwork_id,
                    work: data_[i].work,
                    user_id: data_[i].user_id,
                    expected_date: data_[i].expected_date,
                    //actual_date: data_[i].actual_date,
                }
                list_schedule.push(listmapping);
            }
        }
        //tab số 5
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var _dt = data.listauditfacility;
            _countCollap = 0;
            var cardHeader = $('#unitInformationCensorship #accordionCensorship');
            cardHeader.html('');
            $('#unitInformationCensorship #accordionCensorship').html("");
            for (var i = 0; i < _dt.length; i++) {
                var obj = _dt[i];
                var html =
                    '<div class="card">' +
                    '<div class="card-header" id="headingCensorship_' + _countCollap + '" name="headingCensorship_' + _countCollap + '">' +
                    '<button onclick="CensorshipAuditStrategyRisk(id)" class="btn collapsed" data-toggle="collapse" data-target="#collapseCensorship_' + _countCollap + '" aria-expanded="false" aria-controls="collapseCensorship_' + _countCollap + '" id="' + obj.id + '"><i class="fa fa-plus"></i>&emsp;'
                    + obj.auditfacilities_name +
                    '</button>' +
                    '</div>' +
                    '<div id="collapseCensorship_' + _countCollap + '" class="collapse" aria-labelledby="headingCensorship_' + _countCollap + '" data-parent="#accordionCensorship">' +
                    '<div class="card-body">' +
                    '<h5>' + "Đánh giá sơ bộ" + '</h5>' +
                    '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
                    '<textarea disabled name="Note" class="form-control mb-3" id="NoteCKECensorship_' + _countCollap + '">' + (obj.brief_review != null ? obj.brief_review : "") +
                    '</textarea>' +
                    '</div>' +
                    '<h5 class="mt-3">' + "Rủi ro chính và chiến lược kiểm toán" + '</h5>' +
                    '<div class="table-responsive custom-table-scroll ">' +
                    '<table id="TableCensorship_' + obj.id + '" class="table table-striped table-bordered zero-configuration">' +
                    '<thead class="contain-header-custom m-gray">' +
                    '<tr>' +
                    '<th style="text-align: center; max-width: 2%">' + "STT" + '</th>' +
                    '<th style="text-align: center;">' + "Tên rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Mô tả" + '</th>' +
                    '<th style="text-align: center;">' + "Mức độ rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Chiến lược KT" + '</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="BodyCensorship_' + obj.id + '" class="contain-tbody-custom">' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div class="col-md-12 row mb-3">' +
                    '<label class="col-form-label col-lg-1" for="Path">' + "File đính kèm" +
                    '</label>' +
                    '<div class="col-lg-11" style=" display: flex; flex-direction: column;" id="FileDetailCensorship_' + _countCollap + '">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                cardHeader.append(html);
                CKEDITOR.replace("NoteCKECensorship_" + _countCollap + "", {
                    height: 300,
                    disableObjectResizing: true
                });

                $("#FileDetailCensorship_" + _countCollap).empty();
                if (obj.list_files !== undefined && obj.list_files !== null && obj.list_files.length > 0) {
                    var _append_data = "";
                    for (var z = 0; z < obj.list_files.length; z++) {
                        var objfile = obj.list_files[z];
                        var _arraypath = (objfile.path == undefined || objfile.path == null) ? [] : objfile.path.replaceAll("/", "\\").split("\\");
                        var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                        _append_data += '<a href="javascript:DownloadFilePrepareAuditPlan(' + objfile.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
                    }
                    $("#FileDetailCensorship_" + _countCollap).append(_append_data);
                }
                _countCollap++;
            }
        } else {
            var cardHeader = $('#unitInformationCensorship #accordionCensorship');
            cardHeader.html('');
        }
    }
}
//Duyệt
function submitBrowserRefuse() {
    var _idCensorship = parseInt($("#IdCensorship").val());
    var obj = {
        'item_id': _idCensorship,
        'item_type': 2,
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
        'function_name': "Kế hoạch cuộc kiểm toán",
        'function_code': "M_PAP",
    }
    callApi_userservice(
        apiConfig.api.approvalfunction.controller,
        apiConfig.api.approvalfunction.action.submitapproval.path,
        apiConfig.api.approvalfunction.action.submitapproval.method,
        obj, 'SubmitBrowserRefuseSuccess');
}

function submitContent() {
    $('#textContent').val("");
    var id = $('#IdCensorship').val();
    $("#formmodalSubmitContent").find("#IdAuditDetectModal").val(id);
}
//từ chối duyệt
function onclickSubmitContent() {
    var _idCensorship = parseInt($("#IdCensorship").val());
    var obj = {
        'item_id': _idCensorship,
        'item_type': 2,
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
        //từ chối duyệt
        var obj = {
            'item_id': _idCensorship,
            'function_name': "Kế hoạch cuộc kiểm toán",
            'function_code': "M_PAP",
            'reason_note': $("#textContent").val(),
        }
        callApi_userservice(
            apiConfig.api.approvalfunction.controller,
            apiConfig.api.approvalfunction.action.rejectapproval.path,
            apiConfig.api.approvalfunction.action.rejectapproval.method,
            obj, 'SubmitRejectApprovalSuccess');
    }
}
//từ chối duyệt
function SubmitRejectApprovalSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Từ chối duyệt thành công!", "Thông báo!", { progressBar: true });
        createdLog("Kế hoạch cuộc kiểm toán", "Từ chối duyệt Kế hoạch cuộc kiểm toán");
        setTimeout(function () {
            window.location.href = "/PrepareAuditPlan";
        }, 100);
    }
    else {
        toastr.error("Từ chối duyệt không thành công!", "Lỗi!", { progressBar: true });
    }
}
//duyêt
function SubmitBrowserRefuseSuccess(rs) {
    if (rs.code === '1') {
        createdLog("Kế hoạch cuộc kiểm toán", "Duyệt Kế hoạch cuộc kiểm toán");
        toastr.success(localizationResources.CensorshipSuccess, { progressBar: true })
        setTimeout(function () {
            window.location.href = "/PrepareAuditPlan"
        }, 100);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rs.code), 'Error', { progressBar: true }) }, 50);
    }
}
function DownloadFilePrepareAuditPlan(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + '/DownloadFileAuditWorkScope?id=' + id, 'Download');
}
function ChangeFile(index) {
    var input = $("#Path_" + index);
    if (input[0].files) {
        $("#FileOld_" + index).hide();
        input.css('color', '#333');
    } else {
        input.css('color', 'transparent');
    }
}
function fnSendBrowseSuccess(rspn) {
    var frmSendBrowse = $("#generalInformationSendBrowse");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        //tab số 1
        var data = rspn.data;

        _auditplanId = data.auditplan_id;
        $("#generalInformationSendBrowse").clearQueue();
        frmSendBrowse.find("#IdSendBrowse").val(data.id);
        frmSendBrowse.find("#YearSendBrowse").val(data.year);
        $("#scopeSendBrowse").find("#OutsideAudit").val(data.audit_scope_outside);
        frmSendBrowse.find("#CodeSendBrowse").val(data.code);
        frmSendBrowse.find("#NameSendBrowse").val(data.name);
        frmSendBrowse.find("#TargetSendBrowse").val(data.target);
        if (data.str_person_in_charge) {
            var _value = data.str_person_in_charge;
            var newOption = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmSendBrowse.find("#PersonInSendBrowse").append(newOption).trigger('change');
        }
        frmSendBrowse.find("#ClassifySendBrowse").val(data.classify);
        frmSendBrowse.find("#FromDateSendBrowse").val(data.start_date);
        frmSendBrowse.find("#EndDatePlanningSendBrowse").val(data.end_date_planning);
        frmSendBrowse.find("#StartDateRealSendBrowse").val(data.start_date_real);
        frmSendBrowse.find("#ReleaseDateSendBrowse").val(data.release_date);
        frmSendBrowse.find("#ToDateSendBrowse").val(data.end_date);
        frmSendBrowse.find("#StatusSuccessSendBrowse").val(data.execution_status_str);
        frmSendBrowse.find("#StatusSendBrowse").val(data.statusName);
        frmSendBrowse.find("#NumberAuditorsSendBrowse").val(data.num_of_auditor);
        frmSendBrowse.find("#NumberWorkdaySendBrowse").val(data.num_of_workdays);

        frmSendBrowse.find("#fromDSendBrowse").val(data.from_date);
        frmSendBrowse.find("#toDSendBrowse").val(data.to_date);
        $("#scopeSendBrowse").find("#AuditScopeSendBrowse").val(data.audit_scope);
        //Tab số 2
        var tbBody = $('#auditworkpersonnelSendBrowsetable tbody');
        $("#auditworkpersonnelSendBrowsetable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditpersonnel !== undefined && data.listauditpersonnel !== null) {
            var data_ = data.listauditpersonnel;

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var html = '<tr>' +
                    /*'<td style="" class="text-center">' + (i + 1) + '</td>' +*/
                    '<td>' + obj.fullName + '</td>' +
                    '<td class="line-break">' + obj.email + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        }
        //Tab số 3
        var tbBodyN3 = $('#auditworkscopeSendBrowsetable tbody');
        $("#auditworkscopeSendBrowsetable").dataTable().fnDestroy();
        tbBodyN3.html('');
        if (data.listauditworkscope !== undefined && data.listauditworkscope !== null) {
            arrauditworkscope.splice(0);
            var data_ = data.listauditworkscope;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditprocess_name + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + obj.bussinessactivities_name + '</td>' +
                    '<td>' + obj.reason + '</td>' +
                    '<td>' + obj.risk_rating + '</td>' +
                    '<td>' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '<td><select disabled class="form-control leaderid" id="LeaderSendBrowse_' + i + '" name="LeaderSendBrowse_' + i + '" style="padding:0;"></td>' +
                    '<td><select disabled class="form-control auditorid" id="AuditorSendBrowse_' + i + '" name="AuditorSendBrowse_' + i + '" style="padding:0;"></td>' +
                    '</tr>';
                tbBodyN3.append(html);
                callApi_oneselectperson("LeaderSendBrowse_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                if (data_[i].audit_team_leader) {
                    var value_audit_team_leader = data_[i].audit_team_leader;
                    var newOptionLeader = new Option(value_audit_team_leader.split(':')[1], value_audit_team_leader.split(':')[0], true, true);
                    $("#scopeSendBrowse").find("#LeaderSendBrowse_" + i).append(newOptionLeader).trigger('change');
                }


                callApi_selectmulti("AuditorSendBrowse_" + i, "",
                    apiConfig.api.host_user_service,
                    apiConfig.api.systemuser.controller,
                    apiConfig.api.systemuser.action.selectaudiWork.path);

                var _list = data_[i].auditor;
                if (_list) {
                    var arr_data = _list.split(', ');
                    if (arr_data.length > 0) {
                        $(arr_data).each(function () {
                            var newOptionAuditor = new Option(this.split(':')[1], this.split(':')[0], true, true);
                            $("#scopeSendBrowse").find("#AuditorSendBrowse_" + i).append(newOptionAuditor).trigger('change');
                        });
                        var valueAuditor = $("#AuditorSendBrowse_" + i).val();
                    }
                    var _leaderId = $("#LeaderSendBrowse_" + i).val();
                    var listmapping = {
                        id: data_[i].id,
                        audit_team_leader: _leaderId,
                        auditor: valueAuditor,
                    }
                    arrauditworkscope.push(listmapping);
                }
                _dataAuditWorkId.push(data_[i].id);
            }
        }
        //table auditscopeFacility
        var tbBodyauditscopeFacilitySendBrowsetable = $('#auditscopeFacilitySendBrowsetable tbody');
        $("#auditscopeFacilitySendBrowsetable").dataTable().fnDestroy();
        tbBodyauditscopeFacilitySendBrowsetable.html('');
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var data_ = data.listauditfacility;
            var count = 0;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                //var riskrating = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
                var html = '<tr>' +
                    '<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td>' + obj.auditfacilities_name + '</td>' +
                    '<td>' + (obj.reason == null ? "" : obj.reason) + '</td>' +
                    '<td>' + (obj.risk_rating == null ? "" : obj.risk_rating) + '</td>' +
                    '<td>' + (obj.auditing_time_nearest == null ? "" : obj.auditing_time_nearest) + '</td>' +
                    '</tr>';
                tbBodyauditscopeFacilitySendBrowsetable.append(html);
            }
        }
        //Tab số 4
        var tbBodyN4 = $('#auditworkscheduleSendBrowsetable tbody');
        $("#auditworkscheduleSendBrowsetable").dataTable().fnDestroy();
        tbBodyN4.html('');
        if (data.listschedule !== undefined && data.listschedule !== null) {
            var data_ = data.listschedule;
            _countSchedule = data_.length;
            for (var i = 0; i < data_.length; i++) {

                var obj = data_[i];
                var html = '<tr>' +
                    //'<td style="" class="text-center">' + (i + 1) + '</td>' +
                    '<td><input disabled type="text" class="form-control picker work" id="WorkSendBrowse_' + i + '" name="WorkSendBrowse_' + i + '"></td>' +
                    '<td><select disabled class="form-control useid" id="UsersAuditAssignmentSendBrowse__' + i + '" name="UsersAuditAssignmentSendBrowse__' + i + '" style="padding:0;"></td>' +
                    '<td><input disabled type="date" class="form-control picker expecteddate" id="ExpectedDateSendBrowse_' + i + '" name="ExpectedDateSendBrowse_' + i + '"></td>' +
                    '</tr>';
                tbBodyN4.append(html);
                callapi_multipleselect_auditassaignment("UsersAuditAssignmentSendBrowse__" + i, "",
                    apiConfig.api.host_audit_service,
                    apiConfig.api.auditplan.controller,
                    apiConfig.api.auditplan.action.selectaudiassignment.path + "?" + "auditwork_id" + "=" + localStorage.getItem('id'));

                if (data_[i].str_person_in_charge) {
                    var value_str_person_in_charge = data_[i].str_person_in_charge;
                    var newOptionSchedule = new Option(value_str_person_in_charge.split(':')[1], value_str_person_in_charge.split(':')[0], true, true);
                    $("#scheduleSendBrowse").find("#UsersAuditAssignmentSendBrowse__" + i).append(newOptionSchedule).trigger('change');
                }
                $("#scheduleSendBrowse").find("#WorkSendBrowse_" + i).val(obj.work);
                $("#scheduleSendBrowse").find("#ExpectedDateSendBrowse_" + i).val(obj.expected_date);
                var listmapping = {
                    auditwork_id: data_[i].auditwork_id,
                    work: data_[i].work,
                    user_id: data_[i].user_id,
                    expected_date: data_[i].expected_date,
                    //actual_date: data_[i].actual_date,
                }
                list_schedule.push(listmapping);
            }
        }
        //tab số 5
        if (data.listauditfacility !== undefined && data.listauditfacility !== null) {
            var _dt = data.listauditfacility;
            _countCollap = 0;
            var cardHeader = $('#unitInformationSendBrowse #accordionSendBrowse');
            cardHeader.html('');
            $('#unitInformationSendBrowse #accordionSendBrowse').html("");
            for (var i = 0; i < _dt.length; i++) {
                var obj = _dt[i];
                var html =
                    '<div class="card">' +
                    '<div class="card-header" id="headingSendBrowse_' + _countCollap + '" name="headingSendBrowse_' + _countCollap + '">' +
                    '<button onclick="SendBrowseAuditStrategyRisk(id)" class="btn collapsed" data-toggle="collapse" data-target="#collapseSendBrowse_' + _countCollap + '" aria-expanded="false" aria-controls="collapseSendBrowse_' + _countCollap + '" id="' + obj.id + '"><i class="fa fa-plus"></i>&emsp;'
                    + obj.auditfacilities_name +
                    '</button>' +
                    '</div>' +
                    '<div id="collapseSendBrowse_' + _countCollap + '" class="collapse" aria-labelledby="headingSendBrowse_' + _countCollap + '" data-parent="#accordionSendBrowse">' +
                    '<div class="card-body">' +
                    '<h5>' + "Đánh giá sơ bộ" + '</h5>' +
                    '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
                    '<textarea disabled name="Note" class="form-control mb-3" id="NoteCKESendBrowse_' + _countCollap + '">' + (obj.brief_review != null ? obj.brief_review : "") +
                    '</textarea>' +
                    '</div>' +
                    '<h5 class="mt-3">' + "Rủi ro chính và chiến lược kiểm toán" + '</h5>' +
                    '<div class="table-responsive custom-table-scroll ">' +
                    '<table id="TableSendBrowse_' + obj.id + '" class="table table-striped table-bordered zero-configuration">' +
                    '<thead class="contain-header-custom m-gray">' +
                    '<tr>' +
                    '<th style="text-align: center; max-width: 2%">' + "STT" + '</th>' +
                    '<th style="text-align: center;">' + "Tên rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Mô tả" + '</th>' +
                    '<th style="text-align: center;">' + "Mức độ rủi ro" + '</th>' +
                    '<th style="text-align: center;">' + "Chiến lược KT" + '</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="BodySendBrowse_' + obj.id + '" class="contain-tbody-custom">' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div class="col-md-12 row mb-3">' +
                    '<label class="col-form-label col-lg-1" for="Path">' + "File đính kèm" +
                    '</label>' +
                    '<div class="col-lg-11" style=" display: flex; flex-direction: column;" id="FileDetailSendBrowse_' + _countCollap + '">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                cardHeader.append(html);
                CKEDITOR.replace("NoteCKESendBrowse_" + _countCollap + "", {
                    height: 300,
                    disableObjectResizing: true
                });

                $("#FileDetailSendBrowse_" + _countCollap).empty();
                if (obj.list_files !== undefined && obj.list_files !== null && obj.list_files.length > 0) {
                    var _append_data = "";
                    for (var z = 0; z < obj.list_files.length; z++) {
                        var objfile = obj.list_files[z];
                        var _arraypath = (objfile.path == undefined || objfile.path == null) ? [] : objfile.path.replaceAll("/", "\\").split("\\");
                        var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                        _append_data += '<a href="javascript:DownloadFilePrepareAuditPlan(' + objfile.id + ',\'' + file_name + '\');"><span>' + file_name + '</span></a>';
                    }
                    $("#FileDetailSendBrowse_" + _countCollap).append(_append_data);
                }
                _countCollap++;
            }
        } else {
            var cardHeader = $('#unitInformationSendBrowse #accordionSendBrowse');
            cardHeader.html('');
        }
    }
}
function ClearData() {
    clearMsgInvalid();
    $("#frmCreateRisk").find("#nameRiskCreate").val("");
    $("#frmCreateRisk").find("#descriptionCreate").val("");
    $("#frmCreateRisk").find("#riskLevelCreate").val("1");
    $("#frmCreateRisk").find("#auditStrategyCreate").val("");
}
//chỉ nhập số
function validateIndex(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    //var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
//xóa Dữ liệu table Đơn vị kt
function DeleteAuditWorkScopeFacility(fullName, id) {
    var _name = String(fullName);
    swal({
        title: "Thông báo",
        text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditWorkScopeFacility(id);
        }
    });
}
function fnDeleteAuditWorkScopeFacility(id) {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteauditworkscopefacility.path + "/" + id,
        apiConfig.api.auditplan.action.deleteauditworkscopefacility.method,
        null, 'fnDeletefnDeleteAuditWorkScopeFacilityidSuccess', 'msgError');
}
function fnDeletefnDeleteAuditWorkScopeFacilityidSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        fnGetDetail(3, rspn.id);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
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
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.deleteauditworkscopefacilityfile.path + "/" + id,
        apiConfig.api.auditplan.action.deleteauditworkscopefacilityfile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}
function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        //swal("Thông báo!", "Xóa dữ liệu thành công!", "success");
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        var param = $("#IdEdit").val();
        //fnGetAuditWorkDetail(6, param);
        //DetailAuditStrategyRisk(_idauditstrategyrisk);
        fnGetDetail(3, param);
    }
    else {
        //swal("Lỗi!", "Xóa dữ liệu không thành công!", "error");
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
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
//Xem lịch sử
function onSearchHistoryLog(param) {
    var obj = {
        'item_id': param,
        'item_type': 2,
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
    var tbBody = $('#auditAuditWorkHistory tbody');
    $("#auditAuditWorkHistory").dataTable().fnDestroy();
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
    var t = $("#auditAuditWorkHistory").DataTable({
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

//kết xuất thông báo
//function RenderNotification(id) {
//    $("#frmRenderNotification").find("#IdAuditWork").val(id);
//    $("#frmRenderNotification").find("#YearRenderNotification").val("");
//    $("#frmRenderNotification").find("#AuditWorkRenderNotification").val("");
//    $("#frmRenderNotification").find("#AuditFacilityRenderNotification").val("");
//    $('#AuditFacilityRenderNotification').val(null).trigger('change');
//    $('#AuditFacilityRenderNotification').html('');
//    callApi_auditservice(
//        apiConfig.api.auditplan.controller,
//        apiConfig.api.auditplan.action.auditworkdetail.path + "/" + id,
//        apiConfig.api.auditplan.action.auditworkdetail.method,
//        null, "EditRenderNotification", 'msgError');
//}
function EditRenderNotification(dt) {
    if (dt !== undefined && dt !== null && dt.code === '1') {
        var data = dt.data;
        $("#frmRenderNotification").find("#YearRenderNotification").val(data.year);
        $("#frmRenderNotification").find("#AuditWorkRenderNotification").val(data.name);
    }
}
function getStatus() {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.liststatusprepareauditplan.path,
        apiConfig.api.auditplan.action.liststatusprepareauditplan.method,
        null, 'fillStatus', 'msgError');
}
function fillStatus(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#Status').html('');
    $('#Status').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value="' + obj.status_code + '">' + obj.status_name + '</option>';
    }
    $('#Status').append(html);
}
function getUpdateStatus() {
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listupdatestatusprepareauditplan.path,
        apiConfig.api.auditplan.action.listupdatestatusprepareauditplan.method,
        null, 'fillUpdateStatus', 'msgError');
}
function fillUpdateStatus(data) {
    //var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#UpdateStatus').html('');
    //$('#UpdateStatus').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option selected value="' + obj.status_code + '">' + obj.status_name + '</option>';
    }
    $('#UpdateStatus').append(html);
}
//function ClickUpdateStatus(id) {
//    $("#frmUpdateStatus").find("#IdAuditWorkUpdateStatus").val(id);
//    callApi_auditservice(
//        apiConfig.api.auditplan.controller,
//        apiConfig.api.auditplan.action.auditworkdetail.path + "/" + id,
//        apiConfig.api.auditplan.action.auditworkdetail.method,
//        null, "fnUpdateStatus", 'msgError');
//    setTimeout(function () {
//        getUpdateStatus();
//    }, 50);
//}

//function fnUpdateStatus(dt) {
//    if (dt !== undefined && dt !== null && dt.code === '1') {
//        var data = dt.data;
//        $("#frmUpdateStatus").find("#NameUpdateStatus").val(data.name);
//    }
//    changeStatus();
//}
//function changeStatus() {
//    var idStatus = $('#UpdateStatus').val();
//    var _date = $("#frmUpdateStatus #idNDTC");
//    var _reason = $("#frmUpdateStatus #idLDF");
//    _date.html('');
//    _reason.html('');
//    if (idStatus == 3.1) {//duyệt
//        $('#idNDTC').show();
//        $('#idLDF').show();
//        var html =
//            '<label class="col-form-label" for="idNDTCLabe">' +
//            "Ngày duyệt/từ chối duyệt" +
//            '<span class="text-danger">' + "*" + '</span>' +
//            '</label>' +
//            '<input type="date" class="form-control required" id="idDateChangeStatus" name="DateChangeStatus"/>';
//        _date.append(html);
//        var html1 =
//            '<label for="FileChangeStatus" class="col-form-label">' + "File đính kèm" + '</label><span class="text-danger">*</span>' +
//            '<input type="file" class="form-control required" id="FileChangeStatus" multiple/>';
//        _reason.append(html1);
//    } else if (idStatus == 3.2) {//từ chối duyệt
//        $('#idNDTC').show();
//        $('#idLDF').show();
//        var html =
//            '<label class="col-form-label" for="idNDTCLabe">' +
//            "Ngày duyệt/từ chối duyệt" +
//            '<span class="text-danger">' + "*" + '</span>' +
//            '</label>' +
//            '<input type="date" class="form-control required" id="idDateChangeStatus" name="DateChangeStatus"/>';
//        _date.append(html);
//        var html1 =
//            '<label class="col-form-label" for="idNDTC">' +
//            "Lý do từ chối" +
//            '<span class="text-danger">' + "*" + '</span>' +
//            '</label>' +
//            '<textarea type="text" class="form-control required" id="idReasonStatus" name="ReasonStatus">' +
//            '</textarea>';
//        _reason.append(html1);
//    } else {
//        $('#idNDTC').hide();
//        $('#idLDF').hide();
//        _date.html('');
//        _reason.html('');
//    }
//}
function ExportNotificationWord(id) {
    //var id = $("#IdAuditWork").val();
    //var id_dv = $("#AuditFacilityRenderNotification").val();
   
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportword.path + "/" + id/* + "?" + "id_dv" + "=" + id_dv,*/);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_ThongBaoKiemToan.docx";
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
function ExportFileWord(id) {
    //var id = $("#IdAuditWork").val();
    //var id_dv = $("#AuditFacilityRenderNotification").val();
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportfileword.path + "/" + id,);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_KeHoachCuocKT_v0.1.docx";
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
function ExportFileWordOutline(id) {
    //var id = $("#IdAuditWork").val();
    //var id_dv = $("#AuditFacilityRenderNotification").val();
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditplan.controller + apiConfig.api.auditplan.action.exportfilewordother.path + "/" + id,);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_DeCuongKiemToan_v0.1.docx";
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
//chi tiết ngân sách
function budgetTab() {
    var id = parseInt($("#IdEdit").val()) != 0 ? parseInt($("#IdEdit").val())
        : parseInt($("#IdDetail").val()) != 0 ? parseInt($("#IdDetail").val())
            : parseInt($("#IdCensorship").val()) != 0 ? parseInt($("#IdCensorship").val())
                : parseInt($("#IdSendBrowse").val());

    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.budgetdetail.path + "/" + id,
        apiConfig.api.auditplan.action.budgetdetail.method,
        null, 'DetailBudgetSuccess', 'msgError');
}

function DetailBudgetSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var cardHeader = $('#budgetEdit #accordionBudget');
        cardHeader.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Chi phí kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEUp">' + (data.budget != "" ? data.budget : "") +
            '</textarea>' +
            '</div>';

        cardHeader.append(html)
        CKEDITOR.replace("NoteCKEUp", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderDetail = $('#budgetDetail #accordionBudgetDetail');
        cardHeaderDetail.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Chi phí kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEUpDetail" disabled>' + (data.budget != null ? data.budget : "") +
            '</textarea>' +
            '</div>';

        cardHeaderDetail.append(html);
        CKEDITOR.replace("NoteCKEUpDetail", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderCensorship = $('#budgetCensorship #accordionBudgetCensorship');
        cardHeaderCensorship.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Chi phí kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEUpCensorship" disabled>' + (data.budget != null ? data.budget : "") +
            '</textarea>' +
            '</div>';

        cardHeaderCensorship.append(html);
        CKEDITOR.replace("NoteCKEUpCensorship", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderBrowse = $('#budgetSendBrowse #accordionBudgetSendBrowse');
        cardHeaderBrowse.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Chi phí kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEUpBrowse" disabled>' + (data.budget != null ? data.budget : "") +
            '</textarea>' +
            '</div>';

        cardHeaderBrowse.append(html);
        CKEDITOR.replace("NoteCKEUpBrowse", {
            height: 300,
            disableObjectResizing: true
        });
    }
}
//chi tiết tab khác
function otherTab() {
    var id = parseInt($("#IdEdit").val()) != 0 ? parseInt($("#IdEdit").val())
        : parseInt($("#IdDetail").val()) != 0 ? parseInt($("#IdDetail").val())
            : parseInt($("#IdCensorship").val()) != 0 ? parseInt($("#IdCensorship").val())
                : parseInt($("#IdSendBrowse").val());

    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.otherdetail.path + "/" + id,
        apiConfig.api.auditplan.action.otherdetail.method,
        null, 'DetailOtherSuccess', 'msgError');
}

function DetailOtherSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        var cardHeader = $('#otherEdit #accordionOther');
        cardHeader.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Đề cương kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEOther">' + (data.other != "" ? data.other : "") +
            '</textarea>' +
            '</div>';

        cardHeader.append(html)
        CKEDITOR.replace("NoteCKEOther", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderDetail = $('#otherDetail #accordionOtherDetail');
        cardHeaderDetail.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Đề cương kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEOtherDetail" disabled>' + (data.other != null ? data.other : "") +
            '</textarea>' +
            '</div>';

        cardHeaderDetail.append(html);
        CKEDITOR.replace("NoteCKEOtherDetail", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderCensorship = $('#otherCensorship #accordionOtherCensorship');
        cardHeaderCensorship.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Đề cương kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEOtherCensorship" disabled>' + (data.other != null ? data.other : "") +
            '</textarea>' +
            '</div>';

        cardHeaderCensorship.append(html);
        CKEDITOR.replace("NoteCKEOtherCensorship", {
            height: 300,
            disableObjectResizing: true
        });

        var cardHeaderBrowse = $('#otherSendBrowse #accordionOtherSendBrowse');
        cardHeaderBrowse.html('');
        //$('#budgetEdit #accordionBudget').html("");
        var html =
            '<div class="col-md-12 col-sm-12 col-12 mt-2">' +
            '<h5>' + "Đề cương kiểm toán" + '</h5>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-12 mt-2 mb-3">' +
            '<textarea name="Note" class="form-control mb-3" id="NoteCKEOtherBrowse" disabled>' + (data.other != null ? data.other : "") +
            '</textarea>' +
            '</div>';

        cardHeaderBrowse.append(html);
        CKEDITOR.replace("NoteCKEOtherBrowse", {
            height: 300,
            disableObjectResizing: true
        });
    }
}