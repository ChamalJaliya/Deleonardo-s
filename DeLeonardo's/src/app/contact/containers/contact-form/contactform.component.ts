import { ConnectionService } from "./../../services/connection.service";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contactform.component.html",
  styleUrls: ["./contactform.component.scss"]
})
export class ContactFormComponent {
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;

  @HostListener("input") oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService
  ) {
    this.contactForm = this.fb.group({
      contactFormName: ["", Validators.required],
      contactFormEmail: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ],
      contactFormSubjects: ["", Validators.required],
      contactFormMessage: ["", Validators.required],
      contactFormCopy: [""]
    });
  }

  onSubmit() {
    this.connectionService.sendMessage(this.contactForm.value).subscribe(
      () => {
        alert("Your message has been sent.");
        this.contactForm.reset();
        this.disabledSubmitButton = true;
      },
      error => {
        console.log("Error", error);
      }
    );
  }
}
