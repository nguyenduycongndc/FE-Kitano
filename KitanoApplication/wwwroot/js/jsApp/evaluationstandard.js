$(function () {
    reCalculatPages();
    viewBtnActionPage();

    setTimeout(function () {
        if (isViewEdit()) {
            triggerOpenFormEdit("edit", idViewEdit());
        } else if (isViewDetail()) {
            triggerOpenFormEdit("view", idViewDetail());
        }
    }, 200);
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

function onOpenCreate(ele) {
    clearMsgInvalid();
    var button = $(ele);
    var recipient = button.data("whatever");
    var action = button.data("action");
    triggerOpenFormEdit(action, recipient);
}

function triggerOpenFormEdit(action, recipient) {
    var modal = $("#card-update");
    var cardManag = $("#card-index");
    var headerManager = $("#header-manager");
    var headerUpdate = $("#header-update");
    var headerCreate = $("#header-create");
    var headerDetail = $("#header-detail");
    modal.show();
    cardManag.hide();

    if (recipient > 0) {
        headerManager.hide();
        headerCreate.hide();
        if (action == "view") headerDetail.show();
        else headerUpdate.show();
    } else {
        headerManager.hide();
        headerCreate.show();
        headerUpdate.hide();
        headerDetail.hide();
    }

    modal.find("form input.modal-identity-value").val(recipient);
    if (action == "view") {
        modal.find("form input,select,textarea").prop("disabled", true);
        modal.find("#btnSubmit").hide();
        modal.find(".only-view").removeClass("d-none");
        location.hash = "view-" + recipient;
    } else {
        modal.find("form input,select,textarea").prop("disabled", false);
        modal.find("#btnSubmit").show();
        modal.find(".only-view").addClass("d-none");
        location.hash = "edit-" + recipient;
    }

    if (recipient > 0) loadDataItem(recipient);
    else viewDataItem(null);
}

function loadDataItem(id) {
    callApi_auditservice(
        apiConfig.api.evaluationstandard.controller,
        apiConfig.api.evaluationstandard.action.getItem.path + "/" + id,
        apiConfig.api.evaluationstandard.action.getItem.method,
        {},
        "exDataItem"
    );
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function viewDataItem(obj) {
    $("#parent option").prop("disabled", false);
    if (obj == undefined || obj == null) {
        $("#id").val(0);
        $("#code").val("");
        $("#status").val(1);
        $("#title").val("");
        $("#request").val("");
        $("#create_user").val("");
        $("#create_date").val("");
        $("#modified_user").val("");
        $("#modified_date").val("");
    } else {
        $("#id").val(obj.id);
        $("#code").val(obj.code);
        $("#status").val(obj.status);
        $("#title").val(obj.title);
        $("#request").val(obj.request);
        $("#create_user").val(obj.created_by);
        $("#create_date").val(obj.created_at);
        $("#modified_user").val(obj.modified_by);
        $("#modified_date").val(obj.modified_at);
    }
    onFocus("#card-update");
}

function updateSuccess(data) {
    if (data.code == "001") {
        if (data.data.id > 0) {
            createdLog("Chuẩn mực KTNB", "Chỉnh sửa chuẩn mực KTNB");
        } else {
            createdLog("Chuẩn mực KTNB", "Thêm mới chuẩn mực KTNB");
        }
        toastr.success(localizationResources.SaveSuccess, "Good job!", {
            progressBar: true,
        });
        $("#modelUpdateItem").modal("hide");
        onSearch();
        onBack();
    } else {
        toastr.error(getStatusCode(data.code), "Error!", { progressBar: true });
    }
}

function cfSaveDisabled() {
    var obj = {
        id: $("#id").val(),
        code: $("#code").val(),
        status: $("#status").val(),
        title: $("#title").val(),
        request: $("#request").val(),
    };
    if (validateRequired("#form-modify"))
        callApi_auditservice(
            apiConfig.api.evaluationstandard.controller,
            apiConfig.api.evaluationstandard.action.update.path,
            apiConfig.api.evaluationstandard.action.update.method,
            obj,
            "updateSuccess",
            "updateFail"
        );
}
function fnSaveItemInfo() {
    cfSaveDisabled();
}

function fnOnDeleteDone(data) {
    if (data.code == "001") {
        createdLog("Chuẩn mực KTNB", "Xóa chuẩn mực KTNB");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    } else {
        toastr.error(getStatusCode(data.code), "Error", { progressBar: true });
    }
}

function cfDelete(id) {
    var obj = {
        id: id,
    };
    callApi_auditservice(
        apiConfig.api.evaluationstandard.controller,
        apiConfig.api.evaluationstandard.action.delete.path,
        apiConfig.api.evaluationstandard.action.delete.method,
        obj,
        "fnOnDeleteDone"
    );
}

function renderhtml(obj) {
    var html =
        "<tr>" +
        '<td style="text-align:center">' +
        obj.code +
        "</td>" +
        "<td>" +
        viewValue(obj.title) +
        "</td>" +
        "<td>" +
        viewValue(obj.request) +
        "</td>" +
        "<td>" +
        (obj.status == 1
            ? localizationResources.Used
            : localizationResources.NotUsed) +
        "</td>" +
        '<td class="col-action">';
    if (IsCheckPemission("M_ESD", "PER_DETAIL") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="view"><i class="fa fa-eye"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fa fa-eye"></i></a>';
    if (IsCheckPemission("M_ESD", "PER_EDIT") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="edit"><i class="fas fa-pencil-alt"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission("M_ESD", "PER_DEL") === true)
        html +=
            '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(' +
            obj.id +
            ')"><i class="fa fa-trash"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"><i class="fa fa-trash"></i></a>';
    html += "</td>" + "</tr>";
    return html;
}

function fnSearchSuccess(rspn) {
    var tbBody = $("#tblEvaluationStandardSearch tbody");
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

function onSearch() {
    var obj = {
        title: $("#title-search").val(),
        request: $("#request-search").val(),
        page_size: parseInt($("#cbPageSize").val()),
        start_number:
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val()),
    };
    callApi_auditservice(
        apiConfig.api.evaluationstandard.controller,
        apiConfig.api.evaluationstandard.action.search.path,
        apiConfig.api.evaluationstandard.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fnSearchSuccess"
    );
}

////function btnOnSearch() {
////    $("#txtCurrentPage").val(1);
////    onSearch();
////}

window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 120);
};
