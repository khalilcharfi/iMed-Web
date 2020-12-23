import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public patients = [
    {
      name: "patient1",
      contact: "09463512354",
      address: "bacolod city",
      email: "patient1@gmail.om",
      dateAdded: "December 22, 2020"
    },
    {
      name: "patient2",
      contact: "09273165231",
      address: "bacolod city",
      email: "patient1@gmail.om",
      dateAdded: "December 22, 2020"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
