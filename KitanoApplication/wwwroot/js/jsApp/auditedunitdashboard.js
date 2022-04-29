
const risk_level = Object.freeze({ "High": 1, "Medium": 2, "Low": 3 })
const colors = ["#F59A23", "#FC403B", "#CAF982"];

$(function () {
    getFacilities();
    $("#report").hide();
});

//#region select đơn vị
function fillFacilityCombo(rspn) {
    var data = rspn.data;

    var htmlOption = '<option value="">----' + localizationResources.Choose + '----</option>';
    $('#facility').html('');
    $('#facility').append(htmlOption);
    if (data == undefined || data == null || data.length == 0)
        return;
    var html = generateComboOptions(data, 0, 'childs');
    $('#facility').append(html);

}

function getFacilities() {
    var obj = {
        'code': '',
        'key': '',
        'status': 1,
        'page_size': 9999,
        'start_number': 0
    };
    callApi(
        apiConfig.api.auditfacility.controller,
        apiConfig.api.auditfacility.action.search.path,
        apiConfig.api.auditfacility.action.search.method,
        { 'jsonData': JSON.stringify(obj) }, 'fillFacilityCombo');
}
//#endregion

//#region danh sách kiến nghị kiểm toán
function renderTableHasValue(rspn) {
    var data = rspn.data;
    var tbBody = $("#auditrequesttable tbody");
    $("#auditrequesttable").dataTable().fnDestroy();
    tbBody.html("");
    for (let item of data) {
        var obj = item;
        var textprocessstatus =
            obj.processstatus == 3 ? "Hoàn thành" : "Chưa hoàn thành";
        textprocessstatus =
            obj.processstatus == 2 ? "Hoàn thành một phần" : textprocessstatus;
        var texttimestatus = obj.timestatus == 2 ? "Quá hạn" : "Trong hạn";

        var html =
            "<tr>" +
            '<td class="text-center" style="width: 5% !important;">' +
            "</td>" +
            '<td style="width: 13% !important;" class="ellipsis"><span><a href="javascript:void(0)" onclick="OpenFrom(' + obj.id + ',\'auditrequest\')">' +
            viewValue(obj.auditrequestcode) +
            "</a></span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            textprocessstatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            texttimestatus +
            "</span></td>" +
            '<td style="width: 10% !important;" class="ellipsis"><span>' +
            viewValue(obj.username) +
            "</span></td>" +
            '<td style="width: 12% !important;" class="ellipsis text-center"><span>' +
            viewValue(obj.completeat) +
            "</span></td>" +
            "</tr>";
        tbBody.append(html);
    }
}

function fnSearchAuditRequestSuccess(rspn) {
    if (
        rspn !== undefined &&
        rspn !== null &&
        rspn.code === "1" &&
        rspn.total > 0
    ) {
        renderTableHasValue(rspn);
        reCalculatPagesCustom(rspn.total);
        viewBtnActionPage();
    } else if (rspn.data == "") {
        var tbBody = $("#auditrequesttable tbody");
        $("#auditrequesttable").dataTable().fnDestroy();
        tbBody.html("");
        reCalculatPagesCustomNull();
        hideLoading();
    }
    var page_size =
        (parseInt($("#txtCurrentPage").val()) - 1) *
        parseInt($("#cbPageSize").val());

    var t = $("#auditrequesttable").DataTable({
        bPaginate: false,
        bLengthChange: false,
        bFilter: false,
        bInfo: false,
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                orderable: false,
                data: null,
                order: [],
                render: function (data_table, type, row, meta) {
                    return meta.row + page_size + 1;
                },
            },
            {
                targets: [0, 1, 2, 3, 4, 5],
                searchable: false,
                orderable: false,
            },
        ],
        order: [],
        drawCallback: function (settings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
    });
    t.on("order.dt search.dt", function () {
        t.column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell, index) {
                cell.innerHTML = index + page_size + 1;
            });
    }).draw();
}

function getAuditRequest() {
    var obj = {
        facility: parseInt($("#facility").val()),
        activity: parseInt($("#activity").val()),
        fromdate: $("#fromdate").val(),
        todate: $("#todate").val(),
        page_size: parseInt($("#cbPageSize").val()),
        start_number:
            (parseInt($("#txtCurrentPage").val()) - 1) *
            parseInt($("#cbPageSize").val()),
    };
    callApi_reportservice(
        apiConfig.api.auditedunitdashboard.controller,
        apiConfig.api.auditedunitdashboard.action.getauditrequest.path,
        apiConfig.api.auditedunitdashboard.action.getauditrequest.method,
        { 'jsonData': JSON.stringify(obj) },
        "fnSearchAuditRequestSuccess",
        "msgError"
    );
}
//#endregion

