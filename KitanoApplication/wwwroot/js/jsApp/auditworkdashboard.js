const risk_level = Object.freeze({ "High": 1, "Medium": 2, "Low": 3 })
const colors = ["fac89e", "#e3e891", "#c2fc99", "#a3fcb3", "#92e8d5", "#96c8f2", "#ada8ff", "#ce94f7", "#ed94dd", "#fea8bb"];
$(function () {
    getYear();
    $("#report").hide();
})

//#region Cuộc kiểm toán
function onSearchAudit() {
    var obj = {
        'code': "",
        'page_size': 9999,
        'start_number': 0,
        'year': $("#yearCreate").val(),
    }
    callApi_auditservice(
        apiConfig.api.auditwork.controller,
        apiConfig.api.auditwork.action.searchprepareauditapproved.path,
        apiConfig.api.auditwork.action.searchprepareauditapproved.method,
        { 'jsonData': JSON.stringify(obj) }, 'fnSearchPrepareAuditSuccess', 'msgError');
}
function fnSearchPrepareAuditSuccess(data) {
    var htmlOption = '<option value="-1">----' + localizationResources.Choose + '----</option>';
    $('#auditWork').html('');
    $('#auditWork').append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var _data = data.data;
    var html = '';
    for (let item of _data) {
        var obj = item;
        html += '<option value="' + obj.id + '">' + obj.year + "-" + obj.name + '</option>';
    }
    $('#auditWork').append(html);
}
//#endregion

//#region Năm kiểm toán
function getYear() {
    var obj = {
        key: "",
        code: "",
        status: 1,
        page_size: 9999,
        start_number: 0,
    };
    callApi_auditservice(
        apiConfig.api.auditplan.controller,
        apiConfig.api.auditplan.action.listyearauditwork.path,
        apiConfig.api.auditplan.action.listyearauditwork.method,
        { jsonData: JSON.stringify(obj) },
        "fillYearCreate"
    );
}
function fillYearCreate(data) {
    var htmlOption =
        '<option value="">----' + localizationResources.Choose + "----</option>";
    $("#yearCreate").html("");
    $("#yearCreate").append(htmlOption);
    if (data.data == undefined || data.data == null || data.data.length == 0)
        return;
    var html = generateComboyearOptions(data.data, 0, "issues", "method_id");
    $("#yearCreate").append(html);
}
//#endregion

