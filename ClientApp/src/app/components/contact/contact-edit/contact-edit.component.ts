import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  constructor(public service: ContactService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.isContactForm = true;
    this.service.isReservationEditForm = false;
  }

  onSubmit(form: NgForm) {
    this.editContact(form);
  }

  editContact(form: NgForm) {
    this.service.formData.birthDate = new Date(this.service.birthDate.year,
                                              (this.service.birthDate.month - 1),
                                              this.service.birthDate.day);
    this.service.editContact().subscribe(
      response => {
        this.toastr.success("Success!", "Contact edited");
        this.router.navigate(['/contacts']);
      },
      err => { console.log(err); }
    );
  }

}
