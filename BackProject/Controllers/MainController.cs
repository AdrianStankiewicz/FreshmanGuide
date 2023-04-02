using BackProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        public static List<Cantine> _cantines;
        public static List<Category> _categories;
        public static List<Consultations> _consultations;
        public static List<Dictionary> _dictionaries;
        public static List<Internship> _internships;
        public static List<Post> _posts;
        public static List<Professor> _professors;
        public static List<Replies> _replies;
        public static List<Shop> _shops;

        public MainController()
        {
            _cantines = new List<Cantine>(){
            new() { Id = 1, Name = "Zupa", Price = 5.5f, Review = "Dobra nawet taka" },
            new() { Id = 2, Name = "Ziemniaki", Price = 2.5f, Review = "Ziemniak jak ziemniak" },
            new() { Id = 3, Name = "Naleśniki", Price = 7.5f, Review = "Słodkie i syte" }
                };

            _categories = new List<Category> {
            new() { Id = 1, Name = "Szybka sprawa" },
            new() { Id = 2, Name = "Ważna sprawa"},
            new() { Id = 3, Name = "Sportowe" }
                };

            _dictionaries = new List<Dictionary> {
             new() { Id = 1, Word = "Aka", Definition = "Akademik czyli u nas SDM2, sMARY i SDM4"},
             new() { Id = 2, Word = "Katakumby", Definition = "Strefa studenta"},
             new() { Id = 3, Word = "Kolos", Definition = "Taki sprawdzian tylko więcej materiału" }
                };

            _internships = new List<Internship> {
             new() { Id = 1, Name = "Flex ", Link = "https://pracodawcy.pracuj.pl/profile/flextronics-international-poland-sp-z-o-o,6bmfsg3,pl"},
             new() { Id = 2, Name = "ERGO Hestia", Link = "https://www.pracuj.pl/praca/stazysta-w-zespole-zarzadzania-bezpieczenstwem-i-zgodnoscia-it-sopot-hestii-1,oferta,1002460851?s=eec3c7af&searchId=MTY3OTU3NDQ1MTY2MC45NzE0"},
             new() { Id = 3, Name = "Rafineria Gdańska Sp. z o.o.", Link = "https://rafineriagdanska.pl/3487/kariera/oferty_pracy" }
                };

            _posts = new List<Post> {
            new() { Id = 1, Nick = "Kanciak", CategoryId = _categories[0], Body = "Hej nie wiem jak załatwic internet w akademiku?", CreatedAt = DateTime.Now, Verified = true},
            new() { Id = 2, Nick = "Warszawiak", CategoryId = _categories[1], Body = "Siema nie moge znaleść uczelni!?!??!", CreatedAt = DateTime.Now, Verified = false},
            new() { Id = 3, Nick = "Pływanciak", CategoryId = _categories[2], Body = "Hej kiedy jest darmowy basen?", CreatedAt = DateTime.Now, Verified = true },
            new() { Id = 4, Nick = "Kwadraciak", CategoryId = _categories[0], Body = "Siemanooo gdzie są spoko kluby???", CreatedAt = DateTime.Now, Verified = false },
            new() { Id = 5, Nick = "Stiven", CategoryId = _categories[2], Body = "Hej co potrzebuje żeby iść na statek?", CreatedAt = DateTime.Now, Verified = true }
                };

            _professors = new List<Professor> {
             new() { Id = 1, Organisation = "ksi", Name = "dr inż. Marcin Forkiewicz", Room = "F-216", Email = "m.forkiewicz@wznj.umg.edu.pl", HowToContact = "Email", TypeOfExamination = "Otwarte", AvailabilityOfMaterials = "Bardzo dobre Teams", Note = "Bardzo miła osoba"},
             new() { Id = 2, Organisation = "ksi", Name = "dr hab. inż. Ireneusz Czarnowski", Room = "F-204", Email = "i.czarnowski@umg.edu.pl", HowToContact = "Teams", TypeOfExamination = "Otwarte i zamknięte", AvailabilityOfMaterials = "Bardzo dobre Teams", Note = "Bardzo miła osoba"},
             new() { Id = 3, Organisation = "ksi", Name = "dr hab. Dariusz Barbucha", Room = "F-204", Email = "d.barbucha@wznj.umg.edu.pl", HowToContact = "Email", TypeOfExamination = "Zamknięte", AvailabilityOfMaterials = "Bardzo Dobre Ilias", Note = "Bardzo miła osoba"}
                 };

            _consultations = new List<Consultations> {
             new() { Id = 1, ProfessorId = _professors[0], Data = "środa 11:00-13:00"},
             new() { Id = 2, ProfessorId = _professors[1], Data = "poniedziałek 11:00-12:00"},
             new() { Id = 3, ProfessorId = _professors[1], Data = "czwartek 08:00-09:00"},
             new() { Id = 4, ProfessorId = _professors[2], Data = "piątek 08:00-10:00"}
                };

            _replies = new List<Replies> {
             new() { Id = 1, Nick = "Karabin", PostId = _posts[0], Body = "Hej wystarczy isc do Shredder?", CreatedAt = DateTime.Now, Verified = true},
             new() { Id = 2, Nick = "Gocha", PostId = _posts[0], Body = "Nie działa ostatnio", CreatedAt = DateTime.Now, Verified = false},
             new() { Id = 3, Nick = "Kaszub", PostId = _posts[1], Body = "Chłopie naprzeciw MC", CreatedAt = DateTime.Now, Verified = false },
             new() { Id = 4, Nick = "Ratownik", PostId = _posts[2], Body = "W piątki o 20:30", CreatedAt = DateTime.Now, Verified = true },
             new() { Id = 5, Nick = "Leonard", PostId = _posts[3], Body = "Siemaa poszukaj sobie Harem i Sfinks kox naprawde", CreatedAt = DateTime.Now, Verified = false }
                };

            _shops = new List<Shop> {
             new() { Id = 1, ItemName = "Bluza", Price = 210f},
             new() { Id = 2, ItemName = "Puzzle", Price = 20.00f},
             new() { Id = 3, ItemName = "Torba", Price = 45.0f },
             new() { Id = 4, ItemName = "Otwieracz do piwa", Price = 10.0f }
                };
        }

        [HttpGet("GetAllCantines")]
        public List<Cantine> GetAllCantines()
        {
            return _cantines;
        }

        [HttpGet("GetCantine/{id}")] 
        public Cantine GetCantine(int id)
        {
            return _cantines[id];
        }

        [HttpGet("GetAllCategories")]
        public List<Category> GetAllCategories()
        {
            return _categories;
        }

        [HttpGet("GetCategory/{id}")]
         public Category GetCategory(int id)
         {
             return _categories[id];
         }

        [HttpGet("GetAllConsultations")]
        public List<Consultations> GetAllConsultations()
        {
            return _consultations;
        }

        [HttpGet("GetConsultations/{id}")]
        public Consultations GetConsultations(int id)
        {
            return _consultations[id];
        }

        [HttpGet("GetAllDictionaries")]
        public List<Dictionary> GetAllDictionaries()
        {
            return _dictionaries;
        }

        [HttpGet("GetDictionary/{id}")]
        public Dictionary GetDictionary(int id)
        {
            return _dictionaries[id];
        }

        [HttpGet("GetAllInternships")]
        public List<Internship> GetAllInternships()
        {
            return _internships;
        }

        [HttpGet("GetInternship/{id}")]
        public Internship GetInternship(int id)
        {
            return _internships[id];
        }

        [HttpGet("GetAllPosts")]
        public List<Post> GetAllPosts()
        {
            return _posts;
        }

        [HttpGet("GetPost/{id}")]
        public Post GetPost(int id)
        {
            return _posts[id];
        }

        [HttpGet("GetAllProfessors")]
        public List<Professor> GetAllProfessors()
        {
            return _professors;
        }

        [HttpGet("GetProfessor/{id}")]
        public Professor GetProfessor(int id)
        {
            return _professors[id];
        }

        [HttpGet("GetAllReplies")]
        public List<Replies> GetAllReplies()
        {
            return _replies;
        }

        [HttpGet("GetReply/{id}")]
        public Replies GetReply(int id)
        {
            return _replies[id];
        }

        [HttpGet("GetAllShops")]
        public List<Shop> GetAllShops()
        {
            return _shops;
        }

        [HttpGet("GetShop/{id}")]
        public Shop GetShop(int id)
        {
            return _shops[id];
        }
    }
}
