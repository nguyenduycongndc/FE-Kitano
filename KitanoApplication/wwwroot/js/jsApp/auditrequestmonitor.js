$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", getSessionToken());
        xhr.setRequestHeader("Accept-Language", "vi-VN");
        showLoading();
    },
    complete: function (xhr, status, error) {
        hideLoading();

        if (xhr.status == 401)
            toastr.warning("Bạn cần phải đăng nhập vào hệ thống!", "Unauthorized!", {
                progressBar: true,
            });
        else if (xhr.status == 404)
            toastr.warning("Không tìm thấy đối tượng để xử lý!", "Not found!", {
                progressBar: true,
            });
        else if (xhr.status == 500)
            toastr.warning(
                "Có lỗi xảy ra trong quá trình xử lý!",
                "Internal Server Error!",
                { progressBar: true }
            );
        else if (xhr.status == 400)
            toastr.warning(
                "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!",
                "Lỗi dữ liệu!",
                { progressBar: true }
            );
        else if (xhr.status != 200)
            toastr.warning("Có lỗi trong quá trình xử lý!", "error!", {
                progressBar: true,
            });
    },
});

function getYear() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYear');
}

function fillYear(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#year').html('');
    $('#year').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, 'issues', 'method_id');
    $('#year').append(html);
}


function getValueYear(value) {
    var _year = value;
    getAuditWork(_year);
}

function getAuditWork(year) {
    var obj = {
        'year': year,
        'key': '',
        'name': '',
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillAuditWork');
}

function fillAuditWork(data) {
    var htmlOption = '<option value="0">----' + localizationResources.Choose + '----</option>';
    $('#audit').html('');
    $('#audit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (var i = 0; i < _data.length; i++) {
        var obj = _data[i];
        html += '<option value=' + obj.id + '>' + obj.code + " - " + obj.name + '</option>';;
    }
    $('#audit').append(html);
}

function callApi_multipleselect(
    selector,
    placeholder,
    host,
    controller,
    action
) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: false,
        closeOnSelect: true,
        ajax: {
            headers: { Authorization: "Bearer " + sessionStorage["SessionToken"] },
            url: host + controller + action,
            dataType: "json",
            data: function (params) {
                return {
                    q: params.term,
                    type: "public",
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.name,
                            id: item.id,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
}
$(".picker").bootstrapMaterialDatePicker({
    time: false,
    format: "DD/MM/YYYY",
});
function openModalExtend(id, code, content, timestatus, completeat, extendat) {
    $("#modalExtend").data("id", id);
    $("#modalExtend #modal_code").val(code);
    $("#modalExtend #modal_content").val(content);
    $("#modalExtend #modal_timestatus").val(timestatus);
    $("#modalExtend #modal_completeat").val(completeat);
    $("#modalExtend #modal_extendat").val(extendat);
    $("#modalExtend").modal("show");
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
            getYear();
            getAuditWork();
            getUnit();
            loadCategory();
        }, 2000);
    } else if (type === 1) {
        index.hide();
        create.show();
        document.getElementById("nameCreate").focus();
        edit.hide();
        detail.hide();
        document.getElementById("formCreate").reset();
        $("#frmHeaderCreate").val(frmHeaderCreate);
    } else if (type === 2) {
        index.hide();
        create.hide();
        edit.hide();
        detail.show();
        $("#PathEdit").val('');
        fnGetDetail(type, value);
        loadCategoryDetail(); loadCategoryDetailTable(); 
    } else if (type === 3) {
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        $("#PathEdit").val('');
        fnGetDetail(type, value);
        loadCategoryEdit(); loadCategorEditTable();
    }
}

