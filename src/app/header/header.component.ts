import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: any;

  constructor(private httpService: HttpService) {  }
  alertsreport: any;
  ngOnInit() {
    this.httpService.headervar.subscribe(data => {
      this.alertsreport = data;
     });
  }
  ngAfterViewInit() {
  }
  getLoggedInUser() {
        this.httpService.getLoggedInUser().subscribe(user => {
          console.log(user);
          this.user = user;
        },
        error => {
          console.log(error);
        });
      }

  }
