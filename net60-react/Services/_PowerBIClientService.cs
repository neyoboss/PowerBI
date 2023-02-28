
namespace power_bi_overview_dotnet.Services{
    public interface _PowerBIClientService{
        List<GroupModel> GetGroupModels();
        ReportModel GetReportModelFromGroup(Guid groupId, Guid reportId);
    }
}