function renderTableHasValue(rspn) {
    var data = rspn.data;
    var tbBody = $("#auditrequesttable tbody");
    $("#auditrequesttable").dataTable().fnDestroy();
    tbBody.html("");
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var textprocessstatus =
            obj.processstatus == 3 ? "Hoàn thành" : "Chưa hoàn thành";
        textprocessstatus =
            obj.processstatus == 2 ? "Hoàn thành một phần" : textprocessstatus;
        var texttimestatus = obj.timestatus == 2 ? "Quá hạn" : "Trong hạn";
        var textconclusion = obj.conclusion == 2 ? "Đã đóng" : "Chưa đóng";

        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            (i + 1) +
            "</td>" +
            '<td style="width: 10% !important;">' +
            obj.code +
            "</td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span>' +
            viewValue(obj.unitname) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            textprocessstatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis text-center"><span>' +
            viewValue(obj.completeat) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis text-center"><span>' +
            viewValue(obj.extendatstring) +
            "</span></td>" +
            '<td style="width: 12% !important;" class="ellipsis text-center"><span>' +
            viewValue(obj.actualcompleteat) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            texttimestatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            textconclusion +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.auditrequesttypename) +
            "</span></td>" +
            '<td class="col-action text-center" style="width: 10% !important;">' +
            (IsCheckPemission("M_ARMN", "PER_DETAIL") === true
                ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' +
                obj.id +
                ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>'
                : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>') +
            (IsCheckPemission("M_ARMN", "PER_EDIT") === true
                ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' +
                obj.id +
                ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
                : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>') +
            //(IsCheckPemission("M_ARMN", "PER_DEL") === true
            //    ? '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(\'' +
            //    obj.code +
            //    "'," +
            //    obj.id +
            //    ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>'
            //    : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>') +
            (IsCheckPemission("M_ARMN", "PER_EDIT") === true
                ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openModalExtend(\'' + obj.id + '\',\'' + obj.code + '\',\'' + obj.content + '\',\'' + texttimestatus + '\',\'' + obj.completeat + '\',\'' + obj.extendat + '\')"><i data-toggle="tooltip" title="Gia hạn" class="fas fa-expand-arrows-alt" aria-hidden="true" ></i></a>'
                : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Gia hạn" class="fas fa-expand-arrows-alt" aria-hidden="true" ></i></a>') +
            "</td>" +
            "</tr>";
        tbBody.append(html);
    }
}

function fnSearchAuditRequestSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue(rspn);
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
    } else if (rspn.data == "") {
        var tbBody = $("#auditrequesttable tbody");
        $("#auditrequesttable").dataTable().fnDestroy();
        tbBody.html("");
        reCalculatPagesCustomNull();
        hideLoading();
    }
    var page_size =
        (parseInt($("#txtCurrentPage").val()) - 1) *
        parseInt($("#cbPageSize").val());

    var t = $("#auditrequesttable").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
                data: null,
                order: [],
                render: function (data_table, type, row, meta) {
                    return meta.row + page_size + 1;
                },
            },
            {
                targets: [0, 3, 4],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    t.on("order.dt search.dt", function () {
        t.column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell, index) {
                cell.innerHTML = index + page_size + 1;
            });
    }).draw();
}

function Delete(name, id) {
    var _name = String(name);
    swal(
        {
            title: "Thông báo",
            text: "Bạn có chắc muốn xóa bản ghi " + _name + "!",
            type: "warning",
            showCancelButton: !0,
        },
        function (isConfirm) {
            if (isConfirm) {
                fnDeleteCatAuditRequest(id);
            }
        }
    );
}

function fnDeleteCatAuditRequest(id) {
    callApi_auditservice(
        apiConfig.api.auditrequestmonitor.controller,
        apiConfig.api.auditrequestmonitor.action.delete.path + "/" + id,
        apiConfig.api.auditrequestmonitor.action.delete.method,
        null,
        "fnDeleteCatAuditRequestSuccess",
        "msgError"
    );
}

function fnDeleteCatAuditRequestSuccess(rspn) {
    if (rspn.code === "1") {
        createdLog("Kiến nghị kiểm toán", "Xóa kiến nghị kiểm toán");
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!", {
            progressBar: true,
        });
        onSearch();
    } else {
        toastr.error("Xóa dữ liệu không thành công!", "Error!", {
            progressBar: true,
        });
    }
}

