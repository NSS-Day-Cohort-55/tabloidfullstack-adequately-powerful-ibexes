using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById(int id);
        void Add(Post post);
        void AddPostTag(int postId, int tagId);
        void Delete(int id);
        void Update(Post post);
        List<Post> GetAllPostsByUserId(int id);
    }
}
