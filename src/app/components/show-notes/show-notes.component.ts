import { Component, Input, OnInit } from '@angular/core';

import { CitizenService } from './../../services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.scss'],
})
export class ShowNotesComponent implements OnInit {
  @Input() public id: number;
  someNote: string;

  constructor(
    public activeModal: NgbActiveModal,
    public service: CitizenService
  ) {}

  async ngOnInit(): Promise<void> {
    this.someNote = await this.service.getNoteByCitizenId(this.id);
  }
}
