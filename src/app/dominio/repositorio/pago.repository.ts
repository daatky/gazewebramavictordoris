import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoService } from '../../nucleo/servicios/remotos/pago.service';
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CatalogoMetodoPagoEntity, CatalogoMetodoPagoMapperService, MetodoPagoStripeEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { CatalogoMetodoPagoModel, PagoStripeModel } from '../modelo/catalogo-metodo-pago.model';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({
    providedIn: 'root'
})
export class PagoRepository {

    prepararPagoPaypal(data: any): Observable<string> {
        return this.pagoServicie.prepararPagoPaypal(data)
            .pipe(
                map(data => {
                    return data.respuesta.datos.orderID;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }


    constructor(
        protected http: HttpClient,
        private pagoServicie: PagoService,
        private mapper: CatalogoMetodoPagoMapperService,
        private local: LocalStorage
    ) {

    }

    obtenerCatalogoMetodoPago(): Observable<CatalogoMetodoPagoModel[]> {
        return this.pagoServicie.obtenerCatalogoMetodosPago()
            .pipe(
                map(data => {
                    return this.mapper.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    almacenarLocalmenteMetodosPago(metodos: CatalogoMetodoPagoModel[]) {
        this.local.almacenarMetodosPago(metodos);
    }

    obtenerLocalMetodosPago(): CatalogoMetodoPagoModel[] {
        return this.local.obtenerMetodosPago();
    }

    eliminarVariableStorage(llave:string){
        this.local.eliminarVariableStorage(llave)
    }

    prepararPagoStripe(data: PagoStripeModel): Observable<MetodoPagoStripeEntity> {
        return this.pagoServicie.prepararPagoStripe(data).pipe(
            map(data => {
                return data.respuesta.datos;
            }),
            catchError(err => {
                return throwError(err)
            })
        )
    }

}