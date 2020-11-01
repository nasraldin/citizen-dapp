import { AddEntityComponent } from './add-entity/add-entity.component';
import { CitizenListComponent } from './citizen-list/citizen-list.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';

export const components: any[] = [
  CitizenListComponent,
  ShowNotesComponent,
  AddEntityComponent,
];

export * from './citizen-list/citizen-list.component';
export * from './show-notes/show-notes.component';
export * from './add-entity/add-entity.component';
