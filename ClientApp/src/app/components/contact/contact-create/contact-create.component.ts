import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  constructor(public service: ContactService,
    private toastr: ToastrService,
    private router: Router) { }

  //used to validate form input
  submitted = false;

  ngOnInit(): void {
    this.service.isContactForm = true;
    this.service.isReservationEditForm = false;//used to validate on reservation edit
  }

  onSubmit(form: NgForm) {
    this.createContact(form);
  }

  createContact(form: NgForm) {
    if (this.service.birthDate != null) {
      this.service.formData.birthDate = new Date(this.service.birthDate.year,
                                                (this.service.birthDate.month - 1),
                                                 this.service.birthDate.day);
    }
    this.service.createContact().subscribe(
      response => {
        //console.log(response);
        this.toastr.success("Success!", "Contact created");
        this.router.navigate(['/contacts']);
      },
      err => { console.log(err); }
    );
    
  }

}
