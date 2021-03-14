import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactTypeCreateComponent } from './components/contact-type/contact-type-create/contact-type-create.component';
import { ContactCreateComponent } from './components/contact/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ReservationCreateComponent } from './components/reservation/reservation-create/reservation-create.component';
import { ReservationEditComponent } from './components/reservation/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/reservations', pathMatch: 'full' },

  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/create', component: ContactCreateComponent },
  { path: 'contacts/edit/:id', component: ContactEditComponent },

  { path: 'reservations', component: ReservationListComponent }, 
  { path: 'reservations/create', component: ReservationCreateComponent },
  { path: 'reservations/edit/:id', component: ReservationEditComponent },

  { path: 'contact-types/create', component: ContactTypeCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
