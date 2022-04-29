$(function () {
    getAuditWorkingPaper();
    getAuditWork();
    getAuditDetect();
    getAuditRequest();
});

//#region Các cuộc kiểm toán được phân công trong năm hiện tại
function renderTableHasValue_1(rspn) {
    var data = rspn.data;
    var tbBody = $("#dashboard_1 tbody");
    $("#dashboard_1").dataTable().fnDestroy();
    tbBody.html("");
    var index = 1;
    for (let item of data) {
        var obj = item;
        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            index +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.audit_name) +
            "</td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span>' +
            viewValue(obj.audit_start_date) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.audit_end_date) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.status) +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
        index++;
    }
}

function fnSearchAuditWorkSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue_1(rspn);
    } else if (rspn.data == "") {
        var tbBody = $("#dashboard_1 tbody");
        $("#dashboard_1").dataTable().fnDestroy();
        tbBody.html("");
    }
    $("#dashboard_1").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
            },
            {
                targets: [0, 1, 2, 3, 4],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

}

function getAuditWork() {

    callApi_reportservice(
        apiConfig.api.auditorworkdashboard.controller,
        apiConfig.api.auditorworkdashboard.action.getauditwork.path,
        apiConfig.api.auditorworkdashboard.action.getauditwork.method,
        null,
        "fnSearchAuditWorkSuccess",
        "msgError"
    );
}
//#endregion

//#region danh sách giấy tờ làm việc đang xử lý
function renderTableHasValue_2(rspn) {
    var data = rspn.data;
    var tbBody = $("#dashboard_2 tbody");
    $("#dashboard_2").dataTable().fnDestroy();
    tbBody.html("");
    var index = 1;
    for (let item of data) {
        var obj = item;

        var status = obj.status == "1.0" ? "bản nháp" : "từ chối duyệt";

        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            index +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.audit_name) +
            "</td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span>' +
            viewValue(obj.audit_end_field) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span><a href="javascript:void(0)" onclick="OpenFrom(' + obj.paper_id + ',\'workingpaper\')">' +
            viewValue(obj.paper_code) +
            "</a></span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            status +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
        index++;
    }
}

function fnSearchAuditWorkingPaperSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue_2(rspn);
    } else if (rspn.data == "") {
        var tbBody = $("#dashboard_2 tbody");
        $("#dashboard_2").dataTable().fnDestroy();
        tbBody.html("");
    }
    $("#dashboard_2").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
            },
            {
                targets: [0, 1, 2, 3, 4],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

}

function getAuditWorkingPaper() {

    callApi_reportservice(
        apiConfig.api.auditorworkdashboard.controller,
        apiConfig.api.auditorworkdashboard.action.getworkingpaper.path,
        apiConfig.api.auditorworkdashboard.action.getworkingpaper.method,
        null,
        "fnSearchAuditWorkingPaperSuccess",
        "msgError"
    );
}
//#endregion

//#region Các phát hiện đang phát triển
function renderTableHasValue_3(rspn) {
    var data = rspn.data;
    var tbBody = $("#dashboard_3 tbody");
    $("#dashboard_3").dataTable().fnDestroy();
    tbBody.html("");
    var index = 1;
    for (let item of data) {
        var obj = item;
        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            index +
            "</td>" +
            '<td style="width: 10% !important;">' +
            viewValue(obj.audit_name) +
            "</td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span><a href="javascript:void(0)" onclick="OpenFrom(' + obj.audit_detect_id + ',\'auditdetect\')">' +
            viewValue(obj.audit_detect_code) +
            "</a></span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.status) +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
        index++;
    }
}

function fnSearchAuditDetectSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue_3(rspn);
    } else if (rspn.data == "") {
        var tbBody = $("#dashboard_3 tbody");
        $("#dashboard_3").dataTable().fnDestroy();
        tbBody.html("");
    }
    $("#dashboard_3").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
            },
            {
                targets: [0, 1, 2, 3],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

}

function getAuditDetect() {

    callApi_reportservice(
        apiConfig.api.auditorworkdashboard.controller,
        apiConfig.api.auditorworkdashboard.action.getauditdetect.path,
        apiConfig.api.auditorworkdashboard.action.getauditdetect.method,
        null,
        "fnSearchAuditDetectSuccess",
        "msgError"
    );
}
//#endregion

//#region Các kiến nghị được phân công theo dõi
function renderTableHasValue_4(rspn) {
    var data = rspn.data;
    var tbBody = $("#dashboard_4 tbody");
    $("#dashboard_4").dataTable().fnDestroy();
    tbBody.html("");
    var index = 1;
    for (let item of data) {
        var obj = item;
        var textprocessstatus =
            obj.processstatus == 3 ? "Hoàn thành" : "Chưa hoàn thành";
        textprocessstatus =
            obj.processstatus == 2 ? "Hoàn thành một phần" : textprocessstatus;
        var texttimestatus = obj.timestatus == 2 ? "Quá hạn" : "Trong hạn";
        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            index +
            "</td>" +
            '<td style="width: 10% !important;"><span><a href="javascript:void(0)" onclick="OpenFrom(' + obj.requestid + ',\'auditrequest\')">' +
            viewValue(obj.requestcode) +
            "</a></span></td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span>' +
            textprocessstatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            texttimestatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.useredit) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.unitedit) +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.completeat) +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
        index++;
    }
}

function fnSearchAuditRequestSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue_4(rspn);
    } else if (rspn.data == "") {
        var tbBody = $("#dashboard_4 tbody");
        $("#dashboard_4").dataTable().fnDestroy();
        tbBody.html("");
    }
    $("#dashboard_4").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
            },
            {
                targets: [0, 1, 2, 3, 4, 5, 6],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });

}

function getAuditRequest() {

    callApi_reportservice(
        apiConfig.api.auditorworkdashboard.controller,
        apiConfig.api.auditorworkdashboard.action.getauditrequest.path,
        apiConfig.api.auditorworkdashboard.action.getauditrequest.method,
        null,
        "fnSearchAuditRequestSuccess",
        "msgError"
    );
}
//#endregion

function OpenFrom(id, type) {
    var url = '';
    var typeid = 0;
    switch (type) {
        case "workingpaper": {
            url = '/WorkingPaper';
            typeid = 3;
            break;
        }
        case "auditdetect": {
            url = '/AuditDetect';
            typeid = 9;
            break;
        }
        case "auditrequest": {
            url = '/AuditRequestMonitor';
            typeid = 3;
            break;
        }
    }
    localStorage.setItem("id", id);
    localStorage.setItem("type", typeid);
    window.open(
        url,
        '_blank'
    );
}
