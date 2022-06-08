import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'; 
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) {}

    getMessage() {
        return this.socket
            .fromEvent<any>("msg")
            .map(data => data.msg);
    }

    sendMessage(msg: string) {
        this.socket
            .emit("msg", msg);
    }
}
