$(function () {
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

function getYearSearch() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchyear.path,
        apiConfig.api.auditwork.action.searchyear.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillYearSearch');
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

function onLoadData(data) {
    clearMsgInvalid();
    if (data.code == "001") {
        $("#modalCompliance").data("id", data.data.id);
        $("#modalCompliance").modal("show");
        $("#modalCompliance #evaluation_standard_title").val(
            data.data.evaluation_standard_title
        );
        $("#modalCompliance #evaluation_standard_request").val(
            data.data.evaluation_standard_request
        );
        $("#modalCompliance #reason").val(data.data.reason);
        $("#modalCompliance #plan").val(data.data.plan);
        $("#modalCompliance #time").val(data.data.time);
        $("#modalCompliance #compliance").prop("checked", data.data.compliance);
        if (data.data.reponsible != null) {
            var newOption = new Option(
                data.data.reponsible_name,
                data.data.reponsible,
                true,
                true
            );
            $("#reponsible").append(newOption).trigger("change");
        } else {
            $("#reponsible").empty();
            multiselect(
                "reponsible",
                "Chọn người chịu trách nhiệm...",
                apiConfig.api.host_user_service,
                apiConfig.api.systemuser.controller,
                apiConfig.api.systemuser.action.selectaudiWork.path
            );
        }
        if (!data.data.compliance) {
            $(".for-compliance").show();
        } else {
            $(".for-compliance").hide();
        }
    } else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function openEdit(ele, type) {
    var id = $(ele).data("id");
    if (type == "view") {
        $("#modalCompliance textarea:not('#evaluation_standard_request')").prop(
            "disabled",
            true
        );
        $("#modalCompliance select").prop("disabled", true);
        $("#modalCompliance input[type=date]").prop("disabled", true);
        $("#modalCompliance input[type=checkbox]").prop("disabled", true);
        $("#modalCompliance .modal-btn-submit").hide();
    } else {
        $("#modalCompliance textarea:not('#evaluation_standard_request')").prop(
            "disabled",
            false
        );
        $("#modalCompliance select").prop("disabled", false);
        $("#modalCompliance input[type=date]").prop("disabled", false);
        $("#modalCompliance input[type=checkbox]").prop("disabled", false);
        $("#modalCompliance .modal-btn-submit").show();
    }
    callApi_auditservice(
        apiConfig.api.evaluationcompliance.controller,
        apiConfig.api.evaluationcompliance.action.getItem.path + "/" + id,
        apiConfig.api.evaluationcompliance.action.getItem.method,
        null,
        "onLoadData"
    );
}

function onInitSuccess(rspn) {
    createdLog("Đánh giá tuân thủ", "Tạo bảng đánh giá tuân thủ");
    if (rspn.code == "001") onSearch();
    else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function renderhtml(obj) {
    var html = "";
    html =
        "<tr>" +
        '<td style="text-align:center">' +
        obj.evaluation_standard_code +
        "</td>" +
        "<td>" +
        viewValue(obj.evaluation_standard_title) +
        "</td>" +
        "<td>" +
        viewValue(obj.evaluation_standard_request) +
        "</td>" +
        "<td>" +
        (obj.compliance
            ? localizationResources.YesAnswer
            : localizationResources.NoAnswer) +
        "</td>" +
        '<td class="col-action">';
    if (IsCheckPemission("M_ECL", "PER_DETAIL") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="openEdit(this,\'view\')" data-id="' +
            obj.id +
            '"><i class="fa fa-eye" aria-hidden="true"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fa fa-eye" aria-hidden="true"></i></a>';
    if (IsCheckPemission("M_ECL", "PER_EDIT") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="openEdit(this,\'edit\')" data-id="' +
            obj.id +
            '"><i class="fas fa-pencil-alt"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fas fa-pencil-alt"></i></a>';
    html += "</td>" + "</tr>";
    return html;
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
                        apiConfig.api.evaluationcompliance.controller,
                        apiConfig.api.evaluationcompliance.action.init.path,
                        apiConfig.api.evaluationcompliance.action.init.method,
                        { year: year, audit_id: audit_id, stage: stage },
                        "onInitSuccess"
                    );
                }
            }
        );
    } else {
        var tbBody = $("#tblEvaluationComplianceSearch tbody");
        tbBody.html("");
        dataList.Total = rspn.total;
        if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
            var data = rspn.data;
            for (let item of data) {
                var obj = item;
                var html = renderhtml(obj);
                tbBody.append(html);
            }
            reCalculatPages();
            viewBtnActionPage();
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
            page_size: parseInt($("#cbPageSize").val()),
            start_number:
                (parseInt($("#txtCurrentPage").val()) - 1) *
                parseInt($("#cbPageSize").val()),
        };
        callApi_auditservice(
            apiConfig.api.evaluationcompliance.controller,
            apiConfig.api.evaluationcompliance.action.search.path,
            apiConfig.api.evaluationcompliance.action.search.method,
            { jsonData: JSON.stringify(obj) },
            "fnSearchSuccess"
        );
    }
}

////function btnOnSearch() {
//    $("#txtCurrentPage").val(1);
//    onSearch();
//}
function onUpdateCompliance(rspn) {
    createdLog("Đánh giá tuân thủ", "Cập nhật đánh giá tuân thủ");
    if (rspn.code == "001") {
        toastr.success(localizationResources.Successfully, "Success!", {
            progressBar: true,
        });
        $("#modalCompliance").modal("hide");
        onSearch();
    } else
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function updateCompliance() {
    var obj = {};
    obj = {
        id: $("#modalCompliance").data("id"),
        reason: $("#modalCompliance #reason").val(),
        plan: $("#modalCompliance #plan").val(),
        time: $("#modalCompliance #time").val(),
        reponsible: $("#modalCompliance #reponsible").val(),
        compliance: $("#modalCompliance #compliance").prop("checked"),
    };
    if (!obj.compliance && !validateRequired("#modalCompliance")) {
        return false;
    } else {
        callApi_auditservice(
            apiConfig.api.evaluationcompliance.controller,
            apiConfig.api.evaluationcompliance.action.updateCompliance.path,
            apiConfig.api.evaluationcompliance.action.updateCompliance.method,
            obj,
            "onUpdateCompliance"
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
function EvaluationComplianceRefresh() {
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
            apiConfig.api.evaluationcompliance.controller,
            apiConfig.api.evaluationcompliance.action.refresh.path,
            apiConfig.api.evaluationcompliance.action.refresh.method,
            obj,
            "fnRefreshSuccess"
        );
    }
}

function changeCompliance(input) {
    if (!$(input).is(":checked")) {
        $(".for-compliance").show();
    } else {
        $(".for-compliance").hide();
    }
}


function ChangeStage(value) {
    $("#search-audit").val("");
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
