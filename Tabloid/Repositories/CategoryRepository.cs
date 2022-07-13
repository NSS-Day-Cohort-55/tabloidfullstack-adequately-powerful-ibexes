using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }


        public List<Category> GetAllCategories()
        {
            List<Category> categories = new List<Category>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * from Category Order By Name";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Category category = new Category
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };

                        categories.Add(category);
                    }
                    reader.Close();

                    return categories;

                }
            }

        }

        public void Add(string name)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Category (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name)";
                    DbUtils.AddParameter(cmd, "@name", name);
                    

                    cmd.ExecuteScalar();
                }
            }
        }
    } 
}
