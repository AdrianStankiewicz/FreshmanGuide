using System;

namespace BackProject.Models
{
    public class Consultation
    {
        public int Id { get; set; }
        public Professor ProfessorId { get; set; }
        public String Data { get; set; }
    }
}