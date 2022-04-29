$(function () {
    setTimeout(function () {
        loadRiskLevel();
        loadCategory();
        loadAuditReason();
    }, 200);
    changeStageValue();
});

function fillApplyForCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#search_apply_for').html('');
    $('#search_apply_for').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0, 'noChilds', '', 'code');
    $('#search_apply_for').append(html);
}

function fillRiskLevel(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#result_riskleveledit').html('');
    $('#search-risk_level').html('');
    $('#result_riskleveledit').append(htmlOption);
    $('#search-risk_level').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboOptions(data.data, 0, '');
    $('#result_riskleveledit').append(html);
    $('#search-risk_level').append(html);
}

function loadRiskLevel() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.riskLevel.path,
        apiConfig.api.common.action.riskLevel.method,
        {}, 'fillRiskLevel');
}

function loadCategory() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.doiTuongApDung }, 'fillApplyForCombo');
}

function fillAuditReasonCombo(data) {
    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#modalResultUpdate #result_auditresult').html('');
    $('#modalResultUpdate #result_auditresult').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;

    var html = generateComboOptions(data.data, 0);
    $('#modalResultUpdate #result_auditresult').append(html);
}

function loadAuditReason() {
    callApi(
        apiConfig.api.common.controller,
        apiConfig.api.common.action.getCategories.path,
        apiConfig.api.common.action.getCategories.method,
        { 'gr': categories.lyDoKiemToan }, 'fillAuditReasonCombo');
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

function fnSearchSuccess_old(rspn) {
    var tbBody = $('#tblRiskScore tbody');
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.data.length > 0) {
        var data = rspn.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr>' +
                '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                '<td>' + viewValue(obj.object_code) + '</td>' +
                '<td>' + viewValue(obj.assessment_object) + '</td>' +
                '<td>' + viewValue(obj.apply_for) + '</td>' +
                '<td>' + viewValue(obj.assessment_point) + '</td>' +
                '<td>' + viewValue(obj.risk_level) + '</td>' +
                '<td>' + viewValue(obj.risk_level_name) + '</td>' +
                '<td>' + viewValue(getIssueLevel(obj.last_risklevel)) + '</td>' +
                '<td>' + obj.last_audit + '</td>' +
                '<td>' + viewValue(obj.audit_cycle) + '</td>' +
                '<td>' + viewValue((obj.audit ? localizationResources.YesAnswer : localizationResources.NoAnswer)) + '</td>' +
                '<td>' + viewValue(obj.audit_reason) + '</td>' +
                '<td>' + getProcessState(obj.stage_status) + '</td>' +
                '<td class="col-action">' +
                '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenHistory(this)" data-whatever="' + obj.id + '" data-action="view"><i class="fa fa-eye"></i></a>';
            //if (obj.stage_status != 1)
            html += '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenUpdateResult(this)" data-whatever="' + obj.id + '" data-action="edit"><i class="fas fa-pencil-alt"></i></a>';
            html += '</td>' +
                '</tr>';
            tbBody.append(html);
        }
    }
}
function fnSearchSuccess(rspn) {
    var tbBody = $('#tblRiskScore tbody');
    tbBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == 1 && rspn.data.length > 0) {
        var data = rspn.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html = '<tr>' +
                '<td style="text-align:center">' + rowNo(1, 9999, i) + '</td>' +
                '<td>' + viewValue(obj.object_code) + '</td>' +
                '<td>' + viewValue(obj.assessment_object) + '</td>' +
                '<td>' + viewValue(obj.apply_for) + '</td>' +
                '<td>' + viewValue(obj.assessment_point) + '</td>' +
                '<td>' + viewValue(obj.risk_level) + '</td>' +
                '<td>' + viewValue((obj.risk_level_name)) + '</td>' +
                '<td>' + viewValue(obj.last_risklevel) + '</td>' +
                '<td>' + obj.last_audit + '</td>' +
                '<td>' + viewValue(obj.audit_cycle) + '</td>' +
                '<td>' + viewValue((obj.audit ? localizationResources.YesAnswer : localizationResources.NoAnswer)) + '</td>' +
                '<td>' + viewValue(obj.audit_reason) + '</td>' +
                '<td>' + getProcessState(obj.assessment_status) + '</td>' +
                '<td class="col-action">';
            (IsCheckPemission('M_ART', 'PER_DETAIL') === true ?
                html += '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenHistory(this)" data-whatever="' + obj.id + '" data-action="view"><i data-toggle="tooltip" title="Lịch sử đánh giá , kiểm toán" class="fa fa-eye"></i></a>' :
                html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Lịch sử đánh giá , kiểm toán" class="fa fa-eye"></i></a>');
            if (obj.stage_status != 1)
                (IsCheckPemission('M_ART', 'PER_EDIT') === true ?
                    html += '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenUpdateResult(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Điều chỉnh kết quả đánh giá" class="fas fa-pencil-alt"></i></a>' :
                    (IsCheckPemission('M_ART', 'PER_DETAIL') === true ?
                        html += '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenDetailResult(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Chi tiết kết quả đánh giá" class="fas fa-newspaper"></i></a>' :
                        html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết kết quả đánh giá" class="fas fa-newspaper"></i></a>'));
            else
                (IsCheckPemission('M_ART', 'PER_DETAIL') === true ?
                    html += '<a class="btn icon-default btn-action-custom"   class="btn icon-default btn-action-custom" onclick="onOpenDetailResult(this)" data-whatever="' + obj.id + '" data-action="edit"><i data-toggle="tooltip" title="Chi tiết kết quả đánh giá" class="fas fa-newspaper"></i></a>' :
                    html += '<a class="btn icon-disabled btn-action-custom"  ><i data-toggle="tooltip" title="Chi tiết kết quả đánh giá" class="fas fa-newspaper"></i></a>');
            html += '</td>' +
                '</tr>';
            tbBody.append(html);

        }
        reCalculatPagesCustom(rspn.total);
    }
}

function onSearch() {
    if (validateRequired('#panelSearch ')) {

        var obj = {
            'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
            'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
            'value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
            'apply_for': $('#search_apply_for').val(),
            'key': $('#search-object').val(),
            'risk_level': $("#search-risk_level option:selected").text(),
            'state': $('#search-state').val(),
            'audit': $('#search-proposal').val(),
            'page_size': parseInt($("#cbPageSize").val()),
            'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        };
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.resultSearch.path,
            apiConfig.api.scoreboard.action.resultSearch.method,
            { 'jsonData': JSON.stringify(obj) }, 'fnSearchSuccess');
    }
}

function onViewAuditHistory(rspn) {
    var tbAssessmentBody = $('#modalAuditHistory #tblAssessmentHistory tbody');
    tbAssessmentBody.html('');
    var tbAuditBody = $('#modalAuditHistory #tblAuditHistory tbody');
    tbAuditBody.html('');
    if (rspn != undefined && rspn != null && rspn.code == '001' && rspn.assessments.length > 0) {
        if (rspn.assessments && rspn.assessments.length > 0) {
            var data = rspn.assessments;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr class="text-center">' +
                    '<td>' + viewValue(obj.year) + '</td>' +
                    '<td>' + getAssessmentStage(obj.stage) + '</td>' +
                    '<td>' + viewValue(obj.stage == 3 ? obj.stage_value : '') + '</td>' +
                    '<td>' + viewValue(obj.assessment_risklevel) + '</td>' +
                    '</td>' +
                    '</tr>';
                tbAssessmentBody.append(html);

            }
        }
        if (rspn.audit && rspn.audit.length > 0) {
            var data = rspn.audit;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr class="text-center">' +
                    '<td>' + viewValue(obj.year) + '</td>' +
                    '<td>' + viewValue(obj.audit_code) + '</td>' +
                    '<td>' + viewValue(obj.time) + '</td>' +
                    '<td>' + (obj.audit_rating_level_report == 1 ? "Kiểm soát tốt" : obj.audit_rating_level_report == 2 ? "Chấp nhận được" : obj.audit_rating_level_report == 3 ? "Cần cải thiện" : obj.audit_rating_level_report == 4 ? "Không đạt yêu cầu" : "") + '</td>' +
                    '</td>' +
                    '</tr>';
                tbAuditBody.append(html);

            }
        }
    }
    $('#modalAuditHistory').modal('show');
}

