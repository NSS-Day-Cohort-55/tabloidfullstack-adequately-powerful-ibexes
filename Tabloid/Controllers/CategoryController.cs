using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _catRepository;
        

        public CategoryController(ICategoryRepository catRepository)
        {
            _catRepository = catRepository;
            
        }


        // GET: CategoryController

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_catRepository.GetAllCategories());
        }

        [HttpPost]
        public IActionResult Post(Category name)
        {
           
            _catRepository.Add(name);
            return NoContent();
            
        }

       

    }
}
