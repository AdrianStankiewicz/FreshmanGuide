using System;

namespace BackProject.Models
{
    public class Post
    {
        public int Id { get; set; }
        public String Nick { get; set; }
        public Category CategoryId { get; set; }
        public String Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public Boolean Verified { get; set; }

        public List<Reply> Replies { get; set; }
    }
}