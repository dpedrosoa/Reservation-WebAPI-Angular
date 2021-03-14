using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Models;
using ReservationSystem.Persistence.IRepositories;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        //private readonly ReservationDbContext _context;

        //public ContactsController(ReservationDbContext context)
        //{
        //    _context = context;
        //}

        private readonly IContactRepository _contactRepo;
        private readonly IContactTypeRepository _contactTypeRepo;

        public ContactsController(IContactRepository contactRepository,
                                  IContactTypeRepository contactTypeRepository)
        {
            _contactRepo = contactRepository;
            _contactTypeRepo = contactTypeRepository;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _contactRepo.GetContactsAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _contactRepo.GetContactAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            string errorMessage;
            //Validate ContactId
            if (id != contact.Id)
            {
                errorMessage = string.Format("The {0} provided is not valid", nameof(contact.Id));
                ModelState.AddModelError(nameof(contact.Id), errorMessage);
            }
            //Validate TypeId
            if (contact.TypeId > 0)
            {
                var type = await _contactTypeRepo.GetContactTypeAsync(contact.TypeId);
                if (type == null)
                {
                    errorMessage = string.Format("The {0} provided is not valid", nameof(contact.TypeId));
                    ModelState.AddModelError(nameof(contact.TypeId), errorMessage);
                }
            }
            else {
                errorMessage = string.Format("The {0} field is required", nameof(contact.TypeId));
                ModelState.AddModelError(nameof(contact.TypeId), errorMessage);
            }

            //Validate Model
            if (ModelState.IsValid)
            {
                int result = await _contactRepo.UpdateContactAsync(contact);
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

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            string errorMessage;
            if (contact.TypeId > 0)
            {
                var type = await _contactTypeRepo.GetContactTypeAsync(contact.TypeId);
                if (type == null)
                {
                    errorMessage = string.Format("The {0} provided is not valid", nameof(contact.TypeId));
                    ModelState.AddModelError(nameof(contact.TypeId), errorMessage);
                }
            }
            else
            {
                errorMessage = string.Format("The {0} field is required", nameof(contact.TypeId));
                ModelState.AddModelError(nameof(contact.TypeId), errorMessage);
            }

            if (ModelState.IsValid)
            {
                var newContact = await _contactRepo.CreateContactAsync(contact);
                return CreatedAtAction("GetContact", new { id = newContact.Id }, newContact);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _contactRepo.GetContactAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            int result = await _contactRepo.DeleteContactAsync(contact);

            return NoContent();
        }

    }
}
