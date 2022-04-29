
function onSearch() {
    callApi_auditservice(
        apiConfig.api.configdocument.controller,
        apiConfig.api.configdocument.action.search.path,
        apiConfig.api.configdocument.action.search.method,
        null, 'fnSearchSuccess', 'msgError');
}
function fnSearchSuccess(res) {
    $('#lstDocument').html("");
    if (res !== undefined && res !== null && res.code === '1') {
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var html =
                '<div class="col-md-12" style="padding-top:15px;">' +
                '</div >' +
                '<div class="card" style="margin-bottom: 0px">' +
                '<div class="custom-card-config" id="heading' + obj.item_id + '">' +
                '<h5 class="mb-0" style="line-height: 2.2;">' +
                '<a onclick="DetailConfigDocument(' + obj.item_id + ')" style="margin: 10px;padding: 1px 4px;border: 1px solid #d5dce5 !important;vertical-align: middle;" class="btn-coll collapsed" data-toggle="collapse" data-target="#collapseDetail_' + obj.item_id + '" aria-expanded="false" aria-controls="collapseDetail_' + obj.item_id + '" id="' + obj.item_id + '"><i class="fas fa-plus"></i></a>' +
                '<span>' + obj.item_name + '</span>' +
                '</h5 >' +
                '</div >' +
                '<div id="collapseDetail_' + obj.item_id + '" class="collapse" aria-labelledby="headingDetail_' + obj.item_id + '" data-parent="#lstDocument">' +
                '<div class="card-body">' +
                '<div class="table-responsive custom-table-scroll" style="width: 80% !important; min-width: 80%;">' +
                '<table id="TableDetail_' + obj.item_id + '" class="table table-striped table-bordered zero-configuration">' +
                '<thead class="contain-header-custom m-gray">' +
                '<tr>' +
                '<th style="text-align: center;">' + "Mục nội dung" + '</th>' +
                '<th style="text-align: center; width: 18% !important">' + "Ẩn/hiện" + '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="BodyDetail_' + obj.item_id + '" class="contain-tbody-custom">' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('#lstDocument').append(html);
        }
    } else {
        $('#lstDocument').html("");
    }
}
$(document).on('click', '.btn-coll', function (ele) {
    var target = ele.currentTarget.dataset["target"];
    if (target != undefined && target != null && target != '') {
        var clsList = ele.currentTarget.classList;
        if (clsList.contains('collapsed')) {
            if (ele.currentTarget.childElementCount > 0)
                ele.currentTarget.childNodes[0].classList.value = 'fas fa-minus';
        }
        else {
            if (ele.currentTarget.childElementCount > 0)
                ele.currentTarget.childNodes[0].classList.value = 'fas fa-plus';
        }
    }
});
function DetailConfigDocument(id) {
    callApi_auditservice(
        apiConfig.api.configdocument.controller,
        apiConfig.api.configdocument.action.configdocumentcollapse.path + "/" + id,
        apiConfig.api.configdocument.action.configdocumentcollapse.method,
        null, 'fnDetailCollapse', 'msgError');
}
function fnDetailCollapse(res) {
    if (res !== undefined && res !== null && res.code === '1') {
        var data = res.data;
        var tbBodyDetail = $("#BodyDetail_" + data[0].item_id + "");
        //$("#TableDetail_" + data[0].item_id + "").dataTable().fnDestroy();
        tbBodyDetail.html('');
        if (data !== undefined && data !== null) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var html = '<tr>' +
                    '<td>' + obj.content + '</td>' +
                    '<td class="text-center">' +
                    //mở lại comment khi có quyền
                    //'<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' onclick="UnitTypeActive(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"> <a hidden>' + obj.status + '<a></label></div>' +
                    '<div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="customSwitch' + obj.id + '" ' + (obj.status === true ? 'checked' : '') + ' onclick="ActiveConfigDocument(' + obj.id + ',this)"> <label class="custom-control-label" for="customSwitch' + obj.id + '"> <a hidden>' + obj.status + '<a></label> </div>' +
                    '</td>' +
                    '</td>' +
                    '</tr>';
                tbBodyDetail.append(html);
            }
        }
    }
}
function ActiveConfigDocument(id, input) {
    var status = 1;
    //if ($(input).hasClass("active")) {
    if ($(input).prop("checked") == false) {
        status = 0;
    }
    fnActive(id, status);
}
function fnActive(id, status) {
    var obj = {
        'id': id,
        'status': status,
    }
    callApi_auditservice(
        apiConfig.api.configdocument.controller,
        apiConfig.api.configdocument.action.active.path,
        apiConfig.api.configdocument.action.active.method,
        obj, 'fnActiveSuccess', 'msgError');
}
function fnActiveSuccess(rspn) {
    if (rspn.code === '1' && rspn.data.status == true) {
        toastr.success(localizationResources.Active, null, { progressBar: true });
    } else if (rspn.code === '1' && rspn.data.status == false) {
        toastr.success(localizationResources.InActive, null, { progressBar: true });
    }
    else {
        setTimeout(function () { toastr.error(getStatusCode(rspn.code), 'Error', { progressBar: true }) }, 100);
    }
}
window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 100);

}