////#region Tiến trình cuộc kiểm toán
////function CreateScheule(auditschedule) {
////    var arr = [];
////    for (let item of auditschedule) {
////        var obj = {
////            x: item.work,
////            y: [new Date(item.actual_date_schedule).getTime(), new Date(item.expected_date_schedule).getTime()],
////            fillColor: colors[Math.floor(Math.random() * colors.length)]
////        }
////        arr.push(obj)
////    }
////    return arr;
////}
function ViewSchedule(auditschedule, min, max, total) {
    //var _options = {
    //    series: [{
    //        data:
    //            CreateScheule(auditschedule),
    //    }],
    //    chart: {
    //        height: 350,
    //        type: 'rangeBar',
    //        width: '95%',
    //        toolbar: {
    //            show: false,
    //        }
    //    },
    //    //colors: [
    //    //    "#fff7b0", "#ffc69d", "#ff9f9f", "#eab4ff"
    //    //],
    //    plotOptions: {
    //        bar: {
    //            horizontal: true,
    //            barHeight: '90%',
    //            rangeBarGroupRows: true
    //        }
    //    },
    //    xaxis: {
    //        type: 'datetime',
    //        position: 'top',
    //        labels: {
    //            show: true,
    //            style: {
    //                colors: [],
    //                fontSize: '12px',
    //                fontFamily: 'Helvetica, Arial, sans-serif',
    //                fontWeight: 400,
    //                cssClass: 'apexcharts-xaxis-label',
    //            },
    //            format: 'dd/MM/yyyy',
    //            datetimeUTC: true,
    //            datetimeFormatter: {
    //                year: 'yyyy',
    //                month: "MM",
    //                day: 'dd',
    //            },
    //        },
    //    },
    //    yaxis: {
    //        labels: {
    //            show: true,
    //            align: 'left',
    //            minWidth: 0,
    //            maxWidth: 250,
    //            style: {
    //                colors: [],
    //                fontSize: '14px',
    //                fontFamily: 'Helvetica, Arial, sans-serif',
    //                fontWeight: 400,
    //                cssClass: 'apexcharts-yaxis-label line-break',
    //            },
    //            offsetX: 0,
    //            offsetY: 0,
    //        },
    //    },
    //};

    //var _chart = new ApexCharts(document.querySelector("#ChartPlan"), _options);
    //debugger
    //if (auditschedule != null && auditschedule != undefined && auditschedule.length > 0) {
    //    $("#ChartPlan").html('');
    //    $("#ChartPlan").css("min-height", 0);
    //    _chart.render();
    //}
    //else {
    //    $("#ChartPlan").html('');
    //    $("#ChartPlan").css("min-height", 0);
    //}
    $("#ChartPlan").html('');
    if (min != null && max != null && auditschedule != null && auditschedule != undefined && auditschedule.length > 0) {
        var min_value = moment(min, "YYYY-MM-DD").startOf("day");
        var html =
            '<div class="table-responsive custom-table-scroll"><table id="scheduletable" class="table table-striped table-bordered zero-configuration" style="width:100%" ><caption hidden>Danh sách khuyến nghị</caption>' +
            '<thead class="contain-header-custom m-gray">' +
            '<tr>' +
            '<th class="text-center" scope="col" style="width:150px !important;min-width: 150px !important;">Name</th>';
        for (var i = 0; i <= total; i++) {
            html += '<th class="text-center" scope="col" style="width: 5% !important;">' + min_value.format("DD/MM/YYYY") + '</th>';
            min_value = min_value.add('days', 1).startOf("day");
        }
        html += '<th class="text-center" scope="col" style="width: 5% !important;">Lệch so với kế hoạch</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody class="contain-tbody-custom">';
        for (let item of auditschedule) {
            min_value = moment(min, "YYYY-MM-DD").startOf("day");
            html += '<tr><td style="width:150px !important;min-width: 150px !important;" class="ellipsis"><span>' + item.work + '</span></td>';
            for (var i = 0; i <= total; i++) {
                if (min_value.format("DD/MM/YYYY") == item.actual_date_schedule) {
                    var color = colors[Math.floor(Math.random() * colors.length)]
                    html += '<td style="width: 5% !important;background-color:' + color + '" class="ellipsis"></td>';
                } else {
                    html += '<td style="width: 5% !important;" class="ellipsis"></td>';

                }
                min_value = min_value.add('days', 1).startOf("day");
            }
            html += '<td style="width: 5% !important" class="text-center ellipsis">' + item.deviating_plan + '</td></tr>';
        }
        html += '</tbody>' +
            '</table>' +
            '</div>';
        $("#ChartPlan").append(html);

        var t = $("#scheduletable").DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": false,
            "bInfo": false,
            //"scrollX": true,
            "order": [],
            "columnDefs": [
                {
                    "targets": [0],
                    "searchable": false,
                    "orderable": false,
                    "width": "150px"
                }],
            "ordering": false,
            "drawCallback": function (settings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    }
}
//#endregion 

//#region Risk Heat Map cho kế hoạch cuộc kiểm toán
function ApplyRiskHeatMap(riskheatmap) {
    var html = '';
    $("#risklow").html('');
    $("#riskhigh").html('');
    $("#riskmedium").html('');
    for (let item of riskheatmap) {
        switch (item.rating) {
            case "Cao": {
                html = '<div class="col-md-12 mb-3" style="padding-right: 5px; "><button type="button" class="btn" style = "width: 100%; height: 70px; background-color: #fc403b !important; color: black !important; border-color: #6FCF97 !important; white-space: inherit; padding: 0px !important " >' + item.name + '</button></div>';
                $("#riskhigh").append(html);
                break;
            }
            case "Trung bình": {
                html = '<div class="col-md-12 mb-3" style="padding-left: 5px; padding-right: 5px; "><button type="button" class="btn" style = "width: 100%; height: 70px; background-color: #ff813a !important; color: black !important; border-color: #ff813a !important; white-space: inherit; padding: 0px !important " >' + item.name + '</button></div>';
                $("#riskmedium").append(html);
                break;
            }
            case "Thấp": {
                html = '<div class="col-md-12 mb-3" style="padding-left: 5px; "><button type="button" class="btn" style = "width: 100%; height: 70px; background-color: #6FCF97 !important; color: black !important; border-color: #fc403b !important; white-space: inherit; padding: 0px !important " >' + item.name + '</button></div> '
                $("#risklow").append(html);
            }
        }
    }
}
//#endregion

//#region Thông tin cuộc kiểm toán
function DetailAudit(audit) {
    $("#name").html(audit.person)
    $("#numberofauditor").html(audit.numofauditor);
    $("#releasedate").html(audit.releasedate);
    $("#status").html(audit.status);
}
//#endregion

//#region Thống kê số lượng phát hiện kiểm toán
function createRangeData(data, type) {
    var arr = [];
    for (let item of data) {
        var value1 = type == risk_level.High ? 0 : item.risk_medium + item.risk_high;
        value1 = type == risk_level.Medium ? item.risk_high : value1;

        var value2 = type == risk_level.High ? item.risk_high : item.risk_high + item.risk_medium + item.risk_low;
        value2 = type == risk_level.Medium ? item.risk_medium + item.risk_high : value2;
        var obj = {
            x: item.facilityname,
            y: [
                value1,
                value2
            ]
        }
        arr.push(obj);
    }
    return arr;
}
function ApplyUnitDetect(unitdetect) {
    var options = {
        series: [
            {
                name: 'Phát hiện RR cao',
                data: createRangeData(unitdetect, risk_level.High)
            },
            {
                name: 'Phát hiện RR trung bình',
                data: createRangeData(unitdetect, risk_level.Medium)
            },
            {
                name: 'Phát hiện RR thấp',
                data: createRangeData(unitdetect, risk_level.Low)
            },

        ],
        chart: {
            height: 350,
            type: 'rangeBar',
            width: '100%',
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '30%',
                rangeBarGroupRows: true
            }
        },
        colors: [
            "#b7e075", "#ffc69d", "#f96778"
        ],
        fill: {
            type: 'solid'
        },
        xaxis: {
            type: 'number',
            labels: {
                show: true,
                style: {
                    fontSize: '14px',
                },

            },
        },
        yaxis: {
            labels: {
                show: true,
                align: 'left',
                minWidth: 0,
                maxWidth: 300,
                style: {
                    colors: [],
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label line-break',
                },
                offsetX: 0,
                offsetY: 0,
            },
        },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            markers: {
                width: 20,
                height: 20,
                radius: 0,
            },
        },
        tooltip: {
            enabled: false,
            title: {
                formatter: (seriesName) => seriesName,
            },
            //custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            //    return '<div class="arrow_box">' +
            //        '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            //        '</div>'
            //}
        },
        title: {
            text: 'Thống kê số lượng phát hiện theo đối tượng KT',
            align: 'center',
            offsetX: 0,
            offsetY: 10,
            floating: false,
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#263238'
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val[1] - val[0];
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#000000']
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    if (unitdetect != null && unitdetect != undefined && unitdetect.length > 0) {
        $("#chart").html('');
        $("#chart").css('min-height', 0);
        chart.render();
    }
    else {
        $("#chart").html('');
        $("#chart").css('min-height', 0);
    }
}
function SummaryRisk(summary) {
    $("#total_risk").html(summary.total_risk);
    $("#total_risk_high").html(summary.total_risk_high);
    $("#total_risk_medium").html(summary.total_risk_medium);
    $("#total_risk_low").html(summary.total_risk_low);
}
//#endregion

//#region Công việc của các kiểm toán viên
function renderTableHasValue(auditorwork) {
    var data = auditorwork;
    var tbBody = $("#dashboard tbody");
    $("#dashboard").dataTable().fnDestroy();
    tbBody.html("");
    var index = 1;
    for (let item of data) {
        var obj = item;
        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            index +
            "</td>" +
            '<td >' +
            viewValue(obj.username) +
            "</td>" +
            '<td class="ellipsis text-center"><span>' +
            viewValue(obj.totalwork) +
            "</span></td>" +
            '<td class="ellipsis text-center"><span>' +
            viewValue(obj.totalpaper) +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
        index++;
    }
}
function fnSearchAuditWorkSuccess(auditorwork) {
    if (
        auditorwork !== undefined &&
        auditorwork !== null &&
        auditorwork.length > 0
    ) {
        renderTableHasValue(auditorwork);
    } else if (auditorwork == "") {
        var tbBody = $("#dashboard tbody");
        $("#dashboard").dataTable().fnDestroy();
        tbBody.html("");
    }
    $("#dashboard").DataTable({
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
//#endregion


function fnGetReportSuccess(rspn) {
    if (rspn.code == 1) {
        DetailAudit(rspn.audit);
        ApplyRiskHeatMap(rspn.riskheatmap);
        ApplyUnitDetect(rspn.unitdetect);
        SummaryRisk(rspn.risksummary);
        fnSearchAuditWorkSuccess(rspn.auditorwork);
        ViewSchedule(rspn.auditschedule, rspn.min, rspn.max, rspn.total);
    }
}
function getReport() {
    var obj = {
        "auditid": parseInt($("#auditWork").val()),
        "year": parseInt($("#YearCreate").val()),
    };

    callApi_reportservice(
        apiConfig.api.auditworkdashboard.controller,
        apiConfig.api.auditworkdashboard.action.getdata.path,
        apiConfig.api.auditworkdashboard.action.getdata.method,
        { 'jsonData': JSON.stringify(obj) },
        "fnGetReportSuccess",
        "msgError"
    );
}

function onSearch() {
    if (validateRequired("#formSearch")) {
        setTimeout(function () {
            getReport();
        }, 200);
        $("#report").show();
    }

}