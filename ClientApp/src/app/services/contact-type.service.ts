import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactType } from '../models/contact-type.model';

const baseURL = 'https://localhost:44391/api/ContactTypes';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {

  constructor(private http: HttpClient) { }

  formData: ContactType = new ContactType();


  getAllContactTypes(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>(baseURL);
  }

  getContactType(id: number): Observable<ContactType> {
    return this.http.get<ContactType>(`${baseURL}/${id}`);
  }

  createContactType() {
    //console.log("Descrip: " + this.formData.description);
    var contactType = this.http.post(baseURL, this.formData);
    return contactType;
  }


}
