import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactType } from '../models/contact-type.model';
import { ContactTypeService } from './contact-type.service';

const baseURL = 'https://localhost:44391/api/Contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient,
              private contactTypeService: ContactTypeService)
  { }

  formData: Contact = new Contact();
  isContactForm: boolean;
  isReservationEditForm: boolean;
  contactTypes: ContactType[];
  birthDate: any;

  getAllContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(baseURL);
  }

  getContact(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${baseURL}/${id}`);
  }

  createContact(): Observable<Contact> {
    //console.log(this.formData);
    return this.httpClient.post<Contact>(baseURL, this.formData);
  }

  editContact(): Observable<Contact> {
    var id = this.formData.id;
    return this.httpClient.put<Contact>(`${baseURL}/${id}`, this.formData);
  }

  deleteContact(id: number): Observable<Contact> {
    console.log("delete contact id: " + id);
    return this.httpClient.delete<Contact>(`${baseURL}/${id}`);
  }

  searchByName(name: string): Observable<any> {
    return this.httpClient.get(`${baseURL}?name=${name}`);
  }

  getAllContactTypes(): Observable<ContactType[]> {
    return this.contactTypeService.getAllContactTypes();
  }

  getContactType(id: number): Observable<ContactType> {
    return this.contactTypeService.getContactType(id);
  }

}
