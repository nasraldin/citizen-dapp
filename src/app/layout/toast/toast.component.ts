import { Component, HostBinding, TemplateRef } from '@angular/core';

import { ToastService } from '../../services';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: [],
})
export class ToastsContainerComponent {
  @HostBinding('class.ngb-toasts') true;

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
