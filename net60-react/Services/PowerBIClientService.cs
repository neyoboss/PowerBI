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

        public List<GroupModel> GetGroupModels()
        {
            var cli = client();
            using (cli)
            {
                Groups pbiGroups = cli.Groups.GetGroups();

                foreach (var group in pbiGroups.Value)
                {
                    GroupModel model = new GroupModel();
                    model.id = group.Id.ToString();
                    model.name = group.Name;

                    var reports = cli.Reports.GetReportsInGroup(new Guid(model.id));

                    model.reportList = new List<ReportModel>();

                    foreach (var rep in reports.Value)
                    {
                        var generateToken = new GenerateTokenRequest(accessLevel: "view");
                        var tokenResponse = client().Reports.GenerateTokenInGroup(new Guid(model.id), rep.Id, generateToken);
                        var embedToken = tokenResponse.Token;

                        var adToken = accessToken.Result().AccessToken.ToString();

                        ReportModel modelRep = new ReportModel();
                        modelRep.embedToken = embedToken;
                        modelRep.embedUrl = rep.EmbedUrl;
                        modelRep.reportId = rep.Id.ToString();
                        modelRep.reportName = rep.Name;

                        model.reportList.Add(modelRep);
                    }
                    groups.Add(model);
                }
                return groups;
            }


        }
    }
}