
function onSearch() {
    callApi_userservice(
        apiConfig.api.approvalconfig.controller,
        apiConfig.api.approvalconfig.action.search.path,
        apiConfig.api.approvalconfig.action.search.method,
        null, 'fnSearchSuccess', 'msgError');
}

function fnSearchSuccess(rspn) {
    var div = $("#loadMenu");
    div.empty();
    var html = "";
    if (rspn !== undefined && rspn !== null && rspn.code === '1') {
        var data = rspn.data;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            html += '<div class="col-md-12 approvalconfig_item" style="padding-top:15px">';
            html += '<input type="hidden" class="menu_id" value="' + obj.item_id + '"  /><input type="hidden" class="menu_code" value="' + obj.item_code + '"  /><input type="hidden" class="menu_name" value="' + obj.item_name + '"  />' +
                '<div class="custom-card-config" id="heading' + obj.item_id + '">' +
                    '<h5 class="mb-0">' +
            '<a class="btn btn-link ' + (i === 0 ? "" : " collapsed") + '" data-toggle="collapse" data-target="#collapse' + obj.item_id + '" aria-expanded="true" aria-controls="collapse' + obj.item_id + '" style="margin: 10px; padding: 1px 4px; border: 1px solid #d5dce5 !important; vertical-align: middle; "><i class="' + (i === 0 ? "fas fa-minus" : "fas fa-plus") + '" aria-hidden="true" style=" text-align: center; vertical-align: middle; "></i></a>' +
                        '<span>' + obj.item_name + '</span>' +
                    '</h5 >' +
                '</div >';
            ///// collapse
            html += '<div id="collapse' + obj.item_id + '" class="collapse ' + (i === 0 ? " show" : "") +'" aria-labelledby="heading' + obj.item_id + '">';
                html += '<div class="card-body">';
            html += '<div class="col-md-12" style="display:flex"> <div class="form-check" style="padding-right: 4em;"> <input class="form-check-input" type="radio" name="AuditLevel' + obj.item_code + '" id="AuditLevel1' + obj.item_code + '" ' + (obj.approval_level == 1 ? "checked" : (obj.approval_level == 2 ? "" : "checked")) + ' value="1"  onclick="ChangeViewTable(this)"> <label for="AuditLevel1' + obj.item_code + '"> Duyệt cấp 1 </label> </div> <div class="form-check"> <input class="form-check-input" type="radio" name="AuditLevel' + obj.item_code + '" id="AuditLevel2' + obj.item_code + '" ' + (obj.approval_level == 2 ? "checked" : "") +' value="2"  onclick="ChangeViewTable(this)"> <label for="AuditLevel2' + obj.item_code + '"> Duyệt cấp 2 </label> </div> </div>';

            html += '<div class="col-md-8"> <div class="table-responsive custom-table-scroll "> <table id="ApprovalStatus' + obj.item_code + '" class="table table-striped table-bordered zero-configuration approval_satus"> <thead class="contain-header-custom m-gray"> <tr> <th class="text-center" style="width:100px !important">Mã trạng thái</th> <th class="text-center" style="width:40% !important">Ý nghĩa</th> <th class="text-center" style="width:40% !important">Tên trạng thái</th> </tr> </thead> <tbody class="contain-tbody-custom">';
                    if (obj.list_status !== undefined && obj.list_status !== null && obj.list_status.length > 0) {
                        for (var j = 0; j < obj.list_status.length; j++) {
                            var _obj = obj.list_status[j];
                            html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="' + _obj.status_code + '"  />' + _obj.status_code + '</td> <td class="line-break"><input type="hidden" class="status_description" value="' + _obj.status_description + '"  />' + _obj.status_description + '</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="' + _obj.status_name + '"></td> </tr>';
                        }
                    }
                    else {
                        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.0" />1.0</td> <td class="line-break"><input type="hidden" class="status_description" value="Trạng thái sau khi tạo mới" />Trạng thái sau khi tạo mới</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Bản nháp"></td> </tr>';
                        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.1" />1.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Gửi duyệt cấp 1" />Gửi duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Chờ duyệt"></td> </tr>';
                        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.1" />3.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Duyệt cấp 1" />Duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Đã duyệt"></td> </tr>';
                        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.2" />3.2</td> <td class="line-break"><input type="hidden" class="status_description" value="Từ chối duyệt cấp 1" />Từ chối duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Từ chối duyệt"></td> </tr>';
                        if (obj.item_code != "M_AP") {
                            html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="4.1" />4.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Hủy duyệt" />Hủy duyệt</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Hủy duyệt"></td> </tr>';
                        }
                       
                    }
                   
                    html += '</tbody></table></div></div>';
            html += '<div class="col-md-12"> <div class="form-group row"> <label class="col-form-label" style=" display: flex; flex-direction: row; justify-content: center; align-items: center; "> <input type="checkbox" id="IsOutSide" name="IsOutSide" ' + (obj.is_outside === true ? "checked" : "") +' style="margin-left: 17px;">&nbsp; <span>Duyệt ngoài hệ thống</span> </label> </div> </div>';
                html += '</div>';
                
            html += '</div>';
           //////
        
            html += '</div>';
        }
       
    }
    div.append(html);
}
function ChangeViewTable(elemt) {
    debugger
    var menu_code = $(elemt).closest(".approvalconfig_item").find(".menu_code").val();
    var value = $(elemt).val();
    var table = $(elemt).closest(".collapse").find("table");
    var tbody = table.find("tbody");

    var html = "";
    if (value === "1") {
        tbody.empty();
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.0" />1.0</td> <td class="line-break"><input type="hidden" class="status_description" value="Trạng thái sau khi tạo mới" />Trạng thái sau khi tạo mới</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Bản nháp"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.1" />1.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Gửi duyệt cấp 1" />Gửi duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Chờ duyệt"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.1" />3.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Duyệt cấp 1" />Duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Đã duyệt"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.2" />3.2</td> <td class="line-break"><input type="hidden" class="status_description" value="Từ chối duyệt cấp 1" />Từ chối duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Từ chối duyệt"></td> </tr>';
        if (menu_code != "M_AP") {
            html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="4.1" />4.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Hủy duyệt" />Hủy duyệt</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Hủy duyệt"></td> </tr>';
        }
       
    }
    else if (value === "2") {
        tbody.empty();
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.0" />1.0</td> <td class="line-break"><input type="hidden" class="status_description" value="Trạng thái sau khi tạo mới" />Trạng thái sau khi tạo mới</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Bản nháp"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="1.1" />1.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Gửi duyệt cấp 1" />Gửi duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Chờ trường đoàn duyệt"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="2.1" />2.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Duyệt cấp 1" />Duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name"value="Chờ trưởng KTNB duyệt" ></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="2.2" />2.2</td> <td class="line-break"><input type="hidden" class="status_description" value="Từ chối duyệt cấp 1" />Từ chối duyệt cấp 1</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Trưởng đoàn từ chối"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.1" />3.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Duyệt cấp 2" />Duyệt cấp 2</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Trưởng KTNB đã duyệt"></td> </tr>';
        html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="3.2" />3.2</td> <td class="line-break"><input type="hidden" class="status_description" value="Từ chối duyệt cấp 2" />Từ chối duyệt cấp 2</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Trưởng KTNB từ chối"></td> </tr>';
        if (menu_code != "M_AP") {
            html += '<tr> <td class="text-center"><input type="hidden" class="status_code" value="4.1" />4.1</td> <td class="line-break"><input type="hidden" class="status_description" value="Hủy duyệt" />Hủy duyệt</td> <td class="line-break"><input type="text" class="form-control" id="Name" name="Name" value="Hủy duyệt"></td> </tr>';
        }
    }
    tbody.append(html);
}
$(document).on('click', '.btn-link', function (ele) {
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
var validateform;
$.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
    validateform = $("#formModify").validate({
        submitHandler: function () {
            var list_config = [];
            $("#formModify").find(".approvalconfig_item").each(function (i, v) {
                var list_status = [];
                var table = $(v).find("table tbody tr");
                table.each(function (i, v) {
                    var status_item = {
                        'status_code': $(v).find(".status_code").val(),
                        'status_description': $(v).find(".status_description").val(),
                        'status_name': $(v).find("#Name").val(),
                    }
                    list_status.push(status_item);
                });
                var config_item = {
                    'item_id': $(v).find(".menu_id").val(),
                    'item_code': $(v).find(".menu_code").val(),
                    'item_name': $(v).find(".menu_name").val(),
                    'approval_level': $(v).find('input[type="radio"]:checked').val(),
                    'is_outside': $(v).find('#IsOutSide').prop("checked") === true ? 1 : 0,
                    'list_status': list_status,
                }
                list_config.push(config_item);
            });
            var obj = {
                'list_config': list_config,
            }
            callApi_userservice(
                apiConfig.api.approvalconfig.controller,
                apiConfig.api.approvalconfig.action.update.path,
                apiConfig.api.approvalconfig.action.update.method,
                obj, 'updateSuccess');
        }
    });
});
function updateSuccess(data) {
    if (data.code === '1') {
        createdLogKitano("Cấu hình phê duyệt", "Cập nhật cấu hình");
        toastr.success("Cập nhật dữ liệu thành công!", "Thông báo!", { progressBar: true });
        setTimeout(function () {
            window.location.href = "/ApprovalConfig"
        }, 500);
    }
    else {
        toastr.error("Cập nhật thất bại!", "Lỗi!", { progressBar: true });
    }
}
window.onload = function () {
    setTimeout(function () {
        onSearch();
    }, 100);

}
