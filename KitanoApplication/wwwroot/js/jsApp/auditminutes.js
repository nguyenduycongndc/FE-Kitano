
//tìm kiếm
function onSearch() {
    var obj = {
        'year': ($('#YearAuditWork').val() != null ? parseInt($('#YearAuditWork').val()) : $('#YearAuditWork').val()),
        'auditwork_id': ($('#AuditWork').val() != null ? parseInt($('#AuditWork').val()) : $('#AuditWork').val()),
        'auditfacilities_id': /*$('#Auditfacility').val(),*/($('#Auditfacility').val() != null ? parseInt($('#Auditfacility').val()) : $('#Auditfacility').val()),
        'status': $('#AuditMinutesStatus').val(),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditminutes.controller,
        apiConfig.api.auditminutes.action.search.path,
        apiConfig.api.auditminutes.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchAuditMinutesSuccess', 'msgError');
}
function openView(type, value) {
    $('#YearAuditWorkCreate').val(null).trigger('change');
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#YearAuditWorkCreate').html('');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');

    $('#YearAuditWorkEdit').val(null).trigger('change');
    $('#AuditWorkEdit').val(null).trigger('change');
    $('#AuditfacilityEdit').val(null).trigger('change');
    $('#YearAuditWorkEdit').html('');
    $('#AuditWorkEdit').html('');
    $('#AuditfacilityEdit').html('');

    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var detail = $("#detail");
    //var censorship = $("#censorship");
    //var sendBrowse = $("#sendBrowse");
    if (type === 0) {
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        //censorship.hide();
        //sendBrowse.hide();
        setTimeout(function () {
            onSearch();
        }, 100);
        //loadYearDefault();
    }
    else if (type === 1) {
        //$('#YearAuditWork').val(null).trigger('change');
        //$('#YearAuditWork').html('');
        localStorage.setItem("type", "1");
        clearMsgInvalid();
        index.hide();
        create.show();
        edit.hide();
        detail.hide();
    }
    else if (type === 2) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        fnGetDetail(type, value);
    }
    else if (type === 3) {
        clearMsgInvalid();
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        fnGetDetail(type, value);
    }
    else if (type === 4) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        sendBrowse.show();
        censorship.hide();
        fnGetDetail(type, value);
    }
}

