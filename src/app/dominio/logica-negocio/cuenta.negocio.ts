import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaRepository } from "../repositorio/cuenta.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { CatalogoMetodoPagoModel } from '../modelo/catalogo-metodo-pago.model';
import { PerfilRepository } from '../repositorio/perfil.repository';
import { IdiomaRepository } from '../repositorio/idioma.repository';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity';
import { UsuarioCrearCuentaEntity, UsuarioEntity } from '../entidades/usuario.entity';
import { PerfilCrearCuentaEntity } from '../entidades/perfil.entity';
import { PerfilEntity } from '../entidades/perfil.entity';
import { PagoFacturacion } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { PagoModel } from '../modelo/pago.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenModel } from '../modelo/token.model';
import { PerfilModel } from '../modelo/perfil.model';
//CuentaRepository
//iniciarSesion
@Injectable({
    providedIn: 'root'
})
export class CuentaNegocio {
    //private observadorItem$ = new BehaviorSubject<string>('');
    constructor(private cuentaRepository: CuentaRepository,
        private perfilRepository: PerfilRepository,
        private idiomaRepository: IdiomaRepository,
        private repository: CuentaRepository
    ) { }

    iniciarSesion(email: string, contrasena: string): Observable<PerfilModel[]> {
        let data = { email: email, contrasena: contrasena }
        return this.cuentaRepository.iniciarSesion(data)
            .pipe(
                map(data => {
                    /*this.cuentaRepository.guardarTokenAutenticacion(data['datos']['token'])
                    this.cuentaRepository.guardarTokenRefresh(data['datos']['tokenRefresh'])*/
                    /*
                    if(data['token']&&data['tokenRefresh']&&data['datos']){
                        this.cuentaRepository.guardarTokenAutenticacion(data['token'])
                        this.cuentaRepository.guardarTokenRefresh(data['tokenRefresh'])
                        //this.cuentaRepository.almacenarCatalogoPerfiles(data['datos'])
                        this.cuentaRepository.almacenarCatalogoPerfiles(this.formatearPerfilesLocalStorage(data['datos']))
                    }      
                    */
                    return data.perfil
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
    /*guardarTokenAutenticacion(token:string){
        this.cuentaRepository.guardarTokenAutenticacion(token)
    }
    guardarTokenRefresh(token: string) {
        this.cuentaRepository.guardarTokenRefresh(token)
    }
    almacenarCatalogoPerfiles(tipoPerfiesUser: Array<any>) {
        this.cuentaRepository.almacenarCatalogoPerfiles(this.formatearPerfilesLocalStorage(tipoPerfiesUser))
    }*/
    formatearPerfilesLocalStorage(tipoPerfiesUser: Array<any>): Array<CatalogoTipoPerfilModel> {
        let catalogoTipoPerfilModel: Array<CatalogoTipoPerfilModel> = []
        for (let i = 0; i < tipoPerfiesUser.length; i++) {
            catalogoTipoPerfilModel.push({
                descripcion: tipoPerfiesUser[i]['traducciones'][0]['descripcion'],
                mostrarDescripcion: false,
                nombre: tipoPerfiesUser[i]['traducciones'][0]['nombre'],
                codigo: tipoPerfiesUser[i]['codigo'],
                perfil: tipoPerfiesUser[i]['perfil']
            })
        }
        return catalogoTipoPerfilModel
    }

    crearCuenta(metodoPago: string, pago?: PagoFacturacion): Observable<PagoModel> {
        const idioma: CatalogoIdiomaEntity = this.idiomaRepository.obtenerIdiomaLocal();
        let usuario: UsuarioEntity;

        usuario.idioma = {
            codigo: idioma.codigo
        };

        let usuarioCrear: UsuarioCrearCuentaEntity = {
            ...usuario,
            datosPago: {
                direccion: pago.direccion,
                nombres: pago.nombres,
                telefono: pago.telefono
            },
            metodoPago: {
                codigo: metodoPago
            },
        }
        console.log(usuarioCrear)

        return this.cuentaRepository.crearCuenta(usuarioCrear)
            .pipe(
                map(data => {
                    return data
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    activarCuenta(idTransaccion: string) {
        return this.cuentaRepository.activarCuenta({ "idTransaccion": idTransaccion })
            .pipe(
                map(data => {
                    return data
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    obtenerTokenAutenticacion(): Observable<string> {
        const tokenActual = this.repository.obtenerTokenAutenticacion()

        if (tokenActual) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(tokenActual);

            if (isExpired) {
                const tokenRefrescar = this.repository.obtenerTokenRefresh();
                return this.repository.refrescarToken(tokenRefrescar)
                    .pipe(
                        map((data: TokenModel) => {
                            this.repository.guardarTokenAutenticacion(data.token);
                            this.repository.guardarTokenRefresh(data.tokenRefresh);
                            return data.token
                        }),
                        catchError(err => {
                            return throwError(err)
                        })
                    )
            } else {
                return of(tokenActual);
            }
        } else {
            return of(tokenActual)
        }
    }
}