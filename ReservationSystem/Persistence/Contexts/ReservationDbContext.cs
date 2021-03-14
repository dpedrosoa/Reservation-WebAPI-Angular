using Microsoft.EntityFrameworkCore;
using ReservationSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Persistence.Contexts
{
    public class ReservationDbContext : DbContext
    {
        public ReservationDbContext(DbContextOptions options):base (options)
        {
        }

        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactType> ContactTypes { get; set; }

        //Seed dummy data into DB
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ContactType>().HasData(
                new ContactType() { Id = 1, Description = "Premium" },
                new ContactType() { Id = 2, Description = "Regular" }
            );


        }

    }
}
