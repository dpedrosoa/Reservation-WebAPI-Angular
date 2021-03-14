using ReservationSystem.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.Repositories
{
    /// <summary>
    /// Abstract class to access the ReservationDbContext only through the children repositories that inherit from BaseRepository
    /// </summary>
    public abstract class BaseRepository
    {
        protected readonly ReservationDbContext _context;

        public BaseRepository(ReservationDbContext context)
        {
            _context = context;
        }
    }
}