function onSearch() {
    var obj = {
        code: $("#Code").val().trim(),
        conclusion: $("#Conclusion").val(),
        year: $("#year").val(),
        unitid: $("#unitSearch").val(),
        processstatus: $("#ProcessStatus").val(),
        cooperateunitid: $("#cooperateUnitSearch").val(),
        auditid:$("#audit").val(),
        completedatefrom: $("#CompleteDateFrom").val(),
        completedateTo: $("#CompleteDateTo").val(),
        completeactualfrom: $("#CompleteDateActualFrom").val(),
        completeactualto: $("#CompleteDateActualTo").val(),
        timestatus: $("#TimeStatus").val(),
        type: $("#AuditRequestType").val(),
        page_size: parseInt($("#cbPageSize").val()),
        start_number:
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val()),
    };
    callApi_auditservice(
        apiConfig.api.auditrequestmonitor.controller,
        apiConfig.api.auditrequestmonitor.action.search.path,
        apiConfig.api.auditrequestmonitor.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fnSearchAuditRequestSuccess",
        "msgError"
    );
}

////function btnOnSearch() {
//    $("#txtCurrentPage").val(1);
//    onSearch();
//}

function createdLog(_module, _perform_tasks) {
    var obj = {
        module: _module,
        perform_tasks: _perform_tasks,
    };
    callApi_userservice(
        apiConfig.api.systemlog.controller,
        apiConfig.api.systemlog.action.add.path,
        apiConfig.api.systemlog.action.add.method,
        obj,
        "",
        ""
    );
}
window.onload = function () {
    let checkLocalStatus = localStorage.getItem("status");
    if (checkLocalStatus == null) {
        localStorage.setItem("status", "1");
    }
    let checkLocalType = localStorage.getItem("type");
    let type = parseInt(checkLocalType);
    let checkLocalId = localStorage.getItem("id");
    let id = parseInt(checkLocalId);
    if (checkLocalType === null && checkLocalId === null) {
        type = 0;
        id = 0;
    }
    setTimeout(function () {
        openView(type, id);
    }, 2000);
};

function getUnit() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillUnit"
    );
}

function fillUnit(rspn) {
    var data = rspn.data;

    var htmlOption =
        '<option value="0">----' + localizationResources.Choose + "----</option>";
    $("#search-facility").html("");
    $("#unitSearch").html("");
    $("#search-facility").append(htmlOption);
    $("#unitSearch").append(htmlOption);
    $("#cooperateUnitSearch").append(htmlOption);
    if (data == undefined || data == null || data.length == 0) return;
    var html = generateComboOptions(data, 0, "childs");
    $("#search-facility").append(html);
    $("#unitSearch").append(html);
    $("#cooperateUnitSearch").append(html);
}

function updateAuditRequestSuccess(data) {
    if (data.code === "1") {
        createdLog(" kiến nghị kiểm toán", "Chỉnh sửa loại kiến nghị kiểm toán");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", {
            progressBar: true,
        });
        setTimeout(function () {
            openView(0, 0);
            //window.location.href = "/AuditRequest"
        }, 2000);
    } else if (data.code == 0) {
        toastr.warning("Loại kiến nghị kiểm toán không được để trống!", "Error!", {
            progressBar: true,
        });
    } else if (data.code == -1) {
        toastr.warning("Loại kiến nghị kiểm toán này đã tồn tại!", "Error!", {
            progressBar: true,
        });
    } else {
        toastr.error("Cập nhật thất bại!", "Error!", { progressBar: true });
    }
}

function fnGetDetail(type, param) {
    var call_back = "";
    if (type === 3) {
        call_back = "fnEditSuccess";
    } else if (type === 2) {
        call_back = "fnGetDetailSuccess";
    }
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    callApi_auditservice(
        apiConfig.api.auditrequestmonitor.controller,
        apiConfig.api.auditrequestmonitor.action.getItem.path + "/" + param,
        apiConfig.api.auditrequestmonitor.action.getItem.method,
        null,
        call_back,
        "msgError"
    );
}

function fnGetDetailSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formDetail");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        frmModify.find("#IdDetail").val(data.id);
        frmModify.find("#DetectCodeDetail").val(data.detectcode);
        frmModify.find("#DetectDescriptionDetail").val(data.detectdescription);
        frmModify.find("#CodeDetail").val(data.code);
        frmModify.find("#AuditRequestTypeDetail").val(data.auditrequesttypename);
        frmModify.find("#ContentDetail").val(data.content);
        frmModify.find("#UnitDetail").val(data.unitname);
        frmModify.find("#UserDetail").val(data.username);
        frmModify.find("#UserTrackingDetail").val(data.trackinguser);
        frmModify.find("#CompleteDateDetail").val(data.completeat);
        frmModify.find("#ExtendDateDetail").val(data.extendat);
        frmModify.find("#ActualCompleteDateDetail").val(data.actualcompleteat);
        frmModify.find("#ConclusionDetail").val(data.conclusion);
        frmModify.find("#TimeStatusDetail").val(data.timestatus);
        frmModify.find("#ProcessStatusDetail").val(data.processstatus);
        frmModify.find("#EvidenceDetail").val(data.evidence);
        frmModify.find("#CommentDetail").val(data.comment);
        frmModify.find("#AuditCommentDetail").val(data.auditcomment);
        frmModify.find("#CaptainCommentDetail").val(data.captaincomment);
        frmModify.find("#ReasonDetail").val(data.reason);
        frmModify.find("#UnitCommentDetail").val(data.unitcomment);
        frmModify.find("#LeaderCommentDetail").val(data.leadercomment);
        frmModify.find("#IncompleteReasonDetail").val(data.incomplete_reason);

        $("#unitcooptableDetail tbody").empty();
        data.facilityrequestmonitor.forEach(function (v, e) {
            var html =
                '<tr data-id="' +
                v.id +
                '">' +
                '<td class="text-center" scope = "col" style = "width: 20% !important;" >' +
                v.audit_facility_name +
                "</td>" +
                '<td class="text-center" scope="col" style="width: 15% !important;">' +
                '<select class="form-control" id="ProcessStatus" disabled><option value="1" ' +
                (v.process_status == 1 ? "selected" : "") +
                '>Chưa thực hiện</option><option value="2" ' +
                (v.process_status == 2 ? "selected" : "") +
                '>Đang thực hiện</option><option value="3" ' +
                (v.process_status == 3 ? "selected" : "") +
                ">Đã thực hiện</option></select>" +
                "</td>" +
                '<td class="text-center" scope="col" style="width: 65% !important;">' +
                '<input type="text" class="form-control" disabled id="Comment" name="Comment" value="' +
                v.comment +
                '" >' +
                "</td></tr>";
            $("#unitcooptableDetail tbody").append(html);
        });
        GenerateListFileName(
            data.auditrequestfile,
            "",
            "#PathDetail_listfile",
            true,
            false
        );
        ////ChangeStatus(data.processstatus);
        localStorage.setItem("id", $("#IdDetail").val());
        localStorage.setItem("type", "2");
    }
}

