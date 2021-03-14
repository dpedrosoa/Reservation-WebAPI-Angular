import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactType } from '../models/contact-type.model';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {

  constructor(private http: HttpClient) { }

  formData: ContactType = new ContactType();

  readonly baseURL = 'https://localhost:44391/api/ContactTypes';

  //getAllContactTypes(): Observable<ContactType[]> {
  //  var list = this.http.get<ContactType[]>(this.baseURL);
  //  return list;
  //}
  getAllContactTypes(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>(this.baseURL);
  }

  createContactType() {
    console.log("Descrip: " + this.formData.description);
    var contactType = this.http.post(this.baseURL, this.formData);
    return contactType;
  }


}
