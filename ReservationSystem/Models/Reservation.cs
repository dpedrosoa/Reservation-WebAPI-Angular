using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ReservationSystem.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime ReservationDate { get; set; }

        [Range(0,5)]
        public int Ranking { get; set; }

        //1-True 0-False
        public int Favorite { get; set; }

        [Required]
        public int ContactId { get; set; }

        public Contact Contact { get; set; }
    }
}
