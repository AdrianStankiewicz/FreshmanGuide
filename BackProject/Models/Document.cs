namespace BackProject.Models
{
    public class Document
    {
        public int Id { get; set; }
        public byte[] Doc { get; set; }
        public string Extension { get; set; }
        public string Title { get; set; }
    }
}
