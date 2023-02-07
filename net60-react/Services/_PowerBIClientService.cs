using Microsoft.PowerBI.Api;
using power_bi_overview_dotnet;

namespace power_bi_overview_dotnet.Services{
    public interface _PowerBIClientService{
        List<GroupModel> GetGroupModels();
    }
}