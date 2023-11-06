using BackProject.Db;
using BackProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace BackProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public DocumentsController(MyAppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDocuments()
        {
            try
            {
                var docs = _context.Document.ToList();
                if (docs.Count == 0)
                {
                    return NotFound("No element found");
                }
                return Ok(docs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{title}")]
        public async Task<IActionResult> UploadDocument(IFormFile file, string title)
        {
            try
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
                    _context.Document.Add(document);
                    await _context.SaveChangesAsync();

                    return Ok("File uploaded successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DownloadDocument/{id}")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            try
            {
                var document = await _context.Document.FindAsync(id);
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}