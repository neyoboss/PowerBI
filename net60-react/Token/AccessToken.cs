using Microsoft.Identity.Client;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using Microsoft.Rest;
using System.Text.Json;
using Microsoft.Identity.Web;


namespace power_bi_overview_dotnet
{
    public class AccessToken : _AccessToken
    {
        // #region Authentication configuration (This is taken form the registered app in AAD)
        // private const string clientId = "b4a6ac7f-7a24-438a-b21d-a0ea0925e6e4";

        // //The client secret is set to 2 years
        // // We are using secret so that we can bypass the login.
        // // It is something like a password for the app
        // private const string clientSecret = "3iM8Q~6TjFNa7-SS7FBPwJzMGfvuftSm5hwLGa~c";
        // private const string tenantId = "f5b42141-40a8-4f78-b5ed-9fe60827bf0b";
        // private static readonly string authority = $" https://login.microsoftonline.com/{tenantId}";
        // #endregion

        // #region API settings
        // private const string resource = "https://analysis.windows.net/powerbi/api";
        // private const string ApiUrl = "https://api.powerbi.com/v1.0";
        // #endregion

        // Guid groupId = new Guid("b0d831d9-e0f1-44ab-89e4-ef438eb475f8");
        // Guid reportId = new Guid("2894bde3-6040-4057-8ad6-033006b9e0d7");

        ////https://login.microsoftonline.com/f5b42141-40a8-4f78-b5ed-9fe60827bf0b/oauth2/v2.0/token

        IConfiguration configuration;
        public AccessToken(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public AuthenticationResult Result()
        {
            IConfidentialClientApplication app = ConfidentialClientApplicationBuilder
            .Create(configuration.GetValue<string>("AzureAD:ClientId"))
            .WithClientSecret(configuration.GetValue<string>("AzureAD:ClientSecret"))
            .WithAuthority(new Uri(configuration.GetValue<string>("AzureAD:Instance")))
            .Build();

            string azureADResource = configuration.GetValue<string>("AzureAD:Resource");
            string[] scopes = new string[] { $"{azureADResource}/.default" };

            AuthenticationResult result = app.AcquireTokenForClient(scopes).ExecuteAsync().Result;

            // AuthenticationResult result = app.AcquireTokenOnBehalfOf(scopes).ExecuteAsync().Result;

            return result;
        }
    }
}