function fnEditSuccess(rspn) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");

    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#DetectCodeEdit").val(data.detectcode);
        frmModify.find("#DetectDescriptionEdit").val(data.detectdescription);
        frmModify.find("#CodeEdit").val(data.code);
        frmModify.find("#AuditRequestTypeEdit").val(data.auditrequesttypename);
        frmModify.find("#ContentEdit").val(data.content);
        frmModify.find("#UnitEdit").val(data.unitname);
        frmModify.find("#UserEdit").val(data.username);
        frmModify.find("#UserTrackingEdit").val(data.trackinguser);
        frmModify.find("#CompleteDateEdit").val(data.completeat);
        frmModify.find("#ExtendDateEdit").val(data.extendat);
        frmModify.find("#ActualCompleteDateEdit").val(data.actualcompleteat);
        frmModify.find("#ConclusionEdit").val(data.conclusion);
        frmModify.find("#TimeStatusEdit").val(data.timestatus);
        frmModify.find("#ProcessStatusEdit").val(data.processstatus);
        frmModify.find("#EvidenceEdit").val(data.evidence);
        frmModify.find("#CommentEdit").val(data.comment);
        frmModify.find("#AuditCommentEdit").val(data.auditcomment);
        frmModify.find("#CaptainCommentEdit").val(data.captaincomment);
        frmModify.find("#ReasonEdit").val(data.reason);
        frmModify.find("#UnitCommentEdit").val(data.unitcomment);
        frmModify.find("#LeaderCommentEdit").val(data.leadercomment);
        frmModify.find("#IncompleteReasonEdit").val(data.incomplete_reason);
        $("#unitcooptableEdit tbody").empty();
        data.facilityrequestmonitor.forEach(function (v, e) {
            var html =
                '<tr data-id="' +
                v.id +
                '">' +
                '<td class="text-center" scope = "col" style = "width: 20% !important;" >' +
                v.audit_facility_name +
                "</td>" +
                '<td class="text-center" scope="col" style="width: 15% !important;">' +
                '<select class="form-control" id="ProcessStatus"><option value="1" ' +
                (v.process_status == 1 ? "selected" : "") +
                '>Chưa hoàn thành</option><option value="2" ' +
                (v.process_status == 2 ? "selected" : "") +
                '>Hoàn thành một phần</option><option value="3" ' +
                (v.process_status == 3 ? "selected" : "") +
                ">Đã hoàn thành</option></select>" +
                "</td>" +
                '<td class="text-center" scope="col" style="width: 65% !important;">' +
                '<input type="text" class="form-control" id="Comment" name="Comment" value="' +
                v.comment +
                '" >' +
                "</td></tr>";
            $("#unitcooptableEdit tbody").append(html);
        });
        var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        GenerateListFileName(data.auditrequestfile, "", "#PathEdit_listfile", true, true);
        //if (
        //    currentUser.user_type == 2 &&
        //    currentUser.department_id == data.unitid
        //) {
        //    $("#ProcessStatusEdit").prop("disabled", false);
        //    $("#ActualCompleteDateEdit").prop("disabled", false);
        //    $("#EvidenceEdit").prop("disabled", false);
        //    $("#PathEdit").prop("disabled", false);
        //    $("#UnitCommentEdit").prop("disabled", false);
        //    ChangeStatus(data.processstatus);
        //} else {
        //    $("#ProcessStatusEdit").prop("disabled", true);
        //    $("#ActualCompleteDateEdit").prop("disabled", true);
        //    $("#EvidenceEdit").prop("disabled", true);
        //    $("#PathEdit").prop("disabled", true);
        //    $("#UnitCommentEdit").prop("disabled", true);
        //}
        localStorage.setItem("id", $("#IdEdit").val());
        localStorage.setItem("type", "3");
    }
}

function submitEdit() {
    var checkvalidate = false;
    var obj = {
        id: $("#IdEdit").val(),
        actualcompleteat: $("#ActualCompleteDateEdit").val(),
        processstatus: $("#ProcessStatusEdit").val(),
        evidence: $("#EvidenceEdit").val(),
        auditcomment: $("#AuditCommentEdit").val(),
        captaincomment: $("#CaptainCommentEdit").val(),
        leadercomment: $("#LeaderCommentEdit").val(),
        reason: $("#ReasonEdit").val(),
        conclusion: $("#ConclusionEdit").val(),
        comment: $("#CommentEdit").val(),
        unitcomment: $("#UnitCommentEdit").val(),
        incomplete_reason: $("#IncompleteReasonEdit").val(),
    };
    var formdata = new FormData();
    formdata.append("audiplaninfo.id", obj.id);
    formdata.append("audiplaninfo.actualcompleteat", obj.actualcompleteat);
    formdata.append("audiplaninfo.processstatus", obj.processstatus);
    formdata.append("audiplaninfo.evidence", obj.evidence);
    formdata.append("audiplaninfo.auditcomment", obj.auditcomment);
    formdata.append("audiplaninfo.captaincomment", obj.captaincomment);
    formdata.append("audiplaninfo.leadercomment", obj.leadercomment);
    formdata.append("audiplaninfo.reason", obj.reason);
    formdata.append("audiplaninfo.conclusion", obj.conclusion);
    formdata.append("audiplaninfo.comment", obj.comment);
    formdata.append("audiplaninfo.unitcomment", obj.unitcomment);
    formdata.append("audiplaninfo.incomplete_reason", obj.incomplete_reason);

    $("#unitcooptableEdit tbody tr").each(function (e, v) {
        var id = $(v).data("id");
        var comment = $(v).find("#Comment").val();
        var process_status = $(v).find("#ProcessStatus").val();
        formdata.append("audiplaninfo.facilityrequestmonitor[" + e + "].id", id);
        formdata.append(
            "audiplaninfo.facilityrequestmonitor[" + e + "].comment",
            comment
        );
        formdata.append(
            "audiplaninfo.facilityrequestmonitor[" + e + "].process_status",
            process_status
        );
    });
    var input = document.getElementById("PathEdit");
    var validImageTypes = [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "pdf",
        "jpg",
        "png",
        "jpeg",
        "mp3",
        "mp4",
        "rar",
        "zip",
        "eml",
        "msg",
    ];
    if (input.files) {
        $.each(input.files, function (i, v) {
            var imageFile = v;
            var fileType = v.name.substr(v.name.lastIndexOf(".") + 1);
            if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                toastr.error(
                    "Định dạng file " + fileType + " không được hỗ trợ!",
                    "Error!",
                    { progressBar: true }
                );
                checkvalidate = true;
                return false;
            }
            formdata.append("audiplaninfo.auditrequestfile", imageFile);
        });
    }
    var checkfile = $("#PathEdit_listfile").find("a").length;
    if (obj.processstatus == 3 && (checkfile < 1 && input.files.length == 0)) {
        $(".invalid-feedback").show();
        checkvalidate = true;
    }
    if (!checkvalidate && validateRequired('#formEdit')) {
        callApi_auditservice_update(
            apiConfig.api.auditrequestmonitor.controller,
            apiConfig.api.auditrequestmonitor.action.update.path,
            formdata,
            "updateAuditRequestSuccess",
            "msgError"
        );
    }
}

