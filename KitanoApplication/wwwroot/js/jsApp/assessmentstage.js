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


$(function () {
    reCalculatPages();
    viewBtnActionPage();
    setTimeout(function () {
        if (isViewUpload()) openFormUpload(true);
        else if (isViewEdit()) {
            triggerOpenFormEdit('edit', idViewEdit());
        }
        else if (isViewDetail()) {
            triggerOpenFormEdit('view', idViewDetail());
        }
    }, 200);
});

var parentLoaded = false;
var fileUpload = '';

function onOpenCreate(ele) {
    onViewModalCreate(ele);
}

function onViewModalCreate(ele) {
    var button = $(ele);
    var recipient = button.data('whatever');
    var action = button.data('action');
    triggerOpenFormEdit(action, recipient);
}
function triggerOpenFormEdit(action, recipient) {
    var modal = $('#card-update');
    var cardManag = $('#card-index');
    var headerManager = $('#header-manager');
    var headerUpdate = $('#header-update');
    var headerCreate = $('#header-create');
    modal.show();
    cardManag.hide();
    fnChangeHeader(action);
    if (recipient > 0) {
        headerManager.hide();
        headerCreate.hide();
        headerUpdate.show();
    }
    else {
        headerManager.hide();
        headerCreate.show();
        headerUpdate.hide();
    }

    modal.find('form input.modal-identity-value').val(recipient);
    if (action == 'view') {
        modal.find('form input,select,textarea').prop('disabled', true);
        modal.find('#btnSubmit').hide();
        modal.find('.only-view').removeClass('d-none');
        location.hash = 'view-' + recipient;
    }
    else {
        modal.find('form input,select,textarea').prop('disabled', false);
        modal.find('#btnSubmit').show();
        modal.find('.only-view').addClass('d-none');
        location.hash = 'edit-' + recipient;
    }

    if (recipient > 0) loadDataItem(recipient);
    else viewDataItem(null);
}

function loadDataItem(id) {
    callApi(
        apiConfig.api.assessmentstage.controller,
        apiConfig.api.assessmentstage.action.getItem.path + "/" + id,
        apiConfig.api.assessmentstage.action.getItem.method,
        {}, 'exDataItem');
}

function exDataItem(data) {
    viewDataItem(data.data);
}

function viewDataItem(obj) {
    if (obj == undefined || obj == null) {
        $('#id').val(0);
        $('#year').val('');
        $('#stage').val('');
        $('#stage_value').val('');

        $('#create_user').val('');
        $('#create_date').val('');
        $('#modified_user').val('');
        $('#modified_date').val('');
    }
    else {
        $('#id').val(obj.id);
        $('#year').val(obj.year);
        $('#stage').val(obj.stage);
        $('#stage_value').val(obj.value);

        $('#create_user').val(obj.name_create);
        $('#create_date').val(obj.create_date_str);
        $('#modified_user').val(obj.name_modified);
        $('#modified_date').val(obj.last_modified_str);
        changeStageValue(obj.value);
    }
    onFocus('#card-update');
}

