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

$(document).on("click", "li.nav-item", function () {
    $("li.nav-item").removeAttr("style");
    $(this).css("border-bottom-color", "#2f80ed");
})

$(function () {
    loadCategory();
    ////getFacilities();
    changeStageValue();
});

var parentLoaded = false;
var fileUpload = '';
var currentStage = null;
function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search_apply_for').html('');
    $('#search_apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#search_apply_for').append(html);
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');
}

////function fillActivityCombo(data) {
////    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
////    $('#search-object').html('');
////    $('#search-object').append(htmlOption);
////    if (data.data == undefined || data.data == null || data.data.length == 0)
////        return;
////    var html = generateComboOptions(data.data, 0, 'sub_activities');
////    $('#search-object').append(html);
////    parentLoaded = true;
////}

function fillCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-object').html('');
    $('#search-object').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'sub_activities');
    $('#search-object').append(html);
    parentLoaded = true;
}

function getActivities() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.bussinessactivity.controller,
        apiConfig.api.bussinessactivity.action.search.path,
        apiConfig.api.bussinessactivity.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillCombo');
}

function fillFacilitiesCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search-object').html('');
    $('#search-object').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, 'childs');
    $('#search-object').append(html);

}

function getFacilities() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };

    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillFacilitiesCombo');
}

////function fillProcessCombo(data) {
////    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
////    $('#search-object').html('');
////    $('#search-object').append(htmlOption);
////    if (data.data == undefined || data.data == null || data.data.length == 0)
////        return;
////    var html = generateComboOptions(data.data, 0, 'sub_activities');
////    $('#search-object').append(html);
////    parentLoaded = true;
////}

function getProcesses() {
    var obj = {
        'key': '',
        'code': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditprocess.controller,
        apiConfig.api.auditprocess.action.search.path,
        apiConfig.api.auditprocess.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillCombo');
}

function loadObjects(ele) {
    if (ele.value == 'QT')
        getProcesses();
    else if (ele.value == 'DV')
        getFacilities();
    else if (ele.value == 'HDKD')
        getActivities();
}

function updateSuccess(rspn) {
    if (rspn.code != '001') {
        ////swal("Error!", getScoreRspnCode(rspn.code), "error");
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
    }
    else {
        ////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
        onSearch();
    }
}

function saveScoreBoard() {
    var checkvalidate = false;
    var obj = {
        'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
        'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
        'stage_value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
        'apply_for': $('#search_apply_for').val(),
        'object_id': isNaN(parseInt($('#search-object').val())) ? null : parseInt($('#search-object').val()),


        'assessment_object': $('#assessment_object').val(),
        'assessment_state': $('#assessment_state').val(),
        'assessment_point': $('#assessment_point').val(),
        'assessment_risklevel': $('#assessment_risklevel').val(),

        'target_info': $('#panelObjectInfo #target_info').val(),
        'mainprocess_info': $('#panelObjectInfo #mainprocess_info').val(),
        'itsystem_info': $('#panelObjectInfo #itsystem_info').val(),
        'project_info': $('#panelObjectInfo #project_info').val(),
        'outsourcing_info': $('#panelObjectInfo #outsourcing_info').val(),
        'customer_info': $('#panelObjectInfo #customer_info').val(),
        'supplier_info': $('#panelObjectInfo #supplier_info').val(),
        'internal_info': $('#panelObjectInfo #internal_info').val(),
        'description': $('#panelObjectInfo #description').val(),
        'law_info': $('#panelObjectInfo #law_info').val()
    };

    if (validateRequired('#panelScoreBoard') && validateRequired('#panelObjectInfo')) {

        var formData = new FormData();
        formData.append("objData", JSON.stringify(obj));


        var input = document.getElementById('file_attach');
        if (input != null && input.files.length > 0) {
            //var ext = $('#file_attach').val().split('.').pop().toLowerCase();
            //if ($.inArray(ext, ['xlsx', 'xls', 'doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg',]) == -1) {
            //    ////swal("Error!", localizationResources.AttachDenied, "error");
            //    toastr.error(localizationResources.AttachDenied, "Error!", { progressBar: true })
            //    return;
            //}

            ////var imageFile = input.files[0];

            ////formData.append("objAttach", imageFile);

            $.each(input.files, function (i, v) {
                var ext = $('#file_attach').val().split('.').pop().toLowerCase();
                if ($.inArray(ext, ['xlsx', 'xls', 'doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg',]) == -1) {
                    ////swal("Error!", localizationResources.AttachDenied, "error");
                    toastr.error(localizationResources.AttachDenied, "Error!", { progressBar: true })
                    checkvalidate = true;
                    return false;
                }
                formData.append("objAttach", v);
            });
        }


        if (!checkvalidate)
            callUpload(apiConfig.api.scoreboard.controller,
                apiConfig.api.scoreboard.action.update.path,
                formData, 'updateSuccess', 'updateFail');
    }
}

function fnOnDeleteDone(data) {
    if (data.code == '001') {
        ////swal(localizationResources.Deleted);
        toastr.success(localizationResources.Deleted, null, { progressBar: true });
        onSearch();
    }
    else {
        setTimeout(function () { /*swal('Error', getStatusCode(data.code), "error")*/ toastr.error(getStatusCode(data.code), 'Error', { progressBar: true }) }, 200);
    }
}

function cfDelete(title, id) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete + title + localizationResources.AndSub,
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
                apiConfig.api.scoreboard.controller,
                apiConfig.api.scoreboard.action.delete.path,
                apiConfig.api.scoreboard.action.delete.method,
                obj, 'fnOnDeleteDone');
        });
}

