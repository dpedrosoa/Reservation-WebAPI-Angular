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

  constructor(public service: ReservationService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.service.getAllContacts()
      .subscribe(
        response => {
          this.contacts = response;
        },
        err => { console.log(err); });
  }

}

