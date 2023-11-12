using BackProject.Db;
using BackProject.Models;
using BackProject.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly MyAppDbContext _dbContext;

        public MainController(MyAppDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet("GetAllCanteen")]
        public async Task<IActionResult> GetAllCanteen()
        {
            var canteen = await _dbContext.Canteen.ToListAsync();
            if (canteen.Count == 0)
                return NotFound("No elements found");
            return Ok(canteen);
        }

        [HttpGet("GetCanteen/{id}")]
        public async Task<IActionResult> GetCanteen(int id)
        {
            var canteen = await _dbContext.Canteen.FirstOrDefaultAsync(x => x.Id == id);
            if (canteen == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(canteen);
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var category = await _dbContext.Category.ToListAsync();
            if (category.Count == 0)
                return NotFound("No elements found");
            return Ok(category);
        }

        [HttpGet("GetCategory/{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(category);
        }

        [HttpGet("GetAllConsultations")]
        public async Task<IActionResult> GetAllConsultations()
        {
            var consultation = await _dbContext.Consultation.ToListAsync();
            if (consultation.Count == 0)
                return NotFound("No elements found");
            return Ok(consultation);
        }

        [HttpGet("GetConsultations/{id}")]
        public async Task<IActionResult> GetConsultations(int id)
        {
            var consultations = await _dbContext.Consultation.FirstOrDefaultAsync(x => x.Id == id);
            if (consultations == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(consultations);
        }


        [HttpGet("GetAllDictionaries")]
        public async Task<IActionResult> GetAllDictionaries()
        {
            var dictionary = await _dbContext.Dictionary.ToListAsync();
            if (dictionary.Count == 0)
                return NotFound("No element found");
            return Ok(dictionary);
        }
        [HttpGet("GetDictionary/{id}")]
        public async Task<IActionResult> GetDiconary(int id)
        {
            var dictionary = await _dbContext.Dictionary.FirstOrDefaultAsync(x => x.Id == id);
            if (dictionary == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(dictionary);
        }

        [HttpGet("GetAllInternships")]
        public async Task<IActionResult> GetAllInternships()
        {
            var internship = await _dbContext.Practice.ToListAsync();
            if (internship.Count == 0)
                return NotFound("No elements found");
            return Ok(internship);
        }

        [HttpGet("GetInternship/{id}")]
        public async Task<IActionResult> GetInternship(int id)
        {
            var internship = await _dbContext.Practice.FirstOrDefaultAsync(x => x.Id == id);
            if (internship == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(internship);
        }

        [HttpPost("PostInternship")]
        public async Task<IActionResult> PostInternship(Internship model)
        {
            _dbContext.Practice.Add(model);
            await _dbContext.SaveChangesAsync();
            return Ok("Internship created. ");
        }

        [HttpPut("EditInternsip/{id}")]
        public async Task<IActionResult> EditPost([FromRoute] int id, InternshipDto model)
        {
            var internshipToEdit = await _dbContext.Practice.FirstOrDefaultAsync(x => x.Id == id);
            if (internshipToEdit == null)
                return BadRequest("Wrong internship Id");

            internshipToEdit.Name = model.Name;
            internshipToEdit.Link = model.Link;
            internshipToEdit.Category = model.Category;
            internshipToEdit.Faculty = model.Faculty;

            await _dbContext.SaveChangesAsync();
            return Ok("Internship edited ");
        }


        [HttpDelete("DeleteInternship/{id}")]
        public async Task<IActionResult> DeleteInternship(int id)
        {
            var internshipToDelete = await _dbContext.Practice.FirstOrDefaultAsync(x => x.Id == id);
            if (internshipToDelete == null)
                return BadRequest("Wrong internship Id");

            _dbContext.Practice.Remove(internshipToDelete);
            await _dbContext.SaveChangesAsync();
            return Ok("Internship deleted ");
        }

        [HttpGet("GetAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var post = await _dbContext.Post.Include(x => x.Reply).ToListAsync();
            if (post.Count == 0)
                return NotFound("No elements found");

            return Ok(post);
        }

        [HttpGet("GetPost/{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _dbContext.Post.Include(r => r.Reply).FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(post);
        }

        [HttpPost("PostPost")]
        public async Task<IActionResult> PostPost(Post model)
        {
            _dbContext.Add(model);
            await _dbContext.SaveChangesAsync();
            return Ok("Post created");
        }

        [HttpPut("EditPost/{id}")]
        public async Task<IActionResult> EditPost([FromRoute] int id, PostDto model)
        {
            var postToEdit = await _dbContext.Post.FirstOrDefaultAsync(x => x.Id == id);
            if (postToEdit == null)
                return BadRequest("Wrong post Id");
            
            postToEdit.Nick = model.Nick;
            postToEdit.CategoryId = model.CategoryId;
            postToEdit.Body = model.Body;
            postToEdit.Verified = model.Verified;

            await _dbContext.SaveChangesAsync();
            return Ok("Post edited ");
        }

        [HttpDelete("DeletePost/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var postToDelete = await _dbContext.Post.FirstOrDefaultAsync(x => x.Id == id);
            if (postToDelete == null)
                return BadRequest("Wrong post Id");

            var repliesToDelete = await _dbContext.Reply.Where(x => x.PostId == postToDelete.Id).ToListAsync();
            if (repliesToDelete != null)
                _dbContext.Reply.RemoveRange(repliesToDelete);

            _dbContext.Post.Remove(postToDelete);
            await _dbContext.SaveChangesAsync();
            return Ok("Post deleted ");
        }

        [HttpPost("VerifyPost/{id}")]
        public async Task<IActionResult> VerifyPost([FromRoute] int id, [FromBody] bool verify)
        {
            var postToVerify = await _dbContext.Post.FirstOrDefaultAsync(post => post.Id == id);
            if (postToVerify == null)
                return BadRequest("Wrong post Id");

            postToVerify.Verified = verify;
            await _dbContext.SaveChangesAsync();

            return Ok($"Post verified: {verify}");
        }

        [HttpGet("GetAllProfessors")]
        public async Task<IActionResult> GetAllProfessors()
        {
            var professor = await _dbContext.Professor.ToListAsync();
            if (professor.Count == 0)
                return NotFound("No elements found");
            return Ok(professor);
        }

        [HttpGet("GetProfessor/{id}")]
        public async Task<IActionResult> GetProfessor(int id)
        {
            var professor = await _dbContext.Professor.FirstOrDefaultAsync(post => post.Id == id);
            if (professor == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(professor);
        }

        [HttpGet("GetAllReplies")]
        public async Task<IActionResult> GetAllReplies()
        {
            var reply = await _dbContext.Reply.ToListAsync();
            if (reply.Count == 0)
                return NotFound("No elements found");
            return Ok(reply);
        }

        [HttpGet("GetReply/{id}")]
        public async Task<IActionResult> GetReply(int id)
        {
            var reply = await _dbContext.Reply.FirstOrDefaultAsync(post => post.Id == id);
            if (reply == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(reply);
        }

        [HttpPost("PostReply")]
        public async Task<IActionResult> PostReply(Reply model)
        {
            _dbContext.Add(model);
            await _dbContext.SaveChangesAsync();
            return Ok("Reply created");
        }

        [HttpPut("EditReply/{id}")]
        public async Task<IActionResult> EditReply([FromRoute] int id, ReplyDto model)
        {
            var replyToEdit = await _dbContext.Reply.FirstOrDefaultAsync(x => x.Id == id);
            if (replyToEdit == null)
                return BadRequest("Wrong post Id");

            replyToEdit.Nick = model.Nick;
            replyToEdit.Body = model.Body;
            replyToEdit.Verified = model.Verified;

            await _dbContext.SaveChangesAsync();
            return Ok("Post edited ");
        }

        [HttpDelete("DeleteReply/{id}")]
        public async Task<IActionResult> DeleteReply(int id)
        {
            var replyToDelete = await _dbContext.Reply.FirstOrDefaultAsync(x => x.Id == id);
            if (replyToDelete == null)
                return BadRequest("Wrong reply Id");

            _dbContext.Reply.Remove(replyToDelete);
            await _dbContext.SaveChangesAsync();
            return Ok("Reply deleted ");
        }

        [HttpPost("VerifyReply/{id}")]
        public async Task<IActionResult> VerifyReply([FromRoute] int id, [FromBody] bool verify)
        {
            var replyToVerify = await _dbContext.Reply.FirstOrDefaultAsync(reply => reply.Id == id);
            if (replyToVerify == null)
                return BadRequest("Wrong comment Id");

            replyToVerify.Verified = verify;
            await _dbContext.SaveChangesAsync();

            return Ok($"Comment verified: {verify}");
        }

        [HttpGet("GetAllShops")]
        public async Task<IActionResult> GetAllShops()
        {
            var shop = await _dbContext.Shop.ToListAsync();
            if (shop.Count == 0)
                return NotFound("No elements found");
            return Ok(shop);
        }

        [HttpGet("GetShop/{id}")]
        public async Task<IActionResult> GetShop(int id)
        {
            var shop = await _dbContext.Shop.FirstOrDefaultAsync(reply => reply.Id == id);
            if (shop == null)
                return NotFound($"Element not found with Id: {id}");
            return Ok(shop);
        }

        [HttpGet("GetAllAdmins")]
        public async Task<IActionResult> GetAllAdmins()
        {
            var admin = await _dbContext.Admin.ToListAsync();
            if (admin.Count == 0)
                return NotFound("No element found");
            return Ok(admin);
        }

        [HttpGet("GetAdmin/{id}")]
        public async Task<IActionResult> GetAdmin(int id)
        {
            var admin = await _dbContext.Admin.FirstOrDefaultAsync(x => x.Id == id);
            if (admin == null)
                return NotFound($"Not found Admin with id: {id}");
            return Ok(admin);
        }
    }
}
