import { Component, OnInit } from '@angular/core';

import { LogService } from './logs.service';

@Component({
  selector: 'app-logs-admin',
  templateUrl: './logs-admin.component.html',
  styleUrls: ['./logs-admin.component.css']
})
export class LogsAdminComponent implements OnInit {
  messages = '';
  messageCounter = 1;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.messages.subscribe(msg => {
      if (this.messageCounter <= 20) {
        this.messages += this.messageCounter + '> ' + msg.message + '\n';
        this.messageCounter++;
      } else {
        this.messages = this.messageCounter + '> ' + msg.message + '\n';
        this.messageCounter = 1;
      }
    });
  }
}
