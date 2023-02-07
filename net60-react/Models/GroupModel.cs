namespace power_bi_overview_dotnet
{
    public class GroupModel
    {
        public string? id { get; set; }
        public string? type { get; set; }
        public string? name { get; set; }

        public List<ReportModel>? reportList {get;set;}
    }
}