function onOpenHistory(ele) {
    var button = $(ele);
    var recipient = button.data('whatever');

    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.auditHistory.path,
        apiConfig.api.scoreboard.action.auditHistory.method,
        { 'boardId': recipient }, 'onViewAuditHistory');
}

function onViewModalResult(rspn) {
    $('#modalResultUpdate input,#modalResultUpdate select,#modalResultUpdate textarea').prop('disabled', false);
    $('#modalResultUpdate #result_applyfor,#modalResultUpdate #result_object,#modalResultUpdate #result_risklevel,#modalResultUpdate #result_auditresult')
        .prop('disabled', true);

    if (rspn.code == 1 && rspn.assessment) {
        $('#modalResultUpdate #result_id').val(rspn.assessment.id);
        $('#modalResultUpdate #result_applyfor').val(rspn.assessment.apply_for);
        $('#modalResultUpdate #result_object').val(rspn.assessment.assessment_object);
        $('#modalResultUpdate #result_risklevel').val(rspn.assessment.risk_level);
        $('#modalResultUpdate #result_riskleveledit').val(rspn.assessment.risk_level_change);
        $('#modalResultUpdate #result_auditedit').val(rspn.assessment.description);
        $('#modalResultUpdate #result_auditproposal').prop('checked', rspn.assessment.audit);
        $('#modalResultUpdate #result_auditresult').val(rspn.assessment.audit_result_id);
        $('#modalResultUpdate #result_reasonpassaudit').val(rspn.assessment.pass_audit_reason);
        $('#modalResultUpdate #btnSubmit').show();
        $('#modalResultUpdate').modal('show');
    }
    else /*swal(error + "!", getStatusCode(rspn.code), "error")*/ toastr.error(getStatusCode(rspn.code), error + "!", { progressBar: true });
}

