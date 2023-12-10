namespace BackProject.Models
{

    public class Professor
    {
        public int Id { get; set; }
        public String Organisation { get; set; }
        public String Name { get; set; }
        public String Room { get; set; }
        public String? Email { get; set; }
        public String? Best_contact { get; set; }
        public String? TypeOfPass { get; set; }
        public String? AvailabilityOfMaterials { get; set; }
        public String? Note { get; set; }

        public List<Consultations>? Consultations { get; set; }
    }
}