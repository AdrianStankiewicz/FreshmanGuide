using System;
using System.ComponentModel.DataAnnotations;

namespace BackProject.Models
{
    public class Reply
    {
		public int Id { get; set; }
        [Required]
        public String Nick { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]
        public String Body { get; set; }
		public DateTime CreatedAt { get; set; }
		public Boolean Verified { get; set; }
	}
}