//#region lịch sử đánh giá rủi ro
function renderColumnChart(datarspn) {
    var listvalue = [];
    var listyear = [];
    var listcolor = [];
    var listlable = [];
    var index = 0;
    for (let item of datarspn) {
        listvalue.push(15)
        listcolor.push(colors[index]);
        listlable.push(item.risk)
        listyear.push(item.year)
    }

    var optionsColumnchart = {
        series: [{
            data: listvalue
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                //endingShape: 'rounded',
                distributed: true,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            },
        },
        labels: listlable,
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                return opt.w.config.labels[opt.dataPointIndex];
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: listyear,
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        tooltip: {
            enabled: false
        },
        colors: listcolor,
        legend: {
            show: false,
            position: 'bottom',
            fontSize: '14px',
            markers: {
                width: 20,
                height: 20,
                radius: 0,
            },
        },
    };

    var chart_ = new ApexCharts(document.querySelector("#ColumnChart"), optionsColumnchart);
    if (datarspn != null && datarspn != undefined && datarspn.length > 0) {
        $("#ColumnChart").html('');
        chart_.render();
    }
    else {
        $("#ColumnChart").html('');
    }
}
//#endregion 
//#region Số lượng phát hiện kiểm toán
function renderDonutChart(datarspn) {
    var low = 0;
    var high = 0;
    var medium = 0;
    if (datarspn != null && datarspn != undefined && (datarspn.risk_low > 0 || datarspn.risk_medium > 0 || datarspn.risk_high > 0)) {
        low = datarspn.risk_low;
        medium = datarspn.risk_medium;
        high = datarspn.risk_high;
    }

    var optionsDonutChart = {
        series: [low, medium, high],
        labels: ['Thấp', 'Trung Bình', 'Cao'],
        chart: {
            height: 350,
            type: 'donut',
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
        stroke: {
            width: 10
        },
        title: {
            text: 'Số lượng phát hiện KT',
            align: 'center',
            offsetX: 0,
            offsetY: 10,
            floating: false,
            style: {
                fontSize: '18px',
                fontWeight: 100,
                color: '#263238'
            },
        },
        dataLabels: {
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex]
            },
        },
        colors: [
            "#b7e075", "#ffc69d", "#f96778"
        ],
        tooltip: {
            enabled: false,
        },
    };
    var chart_ = new ApexCharts(document.querySelector("#DonutChart"), optionsDonutChart);
    if (datarspn != null && datarspn != undefined && (datarspn.risk_low > 0 || datarspn.risk_medium > 0 || datarspn.risk_high > 0)) {
        $("#DonutChart").html('');
        chart_.render();
    } else {
        $("#DonutChart").html('');
    }
}
//#region Số lượng phát hiện kiểm toán
function fnGetReportSuccess(rspn) {
    if (rspn.code == 1) {
        renderDonutChart(rspn.report2);
        renderColumnChart(rspn.report1);

    }
}
function getReport() {
    var obj = {
        facility: parseInt($("#facility").val()),
        activity: parseInt($("#activity").val()),
        fromdate: $("#fromdate").val(),
        todate: $("#todate").val(),
    };

    callApi_reportservice(
        apiConfig.api.auditedunitdashboard.controller,
        apiConfig.api.auditedunitdashboard.action.getdata.path,
        apiConfig.api.auditedunitdashboard.action.getdata.method,
        { 'jsonData': JSON.stringify(obj) },
        "fnGetReportSuccess",
        "msgError"
    );
}


function onSearch() {
    if (validateRequired("#formsearch")) {
        setTimeout(function () {
            getAuditRequest()
            getReport();
        }, 200);
        $("#report").show();
    }

}

function OpenFrom(id, type) {
    var url = '';
    switch (type) {
        case "workingpaper": {
            url = '/WorkingPaper';
            break;
        }
        case "auditdetect": {
            url = '/AuditDetect';
            break;
        }
        case "auditrequest": {
            url = '/AuditRequestMonitor';
            break;
        }
    }
    localStorage.setItem("id", id);
    localStorage.setItem("type", 2);
    window.open(
        url,
        '_blank'
    );
}