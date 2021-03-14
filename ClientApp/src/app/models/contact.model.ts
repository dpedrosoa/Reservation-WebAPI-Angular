import { ContactType } from "./contact-type.model";
import { Reservation } from "./reservation.model";

export class Contact {
  id: number = 0;
  name: string = "";
  phoneNumber: string = "";
  birthDate: Date;
  typeId: number = 0;
  type: ContactType;
  reservations: Reservation[];


}
