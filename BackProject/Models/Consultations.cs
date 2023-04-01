using System;

namespace BackProject.Models
{
    public class Consultations
    {
        public int Id { get; set; }
        public Professor ProfessorId { get; set; }
        public String Data { get; set; }
    }
}