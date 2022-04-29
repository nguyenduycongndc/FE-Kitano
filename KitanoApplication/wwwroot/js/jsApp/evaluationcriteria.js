$(function () {
    getParents();
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

function fillParentCombo(data) {
    var htmlOption =
        '<option value="0">----' + localizationResources.Choose + "----</option>";
    $("#search-parent").html("");
    $("#parent").html("");
    $("#search-parent").append(htmlOption);
    $("#parent").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, "childs", "ancestor");
    $("#search-parent").append(html);
    $("#parent").append(html);
}

function getParents() {
    var obj = {
        status: 1,
        page_size: 9999,
        start_number: 0,
    };

    callApi_auditservice(
        apiConfig.api.evaluationcriteria.controller,
        apiConfig.api.evaluationcriteria.action.search.path,
        apiConfig.api.evaluationcriteria.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fillParentCombo"
    );
}

function loadDataItem(id) {
    callApi_auditservice(
        apiConfig.api.evaluationcriteria.controller,
        apiConfig.api.evaluationcriteria.action.getItem.path + "/" + id,
        apiConfig.api.evaluationcriteria.action.getItem.method,
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
        $("#name").val("");
        $("#code").val("");
        $("#status").val(1);
        $("#description").val("");
        $("#parent").val(0);

        $("#create_user").val("");
        $("#create_date").val("");
        $("#modified_user").val("");
        $("#modified_date").val("");
    } else {
        $("#id").val(obj.id);
        $("#name").val(obj.name);
        $("#code").val(obj.code);

        $("#create_user").val(obj.created_by);
        $("#create_date").val(obj.created_at);
        $("#modified_user").val(obj.modified_by);
        $("#modified_date").val(obj.modified_at);

        $("#status").val(obj.status);
        $("#description").val(obj.description);
        var parentId =
            obj.parent_id == undefined || obj.parent_id == null || obj.parent_id == ""
                ? 0
                : obj.parent_id;
        $("#parent").val(parentId);
        $("#parent option").prop("disabled", false);
        $("#parent option[value=" + obj.id + "]").prop("disabled", true);
        $('#parent option[data-ancestor*="' + ("|" + obj.id + "|") + '"]').prop(
            "disabled",
            true
        );
    }
    onFocus("#card-update");
}

function updateSuccess(data) {
    if (data.code == "001") {
        if (data.data.id > 0) {
            createdLog("Tiêu chí đánh giá", "Chỉnh sửa tiêu chí đánh giá");
        } else {
            createdLog("Tiêu chí đánh giá", "Thêm mới tiêu chí đánh giá");
        }
        toastr.success(localizationResources.SaveSuccess, "Good job!", {
            progressBar: true,
        });
        $("#modelUpdateItem").modal("hide");
        onSearch();
        getParents();
        onBack();
    } else {
        toastr.error(getStatusCode(data.code), "Error!", { progressBar: true });
    }
}

function cfSaveDisabled() {
    var obj = {
        id: $("#id").val(),
        name: $("#name").val(),
        code: $("#code").val(),
        parent_id: $("#parent").val(),
        status: $("#status").val(),
        description: $("#description").val(),
    };
    obj.parent_id = obj.parent_id == "" ? 0 : obj.parent_id;
    if (validateRequired("#form-modify")) {
        callApi_auditservice(
            apiConfig.api.evaluationcriteria.controller,
            apiConfig.api.evaluationcriteria.action.update.path,
            apiConfig.api.evaluationcriteria.action.update.method,
            obj,
            "updateSuccess",
            "updateFail"
        );
    }
}
function fnSaveItemInfo() {
    if ($("#status").val() != "1") {
        swal(
            {
                title: localizationResources.Confirm,
                text: localizationResources.ConfirmDisable,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: localizationResources.Accept,
                cancelButtonText: localizationResources.Cancel,
                closeOnConfirm: true,
            },
            function () {
                cfSaveDisabled();
            }
        );
    } else {
        cfSaveDisabled();
    }
}

function fnOnDeleteDone(data) {
    if (data.code == "001") {
        createdLog("Tiêu chí đánh giá", "Xóa tiêu chí đánh giá");
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
        getParents();
    } else {
        toastr.error(getStatusCode(data.code), "Error", { progressBar: true });
    }
}

function cfDelete(title, id) {
    swal(
        {
            title: localizationResources.Confirm,
            text:
                localizationResources.DoDelete + title + localizationResources.AndSub,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: localizationResources.Accept,
            cancelButtonText: localizationResources.Cancel,
            closeOnConfirm: true,
        },
        function () {
            var obj = {
                id: id,
            };
            callApi_auditservice(
                apiConfig.api.evaluationcriteria.controller,
                apiConfig.api.evaluationcriteria.action.delete.path,
                apiConfig.api.evaluationcriteria.action.delete.method,
                obj,
                "fnOnDeleteDone"
            );
        }
    );
}
function renderhtml(obj, prId, nbsp, colId) {
    var html = "";
    var rowCls = obj.childs.length == 0 ? "" : "row-parent";
    var btnShow =
        obj.childs.length == 0
            ? ""
            : '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' +
            colId +
            '">' +
            '<i class="fa fa-minus" aria-hidden="true"></i></button>';
    rowCls += obj.status ? "" : " table-warning";

    html +=
        '<tr class="' +
        rowCls +
        " " +
        prId +
        ' show">' +
        '<td class="' +
        rowCls +
        '" style="text-align:center">' +
        nbsp +
        btnShow +
        "</td>" +
        "<td>" +
        viewValue(obj.code) +
        "</td>" +
        "<td>" +
        viewValue(obj.name) +
        "</td>" +
        "<td>" +
        (obj.status == 1
            ? localizationResources.Used
            : localizationResources.NotUsed) +
        "</td>" +
        '<td class="col-action">';
    if (IsCheckPemission("M_EC", "PER_DETAIL") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="view"><i class="fa fa-eye"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"  ><i class="fa fa-eye"></i></a>';
    if (IsCheckPemission("M_EC", "PER_EDIT") === true)
        html +=
            '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' +
            obj.id +
            '" data-action="edit"><i class="fas fa-pencil-alt"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"   ><i class="fas fa-pencil-alt"></i></a>';
    if (IsCheckPemission("M_EC", "PER_DEL") === true)
        html +=
            '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' +
            obj.name +
            "'," +
            obj.id +
            ')"><i class="fa fa-trash"></i></a>';
    else
        html +=
            '<a class="btn icon-disabled btn-action-custom"><i class="fa fa-trash"></i></a>';
    html += "</td></tr>";
    return html;
}
function getHtmlChild(childs, prId, n) {
    var nbsp = "";
    for (var i = 0; i < n; i++) {
        nbsp += "&nbsp;&nbsp;";
    }
    var html = "";
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = "collapRow" + obj.id;
            html += renderhtml(obj, prId, nbsp, colId);
            if (obj.childs != undefined && obj.childs != null)
                html += getHtmlChild(obj.childs, prId + " " + colId, n + 1);
        }
    }
    return html;
}

function fnSearchSuccess(rspn) {
    var tbBody = $("#tblEvaluationCriteriaSearch tbody");
    tbBody.html("");
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var html = getHtmlChild(data, "", 0);
        tbBody.append(html);
        collapseDelegate();
    }
}

function onSearch() {
    var obj = {
        key: $("#search-key").val(),
        status: isNaN(parseInt($("#search-status").val()))
            ? 1
            : parseInt($("#search-status").val()),
        //'page_size': parseInt($("#cbPageSize").val()),
        //'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi_auditservice(
        apiConfig.api.evaluationcriteria.controller,
        apiConfig.api.evaluationcriteria.action.search.path,
        apiConfig.api.evaluationcriteria.action.search.method,
        { jsonData: JSON.stringify(obj) },
        "fnSearchSuccess"
    );
}

window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 120);
};
