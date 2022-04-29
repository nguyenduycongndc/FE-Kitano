const status = Object.freeze({ "Open": 1, "Close": 2 })


$(function () {
    getReport();
});

//#region Tình hình thực hiện kiến nghị của kiểm toán trong năm

function MappingDataReport3(data) {
    var low = 0;
    var medium = 0;
    var high = 0;
    for (let d of data) {
        switch (d.ratingrisk) {
            case 1: {
                high = d.total;
                break;
            }
            case 2: {
                medium = d.total;
                break;
            }
            case 3: {
                low = d.total;
                break;
            }
        }
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
    chart_.render();
}
//#endregion

//#region Tình hình thực hiện kiến nghị của kiểm toán trong năm
function gettype(type) {
    switch (type) {
        case 1:
            return "Trong hạn";
        case 2:
            return "< 30 ngày";
        case 3:
            return "30 - 60 ngày";
        case 4:
            return "60 - 90 ngày";
        case 5:
            return "> 90 ngày";
        case 6:
            return "Gia hạn";

    }
}
function createRangeData(datarspn, type) {
    var arr = [];
    for (let item of datarspn) {
        var value1 = type == status.Open ? 0 : item.open

        var value2 = type == status.Open ? item.open : item.close + item.open;
        var obj = {
            x: gettype(item.type),
            y: [
                value1,
                value2
            ]
        }
        arr.push(obj);
    }
    return arr
}

function MappingDataReport2(data) {
    var optionsRangechart1 = {
        series: [
            {
                name: 'Kiến nghị đã đóng',
                data: createRangeData(data, status.Close)
            },
            {
                name: 'Kiến nghị chưa đóng',
                data: createRangeData(data, status.Open)
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
                barHeight: '50%',
                rangeBarGroupRows: true
            }
        },
        colors: [
            "#7cc8ff", "#ffc69d"
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
        },
        title: {
            text: 'Tình hình thực hiện kiến nghị của kiếm toán',
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
    var chart = new ApexCharts(document.querySelector("#RangeChart1"), optionsRangechart1);
    chart.render();
}
//#endregion

//#region Tình hình thực hiện các cuộc kiểm toán
function MappingDataReport1(data) {
    $("#total_audit_completed").html(data.total_audit_completed);
    $("#total_audit_pending").html(data.total_audit_pending);
    $("#total_audit_plan").html(data.total_audit_plan);
    $("#total_audit_expected").html(data.total_audit_expect);
}
//#endregion
function fnGetReportSuccess(rspn) {
    if (rspn.code == 1) {
        if (rspn.report1 != null && rspn.report1 != undefined) {
            MappingDataReport1(rspn.report1);
        }
        if (rspn.report2 != null && rspn.report2 != undefined && rspn.report2.length > 0) {
            MappingDataReport2(rspn.report2);
        }
        if (rspn.report3 != null && rspn.report3 != undefined && rspn.report3.length > 0) {
            MappingDataReport3(rspn.report3);
        }
    }
}

function getReport() {

    callApi_reportservice(
        apiConfig.api.internalauditdashboard.controller,
        apiConfig.api.internalauditdashboard.action.getdata.path,
        apiConfig.api.internalauditdashboard.action.getdata.method,
        null,
        "fnGetReportSuccess",
        "msgError"
    );
}