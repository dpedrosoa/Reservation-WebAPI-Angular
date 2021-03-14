using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace ReservationSystem.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime? BirthDate { get; set; }
        
        [Required]
        public int TypeId { get; set; }
        
        public ContactType Type { get; set; }
        
        [JsonIgnore]
        public List<Reservation> Reservations { get; set; }
    }
}
