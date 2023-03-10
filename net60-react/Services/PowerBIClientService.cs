using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;

namespace power_bi_overview_dotnet.Services
{
    public class PowerBIClientService : _PowerBIClientService
    {
        _AccessToken accessToken;
        List<ReportModel> reports = new List<ReportModel>();
        List<GroupModel> groups = new List<GroupModel>();

        public PowerBIClientService(_AccessToken accessToken)
        {
            this.accessToken = accessToken;
        }

        public PowerBIClient client()
        {
            TokenCredentials credentials = new TokenCredentials(accessToken.Result().AccessToken, "Bearer");
            PowerBIClient client = new PowerBIClient(new Uri("https://api.powerbi.com/"), credentials);
            return client;
        }

        public DashboardModel GetDashboardModelFromGroup(Guid groupId, Guid dashboardId)
        {
            var cli = client();
            using (cli)
            {
                var generateToken = new GenerateTokenRequest(accessLevel: "view");
                var tokenResponse = cli.Dashboards.GenerateTokenInGroup(groupId, dashboardId, generateToken);
                var embedToken = tokenResponse.Token;

                Dashboard dashboard = cli.Dashboards.GetDashboardInGroup(groupId, dashboardId);

                DashboardModel dashboardModel = new DashboardModel();
                dashboardModel.id = dashboard.Id.ToString();
                dashboardModel.name = dashboard.DisplayName;
                dashboardModel.embedUrl = dashboard.EmbedUrl;
                dashboardModel.embedToken = embedToken;

                return dashboardModel;
            }
        }

        public ReportModel GetReportModelFromGroup(Guid groupId, Guid reportId)
        {
            var cli = client();
            using (cli)
            {
                var generateToken = new GenerateTokenRequest(accessLevel: "view");
                var tokenResponse = cli.Reports.GenerateTokenInGroup(groupId, reportId, generateToken);
                var embedToken = tokenResponse.Token;

                Report rep = cli.Reports.GetReportInGroup(groupId, reportId);

                ReportModel modelRep = new ReportModel();
                modelRep.embedToken = embedToken;
                modelRep.embedUrl = rep.EmbedUrl;
                modelRep.reportId = rep.Id.ToString();
                modelRep.reportName = rep.Name;

                return modelRep;
            }
        }

        public List<ReportModel> GetReportsInWorkspace(Guid groupId)
        {
            var cli = client();
            using (cli)
            {
                List<ReportModel> reportModels = new List<ReportModel>();
                var reports = cli.Reports.GetReportsInGroup(groupId);

                foreach (var rep in reports.Value)
                {
                    var generateToken = new GenerateTokenRequest(accessLevel: "view");
                    var tokenResponse = cli.Reports.GenerateTokenInGroup(groupId, rep.Id, generateToken);
                    var embedToken = tokenResponse.Token;

                    ReportModel report = new ReportModel();
                    report.embedToken = embedToken;
                    report.embedUrl = rep.EmbedUrl;
                    report.reportId = rep.Id.ToString();
                    report.reportName = rep.Name;

                    reportModels.Add(report);
                }
                return reportModels;
            }
        }
    }
}