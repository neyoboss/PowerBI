using Microsoft.AspNetCore.Mvc;
using power_bi_overview_dotnet.Services;

[ApiController]
public class AccessTokenController : ControllerBase
{

    _PowerBIClientService powerBIClientService;

    public AccessTokenController(_PowerBIClientService powerBIClientService)
    {
        this.powerBIClientService = powerBIClientService;
    }

    [HttpGet("api/workspace/{workspaceId}/report/{reportId}")]
    public IActionResult GetReportFromGroup(Guid workspaceId, Guid reportId)
    {
        return Ok(powerBIClientService.GetReportModelFromGroup(workspaceId, reportId));
    }

    [HttpGet("api/workspace/{workspaceId}")]
    public IActionResult GetReportsInWorkspace(Guid workspaceId)
    {
        return Ok(powerBIClientService.GetReportsInWorkspace(workspaceId));
    }

    [HttpGet("api/workspace/{workspaceId}/dashboard/{dashboardId}")]
    public IActionResult GerDashboardInWorkspace(Guid workspaceId, Guid dashboardId){
        return Ok(powerBIClientService.GetDashboardModelFromGroup(workspaceId, dashboardId));
    }
}