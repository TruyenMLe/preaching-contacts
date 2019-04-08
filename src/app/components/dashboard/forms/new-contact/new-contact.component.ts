import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContactData } from '../../../../types';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  newContact: ContactData;
  members: any[];
  contactForm: FormGroup = this.fb.group({
    firstPartner: '',
    secondPartner: '',
    contactName: '',
    phoneNumber: '',
    emailAddress: '',
  });
  appointmentForm: FormGroup = this.fb.group({
    appointmentDate: '',
    appointmentTime: '',
    appointmentLocation: '',
    otherLocation: '',
    qualifiedPreaching: '',
  });
  additionalForm: FormGroup = this.fb.group({
    campusStudent: '',
    preachDifferentSubject: '',
    preachingLocation: '',
    gender: '',
    age: '',
    contactAge: '',
    preferredLanguageOption: '',
    preferredLanguage: '',
    occupation: '',
    religionOption: '',
    religion: ''
  });
  user: any;
  showPhoneNumberInput: boolean;
  showEmailAddressInput: boolean;
  showOtherLocation: boolean;
  showOtherSubjects: boolean;
  showCurrentAge: boolean;
  showOtherLanguage: boolean;
  showOtherReligion: boolean;

  constructor(private fb: FormBuilder) {
    this.user = {firstName: 'Tyler', lastName: 'Le'};
  }

  ngOnInit() {
    this.newContact = {firstName: this.user.firstName, lastName: this.user.lastName};
  }

  submitForm() {}

  toggleEmailAddress(emailChk, rejectChk) {
    this.showEmailAddressInput = emailChk.checked;

    if (rejectChk.checked) {
      rejectChk.toggle();
    }
  }

  togglePhoneNumber(phoneChk, rejectChk) {
    this.showPhoneNumberInput = phoneChk.checked;

    if (rejectChk.checked) {
      rejectChk.toggle();
    }
  }

  toggleRejectOption(phoneChk, emailChk) {
    if (this.showPhoneNumberInput) {
      this.showPhoneNumberInput = false;
      phoneChk.toggle();
    }

    if (this.showEmailAddressInput) {
      this.showEmailAddressInput = false;
      emailChk.toggle();
    }
  }

}
