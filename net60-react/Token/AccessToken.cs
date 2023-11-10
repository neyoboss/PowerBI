using Microsoft.Identity.Client;

namespace power_bi_overview_dotnet
{
    public class AccessToken : _AccessToken
    {
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
