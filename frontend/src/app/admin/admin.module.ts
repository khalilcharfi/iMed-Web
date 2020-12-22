import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PatientComponent } from './patient/patient.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';


@NgModule({
  declarations: [AdminComponent, PatientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
  ]
})
export class AdminModule { }