function updateSuccess(data) {
    if (data.code == '001') {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true })
        if (data.id > 0) {
            createdLog("Kỳ đánh giá", "Chỉnh sửa kỳ đánh giá");
        } else {
            createdLog("Kỳ đánh giá", "Thêm mới kỳ đánh giá");
        }
        onBack();
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function fnSaveItemInfo() {
    var obj = {
        'id': $('#id').val(),
        'year': $('#year').val(),
        'stage': $('#stage').val(),
        'value': $('#stage_value').val()
    };
    if (validateRequired("#form-modify")) {
        callApi(
            apiConfig.api.assessmentstage.controller,
            apiConfig.api.assessmentstage.action.update.path,
            apiConfig.api.assessmentstage.action.update.method,
            obj, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true })
        createdLog("Kỳ đánh giá", "Xóa kỳ đánh giá");
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DelCfnAssessmentStage,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
        closeOnConfirm: true
    },
        function () {
            var obj = {
                'id': id
            };
            callApi(
                apiConfig.api.assessmentstage.controller,
                apiConfig.api.assessmentstage.action.delete.path,
                apiConfig.api.assessmentstage.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}
function renderhtml(obj, prId, index) {
    var html = '';
    var rowCls = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' : 'row-parent';
    rowCls += '';
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + rowNo($("#txtCurrentPage").val(), $("#cbPageSize").val(), index) + '</td>' +
        '<td>' + obj.year + '</td>' +
        '<td>' + getAssessmentStage(obj.stage) + '</td>' +
        '<td>' + (obj.stage == 3 ? obj.value : '') + '</td>' +
        '<td>' + getAssessmentState(obj.state) + '</td>' +
        ////'<td>' + getAssessmentPullState(obj.pull_state) + '</td>' +
        ////'<td>' + getAssessmentPullLast(obj.pull_lasttime) + '</td>' +
        '<td class="col-action">';
    ////'<a class="btn icon-default btn-action-custom"   data-whatever="' + obj.id + '" data-action="view"><i class="fa fa-database"></i></a>';
    if (IsCheckPemission('M_AS', 'PER_DETAIL') === true)
        html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye"></i></a>';
    if (obj.state != '1') {
        if (IsCheckPemission('M_AS', 'PER_EDIT') === true)
            html += '<a class="btn icon-default btn-action-custom"   onclick="onOpenCreate(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
        else html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt"></i></a>';
        if (IsCheckPemission('M_AS', 'PER_DEL') === true)
            html += '<a class="btn icon-delete btn-action-custom" href="javascript:cfDelete(\'' + obj.name + '\',' + obj.id + ')"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
        else html += '<a class="btn icon-disabled btn-action-custom"><i data-toggle="tooltip" title="Xóa" class="fa fa-trash"></i></a>';
    }
    html += '</td>' +
        '</tr>';
    return html;
}
function getHtmlChild(childs, prId, n) {
    var nbsp = '';
    for (var i = 0; i < n; i++) {
        nbsp += '&nbsp;&nbsp;';
    }
    var html = '';
    var index = 0;
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = 'collapRow' + obj.id;
            ////var btnShow = obj.sub_activities == undefined || obj.sub_activities == null || obj.sub_activities.length == 0 ? '' :
            ////    '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' + colId + '">'
            ////    + '<i class="fa fa-minus-square" aria-hidden="true"></i></button>';

            html += renderhtml(obj, prId, index);
            index++;
            if (obj.sub_activities != undefined && obj.sub_activities != null)
                html += getHtmlChild(obj.sub_activities, prId + ' ' + colId, n + 1);
        }
    }
    return html;
}

function fnSearchSuccess(rspn) {
    dataList.Total = rspn.total;
    var tbBody = $('#tblResultActivity tbody');
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.total > 0) {
        var data = rspn.data;
        var html = getHtmlChild(data, '', 0);
        tbBody.append(html);
        reCalculatPages();
        triggerChangeHeader();
        viewBtnActionPage();
    }
}

function onSearch() {
    var obj = {
        'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
        'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
        'state': isNaN(parseInt($('#search-state').val())) ? null : parseInt($('#search-state').val()),
        'value': isNaN(parseInt($('#search-value').val())) ? null : parseInt($('#search-value').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    };
    callApi(
        apiConfig.api.assessmentstage.controller,
        apiConfig.api.assessmentstage.action.search.path,
        apiConfig.api.assessmentstage.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
}

function changeStageValue(val) {
    val = !val ? '' : val;
    if ($('#stage').val() == 3) {
        $('#stage_value').prop('disabled', isViewDetail());
        $('#stage_value').val(val);
        $('#stage_value').parent().find('label').addClass('required');
    }
    else {
        $('#stage_value').prop('disabled', isViewDetail() || true);
        $('#stage_value').val('');
        $('#stage_value').parent().find('label').removeClass('required');
    }
}
window.onload = function () {

    setTimeout(function () {
        onSearch();
        changeStageValue();
    }, 100);

}