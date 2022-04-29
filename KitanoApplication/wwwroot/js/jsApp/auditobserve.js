////function callApi_multipleselect_auditwork(selector, placeholder, host, controller, action) {
////    $("#" + selector).select2({
////        placeholder: placeholder,
////        minimumInputLength: 0,
////        multiple: false,
////        closeOnSelect: false,
////        ajax: {
////            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
////            url: function () {
////                return getUrl(host, controller, action);
////            },
////            dataType: 'json',
////            data: function (params) {
////                var query = {
////                    q: params.term,
////                    type: 'public'
////                }
////                return query;
////            },
////            processResults: function (data) {
////                return {
////                    results: $.map(data.data, function (item) {
////                        return {
////                            id: item.id,
////                            text: item.name,
////                            year: item.year,
////                        }
////                    })
////                };
////            },
////            cache: true
////        }
////    });
////}
////function getUrl(host, controller, action) {
////    var url = "";
////    var _year = $("#YearAuditObserve").val();
////    url = host + controller + action + "?" + "year" + "=" + parseInt(_year);
////    return url;
////}
//function callApi_multipleselect_discoverer(selector, placeholder, host, controller, action) {
//    $("#" + selector).select2({
//        placeholder: placeholder,
//        minimumInputLength: 0,
//        multiple: false,
//        closeOnSelect: false,
//        ajax: {
//            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
//            url: host + controller + action,
//            dataType: 'json',
//            data: function (params) {
//                var query = {
//                    q: params.term,
//                    type: 'public'
//                }
//                return query;
//            },
//            processResults: function (data) {
//                return {
//                    results: $.map(data.data, function (item) {
//                        return {
//                            text: item.full_name,
//                            id: item.id
//                        }
//                    })
//                };
//            },
//            cache: true
//        }
//    });
//}
//function LoadYearAuditWork() {
//    setTimeout(function () {
//        callApi_oneselect("YearAuditObserve", "Chọn năm...", apiConfig.api.host_audit_service,
//            apiConfig.api.auditplan.controller,
//            apiConfig.api.auditplan.action.listyearauditwork.path);
//    }, 50);
//    setTimeout(function () {
//        callApi_multipleselect_discoverer("Discoverer", "Chọn người phát hiện...",
//            apiConfig.api.host_user_service,
//            apiConfig.api.systemuser.controller,
//            apiConfig.api.systemuser.action.selectaudiWork.path);
//    }, 50);
//}
//function setValueYearAuditObserve(elment) {
//    $('#AuditWorkObserve').val(null).trigger('change');
//    var _year = $(elment).val();
//    callApi_oneselect("AuditWorkObserve", "Chọn cuộc kiểm toán...", apiConfig.api.host_audit_service,
//        apiConfig.api.auditplan.controller,
//        apiConfig.api.auditplan.action.listauditwork.path + "?" + "year" + "=" + parseInt(_year));
//}
function onSearch() {
    var obj = {
        'year': ($('#YearAuditObserve').val() != null ? parseInt($('#YearAuditObserve').val()) : $('#YearAuditObserve').val()),
        'auditwork_id': ($('#AuditWorkObserve').val() != null ? parseInt($('#AuditWorkObserve').val()) : $('#AuditWorkObserve').val()),
        'code': $('#ObserveCode').val().trim(),
        'name': $('#ObserveName').val().trim(),
        'working_paper_code': $('#WorkingPaperCode').val().trim(),
        'discoverer': parseInt($('#Discoverer').val()),
        'page_size': parseInt($("#cbPageSize").val()),
        'start_number': (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
    }
    callApi_auditservice(
        apiConfig.api.auditobserve.controller,
        apiConfig.api.auditobserve.action.search.path,
        apiConfig.api.auditobserve.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchAuditObserveSuccess', 'msgError');
}

function fnSearchAuditObserveSuccess(rspn) {
    showLoading();
    if (rspn !== undefined && rspn !== null && rspn.code === '1' && rspn.total > 0) {
        var data = rspn.data;
        var tbBody = $('#AuditObserveTable tbody');
        $("#AuditObserveTable").dataTable().fnDestroy();
        tbBody.html('');
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var ratingRisk = (obj.rating_risk == 1 ? "Cao" : (obj.rating_risk == 2 ? "Trung bình" : (obj.status == 3 ? "Thấp" : "")));
            var auditReport = (obj.audit_report == 1 ? "Có" : "Không");

            var html = '<tr>' +
                '<td class="text-center"></td>' +
                '<td>' + obj.code + '</td>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.discoverer_name + '</td>' +
                '<td>' + obj.working_paper_code + '</td>' +
                '<td>' + obj.auditwork_name + '</td>' +
                '<td class="text-center">' + obj.year + '</td>' +
                '</tr>';
            tbBody.append(html);
        }
        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditObserveTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": 0,
                    "className": "text-center",
                    "orderable": false,
                    "data": null,
                    "order": [],
                    render: function (data, type, row, meta) {

                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [0, 3, 4],
                    "searchable": false,
                    "orderable": false
                }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
        hideLoading();
    } else if (rspn.data == "") {
        var tbBody = $('#AuditObserveTable tbody');
        $("#AuditObserveTable").dataTable().fnDestroy();
        tbBody.html('');

        var page_size = (parseInt($("#txtCurrentPage").val()) - 1) * parseInt($("#cbPageSize").val())
        var t = $("#AuditObserveTable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            "columnDefs": [
                {
                    "targets": 0,
                    "className": "text-center",
                    "orderable": false,
                    "data": null,
                    "order": [],
                    render: function (data, type, row, meta) {

                        return meta.row + page_size + 1;
                    }
                },
                {
                    "targets": [0, 3, 4],
                    "searchable": false,
                    "orderable": false
                }],
            "order": [],
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + page_size + 1;
            });
        }).draw();
        reCalculatPagesCustomNull();
        hideLoading();
    }
}
function loadYearDefault() {
    setTimeout(function () {
        callApi_auditservice(
            apiConfig.api.auditobserve.controller,
            apiConfig.api.auditobserve.action.listyearauditworkdefault.path,
            apiConfig.api.auditobserve.action.listyearauditworkdefault.method,
            null, 'ListYearSuccess', 'msgError');
    }, 100);
}
window.onload = function () {
    $('#YearAuditObserve').val(null).trigger('change');
    $('#AuditWorkObserve').val(null).trigger('change');
    $('#Discoverer').val(null).trigger('change');
    loadYearDefault();
    //LoadYearAuditWork();
    //setTimeout(function () {
    //    onSearch();
    //}, 100);
}
function ListYearSuccess(rs) {
    var data = rs.data;
    if (data != null) {
        var newOption = new Option(data.id, data.year, true, false);
        $('#YearAuditObserve').append(newOption).trigger('change');
        onSearch();
    } else {
        onSearch();
    }
}
function setValueYear(elment) {
    $('#AuditWorkObserve').val(null).trigger('change');
    $('#AuditWorkObserve').html('');
}
