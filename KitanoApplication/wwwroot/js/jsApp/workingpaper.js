var listObserveCreate = [];
var listObserveOther = [];
var controlassessment = [];
var controlassessmentOther = [];
var auditobserve = [];
var auditobserveOther = [];
var obsercode_default = 1;
var obsercode_value = 1;
var observecreate = null;
var observeedit = null;

$(function () {
    getStatus()
})
$.getScript("/plugins/jquery-validation/jquery.validate.min.js", function () {
    $("#formControl").validate({
        rules: {
            DesignAssessment: { required: true },
            DesignConclusion: { required: true },
            EffectiveAssessment: { required: true },
            EffectiveConclusion: { required: true },
        },
        submitHandler: function () {
            submitControlAssessmentCreate();
        },
    });
    $("#formControlEdit").validate({
        rules: {
            DesignAssessmentEdit: { required: true },
            DesignConclusionEdit: { required: true },
            EffectiveAssessmentEdit: { required: true },
            EffectiveConclusionEdit: { required: true },
        },
        submitHandler: function () {
            submitControlAssessmentEdit();
        },
    });
    observecreate = $("#formObserveCreate").validate({
        rules: {
            AuditObserveNameCreate: { required: true },
            AuditObserveDescriptionCreate: { required: true },
        },
        submitHandler: function () {
            SubmitObserveCreate();
        },
    });
    observeedit = $("#formObserveEdit").validate({
        rules: {
            AuditObserveNameEdit: { required: true },
            AuditObserveDescriptionEdit: { required: true },
        },
        submitHandler: function () {
            SubmitObserveEdit();
        },
    });
    $("#formCreate").validate({
        rules: {
            YearCreate: { required: true },
            AuditCreate: { required: true },
            AuditProcessCreate: { required: true },
            AuditUnitCreate: { required: true },
            RiskCreate: { required: true },
        },
        submitHandler: function () {
            submitCreate();
        },
    });
    $("#formEdit").validate({
        submitHandler: function () {
            submitEdit();
        },
    });
    $("#modelRequestApprove").on("show.bs.modal", function (event) {
        validateRequestApprove.resetForm();
        var id = $("#formEdit").find("#IdEdit").val();
        var modal = $(this);
        modal.find("#reportid").val(id);
        multiselect(
            "AprovalUser",
            "Chọn người duyệt...",
            apiConfig.api.host_user_service,
            apiConfig.api.systemuser.controller,
            apiConfig.api.systemuser.action.selectaudiWork.path
        );
        var str_person_in_charge = localStorage.getItem("leader");
        if (str_person_in_charge) {
            var _value = str_person_in_charge;
            var newOption = new Option(
                _value.split(":")[1],
                _value.split(":")[0],
                true,
                true
            );
            $("#AprovalUser").append(newOption).trigger("change");
        }
    });
    var validateRequestApprove = $("#frmRequestApprove").validate({
        rules: {
            AprovalUser: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmRequestApprove").find("#reportid").val();
            var approvaluser = $("#frmRequestApprove").find("#AprovalUser").val();
            var obj = {
                working_paper_id: id,
                approvaluser: approvaluser,
            };
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.requestapproval.path,
                apiConfig.api.workingpaper.action.requestapproval.method,
                obj,
                "fnRequestApprovalSuccess",
                "msgError"
            );
        },
    });
    $("#modelRejectApprove").on("show.bs.modal", function (event) {
        validateRejectApprove.resetForm();
        var id = $("#formEdit").find("#IdEdit").val();
        var modal = $(this);
        modal.find("#reportid").val(id);
    });
    var validateRejectApprove = $("#frmRejectApprove").validate({
        rules: {
            reasonnote: { required: true },
        },
        submitHandler: function () {
            var id = $("#frmRejectApprove").find("#reportid").val();
            var reasonreject = $("#frmRejectApprove").find("#reasonreject").val();
            var obj = {
                working_paper_id: id,
                reason_reject: reasonreject,
            };
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.rejectapproval.path,
                apiConfig.api.workingpaper.action.rejectapproval.method,
                obj,
                "fnRejectApprovalSuccess",
                "msgError"
            );
        },
    });
});
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", getSessionToken());
        xhr.setRequestHeader("Accept-Language", "vi-VN");
        showLoading();
    },
    complete: function (xhr, status, error) {
        hideLoading();

        if (xhr.status == 401)
            swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
        else if (xhr.status == 404)
            swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
        else if (xhr.status == 500)
            swal(
                "Internal Server Error!",
                "Có lỗi xảy ra trong quá trình xử lý!",
                "warning"
            );
        else if (xhr.status == 400)
            swal(
                "Lỗi dữ liệu!",
                "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!",
                "warning"
            );
        else if (xhr.status != 200)
            swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
    },
});

function multiselect(selector, placeholder, host, controller, action) {
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
                            text: item.full_name,
                            id: item.id,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
}

function openView(type, value, riskid = 0, isload = true) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var control = $("#control");
    var controledit = $("#controledit");
    var detail = $("#detail");
    var historyLog = $("#history-log");

    if (type === 0) {
        // List
        index.show();
        create.hide();
        edit.hide();
        detail.hide();
        control.hide();
        controledit.hide();
        historyLog.hide();
        setTimeout(function () {
            getYearSearch();
            onSearch();
        }, 200);
    } else if (type === 1) {
        //Create
        index.hide();
        edit.hide();
        detail.hide();
        control.hide();
        controledit.hide();
        historyLog.hide();
        if (isload == true) {
            getObserCode();
            controlassessment = [];
            auditobserve = [];
            $("#formCreate tbody").html("");
            setTimeout(function () {
                getYearCreate();
                var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
                $("#AsigneeCreate").val(currentUser.full_name);
            }, 2000);
            document.getElementById("formCreate").reset();
        }
        callApi_auditservice(
            apiConfig.api.workingpaper.controller,
            apiConfig.api.workingpaper.action.privatecode.path,
            apiConfig.api.workingpaper.action.privatecode.method,
            null,
            "showfrmCreate",
            "msgError"
        );
        localStorage.removeItem("type");
        localStorage.setItem("type", "1");
    } else if (type === 3 || type == 2) {
        // 2- Detail , 3 - Edit
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        control.hide();
        controledit.hide();
        historyLog.hide();
        getObserCode();
        if (isload) {
            controlassessment = [];
            auditobserve = [];
            $("#formEdit tbody").html("");
            document.getElementById("formEdit").reset();
            setTimeout(function () {
                fnGetDetail(type, value);
            }, 300);
            if (type == 2) {
                ViewDetail("#formEdit", true);
                localStorage.removeItem("type");
                localStorage.setItem("type", "2");
                document.getElementById("frmHeaderEdit").style.display = "none";
                document.getElementById("frmHeaderDetail").style.display = "block";
            } else {
                ViewDetail("#formEdit", false);
                localStorage.removeItem("type");
                localStorage.setItem("type", "3");
                document.getElementById("frmHeaderEdit").style.display = "block";
                document.getElementById("frmHeaderDetail").style.display = "none";
            }

            $(".btn-approve").hide();
        }
    } else if (type === 4 || type == 6) {
        // 4 - control-edit-create , 6 - control-detail-create
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        control.show();
        controledit.hide();
        historyLog.hide();
        listObserveCreate = [];
        $("#controlid").val(value);
        $("#riskid").val(riskid);
        $("#formControl tbody").html("");
        $(".listfile").empty();
        document.getElementById("formControl").reset();
        setTimeout(function () {
            onLoadProcedure(value, type == 6 ? true : false);
        }, 2000);
        setTimeout(function () {
            openControlCreate(
                parseInt($("#AuditCreate").val()),
                parseInt(riskid),
                value,
                type
            );
        }, 3000);
        if (type == 6) ViewDetail("#formControl", true);
        else ViewDetail("#formControl", false);
        $(".btn-approve").hide();
        $("#showbuttonApproval").hide();
        obsercode_value = obsercode_default;
    } else if (type === 5 || type == 7) {
        // 5 - control-edit-edit , 7 - control-detail-edit
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        control.hide();
        controledit.show();
        historyLog.hide();
        listObserveCreate = [];
        $("#controlidedit").val(value);
        $("#riskidedit").val(riskid);
        $("#formControlEdit tbody").html("");
        $(".listfile").empty();
        document.getElementById("formControlEdit").reset();
        setTimeout(function () {
            onLoadProcedure(value, type == 7 ? true : false);
        }, 2000);
        setTimeout(function () {
            openControlEdit(
                parseInt($("#AuditEdit").data("id")),
                parseInt(riskid),
                value,
                type
            );
        }, 3000);
        if (type == 7) ViewDetail("#formControlEdit", true);
        else ViewDetail("#formControlEdit", false);
        $(".btn-approve").hide();
        $("#showbuttonApproval").hide();
        obsercode_value = obsercode_default;
    } else if (type == 8 || type == 9) {
        // 8 - apprive , 9 - reject
        index.hide();
        create.hide();
        edit.show();
        detail.hide();
        control.hide();
        controledit.hide();
        historyLog.hide();
        if (isload) {
            controlassessment = [];
            auditobserve = [];
            $("#formEdit tbody").html("");
            document.getElementById("formEdit").reset();
            setTimeout(function () {
                fnGetDetail(2, value);
            }, 300);
            ViewDetail("#formEdit", false);
        }
        if (type == 8) {
            $(".btn-approve").show();
            $("#showbuttonApproval").hide();
            localStorage.removeItem("type");
            localStorage.setItem("type", "8");
        } else {
            $(".btn-approve").hide();
            $("#showbuttonApproval").show();
            localStorage.removeItem("type");
            localStorage.setItem("type", "9");
        }
        document.getElementById("frmHeaderEdit").style.display = "none";
        document.getElementById("frmHeaderDetail").style.display = "block";
    }
    else if (type == 10) {
        index.hide();
        create.hide();
        edit.hide();
        detail.hide();
        control.hide();
        controledit.hide();
        historyLog.show();
        onSearchHistoryLog(value);
    }
}

function showfrmCreate(res) {
    var create = $("#create");
    create.show();
    $("#formCreate").find("#PaperCodeCreate").val(res.privatecode);
}

function getObserCode() {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.observecode.path,
        apiConfig.api.workingpaper.action.observecode.method,
        null,
        "getObserCodeSuccess",
        "msgError"
    );
}
function getObserCodeSuccess(res) {
    obsercode_default = parseInt(res.observecode);
}
reCalculatPagesCustom(4);
viewBtnActionPage();

function onSearch() {
    var obj = {
        processid: $("#AuditProcess").val(),
        unitid: $("#Unit").val(),
        year: $("#Year").val(),
        code: $("#PaperCode").val().trim(),
        auditworkid: $("#Audit").val(),
        status: $("#Status").val(),
        page_size: parseInt($("#cbPageSize").val()),
        start_number:
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val()),
    };
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.search.path,
        apiConfig.api.workingpaper.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fnSearchWorkingPaperSuccess",
        "msgError"
    );
}

function onLoadProcedure(value, disabled) {
    callApi_auditservice(
        apiConfig.api.catauditprocedure.controller,
        apiConfig.api.catauditprocedure.action.getProcedure.path +
        "/" +
        value +
        "?disabled=" +
        disabled,
        apiConfig.api.catauditprocedure.action.getProcedure.method,
        {},
        "fnSearchProcedureSuccess",
        "msgError"
    );
}

function fnSearchProcedureSuccess(rspn) {
    var data = rspn.data;
    var disabled = rspn.disabled;
    var tbBody = $("#ProcedureTable tbody");
    $("#ProcedureTable").dataTable().fnDestroy();

    tbBody.html("");
    for (let value of data) {
        var obj = value;
        var html =
            '<tr data-procedures_id="' +
            obj.id +
            '">' +
            "<td>" +
            obj.name +
            "</td>" +
            '<td><textarea type="text" class="form-control" id="work" name="work"' +
            (disabled ? "disabled" : "") +
            "></textarea>" +
            "</td>" +
            "</tr>";
        tbBody.append(html);
    }
}

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

function fnSearchWorkingPaperSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        var data = rspn.data;
        var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        var tbBody = $("#workingtable tbody");
        $("#workingtable").dataTable().fnDestroy();
        var level_approval = getApprovallevel("M_WP");
        tbBody.html("");
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var statusname = getApprovalStatus("M_WP", obj.status);
            //var statusname = '';
            //switch (obj.status) {
            //    case "1.0": {
            //        statusname = 'Bản nháp';
            //        break;
            //    }
            //    case "1.1": {
            //        statusname = 'Chờ trường đoàn duyệt';
            //        break;
            //    }
            //    case "2.1": {
            //        statusname = 'Chờ trưởng KTNB duyệt'
            //        break;
            //    }
            //    case "2.2": {
            //        statusname = 'Trưởng đoàn từ chối';
            //        break;
            //    }
            //    case "3.1": {
            //        statusname = 'Trưởng KTNB đã duyệt';
            //        break;
            //    }
            //    case "3.2": {
            //        statusname = 'Trưởng KTNB từ chối';
            //        break;
            //    }
            //}
            var html =
                "<tr>" +
                '<td class="text-center" style="width: 5% !important;">' +
                (i + 1) +
                "</td>" +
                '<td style="width: 10% !important;">' +
                viewValue(obj.code) +
                "</td>" +
                '<td style="width: 5% !important;" class="text-center">' +
                viewValue(obj.year) +
                "</td>" +
                '<td style="width: 20% !important;"><span>' +
                viewValue(obj.auditworkname) +
                "</span></td>" +
                '<td style="width: 20% !important;"><span>' +
                viewValue(obj.processname) +
                "</span></td>" +
                '<td style="width: 20% !important;"><span>' +
                viewValue(obj.unitname) +
                "</span></td>" +
                '<td style="width: 10% !important;"><span>' +
                viewValue(statusname) +
                "</span></td>" +
                '<td class="col-action text-center" style="width: 10% !important;">' +
                (IsCheckPemission("M_WP", "PER_DETAIL") === true
                    ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(2,' +
                    obj.id +
                    ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>'
                    : '<a type="button" class="btn icon-disable btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>') +
                ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1") &&
                    IsCheckPemission("M_WP", "PER_EDIT") === true
                    ? '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(3,' +
                    obj.id +
                    ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>'
                    : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>') +
                ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2") &&
                    IsCheckPemission("M_WP", "PER_DEL") === true
                    ? '<a type="button" class="btn icon-delete btn-action-custom" onclick="Delete(\'' +
                    obj.code +
                    "'," +
                    obj.id +
                    ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>'
                    : '<a type="button" class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash" aria-hidden="true"></i></a>') +
                '<span class="dropdown">' +
                '<a class="btn icon-default btn-action-custom" data-toggle="dropdown" id="menu' +
                obj.id +
                '"><i class="fas fa-ellipsis-v"></i></a>' +
                '<ul class="dropdown-menu" role="menu" aria-labelledby="menu' +
                obj.id +
                '">' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default btn-action-custom btn-sm" style=" display: flex;" onclick="openView(10,' + obj.id + ')" data-id="' + obj.id + '" data-name="' + obj.name + '"><i data-toggle="tooltip" title="Lịch sử" class="fas fa-history" aria-hidden="true" ></i>&nbsp Lịch sử</a>' +
                "</li>" +
                '<li class="optioncustom">' +
                '<li class="optioncustom">' +
                ((obj.status == "1.0" || obj.status == "2.2" || obj.status == "3.2" || obj.status == "4.1") &&
                    IsCheckPemission("M_WP", "PER_REQUEST") === true
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(8,' +
                    obj.id +
                    ')" data-id="' +
                    obj.id +
                    '" data-name="' +
                    obj.name +
                    '" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Gửi phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Gửi phê duyệt" class="fa fa-paper-plane" aria-hidden="true" ></i>&nbsp Gửi phê duyệt</a>') +
                "</li>" +
                '<li class="optioncustom">' +
                (((obj.status == "1.1" && obj.approval_user == currentUser.id) || (obj.status == "2.1" && obj.approval_user_last == currentUser.id)) &&
                    IsCheckPemission("M_WP", "PER_APPROVE") === true
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="openView(9,' +
                    obj.id +
                    ')"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true"></i>&nbsp Phê duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Phê duyệt" class="fa fa-check-square" aria-hidden="true" ></i>&nbsp Phê duyệt</a>') +
                "</li>" +
                '<li class="optioncustom">' +
                (IsCheckPemission('M_WP', 'PER_CANCEL_APPROVAL') === true && ((level_approval == 1 && obj.status == "3.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "2.1" && obj.approval_user == currentUser.id) || (level_approval > 1 && obj.status == "3.1" && obj.approval_user_last == currentUser.id))
                    ? '<a class="btn icon-default btn-action-custom btn-sm"  onclick="CallCancelModal(' + obj.id + ',\'' + obj.code + '\',\'M_WP\',\'Giấy tờ làm việc\')" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" style="font-size: 16px;"></i>&nbsp Hủy duyệt</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Hủy duyệt" class="fa fa-ban" aria-hidden="true" ></i>&nbsp Hủy duyệt</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                ((IsCheckPemission('M_WP', 'PER_STATUS') === true && ((level_approval == 1 && obj.status == "1.1") || (level_approval > 1 && obj.status == "2.1")) && getApprovaloutSide('M_WP') == 1)
                    ? '<a class="btn icon-default btn-action-custom btn-sm" onclick="CallChangeStatusModal(' + obj.id + ',\'' + obj.code + '\',\'M_WP\',\'Giấy tờ làm việc\',' + obj.year + ')" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>'
                    : '<a class="btn icon-disabled btn-action-custom btn-sm" style=" display: flex;"><i data-toggle="tooltip" title="Cập nhật trạng thái" class="fa fa-sync" aria-hidden="true" ></i>&nbsp Cập nhật trạng thái</a>') +
                '</li>' +
                '<li class="optioncustom">' +
                '<a class="btn icon-default  btn-action-custom btn-sm"  style=" display: flex; padding: 4px 6px 2px !important;" onclick="ExportInlist(' + obj.id + ')"><i data-toggle="tooltip" title="" class="fas fa-file-excel" aria-hidden="true" data-original-title="Xuất excel" tyle="font-size: 16px;"></i>&nbsp Xuất excel</a>' +
                '</li>' +                
                "</ul>" +
                "</span>" +
                "</td>" +
                "</tr>";
            tbBody.append(html);
        }
        var page_size =
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val());

        var t = $("#workingtable").DataTable({
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
                    render: function (data, type, row, meta) {
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
                .each(function (cell, i) {
                    cell.innerHTML = i + page_size + 1;
                });
        }).draw();
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
    } else if (rspn.data == "") {
        var tbBody = $("#workingtable tbody");
        $("#workingtable").dataTable().fnDestroy();
        tbBody.html("");

        var page_size =
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val());
        var t = $("#workingtable").DataTable({
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
                    render: function (data, type, row, meta) {
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
                .each(function (cell, i) {
                    cell.innerHTML = i + page_size + 1;
                });
        }).draw();

        reCalculatPagesCustomNull();
        hideLoading();
    }
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
                fnDeleteWorkingPaper(id);
            }
        }
    );
}

function fnDeleteWorkingPaper(id) {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.delete.path + "/" + id,
        apiConfig.api.workingpaper.action.delete.method,
        null,
        "fnDeleteWorkingPaperSuccess",
        "msgError"
    );
}

function fnDeleteWorkingPaperSuccess(rspn) {
    if (rspn.code === "1") {
        createdLog("Giấy tờ làm việc", "Xóa Giấy tờ làm việc");
        SaveHistory(rspn.id, 3, "Xóa giấy tờ làm việc", '');
        toastr.success("Xóa dữ liệu thành công!", "Thông báo!");
        onSearch();
    } else if (rspn.code === "7") {
        toastr.error(localizationResources.Error007, "Error!");
    } else {
        toastr.error("Xóa dữ liệu không thành công!", "Error!");
    }
}

function getYearSearch() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { jsonData: JSON.stringify(obj) },
        "fillYearSearch"
    );
}

function genarateObserCode(i) {
    var EID = "";
    var yearnow = new Date().getFullYear();
    var str_start = "QS." + yearnow;
    if (i <= 9) {
        EID = str_start + ".000" + i;
    } else if (i > 9 && i <= 99) {
        EID = str_start + ".00" + i;
    } else if (i > 99 && i <= 999) {
        EID = str_start + ".0" + i;
    }
    return EID;
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
    openView(type, id);
};

//#region Search
function fillYearSearch(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#Year").html("");
    $("#Year").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, "issues", "method_id");
    $("#Year").append(html);
}

function getValueYear(value) {
    var _year = value;
    getAuditSearch(_year);
}

function getAuditSearch(year) {
    var obj = {
        year: year,
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.search.path,
        apiConfig.api.auditwork.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillAuditSearch"
    );
}

function fillAuditSearch(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#Audit").html("");
    $("#Audit").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#Audit").append(html);
}

function getValueAudit(value) {
    var _audit = value;

    call_back = "fillUnitSearch";
    call_back2 = "fillProcessSearch";

    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getunit.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit))+
        "/0",
        apiConfig.api.auditworkscope.action.getunit.method,
        null,
        call_back,
        "msgError"
    );

    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getprocess.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)),
        apiConfig.api.auditworkscope.action.getprocess.method,
        null,
        call_back2,
        "msgError"
    );
}

function getUnitSearch(id) {
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getunit.path +
        "/" +
        parseInt(id) +
        "/0",
        apiConfig.api.auditworkscope.action.getunit.method,
        { jsonData: JSON.stringify(obj) },
        "fillUnitSearch"
    );
}

function fillUnitSearch(rspn) {
    var data = rspn.data;

    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#search-facility").html("");
    $("#Unit").html("");
    $("#search-facility").append(htmlOption);
    $("#Unit").append(htmlOption);
    if (data == undefined || data == null || data.length == 0) return;
    var html = generateComboOptions(data, 0, "childs");
    $("#search-facility").append(html);
    $("#Unit").append(html);
}

function getProcessSearch() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillProcessSearch"
    );
}

function fillProcessSearch(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#AuditProcess").html("");
    $("#AuditProcess").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#AuditProcess").append(html);
}
//#endregion Search

//#region Create
function getYearCreate() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { jsonData: JSON.stringify(obj) },
        "fillYearCreate"
    );
}
function fillYearCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#YearCreate").html("");
    $("#YearCreate").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, "issues", "method_id");
    $("#YearCreate").append(html);
}
function getValueYearCreate(value) {
    var _year = value;
    getAuditCreate(_year);
}

function getAuditCreate(year) {
    var obj = {
        year: year,
        //execution_status: 1,
        //key: "",
        //code: "",
        //status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchprepareauditapproved.path,
        apiConfig.api.auditwork.action.searchprepareauditapproved.method,
        { jsonData: JSON.stringify(obj) },
        "fillAuditCreate"
    );
}
function fillAuditCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#AuditCreate").html("");
    $("#AuditCreate").append(htmlOption);
    $("#AuditProcessCreate").html("");
    $("#AuditProcessCreate").append(htmlOption);
    $("#AuditUnitCreate").html("");
    $("#AuditUnitCreate").append(htmlOption);
    getValueUnitCreate(-1, -1, -1);
    var new_option = new Option("", "", true, true);
    $("#RiskCreate").empty();
    $("#RiskCreate").append(new_option);
    getValueRisk("");
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#AuditCreate").append(html);
}
function getValueAuditCreate(value) {
    var _audit = value;
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getprocess.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)),
        apiConfig.api.auditworkscope.action.getprocess.method,
        null,
        "fillProcessCreate",
        "msgError"
    );
}

function fillProcessCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#AuditProcessCreate").html("");
    $("#AuditProcessCreate").append(htmlOption);
    $("#AuditUnitCreate").html("");
    $("#AuditUnitCreate").append(htmlOption);
    getValueUnitCreate(-1, -1, -1);
    var new_option = new Option("", "", true, true);
    $("#RiskCreate").empty();
    $("#RiskCreate").append(new_option);
    getValueRisk("");
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#AuditProcessCreate").append(html);
    parentLoaded = true;
}
function getValueProcessCreate(value, auditid) {
    var _audit = auditid;
    var _process = value,
        call_back = "fillUnitCreate";
    callApi_auditservice(
        apiConfig.api.auditworkscope.controller,
        apiConfig.api.auditworkscope.action.getunit.path +
        "/" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)) +
        "/" +
        (isNaN(parseInt(_process)) ? 0 : parseInt(_process)),
        apiConfig.api.auditworkscope.action.getunit.method,
        null,
        call_back,
        "msgError"
    );
}

function getAsigneeCreate() {
    var obj = {
        full_name: "",
        users_type: "",
        user_name: "",
        department_id: "",
        status: "-1",
        page_size: 9999,
        start_number: 0,
    };
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.search.path,
        apiConfig.api.systemuser.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillAssigneeCreate"
    );
}
function fillAssigneeCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#AsigneeCreate").html("");
    $("#AsigneeCreate").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboUserOptions(data.data, 0, "issues", "method_id");
    $("#AsigneeCreate").append(html);
}

function getReviewerCreate() {
    var obj = {
        full_name: "",
        users_type: "",
        user_name: "",
        department_id: "",
        status: "-1",
        page_size: 9999,
        start_number: 0,
    };
    callApi_userservice(
        apiConfig.api.systemuser.controller,
        apiConfig.api.systemuser.action.search.path,
        apiConfig.api.systemuser.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillReviewerCreate"
    );
}
function fillReviewerCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#ReviewerCreate").html("");
    $("#ReviewerCreate").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboUserOptions(data.data, 0, "issues", "method_id");
    $("#ReviewerCreate").append(html);
}

function fillUnitCreate(rspn) {
    var data = rspn.data;
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#search-facility").html("");
    $("#AuditUnitCreate").html("");
    $("#search-facility").append(htmlOption);
    $("#AuditUnitCreate").append(htmlOption);
    getValueUnitCreate(-1, -1, -1);
    var new_option = new Option("", "", true, true);
    $("#RiskCreate").empty();
    $("#RiskCreate").append(new_option);
    getValueRisk("");
    if (data == undefined || data == null || data.length == 0) {
        return;
    }

    var html = generateComboOptions(data, 0, "childs");
    $("#search-facility").append(html);
    $("#AuditUnitCreate").append(html);
}
function getValueUnitCreate(auditid, processid, unitid) {
    getRiskCreate(auditid, processid, unitid);
}

function getRiskCreate(auditid, processid, unitid) {
    var _audit = auditid;
    var _process = processid;
    var _unit = unitid;

    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.getriskworkingpaper.path +
        "?auditid=" +
        (isNaN(parseInt(_audit)) ? 0 : parseInt(_audit)) +
        "&processid=" +
        (isNaN(parseInt(_process)) ? 0 : parseInt(_process)) +
        "&unitid=" +
        (isNaN(parseInt(_unit)) ? 0 : parseInt(_unit)) +
        "&detail=false",
        apiConfig.api.workingpaper.action.getriskworkingpaper.method,
        null,
        "fillRiskCreate"
    );
}
function fillRiskCreate(data) {
    $("#RiskCreate").empty();
    //var htmlOption =
    //    '<option value="">----' + localizationResources.Choose + "----</option>";
    //$("#RiskCreate").html("");
    //$("#RiskCreate").append(htmlOption);

    //if (data.data == undefined || data.data == null || data.data.length == 0) {
    //    return;
    //}

    //var html = generateComboOptions(data.data, 0, "issues", "method_id");
    //$("#RiskCreate").append(html);

    var usingData = $.map(data.data, function (obj) {
        obj.text = obj.name;

        return obj;
    });

    $("#RiskCreate").select2({
        placeholder: localizationResources.Choose,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: false,
        data: usingData
    });
    $("#RiskCreate").change();

}
function getValueRisk(input) {
    var _auditprocess = $(input).val() != null || $(input).val() != undefined ? $(input).val().join(',') : "";
    call_back = "fnGetDetailRiskSuccess";

    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.searchlist.path + "?strid=" + _auditprocess,
        apiConfig.api.catrisk.action.searchlist.method,
        null,
        call_back,
        "msgError"
    );
}
function fnGetDetailRiskSuccess(rspn) {
    var frmModify = $("#formCreate");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        var tbBody = $("#risktablecreate tbody");
        tbBody.html('');
        $("#risktablecreate").dataTable().fnDestroy();
        var listid = []
        for (var item of data) {
            listid.push(item.id);
            tbBody.append(
                "<tr>" +
                '<td scope="col" style="width:10%">' +
                item.code +
                "</td>" +
                '<td scope="col" style="width:30%">' +
                item.name +
                "</td>" +
                '<td scope="col" style="width:60%">' +
                item.description +
                "</td>" +
                "</tr>"
            );
        }

        setTimeout(function () {
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.path +
                "?strid=" +
                listid.join(','),
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.method,
                {},
                "fnGetControlSuccess"
            );
        }, 200);
    }
}
function fnGetControlSuccess(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $("#controlTable tbody");
    $("#controlTable").dataTable().fnDestroy();

    tbBody.html("");
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var wp = [];
        if (obj.controlassassment != null)
            obj.controlassassment.forEach(function (v, i) {
                if (
                    v.workingpapercode != null &&
                    v.workingpaperid != $("#IdEdit").val()
                )
                    wp.push(
                        `<a href="javascript:void(0)" onclick="openOther(${v.workingpaperid},${v.riskid},${obj.id})">${v.workingpapercode}</a>`
                    );
            });
        var controlfrequencey =
            obj.controlfrequency == 1
                ? "Mỗi khi phát sinh"
                : obj.controlfrequency == 2
                    ? "Nhiều lần trong ngày"
                    : obj.controlfrequency == 3
                        ? "Hằng ngày"
                        : obj.controlfrequency == 4
                            ? "Hằng tuần"
                            : obj.controlfrequency == 5
                                ? "Hằng tháng"
                                : obj.controlfrequency == 6
                                    ? "Hàng quý"
                                    : obj.controlfrequency == 7
                                        ? "Hằng năm"
                                        : "";
        var controltype =
            obj.controltype == 1
                ? "Phòng ngừa"
                : obj.controltype == 2
                    ? "Phát hiện"
                    : "";
        var controlformat =
            obj.controlformat == 1
                ? "Tự động"
                : obj.controlformat == 2
                    ? "Bán tự động"
                    : obj.controlformat == 3
                        ? "Thủ công"
                        : "";
        var html =
            "<tr data-controlid=" +
            obj.id +
            ">" +
            '<td class="text-center" style="width: 5% !important;">' +
            (i + 1) +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.riskcode) +
            "</p></td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.code) +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            viewValue(obj.description) +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            wp.join(",") +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlfrequencey +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controltype +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlformat +
            "</p></td>" +
            '<td class="text-center" style="width: 15% !important;">' +
            '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(6,' +
            obj.id +
            ',' + obj.riskcontrolid + ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
            '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(4,' +
            obj.id +
            ',' + obj.riskcontrolid + ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
            "</td>" +
            "</tr>";
        tbBody.append(html);
    }
}

function SubmitObserveCreate() {
    var checkvalidate = true;
    var type = $("#typeObserveCreate").val();
    var objid = $("#idObserveCreate").val();
    var evidenceObserve = [];
    var objitem = listObserveCreate.find((item) => item.id === objid);
    var input = document.getElementById("AuditEvidenceCreate");
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
                checkvalidate = false;
                return false;
            }
            evidenceObserve.push(imageFile);
        });
    }
    if (checkvalidate) {
        if (objitem == undefined) {
            var id =
                listObserveCreate.length == 0
                    ? "1"
                    : parseInt(listObserveCreate[listObserveCreate.length - 1].id) +
                    1 +
                    "";
            var code = genarateObserCode(obsercode_value);
            obsercode_value++;
            var obj = {
                code: code,
                id: id,
                controlid: $("#controlid").val(),
                riskid: $("#riskid").val(),
                name: $("#AuditObserveNameCreate").val(),
                year: $("#YearCreate").val(),
                auditworkid: $("#AuditCreate").val(),
                auditworkname: $("#AuditCreate option:selected").text(),
                description: $("#AuditObserveDescriptionCreate").val(),
                note: $("#AuditObserveNoteCreate").val(),
                evidence: evidenceObserve,
                type: type,
            };
            listObserveCreate.push(obj);
            var index = 1;
            if (type == 1) {
                index =
                    (parseInt($("#tableObserve1Edit tbody tr:last td:first").text()) ||
                        0) + 1;
            } else {
                index =
                    (parseInt($("#tableObserve2Edit tbody tr:last td:first").text()) ||
                        0) + 1;
            }
            var html =
                '<tr data-id="' +
                obj.id +
                '">' +
                "<td>" +
                index +
                "</td>" +
                "<td>" +
                obj.code +
                "</td>" +
                "<td>" +
                obj.name +
                "</td>" +
                "<td>" +
                obj.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                type +
                ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveCreate(\'' +
                obj.id +
                '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>' +
                "</td>" +
                "</tr>";
            if (type == 1) $("#tableObserve1 tbody").append(html);
            else {
                $("#tableObserve2 tbody").append(html);
            }
        } else {
            objitem.name = $("#AuditObserveNameCreate").val();
            objitem.description = $("#AuditObserveDescriptionCreate").val();
            objitem.note = $("#AuditObserveDescriptionCreate").val();
            var index = $('tr[data-id="' + objid + '"] td:first').text();
            var $row = $('tr[data-id="' + objid + '"]').html("");

            if (evidenceObserve.length > 0)
                objitem.evidence = objitem.evidence.concat(evidenceObserve);
            var html =
                "<td>" +
                index +
                "</td>" +
                "<td>" +
                objitem.code +
                "</td>" +
                "<td>" +
                objitem.name +
                "</td>" +
                "<td>" +
                objitem.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                type +
                ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveCreate(\'' +
                objitem.id +
                '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>' +
                "</td>";
            $row.append(html);
        }
        $("#modalAuditObserveCreate").modal("hide");
    }
}
function deleteObserveCreate(id, elment) {
    listObserveCreate = listObserveCreate.filter(function (value, index, arr) {
        return value.id != id;
    });
    $(elment).closest("tr").remove();
}

function submitControlAssessmentCreate() {
    var checkvalidate = true;
    var listprocedure = [];
    var riskid = $("#riskid").val();
    var controlid = $("#controlid").val();
    var designAssessment = $("#DesignAssessment").val();
    var designConclusion = $("#DesignConclusion").val();
    var effectiveAssessment = $("#EffectiveAssessment").val();
    var effectiveConclusion = $("#EffectiveConclusion").val();
    var sampleConclusion = $("#Sample").val();
    $("#formControl #ProcedureTable tbody")
        .find("tr")
        .each(function (e, v) {
            var obj = {
                procedures_id: $(v).data("procedures_id"),
                result: $(v).find("#work").val(),
            };
            listprocedure.push(obj);
        });

    var PathCreate1 = [];
    var PathCreate2 = [];
    for (var i = 1; i < 3; i++) {
        var input = document.getElementById("PathCreate_" + i);
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
            $.each(input.files, function (index, v) {
                var imageFile = v;
                var fileType = v.name.substr(v.name.lastIndexOf(".") + 1);
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    toastr.error(
                        "Định dạng file " + fileType + " không được hỗ trợ!",
                        "Error!",
                        { progressBar: true }
                    );
                    checkvalidate = false;
                    return false;
                }
                if (i == 1) {
                    PathCreate1.push(imageFile);
                } else {
                    PathCreate2.push(imageFile);
                }
            });
        }
    }

    if (checkvalidate) {
        var objitem = controlassessment.find(
            (x) => x.riskid == riskid && x.controlid == controlid
        );
        if (objitem == undefined) {
            controlassessment.push({
                workingpaperid: 0,
                //riskid: riskid,
                controlid: controlid,
                designassessment: designAssessment,
                designconclusion: designConclusion,
                effectiveassessment: effectiveAssessment,
                effectiveconclusion: effectiveConclusion,
                sampleConclusion: sampleConclusion,
                image1: PathCreate1,
                image2: PathCreate2,
                procedures: listprocedure,
            });
        } else {
            objitem.designassessment = designAssessment;
            objitem.designconclusion = designConclusion;
            objitem.effectiveassessment = effectiveAssessment;
            objitem.effectiveconclusion = effectiveConclusion;
            objitem.sampleConclusion =  sampleConclusion;
            objitem.image1 = objitem.image1.concat(PathCreate1);
            objitem.image2 = objitem.image2.concat(PathCreate2);
            objitem.procedures = listprocedure;
        }
        if (auditobserve != undefined && auditobserve != null && auditobserve.length > 0)
            auditobserve = auditobserve.filter(
                (x) => { return (x.controlid != controlid || x.riskid != riskid) }
            );
        auditobserve = auditobserve.concat(listObserveCreate);
        obsercode_default = obsercode_value;
        openView(1, 0, 0, false);
        genaratelistobserveCreate();
    }
}

