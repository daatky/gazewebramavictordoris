import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators'
import { PagoRepository } from "../repositorio/pago.repository";
import { CatalogoMetodoPagoEntity, MetodoPagoStripeEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { CatalogoMetodoPagoModel, PagoStripeModel } from '../modelo/catalogo-metodo-pago.model';
import { PaymentIntent } from "@stripe/stripe-js";
import { PerfilRepository } from '../repositorio/perfil.repository';
import { Cuenta } from 'src/app/nucleo/servicios/remotos/rutas/cuenta.enum';
import { UsuarioEntity, UsuarioCrearCuentaEntity } from '../entidades/usuario.entity';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { IdiomaRepository } from '../repositorio/idioma.repository';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity';

@Injectable({
    providedIn: 'root'
})
export class PagoNegocio {

    constructor(
        private metodoPagoRepository: PagoRepository,
        private perfilRepository: PerfilRepository,
        private idiomaRepository: IdiomaRepository
    ) {

    }

    obtenerCatalogoMetodoPago(): Observable<CatalogoMetodoPagoModel[]> {
        const data: CatalogoMetodoPagoModel[] = this.metodoPagoRepository.obtenerLocalMetodosPago()
        if (data) {
            return of(data)
        } else {
            return this.metodoPagoRepository.obtenerCatalogoMetodoPago()
                .pipe(
                    map((data: CatalogoMetodoPagoModel[]) => {
                        this.metodoPagoRepository.almacenarLocalmenteMetodosPago(data);
                        return data;
                    }),
                    catchError(err => {
                        return throwError(err)
                    })
                )
        }
    }

    prepararPagoStripe(data: any): Observable<MetodoPagoStripeEntity> {
        return this.metodoPagoRepository.prepararPagoStripe(data).pipe(
            map((data: MetodoPagoStripeEntity) => {
                return data;
            }),
            catchError(err => {
                return throwError(err)
            })
        );
    }

    prepararPagoPaypal(data: any): Observable<string> {
        return this.metodoPagoRepository.prepararPagoPaypal(data).pipe(
            map((data: string) => {
                return data;
            }),
            catchError(err => {
                return throwError(err)
            })
        )
    }

    preprerarInformacionCrearCuenta() {
        const tipoPerfiles: CatalogoTipoPerfilModel[] = this.perfilRepository.obtenerCatalogoTipoPerfilLocal();
        const idioma: CatalogoIdiomaEntity = this.idiomaRepository.obtenerIdiomaLocal();
        let usuario: UsuarioCrearCuentaEntity = {
            email: "",
            contrasena: "",
            idioma: idioma.codigo,
            menorEdad: false,
            perfilGrupo: true,
            // perfiles: tipoPerfiles.map((tipo) => tipo.perfil)
        }
    }
}