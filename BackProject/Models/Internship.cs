using System;
using System.ComponentModel.DataAnnotations;

namespace BackProject.Models
{
    public class Internship
    {
        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public String Link { get; set; }
        public String Category { get; set; }
    }
}