function genaratelistobserveCreate() {
    var index = 1;
    $("#workingtable2 tbody").empty();
    for (var item of auditobserve) {
        var controlcode = $(
            "#controlTable tbody tr[data-controlid='" + item.controlid + "'] td:eq(2)"
        ).text();
        var html =
            "<tr>" +
            "<td>" +
            index +
            "</td>" +
            "<td>" +
            controlcode +
            "</td>" +
            "<td>" +
            item.code +
            "</td>" +
            "<td>" +
            item.description +
            "</td>" +
            "</tr>";
        $("#workingtable2 tbody").append(html);
        index++;
    }
}

function openControlCreate(auditid, riskid, controlid, type) {
    var objitem = controlassessment.find(
        (x) => /*x.riskid == riskid &&*/ x.controlid == controlid
    );
    if (objitem != undefined) {
        $("#DesignAssessment").val(objitem.designassessment);
        $("#DesignConclusion").val(objitem.designconclusion);
        $("#EffectiveAssessment").val(objitem.effectiveassessment);
        $("#EffectiveConclusion").val(objitem.effectiveconclusion);
        $("#Sample").val(viewValue(objitem.sampleConclusion));
        for (const element of objitem.procedures) {
            $(
                "#formControl #ProcedureTable tbody tr[data-procedures_id='" +
                element.procedures_id +
                "']"
            )
                .find("#work")
                .val(element.result);
            if (type == 6)
                $(
                    "#formControl #ProcedureTable tbody tr[data-procedures_id='" +
                    element.procedures_id +
                    "']"
                )
                    .find("#work")
                    .prop("disabled", true);
            else
                $(
                    "#formControl #ProcedureTable tbody tr[data-procedures_id='" +
                    element.procedures_id +
                    "']"
                )
                    .find("#work")
                    .prop("disabled", false);
        }
        listObserveCreate = auditobserve.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid && x.riskid == riskid;
        });
        var index1 = 1;
        var index2 = 1;
        for (const element of auditobserve.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid && x.riskid == riskid;
        })) {
            var html =
                '<tr data-id="' +
                element.id +
                '">' +
                "<td>" +
                (element.type == 1 ? index1 : index2) +
                "</td>" +
                "<td>" +
                element.code +
                "</td>" +
                "<td>" +
                element.name +
                "</td>" +
                "<td>" +
                element.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                element.type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                (type != 6
                    ? '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveCreate" onclick="openModalObserveCreate(' +
                    element.type +
                    ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>'
                    : "") +
                (type != 6
                    ? '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveCreate(\'' +
                    element.id +
                    '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>'
                    : "") +
                "</td>" +
                "</tr>";
            if (element.type == 1) {
                $("#tableObserve1 tbody").append(html);
                index1++;
            } else {
                $("#tableObserve2 tbody").append(html);
                index2++;
            }
        }

        GenerateListFileName(objitem, "image1", "", "#PathCreate_1_listfile", true, type == 6 ? false : true, type == 6 ? "" : "Create");
        GenerateListFileName(objitem, "image2", "", "#PathCreate_2_listfile", true, type == 6 ? false : true, type == 6 ? "" : "Create");
    }
}
function openModalObserveCreate(type, method, elment) {
    observecreate.resetForm();
    $("#formObserveCreate input").removeClass("error");
    var id = $(elment).closest("tr").data("id");
    const objitem = listObserveCreate.find((item) => item.id == id);
    $("#formObserveCreate #title-create").hide();
    $("#formObserveCreate #title-edit").hide();
    $("#formObserveCreate #title-detail").hide();
    if (method == "Add") {
        $("#formObserveCreate #title-create").show();
        $("#modalAuditObserveCreate").find("input").prop("disabled", false);
        $("#modalAuditObserveCreate").find("textarea").prop("disabled", false);
        $("#modalAuditObserveCreate").find("input").val("");
        $("#modalAuditObserveCreate").find("textarea").val("");
        $("#modalAuditObserveCreate").find(".listfile").empty();
        $(".SaveObserve").show();
    }

    if (method == "Edit") {
        $("#formObserveCreate #title-edit").show();
        $("#modalAuditObserveCreate").find("input").prop("disabled", false);
        $("#modalAuditObserveCreate").find("textarea").prop("disabled", false);
        $("#modalAuditObserveCreate").find("input").val("");
        $("#modalAuditObserveCreate").find("textarea").val("");
        $("#modalAuditObserveCreate").find(".listfile").empty();
        $(".SaveObserve").show();
        $("#AuditObserveNameCreate").val(objitem.name);
        $("#AuditObserveDescriptionCreate").val(objitem.description);
        $("#AuditObserveNoteCreate").val(objitem.note);
        $("#AuditEvidenceListFileCreate").append();
        GenerateListFileName(
            objitem,
            "evidence",
            "",
            "#AuditEvidenceListFileCreate",
            true,
            true,
            "Create"
        );
    }
    if (method == "Detail") {
        $("#formObserveCreate #title-detail").show();
        $("#modalAuditObserveCreate").find("input").prop("disabled", true);
        $("#modalAuditObserveCreate").find("textarea").prop("disabled", true);
        $("#modalAuditObserveCreate").find("input").val("");
        $("#modalAuditObserveCreate").find("textarea").val("");
        $("#modalAuditObserveCreate").find(".listfile").empty();
        $(".SaveObserve").hide();
        $("#AuditObserveNameCreate").val(objitem.name);
        $("#AuditObserveDescriptionCreate").val(objitem.description);
        $("#AuditObserveNoteCreate").val(objitem.note);
        GenerateListFileName(
            objitem,
            "evidence",
            "",
            "#AuditEvidenceListFileCreate",
            true,
            false,
            "",
        );
    }

    $("#typeObserveCreate").val(type);
    $("#idObserveCreate").val(id);
}

function submitCreate() {
    var obj = {
        code: $("#PaperCodeCreate").val().trim(),
        year: $("#YearCreate").val().trim(),
        auditworkid: $("#AuditCreate").val(),
        processid: $("#AuditProcessCreate").val(),
        unitid: $("#AuditUnitCreate").val(),
        status: $("#StatusCreate").val(),
        //prototype: $("#ObjCreate").val().trim(),
        riskid: $("#RiskCreate").val(),
        listcontrol: controlassessment,
        listobserve: auditobserve,
        conclusion: $("#ConclusionCreate").val().trim(),
    };
    var formdata = new FormData();
    formdata.append("wp.year", obj.year);
    formdata.append("wp.code", obj.code);
    formdata.append("wp.auditworkid", obj.auditworkid);
    formdata.append("wp.processid", obj.processid);
    formdata.append("wp.unitid", obj.unitid);
    formdata.append("wp.status", obj.status);
    formdata.append("wp.prototype", obj.prototype);
    formdata.append("wp.riskid", obj.riskid);
    formdata.append("wp.conclusion", obj.conclusion);
    obj.listcontrol.forEach(function (value, index) {
        //formdata.append("wp.listcontrol[" + index + "].riskid", value.riskid);
        formdata.append("wp.listcontrol[" + index + "].controlid", value.controlid);
        formdata.append(
            "wp.listcontrol[" + index + "].designassessment",
            value.designassessment
        );
        formdata.append(
            "wp.listcontrol[" + index + "].designconclusion",
            value.designconclusion
        );
        formdata.append(
            "wp.listcontrol[" + index + "].effectiveassessment",
            value.effectiveassessment
        );
        formdata.append(
            "wp.listcontrol[" + index + "].effectiveconclusion",
            value.effectiveconclusion
        );
        formdata.append(
            "wp.listcontrol[" + index + "].sampleconclusion",
            value.sampleConclusion
        );
        value.image1.forEach(function (v, i) {
            formdata.append("wp.listcontrol[" + index + "].image1", v);
        });
        value.image2.forEach(function (v, i) {
            formdata.append("wp.listcontrol[" + index + "].image2", v);
        });
        value.procedures.forEach(function (v, i) {
            formdata.append(
                "wp.listcontrol[" + index + "].listprocedures[" + i + "].procedures_id",
                v.procedures_id
            );
            formdata.append(
                "wp.listcontrol[" + index + "].listprocedures[" + i + "].result",
                v.result
            );
        });
    });
    obj.listobserve.forEach(function (value, index) {
        formdata.append("wp.listobserve[" + index + "].controlid", value.controlid);
        //formdata.append("wp.listobserve[" + index + "].riskid", value.riskid);
        formdata.append("wp.listobserve[" + index + "].name", value.name);
        formdata.append("wp.listobserve[" + index + "].year", obj.year);
        formdata.append(
            "wp.listobserve[" + index + "].auditwork_id",
            value.auditworkid
        );
        formdata.append(
            "wp.listobserve[" + index + "].auditwork_name",
            value.auditworkname
        );
        formdata.append(
            "wp.listobserve[" + index + "].description",
            value.description
        );
        formdata.append("wp.listobserve[" + index + "].note", value.note);
        formdata.append("wp.listobserve[" + index + "].type", value.type);
        value.evidence.forEach(function (v, e) {
            formdata.append("wp.listobserve[" + index + "].evidence", v);
        });
    });

    callApi_auditservice_update(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.add.path,
        formdata,
        "createWorkingPaperSuccess",
        "msgError"
    );
}
function createWorkingPaperSuccess(data) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    if (data.code === "1") {
        createdLog("Giấy tờ làm việc", "Thêm giấy tờ làm việc");
        SaveHistory(data.id, 3, "Thêm mới giấy tờ làm việc", '');
        toastr.success("Thêm mới dữ liệu thành công!", "Thông báo!", {
            progressBar: true,
        });
        setTimeout(function () {
            window.location.href = "/WorkingPaper";
        }, 2000);
    } else if (data.code === "-1") {
        toastr.error("Mã giấy tờ đã tồn tại!", "Thông báo!", {
            progressBar: true,
        });
        setTimeout(function () {
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.privatecode.path,
                apiConfig.api.workingpaper.action.privatecode.method,
                null,
                "showfrmCreate",
                "msgError"
            );
        }, 2000);
    } else {
        toastr.error("Thêm mới thất bại!", "Error!", { progressBar: true });
    }
}

//#endregion Create

