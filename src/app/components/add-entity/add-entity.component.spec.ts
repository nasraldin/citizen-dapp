import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityComponent } from './add-entity.component';
import { CitizenService } from '../../services';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastService } from '../../services';

describe('AddEntityComponent', () => {
  let component: AddEntityComponent;
  let fixture: ComponentFixture<AddEntityComponent>;

  beforeEach(() => {
    const citizenServiceStub = () => ({ addCitizen: (citizen) => ({}) });
    // tslint:disable-next-line: variable-name
    const toastServiceStub = () => ({ show: (string, object) => ({}) });
    const formBuilderStub = () => ({});
    const locationStub = () => ({ back: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddEntityComponent],
      providers: [
        { provide: CitizenService, useFactory: citizenServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Location, useFactory: locationStub },
      ],
    });
    fixture = TestBed.createComponent(AddEntityComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`hasError has default value`, () => {
    expect(component.hasError).toEqual(false);
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const citizenServiceStub: CitizenService = fixture.debugElement.injector.get(
        CitizenService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const formGroupStub: FormGroup = {} as any;
      spyOn(citizenServiceStub, 'addCitizen').and.callThrough();
      spyOn(toastServiceStub, 'show').and.callThrough();
      component.onSubmit(formGroupStub);
      expect(citizenServiceStub.addCitizen).toHaveBeenCalled();
      expect(toastServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const locationStub: Location = fixture.debugElement.injector.get(
        Location
      );
      spyOn(locationStub, 'back').and.callThrough();
      component.back();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });
});
