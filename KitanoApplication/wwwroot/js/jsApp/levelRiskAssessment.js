
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', getSessionToken());
        xhr.setRequestHeader('Accept-Language', 'vi-VN');
        showLoading();
    },
    complete: function (xhr, status, error) {
        hideLoading();

        if (xhr.status == 401)
            //swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
            toastr.error("Bạn cần phải đăng nhập vào hệ thống!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 404)
            //swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
            toastr.error("Không tìm thấy đối tượng để xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 500)
            //swal("Internal Server Error!", "Có lỗi xảy ra trong quá trình xử lý!", "warning");
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        else if (xhr.status == 400)
            //swal("Lỗi dữ liệu!", "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "warning");
            toastr.error("Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "Lỗi!", { progressBar: true });
        else if (xhr.status != 200)
            toastr.error("Có lỗi trong quá trình xử lý!", "Lỗi!", { progressBar: true });
        //swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
    }
});
function callApi_multipleselect(selector, placeholder) {
    $("#" + selector).select2({
        placeholder: placeholder,
        minimumInputLength: 0,
        multiple: true,
        closeOnSelect: true,
        ajax: {
            headers: { "Authorization": "Bearer " + sessionStorage['SessionToken'] },
            url: apiConfig.api.host_user_service + apiConfig.api.systemusergroup.controller + apiConfig.api.systemusergroup.action.select.path,
            dataType: 'json',
            data: function (params) {
                var query = {
                    q: params.term,
                    type: 'public'
                }
                return query;
            },
            processResults: function (data) {
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.full_name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        }
    });
}

function onSearch() {
    var tbBody = $('#levelRiskAssessmentTable tbody');
    $("#levelRiskAssessmentTable").dataTable().fnDestroy();
    tbBody.html('');

    var html = [
        '<tr>' +
        '<td class="text-center">' + "1" + '</td>' +
        '<td>' + "Quy trình xác định giá" + '</td>' +
        '<td>' + "RR.XDG.0001" + '</td>' +
        '<td>' + "Rủi ro 1" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td>' + "" + '</td>' +
        '<td class="text-center col-action">' +
        '<a class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +
        '<a class="btn icon-default btn-action-custom" onclick="openView(1)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>' +
        '</td>' +
        '</tr>',
        '<tr>' +
        '<td class="text-center">' + "2" + '</td>' +
        '<td>' + "Quy trình xác định giá" + '</td>' +
        '<td>' + "RR.XDG.0001" + '</td>' +
        '<td>' + "Rủi ro 1" + '</td>' +
        '<td>' + "2" + '</td>' +
        '<td>' + "2" + '</td>' +
        '<td>' + "4" + '</td>' +
        '<td>' + "Thấp" + '</td>' +
        '<td>' + "Không" + '</td>' +
        '<td>' + "3" + '</td>' +
        '<td class="text-center col-action">' +
        '<a class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +
        '<a class="btn icon-default btn-action-custom" onclick="openView(1)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>' +
        '</td>' +
        '</tr>',
        '<tr>' +
        '<td class="text-center">' + "3" + '</td>' +
        '<td>' + "Quy trình xác định giá" + '</td>' +
        '<td>' + "RR.XDG.0003" + '</td>' +
        '<td>' + "Rủi ro 3" + '</td>' +
        '<td>' + "3" + '</td>' +
        '<td>' + "1" + '</td>' +
        '<td>' + "3" + '</td>' +
        '<td>' + "Thấp" + '</td>' +
        '<td>' + "Không" + '</td>' +
        '<td>' + "3" + '</td>' +
        '<td class="text-center col-action">' +
        '<a class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +
        '<a class="btn icon-default btn-action-custom" onclick="openView(1)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>' +
        '</td>' +
        '</tr>',
        '<tr>' +
        '<td class="text-center">' + "4" + '</td>' +
        '<td>' + "Quy trình xác định giá" + '</td>' +
        '<td>' + "RR.XDG.0003" + '</td>' +
        '<td>' + "Rủi ro 3" + '</td>' +
        '<td>' + "2" + '</td>' +
        '<td>' + "3" + '</td>' +
        '<td>' + "6" + '</td>' +
        '<td>' + "Trung bình" + '</td>' +
        '<td>' + "Có" + '</td>' +
        '<td>' + "5" + '</td>' +
        '<td class="text-center col-action">' +
        '<a class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +
        '<a class="btn icon-default btn-action-custom" onclick="openView(1)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>' +
        '</td>' +
        '</tr>',
        '<tr>' +
        '<td class="text-center">' + "5" + '</td>' +
        '<td>' + "Quy trình xác định giá" + '</td>' +
        '<td>' + "RR.XDG.0004" + '</td>' +
        '<td>' + "Rủi ro 4" + '</td>' +
        '<td>' + "4" + '</td>' +
        '<td>' + "5" + '</td>' +
        '<td>' + "20" + '</td>' +
        '<td>' + "Cao" + '</td>' +
        '<td>' + "Có" + '</td>' +
        '<td>' + "15" + '</td>' +
        '<td class="text-center col-action">' +
        '<a class="btn icon-default btn-action-custom"><i data-toggle="tooltip" title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="font-size: 16px;"></i></a>' +
        '<a class="btn icon-default btn-action-custom" onclick="openView(1)"><i data-toggle="tooltip" title="Cập nhật" class="fas fa-pencil-alt" aria-hidden="true" style="font-size: 16px;" ></i></a>' +
        '</td>' +
        '</tr>'
    ];
    tbBody.append(html);

    $("#levelRiskAssessmentTable").dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "columnDefs": [
            {
                "targets": [0, 10],
                "searchable": false,
                "orderable": false
            }],
        "order": [],
    });
    reCalculatPagesCustom(5);
    viewBtnActionPage();
}
function openView(type) {
    var _index = $("#view");
    var _modify = $("#modify");
    if (type === 0) {
        _index.show();
        _modify.hide();
        $("input").prop("readonly", false);
        $("select").prop("disabled", false);
        $("textarea").prop("readonly", false);
    }
    else if (type === 1) { //modify
        _index.hide();
        _modify.show();
    }
}