//#region Edit
function getValueRiskEdit(value) {
    var _auditprocess = value;
    call_back = "fnGetDetailRiskSuccessEdit";

    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.searchlist.path + "?strid=" + _auditprocess,
        apiConfig.api.catrisk.action.searchlist.method,
        null,
        call_back,
        "msgError"
    );
}
function fnGetDetailRiskSuccessEdit(rspn) {
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        var tbBody = $("#risktableedit tbody");
        tbBody.html('');
        $("#risktableedit").dataTable().fnDestroy();
        var listid = []
        for (var item of data) {
            listid.push(item.id);
            tbBody.append(
                "<tr>" +
                '<td scope="col" style="width:10%">' +
                item.code +
                "</td>" +
                '<td scope="col" style="width:30%">' +
                item.name +
                "</td>" +
                '<td scope="col" style="width:60%">' +
                item.description +
                "</td>" +
                "</tr>"
            );
        }

        setTimeout(function () {
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.path +
                "?strid=" +
                listid.join(','),
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.method,
                {},
                "fnGetControlSuccessEdit"
            );
        }, 200);
    }
}
function fnGetControlSuccessEdit(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $("#controlTableEdit tbody");
    $("#controlTableEdit").dataTable().fnDestroy();
    tbBody.html("");
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var wp = [];
        if (obj.controlassassment != null)
            obj.controlassassment.forEach(function (v, i) {
                if (
                    v.workingpapercode != null &&
                    v.workingpaperid != $("#IdEdit").val()
                )
                    wp.push(
                        `<a href="javascript:void(0)" onclick="openOther(${v.workingpaperid},${v.riskid},${obj.id})">${v.workingpapercode}</a>`
                    );
            });
        var controlfrequencey =
            obj.controlfrequency == 1
                ? "Mỗi khi phát sinh"
                : obj.controlfrequency == 2
                    ? "Nhiều lần trong ngày"
                    : obj.controlfrequency == 3
                        ? "Hằng ngày"
                        : obj.controlfrequency == 4
                            ? "Hằng tuần"
                            : obj.controlfrequency == 5
                                ? "Hằng tháng"
                                : obj.controlfrequency == 6
                                    ? "Hàng quý"
                                    : obj.controlfrequency == 7
                                        ? "Hằng năm"
                                        : "";
        var controltype =
            obj.controltype == 1
                ? "Phòng ngừa"
                : obj.controltype == 2
                    ? "Phát hiện"
                    : "";
        var controlformat =
            obj.controlformat == 1
                ? "Tự động"
                : obj.controlformat == 2
                    ? "Bán tự động"
                    : obj.controlformat == 3
                        ? "Thủ công"
                        : "";
        var html =
            "<tr data-controlid=" +
            obj.id +
            ">" +
            '<td class="text-center" style="width: 5% !important;">' +
            (i + 1) +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.riskcode) +
            "</p></td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.code) +
            "</p></td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.description) +
            "</p></td>" +
            '<td style="width: 10% !important;">' +
            wp.join(",") +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlfrequencey +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controltype +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlformat +
            "</p></td>" +
            '<td class="text-center" style="width: 15% !important;">' +
            '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(7,' +
            obj.id + ',' + obj.riskcontrolid +
            ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
            '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(5,' +
            obj.id + ',' + obj.riskcontrolid +
            ')"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" ></i></a>' +
            "</td>" +
            "</tr>";
        tbBody.append(html);
    }
    genaratelistobserveEdit();
    ViewDetail("#formEdit", false);
}

function SubmitObserveEdit() {
    var checkvalidate = true;
    var type = $("#typeObserveEdit").val();
    var objid = $("#idObserveEdit").val();
    var evidenceObserve = [];
    var objitem = listObserveCreate.find((item) => item.id == objid);
    var input = document.getElementById("AuditEvidenceEdit");
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
                checkvalidate = false;
                return false;
            }
            evidenceObserve.push(imageFile);
        });
    }
    if (checkvalidate) {
        if (objitem == undefined) {
            var id =
                listObserveCreate.length == 0
                    ? "1-new"
                    : parseInt(listObserveCreate[listObserveCreate.length - 1].id) +
                    1 +
                    "-new";
            var code = genarateObserCode(obsercode_value);
            obsercode_value++;
            var obj = {
                code: code,
                id: id,
                controlid: $("#controlidedit").val(),
                //riskid: $("#riskidedit").val(),
                name: $("#AuditObserveNameEdit").val(),
                year: $("#YearEdit").data("id"),
                auditworkid: $("#AuditEdit").data("id"),
                auditworkname: $("#AuditEdit").val(),
                description: $("#AuditObserveDescriptionEdit").val(),
                note: $("#AuditObserveNoteEdit").val(),
                evidence: evidenceObserve,
                type: type,
            };
            listObserveCreate.push(obj);
            var index = 1;
            if (type == 1) {
                index =
                    (parseInt($("#tableObserve1Edit tbody tr:last td:first").text()) ||
                        0) + 1;
            } else {
                index =
                    (parseInt($("#tableObserve2Edit tbody tr:last td:first").text()) ||
                        0) + 1;
            }
            var html =
                '<tr data-id="' +
                obj.id +
                '">' +
                "<td>" +
                index +
                "</td>" +
                "<td>" +
                obj.code +
                "</td>" +
                "<td>" +
                obj.name +
                "</td>" +
                "<td>" +
                obj.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                type +
                ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveEdit(\'' +
                obj.id +
                '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>' +
                "</td>" +
                "</tr>";
            if (type == 1) $("#tableObserve1Edit tbody").append(html);
            else {
                $("#tableObserve2Edit tbody").append(html);
            }
        } else {
            objitem.name = $("#AuditObserveNameEdit").val();
            objitem.description = $("#AuditObserveDescriptionEdit").val();
            objitem.note = $("#AuditObserveDescriptionEdit").val();
            var index = $('tr[data-id="' + objid + '"] td:first').text();
            var $row = $('tr[data-id="' + objid + '"]').html("");

            if (evidenceObserve.length > 0)
                objitem.evidence = objitem.evidence.concat(evidenceObserve);
            var html =
                "<td>" +
                index +
                "</td>" +
                "<td>" +
                objitem.code +
                "</td>" +
                "<td>" +
                objitem.name +
                "</td>" +
                "<td>" +
                objitem.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                type +
                ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>' +
                '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveEdit(\'' +
                objitem.id +
                '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>' +
                "</td>";
            $row.append(html);
        }
        $("#modalAuditObserveEdit").modal("hide");
    }
}
function deleteObserveEdit(id, elment) {
    listObserveCreate = listObserveCreate.filter(function (value, index, arr) {
        return value.id != id;
    });
    $(elment).closest("tr").remove();
}

function submitControlAssessmentEdit() {
    var checkvalidate = true;
    var listprocedure = [];

    var controlid = $("#controlidedit").val();
    //var riskid = $("#riskidedit").val();
    var auditid = $("#AuditEdit").data("id");
    var designAssessment = $("#DesignAssessmentEdit").val();
    var designConclusion = $("#DesignConclusionEdit").val();
    var effectiveAssessment = $("#EffectiveAssessmentEdit").val();
    var effectiveConclusion = $("#EffectiveConclusionEdit").val();
    var sampleConclusion = $("#SampleEdit").val();
    $("#formControlEdit #ProcedureTable tbody")
        .find("tr")
        .each(function (e, v) {
            var obj = {
                procedures_id: $(v).data("procedures_id"),
                result: $(v).find("#work").val(),
            };
            listprocedure.push(obj);
        });

    var PathCreate1 = [];
    var PathCreate2 = [];
    for (var i = 1; i < 3; i++) {
        var input = document.getElementById("PathCreate_" + i + "Edit");
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
            $.each(input.files, function (index, v) {
                var imageFile = v;
                var fileType = v.name.substr(v.name.lastIndexOf(".") + 1);
                if ($.inArray(fileType.toLowerCase(), validImageTypes) < 0) {
                    toastr.error(
                        "Định dạng file " + fileType + " không được hỗ trợ!",
                        "Error!",
                        { progressBar: true }
                    );
                    checkvalidate = false;
                    return false;
                }
                if (i == 1) {
                    PathCreate1.push(imageFile);
                } else {
                    PathCreate2.push(imageFile);
                }
            });
        }
    }

    if (checkvalidate) {
        var objitem = controlassessment.find(
            (x) => /*x.riskid == riskid &&*/ x.controlid == controlid
        );
        if (objitem == undefined) {
            controlassessment.push({
                id: 0,
                workingpaperid: 0,
                //riskid: riskid,
                controlid: controlid,
                designassessment: designAssessment,
                designconclusion: designConclusion,
                effectiveassessment: effectiveAssessment,
                effectiveconclusion: effectiveConclusion,
                sampleConclusion: sampleConclusion,
                image1: PathCreate1,
                image2: PathCreate2,
                procedures: listprocedure,
            });
        } else {
            objitem.designassessment = designAssessment;
            objitem.designconclusion = designConclusion;
            objitem.effectiveassessment = effectiveAssessment;
            objitem.effectiveconclusion = effectiveConclusion;
            objitem.sampleConclusion = sampleConclusion;
            objitem.image1 = objitem.image1.concat(PathCreate1);
            objitem.image2 = objitem.image2.concat(PathCreate2);
            objitem.procedures = listprocedure;
        }
        if (auditobserve != undefined && auditobserve != null && auditobserve.length > 0)
            auditobserve = auditobserve.filter(
                (x) => { return (x.controlid != controlid /*|| x.riskid != riskid*/) && x.auditworkid == auditid }
            );
        auditobserve = auditobserve.concat(listObserveCreate);
        obsercode_default = obsercode_value;
        openView(3, $("#IdEdit").val(), 0, false);
        genaratelistobserveEdit();
    }
}

function genaratelistobserveEdit() {
    var index = 1;
    $("#workingtable4 tbody").empty();
    for (var item of auditobserve) {
        var controlcode = $(
            "#controlTableEdit tbody tr[data-controlid='" +
            item.controlid +
            "'] td:eq(2)"
        ).text();
        var html =
            '<tr>' +
            '<td class="text-center">' +
            index +
            '</td>' +
            '<td>' +
            controlcode +
            '</td>' +
            '<td>' +
            item.code +
            '</td>' +
            '<td>' +
            item.description +
            '</td>' +
            '</tr>';
        $("#workingtable4 tbody").append(html);
        index++;
    }
}

