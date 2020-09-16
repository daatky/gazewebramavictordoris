import { PerfilModelMapperService, PerfilModelEstadoMapperService } from '../modelo/entidades/perfil.model';
import { PerfilEntity, PerfilEntityMapperServicePerfil } from './../entidades/perfil.entity';
import { PerfilServiceLocal } from './../../nucleo/servicios/locales/perfil.service';
import { AlbumModel } from '../modelo/entidades/album.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoService } from '../../nucleo/servicios/remotos/pago.service';
import { catchError, tap, map, debounceTime } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CatalogoTipoPerfilEntity, CatalogoTipoPerfilMapperService, CatalogoTipoPerfilMapperService2 } from '../entidades/catalogos/catalogo-tipo-perfil.entity';
import { PerfilServiceRemoto } from '../../nucleo/servicios/remotos/perfil.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogos/catalogo-tipo-perfil.model';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { PerfilModel } from '../modelo/entidades/perfil.model';
import { UsuarioModel, UsuarioModelMapperService } from '../modelo/entidades/usuario.model';

@Injectable({ providedIn: 'root'})
export class PerfilRepository {

    constructor(
        private perfilServicieRemoto: PerfilServiceRemoto,
        private perfilServicieLocal: PerfilServiceLocal,
        private mapeador: CatalogoTipoPerfilMapperService2,
        private perfilEntityMapperService: PerfilEntityMapperServicePerfil,
        private localStorage: LocalStorage,
        private perfilModelMapperService: PerfilModelMapperService,
        private perfilModelEstadoMapperService: PerfilModelEstadoMapperService,
        private usuarioModelMapperService: UsuarioModelMapperService,
    ) {

    }

    obtenerCatalogoTipoPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        return this.perfilServicieRemoto.obtenerCatalogoTipoPerfil()
            .pipe(
                map(data => {
                    return this.mapeador.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    almacenarCatalogoPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        return this.localStorage.almacenarCatalogoPerfiles(tipoPerfiles);
    }

    obtenerCatalogoTipoPerfilLocal(): CatalogoTipoPerfilModel[] {
        return this.localStorage.obtenerCatalogoPerfiles();
    }

    almacenarPerfilSeleccionado(perfil: PerfilModel) {
        this.localStorage.almacenarPerfilSeleccionado(perfil)
    }
    obtenerPerfilSeleccionado(): PerfilModel {
        return this.localStorage.obtenerPerfilSeleccionado();
    }

    validarNombreDeContactoUnico(nombreContacto: string): Observable<string> {
        return this.perfilServicieRemoto.validarNombreDeContactoUnico(nombreContacto)
            .pipe(
                map(data => {
                    return data.respuesta.datos
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    obtenerDatosDelPerfil(id: string): Observable<PerfilModel> {
        return this.perfilServicieRemoto.obtenerDatosDelPerfil(id)
            .pipe(
                map(data => {
                    return this.perfilEntityMapperService.transform(data.respuesta.datos)
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    guardarPerfilActivoEnLocalStorage(perfil: PerfilModel) {
        this.perfilServicieLocal.guardarPerfilActivoEnLocalStorage(perfil)
    }

    obtenerPerfilActivoDelLocalStorage(): PerfilModel {
        return this.perfilServicieLocal.obtenerPerfilActivoDelLocalStorage()
    }

    removerPerfilActivoDelLocalStorage() {
        this.perfilServicieLocal.removerPerfilActivoDelLocalStorage()
    }

    actualizarPerfil(perfil: PerfilModel): Observable<PerfilModel> {
        const perfilEntity = this.perfilModelMapperService.transform(perfil)
        return this.perfilServicieRemoto.actualizarPerfil(perfilEntity)
            .pipe(
                map(data => {
                    return this.perfilEntityMapperService.transform(data.respuesta.datos)
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    eliminarHibernarElPerfil(perfil: PerfilModel): Observable<object> {
        const perfilEntity = this.perfilModelEstadoMapperService.transform(perfil)
        console.warn('entidad', perfilEntity)
        return this.perfilServicieRemoto.eliminarHibernarElPerfil(perfilEntity)
    }

    crearPerfilEnElUsuario(perfil: PerfilModel, usuario: UsuarioModel): Observable<PerfilModel> {
        const perfilEntity = this.perfilModelMapperService.transform(perfil)
        const usuarioEntity = this.usuarioModelMapperService.transform(usuario)
        return this.perfilServicieRemoto.crearPerfilEnElUsuario(perfilEntity, usuarioEntity)
            .pipe(
                map(data => {
                    return this.perfilEntityMapperService.transform(data.respuesta.datos)
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    activarPerfil(perfil: PerfilModel): Observable<object> {
        const perfilEntity : PerfilEntity = { _id: perfil._id }
        return this.perfilServicieRemoto.activarPerfil(perfilEntity)
    }

}