using BackProject.Db;
using BackProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

namespace BackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly MyAppDbContext _dbContext;

        public DocumentsController(MyAppDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDocuments()
        {
            var docs = await _dbContext.Document.ToListAsync();
            if (docs.Count == 0)
                return NotFound("No element found");
            return Ok(docs);
        }

        [HttpPost("{title}")]
        public async Task<IActionResult> UploadDocument(IFormFile file, string title)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File not selected");

            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var fileBytes = ms.ToArray();

                var fileExtension = Path.GetExtension(file.FileName).Trim().TrimStart('.');

                var document = new Document
                {
                    Doc = fileBytes,
                    Extension = fileExtension,
                    Title = title
                };
                _dbContext.Document.Add(document);
                await _dbContext.SaveChangesAsync();

                return Ok("File uploaded successfully");
            }
        }

        [HttpGet("DownloadDocument/{id}")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            var document = await _dbContext.Document.FindAsync(id);
            if (document == null)
            {
                return NotFound("Document not found");
            }

            var contentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = document.Title + "." + document.Extension
            };

            Response.Headers.Add("Content-Disposition", contentDisposition.ToString());

            return File(document.Doc, "application/octet-stream");
        }
    }
}