function openControlEdit(auditid, riskid, controlid, type) {
    debugger
    var objitem = controlassessment.find(
        (x) => /*x.riskid == riskid && */x.controlid == controlid
    );
    if (objitem != undefined) {
        
        $("#DesignAssessmentEdit").val(objitem.designassessment);
        $("#DesignConclusionEdit").val(objitem.designconclusion);
        $("#EffectiveAssessmentEdit").val(objitem.effectiveassessment);
        $("#EffectiveConclusionEdit").val(objitem.effectiveconclusion);
        $("#SampleEdit").val(viewValue(objitem.sampleConclusion));
        for (const element of objitem.procedures) {
            $(
                "#formControlEdit #ProcedureTable tbody tr[data-procedures_id='" +
                element.procedures_id +
                "']"
            )
                .find("#work")
                .val(element.result);
            if (type == 7)
                $(
                    "#formControlEdit #ProcedureTable tbody tr[data-procedures_id='" +
                    element.procedures_id +
                    "']"
                )
                    .find("#work")
                    .prop("disabled", true);
            else
                $(
                    "#formControlEdit #ProcedureTable tbody tr[data-procedures_id='" +
                    element.procedures_id +
                    "']"
                )
                    .find("#work")
                    .prop("disabled", false);
        }
        listObserveCreate = auditobserve.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid /*&& x.riskid == riskid*/;
        });
        var index1 = 1;
        var index2 = 1;
        for (const element of auditobserve.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid /*&& x.riskid == riskid*/;
        })) {
            var html =
                '<tr data-id="' +
                element.id +
                '">' +
                "<td>" +
                (element.type == 1 ? index1 : index2) +
                "</td>" +
                "<td>" +
                element.code +
                "</td>" +
                "<td>" +
                element.name +
                "</td>" +
                "<td>" +
                element.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                element.type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                (type != 7
                    ? '<a type="button" class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveEdit(' +
                    element.type +
                    ',\'Edit\',this)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true"></i></a>'
                    : "") +
                (type != 7
                    ? '<a type="button" class="btn icon-delete btn-action-custom"><i data-toggle="tooltip" title="Xóa" onclick="deleteObserveEdit(\'' +
                    element.id +
                    '\',this)" class="fa fa-trash" aria-hidden="true"></i></a>'
                    : "") +
                "</td>" +
                "</tr>";
            if (element.type == 1) {
                $("#tableObserve1Edit tbody").append(html);
                index1++;
            } else {
                $("#tableObserve2Edit tbody").append(html);
                index2++;
            }
        }

        GenerateListFileName(
            objitem,
            "image1",
            "",
            "#PathCreate_1Edit_listfile",
            true,
            type == 7 ? false : true,
            "Edit"

        );
        GenerateListFileName(
            objitem,
            "image2",
            "",
            "#PathCreate_2Edit_listfile",
            true,
            type == 7 ? false : true,
            "Edit"
        );
        GenerateListFileName(
            objitem.image1name,
            "image1name",
            "controlassessmentfile",
            "#PathCreate_1Edit_listfile",
            false,
            type == 7 ? false : true,
            "Edit"
        );
        GenerateListFileName(
            objitem.image2name,
            "image2name",
            "controlassessmentfile",
            "#PathCreate_2Edit_listfile",
            false,
            type == 7 ? false : true,
            "Edit"
        );
    }
    else {
        $("#DesignAssessmentEdit").val("1.Đây có phải là chốt kiểm soát phù hợp để giảm thiểu rủi ro không ?\n2.Chốt kiểm soát có được thực hiện bởi nhân sự,có được phân tách trách nhiệm phù hợp không ?\n3.Chốt kiểm soát có được thực hiện đúng thời điểm,địa điểm,trong quy trình không ?\n4.Chốt kiểm soát có bằng chứng không ?\n5.Chốt kiểm soát có bền vững không ? ");
    }
}
function openModalObserveEdit(type, method, elment) {
    observeedit.resetForm();
    $("#formObserveEdit input").removeClass("error");
    var id = $(elment).closest("tr").data("id");
    const objitem = listObserveCreate.find((item) => item.id == id);

    $("#formObserveEdit #title-create").hide();
    $("#formObserveEdit #title-edit").hide();
    $("#formObserveEdit #title-detail").hide();
    if (method == "Add") {
        $("#formObserveEdit #title-create").show();
        $("#modalAuditObserveEdit").find("input").prop("disabled", false);
        $("#modalAuditObserveEdit").find("textarea").prop("disabled", false);
        $("#modalAuditObserveEdit").find("input").val("");
        $("#modalAuditObserveEdit").find("textarea").val("");
        $("#modalAuditObserveEdit").find(".listfile").empty();
        $(".SaveObserve").show();
    }

    if (method == "Edit") {
        $("#formObserveEdit").data("id", id);
        $("#formObserveEdit #title-edit").show();
        $("#modalAuditObserveEdit").find("input").prop("disabled", false);
        $("#modalAuditObserveEdit").find("textarea").prop("disabled", false);
        $("#modalAuditObserveEdit").find("input").val("");
        $("#modalAuditObserveEdit").find("textarea").val("");
        $("#modalAuditObserveEdit").find(".listfile").empty();
        $(".SaveObserve").show();
        $("#AuditObserveNameEdit").val(objitem.name);
        $("#AuditObserveDescriptionEdit").val(objitem.description);
        $("#AuditObserveNoteEdit").val(objitem.note);
        $("#AuditEvidenceListFileCEdit").append();
        GenerateListFileName(
            objitem,
            "evidence",
            "",
            "#AuditEvidenceListFileEdit",
            true,
            true,
            "Edit"
        );
        if (objitem.evidencename != undefined)
            GenerateListFileName(
                objitem.evidencename,
                "evidencename",
                "auditobservefile",
                "#AuditEvidenceListFileEdit",
                false,
                true,
                "Edit"
            );
    }
    if (method == "Detail") {
        $("#formObserveEdit #title-detail").show();
        $("#modalAuditObserveEdit").find("input").prop("disabled", true);
        $("#modalAuditObserveEdit").find("textarea").prop("disabled", true);
        $("#modalAuditObserveEdit").find("input").val("");
        $("#modalAuditObserveEdit").find("textarea").val("");
        $("#modalAuditObserveEdit").find(".listfile").empty();
        $(".SaveObserve").hide();
        $("#AuditObserveNameEdit").val(objitem.name);
        $("#AuditObserveDescriptionEdit").val(objitem.description);
        $("#AuditObserveNoteEdit").val(objitem.note);
        GenerateListFileName(
            objitem,
            "evidence",
            "",
            "#AuditEvidenceListFileEdit",
            true,
            false,
            ""
        );
        if (objitem.evidencename != undefined)
            GenerateListFileName(
                objitem.evidencename,
                "evidencename",
                "auditobservefile",
                "#AuditEvidenceListFileEdit",
                false,
                false,
                ""
            );
    }

    $("#typeObserveEdit").val(type);
    $("#idObserveEdit").val(id);
}

function fnGetDetail(type, param) {
    var call_back = "";
    if (type === 3) {
        call_back = "fnEditSuccess";
    } else if (type === 2) {
        call_back = "fnDetailSuccess";
    }
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.getItem.path + "/" + param,
        apiConfig.api.workingpaper.action.getItem.method,
        null,
        call_back,
        "msgError"
    );
}
function fnEditSuccess(rspn) {
    localStorage.removeItem("id");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        data.listobserve.forEach(function (v, i) {
            var obj = {
                code: v.code,
                id: v.id,
                controlid: v.controlid,
                //riskid: v.riskid,
                name: v.name,
                year: v.year,
                auditworkid: v.auditwork_id,
                auditworkname: v.auditwork_name,
                description: v.description,
                note: v.note,
                evidence: [],
                evidencename: v.evidencename,
                type: v.type,
            };
            auditobserve.push(obj);
        });

        data.listcontrol.forEach(function (v, i) {
            var obj = {
                workingpaperid: v.workingpaperid,
                //riskid: v.riskid,
                controlid: v.controlid,
                designassessment: v.designassessment,
                designconclusion: v.designconclusion,
                effectiveassessment: v.effectiveassessment,
                effectiveconclusion: v.effectiveconclusion,
                sampleConclusion: v.sampleconclusion,
                image1: [],
                image2: [],
                image1name: v.image1name,
                image2name: v.image2name,
                procedures: v.listprocedures,
            };
            controlassessment.push(obj);
        });

        var frmModify = $("#formEdit");

        getValueRiskEdit(data.riskid);
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#YearEdit").val(data.year);
        frmModify.find("#YearEdit").data("id", data.year);
        frmModify.find("#AuditEdit").val(data.auditworkname);
        frmModify.find("#AuditEdit").data("id", data.auditworkid);
        frmModify.find("#AuditProcessEdit").val(data.processname);
        frmModify.find("#AuditProcessEdit").data("id", data.processid);
        frmModify.find("#AuditUnitEdit").val(data.unitname);
        frmModify.find("#AuditUnitEdit").data("id", data.unitid);
        frmModify.find("#PaperCodeEdit").val(data.code);
        frmModify.find("#StatusEdit").val(data.status);
        frmModify.find("#AsigneeEdit").val(data.asigneename);
        frmModify.find("#ReviewerEdit").val(data.reviewername);
        frmModify.find("#RiskEdit").val(data.riskname);
        frmModify.find("#RiskEdit").data("id", data.riskid);
        frmModify.find("#ConclusionEdit").val(data.conclusion);
        //frmModify.find("#ObjEdit").val(data.prototype);
        frmModify.find("#ReviewerDateEdit").val(data.approvedate);
        localStorage.setItem("id", $("#IdEdit").val());
    }
}

function submitEdit() {
    var obj = {
        id: $("#IdEdit").val(),
        code: $("#PaperCodeEdit").val(),
        year: $("#YearEdit").data("id"),
        auditworkid: $("#AuditEdit").data("id"),
        processid: $("#AuditProcessEdit").data("id"),
        unitid: $("#AuditUnitEdit").data("id"),
        status: $("#StatusEdit").val(),
        //prototype: $("#ObjEdit").val().trim(),
        riskid: $("#RiskEdit").data("id"),
        listcontrol: controlassessment,
        listobserve: auditobserve,
        conclusion: $("#ConclusionEdit").val().trim(),
    };
    var formdata = new FormData();
    formdata.append("wp.id", obj.id);
    formdata.append("wp.code", obj.code);
    formdata.append("wp.year", obj.year);
    formdata.append("wp.auditworkid", obj.auditworkid);
    formdata.append("wp.processid", obj.processid);
    formdata.append("wp.unitid", obj.unitid);
    formdata.append("wp.status", obj.status);
    formdata.append("wp.prototype", obj.prototype);
    formdata.append("wp.riskid", obj.riskid);
    formdata.append("wp.conclusion", obj.conclusion);
    obj.listcontrol.forEach(function (value, index) {
        //formdata.append("wp.listcontrol[" + index + "].riskid", value.riskid);
        formdata.append("wp.listcontrol[" + index + "].workingpaperid", obj.id);
        formdata.append("wp.listcontrol[" + index + "].controlid", value.controlid);
        formdata.append(
            "wp.listcontrol[" + index + "].designassessment",
            value.designassessment
        );
        formdata.append(
            "wp.listcontrol[" + index + "].designconclusion",
            value.designconclusion
        );
        formdata.append(
            "wp.listcontrol[" + index + "].effectiveassessment",
            value.effectiveassessment
        );
        formdata.append(
            "wp.listcontrol[" + index + "].effectiveconclusion",
            value.effectiveconclusion
        );

        formdata.append(
            "wp.listcontrol[" + index + "].sampleconclusion",
            viewValue(value.sampleConclusion)
        );
        value.image1.forEach(function (v, i) {
            formdata.append("wp.listcontrol[" + index + "].image1", v);
        });
        value.image2.forEach(function (v, i) {
            formdata.append("wp.listcontrol[" + index + "].image2", v);
        });
        value.procedures.forEach(function (v, i) {
            formdata.append(
                "wp.listcontrol[" + index + "].listprocedures[" + i + "].procedures_id",
                v.procedures_id
            );
            formdata.append(
                "wp.listcontrol[" + index + "].listprocedures[" + i + "].result",
                v.result
            );
        });
    });
    obj.listobserve.forEach(function (value, index) {
        formdata.append(
            "wp.listobserve[" + index + "].id",
            (value.id + "").includes("new") ? 0 : value.id
        );
        formdata.append("wp.listobserve[" + index + "].code", value.code);
        formdata.append("wp.listobserve[" + index + "].controlid", value.controlid);
        //formdata.append("wp.listobserve[" + index + "].riskid", value.riskid);
        formdata.append("wp.listobserve[" + index + "].workingpaperid", obj.id);
        formdata.append("wp.listobserve[" + index + "].name", value.name);
        formdata.append("wp.listobserve[" + index + "].year", obj.year);
        formdata.append(
            "wp.listobserve[" + index + "].auditwork_id",
            value.auditworkid
        );
        formdata.append(
            "wp.listobserve[" + index + "].auditwork_name",
            value.auditworkname
        );
        formdata.append(
            "wp.listobserve[" + index + "].description",
            value.description
        );
        formdata.append("wp.listobserve[" + index + "].note", value.note);
        formdata.append("wp.listobserve[" + index + "].type", value.type);
        value.evidence.forEach(function (v, e) {
            formdata.append("wp.listobserve[" + index + "].evidence", v);
        });
    });
    callApi_auditservice_update(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.update.path,
        formdata,
        "updateWorkingPaperSuccess",
        "msgError"
    );
}
function updateWorkingPaperSuccess(data) {
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    if (data.code === "1") {
        createdLog("Giấy tờ làm việc", "Chỉnh sửa Giấy tờ làm việc");
        SaveHistory(data.id, 3, "Chỉnh sửa giấy tờ làm việc", '');
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", {
            progressBar: true,
        });

        setTimeout(function () {
            window.location.href = "/WorkingPaper";
        }, 2000);
    } else {
        swal("Error!", "Cập nhật thất bại!", "error");
    }
}
//#endregion Edit

