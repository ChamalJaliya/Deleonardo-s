import { MapComponent } from "./containers/map/map.component";
import { ContactFormComponent } from "./containers/contact-form/contactform.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  CardsModule,
  ButtonsModule,
  InputsModule,
  CheckboxModule
} from "angular-bootstrap-md";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ContactComponent } from "./containers/contact.component";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    CheckboxModule,
    CardsModule,
    AgmCoreModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ContactComponent, ContactFormComponent, MapComponent],
  exports: [ContactComponent]
})
export class ContactModule {}
