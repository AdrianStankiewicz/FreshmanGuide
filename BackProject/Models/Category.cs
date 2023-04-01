using System;

namespace BackProject.Models
{
    public class Category
    {
        public int Id { get; set; }
        public String Name { get; set; }

        public List<Post> Post { get; set; }
    }
}