function getScoreRspnCode(code) {
    switch (code) {
        case '004':
            return localizationResources.AssessmentStageInvalid;
        case '005':
            return localizationResources.FacilityInvalid;
        case '006':
            return localizationResources.ScoreBoardNotInit;
        case '007':
            return localizationResources.NotHaveIssue;
        case '002':
            return localizationResources.ScoreBoardExists;
        case '009':
            return localizationResources.BoardDone;
        case '201':
            return localizationResources.Error201;
        case '103':
            return localizationResources.Error103;
        case '104':
            return localizationResources.Error104;
        case '105':
            return localizationResources.Error105;
        default:
            return localizationResources.ScoreBoardInited;
    }

}

function clearPointCombo() {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#modalRiskPoint #riskissue_point').html('');
    $('#modalRiskPoint #riskissue_point').append(htmlOption);
}

function fillPointCombo(data, methodid) {
    var index = 0;
    if (data && data.length > 0) {
        for (let obj of data) {
            var item = obj;
            if (index == 0 && methodid == 0) {
                $('#modalRiskPoint #riskissue_point').html('');
                var html = '<option value="" data-condition="' + item.condition + '">' + localizationResources.Choose + '</option>';
                $('#modalRiskPoint #riskissue_point').append(html);
            }
            var html = ' <option value="' + item.point + '" data-condition="' + item.condition + '">' + item.point + '</option>';
            $('#modalRiskPoint #riskissue_point').append(html);
            index++;
        }
    }
}

