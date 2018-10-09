import { Injectable, OnInit, OnDestroy} from '@angular/core';
import { WebsocketService } from '../../../services/websocket.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit, OnDestroy {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

  ngOnInit() {
    if (this.messages) {
      this.sendMsg('Client Service Initialized!');
    }
  }

  ngOnDestroy() {
    // this.wsService.destroySocket();
  }
}
