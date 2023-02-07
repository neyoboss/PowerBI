using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using power_bi_overview_dotnet.Services;
using System.Text.Json;


[ApiController]
public class AccessTokenController : ControllerBase
{
    
    _PowerBIClientService powerBIClientService;

    public AccessTokenController(_PowerBIClientService powerBIClientService){
        this.powerBIClientService = powerBIClientService;
    }

    [HttpGet("api/groups")]
    public IActionResult GetGroups(){        
        //var jsonGroups = JsonSerializer.Serialize(powerBIClientService.GetGroupModels());
        return Ok(powerBIClientService.GetGroupModels());
    }
}