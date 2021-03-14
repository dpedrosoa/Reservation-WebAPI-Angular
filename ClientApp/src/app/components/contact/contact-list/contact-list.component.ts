import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(public service: ContactService,
    private toastr: ToastrService,
    private router: Router) { }

  contacts: Contact[];

  //used for pagination
  page: number;
  pageSize: number;
  listSize: number;

  //primeng
  first = 0;
  rows = 5;

  ngOnInit(): void {
    this.getAllContacts();
    this.clearSelectedRecord();

    this.page = 1;
    this.pageSize = 6;
  }

  getAllContacts(): void {
    this.service.getAllContacts()
      .subscribe(
        response => {
          this.contacts = response
          this.listSize = this.contacts.length;//used for pagination
        },
        err => { console.log(err); }
      )
  }

  getSelectedRecord(selectedRecord: Contact) {
    console.log(selectedRecord.typeId + "-" + selectedRecord.type.description);
    this.service.formData = Object.assign({}, selectedRecord);
  }

  clearSelectedRecord() {
    this.service.formData = new Contact();
  }

  deleteContact(id: number) {
    if (confirm("Are you sure to delete this contact?")) {
      this.service.deleteContact(id)
        .subscribe(
          response => {
            this.toastr.error("Success!", "Contact deleted");
            this.refreshList();
          },
          err => { console.log(err); }
        )
    }
  }

  refreshList() {
    this.service.getAllContacts()
      .toPromise()
      .then(
        response => {
          this.contacts = response as Contact[];
          this.listSize = this.contacts.length;//used for pagination
      }
    );
  }

  //-------- Pagination ------------
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.contacts ? this.first === (this.contacts.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.contacts ? this.first === 0 : true;
  }

}
