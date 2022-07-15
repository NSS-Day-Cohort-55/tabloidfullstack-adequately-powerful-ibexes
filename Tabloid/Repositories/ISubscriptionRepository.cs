using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        List<Subscription> GetAll();
        Subscription GetById(int id);
        void Add(Subscription subscription);
        void Delete(int id);
        void Update(Subscription subscription);
        List<Subscription> GetSubscriptionsByUserId(int id);
    }
}
