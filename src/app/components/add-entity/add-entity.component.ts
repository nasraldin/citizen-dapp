import { CitizenService, ToastService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Citizen } from './../../models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: [],
})
export class AddEntityComponent implements OnInit {
  hasError = false;
  btnSubmit = false;
  form = this.fb.group({
    age: ['', [Validators.required, Validators.min(18), Validators.max(150)]],
    city: ['', Validators.required],
    name: ['', Validators.required],
    someNote: ['', Validators.required],
  });
  citizen: Citizen;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private service: CitizenService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.form.valid) {
      this.hasError = !this.hasError;
    }
  }

  get formControl(): any {
    return this.form.controls;
  }

  async onSubmit(form: FormGroup): Promise<void> {
    this.btnSubmit = !this.btnSubmit;

    const citizen: Citizen = {
      age: form.controls.age.value,
      city: form.controls.city.value,
      name: form.controls.name.value,
      someNote: form.controls.someNote.value,
    };

    const added = await this.service.addCitizen(citizen);

    if (added) {
      this.btnSubmit = !this.btnSubmit;
      this.toastService.show('Successfully added', {
        classname: 'bg-success text-light',
        delay: 10000,
      });
    } else {
      this.toastService.show('an error occurred', {
        classname: 'bg-danger text-light',
        delay: 10000,
      });
    }
  }

  back(): void {
    this.location.back();
  }
}
