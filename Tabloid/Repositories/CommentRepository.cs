using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetAllByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                                               
                                               up.DisplayName,

                                               p.title
                                        
                                        FROM Comment c
                                        JOIN UserProfile up ON up.Id = c.UserProfileId
                                        JOIN Post p ON p.Id = c.PostId
                                        WHERE c.PostId = @id
                                        ORDER BY c.CreateDateTime";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var comments = new List<Comment>();
                        while (reader.Read())
                        {
                            comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                Post = new Post()
                                {
                                    Title = DbUtils.GetString(reader, "title")
                                }
                            });
                        }
                        return comments;
                    }
                }
            }
        }
    }
}
