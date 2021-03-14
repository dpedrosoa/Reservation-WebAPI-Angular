using ReservationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.IRepositories
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservationsAsync();

        Task<Reservation> GetReservationAsync(int Id);

        Task<Reservation> CreateReservationAsync(Reservation reservation);

        Task<int> UpdateReservationAsync(Reservation reservation);

        Task<int> DeleteReservationAsync(Reservation reservation);

        bool ReservationExists(int id);

    }
}