function onLoadRiskPoint(data) {
    clearMsgInvalid();
    clearPointCombo();
    if (data.code == '001') {
        fillPointCombo(data.item.point_ranges, data.item.method_id);
        $('#modalRiskPoint #riskissue_code').val(data.item.code);
        $('#modalRiskPoint #riskissue_name').val(data.item.name);
        $('#modalRiskPoint #riskissue_point').val(data.item.point);
        $('#modalRiskPoint #riskissue_condition').val(data.item.condition);
        $('#modalRiskPoint #riskissue_value').val(data.item.risk_value);
        $('#modalRiskPoint #riskissue_description').val(data.item.description);

        $('#modalRiskPoint').data('issue', data.item.issue);
        $('#modalRiskPoint').data('parent', data.item.score_board);

        $('#modalRiskPoint').modal('show');

        if (data.item.method_id == 0) {
            $('.for-automation').removeClass('d-none');
            $('.for-automation label').addClass('required');
            $('.for-manual label').removeClass('required');
            $('.for-manual.need-hide').addClass('d-none');
        }
        else {
            $('.for-automation').addClass('d-none');
            $('.for-automation label').removeClass('required');
            $('.for-manual label').addClass('required');
            $('.for-manual.need-hide').removeClass('d-none');
        }
        GetCondition(data.item.method_id);
    }
    else toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function onLoadProportion(data) {
    clearMsgInvalid();
    if (data.code == '001') {
        $('#modalRiskProportion #riskissue_code').val(data.item.code);
        $('#modalRiskProportion #riskissue_name').val(data.item.name);
        if (data.item.parent != null) {
            if (data.item.parent.formulaId == "1" || data.item.parent.formulaId == "3" || data.item.parent.formulaId == 1 || data.item.parent.formulaId == 3) {
                $('#modalRiskProportion #riskissue_proportion').val(data.item.proportion).prop("disabled",true);
                $('#modalRiskProportion #riskissue_proportion_edit').val(data.item.proportion_modify).prop("disabled", true);
                $("label[for='riskissue_proportion_edit']").removeClass("required")
            }
            else {
                $('#modalRiskProportion #riskissue_proportion').val(data.item.proportion).prop("disabled", false);
                $('#modalRiskProportion #riskissue_proportion_edit').val(data.item.proportion_modify).prop("disabled", false);
            }
        }
        else {
            $('#modalRiskProportion #riskissue_proportion').val(data.item.proportion).prop("disabled", false);
            $('#modalRiskProportion #riskissue_proportion_edit').val(data.item.proportion_modify).prop("disabled", false);
        }
        
        $('#modalRiskProportion #riskissue_reason').val(data.item.reason);
        if (data.item.is_apply == false) {
            $('#modalRiskProportion #is_apply').prop("checked", true);
        }
        else {
            $('#modalRiskProportion #is_apply').prop("checked", false);
        }
        

        $('#modalRiskProportion').data('issue', data.item.issue);
        $('#modalRiskProportion').data('parent', data.item.score_board);

        $('#modalRiskProportion').modal('show');
    }
    else toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function openRiskPoint(ele) {
    var issueId = $(ele).data('issue');
    var boardId = $(ele).data('parent');

    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.getRiskIssue.path,
        apiConfig.api.scoreboard.action.getRiskIssue.method,
        { 'issue': issueId, 'score_board': boardId }, 'onLoadRiskPoint');
}

function openRiskProportion(ele) {
    var issueId = $(ele).data('issue');
    var boardId = $(ele).data('parent');

    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.getRiskIssue.path,
        apiConfig.api.scoreboard.action.getRiskIssue.method,
        { 'issue': issueId, 'score_board': boardId }, 'onLoadProportion');
}

