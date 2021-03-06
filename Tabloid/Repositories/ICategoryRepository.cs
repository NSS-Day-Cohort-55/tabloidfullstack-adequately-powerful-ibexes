using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        void Add(Category name);
        Category GetCategoryById(int id);
        void Delete(int id);
        void UpdateCategory(Category cat);
    }
}
