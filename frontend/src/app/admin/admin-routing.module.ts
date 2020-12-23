import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PatientComponent } from './patient/patient.component';
import { RequestComponent } from './request/request.component';
import { RescuerComponent } from './rescuer/rescuer.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
      },
      {
        path: 'patient',
        component: PatientComponent,
      },
      {
        path: 'request',
        component: RequestComponent,
      },
      {
        path: 'rescuer',
        component: RescuerComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
