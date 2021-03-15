import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {

  contact: Contact;

  constructor(public service: ReservationService, public contactService: ContactService,
    private toastr: ToastrService, private router: Router)
  { }

  ngOnInit(): void {
    this.contactService.isContactForm = false;
  }

  onSubmit(reservationForm: NgForm) {
    if (this.contactService.formData.id == 0) {
      //Create reservation creating new contact
      this.createContact_createReservation(reservationForm);
    }
    else {
      //Create reservation using existing contact
      this.contact = this.contactService.formData;
      this.createReservation(reservationForm);
    }
  }
  
  /**
   * Create new contact first, and then create the reservation with that contact
   * @param reservationForm
   */
  createContact_createReservation(reservationForm: NgForm) {

    var myContact = new Contact();
    myContact.name = this.contactService.formData.name;
    myContact.typeId = this.contactService.formData.typeId;
    myContact.phoneNumber = this.contactService.formData.phoneNumber;
    myContact.birthDate = this.contactService.formData.birthDate;

    this.contactService.formData = myContact;

    this.contactService.createContact()
      .subscribe(
        response => {
          //console.log(response);
          this.toastr.success("Success!", "Contact created");
          this.contact = response;
          this.createReservation(reservationForm);
        },
        err => { console.log(err); }
      );
  }

  /**
   * Create reservation
   * @param reservationForm
   */
  createReservation(reservationForm: NgForm) {
    this.service.formData.contactId = this.contact.id;
    this.service.formData.reservationDate = new Date();//get current date time
    this.service.createReservation()
      .subscribe(
        response => {
          this.toastr.success("Success!", "Reservation created");
          this.router.navigate(['/reservations']);
        },
        err => { console.log(err); }
      );
  }
  

}
