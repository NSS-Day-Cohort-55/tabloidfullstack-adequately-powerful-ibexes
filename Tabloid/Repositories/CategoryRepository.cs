using Microsoft.Data.SqlClient;
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

        public void Add(Category cat)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Category (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name)";
                    DbUtils.AddParameter(cmd, "@name", cat.Name);
                    

                    cmd.ExecuteScalar();
                }
            }
        }

        public Category GetCategoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Name
                    FROM Category
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Category cat = null;
                        if (reader.Read())
                        {
                            cat = new Category()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                        }

                        return cat;
                    }
                }

            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Category
                        WHERE Id = @Id;

                        DELETE FROM Post
                        WHERE CategoryId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateCategory(Category cat)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Category
                        SET Name = @Name
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", cat.Name);
                    DbUtils.AddParameter(cmd, "@Id", cat.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    } 
}
 