function fnSearchAuditMinutesSuccess(rspn) {
    showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#AuditMinutesTable tbody');
        $("#AuditMinutesTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var status = (obj.status == 1 ? "Chưa xác nhận" : "Đã xác nhận");
            //var auditReport = (obj.audit_report == 1 ? "Có" : "Không");

            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td class="text-center">' + obj.year + '</td>' +
                '<td>' + obj.auditwork_code + '</td>' +
                '<td>' + obj.auditwork_name + '</td>' +
                '<td>' + obj.auditfacilities_name + '</td>' +
                '<td>' + status + '</td>' +
                '<td class="text-center col-action">' +
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                //'<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>' +
                ((obj.status == 1)
                    ? '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +

                ////các comment mở lại khi có quyền
                //(IsCheckPemission('M_AD', 'PER_DETAIL') === true ?
                //    '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' + obj.id + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' :
                //    '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xem chi tiết" class="fa fa-eye" aria-hidden="true" ></i></a>')
                //+
                //(((obj.status == 1 || obj.status == 4) /*&& obj.user_login_id == obj.created_by*/ && IsCheckPemission('M_AD', 'PER_EDIT') === true && obj.roleId !== 1)
                //    ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' + obj.id + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>'
                //    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>') +
                //(((obj.status == 1 || obj.status == 4) /*&& obj.user_login_id == obj.created_by*/ && IsCheckPemission('M_AD', 'PER_DEL') === true && obj.roleId !== 1)
                //    ? '<a type="button" class="btn icon-delete btn-action-custom" onclick="DeleteDetect(' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>'
                //    : '<a class="btn icon-disabled btn-action-custom btn-sm"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true" ></i></a>') +

                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' + obj.id + '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' + obj.id + '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default  btn-action-custom"  style=" display: flex;" onclick="ExportFileWord(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-word" aria-hidden="true" data-original-title="Xuất file word"></i>&nbsp Xuất file word</a>' +
                //'<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(4,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>' +
                '</li>' +

                '</ul>'
                + '</span>' +
                //các comment mở lại khi có quyền
                '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditMinutesTable").DataTable({
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
                    "targets": [0, 1, 2, 3, 4, 5, 6],
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
        var tbBody = $('#AuditMinutesTable tbody');
        $("#AuditMinutesTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditMinutesTable").DataTable({
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
                    "targets": [0, 1, 2, 3, 4, 5, 6],
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
//thêm mới
function submitCreate() {
    var obj = {
        'year': $('#YearAuditWorkCreate').val(),
        'auditwork_id': $('#AuditWorkCreate').val(),
        'auditfacilities_id': $('#AuditfacilityCreate').val(),
        'status': $('#StatusCreate').val(),
    }
    if (validateRequired('#formAuditMinutesCreate')) {
        callApi_auditservice(
            apiConfig.api.auditminutes.controller,
            apiConfig.api.auditminutes.action.createauditminutes.path,
            apiConfig.api.auditminutes.action.createauditminutes.method,
            obj, 'createAuditMinutesSuccess', 'msgError');
    }
}
function createAuditMinutesSuccess(data) {
    if (data.code === '1') {
        createdLog("Biên bản kiểm toán", "Thêm mới biên bản kiểm toán");
        toastr.success(localizationResources.CreateSuccess, { progressBar: true })
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        openView(3, parseInt(data.auditminutes_id));
        //setTimeout(function () {
        //    window.location.href = "/AuditMinutes"
        //}, 2000);
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 50);
    }
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
window.onload = function () {
    //let checkLocalStatus = localStorage.getItem('status');
    //if (checkLocalStatus == null) {
    //    localStorage.setItem('status', "-1");
    //}
    loadYearDefault();
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
function ListYearSuccess(rs) {
    var data = rs.data;
    if (data != null) {
        var newOption = new Option(data.id, data.year, true, false);
        $('#YearAuditWork').append(newOption).trigger('change');
        onSearch();
    } else {
        onSearch();
    }
    //var data = rs.data;
    //var newOption = new Option(data.id, data.year, true, false);
    //$('#YearAuditWork').append(newOption).trigger('change');
    //onSearch();
}

//change setvalue year create
function setValueYearCreate(elment) {
    $('#AuditWorkCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditWorkCreate').html('');
    $('#AuditfacilityCreate').html('');
}
//change setvalue AuditWork edit
function setValueAuditWorkCreate(elment) {
    $('#AuditfacilityCreate').val(null).trigger('change');
    $('#AuditfacilityCreate').html('');
}
function setValueYear(elment) {
    $('#AuditWork').val(null).trigger('change');
    $('#Auditfacility').val(null).trigger('change');
    $('#AuditWork').html('');
    $('#Auditfacility').html('');
}
function setValueAuditWork(elment) {
    $('#Auditfacility').val(null).trigger('change');
    $('#Auditfacility').html('');
}

//Detail
function fnGetDetail(type, param) {

    var call_back = '';
    if (type === 3) {
        call_back = 'fnEditSuccess';
    }
    else if (type === 2) {
        call_back = 'fnGetDetailSuccess';
    }
    else {
        call_back = 'fnDeleteSuccess';
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_auditservice(
        apiConfig.api.auditminutes.controller,
        apiConfig.api.auditminutes.action.getItem.path + "/" + param,
        apiConfig.api.auditminutes.action.getItem.method,
        null, call_back, 'msgError');
}

//xóa
function Delete(id) {
    fnGetDetail(null, id);
}
function fnDeleteSuccess(rspn) {
    var data = rspn.data;
    swal({
        title: "Thông báo",
        text: 'Bạn có chắc chắn muốn xoá bản ghi' + ' ' + '"' + data.auditwork_code + '"',
        type: 'warning',
        showCancelButton: !0,
    }, function (isConfirm) {
        if (isConfirm) {
            fnDeleteAuditMinutes(data.id);
            createdLog("Biên bản kiểm toán", "Xóa biên bản kiểm toán");
        }
    });
}

function fnDeleteAuditMinutes(id) {
    callApi_auditservice(
        apiConfig.api.auditminutes.controller,
        apiConfig.api.auditminutes.action.delete.path + "/" + id,
        apiConfig.api.auditminutes.action.delete.method,
        null, 'fnDeleteAuditMinutesSuccess', 'msgError');
}

function fnDeleteAuditMinutesSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }

}

//chi tiết
function fnGetDetailSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    var frmDetail = $("#formAuditMinutesDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetail.find("#IdDetail").val(data.id);

        frmDetail.find("#YearAuditWorkDetail").val(data.year);
        frmDetail.find("#AuditWorkCodeDetail").val(data.auditwork_code);

        frmDetail.find("#AuditWorkDetail").val(data.auditwork_name);
        frmDetail.find("#AuditWorkTagetDetail").val(data.audit_work_taget);

        frmDetail.find("#PersonDetail").val(data.audit_work_person_name);
        frmDetail.find("#ClassifyDetail").val(data.audit_work_classify);

        frmDetail.find("#AuditfacilitiesDetail").val(data.auditfacilities_name);

        frmDetail.find("#outsideDetail").val(data.audit_scope_outside);
        frmDetail.find("#fromDDetail").val(data.from_date);
        frmDetail.find("#toDDetail").val(data.to_date);

        $("#OtherContentDetail").val("");
        $("#OtherContentDetail").val(data.other_content).prop("readonly", true);
        if (CKEDITOR.instances['OtherContentDetail']) {
            CKEDITOR.instances['OtherContentDetail'].setData(data.other_content);
            CKEDITOR.instances['OtherContentDetail'].updateElement();

        }
        else {
            CKEDITOR.replace("OtherContentDetail", {
                height: 300,
                disableObjectResizing: true
            });
            CKEDITOR.instances['OtherContentDetail'].setData(data.other_content);
            CKEDITOR.instances['OtherContentDetail'].updateElement();

        }

        if (data.str_rating) {
            var _value = data.str_rating;
            var newOptionRatingDetail = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmDetail.find("#RatingDetail").append(newOptionRatingDetail).trigger('change');
        }
        //frmDetail.find("#RatingDetail").val(data.rating);
        frmDetail.find("#ProblemDetail").val(data.problem);
        frmDetail.find("#ideaDetail").val(data.idea)
        frmDetail.find("#auditScopeDetail").val(data.audit_scope)
        //frmDetail.find("#FileNameDetail").text(data.filename);
        frmDetail.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadAuditMinutes(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmDetail.find("#FileDetail").append(_append_data);
        }

        frmDetail.find("#StatusDetail").val(data.status);
        ////table Phạm vi kiểm toán
        //var tbBodyAS = $('#AuditScopeAuditMinutesDetailTable tbody');
        //$("#AuditScopeAuditMinutesDetailTable").dataTable().fnDestroy();
        //tbBodyAS.html('');
        //if (data.listauditworkscope !== undefined && data.listauditworkscope !== null && data.listauditworkscope.length != 0) {
        //    var obj = data.listauditworkscope;
        //    for (var i = 0; i < obj.length; i++) {
        //        var res = obj[i];
        //        var html = '<tr>' +
        //            '<td>' + res.auditprocess_name + '</td>' +
        //            '<td>' + res.auditfacilities_name + '</td>' +
        //            '<td>' + res.bussinessactivities_name + '</td>' +
        //            '</tr>';
        //        tbBodyAS.append(html);
        //    }
        //}
        //else if (data.listauditworkscope == undefined || data.listauditworkscope == null || data.listauditworkscope.length == 0) {
        //    notdataTableAuditWorkScope();
        //}
        //table Tổng số lượng phát hiện
        var tbBodySum = $('#SumAuditMinutesDetailtable tbody');
        $("#SumAuditMinutesDetailtable").dataTable().fnDestroy();
        tbBodySum.html('');
        //if (data.auditfacilities_name !== undefined && data.auditfacilities_name !== null && data.auditfacilities_name != "") {
        //    var sum = data.risk_rating_hight + data.risk_rating_medium + data.risk_rating_low
        //    var html = '<tr>' +
        //        '<td>' + data.auditfacilities_name + '</td>' +
        //        '<td>' + sum + '</td>' +
        //        '<td>' + data.risk_rating_hight + '</td>' +
        //        '<td>' + data.risk_rating_medium + '</td>' +
        //        '<td>' + data.risk_rating_low + '</td>' +
        //        '</tr>';
        //    tbBodySum.append(html);
        //} else if (data.auditfacilities_name == undefined || data.auditfacilities_name == null || data.auditfacilities_name != "") {
        //    notdataTableSumAuditMinutes();
        //}
        if (rspn.datanew !== undefined && rspn.datanew !== null && rspn.datanew != "") {
            for (var i = 0; i < rspn.datanew.length; i++) {
                var res = rspn.datanew[i];
                var sum = res.risk_rating_hight + res.risk_rating_medium + res.risk_rating_low
                var html = '<tr>' +
                    '<td>' + res.str_classify_audit_detect + '</td>' +
                    '<td>' + sum + '</td>' +
                    '<td>' + res.risk_rating_hight + '</td>' +
                    '<td>' + res.risk_rating_medium + '</td>' +
                    '<td>' + res.risk_rating_low + '</td>' +
                    '<td>' + res.opinion_audit_true + '</td>' +
                    '<td>' + res.opinion_audit_false + '</td>' +
                    '</tr>';
                tbBodySum.append(html);
            }
        } else if (rspn.datanew == undefined || rspn.datanew == null || rspn.datanew != "") {
            notdataTableSumAuditMinutes();
        }

        //table Danh sách phát hiện
        var tbBody = $('#AuditDetectAuditMinutesDetailtable tbody');
        $("#AuditDetectAuditMinutesDetailtable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditdetectauditminutes !== undefined && data.listauditdetectauditminutes !== null && data.listauditdetectauditminutes.length != 0) {
            var data_ = data.listauditdetectauditminutes;
            //for (var i = 0; i < data_.length; i++) {
            //    var obj = data_[i];
            //    var ratingRisk = (obj.risk_rating == 1 ? "Cao" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp" : "")));
            //    var html = '<tr>' +
            //        '<td>' + (i + 1) + '</td>' +
            //        '<td>' + obj.audit_detect_code + '</td>' +
            //        '<td class="col-action">' +
            //        '<a class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalDetailAuditDetect" style="position: relative; right: 160px; color: #324cdd" onclick="DetailDetect(' + obj.id + ')">' + obj.title + '</a>' +
            //        '</td>' +
            //        '<td>' + obj.auditfacilities_name + '</td>' +
            //        '<td>' + ratingRisk + '</td>' +
            //        '</tr>';
            //    tbBody.append(html);
            //}

            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var ratingRisk = (obj.risk_rating == 1 ? "Cao/Quan trọng" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp/Ít quan trọng" : "")));
                var opinion_audit = (obj.opinion_audit == true ? "Đồng ý" : "Không đồng ý");
                var html = '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + obj.audit_detect_code + '</td>' +
                    '<td class="col-action">' +
                    '<a id="tag" data-toggle="modal" data-target="#modalDetailAuditDetect" class=" custormTable btn icon-default btn-action-custom" style="color: #324cdd" onclick="DetailDetect(' + obj.id + ')">' + obj.title + '</a>' +
                    '</td>' +
                    '<td>' + obj.str_classify_audit_detect + '</td>' +
                    '<td>' + ratingRisk + '</td>' +
                    '<td>' + opinion_audit + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditdetectauditminutes == undefined || data.listauditdetectauditminutes == null || data.listauditdetectauditminutes.length == 0) {
            notdataTableAuditDetectAuditMinutes();
        }

        localStorage.setItem("id", $('#IdDetail').val());
        localStorage.setItem("type", "2");
    }
}
function DetailDetect(id) {
    callApi_auditservice(
        apiConfig.api.auditdetect.controller,
        apiConfig.api.auditdetect.action.getItem.path + "/" + id,
        apiConfig.api.auditdetect.action.getItem.method,
        null, 'fnGetDetailDetectSuccess', 'msgError');
}
//chi tiết của Phát hiện
function fnGetDetailDetectSuccess(rspn) {
    var frmDetailAuditDetect = $("#formDetailAuditDetect");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        frmDetailAuditDetect.find("#IdDetailDetailAuditDetect").val(data.id);
        frmDetailAuditDetect.find("#DetailAuditDetectTitle").val(data.title);
        frmDetailAuditDetect.find("#DetailAuditDetectDescription").val(data.description);
        frmDetailAuditDetect.find("#DetailAuditDetectEvidence").val(data.evidence);
        //frmDetailAuditDetect.find("#FileDetailAuditDetectEvidence").text(data.filename);
        frmDetailAuditDetect.find("#FileDetailAuditDetectEvidence").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += '<a href="javascript:DownloadFileAuditDetect(' + obj.id + ');"><span>' + file_name + '</span></a>';
            }
            frmDetailAuditDetect.find("#FileDetailAuditDetectEvidence").append(_append_data);
        }
        frmDetailAuditDetect.find("#DetailAuditDetectAffect").val(data.affect);
        frmDetailAuditDetect.find("#DetailAuditDetectRatingRisk").val(data.rating_risk);
        frmDetailAuditDetect.find("#DetailAuditDetectCause").val(data.cause);
        //table kiến nghị
        $("#DetailAuditDetectAuditRequestMonitorTable").dataTable().fnDestroy();
        $('#DetailAuditDetectAuditRequestMonitorTable tbody').html('');
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
                    '<td class="text-center">' + (obj.completeat == null ? "" : obj.completeat) + '</td>' +
                    '</tr>';
                $('#DetailAuditDetectAuditRequestMonitorTable tbody').append(html);
            }
        } else if (data.listauditrequestmonitor == undefined || data.listauditrequestmonitor == null || data.listauditrequestmonitor.length == 0) {
            notdataTableAuditRequestMonitorAuditMinutes();
        }
        if (data.opinion_audit == true) {
            frmDetailAuditDetect.find(':radio[name=DetailAuditDetectOpinion][value="1"]').prop('checked', true);
        } else {
            frmDetailAuditDetect.find(':radio[name=DetailAuditDetectOpinion][value="2"]').prop('checked', true);
        }
        frmDetailAuditDetect.find("#DetailAuditDetectReasonDetail").val(data.reason);
    }
}
function DownloadFileAuditDetect(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditdetect.controller + '/DownloadAttachAuditDetect?id=' + id, 'Download');
}

