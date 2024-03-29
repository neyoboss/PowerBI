using power_bi_overview_dotnet;
using power_bi_overview_dotnet.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    policy =>
    {
        policy.WithOrigins("http://localhost:3000").SetIsOriginAllowed((allowed) => true);
    });
});

builder.Services.AddScoped<_AccessToken,AccessToken>();
builder.Services.AddScoped<_PowerBIClientService,PowerBIClientService>();
builder.Services.AddControllers();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors();
app.UseHttpsRedirection();
//app.UseStaticFiles(new StaticFileOptions{RequestPath="net60-react/client-app"});
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