function onViewModalDetailResult(rspn) {
    $('#modalResultUpdate input,#modalResultUpdate select,#modalResultUpdate textarea').prop('disabled', true);
    if (rspn.code == 1 && rspn.assessment) {
        $('#modalResultUpdate #result_id').val(rspn.assessment.id);
        $('#modalResultUpdate #result_applyfor').val(rspn.assessment.apply_for);
        $('#modalResultUpdate #result_object').val(rspn.assessment.assessment_object);
        $('#modalResultUpdate #result_risklevel').val(rspn.assessment.risk_level);
        $('#modalResultUpdate #result_riskleveledit').val(rspn.assessment.risk_level_change);
        $('#modalResultUpdate #result_auditedit').val(rspn.assessment.description);
        $('#modalResultUpdate #result_auditproposal').prop('checked', rspn.assessment.audit);
        $('#modalResultUpdate #result_auditresult').val(rspn.assessment.audit_result_id);
        $('#modalResultUpdate #result_reasonpassaudit').val(rspn.assessment.pass_audit_reason);
        $('#modalResultUpdate #btnSubmit').hide();
        $('#modalResultUpdate').modal('show');
    }
    else /*swal(error + "!", getStatusCode(rspn.code), "error")*/ toastr.error(getStatusCode(rspn.code), error + "!", { progressBar: true });
}

function onOpenUpdateResult(ele) {
    clearMsgInvalid();
    var button = $(ele);
    var recipient = button.data('whatever');

    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.auditResult.path,
        apiConfig.api.scoreboard.action.auditResult.method,
        { 'boardId': recipient }, 'onViewModalResult');

}

function onOpenDetailResult(ele) {
    clearMsgInvalid();
    var button = $(ele);
    var recipient = button.data('whatever');

    callApi(
        apiConfig.api.scoreboard.controller,
        apiConfig.api.scoreboard.action.auditResult.path,
        apiConfig.api.scoreboard.action.auditResult.method,
        { 'boardId': recipient }, 'onViewModalDetailResult');

}

function changeAuditRequest() {
    if ($('#modalResultUpdate #result_auditproposal').prop('checked')) {
        $('#modalResultUpdate #result_auditresult').parent().parent().find('label').addClass('required');
        $('#modalResultUpdate #result_auditresult').prop('disabled', false);
    }
    else {
        $('#modalResultUpdate #result_auditresult').parent().parent().find('label').removeClass('required');
        $('#modalResultUpdate #result_auditresult').prop('disabled', true);
    }
}

