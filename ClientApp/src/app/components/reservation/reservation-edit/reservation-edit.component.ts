import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
      //console.log("edit contact: ");
      //console.log(this.contactService.formData);
      this.createContact_editReservation(reservationForm);
    }
    else {//editar reservacion usando contacto existente
      this.contact = this.contactService.formData;
      this.editReservation(reservationForm);
    }
  }

  /**
   * Create the contact then the reservation with that contact
   * @param form
   */
  createContact_editReservation(reservationForm: NgForm) {
    console.log("create contact")
    console.log(this.contactService.formData)
    this.contactService.createContact()
      .subscribe(
        response => {
          console.log("Se ha creado el contacto: ");
          console.log(response)
          this.contact = response;
          this.editReservation(reservationForm);
        },
        err => { console.log(err); }
      );
  }

  editReservation(reservationForm: NgForm) {
    this.service.formData.contactId = this.contact.id;
    this.service.formData.reservationDate = new Date();//get current date time
    //this.service.formData.type = this.contact.type;

    this.service.editReservation()
      .subscribe(
        response => {
          this.toastr.success("Success!", "Reservation edited");
          this.router.navigate(['/reservations']);
        },
        err => { console.log(err); }
      );
  }

}