//#region Detail
function getValueRiskDetail(value) {
    var _auditprocess = value;
    call_back = "fnGetDetailRiskSuccessDetail";

    callApi_auditservice(
        apiConfig.api.catrisk.controller,
        apiConfig.api.catrisk.action.searchlist.path + "?strid=" + _auditprocess,
        apiConfig.api.catrisk.action.searchlist.method,
        null,
        call_back,
        "msgError"
    );
}
function fnGetDetailRiskSuccessDetail(rspn) {
    var frmModify = $("#formEdit");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        var tbBody = $("#risktableedit tbody");
        tbBody.html('');
        $("#risktableedit").dataTable().fnDestroy();
        var listid = []
        for (var item of data) {
            listid.push(item.id);
            tbBody.append(
                "<tr>" +
                '<td scope="col" style="width:10%">' +
                item.code +
                "</td>" +
                '<td scope="col" style="width:30%">' +
                item.name +
                "</td>" +
                '<td scope="col" style="width:60%">' +
                item.description +
                "</td>" +
                "</tr>"
            );
        }

        setTimeout(function () {
            callApi_auditservice(
                apiConfig.api.workingpaper.controller,
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.path +
                "?strid=" +
                listid.join(','),
                apiConfig.api.workingpaper.action.getcontrolfromrisk_str.method,
                {},
                "fnGetControlSuccessDetail"
            );
        }, 200);
    }
}
function fnGetControlSuccessDetail(rspn) {
    var data = rspn.data;
    //var frmModify = $("#formDetail");
    var tbBody = $("#controlTableEdit tbody");
    $("#controlTableEdit").dataTable().fnDestroy();

    tbBody.html("");
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var wp = [];
        if (obj.controlassassment != null)
            obj.controlassassment.forEach(function (v, i) {
                if (
                    v.workingpapercode != null &&
                    v.workingpaperid != $("#IdEdit").val()
                )
                    wp.push(
                        `<a href="javascript:void(0)" onclick="openOther(${v.workingpaperid},${v.riskid},${obj.id})">${v.workingpapercode}</a>`
                    );
            });
        var controlfrequencey =
            obj.controlfrequency == 1
                ? "Mỗi khi phát sinh"
                : obj.controlfrequency == 2
                    ? "Nhiều lần trong ngày"
                    : obj.controlfrequency == 3
                        ? "Hằng ngày"
                        : obj.controlfrequency == 4
                            ? "Hằng tuần"
                            : obj.controlfrequency == 5
                                ? "Hằng tháng"
                                : obj.controlfrequency == 6
                                    ? "Hàng quý"
                                    : obj.controlfrequency == 7
                                        ? "Hằng năm"
                                        : "";
        var controltype =
            obj.controltype == 1
                ? "Phòng ngừa"
                : obj.controltype == 2
                    ? "Phát hiện"
                    : "";
        var controlformat =
            obj.controlformat == 1
                ? "Tự động"
                : obj.controlformat == 2
                    ? "Bán tự động"
                    : obj.controlformat == 3
                        ? "Thủ công"
                        : "";
        var html =
            "<tr data-controlid=" +
            obj.id +
            ">" +
            '<td class="text-center" style="width: 5% !important;">' +
            (i + 1) +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.riskcode) +
            "</p></td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.code) +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            viewValue(obj.description) +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            wp.join(",") +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlfrequencey +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controltype +
            "</p></td>" +
            '<td style="width: 15% !important;">' +
            controlformat +
            "</p></td>" +
            '<td class="text-center" style="width: 15% !important;">' +
            '<a type="button" class="btn icon-default btn-action-custom" onclick="openView(7,' +
            obj.id + ',' + obj.riskcontrolid +
            ')"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
            "</td>" +
            "</tr>";
        tbBody.append(html);
    }
    genaratelistobserveEdit();
    ViewDetail("#formEdit", true);
}
function fnDetailSuccess(rspn) {
    localStorage.removeItem("id");
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        localStorage.setItem("leader", data.leader);
        data.listobserve.forEach(function (v, i) {
            var obj = {
                code: v.code,
                id: v.id,
                controlid: v.controlid,
                //riskid: v.riskid,
                name: v.name,
                year: v.year,
                auditworkid: v.auditwork_id,
                auditworkname: v.auditwork_name,
                description: v.description,
                note: v.note,
                evidence: [],
                evidencename: v.evidencename,
                type: v.type,
            };
            auditobserve.push(obj);
        });

        data.listcontrol.forEach(function (v, i) {
            var obj = {
                workingpaperid: v.workingpaperid,
                //riskid: v.riskid,
                controlid: v.controlid,
                designassessment: v.designassessment,
                designconclusion: v.designconclusion,
                effectiveassessment: v.effectiveassessment,
                effectiveconclusion: v.effectiveconclusion,
                sampleConclusion: v.sampleconclusion,
                image1: [],
                image2: [],
                image1name: v.image1name,
                image2name: v.image2name,
                procedures: v.listprocedures,
            };
            controlassessment.push(obj);
        });

        var frmModify = $("#formEdit");

        getValueRiskDetail(data.riskid);
        frmModify.find("#IdEdit").val(data.id);
        frmModify.find("#YearEdit").val(data.year);
        frmModify.find("#YearEdit").data("id", data.year);
        frmModify.find("#AuditEdit").val(data.auditworkname);
        frmModify.find("#AuditEdit").data("id", data.auditworkid);
        frmModify.find("#AuditProcessEdit").val(data.processname);
        frmModify.find("#AuditProcessEdit").data("id", data.processid);
        frmModify.find("#AuditUnitEdit").val(data.unitname);
        frmModify.find("#AuditUnitEdit").data("id", data.unitid);
        frmModify.find("#PaperCodeEdit").val(data.code);
        frmModify.find("#StatusEdit").val(data.status);
        frmModify.find("#AsigneeEdit").val(data.asigneename);
        frmModify.find("#ReviewerEdit").val(data.reviewername);
        frmModify.find("#RiskEdit").val(data.riskname);
        frmModify.find("#RiskEdit").data("id", data.riskid);
        frmModify.find("#ConclusionEdit").val(data.conclusion);
        //frmModify.find("#ObjEdit").val(data.prototype);
        frmModify.find("#ReviewerDateEdit").val(data.approvedate);
        localStorage.setItem("id", $("#IdEdit").val());
    }
}
//#endregion Detail

function goBack() {
    var value = parseInt(localStorage.getItem("id"));
    var type = parseInt(localStorage.getItem("type"));
    openView(type, value, 0, false);
}
//#region Other
function openOther(workingpaperid, riskid, controlid) {
    var index = $("#view");
    var create = $("#create");
    var edit = $("#edit");
    var control = $("#control");
    var controledit = $("#controledit");
    var detail = $("#detail");
    localStorage.setItem("controlidtemp", controlid);
    index.hide();
    create.hide();
    edit.hide();
    detail.hide();
    control.hide();
    controledit.show();
    $("#formControlEdit tbody").html("");
    $(".listfile").empty();
    document.getElementById("formControlEdit").reset();
    listObserveOther = [];
    auditobserveOther = [];
    setTimeout(function () {
        onLoadProcedure(controlid, true);
    }, 2000);
    setTimeout(function () {
        fnGetOther(workingpaperid);
    }, 3000);
    ViewDetail("#formControlEdit", true);
    $(".btn-approve").hide();
    $("#showbuttonApproval").hide();
}
function fnGetOther(param) {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.getItem.path + "/" + param,
        apiConfig.api.workingpaper.action.getItem.method,
        null,
        "fnOtherSuccess",
        "msgError"
    );
}
function openControlOther(auditid, riskid, controlid) {
    var objitem = controlassessmentOther.find(
        (x) => /*x.riskid == riskid &&*/ x.controlid == controlid
    );
    if (objitem != undefined) {
        
        $("#DesignAssessmentEdit").val(objitem.designassessment);
        $("#DesignConclusionEdit").val(objitem.designconclusion);
        $("#EffectiveAssessmentEdit").val(objitem.effectiveassessment);
        $("#EffectiveConclusionEdit").val(objitem.effectiveconclusion);
        $("#SampleEdit").val(viewValue(objitem.sampleConclusion));
        for (const element of objitem.procedures) {
            $(
                "#formControlEdit #ProcedureTable tbody tr[data-procedures_id='" +
                element.procedures_id +
                "']"
            )
                .find("#work")
                .val(element.result);
            $(
                "#formControlEdit #ProcedureTable tbody tr[data-procedures_id='" +
                element.procedures_id +
                "']"
            )
                .find("#work")
                .prop("disabled", true);
        }
        listObserveOther = auditobserveOther.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid;
        });
        var index1 = 1;
        var index2 = 1;
        for (const element of auditobserveOther.filter((x) => {
            return x.controlid == controlid && x.auditworkid == auditid;
        })) {
            var html =
                '<tr data-id="' +
                element.id +
                '">' +
                "<td>" +
                (element.type == 1 ? index1 : index2) +
                "</td>" +
                "<td>" +
                element.code +
                "</td>" +
                "<td>" +
                element.name +
                "</td>" +
                "<td>" +
                element.description +
                "</td>" +
                '<td class="text-center col-action">' +
                '<a type="button"  class="btn icon-default btn-action-custom" data-toggle="modal" data-target="#modalAuditObserveEdit" onclick="openModalObserveOther(' +
                element.type +
                ',\'Detail\',this)"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true"></i></a>' +
                "" +
                "" +
                "</td>" +
                "</tr>";
            if (element.type == 1) {
                $("#tableObserve1Edit tbody").append(html);
                index1++;
            } else {
                $("#tableObserve2Edit tbody").append(html);
                index2++;
            }
        }

        GenerateListFileName(
            objitem,
            "image1",
            "",
            "#PathCreate_1Edit_listfile",
            true,
            false,
            ""
        );
        GenerateListFileName(
            objitem,
            "image2",
            "",
            "#PathCreate_2Edit_listfile",
            true,
            false,
            ""
        );
        GenerateListFileName(
            objitem.image1name,
            "image1name",
            "controlassessmentfile",
            "#PathCreate_1Edit_listfile",
            false,
            false,
            ""
        );
        GenerateListFileName(
            objitem.image2name,
            "image2name",
            "controlassessmentfile",
            "#PathCreate_2Edit_listfile",
            false,
            false,
            ""
        );
    }
}
function openModalObserveOther(type, method, elment) {
    var id = $(elment).closest("tr").data("id");
    const objitem = listObserveOther.find((item) => item.id == id);
    $("#modalAuditObserveEdit").find("input").prop("disabled", true);
    $("#modalAuditObserveEdit").find("textarea").prop("disabled", true);
    $("#modalAuditObserveEdit").find("input").val("");
    $("#modalAuditObserveEdit").find("textarea").val("");
    $("#modalAuditObserveEdit").find(".listfile").empty();
    $(".SaveObserve").hide();
    $("#AuditObserveNameEdit").val(objitem.name);
    $("#AuditObserveDescriptionEdit").val(objitem.description);
    $("#AuditObserveNoteEdit").val(objitem.note);
    $("#modalAuditObserveEdit #title-create").hide();
    $("#modalAuditObserveEdit #title-edit").hide();
    $("#modalAuditObserveEdit #title-detail").show();
    GenerateListFileName(
        objitem,
        "evidence",
        "",
        "#AuditEvidenceListFileEdit",
        true,
        false,
        ""
    );
    if (objitem.evidencename != undefined)
        GenerateListFileName(
            objitem.evidencename,
            "evidence",
            "auditobservefile",
            "#AuditEvidenceListFileEdit",
            false,
            false,
            ""
        );
}
function fnOtherSuccess(rspn) {
    if (rspn !== undefined && rspn !== null && rspn.code === "1") {
        var data = rspn.data;
        data.listobserve.forEach(function (v, i) {
            var obj = {
                code: v.code,
                id: v.id,
                controlid: v.controlid,
                name: v.name,
                year: v.year,
                auditworkid: v.auditwork_id,
                auditworkname: v.auditwork_name,
                description: v.description,
                note: v.note,
                evidence: [],
                evidencename: v.evidencename,
                type: v.type,
            };
            auditobserveOther.push(obj);
        });

        data.listcontrol.forEach(function (v, i) {
            var obj = {
                workingpaperid: v.workingpaperid,
               // riskid: v.riskid,
                controlid: v.controlid,
                designassessment: v.designassessment,
                designconclusion: v.designconclusion,
                effectiveassessment: v.effectiveassessment,
                effectiveconclusion: v.effectiveconclusion,
                sampleConclusion: v.sampleconclusion,
                image1: [],
                image2: [],
                image1name: v.image1name,
                image2name: v.image2name,
                procedures: v.listprocedures,
            };
            controlassessmentOther.push(obj);
        });
        var controlid = localStorage.getItem("controlidtemp");
        openControlOther(data.auditworkid, data.riskid, controlid);
    }
}
//#endregion Other

