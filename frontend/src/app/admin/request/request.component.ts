import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  public requestAccepted = [{
    name: "patient1",
    dateAdded: new Date(),
    address: "bacolod city",
  },
  {
    name: "patient2",
    dateAdded: new Date(),
    address: "silay city",
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
