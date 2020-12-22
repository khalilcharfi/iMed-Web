import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
// import { GoogleChartInterface } from 'ng2-google-charts/lib/google-chart/google-chart.component';

@Component({
  selector: 'ngx-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  // public columnChart: GoogleChartInterface;
  public dataChart;
  user: any;
  title = "Dashboard";
  authorized = false;
  constructor(
    public authService: AuthService,
  ) {
    this.dataChart = [
      ['Element', 'Density', { role: 'style' }],
      ['Copper', 8.94, '#b87333'],            // RGB value
      ['Silver', 10.49, 'silver'],            // English color name
      ['Gold', 19.30, 'gold'],
      ['Platinum', 21.45, 'color: #e5e4e2' ], // CSS-style declaration
   ];
   }

  ngOnInit(): void {
    this.getUserData();
  }
  async getUserData() {
    this.authService.getUserData().subscribe((res: any) => {
      this.user = res[0];
      this.authPage();
      console.log(this.user);
    });
  }

  async authPage(){
    this.user.menus.map(m => {
      if(m === this.title){
        this.authorized = true;
      }
    });
  }
}
