using ReservationSystem.Persistence.Contexts;
using ReservationSystem.Persistence.IRepositories;
using ReservationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReservationSystem.Persistence.Repositories
{
    public class ReservationRepository : BaseRepository, IReservationRepository
    {
        public ReservationRepository(ReservationDbContext context) : base(context)
        {
        }

        public async Task<List<Reservation>> GetReservationsAsync()
        {
            var list = _context.Reservations.Include(r => r.Contact)
                                            .Include(r => r.Contact.Type)
                                            .ToListAsync();
            return await list;
        }

        public async Task<Reservation> GetReservationAsync(int Id)
        {
            var reservation = await _context.Reservations.Include(r => r.Contact)
                                                         .Include(r => r.Contact.Type)
                                                         .FirstOrDefaultAsync(r => r.Id == Id);
            return reservation;
        }

        public async Task<Reservation> CreateReservationAsync(Reservation reservation)
        {
            //reservation.ReservationDate = new DateTime();
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            var newReservation = await _context.Reservations.Include(r => r.Contact)
                                                            .Include(r => r.Contact.Type)
                                                            .FirstOrDefaultAsync(r => r.Id == reservation.Id);
            return newReservation;
        }

        public async Task<int> UpdateReservationAsync(Reservation reservation)
        {
            int result = 0;
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                result = await _context.SaveChangesAsync();
                return result;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(reservation.Id))
                {
                    result = -1;
                    return result;
                }
                else
                {
                    throw;
                }
            }

        }

        public async Task<int> DeleteReservationAsync(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
            int result = await _context.SaveChangesAsync();

            return result;
        }

        public bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
