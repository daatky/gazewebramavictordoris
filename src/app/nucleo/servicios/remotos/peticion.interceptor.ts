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
import { map, catchError, switchMap } from 'rxjs/operators';
import { LocalStorage } from '../locales/local-storage.service';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { APIGAZE } from './rutas/api-gaze.enum';
import { Cuenta } from './rutas/cuenta.enum';
@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
    constructor(
        private localStorage: LocalStorage,
        private cuentaNegocio: CuentaNegocio
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<MediaDeviceInfo>> {
        const apiKey = "d2e621a6646a4211768cd68e26f21228a81" // Aqui se debe obtener el ApiKey        

        if (apiKey) {
            //api key de autorizacion para consumo del api            
            req = req.clone({
                headers: req.headers.set('apiKey', apiKey)
            });
        }

        if (!req.url.startsWith("http") || req.url == (APIGAZE.BASE.toString() + Cuenta.REFRESCAR_TOKEN.toString())) {
            return next.handle(req).pipe(map((event: HttpEvent<any>) => {
                return event;
            }, (err: HttpErrorResponse) => {
                const message = err.error.message;
                return throwError(message);
            }))
        }

        return this.cuentaNegocio.obtenerTokenAutenticacion().pipe(switchMap((token) => {

            const idioma = this.localStorage.obtenerIdiomaLocal() // Se obtiene el idioma

            if (idioma) {
                //Idioma seleccionado por el usuario
                req = req.clone({
                    headers: req.headers.set('idioma', idioma.codNombre)
                });
            }

            //Se agrega el token 
            if (token) {
                //Token de autenticacion
                req = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
            }

            return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.body) {
                            if (event.body.codigoEstado) {
                                console.log(event.body)
                                if (event.body.codigoEstado >= 400) {
                                    throw event.body.respuesta.mensaje
                                }
                            }
                        }
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {  
                    console.log(error)                 
                    if ((error.status)||(error['codigoEstado']>=400)) {
                        if ((error.status === 401)||(error['codigoEstado']===401)) {
                            return throwError("No tienes autorizacion");
                        } else {
                            if ((error.status === 404)||(error['codigoEstado']===404)) {
                                return throwError("No encontrado");
                            } else {
                                return throwError("Lo sentimos ocurrio un error al procesar tu solicitid, intenta mas tarde");
                            }
                        }
                    }
                    console.log("------")
                    return throwError(error)
                }));
        }))


    }

}