import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { UsuarioModel } from './../modelo/usuario.model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaRepository } from "../repositorio/cuenta.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
//CuentaRepository
//iniciarSesion
@Injectable({
    providedIn: 'root'
})
export class CuentaNegocio {
    //private observadorItem$ = new BehaviorSubject<string>('');
    constructor(
        private cuentaRepository: CuentaRepository,
    ) {

    }

    iniciarSesion(email: string, contrasena: string): Observable<Array<any>> {
        let data = { email: email, contrasena: contrasena }
        return this.cuentaRepository.iniciarSesion(data)
            .pipe(
                map(data => {
                    return data
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    guardarTokenAutenticacion(token: string) {
        this.cuentaRepository.guardarTokenAutenticacion(token)
    }

    guardarTokenRefresh(token: string) {
        this.cuentaRepository.guardarTokenRefresh(token)
    }

    almacenarCatalogoPerfiles(tipoPerfiesUser: Array<any>) {
        this.cuentaRepository.almacenarCatalogoPerfiles(this.formatearPerfilesLocalStorage(tipoPerfiesUser))
    }

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

    // Guardar usuario en el local storage
    guardarUsuarioEnLocalStorage(usuario: UsuarioModel) {
        this.cuentaRepository.guardarUsuarioEnLocalStorage(usuario)
    }

    // Obtener usuario del local storage
    obtenerUsuarioDelLocalStorage(): UsuarioModel {
        return this.cuentaRepository.obtenerUsuarioDelLocalStorage()
    }

    // Valida si existe el usuario, caso contrario lo crea
    validarUsuario(codigoPerfil: string) : UsuarioModel {
        let usuario: UsuarioModel = this.obtenerUsuarioDelLocalStorage()
        if (!usuario) {
            usuario = {
                id: '',
                email: '',
                contrasena: '',
                perfiles: [],
                perfilGrupo: (codigoPerfil === CodigosCatalogoTipoPerfil.GROUP),
            }
            this.guardarUsuarioEnLocalStorage(usuario)
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
}