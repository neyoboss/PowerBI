
namespace power_bi_overview_dotnet.Services
{
    public interface _PowerBIClientService
    {
        DashboardModel GetDashboardModelFromGroup(Guid groupId, Guid dashboardId);
        ReportModel GetReportModelFromGroup(Guid groupId, Guid reportId);
        List<ReportModel> GetReportsInWorkspace(Guid groupId);
    }
}