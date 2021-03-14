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
      //console.log("create contact: " + this.contactService.formData);// + "-TypeId: " + this.contactService.formData.typeId);
      this.createContact_createReservation(reservationForm);
    }
    else {
      this.contact = this.contactService.formData;
      this.createReservation(reservationForm);
    }
  }
  
  /**
   * Create the contact before creating the reservation
   * @param reservationForm
   */
  createContact_createReservation(reservationForm: NgForm) {
    console.log(this.contactService.formData);
    this.contactService.createContact()
      .subscribe(
        response => {
          //console.log("Se ha creado el contacto: ");
          //console.log(response);
          this.contact = response;
          this.createReservation(reservationForm);
        },
        err => { console.log(err); }
      );
  }


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
