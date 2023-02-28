using Microsoft.AspNetCore.Mvc;
using power_bi_overview_dotnet.Services;

[ApiController]
public class AccessTokenController : ControllerBase
{
    
    _PowerBIClientService powerBIClientService;

    public AccessTokenController(_PowerBIClientService powerBIClientService){
        this.powerBIClientService = powerBIClientService;
    }

    [HttpGet("api/groups")]
    public IActionResult GetGroups(){        
        return Ok(powerBIClientService.GetGroupModels());
    }

    [HttpGet("api/workspace/{workspaceId}/report/{reportId}")]
    public IActionResult GetReportFromGroup(Guid workspaceId, Guid reportId){
        return Ok(powerBIClientService.GetReportModelFromGroup(workspaceId,reportId));
    }
}