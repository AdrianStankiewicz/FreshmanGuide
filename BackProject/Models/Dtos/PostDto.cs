using System.ComponentModel.DataAnnotations;

namespace BackProject.Models.Dtos
{
    public class PostDto
    {
        public String Nick { get; set; }
        public int CategoryId { get; set; }
        public String Body { get; set; }
        public Boolean Verified { get; set; }
    }
}