function DownloadAuditMinutes(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditminutes.controller + '/DownloadAuditMinutes?id=' + id, 'Download');
}
function DownloadAuditMinutesUpdate(id) {
    window.open(apiConfig.api.host_audit_service + apiConfig.api.auditminutes.controller + '/DownloadAuditMinutes?id=' + id, 'Download');
}

function ChangeFileEdit() {
    var input = $("#PathEdit");
    if (input[0].files) {
        $('#FileOldAuditMinutes').hide();
        input.css('color', '#333');
    } else {
        input.css('color', 'transparent');
    }
}

//cập nhật
function fnEditSuccess(rspn) {
    var frmEdit = $("#formAuditMinutesEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;

        frmEdit.find("#IdEdit").val(data.id);

        frmEdit.find("#YearAuditWorkEdit").val(data.year);
        frmEdit.find("#AuditWorkCodeEdit").val(data.auditwork_code);

        frmEdit.find("#AuditWorkEdit").val(data.auditwork_name);
        frmEdit.find("#AuditWorkTagetEdit").val(data.audit_work_taget);

        frmEdit.find("#PersonEdit").val(data.audit_work_person_name);
        frmEdit.find("#ClassifyEdit").val(data.audit_work_classify);

        frmEdit.find("#AuditfacilitiesEdit").val(data.auditfacilities_name);

        frmEdit.find("#outsideEdit").val(data.audit_scope_outside);
        frmEdit.find("#fromDEdit").val(data.from_date);
        frmEdit.find("#toDEdit").val(data.to_date)

        frmEdit.find("#OtherContentEdit").val(data.other_content);
        if (CKEDITOR.instances['OtherContentEdit']) {
            CKEDITOR.instances['OtherContentEdit'].setData(data.other_content);
            CKEDITOR.instances['OtherContentEdit'].updateElement();

        }
        else {
            CKEDITOR.replace("OtherContentEdit", {
                height: 300,
                disableObjectResizing: true
            });
            CKEDITOR.instances['OtherContentEdit'].setData(data.other_content);
            CKEDITOR.instances['OtherContentEdit'].updateElement();

        }

        if (data.str_rating) {
            var _value = data.str_rating;
            var newOptionRatingEdit = new Option(_value.split(':')[1], _value.split(':')[0], true, true);
            frmEdit.find("#RatingEdit").append(newOptionRatingEdit).trigger('change');
        }


        //frmEdit.find("#RatingEdit").val(data.rating);
        frmEdit.find("#ProblemEdit").val(data.problem);
        frmEdit.find("#ideaEdit").val(data.idea)
        //frmEdit.find("#fileNameEdit").text(data.filename);
        frmEdit.find("#FileDetail").empty();
        if (data.list_file != undefined && data.list_file != null && data.list_file.length > 0) {

            var _append_data = "";
            for (var i = 0; i < data.list_file.length; i++) {
                var obj = data.list_file[i];
                var _arraypath = (obj.path == undefined || obj.path == null) ? [] : obj.path.replaceAll("/", "\\").split("\\");
                var file_name = _arraypath.length > 0 ? _arraypath[_arraypath.length - 1] : "File";
                _append_data += "<div>";
                _append_data += '<a href="javascript:DownloadAuditMinutesUpdate(' + obj.id + ');"><span>' + file_name + '</span></a>';
                _append_data += '   <a href="javascript:deletefile(' + obj.id + ');" style="color: red; font-size: larger; font-weight: bold;"><span>&nbsp x</span></a>';
                _append_data += "</div>";
            }
            frmEdit.find("#FileDetail").append(_append_data);
        }
        frmEdit.find("#StatusEdit").val(data.status);
        frmEdit.find("#auditScopeEdit").val(data.audit_scope);
        ////table Phạm vi kiểm toán
        //var tbBodyAS = $('#AuditScopeAuditMinutesEditTable tbody');
        //$("#AuditScopeAuditMinutesEditTable").dataTable().fnDestroy();
        //tbBodyAS.html('');
        //if (data.listauditworkscope !== undefined && data.listauditworkscope !== null && data.listauditworkscope.length != 0) {
        //    var obj = data.listauditworkscope;
        //    for (var i = 0; i < obj.length; i++) {
        //        var res = obj[i];
        //        var html = '<tr>' +
        //            '<td>' + res.auditprocess_name + '</td>' +
        //            '<td>' + res.auditfacilities_name + '</td>' +
        //            '<td>' + res.bussinessactivities_name + '</td>' +
        //            '</tr>';
        //        tbBodyAS.append(html);
        //    }
        //}
        //else if (data.listauditworkscope == undefined || data.listauditworkscope == null || data.listauditworkscope.length == 0) {
        //    notdataTableAuditWorkScope();
        //}
        //table Tổng số lượng phát hiện
        var tbBodySum = $('#SumAuditMinutesEditTable tbody');
        $("#SumAuditMinutesEditTable").dataTable().fnDestroy();
        tbBodySum.html('');
        if (rspn.datanew !== undefined && rspn.datanew !== null && rspn.datanew != "") {
            for (var i = 0; i < rspn.datanew.length; i++) {
                var res = rspn.datanew[i];
                //var sum = res.length > 1 ? (res[0].risk_rating_hight + res[0].risk_rating_medium + res[0].risk_rating_low)
                //: (res.risk_rating_hight + res.risk_rating_medium + res.risk_rating_low);
                var sum = res.risk_rating_hight + res.risk_rating_medium + res.risk_rating_low;
                var html = '<tr>' +
                    '<td>' + res.str_classify_audit_detect + '</td>' +
                    '<td class="text-right">' + sum + '</td>' +
                    '<td class="text-right">' + res.risk_rating_hight + '</td>' +
                    '<td class="text-right">' + res.risk_rating_medium + '</td>' +
                    '<td class="text-right">' + res.risk_rating_low + '</td>' +
                    '<td class="text-right">' + res.opinion_audit_true + '</td>' +
                    '<td class="text-right">' + res.opinion_audit_false + '</td>' +
                    '</tr>';
                tbBodySum.append(html);
            }
        } else if (rspn.datanew == undefined || rspn.datanew == null || rspn.datanew != "") {
            notdataTableSumAuditMinutes();
        }
        //if (data.auditfacilities_name !== undefined && data.auditfacilities_name !== null && data.auditfacilities_name != "") {
        //    var sum = data.risk_rating_hight + data.risk_rating_medium + data.risk_rating_low
        //    var html = '<tr>' +
        //        '<td>' + data.auditfacilities_name + '</td>' +
        //        '<td>' + sum + '</td>' +
        //        '<td>' + data.risk_rating_hight + '</td>' +
        //        '<td>' + data.risk_rating_medium + '</td>' +
        //        '<td>' + data.risk_rating_low + '</td>' +
        //        '</tr>';
        //    tbBodySum.append(html);
        //} else if (data.auditfacilities_name == undefined || data.auditfacilities_name == null || data.auditfacilities_name != "") {
        //    notdataTableSumAuditMinutes();
        //}

        //table Danh sách phát hiện
        var tbBody = $('#AuditDetectAuditMinutesEditTable tbody');
        $("#AuditDetectAuditMinutesEditTable").dataTable().fnDestroy();
        tbBody.html('');
        if (data.listauditdetectauditminutes !== undefined && data.listauditdetectauditminutes !== null && data.listauditdetectauditminutes.length != 0) {
            var data_ = data.listauditdetectauditminutes;
            for (var i = 0; i < data_.length; i++) {
                var obj = data_[i];
                var ratingRisk = (obj.risk_rating == 1 ? "Cao/Quan trọng" : (obj.risk_rating == 2 ? "Trung bình" : (obj.risk_rating == 3 ? "Thấp/Ít quan trọng" : "")));
                var opinion_audit = (obj.opinion_audit == true ? "Đồng ý" : "Không đồng ý");
                var html = '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + obj.audit_detect_code + '</td>' +
                    '<td>' +
                    '<a id="tag" data-toggle="modal" data-target="#modalDetailAuditDetect" class=" custormTable btn icon-default btn-action-custom" style="color: #324cdd" onclick="DetailDetect(' + obj.id + ')">' + obj.title + '</a>' +
                    '</td>' +
                    '<td>' + obj.str_classify_audit_detect + '</td>' +
                    '<td>' + ratingRisk + '</td>' +
                    '<td>' + opinion_audit + '</td>' +
                    '</tr>';
                tbBody.append(html);
            }
        } else if (data.listauditdetectauditminutes == undefined || data.listauditdetectauditminutes == null || data.listauditdetectauditminutes.length == 0) {
            notdataTableAuditDetectAuditMinutes();
        }

        localStorage.setItem("id", $('#IdEdit').val());
        localStorage.setItem("type", "3");
    }
}
//Lưu khi cập nhật
function submitEdit() {
    var _id = $("#formAuditMinutesEdit").find('#IdEdit').val();
    var other_content = CKEDITOR.instances["OtherContentEdit"].getData();
    if (other_content != undefined && other_content != '') {
        other_content = $.trim(other_content);
    }
    var obj = {
        'id': _id,
        'status': $('#StatusEdit').val(),
        'rating': $('#RatingEdit').val(),
        'problem': $('#ProblemEdit').val(),
        'idea': $('#ideaEdit').val(),
        'other_content': other_content,
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
    if (validateRequired('#formAuditMinutesEdit')) {
        if (check != true) {
            callApi_auditservice_update(
                apiConfig.api.auditminutes.controller,
                apiConfig.api.auditminutes.action.editauditminutes.path,
                formData, 'updateSuccessAuditMinutes', 'updateFail');
        }
    }
}

function updateSuccessAuditMinutes(data) {
    if (data.code == "1") {
        createdLog("Biên bản kiểm toán", "Cập nhật biên bản kiểm toán");
        toastr.success(localizationResources.Successfully, { progressBar: true })
        setTimeout(function () {
            window.location.href = "/AuditMinutes"
        }, 2000)
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 90);
    }
}

