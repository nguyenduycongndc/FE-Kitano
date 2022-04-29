$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr) {
            var rd = Math.floor((Math.random() * 9999999) + 1);
            xhr.setRequestHeader('Authorization', getSessionToken());
            xhr.setRequestHeader('Accept-Language', 'vi-VN');
            xhr.setRequestHeader('Loading-Id', rd);
            showLoading();
        },
        complete: function (xhr, status, error) {
            if (xhr.status == 401)
                swal("Unauthorized!", "Bạn cần phải đăng nhập vào hệ thống!", "warning");
                //toastr.error("Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "Lỗi!", { progressBar: true });
            else if (xhr.status == 404)
                //swal("Not found!", "Không tìm thấy đối tượng để xử lý!", "warning");
                toastr.error("Không tìm thấy đối tượng để xử lý!", "Lỗi!", { progressBar: true });
            else if (xhr.status == 500)
                //swal("Internal Server Error!", "Có lỗi xảy ra trong quá trình xử lý!", "warning");
                toastr.error("Có lỗi xảy ra trong quá trình xử lý!", "Lỗi!", { progressBar: true });
            else if (xhr.status == 400)
                //swal("Lỗi dữ liệu!", "Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "warning");
                toastr.error("Dữ liệu đầu vào hoặc thông tin tài khoản không hợp lệ!", "Lỗi!", { progressBar: true });
            //else if (xhr.status != 200)
            //    swal(error + "!", "Có lỗi trong quá trình xử lý!", "error");
        }
    });

    $(document).ajaxStop(function () {
        hideLoading();
    });
})
function getSessionToken() {
    if (sessionStorage['SessionToken'] != undefined)
        return 'Bearer ' + sessionStorage['SessionToken'];
    return null;
}

function callApi(controller, action, method, data, callbackSuccess, callbackError) {
    $.ajax({
        type: method,
        url: apiConfig.api.host + controller + action,
        contentType: "application/json; charset=utf-8",
        data: (method == 'GET' ? data : JSON.stringify(data)),
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}

function callUpload(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        "url": apiConfig.api.host + controller + action,
        "contentType": false,
        "processData": false,
        "dataType": 'json',
        "type": "POST",
        "cache": false,
        "data": formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}
function callApi_userservice(controller, action, method, data, callbackSuccess, callbackError) {
    $.ajax({
        type: method,
        url: apiConfig.api.host_user_service + controller + action,
        contentType: "application/json; charset=utf-8",
        data: (method == 'GET' ? data : JSON.stringify(data)),
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}

function callApi_userservice_update(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        url: apiConfig.api.host_user_service + controller + action,
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}

function callApi_userservice_update_edit(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        url: apiConfig.api.host_user_service + controller + action,
        contentType: false,
        processData: false,
        type: "PUT",
        data: formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}

function callApi_auditservice(controller, action, method, data, callbackSuccess, callbackError) {
    $.ajax({
        type: method,
        url: apiConfig.api.host_audit_service + controller + action,
        contentType: "application/json; charset=utf-8",
        data: (method == 'GET' ? data : JSON.stringify(data)),
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}
function callApi_auditservice_update(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        url: apiConfig.api.host_audit_service + controller + action,
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}
function callApi_reportservice(controller, action, method, data, callbackSuccess, callbackError) {
    $.ajax({
        type: method,
        url: apiConfig.api.host_report_service + controller + action,
        contentType: "application/json; charset=utf-8",
        data: (method == 'GET' ? data : JSON.stringify(data)),
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}
function callApi_reportservice_update(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        url: apiConfig.api.host_report_service + controller + action,
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}
function callUpload_audit(controller, action, formData, callbackSuccess, callbackError) {
    $.ajax({
        "url": apiConfig.api.host_audit_service + controller + action,
        "contentType": false,
        "processData": false,
        "dataType": 'json',
        "type": "POST",
        "cache": false,
        "data": formData,
        success: function (result) {
            if (window[callbackSuccess] != undefined)
                window[callbackSuccess](result);
        },
        error: function (request, status, error) {
            if (window[callbackError] != undefined)
                window[callbackError](request, status, error);
        }
    });
}