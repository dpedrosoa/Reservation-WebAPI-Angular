using ReservationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.IRepositories
{
    public interface IContactRepository
    {
        //List<Contact> ListContacts();

        Task<List<Contact>> GetContactsAsync();

        Task<Contact> GetContactAsync(int Id);

        Task<Contact> CreateContactAsync(Contact contact);

        Task<int> UpdateContactAsync(Contact contact);

        Task<int> DeleteContactAsync(Contact contact);

        bool ContactExists(int id);

    }
}