function GenerateListFileName(obj, key, table, elment, isclear, isdelete, form) {
    if (obj != undefined) {
        var item = obj[key] == undefined ? obj : obj[key];
        var hidden = isdelete ? "" : "hidden";
        if (isclear) $(elment).empty();
        if (
            item != undefined &&
            item != null &&
            item.length > 0
        ) {
            var _append_data = "";
            for (let value of item) {
                var v = value;
                var name = v.name.substring(v.name.lastIndexOf("/") + 1);
                if (obj[key] == undefined) {
                    _append_data += '<div class="file_' + v.id + '"><a href="javascript:DownloadFile(' + v.id + ",'" + table + "','" + name + "');\"><span>" + name + '</span></a><a ' + hidden + ' href="javascript:deletefile(' + v.id + ',\'' + table + '\',\'' + key + '\',\'' + form + '\');" style="color: red; font-size: larger; font-weight: bold; "><span>&nbsp; x</span></a></div>';
                } else {
                    var index = item.findIndex(x => x.name === v.name);
                    _append_data += '<div class="filetemp_' + index + '"><a href="javascript:void(0);\"><span>' + name + '</span ></a > <a ' + hidden + ' href = "javascript:deletefile(' + index + ',\'' + table + '\',\'' + key + '\',\'' + form + '\');" style = "color: red; font-size: larger; font-weight: bold; " > <span>&nbsp; x</span></a ></div > ';

                }
            }
            $(elment).append(_append_data);
        }
    }
}

function fnDeleteFileSuccess(rspn) {
    if (rspn.code === '1') {
        toastr.success("Xóa file thành công!", "Thông báo!", { progressBar: true });
        if (rspn.table == "auditobservefile") {
            var observeid = rspn.form == 'Edit' ? $("#idObserveEdit").val() : $("#idObserveCreate").val();
            objIndex = listObserveCreate.findIndex((obj => obj.id == observeid));
            listObserveCreate[objIndex].evidencename = listObserveCreate[objIndex].evidencename.filter(item => { return item.id != rspn.id })
        }
        $(".file_" + rspn.id).remove();
    }
    else {
        toastr.error("Xóa file không thành công!", "Lỗi!", { progressBar: true });
    }
}

function fnDeleteFile(id, table, form) {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.deletefile.path + "?id=" + id + "&table=" + table + "&form=" + form,
        apiConfig.api.workingpaper.action.deletefile.method,
        null, 'fnDeleteFileSuccess', 'msgError');
}

function deletefile(id, table, key, form) {
    if (key == "image1name" || key == "image2name" || key == "evidencename")
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
                fnDeleteFile(id, table, form);
            }
        });
    else {
        var riskid = form == "Edit" ? $("#riskidedit").data("id") : $("#riskid").val();
        var controlid = form == "Edit" ? $("#controlidedit").val() : $("#controlid").val();
        var observeid = form == 'Edit' ? $("#idObserveEdit").val() : $("#idObserveCreate").val();
        if (key == "image1") {
            var objitem = controlassessment.find(
                (x) => /*x.riskid == riskid &&*/ x.controlid == controlid
            );
            objitem.image1.splice(id, 1);
            if (form == "Edit")
                $("#PathCreate_1Edit_listfile .filetemp_" + id).remove();
            else
                $("#PathCreate_1_listfile .filetemp_" + id).remove();

        }
        if (key == "image2") {
            var objitem = controlassessment.find(
                (x) => /*x.riskid == riskid &&*/ x.controlid == controlid
            );
            objitem.image2.splice(id, 1);
            if (form == "Edit")
                $("#PathCreate_2Edit_listfile .filetemp_" + id).remove();
            else
                $("#PathCreate_2_listfile .filetemp_" + id).remove();

        }
        if (key == "evidence") {
            var objitem = listObserveCreate.find((item) => item.id == observeid);
            objitem.evidence.splice(id, 1);
            if (form == "Edit")
                $("#AuditEvidenceListFileEdit .filetemp_" + id).remove();
            else
                $("#AuditEvidenceListFileCreate .filetemp_" + id).remove();

        }
    }
}

function DownloadFile(id, table, filename) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open(
        "GET",
        apiConfig.api.host_audit_service +
        apiConfig.api.workingpaper.controller +
        "/DownloadAttach?id=" +
        id +
        "&table=" +
        table
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
function DownloadFileFromInput(url, name) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

function ViewDetail(elment, disabled) {
    if (elment == "#formEdit") {
        $("#YearEdit").prop("disabled", true);
        $("#AuditEdit").prop("disabled", true);
        $("#AuditProcessEdit").prop("disabled", true);
        $("#AuditUnitEdit").prop("disabled", true);
        //$("#ObjEdit").prop("disabled", disabled);
        $("#ConclusionEdit").prop("disabled", disabled);
        $(".btn-save").parent().prop("hidden", disabled);
    }
    if (elment == "#formControl" || elment == "#formControlEdit") {
        $(elment).find("input").prop("disabled", disabled);
        $(elment).find("textarea").prop("disabled", disabled);
        $(elment).find(".add-new-observe").prop("hidden", disabled);
        $(elment).find('button[type="submit"]').prop("hidden", disabled);
    }
}

function SubmitApproval() {
    var _id = $("#formEdit").find("#IdEdit").val();
    swal(
        {
            title: "Thông báo",
            text: "Bạn muốn duyệt giấy tờ ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: localizationResources.Accept,
            cancelButtonText: localizationResources.Cancel,
        },
        function (isConfirm) {
            if (isConfirm) {
                fnSubmitApproval(_id);
            }
        }
    );
}
function fnSubmitApproval(id) {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.submitapproval.path + "/" + id,
        apiConfig.api.workingpaper.action.submitapproval.method,
        null,
        "fnSubmitApprovalSuccess",
        "msgError"
    );
}
function fnSubmitApprovalSuccess(rspn) {
    if (rspn.code === "1") {
        toastr.success("Phê duyệt thành công!", "Thông báo!", {
            progressBar: true,
        });
        createdLog("Giấy tờ làm việc", "Phê duyệt giấy tờ");
        SaveHistory(rspn.id, 3, "Duyệt", "Đã duyệt")

        localStorage.removeItem("status");
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            window.location.href = "/WorkingPaper";
        }, 300);
    } else {
        toastr.error("Phê duyệt không thành công!", "Error!", {
            progressBar: true,
        });
    }
}
function fnRejectApprovalSuccess(rspn) {
    if (rspn.code === "1") {
        $("#modelRejectApprove .close").click();
        toastr.success("Từ chối duyệt thành công!", "Thông báo!", {
            progressBar: true,
        });
        createdLog("Giấy tờ làm việc", "Từ chối phê duyệt giấy tờ");
        SaveHistory(rspn.id, 3, "Từ chối duyệt", rspn.msg);
        localStorage.removeItem("status");
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            window.location.href = "/WorkingPaper";
        }, 100);
    } else {
        toastr.error("Từ chối duyệt thất bại!", "Error!", {
            progressBar: true,
        });
    }
}
function fnRequestApprovalSuccess(rspn) {
    if (rspn.code === "1") {
        $("#modelRequestApprove .close").click();
        toastr.success("Gửi phê duyệt thành công!", "Thông báo!", {
            progressBar: true,
        });
        createdLog("Giấy tờ làm việc", "Gửi duyệt giấy tờ");
        SaveHistory(rspn.id, 3, "Gửi duyệt", '');
        localStorage.removeItem("status");
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        setTimeout(function () {
            window.location.href = "/WorkingPaper";
        }, 100);
    } else {
        toastr.error("Gửi phê duyệt không thành công!", "Error!", {
            progressBar: true,
        });
    }
}

function SaveHistory(item_id, item_type, type, content) {
    var obj = {
        'item_id': parseInt(item_id),
        'item_type': item_type,
        'type': type,
        'content': content,
    }
    callApi_auditservice(
        apiConfig.api.discussionhistory.controller,
        apiConfig.api.discussionhistory.action.savediscussionhistory.path,
        apiConfig.api.discussionhistory.action.savediscussionhistory.method,
        obj, '', 'msgError');
}

function onSearchHistoryLog(param) {
    var obj = {
        'item_id': param,
        'item_type': 3,
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
    console.log(rspn);
    var tbBody = $('#auditWorkingPaperHistory tbody');
    $("#auditWorkingPaperHistory").dataTable().fnDestroy();
    tbBody.html('');
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {

        var data = rspn.data;

        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr>' +
                '<td>' + obj.created_at + '</td>' +
                '<td>' + obj.person_perform + '</td>' +
                '<td>' + obj.type + '</td>' +
                '<td></td>' +
                '<td>' + obj.content + '</td>' +
                '</tr>';
            tbBody.append(html);
        }

    }
    var t = $("#auditWorkingPaperHistory").DataTable({
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

function getStatus() {
    callApi_auditservice(
        apiConfig.api.workingpaper.controller,
        apiConfig.api.workingpaper.action.liststatusworkingpaper.path,
        apiConfig.api.workingpaper.action.liststatusworkingpaper.method,
        null, 'fillStatus', 'msgError');
}
function fillStatus(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#Status').html('');
    $('#Status').append(htmlOption);
    $('#StatusCreate').html('');
    ////$('#StatusCreate').append(htmlOption);
    $('#StatusEdit').html('');
    ////$('#StatusEdit').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (let item of _data) {
        var obj = item;
        html += '<option value="' + obj.status_code + '">' + obj.status_name + '</option>';
    }
    $('#Status').append(html);
    $('#StatusCreate').append(html);
    $('#StatusEdit').append(html);
}

function ExportInlist(id) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("POST", apiConfig.api.host_audit_service + apiConfig.api.workingpaper.controller + apiConfig.api.workingpaper.action.exportexcel.path + '/' + id);
    request.setRequestHeader('Authorization', getSessionToken());
    request.setRequestHeader('Accept-Language', 'vi-VN');
    request.onload = function () {
        if (this.status == 200) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(this.response);
            link.download = "Kitano_GiayToLamViec_v02.xlsx";
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