import { Component, OnInit } from '@angular/core';

import { Citizen } from '../../models';
import { CitizenService } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ShowNotesComponent } from '../show-notes/show-notes.component';

@Component({
  selector: 'app-citizen-list',
  templateUrl: './citizen-list.component.html',
  styleUrls: [],
  providers: [CitizenService],
})
export class CitizenListComponent implements OnInit {
  citizensModel: Citizen[];
  searchQuery: string;
  noSearchResult: boolean;

  public config: PaginationInstance = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(private service: CitizenService, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchCitizens();
  }

  async fetchCitizens(): Promise<void> {
    this.citizensModel = await this.service.getCitizens();

    if (this.citizensModel) {
      this.config.totalItems = this.citizensModel.length;
    }
  }

  setStatus(): void {
    this.noSearchResult = !this.noSearchResult;
    this.fetchCitizens();
  }

  openModal(id: number): void {
    const modalRef = this.modalService.open(ShowNotesComponent);
    modalRef.componentInstance.id = id;
  }
}
