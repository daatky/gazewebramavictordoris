import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorage } from '../locales/local-storage.service';
@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
    constructor(
        private localStorage: LocalStorage
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<MediaDeviceInfo>> {
        //const token = localStorage.getItem('auth_token'); // Aqui se debe obterner el token
        const token = this.localStorage.obtenerTokenAutenticacion()
        const apiKey = "d2e621a6646a4211768cd68e26f21228a81" // Aqui se debe obtener el ApiKey        
        const idioma = this.localStorage.obtenerIdiomaLocal() // Se obtiene el idioma
        // req = req.clone({
        //     headers: req.headers.set('Content-Type', 'application/json')
        // });


        if (apiKey) {
            //api key de autorizacion para consumo del api            
            req = req.clone({
                headers: req.headers.set('apiKey', apiKey)
            });
        }

        if (idioma) {
            //Idioma seleccionado por el usuario
            req = req.clone({
                headers: req.headers.set('idioma', idioma.codNombre)
            });
        }
        if (token) {
            //Token de autenticacion
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }
        //Cambios para manejar el handle error
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {                    
                    if(event.body){                        
                        if(event.body.codigoEstado){                            
                             console.log(event.body)
                            if(event.body.codigoEstado>=400){                                
                                throw event.body.respuesta.mensaje
                            }
                        }
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    //status: error.status
                };
                //this.errorDialogService.openDialog(data);
                console.log("Interceptor Error", data);
                return throwError(error);
            }));
    }
}