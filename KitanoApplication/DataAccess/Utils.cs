namespace KitanoApplication.DataAccess
{
    using KitanoApplication.Models;
    using Microsoft.AspNetCore.Http;
    using RiskAssessment.Resource;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Defines the <see cref="Utils" />.
    /// </summary>
    public static class Utils
    {
        /// <summary>
        /// Defines the context.
        /// </summary>
        private static IHttpContextAccessor context;

        /// <summary>
        /// The SetHttpContextAccessor.
        /// </summary>
        /// <param name="accessor">The accessor<see cref="IHttpContextAccessor"/>.</param>
        public static void SetHttpContextAccessor(IHttpContextAccessor accessor)
        {
            context = accessor;
        }

        /// <summary>
        /// The IsCheckPemission.
        /// </summary>
        /// <param name="menuCode">The menuCode<see cref="string"/>.</param>
        /// <param name="permissionCode">The permissionCode<see cref="string"/>.</param>
        /// <returns>The <see cref="bool"/>.</returns>
        public static bool IsCheckPemission(string menuCode, string permissionCode)
        {
            var currentUser = (CurrentUserModel)context.HttpContext.Items["UserInfo"];
            if (currentUser == null)
            {
                return false;
            }
            var list_permission = currentUser?.RoleList;
            var _permission = menuCode + "_" + permissionCode;
            var check = list_permission.Any(el => el.Permission == _permission);
            return check;
        }
    }

    /// <summary>
    /// Defines the <see cref="UtilsConstant" />.
    /// </summary>
    public static class UtilsConstant
    {
        /// <summary>
        /// The GetMenuName.
        /// </summary>
        /// <returns>The <see cref="Dictionary{string, string}"/>.</returns>
        public static Dictionary<string, string> GetMenuName()
        {
            return new Dictionary<string, string>()
            {
               {"M_H", Resource.Home},
               {"M_RM", Resource.RiskAssessment},
               {"M_SYS", Resource.SystemManagement},
               {"M_U", Resource.UserManagement},
               {"M_UG", Resource.UserGroupManagement},
               {"M_R", Resource.RolesManagement},
               {"M_CAT", Resource.CategoryManagement},
               {"M_CM", Resource.CategoryManagement},
               {"M_SYSSUB", Resource.SystemManagements},
               {"M_UT", Resource.FacilityType},
               {"M_CATAR", Resource.CatAuditRequest},
               {"M_CATDT", Resource.CatDetectType},
               {"M_CATRL", Resource.CatRiskLevel},
               {"M_SYSPAR", Resource.SystemParameter},
               {"M_SYSLOG", Resource.SystemLog},
               {"M_AO", Resource.AuditedObject},              
               {"M_RI", Resource.RiskIssue},
               {"M_GP", Resource.GeneralParameter},
               {"M_MA", Resource.Assessment},
               {"M_BA", Resource.BusinessActivity},
               {"M_AF", Resource.AuditFacilities},
               {"M_APR", Resource.AuditProcess},
               {"M_AC", Resource.AuditCycle},
               {"M_RS", Resource.RatingScale},
               {"M_RAS", Resource.RiskAssessmentScale},
               {"M_AS", Resource.AssessmentStage},
               {"M_SB", Resource.ScoreBoard},
               {"M_ART", Resource.AssessmentResult},
               {"M_AP", Resource.AuditPlan},
               {"M_APL", Resource.Home},
               {"M_AW", Resource.Home},
               {"M_PA", Resource.PrepareAudit},
               {"M_CA", Resource.ConductAudit},
               {"M_RA", Resource.ReportAudit},
               {"M_PAP", Resource.PrepareAuditPlan},
               {"M_RP", Resource.RiskPortfolio},
               {"M_CL", Resource.ControlList},
               {"M_PL", Resource.ProceduresList},
               {"M_WP", Resource.WorkingPapers},
               {"M_RAW", Resource.ReportAuditWork},
               {"M_APRG", Resource.AuditProgram},
               {"M_LRA", Resource.LevelRiskAssessment},
               {"M_ADL", Resource.AuditDetectList},
               {"M_AOB", Resource.AuditObserve},
               {"M_AD", Resource.AuditDetect},
            };
        }
    }
}
