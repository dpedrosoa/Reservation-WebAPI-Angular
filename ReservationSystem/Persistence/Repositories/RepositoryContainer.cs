using ReservationSystem.Persistence.IRepositories;
using ReservationSystem.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.Repositories
{
    /// <summary>
    /// Class that contains all the repositories to interact with the database
    /// </summary>
    public class RepositoryContainer
    {
        IReservationRepository reservationRepo = null;// new ReservationRepository();
        IContactRepository contactRepo = null;// new ContactRepository();

        internal IReservationRepository ReservationRepo { get => reservationRepo; set => reservationRepo = value; }
        internal IContactRepository ContactRepo { get => contactRepo; set => contactRepo = value; }
    }
}
