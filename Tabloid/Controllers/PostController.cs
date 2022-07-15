using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tabloid.Repositories;
using Tabloid.Models;
using System;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository, ITagRepository tagRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost("create")]
        public IActionResult Post(Post post)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            post.IsApproved = true;
            post.UserProfileId = currentUser.Id;
            post.CreateDateTime = DateTime.Now;
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
        }
        
        [HttpGet("user")]
        public IActionResult GetAllByUserId()
        {
            UserProfile currentUser = GetCurrentUserProfile();
            return Ok(_postRepository.GetAllPostsByUserId(currentUser.Id));
        }

        [HttpPost("{postId}/{tagId}")]
        public IActionResult AddTagToPost(int postId, int tagId)
        {
            Post post = _postRepository.GetById(postId);
            if (post.UserProfileId != GetCurrentUserProfile().Id)
            {
                return Unauthorized();
            }
            _postRepository.AddPostTag(postId, tagId);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }
    }
}
