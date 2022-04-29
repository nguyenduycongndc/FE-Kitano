/// <reference path="customer.js" />
/// <reference path="host.js" />
var apiConfig = {
    "api": {
        "host": hostApi.host_risk_assessment_service,
        "host_user_service": hostApi.host_user_service,
        "host_audit_service": hostApi.host_audit_service,
        "host_report_service": hostApi.host_report_service,
        "authen": {
            "controller": "/GenToken",
            'action': {
                'token': {
                    'method': 'POST',
                    'path': ''
                }
            }
        },
        "common": {
            "controller": "/Common",
            'action': {
                'getCategories': {
                    'method': 'GET',
                    'path': ''
                },
                'riskLevel': {
                    'method': 'GET',
                    'path': '/RiskLevel'
                },
                'users': {
                    'method': 'GET',
                    'path': '/Users'
                },
                'unitTypes': {
                    'method': 'GET',
                    'path': '/UnitTypes'
                },
                'getCategorieswithsort': {
                    'method': 'GET',
                    'path': '/GetCategoriesWithSort'
                },
            }
        },
        "bussinessactivity": {
            "controller": "/BussinessActivity",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    //function support to add/update item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    //function support to upload file
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                }
            }
        },
        "auditcycle": {
            "controller": "/AuditCycle",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                },
            }
        },
        "ratingscale": {
            "controller": "/RatingScale",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                },
            }
        },
        "auditfacility": {
            "controller": "/AuditFacility",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "parents": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Parents"
                },
                "update": {
                    //function support to add/update item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                }
            }
        },
        "auditprocess": {
            "controller": "/AuditProcess",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                },
            }
        },
        "catauditrequest": {
            "controller": "/CatAuditRequest",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                }
            }
        },
        "catdetecttype": {
            "controller": "/CatDetectType",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                }
            }
        },
        "catrisklevel": {
            "controller": "/CatRiskLevel",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                }
            }
        },
        "riskissue": {
            "controller": "/RiskIssues",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "parents": {
                    "method": "GET",
                    "path": "/Parents"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                }
            }
        },
        "formula": {
            "controller": "/Formula",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                }
            }
        },
        "assessmentstage": {
            "controller": "/AssessmentStage",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                }
            }
        },
        "scoreboard": {
            "controller": "/ScoreBoard",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "init": {
                    "method": "POST",
                    "path": "/InitBoard"
                },
                "update": {
                    "method": "POST",
                    "path": "/"
                },
                "removeAttach": {
                    "method": "POST",
                    "path": "/RemoveAttach"
                },
                "getRiskIssue": {
                    "method": "GET",
                    "path": "/RiskIssue"
                },
                "updateRiskPoint": {
                    "method": "POST",
                    "path": "/RiskIssue"
                },
                "resultSearch": {
                    "method": "GET",
                    "path": "/ResultSearch"
                },
                "auditHistory": {
                    "method": "GET",
                    "path": "/AuditHistory"
                },
                "auditResult": {
                    "method": "GET",
                    "path": "/AuditResult"
                },
                "updateResult": {
                    "method": "POST",
                    "path": "/AuditResult"
                },
                "export": {
                    "method": "GET",
                    "path": "/ExportReport"
                },
                "endStage": {
                    "method": "POST",
                    "path": "/EndStage"
                },
                "resultSearchScope": {
                    "method": "GET",
                    "path": "/ResultSearchScope"
                },
                "getDataScopeResult": {
                    "method": "POST",
                    "path": "/GetDataScopeResult"
                },
                "refresh": {
                    "method": "POST",
                    "path": "/RefreshIssue"
                },
            }
        },
        "riskassessmentscale": {
            "controller": "/RiskAssessmentScale",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "parents": {
                    "method": "GET",
                    "path": "/Parents"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "downloadtemp": {
                    "method": "GET",
                    "path": "/DownloadTemp"
                }
            }
        },
        "systemuser": {
            "controller": "/Users",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    //function support to update item
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    //function support to active/deactive item
                    "method": "POST",
                    "path": "/Active"
                },
                "changepass": {
                    //function support to changepass item
                    "method": "POST",
                    "path": "/ChangePass"
                },
                "changepassuser": {
                    //function support to changepass item
                    "method": "POST",
                    "path": "/ChangePassUser"
                },
                "changeworkplace": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/ChangeWorkplace"
                },
                "select": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select"
                },
                "selectaudiWork": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select_AudiWork"
                },
                "deleteall": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/DeleteAll"
                },
                "searchhistory": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/SearchHistory"
                },
                "detailuseraudiwork": {
                    "method": "GET",
                    "path": "/DetailUserAudiWork"
                },
                "selectauditor": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select_Auditor"
                },
            }
        },
        "systemusergroup": {
            "controller": "/usersgroup",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    //function support to update item
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    //function support to active/deactive item
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select"
                },
                "deleteall": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/DeleteAll"
                }
            }
        },
        "systemunittype": {
            "controller": "/UnitType",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    //function support to update item
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    //function support to active/deactive item
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select"
                }
            }
        },
        "roles": {
            "controller": "/Roles",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    //function support to update item
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    //function support to active/deactive item
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/Select"
                },
                "deleteall": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/DeleteAll"
                },
                "getpermission": {
                    //function support to changeWorkplace item
                    "method": "GET",
                    "path": "/TreePermission"
                },
                "updatepermission": {
                    //function support to changeWorkplace item
                    "method": "POST",
                    "path": "/UpdatePermission"
                },
                "rendermenu": {
                    //function support to changeWorkplace item
                    "method": "GET",
                    "path": "/Menu"
                }
            }
        },
        "systemparameter": {
            "controller": "/SystemParameter",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "reset": {
                    //function support to delete item
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    //function support to update item
                    "method": "PUT",
                    "path": ""
                },
                "list": {
                    //function support to active/deactive item
                    "method": "GET",
                    "path": ""
                },
            }
        },
        "systemlog": {
            "controller": "/SystemLog",
            "action": {
                "add": {
                    //function support to add item
                    "method": "POST",
                    "path": ""
                },
                "addlogaudit": {
                    //function support to add item
                    "method": "POST",
                    "path": "/CreateAuditPlan"
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "list": {
                    //function support to active/deactive item
                    "method": "GET",
                    "path": ""
                },
                "searchAuditPlan": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/SearchAuditPlan"
                },
            }
        },
        "auditplan": {
            "controller": "/AuditPlan",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "copy": {
                    "method": "POST",
                    "path": ""
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "requestapproval": {
                    "method": "POST",
                    "path": "/RequestApproval"
                },
                "rejectapproval": {
                    "method": "POST",
                    "path": "/RejectApproval"
                },
                "searchprepareaudit": {
                    "method": "GET",
                    "path": "/SearchPrepareAudit"
                },
                "auditworkdetail": {
                    "method": "GET",
                    "path": "/AuditWorkDetail"
                },
                "prepareauditupdate": {
                    "method": "PUT",
                    "path": "/PrepareAuditUpdate"
                },
                "listyearauditwork": {
                    "method": "GET",
                    "path": "/ListYearAuditWork"
                },
                "listauditwork": {
                    "method": "GET",
                    "path": "/ListAuditWork"
                },
                "listauditprocess": {
                    "method": "GET",
                    "path": "/ListAuditProcess"
                },
                "listauditfacility": {
                    "method": "GET",
                    "path": "/ListAuditFacility"
                },
                "selectaudiassignment": {
                    "method": "GET",
                    "path": "/SelectAudiAssignment"
                },
                "deleteauditworkscope": {
                    "method": "DELETE",
                    "path": "/DeleteAuditWorkScope"
                },
                "deleteauditworkscopefacility": {
                    "method": "DELETE",
                    "path": "/DeleteAuditWorkScopeFacility"
                },
                "deleteschedule": {
                    "method": "DELETE",
                    "path": "/DeleteSchedule"
                },
                "auditworkdetailcollapse": {
                    "method": "GET",
                    "path": "/AuditWorkDetailCollapse"
                },
                "createauditstrategyrisk": {
                    "method": "POST",
                    "path": "/CreateAuditStrategyRisk"
                },
                "deleteauditstrategyrisk": {
                    "method": "DELETE",
                    "path": "/DeleteAuditStrategyRisk"
                },
                "detailauditstrategyrisk": {
                    "method": "GET",
                    "path": "/DetailAuditStrategyRisk"
                },
                "editauditstrategyrisk": {
                    "method": "PUT",
                    "path": "/EditAuditStrategyRisk"
                },
                "aditupdatestatus": {
                    "method": "POST",
                    "path": "/AditUpdateStatus"
                },
                "uploadfile": {
                    "method": "POST",
                    "path": "/UploadFile"
                },
                "deleteauditwork": {
                    "method": "DELETE",
                    "path": "/DeleteAuditWork"
                },
                "createauditworkscope": {
                    "method": "POST",
                    "path": "/CreateAuditWorkScope"
                },
                "createauditworkscopefacility": {
                    "method": "POST",
                    "path": "/CreateAuditWorkScopeFacility"
                },
                "selectyearapproved": {
                    "method": "GET",
                    "path": "/SelectYearApproved"
                },
                "selectnameauditwork": {
                    "method": "GET",
                    "path": "/SelectNameAuditWork"
                },
                "createauditwork": {
                    "method": "POST",
                    "path": "/CreateAuditWork"
                },
                "selectusertype": {
                    "method": "GET",
                    "path": "/SelectUserType"
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
                "deleteauditworkscopefacilityfile": {
                    "method": "GET",
                    "path": "/DeleteAuditWorkScopeFacilityFile"
                },
                "liststatusprepareauditplan": {
                    "method": "GET",
                    "path": "/ListStatusPrepareAuditPlan"
                },
                "listupdatestatusprepareauditplan": {
                    "method": "GET",
                    "path": "/ListUpdateStatusPrepareAuditPlan"
                },
                "exportword": {
                    "method": "GET",
                    "path": "/ExportWord" + customer_app.customer_code
                },
                "exportfileword": {
                    "method": "GET",
                    "path": "/ExportFileWord"
                },
                "budgetdetail": {
                    "method": "GET",
                    "path": "/BudgetDetail"
                },
                "budgetupdate": {
                    "method": "PUT",
                    "path": "/BudgetUpdate"
                },
                "exportwordplan": {
                    "method": "POST",
                    "path": "/ExportFileWordPlan" + customer_app.customer_code
                },
                "updateplan": {
                    "method": "POST",
                    "path": "/UpdateAuditPlan"
                },
                "otherdetail": {
                    "method": "GET",
                    "path": "/OtherDetail"
                },
                "otherupdate": {
                    "method": "PUT",
                    "path": "/OtherUpdate"
                },
                "exportfilewordother": {
                    "method": "GET",
                    "path": "/ExportFileWordOther" + customer_app.customer_code
                }
            }
        },
        "auditwork": {
            "controller": "/AuditWork",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "POST",
                    "path": "/Update"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "copy": {
                    "method": "POST",
                    "path": ""
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "searchprepareaudit": {
                    "method": "GET",
                    "path": "/SearchPrepareAudit"
                },
                "searchprepareauditapproved": {
                    "method": "GET",
                    "path": "/SearchPrepareAuditApproved"
                },
                "searchyear": {
                    "method": "GET",
                    "path": "/SearchYear"
                },
                "deleteauditwork": {
                    "method": "DELETE",
                    "path": "/DeleteAuditWork"
                },
                "deleteauditworkscope": {
                    "method": "DELETE",
                    "path": "/DeleteAuditWorkScope"
                },
                "SelectAuditor": {
                    "method": "POST",
                    "path": "/SelectAuditor"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
                "deletefacilityscope": {
                    "method": "DELETE",
                    "path": "/DeleteFacilityScope"
                },
                "searchyearapproved": {
                    "method": "GET",
                    "path": "/SelectYearApproved"
                },
                "searchauditworkapproval": {
                    "method": "GET",
                    "path": "/SearchAuditWork"
                },
            }
        },
        "catrisk": {
            "controller": "/CatRisk",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
                "searchtest": {
                    "method": "GET",
                    "path": "/SearchTest"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "download": {
                    "method": "POST",
                    "path": "/Download"
                },
                "searchlist": {
                    "method": "GET",
                    "path": "/SearchList"
                },
            }
        },
        "catcontrol": {
            "controller": "/CatControl",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "getriskcontrol": {
                    "method": "GET",
                    "path": "/GetRiskControl"
                },
                "deletecurrentrisk": {
                    "method": "DELETECURRENTRISK",
                    "path": ""
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
                "download": {
                    "method": "POST",
                    "path": "/Download"
                },
                "searchdocument": {
                    "method": "GET",
                    "path": "/SearchDocument"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                }
            }
        },
        "catauditprocedure": {
            "controller": "/CatAuditProcedures",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "getProcedure": {
                    "method": "GET",
                    "path": "/GetProcedures"
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
            }
        },
        "auditprogram": {
            "controller": "/AuditProgram",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "searchRisk": {
                    "method": "GET",
                    "path": "/SearchRisk"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "copy": {
                    "method": "POST",
                    "path": "/Copy"
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "getItemProcessRisk": {
                    "method": "GET",
                    "path": "/RiskDetail"
                },
                "updateProcessRisk": {
                    "method": "PUT",
                    "path": "/Update"
                },
                "addauditrisk": {
                    "method": "Post",
                    "path": "/AddRisk"
                },
                "addprocedures": {
                    "method": "Post",
                    "path": "/AddProcedures"
                },
                "deleteRisk": {
                    "method": "DELETE",
                    "path": "/DeleteRisk"
                },
                "deleteProcedures": {
                    "method": "DELETE",
                    "path": "/DeleteProcedures"
                },
                "addrisklib": {
                    "method": "Post",
                    "path": "/AddRiskLib"
                },
                "addprocedureslib": {
                    "method": "Post",
                    "path": "/AddProceduresLib"
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
                "searchfromhome": {
                    "method": "GET",
                    "path": "/SearchFromHome"
                },
            }
        },
        "auditassignment": {
            "controller": "/AuditAssignment",
            "action": {
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
            }
        },
        "auditdetect": {
            "controller": "/AuditDetect",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                //"update": {
                //    "method": "PUT",
                //    "path": "/Unchecked"
                //},
                "listcatdetecttype": {
                    "method": "GET",
                    "path": "/ListCatDetectType"
                },
                "deletedetect": {
                    "method": "DELETE",
                    "path": "/DeleteDetect"
                },
                "privatecode": {
                    "method": "GET",
                    "path": "/PrivateCode"
                },
                "createauditdetect": {
                    "method": "POST",
                    "path": "/CreateAuditDetect"
                },
                "searchmodalobserve": {
                    "method": "GET",
                    "path": "/SearchModalObserve"
                },
                "chooseobserve": {
                    "method": "POST",
                    "path": "/ChooseObserve"
                },
                "chooseobserveupdate": {
                    "method": "POST",
                    "path": "/ChooseObserveUpdate"
                },
                "unchecked": {
                    "method": "DELETE",
                    "path": "/Unchecked"
                },
                "privatecodeauditrequestmonitor": {
                    "method": "GET",
                    "path": "/PrivateCodeAuditRequestMonitor"
                },
                "listcatauditrequest": {
                    "method": "GET",
                    "path": "/ListCatAuditRequest"
                },
                "listfacility": {
                    "method": "GET",
                    "path": "/ListFacility"
                },
                "listuserresponsible": {
                    "method": "GET",
                    "path": "/ListUserResponsible"
                },
                "createauditrequestmonitor": {
                    "method": "POST",
                    "path": "/CreateAuditRequestMonitor"
                },
                "detailauditrequestmonitor": {
                    "method": "GET",
                    "path": "/DetailAuditRequestMonitor"
                },
                "editauditrequestmonitor": {
                    "method": "PUT",
                    "path": "/EditAuditRequestMonitor"
                },
                "deleteauditrequestmonitor": {
                    "method": "DELETE",
                    "path": "/DeleteAuditRequestMonitor"
                },
                "cleardetectcodenew": {
                    "method": "GET",
                    "path": "/ClearDetectCodeNew"
                },
                "editauditdetect": {
                    "method": "POST",
                    "path": "/EditAuditDetect"
                },
                "sendbrowseauditdetect": {
                    "method": "POST",
                    "path": "/SendBrowseAuditDetect"
                },
                "censorshipauditdetect": {
                    "method": "POST",
                    "path": "/CensorshipAuditDetect"
                },
                "datadropdownpersonnel": {
                    "method": "GET",
                    "path": "/DataDropDownPersonnel"
                },
                "listauditrequestmonitorcreateauditdetect": {
                    "method": "GET",
                    "path": "/ListAuditRequestMonitorCreateAuditDetect"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
                "exportexcel": {
                    "method": "GET",
                    "path": "/ExportExcel"
                }
            }
        },
        "auditobserve": {
            "controller": "/AuditObserve",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "listyearauditworkdefault": {
                    "method": "GET",
                    "path": "/ListYearAuditWorkDefault"
                },
                "listauditworkobserve": {
                    "method": "GET",
                    "path": "/ListAuditWorkObserve"
                },
            }
        },
        "riskcontrol": {
            "controller": "/RiskControl",
            "action": {
                "getItemControl": {
                    "method": "GET",
                    "path": "/GetControl",
                },
                "getItemRisk": {
                    "method": "GET",
                    "path": "/GetRisk"
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
            }
        },
        "reportaduditwork": {
            "controller": "/ReportAuditWork",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "requestapproval": {
                    "method": "POST",
                    "path": "/RequestApproval"
                },
                "rejectapproval": {
                    "method": "POST",
                    "path": "/RejectApproval"
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "reportupdatestatus": {
                    "method": "POST",
                    "path": "/ReportpdateStatus"
                },
                "export": {
                    "method": "GET",
                    "path": "/ExportFileWord" + customer_app.customer_code
                },
            }
        },
        "auditrequestmonitor": {
            "controller": "/AuditRequestMonitor",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "POST",
                    "path": "/Edit"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
                "updateextend": {
                    "method": "GET",
                    "path": "/UpdateExtend"
                },
                "exportexcel": {
                    "method": "GET",
                    "path": "/ExportExcel"
                },
            }
        },
        "workingpaper": {
            "controller": "/WorkingPaper",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "POST",
                    "path": "/update"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "getriskworkingpaper": {
                    "method": "GET",
                    "path": "/GetRiskWorkingPaper"
                },
                "privatecode": {
                    "method": "GET",
                    "path": "/PrivateCode"
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "requestapproval": {
                    "method": "POST",
                    "path": "/RequestApproval"
                },
                "rejectapproval": {
                    "method": "POST",
                    "path": "/RejectApproval"
                },
                "observecode": {
                    "method": "GET",
                    "path": "/ObserveCode"
                },
                'getcontrolworkingpaper': {
                    "method": "GET",
                    "path": "/GetControlWorkingPaper"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
                "liststatusworkingpaper": {
                    "method": "GET",
                    "path": "/ListStatusWorkingPaper"
                },
                "getcontrolworkingpaper_str": {
                    "method": "GET",
                    "path": "/GetControlWorkingPaper_str"
                },
                "exportexcel": {
                    "method": "POST",
                    "path": "/ExportExcel"
                },
                "getcontrolfromrisk_str": {
                    "method": "GET",
                    "path": "/GetControlFromRisk_str"
                }
            }
        },
        "controlassessment": {
            "controller": "/ControlAssessment",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "POST",
                    "path": "/Delete"
                }
            }
        },
        "document": {
            "controller": "/Document",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "searchedit": {
                    "method": "GET",
                    "path": "/SearchEdit"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "POST",
                    "path": "/Update"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "download": {
                    "method": "GET",
                    "path": "/Download"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
            }
        },
        "auditworkscope": {
            "controller": "/AuditWorkScope",
            "action": {
                "getunit": {
                    "method": "GET",
                    "path": "/GetUnit",
                },
                "getprocess": {
                    "method": "GET",
                    "path": "/GetProcess"
                },
                "getunitbyaudit": {
                    "method": "GET",
                    "path": "/GetUnitByAudit",
                },
                "getprocessbyunit": {
                    "method": "GET",
                    "path": "/GetProcessByUnit"
                },
            }
        },
        "controldocument": {
            "controller": "/ControlDocument",
            "action": {
                "getDocument": {
                    "method": "GET",
                    "path": "/GetDocument",
                },
                "getNotSelectDocument": {
                    "method": "GET",
                    "path": "/GetNotSelectDocument"
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
            }
        },
        "discussionhistory": {
            "controller": "/DiscussionHistory",
            "action": {
                "savediscussionhistory": {
                    "method": "POST",
                    "path": "/SaveDiscussionHistory"
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                }
            }
        },
        "evaluationcriteria": {
            "controller": "/EvaluationCriteria",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    //function support to add/update item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": "/Delete"
                },
            }
        },
        "evaluationscale": {
            "controller": "/EvaluationScale",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    //function support to add/update item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": "/Delete"
                },
            }
        },
        "evaluationstandard": {
            "controller": "/EvaluationStandard",
            "action": {
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    //function support get items by search condition
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    //function support to add/update item
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    //function support to delete item
                    "method": "POST",
                    "path": "/Delete"
                },
            }
        },
        "evaluation": {
            "controller": "/Evaluation",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "init": {
                    "method": "POST",
                    "path": "/InitEvaluation"
                },
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "updatePoint": {
                    "method": "POST",
                    "path": "/UpdatePoint"
                },
                "refresh": {
                    "method": "POST",
                    "path": "/RefreshEvaluation"
                }
            },
        },
        "evaluationcompliance": {
            "controller": "/EvaluationCompliance",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "init": {
                    "method": "POST",
                    "path": "/InitEvaluationCompliance"
                },
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "updateCompliance": {
                    "method": "POST",
                    "path": "/UpdateCompliance"
                },
                "refresh": {
                    "method": "POST",
                    "path": "/RefreshEvaluation"
                }
            },
        },
        "auditminutes": {
            "controller": "/AuditMinutes",
            "action": {
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "createauditminutes": {
                    "method": "POST",
                    "path": "/CreateAuditMinutes"
                },
                "getItem": {
                    //function support get item by id /controller/{id}
                    "method": "GET",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "editauditminutes": {
                    "method": "POST",
                    "path": "/EditAuditMinutes"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAuditMinutes"
                },
                "exportfileword": {
                    "method": "GET",
                    "path": "/ExportFileWord" + customer_app.customer_code
                },
                "rattingtype": {
                    "method": "GET",
                    "path": "/RattingType"
                }
            }
        },
        "documentunitprovide": {
            "controller": "/DocumentUnitProvide",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },

                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "update": {
                    "method": "POST",
                    "path": "/Update"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                },
                "select": {
                    "method": "POST",
                    "path": "/Select"
                },
                "download": {
                    "method": "GET",
                    "path": "/Download"
                },
                "upload": {
                    "method": "POST",
                    "path": "/Upload"
                },
                "deletefile": {
                    "method": "GET",
                    "path": "/DeleteAttach"
                },
            }
        },
        "approvalconfig": {
            "controller": "/ApprovalConfig",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
            }
        },
        "approvalfunction": {
            "controller": "/ApprovalFunction",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "submitapproval": {
                    "method": "POST",
                    "path": "/SubmitApproval"
                },
                "requestapproval": {
                    "method": "POST",
                    "path": "/RequestApproval"
                },
                "rejectapproval": {
                    "method": "POST",
                    "path": "/RejectApproval"
                },
                "updatestatus": {
                    "method": "POST",
                    "path": "/UpdateStatus"
                },
                "deletefileattach": {
                    "method": "GET",
                    "path": "/DeleteAttachApproval"
                },
                "downloadfileattach": {
                    "method": "POST",
                    "path": "/DownloadAttachApproval"
                },
                "cancelapproval": {
                    "method": "POST",
                    "path": "/CancelApproval"
                },
            }
        },
        "reportaduditworkyear": {
            "controller": "/ReportAuditWorkYear",
            "action": {
                "getItem": {
                    "method": "GET",
                    "path": ""
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "add": {
                    "method": "POST",
                    "path": ""
                },
                "update": {
                    "method": "PUT",
                    "path": ""
                },
                "delete": {
                    "method": "DELETE",
                    "path": ""
                },
                "liststatusreportyear": {
                    "method": "GET",
                    "path": "/ListStatusReportYear"
                },
                "export": {
                    "method": "GET",
                    "path": "/ExportWordnew" + customer_app.customer_code
                }
            }
        },
        "manageauditprogress": {
            "controller": "/ManageAuditProgress",
            "action": {
                "searchmageauditprogress": {
                    "method": "GET",
                    "path": "/SearchMageAuditProgress"
                },
                "editschedule": {
                    "method": "PUT",
                    "path": "/EditSchedule"
                },
                "editmainstage": {
                    "method": "PUT",
                    "path": "/EditMainStage"
                },
                "detailschedule": {
                    "method": "GET",
                    "path": "/DetailSchedule"
                },
                "detailmainstage": {
                    "method": "GET",
                    "path": "/DetailMainStage"
                }
            }
        },
        "auditedunitdashboard": {
            "controller": "/AuditedUnitDashboard",
            "action": {
                "getdata": {
                    "method": "GET",
                    "path": "/auditedunitdashboard"
                },
                "getauditrequest": {
                    "method": "GET",
                    "path": "/auditrequest"
                }
            }
        },
        "auditorworkdashboard": {
            "controller": "/AuditorWorkDashboard",
            "action": {
                "getworkingpaper": {
                    "method": "GET",
                    "path": "/getworkingpaper"
                },
                "getauditwork": {
                    "method": "GET",
                    "path": "/getauditwork"
                },
                "getauditdetect": {
                    "method": "GET",
                    "path": "/getauditdetect"
                },
                "getauditrequest": {
                    "method": "GET",
                    "path": "/getauditrequest"
                },
            }
        },
        "internalauditdashboard": {
            "controller": "/InternalAuditDashboard",
            "action": {
                "getdata": {
                    "method": "GET",
                    "path": "/getdata"
                },
            }
        },
        "auditworkdashboard": {
            "controller": "/AuditWorkDashBoard",
            "action": {
                "getdata": {
                    "method": "GET",
                    "path": "/getdata"
                },
            }
        },
        "configdocument": {
            "controller": "/ConfigDocument",
            "action": {
                "configdocumentcollapse": {
                    "method": "GET",
                    "path": "/ConfigDocumentCollapse"
                },
                "search": {
                    "method": "GET",
                    "path": "/Search"
                },
                "active": {
                    "method": "POST",
                    "path": "/Active"
                }
            }
        }
    }
}
var categories = {
    'phanLoaiDoiTuong': 'PhanLoaiDoiTuong',
    'doiTuongApDung': 'DoiTuongApDung',
    'loaiDonVi': 'LoaiDonVi',
    'dieuKienDinhLuong': 'DieuKienDinhLuong',
    'lyDoKiemToan': 'LyDoKiemToan',
    'dieukienDuoi': 'DieuKienDuoi',
    'dieukienTren': 'DieuKienTren',
    'khanangxayra': 'KhaNangXayRa',
    'mucdoanhhuong': 'MucDoAnhHuong',
    'mucxephangkiemtoan': 'MucXepHangKiemToan',
    'loairuiroquytrinh': 'LoaiRuiRoQuyTrinh',
    'tansuatkiemsoat': 'TanSuatKiemSoat',
    'loaikiemsoat': 'LoaiKiemSoat',
    'hinhthuckiemsoat': 'HinhThucKiemSoat',
    'phathienkiemtoan': 'PhatHienKiemToan',
    'kiennghikiemtoan': 'KienNghiKiemToan',
    'xephangruiro': 'XepHangRuiRo',
}

var userInfo = {
    'id': 1,
    'user_name': 'admin',
    'full_name': 'Administrator',
    'domain_id': 1
};