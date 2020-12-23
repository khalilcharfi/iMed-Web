import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-rescuer',
  templateUrl: './rescuer.component.html',
  styleUrls: ['./rescuer.component.scss']
})
export class RescuerComponent implements OnInit {
  public rescuers= [{
    name: "rescuer1",
    plateNo: "061004",
    address: "bacolod city",
    driverLicenseNo: "33213100154",
    dateAdded: "December 22, 2020"
  },
  {
    name: "rescuer2",
    plateNo: "060105",
    address: "bacolod city",
    driverLicenseNo: "454651",
    dateAdded: "December 22, 2020"
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