function renderhtml(obj, prId, colId, nbsp, currentProportion) {
    var html = '';
    var rowCls = obj.issues == undefined || obj.issues == null || obj.issues.length == 0 ? (obj.issue_parent == 0 ? 'row-parent' : '') : 'row-parent';
    var btnShow = obj.issues == undefined || obj.issues == null || obj.issues.length == 0 ? '' :
        '	<button style="padding:0" type="button" class="btn btn-collapse shown"  data-target=".' + colId + '">'
        + '<i class="fa fa-minus-square" aria-hidden="true"></i></button>';
    rowCls += obj.status ? '' : ' table-warning'
    html += '<tr class="' + rowCls + ' ' + prId + ' show">' +
        '<td class="' + rowCls + '" style="text-align:center">' + nbsp + btnShow + '</td>' +
        '<td>' + obj.code + '</td>' +
        '<td>' + obj.name + '</td>' +
        '<td>' + (obj.is_apply == false ? "N/A" :"") + '</td>' +
        '<td class="text-right">' + (currentProportion == null ? '' : (currentProportion + ' %')) + '</td>' +
        '<td class="text-center">' + getScoreMethod(obj.method_id) + '</td>' +
        '<td class="text-center">' + (obj.formula == null ? "" : obj.formula) + '</td>' +
        '<td class="text-center">' + (obj.point ? obj.point : '') + '</td>' +
        '<td class="col-action">';
    if (currentStage.state != 1) {
        if (!obj.has_child)
            if (IsCheckPemission('M_SB', 'PER_EDIT') === true) {
                html += '<a class="btn icon-default btn-action-custom"   onclick="openRiskPoint(this)" data-parent="' + obj.score_board + '" data-issue="' + obj.issue + '"><i data-toggle="tooltip" title="Chấm điểm" class="fa fa-check-square" aria-hidden="true"></i></a>';
                html += '<a class="btn icon-default btn-action-custom"   onclick="openRiskProportion(this)" data-parent="' + obj.score_board + '" data-issue="' + obj.issue + '"><i data-toggle="tooltip" title="Điều chỉnh tỷ trọng" class="fas fa-pencil-alt"></i></a>';
            } else {
                html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chấm điểm" class="fa fa-check-square" aria-hidden="true"></i></a>';
                html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Điều chỉnh tỷ trọng" class="fas fa-pencil-alt"></i></a>';
            }
        else {
            if (IsCheckPemission('M_SB', 'PER_EDIT') === true) {
                html += '<a class="btn icon-default btn-action-custom"   onclick="openRiskProportion(this)" data-parent="' + obj.score_board + '" data-issue="' + obj.issue + '"><i data-toggle="tooltip" title="Điều chỉnh tỷ trọng" class="fas fa-pencil-alt"></i></a>';
            } else {
                html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Điều chỉnh tỷ trọng" class="fas fa-pencil-alt"></i></a>';
            }
        }
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
    if (childs != null && childs.length > 0) {
        for (let child of childs) {
            var obj = child;
            var colId = 'collapRow' + obj.id;
            var currentProportion = (obj.proportion_modify != null && obj.proportion_modify > 0 ? obj.proportion_modify : obj.proportion);
            html += renderhtml(obj, prId, colId, nbsp, currentProportion);
            if (obj.issues != undefined && obj.issues != null)
                html += getHtmlChild(obj.issues, prId + ' ' + colId, n + 1);
        }
    }
    return html;
}

function fillSelfData(data) {
    var tbBody = $('#tblRiskScore tbody');
    tbBody.html('');
    if (data != undefined && data != null && data.length > 0) {
        var html = getHtmlChild(data, '', 0);
        tbBody.append(html);

        collapseDelegate();
    }
}

function onInitSuccess(rspn) {
    if (rspn.code == '001') {
        onSearch();
        createdLog("Bảng chấm điểm", "Tạo mới bảng chấm điểm");
    }
    else toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}


function search(rspn) {
    $('#panel_obj_info').removeClass('d-none');

    if (rspn.stage)
        currentStage = rspn.stage;

    if (rspn.self) {
        $('#assessment_object').val(rspn.self.assessment_object);
        $('#assessment_state').val(rspn.self.assessment_state);
        $('#assessment_point').val(rspn.self.assessment_point);
        $('#assessment_risklevel').val(rspn.self.assessment_risklevel);

        $('#panelObjectInfo #target_info').val(rspn.self.target_info);
        $('#panelObjectInfo #mainprocess_info').val(rspn.self.mainprocess_info);
        $('#panelObjectInfo #itsystem_info').val(rspn.self.itsystem_info);
        $('#panelObjectInfo #project_info').val(rspn.self.project_info);
        $('#panelObjectInfo #outsourcing_info').val(rspn.self.outsourcing_info);
        $('#panelObjectInfo #customer_info').val(rspn.self.customer_info);
        $('#panelObjectInfo #supplier_info').val(rspn.self.supplier_info);
        $('#panelObjectInfo #internal_info').val(rspn.self.internal_info);
        $('#panelObjectInfo #description').val(rspn.self.description);
        $('#panelObjectInfo #law_info').val(rspn.self.law_info);
        document.getElementById('file_attach').value = '';

        //var divDownload = $('#divDownloadAttach .feedback');
        //if (divDownload.length > 0)
        //    divDownload.remove();
        //if (rspn.self.attach_name && rspn.self.attach_path) {
        //    var aHtml = '<div class="feedback"><a href="javascript:downloadAttach(' + rspn.self.id + ')">' + rspn.self.attach_name + '</a>';
        //    aHtml += '<a href="javascript:deleteAttach(' + rspn.self.id + ')" title="Delete" style="float:right">X</a></div>';
        //    $('#divDownloadAttach').append(aHtml);
        //}
        if (currentStage.state == 1) {
            GenerateListFileName(
                rspn.self.scoreBoardFile,
                "",
                "#listfile",
                true,
                false
            );
        }
        else {
            GenerateListFileName(
                rspn.self.scoreBoardFile,
                "",
                "#listfile",
                true,
                true
            );

        }
        if (rspn.self.apply_for == 'DV') {
            $('#panelObjectInfo .for-dv').removeClass('d-none');
            $('#panelObjectInfo .for-other').addClass('d-none');
        }
        else {
            $('#panelObjectInfo .for-dv').addClass('d-none');
            $('#panelObjectInfo .for-other').removeClass('d-none');
        }

        if (currentStage.state == 1) {
            $('#panelScoreBoard input').prop('disabled', true);
            $('#panelScoreBoard buton').remove();
            $('#panelObjectInfo input').prop('disabled', true);
            $('#panelObjectInfo buton').remove();
        }

    }
    if (rspn.selfDataDto)
        fillSelfData(rspn.selfDataDto);

    if (currentStage.state == 1) {
        ////swal("Notify!", getScoreRspnCode('103'), "warning");
        toastr.warning(getScoreRspnCode('103'), "Notify!", { progressBar: true });
    }
}
function create() {
    swal({
        title: localizationResources.Confirm,
        text: getScoreRspnCode('006') + "\n" + localizationResources.InitNow + '?',
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
        closeOnConfirm: true
    },
        function (confirm) {
            if (confirm) {
                var obj = {
                    'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
                    'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
                    'value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
                    'apply_for': $('#search_apply_for').val(),
                    'object_id': isNaN(parseInt($('#search-object').val())) ? null : parseInt($('#search-object').val()),
                };
                callApi(
                    apiConfig.api.scoreboard.controller,
                    apiConfig.api.scoreboard.action.init.path,
                    apiConfig.api.scoreboard.action.init.method,
                    obj, 'onInitSuccess');
            }
        });
}
function fnSearchSuccess(rspn) {
    if (rspn.code != '001' && rspn.code != '006') {
        ////swal("Error!", getScoreRspnCode(rspn.code), "error");
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
    }
    else {
        if (rspn.code == '006') {
            create();
        }
        else {
            search(rspn)
        }
    }
}

function onSearch() {
    $('#panel_obj_info').addClass('d-none');
    currentStage = null;
    if (validateRequired('#panelSearch ')) {
        var obj = {
            'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
            'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
            'value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
            'apply_for': $('#search_apply_for').val(),
            'object_id': isNaN(parseInt($('#search-object').val())) ? null : parseInt($('#search-object').val()),
        };
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.search.path,
            apiConfig.api.scoreboard.action.search.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
    }
}

function changeStageValue() {
    if ($('#search-stage').val() == 3) {
        $('#search-stage_value').prop('disabled', false);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').addClass('required');
    }
    else {
        $('#search-stage_value').prop('disabled', true);
        $('#search-stage_value').val('');
        $('#search-stage_value').parent().parent().find('label').removeClass('required');
    }
}

////function canDownload(code) {
////    window.open(apiConfig.api.host + apiConfig.api.scoreboard.controller + '/Download?code=' + code.code, 'Download');
////}

////function downloadAttach(id) {
////    callApi(apiConfig.api.scoreboard.controller, '/DownloadAttach', 'GET', { 'id': id }, 'canDownload');
////}

////function removeAttachSuccess(rspn) {
////    if (rspn.code != '001') {
////        ////swal("Error!", getScoreRspnCode(rspn.code), "error");
////        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
////    }
////    else {
////        /////swal("Good job!", localizationResources.SaveSuccess, "success");
////        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
////        $('#divDownloadAttach .feedback').remove();
////        onSearch();
////    }
////}

////function deleteAttach(id) {
////    swal({
////        title: localizationResources.Confirm,
////        text: localizationResources.DoDelete,
////        type: "warning",
////        showCancelButton: true,
////        confirmButtonClass: "btn-danger",
////        confirmButtonText: localizationResources.Accept,
////        cancelButtonText: localizationResources.Cancel,
////        closeOnConfirm: true
////    },
////        function () {
////            callApi(
////                apiConfig.api.scoreboard.controller,
////                apiConfig.api.scoreboard.action.removeAttach.path,
////                apiConfig.api.scoreboard.action.removeAttach.method,
////                { 'id': id }, 'removeAttachSuccess');
////        });
////}

function onUpdateRiskPoint(rspn) {
    if (rspn.code == '001') {
        ////swal("Success!", localizationResources.Successfully, "success");
        toastr.success(localizationResources.Successfully, "Success!", { progressBar: true });
        if (rspn.applyfor == "0") {
            createdLog("Bảng chấm điểm", "Chấm điểm yếu tố rủi ro");
            $('#modalRiskPoint').modal('hide');
        }
        else {
            createdLog("Bảng chấm điểm", "Điều chỉnh tỷ trọng")
            $("#modalRiskProportion").modal('hide');
        };

        onSearch();
    }
    else toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
}

function updateRiskPoint(applyFor) {
    var obj = {};
    var parent = applyFor == 0 ? '#modalRiskPoint' : '#modalRiskProportion';
    if (applyFor == 0) {
        obj = {
            score_board: $('#modalRiskPoint').data('parent'),
            issue: $('#modalRiskPoint').data('issue'),
            point: $('#modalRiskPoint #riskissue_point').val(),
            condition: $('#modalRiskPoint #riskissue_condition').val(),
            risk_value: $('#modalRiskPoint #riskissue_value').val(),
            description: $('#modalRiskPoint #riskissue_description').val(),
            apply_for: '0'
        };
    }
    else {
        obj = {
            score_board: $('#modalRiskProportion').data('parent'),
            issue: $('#modalRiskProportion').data('issue'),
            proportion: $('#modalRiskProportion #riskissue_proportion').val(),
            proportion_modify: $('#modalRiskProportion #riskissue_proportion_edit').val(),
            reason: $('#modalRiskProportion #riskissue_reason').val(),
            is_apply_post: $('#modalRiskProportion #is_apply').prop("checked") === true ? 1 : 0, // 1 là check => không áp dụng (theo SRS)
            apply_for: '1'
        };
    }
    if (validateRequired(parent)) {
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.updateRiskPoint.path,
            apiConfig.api.scoreboard.action.updateRiskPoint.method,
            obj, 'onUpdateRiskPoint');
    }
}

