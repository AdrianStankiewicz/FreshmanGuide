using System;

namespace BackProject.Models
{
	public class Replie
	{
		public int Id { get; set; }
		public String Nick { get; set; }
		public Post PostId { get; set; }
		public String Body { get; set; }
		public DateTime CreatedAt { get; set; }
		public Boolean Verified { get; set; }
	}
}