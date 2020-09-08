import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { UsuarioModel, UsuarioModelMapperService } from './../modelo/usuario.model';
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaRepository } from "../repositorio/cuenta.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { PerfilRepository } from '../repositorio/perfil.repository';
import { IdiomaRepository } from '../repositorio/idioma.repository';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity';
import { PagoFacturacionEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { PagoModel } from '../modelo/pago.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenModel } from '../modelo/token.model';
import { Codigos2CatalogoIdioma } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-idioma.enum';
//CuentaRepository
//iniciarSesion
@Injectable({
    providedIn: 'root'
})
export class CuentaNegocio {

    constructor(private cuentaRepository: CuentaRepository,
        private perfilRepository: PerfilRepository,
        private idiomaRepository: IdiomaRepository,
        private repository: CuentaRepository,
        private usuarioModelMapper: UsuarioModelMapperService
    ) { }

    iniciarSesion(email: string, contrasena: string): Observable<UsuarioModel> {
        let data = { email: email, contrasena: contrasena }
        return this.cuentaRepository.iniciarSesion(data)
            .pipe(
                map(data => {
                    this.cuentaRepository.guardarTokenAutenticacion(data.tokenAccess)
                    this.cuentaRepository.guardarTokenRefresh(data.tokenRefresh)
                    this.cuentaRepository.guardarUsuarioEnLocalStorage(data.usuario)
                    return data.usuario
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }


    crearCuenta(metodoPago: string, pago?: PagoFacturacionEntity): Observable<PagoModel> {
        const idioma: CatalogoIdiomaEntity = this.idiomaRepository.obtenerIdiomaLocal();
        let usuario: UsuarioModel = this.obtenerUsuarioDelLocalStorage();

        usuario.idioma = {
            codigo: (idioma) ? idioma.codigo : Codigos2CatalogoIdioma.INGLES
        };
        if (pago) {
            usuario.datosFacturacion = {
                direccion: pago.direccion,
                nombres: pago.nombres,
                telefono: pago.telefono,
                email: pago.email

            }
        }

        usuario.metodoPago = {
            codigo: metodoPago
        }

        let usuarioCrear = this.usuarioModelMapper.transform(usuario)

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

    activarCuenta(idTransaccion: string): Observable<UsuarioModel> {
        let data = { "idTransaccion": idTransaccion };
        return this.cuentaRepository.activarCuenta(data)
            .pipe(
                map(data => {
                    this.cuentaRepository.guardarTokenAutenticacion(data.tokenAccess)
                    this.cuentaRepository.guardarTokenRefresh(data.tokenRefresh)
                    this.cuentaRepository.guardarUsuarioEnLocalStorage(data.usuario)
                    return data.usuario;
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
                            this.repository.guardarTokenAutenticacion(data.tokenAccess);
                            this.repository.guardarTokenRefresh(data.tokenRefresh);
                            return data.tokenAccess
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
    // Guardar usuario en el local storage
    guardarUsuarioEnLocalStorage(usuario: UsuarioModel) {
        this.cuentaRepository.guardarUsuarioEnLocalStorage(usuario)
    }

    // Obtener usuario del local storage
    obtenerUsuarioDelLocalStorage(): UsuarioModel {
        return this.cuentaRepository.obtenerUsuarioDelLocalStorage()
    }

    // Valida si existe el usuario, caso contrario lo crea
    validarUsuario(codigoPerfil: string): UsuarioModel {
        let usuario: UsuarioModel = this.obtenerUsuarioDelLocalStorage()
        if (!usuario) {
            usuario = {
                id: '',
                email: '',
                contrasena: '',
                perfiles: [],
                perfilGrupo: (codigoPerfil === CodigosCatalogoTipoPerfil.GROUP),
                aceptoTerminosCondiciones: false,
                emailResponsable: '',
                menorEdad: false,
                fechaNacimiento: new Date(),
                nombreResponsable: '',
            }
            this.guardarUsuarioEnLocalStorage(usuario)
        } else {
            usuario.perfilGrupo = (codigoPerfil === CodigosCatalogoTipoPerfil.GROUP)
            this.guardarUsuarioEnLocalStorage(usuario)
            usuario = this.obtenerUsuarioDelLocalStorage()
        }
        return usuario
    }

    // Eliminar perfil de usuario
    eliminarPerfilDelUsuario(codigoPerfil: string) {
        let usuario: UsuarioModel = this.obtenerUsuarioDelLocalStorage()
        let pos = -1
        usuario.perfiles.forEach((perfil, i) => {
            if (perfil.tipoPerfil.codigo === codigoPerfil) {
                pos = i
            }
        })
        if (pos >= 0) {
            usuario.perfiles.splice(pos, 1)
            // Borrar email y contrasena
            if (usuario.perfiles.length === 0) {
                usuario.email = ''
                usuario.contrasena = ''
            }
            this.guardarUsuarioEnLocalStorage(usuario)
        }
    }

    guardarAceptacionMenorEdad(correoResponsable: string, nombreResponsable: string, fechaNacimiento: Date) {
        let cuenta: UsuarioModel = {
            id: '',
            email: '',
            contrasena: '',
            perfiles: [],
            aceptoTerminosCondiciones: true,
            emailResponsable: correoResponsable,
            menorEdad: true,
            fechaNacimiento: fechaNacimiento,
            nombreResponsable: nombreResponsable,
        }
        this.cuentaRepository.guardarUsuarioEnLocalStorage(cuenta);
    }

    eliminarAceptacionTerminosCondiciones() {
        this.cuentaRepository.guardarUsuarioEnLocalStorage(null);
    }

    aceptoTerminosCondiciones() {
        let cuenta: UsuarioModel = {
            id: '',
            email: '',
            contrasena: '',
            perfiles: [],
            aceptoTerminosCondiciones: true,
            menorEdad: false,
        }
        this.cuentaRepository.guardarUsuarioEnLocalStorage(cuenta)
    }

    sesionIniciada(): boolean {
        return this.repository.obtenerTokenAutenticacion() != null
    }

    limpiarTerminosCondiciones() {
        const user = this.repository.obtenerUsuarioDelLocalStorage();
        if (user.email == "") {
            this.repository.guardarUsuarioEnLocalStorage(null);
        }
    }

    verificarAceptacionTerminosCondiciones() {
        let cuenta = this.obtenerUsuarioDelLocalStorage();
        if (cuenta) {
            return !cuenta.aceptoTerminosCondiciones;
        }
        return true;
    }

}