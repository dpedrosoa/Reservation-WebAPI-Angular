import { Contact } from "./contact.model";

export class Reservation {
  id: number = 0;
  //title: string = "";
  description: string = "";
  //picture: string = "";
  reservationDate: Date = new Date();
  ranking: number = 0;
  favorite: number = 0;
  contactId: number = 0;
  contact: Contact;

}
