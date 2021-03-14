import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ContactType } from '../../../models/contact-type.model';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ContactFormComponent implements OnInit {

  contactTypes: ContactType[];
  selectedContactType: ContactType;
  contacts: Contact[];
  isContactForm: boolean;
  isReservationEditForm: boolean;

  constructor(public service: ContactService)
  { }

  ngOnInit(): void {
    this.getAllContactTypes();
    this.getAllContacts();
    this.isContactForm = this.service.isContactForm;
    this.isReservationEditForm = this.service.isReservationEditForm;
    this.initializeBirthDate();
  }

  initializeBirthDate() {
    //Only initialize birthDate if there is formData available
    if (this.service.formData.id > 0) {
      var dt = new Date(this.service.formData.birthDate);

      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1);
      var d = dt.getDate();
      this.service.birthDate = { year: y, month: m, day: d };
    }
    else { //if no contact availabe set birthDate to null
      this.service.birthDate = null;
    }
  }


  getAllContacts() {
    this.service.getAllContacts()
      .subscribe(
        response => {
          this.contacts = response;
        },
        err => { console.log(err); });
  }

  
  getAllContactTypes() {
    this.service.getAllContactTypes()
      .subscribe(
        response => {
          this.contactTypes = response
        },
        err => { console.log(err); }
      )
  }

  /**
   * Search contact when the user is entering a contact name (using keyup event).
   * If contact name is found, auto fill the contact type, phone number and birthdate
   * @param event
   */
  searchContact(event: any) {
    if (!this.isContactForm) {
      var name = (event.target as HTMLInputElement).value;
      var found = false;
      for (let i = 0; i < this.contacts.length && !found; i++) {
        let contact = this.contacts[i];

        if (contact.name.toLowerCase() == name.toLowerCase()) {
          //found contact name
          found = true;
          this.service.formData.id = contact.id;
          this.service.formData.name = contact.name;
          this.service.formData.phoneNumber = contact.phoneNumber;
          this.service.formData.birthDate = contact.birthDate;
          this.initializeBirthDate();
          this.service.formData.typeId = contact.typeId;
        }
        else {
          //not found
          this.service.formData.id = 0;
          this.service.formData.name = name;//written value
          this.service.formData.phoneNumber = "";
          this.service.formData.birthDate = new Date();
          this.initializeBirthDate();
          this.service.formData.typeId = 0;
        }
      }
    }
  }

  /**
   * Used to validate contact on edit reservation form
   */
  contactNotExists() {
    return this.service.isReservationEditForm && this.service.formData.id == 0;
  }

}
