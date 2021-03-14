import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactType } from '../../../models/contact-type.model';
import { ContactTypeService } from '../../../services/contact-type.service';

@Component({
  selector: 'app-contact-type-create',
  templateUrl: './contact-type-create.component.html',
  styleUrls: ['./contact-type-create.component.css']
})
export class ContactTypeCreateComponent implements OnInit {

  constructor(public service: ContactTypeService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.service.createContactType().subscribe(
      res => {

      },
      err => { console.log(err); }
    );
  }

}
