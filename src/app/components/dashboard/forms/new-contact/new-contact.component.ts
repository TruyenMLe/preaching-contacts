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
  newContactForm: FormGroup = this.fb.group({
    firstPartner: '',
    secondPartner: '',
    contactName: '',
    phoneNumber: '',
    emailAddress: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentLocationOption: '',
    appointmentLocation: '',
    campusStudent: '',
    qualifiedPreaching: '',
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

  constructor(private fb: FormBuilder) {
    this.user = {firstName: 'Tyler', lastName: 'Le'};
  }

  ngOnInit() {
    this.newContact = {firstName: this.user.firstName, lastName: this.user.lastName};
  }

  submitForm() {}

}
