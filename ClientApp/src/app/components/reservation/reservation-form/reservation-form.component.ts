import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  contacts: Contact[];

  //-------------------------------------
  //selectedContact: Contact;

  //filteredContacts: Contact[];
  //-------------------------------------

  constructor(public service: ReservationService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.service.getAllContacts()
      .subscribe(
        response => {
          //console.log(response);
          this.contacts = response;
        },
        err => { console.log(err); });
  }

  //search(event: any) {
  //  console.log('event', event);
  //  this.output = this.contacts.filter(c => c.name.startsWith(event.query));
  //}

  //-----------------------

  //filterContact(event: any) {
  //  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //  let filtered: Contact[] = [];
  //  let query = event.query;
  //  for (let i = 0; i < this.contacts.length; i++) {
  //    let contact = this.contacts[i];
  //    if (contact.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //      filtered.push(contact);
  //    }
  //  }

  //  this.filteredContacts = filtered;
  //  if (filtered.length == 1) {
  //    //found contact

  //  }
  //}


}

