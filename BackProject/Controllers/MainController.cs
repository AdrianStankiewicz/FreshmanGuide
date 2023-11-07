using BackProject.Db;
using BackProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public MainController(MyAppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllCanteen")]
        public IActionResult GetAllCanteen()
        {
            try
            {
                var canteen = _context.Canteen.ToList();
                if (canteen.Count == 0)
                {
                    return NotFound("No element found");
        }
                return Ok(canteen);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCanteen/{id}")]
        public IActionResult GetCanteen(int id)
        {
            try
            {
                var canteen = _context.Canteen.Find(id);
                if (canteen == null)
                {
                    return NotFound($"Element not found {id}");
        }
                return Ok(canteen);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllCategories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                var category = _context.Category.ToList();
                if (category.Count == 0)
                {
                    return NotFound("No element found");
        }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCategory/{id}")]
        public IActionResult GetCategory(int id)
         {
            try
            {
                var category = _context.Category.Find(id);
                if (category == null)
                {
                    return NotFound($"Element not found {id}");
         }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllConsultations")]
        public IActionResult GetAllConsultations()
        {
            try
            {
                var consultation = _context.Consultation.ToList();
                if (consultation.Count == 0)
                {
                    return NotFound("No element found");
        }
                return Ok(consultation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetConsultations/{id}")]
        public IActionResult GetConsultations(int id)
        {
            try
            {
                var consultations = _context.Consultation.Find(id);
                if (consultations == null)
                {
                    return NotFound($"Element not found {id}");
        }
                return Ok(consultations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("GetAllDictionaries")]
        public IActionResult GetAllDictionaries()
        {
            try
            {
                var dictionary = _context.Dictionary.ToList();
                if (dictionary.Count == 0)
                {
                    return NotFound("No element found");
        }
                return Ok(dictionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetDictionary/{id}")]
        public IActionResult GetDiconary(int id)
        {
            try
            {
                var dictionary = _context.Dictionary.Find(id);
                if (dictionary == null)
                {
                    return NotFound($"Element not found {id}");
        }
                return Ok(dictionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllInternships")]
        public IActionResult GetAllInternships()
        {
            try
            {
                var internship = _context.Practice.ToList();
                if (internship.Count == 0)
                {
                    return NotFound("No element found");
        }
                return Ok(internship);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetInternship/{id}")]
        public IActionResult GetInternship(int id)
        {
            try
            {
                var internship = _context.Practice.Find(id);
                if (internship == null)
                {
                    return NotFound($"Element not found {id}");
                }
                return Ok(internship);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostInternship")]
        public IActionResult PostInternship(Internship model)
        {
            try
            {
                _context.Practice.Add(model);
                _context.SaveChanges();
                return Ok("Internship created. ");
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            try
            {
                var post = _context.Post.ToList();
                if (post.Count == 0)
                    return NotFound("No element found");

                foreach (var item in post)
                    item.Reply = _context.Reply.Where(x => x.PostId == item.Id).ToList();

                return Ok(post);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPost/{id}")]
        public IActionResult GetPost(int id)
        {
            try
            {
                var post = _context.Post.Find(id);
                if (post == null)
                    return NotFound($"Element not found {id}");

                post.Reply = _context.Reply.Where(x => x.PostId == id).ToList();

                return Ok(post);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostPost")]
        public IActionResult PostPost(Post model)
        {
            try
            {
                _context.Add(model);
                _context.SaveChanges();
                return Ok("Post created. ");
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("VerifyPost/{id}")]
        public IActionResult VerifyPost([FromRoute] int id)
        {
            try
            {
                var postToVerify = _context.Post.FirstOrDefault(post => post.Id == id);
                if (postToVerify == null)
                    return BadRequest("Wrong post Id");

                postToVerify.Verified = true;
                _context.SaveChanges();

                return Ok("Post verified");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllProfessors")]
        public IActionResult GetAllProfessors()
        {
            try
            {
                var professor = _context.Professor.ToList();
                if (professor.Count == 0)
                {
                    return NotFound("No element found");
                }
                return Ok(professor);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetProfessor/{id}")]
        public IActionResult GetProfessor(int id)
        {
            try
            {
                var professor = _context.Professor.Find(id);
                if (professor == null)
                {
                    return NotFound($"Element not found {id}");
                }
                return Ok(professor);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllReplies")]
        public IActionResult GetAllReplies()
        {
            try
            {
                var reply = _context.Reply.ToList();
                if (reply.Count == 0)
                {
                    return NotFound("No element found");
                }
                return Ok(reply);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetReply/{id}")]
        public IActionResult GetReply(int id)
        {
            try
            {
                var reply = _context.Reply.Find(id);
                if (reply == null)
                {
                    return NotFound($"Element not found {id}");
                }
                return Ok(reply);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PostReply")]
        public IActionResult PostReply(Reply model)
        {
            try
            {
                _context.Add(model);
                _context.SaveChanges();
                return Ok("Reply created. ");
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllShops")]
        public IActionResult GetAllShops()
        {
            try
            {
                var shop = _context.Shop.ToList();
                if (shop.Count == 0)
                {
                    return NotFound("No element found");
                }
                return Ok(shop);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetShop/{id}")]
        public IActionResult GetShop(int id)
        {
            try
            {
                var shop = _context.Shop.Find(id);
                if (shop == null)
                {
                    return NotFound($"Element not found {id}");
                }
                return Ok(shop);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllAdmins")]
        public IActionResult GetAllAdmins()
        {
            try
            {
                var admin = _context.Admin.ToList();
                if (admin.Count == 0)
                {
                    return NotFound("No element found");
                }
                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAdmin/{id}")]
        public IActionResult GetAdmin(int id)
        {
            try
            {
                var admin = _context.Admin.Find(id);
                if (admin == null)
                {
                    return NotFound($"Element not found {id}");
                }
                return Ok(admin);
            }
            catch (Exception ex)
        {
                return BadRequest(ex.Message);
            }
        }
    }
}
