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
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subscriptionRepo;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IUserProfileRepository userProfileRepository)
        {
            _subscriptionRepo = subscriptionRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            subscription.SubscriberUserProfileId = currentUser.Id;
            subscription.BeginDateTime = DateTime.Now;
            _subscriptionRepo.Add(subscription);
            return CreatedAtAction(nameof(Get), new { id = subscription.Id }, subscription);
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            Subscription subscription = _subscriptionRepo.GetById(id);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(_subscriptionRepo.GetById(id));
        }
        [HttpGet]
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}
