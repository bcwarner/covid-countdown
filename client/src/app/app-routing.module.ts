import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'tcd', component: DisclaimerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
