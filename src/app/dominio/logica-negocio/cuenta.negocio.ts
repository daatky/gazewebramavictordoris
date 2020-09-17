import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { UsuarioModel, UsuarioModelMapperService } from '../modelo/entidades/usuario.model';
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaRepository } from "../repositorio/cuenta.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogos/catalogo-tipo-perfil.model';
import { PerfilRepository } from '../repositorio/perfil.repository';
import { IdiomaRepository } from '../repositorio/idioma.repository';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity';
import { PagoFacturacionEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { PagoModel } from '../modelo/pago.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenModel } from '../modelo/token.model';
import { Codigos2CatalogoIdioma } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-idioma.enum';
import { CodigosCatalogosEstadoPerfiles } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun';
import { AccionEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';

@Injectable({
    providedIn: 'root'
})
export class CuentaNegocio {


    constructor(private cuentaRepository: CuentaRepository,
        private perfilRepository: PerfilRepository,
        private idiomaRepository: IdiomaRepository,
        private usuarioModelMapper: UsuarioModelMapperService
    ) { }

    iniciarSesion(email: string, contrasena: string): Observable<UsuarioModel> {
        let data = { email: email, contrasena: contrasena }
        return this.cuentaRepository.iniciarSesion(data)
            .pipe(
                map(data => {
                    console.log(data)
                    if (data) {
                        this.cuentaRepository.guardarTokenAutenticacion(data.tokenAccess)
                        this.cuentaRepository.guardarTokenRefresh(data.tokenRefresh)
                        this.cuentaRepository.guardarUsuarioEnLocalStorage(data.usuario)
                        return data.usuario
                    }
                    return null
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }


    crearCuenta(metodoPago: string, pago?: PagoFacturacionEntity): Observable<PagoModel> {
        const idioma: CatalogoIdiomaEntity = this.idiomaRepository.obtenerIdiomaLocal();
        let usuario: UsuarioModel = this.obtenerUsuarioDelSessionStorage();

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
        const tokenActual = this.cuentaRepository.obtenerTokenAutenticacion()

        if (tokenActual) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(tokenActual);

            if (isExpired) {
                const tokenRefrescar = this.cuentaRepository.obtenerTokenRefresh();

                return this.cuentaRepository.refrescarToken(tokenRefrescar)
                    .pipe(
                        map((data: TokenModel) => {
                            console.log(data)
                            this.cuentaRepository.guardarTokenAutenticacion(data.tokenAccess);
                            this.cuentaRepository.guardarTokenRefresh(data.tokenRefresh);
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

    // Guardar usuario en el session storage
    guardarUsuarioEnSessionStorage(usuario: UsuarioModel) {
        this.cuentaRepository.guardarUsuarioEnSessionStorage(usuario)
    }

    // Obtener usuario del session storage
    obtenerUsuarioDelSessionStorage(): UsuarioModel {
        return this.cuentaRepository.obtenerUsuarioDelSessionStorage()
    }

    // Valida si existe el usuario, caso contrario lo crea
    validarUsuarioDelSesionStorage(codigoPerfil: string): UsuarioModel {
        let usuario: UsuarioModel = this.obtenerUsuarioDelSessionStorage()
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
            this.guardarUsuarioEnSessionStorage(usuario)
        } else {
            usuario.perfilGrupo = (codigoPerfil === CodigosCatalogoTipoPerfil.GROUP)
            this.guardarUsuarioEnSessionStorage(usuario)
            usuario = this.obtenerUsuarioDelSessionStorage()
        }
        return usuario
    }

    // Eliminar perfil de usuario
    eliminarPerfilDelUsuario(codigoPerfil: string) {
        let usuario: UsuarioModel = this.obtenerUsuarioDelSessionStorage()
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
            this.guardarUsuarioEnSessionStorage(usuario)
        }
    }

    // Valida el estado del perfil cuando el usuario abandona el formulario de registro
    validarEstadoPerfilParaDestruir(codigoPerfil: string, codigoEstado: CodigosCatalogosEstadoPerfiles) {
        if (codigoEstado === CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR) {
            this.eliminarPerfilDelUsuario(codigoPerfil)
        }
    }

    // Obtener Email y Contrasena del usuario
    obtenerEmailConContrasenaDelUsuario(session: boolean = true) {
        const usuario: UsuarioModel = (session)
            ? this.obtenerUsuarioDelSessionStorage()
            : this.obtenerUsuarioDelLocalStorage()
        return {
            email: usuario.email,
            contrasena: (session) ? usuario.contrasena : '**********'
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
        this.cuentaRepository.guardarUsuarioEnSessionStorage(cuenta);
    }

    eliminarAceptacionTerminosCondiciones() {
        this.cuentaRepository.guardarUsuarioEnSessionStorage(null);
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
        this.cuentaRepository.guardarUsuarioEnSessionStorage(cuenta)
    }

    sesionIniciada(): boolean {
        return this.cuentaRepository.obtenerTokenAutenticacion() != null
    }

    limpiarTerminosCondiciones() {
        const user = this.cuentaRepository.obtenerUsuarioDelSessionStorage();
        if (user && user.email == "") {
            this.cuentaRepository.guardarUsuarioEnSessionStorage(null);
        }
    }

    verificarAceptacionTerminosCondiciones() {
        let cuenta = this.obtenerUsuarioDelSessionStorage();
        if (cuenta) {
            return !cuenta.aceptoTerminosCondiciones;
        }
        return true;
    }

    cerrarSession() {
        this.cuentaRepository.guardarTokenAutenticacion(null)
        this.cuentaRepository.guardarTokenRefresh(null)
        this.cuentaRepository.guardarUsuarioEnLocalStorage(null)
        this.perfilRepository.almacenarPerfilSeleccionado(null)
    }
    validarEmailUnico(email: string): Observable<string> {
        return this.cuentaRepository.validarEmailUnico(email)
    }    

}