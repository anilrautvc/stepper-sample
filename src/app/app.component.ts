import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { validateAtLeastOneChecked } from './checkbox-selected-validator';
import { IdentityService, DatagridResult } from './identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  identities$: Observable<DatagridResult> = this.identityService.identities;
  identityForm: FormGroup;
  createIdentityStepperOpen = false;
  createIdentityStepperFormDisplay = true;
  contacts: any[];
  cities: any[];

  editIdentityForm: FormGroup;
  editIdentityStepperOpen = false;
  editIdentityStepperFormDisplay = true;
  editedContacts: any[];
  editedCities: any[];
  identitySummary = '';

  constructor(private identityService: IdentityService, private formBuilder: FormBuilder) {
    this.identityForm = this.formBuilder.group({
      identityName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.maxLength(255)]]
      }),
      identityContact: this.formBuilder.group({
        checkSelectedContacts: this.formBuilder.array(
          [],
          [validateAtLeastOneChecked]
        )
      }),
      identityCity: this.formBuilder.group({
        checkSelectedCities: this.formBuilder.array(
          [],
          [validateAtLeastOneChecked]
        )
      }),
      identitySummary: this.formBuilder.group({})
    });

    this.editIdentityForm = this.formBuilder.group({
      identityName: this.formBuilder.group({
        name: ["", [Validators.required, Validators.maxLength(50)]],
        description: []
      }),
      identityContact: this.formBuilder.group({
        checkSelectedContacts: this.formBuilder.array(
          [],
          [validateAtLeastOneChecked]
        )
      }),
      identityCity: this.formBuilder.group({
        checkSelectedCities: this.formBuilder.array(
          [],
          [validateAtLeastOneChecked]
        )
      }),
      identitySummary: this.formBuilder.group({})
    });
  }

  ngOnInit() {
    this.getIdentities();
  }

  getIdentities() {
    this.identityService.query();
  }

  createIdentity() {
    console.log('Create Identity');
    this.createIdentityStepperOpen = !this.createIdentityStepperOpen;
    this.identities$.subscribe(identities => {
      this.contacts = identities.data[0].contacts;
      console.log(this.contacts);
      const controls = this.identityForm.get('identityContact').get('checkSelectedContacts') as FormArray;
      this.contacts.forEach((contact) => {
        contact.selected = false;
        controls.push(new FormControl(contact.selected));
      });
    });

    this.identities$.subscribe(identities => {
      this.cities = identities.data[0].cities;
      console.log(this.cities);
      const controls = this.identityForm.get('identityCity').get('checkSelectedCities') as FormArray;
      this.cities.forEach((city) => {
        city.selected = false;
        controls.push(new FormControl(city.selected));
      });
    });
  }

  clearCreateIdentityStepperAfterClose() {
    console.log('clearCreateIdentityStepperAfterClose');
    this.identityForm.reset();

    const contactControls = this.identityForm.get('identityContact').get('checkSelectedContacts') as FormArray;
    while (contactControls.length) {
      contactControls.removeAt(0);
    }
    this.contacts = [];

    const cityControls = this.identityForm.get('identityCity').get('checkSelectedCities') as FormArray;
    while (cityControls.length) {
      cityControls.removeAt(0);
    }
    this.cities = [];

    this.createIdentityStepperFormDisplay = false;
    setTimeout(() => this.createIdentityStepperFormDisplay = true);
  }

  createNewIdentity(){
    console.log('createNewIdentity');
    this.createIdentityStepperOpen = !this.createIdentityStepperOpen;
  }

  getSelectedContacts() {
    const result = [];
    this.identityForm
      .get('identityContact')
      .get('checkSelectedContacts')
      //.value.map((x, i) => x && this.contacts[i])
      //.filter(x => !!x);
      .value.map((x, i) =>  {
      this.contacts[i].selected = x;
      if (x && this.contacts[i]) {
        result.push(this.contacts[i].contact);
      }
    })
    .filter(x => !!x);
    return result.join(', ');
  }

  getSelectedCities() {
    const result = [];
    this.identityForm
      .get('identityCity')
      .get('checkSelectedCities')
      // .value.map((x, i) => x && this.cities[i])
      // .filter(x => !!x);
      .value.map((x, i) =>  {
      this.cities[i].selected = x;
      if (x && this.cities[i]) {
        result.push(this.cities[i].city);
      }
    })
    .filter(x => !!x);
    return result.join(', ');
  }

  editIdentity() {
    console.log('Edit Identity');
    this.editIdentityStepperOpen = !this.editIdentityStepperOpen;
    this.identitySummary = 'identitySummary';
    this.identities$.subscribe(identities => {
      //console.log(identities.data[1]);
      this.editIdentityForm.get('identityName').get('name').setValue(identities.data[1].name);
      this.editIdentityForm.get('identityName').get('description').setValue(identities.data[1].description);
      this.editedContacts = identities.data[1].contacts;
      console.log(this.editedContacts);
      const controls = this.editIdentityForm.get('identityContact').get('checkSelectedContacts') as FormArray;
      this.editedContacts.forEach((contact) => {
        //controls.push(new FormControl(contact.selected));
        controls.push(new FormControl(true));
      });
    });

    this.identities$.subscribe(identities => {
      this.editedCities = identities.data[1].cities;
      console.log(this.editedCities);
      const controls = this.editIdentityForm.get('identityCity').get('checkSelectedCities') as FormArray;
      this.editedCities.forEach((city) => {
        //controls.push(new FormControl(city.selected));
        controls.push(new FormControl(true));
      });
    });
  }

  clearEditIdentityStepperAfterClose() {
    console.log('clearEditIdentityStepperAfterClose');
    this.editIdentityForm.reset();

    const contactControls = this.editIdentityForm.get('identityContact').get('checkSelectedContacts') as FormArray;
    while (contactControls.length) {
      contactControls.removeAt(0);
    }
    this.editedContacts = [];

    const cityControls = this.editIdentityForm.get('identityCity').get('checkSelectedCities') as FormArray;
    while (cityControls.length) {
      cityControls.removeAt(0);
    }
    this.editedCities = [];

    this.identitySummary = '';

    this.editIdentityStepperFormDisplay = false;
    setTimeout(() => this.editIdentityStepperFormDisplay = true);
  }

  saveEditedIdentity() {
    console.log('saveEditedIdentity');
    this.editIdentityStepperOpen = !this.editIdentityStepperOpen;
  }

  getEditedSelectedContacts() {
    const result = [];
    this.editIdentityForm
      .get('identityContact')
      .get('checkSelectedContacts')
      // .value.map((x, i) => x && this.editedContacts[i])
      // .filter(x => !!x);
      .value.map((x, i) =>  {
      this.editedContacts[i].selected = x;
      if (x && this.editedContacts[i]) {
        result.push(this.editedContacts[i].contact);
      }
    })
    .filter(x => !!x);
      return result.join(', ');
  }

  getEditedSelectedCities() {
    const result = [];
    this.editIdentityForm
      .get('identityCity')
      .get('checkSelectedCities')
      // .value.map((x, i) => x && this.editedCities[i])
      // .filter(x => !!x);
      .value.map((x, i) =>  {
      this.editedCities[i].selected = x;
      if (x && this.editedCities[i]) {
        result.push(this.editedCities[i].city);
      }
    })
    .filter(x => !!x);
    return result.join(', ');
  }
}
