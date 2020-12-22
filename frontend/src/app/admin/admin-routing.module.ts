import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PatientComponent } from './patient/patient.component';

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
      // {
      //   path: 'quake',
      //   component: QuakeComponent,
      // },
      // {
      //   path: 'archive-quake',
      //   component: ArchiveQuakeComponent,
      // },
      // {
      //   path: 'shelter',
      //   component: ShelterComponent,
      // },
      // {
      //   path: 'archive-shelter',
      //   component: ArchiveShelterComponent,
      // },
      // {
      //   path: 'relief',
      //   component: ReliefComponent,
      // },
      // {
      //   path: 'archive-relief',
      //   component: ArchiveReliefComponent,
      // },
      // {
      //   path: 'emergency-contact',
      //   component: EmergencyContactComponent,
      // },
      // {
      //   path: 'donation',
      //   component: DonationComponent,
      // },
      // {
      //   path: 'users',
      //   component: UsersComponent,
      // },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      // },
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
