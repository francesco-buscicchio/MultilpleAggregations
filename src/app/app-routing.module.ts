import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregationsComponent } from './aggregations/aggregations.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: "aggregation", component: AggregationsComponent },
  { path: "", component: AggregationsComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
