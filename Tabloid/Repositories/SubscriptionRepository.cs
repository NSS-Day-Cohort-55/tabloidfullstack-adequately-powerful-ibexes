using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime)
                                    OUTPUT INSERTED.ID
                                    VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime)";
                    DbUtils.AddParameter(cmd, "@SubscriptionUserProfileId", subscription.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Subscription> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public Subscription GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Subscription WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    
                    using (var reader = cmd.ExecuteReader())
                    {
                        Subscription subscription = null;
                        if (reader.Read())
                        {
                            subscription = new Subscription()
                            {
                                Id = id,
                                SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                                ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                                BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                                EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime")

                            };
                        }
                        return subscription;
                    }
                }
            }
        }

        public List<Subscription> GetSubscriptionsByUserId(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Subscription subscription)
        {
            throw new System.NotImplementedException();
        }
    }
}
