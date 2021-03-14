using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Models;
using ReservationSystem.Persistence.Contexts;
using ReservationSystem.Persistence.IRepositories;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly IContactRepository _contactRepo;

        public ReservationsController(IReservationRepository reservationRepository,
                                      IContactRepository contactRepository)
        {
            _reservationRepo = reservationRepository;
            _contactRepo = contactRepository;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _reservationRepo.GetReservationsAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _reservationRepo.GetReservationAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            string errorMessage;
            //Validate ReservationId
            if (id != reservation.Id)
            {
                errorMessage = string.Format("The {0} provided is not valid", nameof(reservation.Id));
                ModelState.AddModelError(nameof(reservation.Id), errorMessage);
            }
            //Validate ContactId
            if (reservation.ContactId > 0)
            {
                var type = await _contactRepo.GetContactAsync(reservation.ContactId);
                if (type == null)
                {
                    errorMessage = string.Format("The {0} provided is not valid", nameof(reservation.ContactId));
                    ModelState.AddModelError(nameof(reservation.ContactId), errorMessage);
                }
            }
            else
            {
                errorMessage = string.Format("The {0} field is required", nameof(reservation.ContactId));
                ModelState.AddModelError(nameof(reservation.ContactId), errorMessage);
            }

            //Validate Model
            if (ModelState.IsValid)
            {
                int result = await _reservationRepo.UpdateReservationAsync(reservation);
                if (result == -1)
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest(ModelState);
            }

            return NoContent();
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            string errorMessage;
            //Validate ContactId
            if (reservation.ContactId > 0)
            {
                var type = await _contactRepo.GetContactAsync(reservation.ContactId);
                if (type == null)
                {
                    errorMessage = string.Format("The {0} provided is not valid", nameof(reservation.ContactId));
                    ModelState.AddModelError(nameof(reservation.ContactId), errorMessage);
                }
            }
            else
            {
                errorMessage = string.Format("The {0} field is required", nameof(reservation.ContactId));
                ModelState.AddModelError(nameof(reservation.ContactId), errorMessage);
            }

            //Validate Model
            if (ModelState.IsValid)
            {
                var newReservation = await _reservationRepo.CreateReservationAsync(reservation);

                return CreatedAtAction("GetReservation", new { id = newReservation.Id }, newReservation);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _reservationRepo.GetReservationAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }
            int result = await _reservationRepo.DeleteReservationAsync(reservation);

            return NoContent();
        }

    }
}
