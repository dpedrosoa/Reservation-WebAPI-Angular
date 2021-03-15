import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactType } from '../../../models/contact-type.model';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  contact: Contact;

  constructor(public service: ReservationService, public contactService: ContactService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.isContactForm = false;
    this.contactService.isReservationEditForm = true;
  }

  onSubmit(reservationForm: NgForm) {
    if (this.contactService.formData.id == 0) {
      //Edit reservation creating new contact
      this.createContact_editReservation(reservationForm);
    }
    else {
      //Edit reservation using existing contact
      this.contact = this.contactService.formData;
      this.editReservation(reservationForm);
    }
  }

  /**
   * Create new contact first, and then editing the reservation with that contact
   * @param form
   */
  createContact_editReservation(reservationForm: NgForm) {

    var myContact = new Contact();
    myContact.name = this.contactService.formData.name;
    myContact.typeId = this.contactService.formData.typeId;
    myContact.phoneNumber = this.contactService.formData.phoneNumber;
    myContact.birthDate = this.contactService.formData.birthDate;

    this.contactService.formData = myContact;

    this.contactService.createContact()
      .subscribe(
        response => {
          //console.log(response)
          this.toastr.success("Success!", "Contact created");
          this.contact = response;
          this.editReservation(reservationForm);
        },
        err => { console.log(err); }
      );
  }

  /**
   * Edit reservation
   * @param reservationForm
   */
  editReservation(reservationForm: NgForm) {
    this.service.formData.contactId = this.contact.id;
    this.service.formData.contact = this.contact;
    this.service.formData.reservationDate = new Date();//get current date time

    this.service.editReservation()
      .subscribe(
        response => {
          this.toastr.success("Success!", "Reservation edited ");
          this.router.navigate(['/reservations']);
        },
        err => { console.log(err); }
      );
  }

}