function onReloadIssue() {
    var obj = {
        'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
        'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
        'value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
        'apply_for': $('#search_apply_for').val(),
        'object_id': isNaN(parseInt($('#search-object').val())) ? null : parseInt($('#search-object').val()),
    };
    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.refresh.path,
        apiConfig.api.scoreboard.action.refresh.method,
        obj, 'onSearch');
}
function GetCondition(methodid) {
    var _data = $("#riskissue_point option:selected").data("condition");
    if (methodid == 0)
        _data = $("#riskissue_point option:eq(0)").data("condition")
    $('#modalRiskPoint #riskissue_condition').val(_data);
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
            var name = v.path.substring(v.path.lastIndexOf("/") + 1);
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

function canDownload(code) {
    window.open(apiConfig.api.host + apiConfig.api.scoreboard.controller + '/Download?code=' + code.code, 'Download');
}

function DownloadFile(id, filename) {
    callApi(apiConfig.api.scoreboard.controller, '/DownloadAttach', 'GET', { 'id': id, 'filename': filename }, 'canDownload');
}

function removeAttachSuccess(rspn) {
    if (rspn.code != '001') {
        ////swal("Error!", getScoreRspnCode(rspn.code), "error");
        toastr.error(getScoreRspnCode(rspn.code), "Error!", { progressBar: true });
    }
    else {
        /////swal("Good job!", localizationResources.SaveSuccess, "success");
        toastr.success(localizationResources.SaveSuccess, "Good job!", { progressBar: true });
        $('#divDownloadAttach .feedback').remove();
        onSearch();
    }
}

function deletefile(id) {
    swal({
        title: localizationResources.Confirm,
        text: localizationResources.DoDelete,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: localizationResources.Accept,
        cancelButtonText: localizationResources.Cancel,
        closeOnConfirm: true
    },
        function () {
            callApi(
                apiConfig.api.scoreboard.controller,
                apiConfig.api.scoreboard.action.removeAttach.path,
                apiConfig.api.scoreboard.action.removeAttach.method,
                { 'id': id }, 'removeAttachSuccess');
        });
}
