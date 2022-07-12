using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        public Tag GetTagById(int id);
        void Add(Tag tag);
        void Delete(int id);
        void UpdateTag(Tag tag);

    }
}
