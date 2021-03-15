import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../../models/contact.model';
import { Reservation } from '../../../models/reservation.model';
import { ContactService } from '../../../services/contact.service';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(public service: ReservationService, public contactService: ContactService,
              private toastr: ToastrService,
              private ratingConfig: NgbRatingConfig) {

      this.ratingConfigure();
  }

  reservations: Reservation[];


  ngOnInit(): void {
    this.getAllReservations();
    this.clearSelectedRecord();
  }

  getAllReservations(): void {
    this.service.getAllReservations()
      .subscribe(
        response => {
          this.reservations = response
        },
        err => { console.log(err); }
      )
  }

  getSelectedRecord(selectedRecord: Reservation) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.contactService.formData = selectedRecord.contact;
    this.contactService.formData.type = selectedRecord.contact.type;
  }

  clearSelectedRecord() {
    this.service.formData = new Reservation();
    this.contactService.formData = new Contact();
  }

  /**
   * Add or remove reservation from favorites
   * @param reservation
   */
  addFavorite(reservation: Reservation) {
    if (reservation.favorite == 0) {
      reservation.favorite = 1;//Add to favorites
    } else {
      reservation.favorite = 0;//Remove from favorites
    }

    this.service.formData = Object.assign({}, reservation);
    this.service.editReservation().subscribe(
      response => {
        if (reservation.favorite == 1) {
          this.toastr.success("Success!", "Reservation added to favorites");
        }
        else{
          this.toastr.error("Success!", "Reservation removed from favorites");
        }
        this.refreshList();
      },
      err => { console.log(err); }
    );
    this.refreshList();
  }

  ratingConfigure() {
    //used for reservation Ranking
    this.ratingConfig.max = 5;
    this.ratingConfig.resettable = true;
  }

  /**
   * Set Reservation ranking
   * @param reservation
   */
  setRanking(reservation: Reservation) {
    this.service.editReservationObject(reservation)
        .subscribe(
        response => {
            this.toastr.success("Success!", "Reservation ranked");
            this.refreshList();
        },
        err => { console.log(err); }
      );
  }

  refreshList() {
    this.service.getAllReservations()
      .toPromise()
      .then(
        response => {
          this.reservations = response as Reservation[];
        }
      );
  }
    

  sortBy_Date_Asc() {
    var sortedList: Reservation[] = this.reservations.sort(
      (n1, n2) => {
      if (n1.reservationDate < n2.reservationDate) {
        return -1;
      }
      if (n1.reservationDate > n2.reservationDate) {
        return 1;
      }
      return 0;
      }
    );

    this.reservations = sortedList;
  }

  sortBy_Date_Desc() {
    var sortedList: Reservation[] = this.reservations.sort(
      (n2, n1) => {
        if (n1.reservationDate < n2.reservationDate) {
          return -1;
        }
        if (n1.reservationDate > n2.reservationDate) {
          return 1;
        }
        return 0;
      }
    );

    this.reservations = sortedList;
  }

  sortBy_Contact_Asc() {
    var sortedList: Reservation[] = this.reservations.sort(
      (n1, n2) => {
        if (n1.contact.name < n2.contact.name) {
          return -1;
        }
        if (n1.contact.name > n2.contact.name) {
          return 1;
        }
        return 0;
      }
    );

    this.reservations = sortedList;
  }

  sortBy_Contact_Desc() {
    var sortedList: Reservation[] = this.reservations.sort(
      (n2, n1) => {
        if (n1.contact.name < n2.contact.name) {
          return -1;
        }
        if (n1.contact.name > n2.contact.name) {
          return 1;
        }
        return 0;
      }
    );

    this.reservations = sortedList;
  }

  sortBy_Ranking_Desc() {
    var sortedList: Reservation[] = this.reservations.sort(
      (n2, n1) => {
        return n1.ranking - n2.ranking;
      }
    );

    this.reservations = sortedList;
  }

}
