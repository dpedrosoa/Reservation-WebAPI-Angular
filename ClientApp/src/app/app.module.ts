import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { ContactFilterPipe } from './utils/contact-filter.pipe';
import { ContactCreateComponent } from './components/contact/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactTypeCreateComponent } from './components/contact-type/contact-type-create/contact-type-create.component';
import { ReservationCreateComponent } from './components/reservation/reservation-create/reservation-create.component';
import { ReservationEditComponent } from './components/reservation/reservation-edit/reservation-edit.component';
import { ReservationFormComponent } from './components/reservation/reservation-form/reservation-form.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    AppComponent,
    ContactCreateComponent,
    ContactListComponent,
    ReservationListComponent,
    ContactTypeCreateComponent,
    ContactEditComponent,
    ContactFormComponent,
    ReservationFormComponent,
    ReservationCreateComponent,
    ReservationEditComponent,
    ContactFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AutoCompleteModule,
    EditorModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
