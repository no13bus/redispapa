import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { WrappedSocket } from './socket-io.service';
import { SocketIoConfig } from './socketIoConfig';


/** Socket factory */
export function SocketFactory(config: SocketIoConfig) {
    return new WrappedSocket(config);
}

export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG__');

@NgModule({})
export class SocketIoModule {
    static forRoot(config: SocketIoConfig): ModuleWithProviders {
        return {
            ngModule: SocketIoModule,
            providers: [
                { provide: SOCKET_CONFIG_TOKEN, useValue: config },
                { 
                    provide: WrappedSocket,
                    useFactory: SocketFactory,
                    deps : [SOCKET_CONFIG_TOKEN]
                }
            ]
        };
    }
 }