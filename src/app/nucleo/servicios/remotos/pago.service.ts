import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { Pago } from "./rutas/pago.enum";
import { RespuestaRemota } from '../../util/respuesta';
import { CatalogoMetodoPagoEntity, MetodoPagoStripeEntity } from 'src/app/dominio/entidades/catalogos/catalogo-metodo-pago.entity';
import { PagoStripeModel } from 'src/app/dominio/modelo/catalogo-metodo-pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {

    constructor(private http: HttpClient) {

    }

    obtenerCatalogoMetodosPago(): Observable<RespuestaRemota<CatalogoMetodoPagoEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoMetodoPagoEntity[]>>(APIGAZE.BASE + Catalogo.METODOS_PAGOS.toString());
    }

    prepararPagoStripe(data: PagoStripeModel): Observable<RespuestaRemota<MetodoPagoStripeEntity>> {
        return this.http.post<any>(APIGAZE.BASE + Pago.PREPARAR_STRIPE.toString(), data);
    }

    prepararPagoPaypal(data: any): Observable<RespuestaRemota<any>> {
        return this.http.post<any>(APIGAZE.BASE + Pago.PREPARAR_PAYPAL.toString(), data);
    }

}