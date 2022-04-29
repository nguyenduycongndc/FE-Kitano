$(function () {
    ChangeStage(1);
    getYearSearch();
});

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

function getYearSearch() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchyear.path,
        apiConfig.api.auditwork.action.searchyear.method,
        { jsonData: JSON.stringify(obj) },
        "fillYearSearch"
    );
}

function fillYearSearch(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#search-year").html("");
    $("#search-year").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, "issues", "method_id");
    $("#search-year").append(html);
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
    $("#search-audit").html("");
    $("#search-audit").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "issues", "method_id");
    $("#search-audit").append(html);
}

function clearPointCombo() {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#modalPoint #point").html("");
    $("#modalPoint #point").append(htmlOption);
}

function fillPointCombo(data) {
    if (data && data.length > 0) {
        for (let value of data) {
            var item = value;
            var html = ' <option value="' + item.id + '">' + item.point + "</option>";
            $("#modalPoint #point").append(html);
        }
    }
}

function onLoadData(data) {
    clearMsgInvalid();
    clearPointCombo();
    if (data.code == "001") {
        fillPointCombo(data.point);
        $("#modalPoint #evaluation_criteria_name").val(
            data.data.evaluation_criteria_name
        );
        $("#modalPoint #plan").val(data.data.plan);
        $("#modalPoint #actual").val(data.data.actual);
        $("#modalPoint #explain").val(data.data.explain);
        $("#modalPoint #point").val(data.data.evaluation_scale_id);
        $("#modalPoint").data("id", data.data.id);
        $("#modalPoint").modal("show");
    } else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function openEdit(ele, type) {
    var id = $(ele).data("id");
    if (type == "view") {
        $("#modalPoint textarea").prop("disabled", true);
        $("#modalPoint select").prop("disabled", true);
        $("#modalPoint .modal-btn-submit").hide();
    } else {
        $("#modalPoint textarea").prop("disabled", false);
        $("#modalPoint select").prop("disabled", false);
        $("#modalPoint .modal-btn-submit").show();
    }
    callApi_auditservice(
        apiConfig.api.evaluation.controller,
        apiConfig.api.evaluation.action.getItem.path + "/" + id,
        apiConfig.api.evaluation.action.getItem.method,
        null,
        "onLoadData"
    );
}
function renderHtml(obj, prId, nbsp, colId) {
    var html = "";
    var btnShow =
        obj.childs == undefined || obj.childs == null || obj.childs.length == 0
            ? ""
            : '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' +
            colId +
            '">' +
            '<i class="fa fa-minus-square" aria-hidden="true"></i></button>';
    html +=
        '<tr class="' +
        prId +
        ' show">' +
        '<td style="text-align:center;width:10%">' +
        nbsp +
        btnShow +
        "</td>" +
        '<td style="width:60%">' +
        obj.evaluation_criteria_name +
        "</td>" +
        '<td style="width:20%">' +
        obj.evaluation_scale_point +
        "</td>" +
        '<td class="col-action">';
    if (!obj.has_child) {
        if (IsCheckPemission("M_E", "PER_DETAIL") === true)
            html +=
                '<a class="btn icon-default btn-action-custom"   onclick="openEdit(this,\'view\')" data-id="' +
                obj.id +
                '"><i class="fa fa-eye" aria-hidden="true"></i></a>';
        else
            html +=
                '<a class="btn icon-disabled btn-action-custom"  ><i class="fa fa-eye" aria-hidden="true"></i></a>';
        if (IsCheckPemission("M_E", "PER_EDIT") === true)
            html +=
                '<a class="btn icon-default btn-action-custom"   onclick="openEdit(this,\'edit\')" data-id="' +
                obj.id +
                '"><i class="fas fa-pencil-alt"></i></a>';
        else
            html +=
                '<a class="btn icon-disabled btn-action-custom"  ><i class="fas fa-pencil-alt"></i></a>';
    }
    html += "</td></tr>";
    return html;
}
function getHtmlChild(childs, prId, n) {
    var nbsp = "";
    for (var i = 0; i < n; i++) {
        nbsp += "&nbsp;&nbsp;";
    }
    var html = "";
    for (let child of childs) {
        var obj = child;
        var colId = "collapRow" + obj.id;
        html += renderHtml(obj, prId, nbsp, colId);
        if (obj.childs != undefined && obj.childs != null)
            html += getHtmlChild(obj.childs, prId + " " + colId, n + 1);
    }

    return html;
}

function onInitSuccess(rspn) {
    createdLog("Thực hiện đánh giá", "Tạo bảng thực hiện đánh giá");
    if (rspn.code == "001") onSearch();
    else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function fnSearchSuccess(rspn) {
    if (rspn.code == "002") {
        swal(
            {
                title: localizationResources.Confirm,
                text:
                    localizationResources.EvaluationNotInit +
                    "\n" +
                    localizationResources.InitNow +
                    "?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: localizationResources.Accept,
                cancelButtonText: localizationResources.Cancel,
                closeOnConfirm: true,
            },
            function (confirm) {
                if (confirm) {
                    var year = parseInt($("#search-year").val());
                    var audit_id = parseInt($("#search-audit").val());
                    var stage = parseInt($("#Stage").val());
                    callApi_auditservice(
                        apiConfig.api.evaluation.controller,
                        apiConfig.api.evaluation.action.init.path,
                        apiConfig.api.evaluation.action.init.method,
                        { year: year, audit_id: audit_id, stage: stage },
                        "onInitSuccess"
                    );
                }
            }
        );
    } else {
        var tbBody = $("#tblEvaluationSearch tbody");
        tbBody.html("");
        if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
            var data = rspn.data;
            var html = getHtmlChild(data, "", 0);
            tbBody.append(html);
            collapseDelegate();
        }
    }
}

function onSearch() {
    if (validateRequired("#formsearch")) {
        var obj = {
            year: isNaN(parseInt($("#search-year").val()))
                ? null
                : parseInt($("#search-year").val()),
            audit_id: isNaN(parseInt($("#search-audit").val()))
                ? null
                : parseInt($("#search-audit").val()),
            stage: isNaN(parseInt($("#Stage").val()))
                ? null
                : parseInt($("#Stage").val()),
            //'page_size': parseInt($("#cbPageSize").val()),
            //'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        };
        callApi_auditservice(
            apiConfig.api.evaluation.controller,
            apiConfig.api.evaluation.action.search.path,
            apiConfig.api.evaluation.action.search.method,
            { jsonData: JSON.stringify(obj) },
            "fnSearchSuccess"
        );
    }
}

function onUpdatePoint(rspn) {
    if (rspn.code == "001") {
        createdLog("Thực hiện đánh giá", "Cập nhật điểm đánh giá");
        toastr.success(localizationResources.Successfully, "Success!", {
            progressBar: true,
        });
        $("#modalPoint").modal("hide");
        onSearch();
    } else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function updatePoint() {
    var obj = {};
    obj = {
        id: $("#modalPoint").data("id"),
        evaluation_scale_id: $("#modalPoint #point").val(),
        plan: $("#modalPoint #plan").val(),
        actual: $("#modalPoint #actual").val(),
        explain: $("#modalPoint #explain").val(),
    };
    if (validateRequired("#modalPoint")) {
        callApi_auditservice(
            apiConfig.api.evaluation.controller,
            apiConfig.api.evaluation.action.updatePoint.path,
            apiConfig.api.evaluation.action.updatePoint.method,
            obj,
            "onUpdatePoint"
        );
    }
}

function fnRefreshSuccess(rspn) {
    if (rspn.code == "001") {
        toastr.success(localizationResources.Update, "Success!", {
            progressBar: true,
        });
        onSearch();
    } else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}
function EvaluationRefresh() {
    if (validateRequired("#formsearch")) {
        var obj = {
            year: isNaN(parseInt($("#search-year").val()))
                ? null
                : parseInt($("#search-year").val()),
            audit_id: isNaN(parseInt($("#search-audit").val()))
                ? null
                : parseInt($("#search-audit").val()),
            stage: isNaN(parseInt($("#Stage").val()))
                ? null
                : parseInt($("#Stage").val()),
        };
        callApi_auditservice(
            apiConfig.api.evaluation.controller,
            apiConfig.api.evaluation.action.refresh.path,
            apiConfig.api.evaluation.action.refresh.method,
            obj,
            "fnRefreshSuccess"
        );
    }
}

function ChangeStage(value) {
    switch (value) {
        case "":
        case "1":
        case "2": {
            $("#search-audit").removeClass("required");
            $("label[for='search-audit']").removeClass("required")
            $("#search-audit").prop("disabled", true);
            $("#search-audit").val('');
            break;
        }
        case "3": {
            $("#search-audit").addClass("required");
            $("label[for='search-audit']").addClass("required")
            $("#search-audit").prop("disabled", false);
            break;
        }
    }
}