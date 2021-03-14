using Microsoft.EntityFrameworkCore;
using ReservationSystem.Models;
using ReservationSystem.Persistence.Contexts;
using ReservationSystem.Persistence.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.Repositories
{
    public class ContactTypeRepository : BaseRepository, IContactTypeRepository
    {
        public ContactTypeRepository(ReservationDbContext context) : base(context)
        {
        }

        public async Task<List<ContactType>> GetAllContactTypesAsync()
        {
            var contactTypes = _context.ContactTypes.ToListAsync();
            return await contactTypes;
        }

        public async Task<ContactType> GetContactTypeAsync(int Id)
        {
            var contactType = _context.ContactTypes.FirstOrDefaultAsync(t=>t.Id == Id);
            return await contactType;
        }
    }
}