function GenerateListFileName(obj, key, elment, isclear, isdelete) {
    var item = obj[key] == undefined ? obj : obj[key];
    var hidden = isdelete ? "" : "hidden";
    if (isclear) $(elment).empty();
    if (
        obj != undefined &&
        item != undefined &&
        item != null &&
        item.length > 0
    ) {
        var _append_data = "";
        for (let value of item) {
            var v = value;
            var name = v.name.substring(v.name.lastIndexOf("/") + 1);
            if (obj[key] == undefined) {
                _append_data +=
                    '<div class="file_' + v.id + '"><a href="javascript:DownloadFile(' + v.id + ",'" + name + "');\"><span>" + name + '</span></a><a ' + hidden + ' href="javascript: deletefile(' + v.id + '); " style="color: red; font-size: larger; font-weight: bold; "><span>&nbsp; x</span></a></div>';
            } else {
                _append_data +=
                    '<div class="file_' + v.id + '"><a href="javascript:void(0); "><span>' + name + '</span></a><a href="javascript: deletefile(' + v.id + '); " style="color: red; font-size: larger; font-weight: bold; "><span>&nbsp; x</span></a></div>';
            }
        }
        $(elment).append(_append_data);
    }
}

function DownloadFile(id, filename) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open(
        "GET",
        apiConfig.api.host_audit_service +
        apiConfig.api.auditrequestmonitor.controller +
        "/DownloadAttach?id=" +
        id
    );
    request.setRequestHeader("Authorization", getSessionToken());
    request.setRequestHeader("Accept-Language", "vi-VN");
    request.onload = function () {
        if (this.status == 200) {
            var url = window.URL.createObjectURL(this.response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = filename;
            a.click();
        }
        if (this.status == 404) {
            toastr.error("Không tìm thấy dữ liệu", "Error!", { progressBar: true });
        }
        if (this.status == 400) {
            toastr.error("Có lỗi xảy ra", "Error!", { progressBar: true });
        }
    };
    request.send();
}

function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        $(".file_" + rspn.id).remove();
    }
    else {
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}