function notdataTableAuditWorkScope() {
    $('#AuditScopeAuditMinutesDetailTable tbody').html('');
    $("#AuditScopeAuditMinutesDetailTable").dataTable().fnDestroy();
    $("#AuditScopeAuditMinutesDetailTable").DataTable({
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
    $('#AuditScopeAuditMinutesEditTable tbody').html('');
    $("#AuditScopeAuditMinutesEditTable").dataTable().fnDestroy();
    $("#AuditScopeAuditMinutesEditTable").DataTable({
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
function notdataTableSumAuditMinutes() {
    $('#SumAuditMinutesDetailtable tbody').html('');
    $("#SumAuditMinutesDetailtable").dataTable().fnDestroy();
    $("#SumAuditMinutesDetailtable").DataTable({
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
    $('#SumAuditMinutesEditTable tbody').html('');
    $("#SumAuditMinutesEditTable").dataTable().fnDestroy();
    $("#SumAuditMinutesEditTable").DataTable({
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
function notdataTableAuditDetectAuditMinutes() {
    $('#AuditDetectAuditMinutesDetailtable tbody').html('');
    $("#AuditDetectAuditMinutesDetailtable").dataTable().fnDestroy();
    $("#AuditDetectAuditMinutesDetailtable").DataTable({
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
    $('#AuditDetectAuditMinutesEditTable tbody').html('');
    $("#AuditDetectAuditMinutesEditTable").dataTable().fnDestroy();
    $("#AuditDetectAuditMinutesEditTable").DataTable({
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
function notdataTableAuditRequestMonitorAuditMinutes() {
    $('#DetailAuditDetectAuditRequestMonitorTable tbody').html('');
    $("#DetailAuditDetectAuditRequestMonitorTable").dataTable().fnDestroy();
    $("#DetailAuditDetectAuditRequestMonitorTable").DataTable({
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

function clickMenu() {
    openView(0, 0);
    localStorage.removeItem("id");
    localStorage.removeItem("type");
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
        apiConfig.api.auditminutes.controller,
        apiConfig.api.auditminutes.action.deletefile.path + "/" + id,
        apiConfig.api.auditminutes.action.deletefile.method,
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
function ExportFileWord(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditminutes.controller + apiConfig.api.auditminutes.action.exportfileword.path + "/" + id,);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_BienBanKiemToan_v0.2.docx";
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