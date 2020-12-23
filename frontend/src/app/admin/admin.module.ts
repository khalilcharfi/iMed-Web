import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PatientComponent } from './patient/patient.component';
import { ThemeModule } from 'app/@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbMenuModule,
  NbTabsetModule
} from '@nebular/theme';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { RequestComponent } from './request/request.component';
import { RescuerComponent } from './rescuer/rescuer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [AdminComponent, PatientComponent, DashboardAdminComponent, RequestComponent, RescuerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbTabsetModule,
    NgxDatatableModule
    // NgbModule
  ],
  providers: [
    // NgbActiveModal
  ]
})
export class AdminModule { }
