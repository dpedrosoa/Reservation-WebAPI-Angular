using ReservationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.IRepositories
{
    public interface IContactTypeRepository
    {
        Task<List<ContactType>> GetAllContactTypesAsync();
        Task<ContactType> GetContactTypeAsync(int Id);
    }
}
