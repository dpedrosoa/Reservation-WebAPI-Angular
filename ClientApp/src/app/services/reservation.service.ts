import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

const baseURL = 'https://localhost:44391/api/Reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient,
              public contactService: ContactService)
  { }

  formData: Reservation = new Reservation();


  getAllReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(baseURL);
  }

  //getReservation(id: number): Observable<Reservation[]> {
  //  return this.httpClient.get<Reservation[]>(`${baseURL}/${id}`);
  //}

  createReservation(): Observable<Reservation> {
    return this.httpClient.post<Reservation>(baseURL, this.formData);
  }

  editReservation(): Observable<Reservation> {
    var id = this.formData.id;
    return this.httpClient.put<Reservation>(`${baseURL}/${id}`, this.formData);
  }

  editReservationObject(reservation: Reservation) {
    var id = reservation.id;
    return this.httpClient.put<Reservation>(`${baseURL}/${id}`, reservation);

  }

  getAllContacts(): Observable<Contact[]> {
    return this.contactService.getAllContacts();
  }

}
