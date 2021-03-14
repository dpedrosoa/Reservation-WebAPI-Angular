using Microsoft.AspNetCore.Mvc;
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
    public class ContactRepository : BaseRepository, IContactRepository
    {
        public ContactRepository(ReservationDbContext context) : base(context)
        {
        }

        public async Task<List<Contact>> GetContactsAsync()
        {
            //return await _context.Contacts.ToListAsync();

            var contacts = _context.Contacts.Include(c => c.Type).ToListAsync();
            return await contacts;
        }

        public async Task<Contact> GetContactAsync(int Id)
        {
            var contact = await _context.Contacts.Include(c => c.Type).FirstOrDefaultAsync(c => c.Id == Id);
            return contact;
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            var newContact = await _context.Contacts.Include(c => c.Type)
                                                    .FirstOrDefaultAsync(c => c.Id == contact.Id);
            return newContact;
        }

        public async Task<int> UpdateContactAsync(Contact contact)
        {
            int result = 0;
            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                result = await _context.SaveChangesAsync();
                return result;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(contact.Id))
                {
                    result = -1;
                    return result;
                }
                else
                {
                    throw;
                }
            }

            //_context.Update(contact);
            //int result = await _context.SaveChangesAsync();

            //return result > 0 ? true : false;
        }

        public async Task<int> DeleteContactAsync(Contact contact)
        {
            _context.Contacts.Remove(contact);
            int result = await _context.SaveChangesAsync();

            return result;
        }

        public bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }

    }
}
