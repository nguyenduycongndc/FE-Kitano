$(function () {
    $.getScript('/plugins/jquery-validation/jquery.validate.min.js', function () {
        $.extend($.validator.messages, {
            required: localizationResources.Validate_Required,
            remote: "Please fix this field.",
            email: localizationResources.MaillCheck,
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: $.validator.format(localizationResources.Validate_MaxLength),
            minlength: $.validator.format(localizationResources.Validate_MinLength),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format(localizationResources.Validate_Max),
            min: $.validator.format(localizationResources.Validate_Min)
        });

        $.validator.addMethod("checklower", function (value) {
            return /[a-z]/.test(value);
        }, localizationResources.PwCheckLower);
        $.validator.addMethod("checkupper", function (value) {
            return /[A-Z]/.test(value);
        }, localizationResources.PwCheckUpper);
        $.validator.addMethod("checkdigit", function (value) {
            return /[0-9]/.test(value);
        }, localizationResources.PwCheckDigit);
        $.validator.addMethod("pwcheckspechars", function (value) {
            return /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)
        }, localizationResources.PwCheckSpechars);
        $.validator.addMethod("checkmail", function (value) {
            return /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(value)
        }, localizationResources.MaillCheck);
        $.validator.addMethod("hasWhiteSpace", function (value) {
            return !/\s/g.test(value)
        }, localizationResources.HasWhiteSpace);
        $.validator.addMethod("hasdoubleWhiteSpace", function (value) {
            return !/\s\s+/g.test(value)
        }, localizationResources.HasDoubleWhiteSpace);
        $.validator.addMethod("nospechars", function (value) {
            return !/[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)
        }, localizationResources.NoSpechars);
    })
    
})
