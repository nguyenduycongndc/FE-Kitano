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
        apiConfig.api.evaluationscale.controller,
        apiConfig.api.evaluationscale.action.getItem.path + "/" + id,
        apiConfig.api.evaluationscale.action.getItem.method,
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
        $("#status").val(1);
        $("#description").val("");
        $("#point").val("");
        $("#create_user").val("");
        $("#create_date").val("");
        $("#modified_user").val("");
        $("#modified_date").val("");
    } else {
        $("#id").val(obj.id);
        $("#status").val(obj.status);
        $("#description").val(obj.description);
        $("#point").val(obj.point);
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
            createdLog("Thang điểm đánh giá", "Chỉnh sửa thang điểm đánh giá");
        } else {
            createdLog("Thang điểm đánh giá", "Thêm mới thang điểm đánh giá");
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
        description: $("#description").val(),
        point: $("#point").val(),
    };

    if (validateRequired("#form-modify")) {
        callApi_auditservice(
            apiConfig.api.evaluationscale.controller,
            apiConfig.api.evaluationscale.action.update.path,
            apiConfig.api.evaluationscale.action.update.method,
            obj,
            "updateSuccess",
            "updateFail"
        );
    }
}
function fnSaveItemInfo() {
    cfSaveDisabled();
}

function fnOnDeleteDone(data) {
    if (data.code == "001") {
        createdLog("Thang điểm đánh giá", "Xóa thang điểm đánh giá");
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
        apiConfig.api.evaluationscale.controller,
        apiConfig.api.evaluationscale.action.delete.path,
        apiConfig.api.evaluationscale.action.delete.method,
        obj,
        "fnOnDeleteDone"
    );
}

function renderhtml(obj, index) {
    var html =
        "<tr>" +
        '<td style="text-align:center">' +
        rowNo($("#txtCurrentPage").val(), $("#cbPageSize").val(), index) +
        "</td>" +
        "<td>" +
        obj.point +
        "</td>" +
        "<td>" +
        viewValue(obj.description) +
        "</td>" +
        "<td>" +
        (obj.status == 1
            ? localizationResources.Used
            : localizationResources.NotUsed) +
        "</td>" +
        '<td class="col-action">';
    if (IsCheckPemission("M_ES", "PER_DETAIL") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="view"><i class="fa fa-eye"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fa fa-eye"></i></a>';
    if (IsCheckPemission("M_ES", "PER_EDIT") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="edit"><i class="fas fa-pencil-alt"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission("M_ES", "PER_DEL") === true)
        html +=
            '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(' +
            obj.id +
            ')"><i class="fa fa-trash"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom" href="javascript:cfDelete(' +
            obj.id +
            ')"><i class="fa fa-trash"></i></a>';
    html += "</td>" + "</tr>";
    return html;
}

function fnSearchSuccess(rspn) {
    var tbBody = $("#tblEvaluationScaleSearch tbody");
    tbBody.html("");
    dataList.Total = rspn.total;
    var index = 0;
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        for (let item of data) {
            var obj = item;
            var html = renderhtml(obj, index);
            tbBody.append(html);
            index++;
        }
        reCalculatPages();
        viewBtnActionPage();
        collapseDelegate();
    }
}

function onSearch() {
    var obj = {
        key: $("#search-key").val(),
        status: isNaN(parseInt($("#search-status").val()))
            ? 1
            : parseInt($("#search-status").val()),
        page_size: parseInt($("#cbPageSize").val()),
        start_number:
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val()),
    };
    callApi_auditservice(
        apiConfig.api.evaluationscale.controller,
        apiConfig.api.evaluationscale.action.search.path,
        apiConfig.api.evaluationscale.action.search.method,
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