function onUpdateBoardResult(rspn) {
    if (rspn.code == '001') {
        //swal("Success!", localizationResources.Successfully, "success");
        toastr.success(localizationResources.Successfully, "Success!", { progressBar: true });
        $('#modalResultUpdate').modal('hide');
        onSearch();
    }
    else /*swal("Error!", getStatusCode(rspn.code), "error")*/ toastr.error(getStatusCode(rspn.code), "Error!", { progressBar: true });
}
function getScoreRspnCode(code) {
    return code == '004' ? localizationResources.AssessmentStageInvalid
        : code == '005' ? localizationResources.FacilityInvalid
            : code == '006' ? localizationResources.ScoreBoardNotInit
                : code == '007' ? localizationResources.NotHaveIssue
                    : code == '002' ? localizationResources.ScoreBoardExists
                        : code == '009' ? localizationResources.BoardDone
                            : code == '201' ? localizationResources.Error201
                                : code == '104' ? localizationResources.Error104
                                    : code == '105' ? localizationResources.Error105
                                        : code == '107' ? localizationResources.Error107
                                            : localizationResources.ScoreBoardInited;
}
function updateBoardResult() {
    if (validateRequired('#modalResultUpdate ')) {
        var obj = {
            id: $('#modalResultUpdate #result_id').val(),
            risk_level_change: $('#modalResultUpdate #result_riskleveledit').val(),
            description: $('#modalResultUpdate #result_auditedit').val(),
            audit: $('#modalResultUpdate #result_auditproposal').prop('checked'),
            audit_result_id: $('#modalResultUpdate #result_auditresult').val(),
            pass_audit_reason: $('#modalResultUpdate #result_reasonpassaudit').val(),
        };
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.updateResult.path,
            apiConfig.api.scoreboard.action.updateResult.method,
            obj, 'onUpdateBoardResult');
    }
}

function onCreateReportDone(rspn) {
    window.open(apiConfig.api.host + apiConfig.api.scoreboard.controller + '/Download?code=' + rspn.code, 'Download');
}

function onExportExcel() {
    
    if (validateRequired('#panelSearch ')) {
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.export.path,
            apiConfig.api.scoreboard.action.export.method,
            {
                'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
                'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
                'stageValue': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val()),
                'risk_level': $("#search-risk_level option:selected").text()
            }, 'onCreateReportDone');
    }
}

function onEndStage() {
    if (validateRequired('#panelSearch ')) {
        var obj = {
            'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
            'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
            'stageValue': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val())
        };

        var titleStage = "Năm " + obj.year +
            (obj.stage == 2 ? ' Kỳ bán niên' : (obj.stage == 3 ? (' Quý ' + obj.stageValue) : ''));

        swal({
            title: localizationResources.Confirm,
            text: 'Bạn có chắc chắn muốn kết thúc kỳ đánh giá này? ' + titleStage + ' Kỳ đánh giá đã kết thúc thì không được chỉnh sửa dữ liệu chấm điểm rủi ro trong kỳ đó nữa !',
            type: 'warning',
            showCancelButton: true,
        }, function (isConfirm) {
            if (isConfirm) {
                fnOnEndStage();
            }
        });
    }
}

function onEndStageSuccess(rspn) {
    if (rspn.code == '001')
        //swal("Success!", localizationResources.Successfully, "success");
        toastr.success(localizationResources.Successfully, "Success!", { progressBar: true });
    else setTimeout(function () { /*swal('Error', getStatusCode(rspn.code), "error")*/ toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 200);
}

function fnOnEndStage() {
    if (validateRequired('#panelSearch ')) {
        var obj = {
            'year': isNaN(parseInt($('#search-year').val())) ? null : parseInt($('#search-year').val()),
            'stage': isNaN(parseInt($('#search-stage').val())) ? null : parseInt($('#search-stage').val()),
            'value': isNaN(parseInt($('#search-stage_value').val())) ? null : parseInt($('#search-stage_value').val())
        };
        callApi(
            apiConfig.api.scoreboard.controller,
            apiConfig.api.scoreboard.action.endStage.path,
            apiConfig.api.scoreboard.action.endStage.method,
            obj, 'onEndStageSuccess');
    }
}