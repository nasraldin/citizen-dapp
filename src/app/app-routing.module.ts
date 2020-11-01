import { AddEntityComponent, CitizenListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: CitizenListComponent },
  { path: 'add', component: AddEntityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
