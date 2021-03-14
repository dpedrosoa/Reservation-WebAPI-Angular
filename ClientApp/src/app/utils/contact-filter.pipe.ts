import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({ name: 'contactFilter' })
export class ContactFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {Contact[]} contacts
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(contacts: Contact[], searchText: string): Contact[] {
    if (!contacts) {
      return [];
    }
    if (!searchText) {
      return contacts;
    }

    searchText = searchText.toLocaleLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