function fnDeleteFileScope(id) {
    callApi_auditservice(
        apiConfig.api.auditrequestmonitor.controller,
        apiConfig.api.auditrequestmonitor.action.deletefile.path + "/" + id,
        apiConfig.api.auditrequestmonitor.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
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

function ChangeStatus(value) {
    if (value == 3) {
        //$("#ActualCompleteDateEdit").prop("disabled", false);
        $("#ActualCompleteDateEdit").addClass("required");
        $("label[for='ActualCompleteDateEdit']").addClass("required");
        $("label[for='PathEdit']").addClass("required")
    } else {
        //$("#ActualCompleteDateEdit").prop("disabled", true);
        $("#ActualCompleteDateEdit").removeClass("required");
        $("label[for='ActualCompleteDateEdit']").removeClass("required");
        $("label[for='PathEdit']").removeClass("required")
    }
}

function fnUpdateExtendSuccess(rspn) {
    if (rspn.code == 1) {
        toastr.success(localizationResources.Successfully, "Success!", {
            progressBar: true,
        });
        $("#modalExtend").modal("hide");
        onSearch();
    } else
        toastr.error("Có lỗi xảy ra", "Error!", { progressBar: true });
}
function SaveExtend() {
    var id = $("#modalExtend").data("id");
    var value1 = $("#modalExtend #modal_completeat").val();
    var value2 = $("#modalExtend #modal_extendat").val();
    var completeat = null;
    let extendat = null;
    if (value1 !== '')
        completeat = moment($("#modalExtend #modal_completeat").val(), "DD/MM/YYYY");
    if (value2 !== '')
        extendat = moment($("#modalExtend #modal_extendat").val(), "YYYY-MM-DD");

    if (extendat <= completeat || completeat == null || extendat == null) {
        toastr.error("Thời hạn gia hạn phải lớn hơn thời hạn hoàn thành", "Thông báo", { progressBar: true })
        return false;
    }
    callApi_auditservice(
        apiConfig.api.auditrequestmonitor.controller,
        apiConfig.api.auditrequestmonitor.action.updateextend.path + "?id= " + id + "&extendat=" + extendat.format("YYYY-MM-DD"),
        apiConfig.api.auditrequestmonitor.action.updateextend.method,
        null,
        "fnUpdateExtendSuccess",
        "msgError"
    );
}

function Export() {

    var obj = {
        code: $("#Code").val().trim(),
        conclusion: $("#Conclusion").val(),
        unitid: $("#unitSearch").val(),
        processstatus: $("#ProcessStatus").val(),
        completedatefrom: $("#CompleteDateFrom").val(),
        completedateTo: $("#CompleteDateTo").val(),
        completeactualfrom: $("#CompleteDateActualFrom").val(),
        completeactualto: $("#CompleteDateActualTo").val(),
        timestatus: $("#TimeStatus").val(),
        type: $("#AuditRequestType").val(),
        page_size: 1,
        start_number: 1,
    };

    var jsonData = JSON.stringify(obj);

    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", apiConfig.api.host_audit_service + apiConfig.api.auditrequestmonitor.controller +
        apiConfig.api.auditrequestmonitor.action.exportexcel.path + "?jsonData=" + jsonData);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_ThongKeKienNghi.xlsx";
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
    $('#ProcessStatus').html('');
    $('#ProcessStatus').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#ProcessStatus').append(html);
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.kiennghikiemtoan }, 'fillApplyForCombo');
}

function fillApplyForComboDetail(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#ProcessStatusDetail').html('');
    $('#ProcessStatusDetail').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#ProcessStatusDetail').append(html);
}

function loadCategoryDetail() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.kiennghikiemtoan }, 'fillApplyForComboDetail');
}

function fillApplyForComboDetailTable(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#ProcessStatus').html('');
    $('#ProcessStatus').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#ProcessStatus').append(html);
}

function loadCategoryDetailTable() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.kiennghikiemtoan }, 'fillApplyForComboDetailTable');
}

function fillApplyForComboEdit(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#ProcessStatusEdit').html('');
    $('#ProcessStatusEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#ProcessStatusEdit').append(html);
}

function loadCategoryEdit() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.kiennghikiemtoan }, 'fillApplyForComboEdit');
}

function fillApplyForComboEditTable(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#ProcessStatusEdit').html('');
    $('#ProcessStatusEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#ProcessStatusEdit').append(html);
}

function loadCategoryEditTable() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.kiennghikiemtoan }, 'fillApplyForComboEditTable');
}

loadCategoryDetail(); loadCategoryDetailTable(); loadCategoryEdit(); loadCategoryEditTable();