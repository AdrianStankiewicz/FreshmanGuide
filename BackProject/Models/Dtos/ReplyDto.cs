using System.ComponentModel.DataAnnotations;

namespace BackProject.Models.Dtos
{
    public class ReplyDto
    {
        public String Nick { get; set; }
        public String Body { get; set; }
        public Boolean Verified { get; set; }
    }
}
