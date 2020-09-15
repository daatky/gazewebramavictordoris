import { PerfilServiceLocal } from './../../nucleo/servicios/locales/perfil.service';
import { AlbumModel } from './../modelo/album.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoService } from '../../nucleo/servicios/remotos/pago.service';
import { catchError, tap, map, delay } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CatalogoTipoPerfilEntity, CatalogoTipoPerfilMapperService, CatalogoTipoPerfilMapperService2 } from '../entidades/catalogos/catalogo-tipo-perfil.entity';
import { PerfilServiceRemoto } from '../../nucleo/servicios/remotos/perfil.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { PerfilModel } from '../modelo/perfil.model';
import { PaginacionModel } from '../modelo/paginacion-model';
import { PerfilEntityMapperServicePerfil } from '../entidades/perfil.entity';

@Injectable({
    providedIn: 'root'
})
export class PerfilRepository {


    constructor(
        protected http: HttpClient,
        private perfilServicieRemoto: PerfilServiceRemoto,
        private perfilServicieLocal: PerfilServiceLocal,
        private mapeadorTipoPerfiles: CatalogoTipoPerfilMapperService2,
        private perfileMapper: PerfilEntityMapperServicePerfil,
        private localStorage: LocalStorage
    ) {

    }

    obtenerCatalogoTipoPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        return this.perfilServicieRemoto.obtenerCatalogoTipoPerfil()
            .pipe(
                map(data => {
                    return this.mapeadorTipoPerfiles.transform(data.respuesta.datos);
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

    // Album del perfil
    guardarAlbumActivoEnLocalStorage(album: AlbumModel) {
        this.perfilServicieLocal.guardarAlbumEnLocalStorage(album)
    }

    obtenerAlbumActivoDelLocalStorage(): AlbumModel {
        return this.perfilServicieLocal.obtenerAlbumEnLocalStorage()
    }

    guardarAlbumActivoEnSessionStorage(album: AlbumModel) {
        this.perfilServicieLocal.guardarAlbumEnSessionStorage(album)
    }

    obtenerAlbumActivoDelSessionStorage(): AlbumModel {
        return this.perfilServicieLocal.obtenerAlbumEnSessionStorage()
    }

    almacenarPerfilSeleccionado(perfil: PerfilModel) {
        this.localStorage.almacenarPerfilSeleccionado(perfil)
    }
    obtenerPerfilSeleccionado(): PerfilModel {
        return this.localStorage.obtenerPerfilSeleccionado();
    }
    eliminarVariableStorage(llave: string) {
        this.localStorage.eliminarVariableStorage(llave)
    }

    validarNombreDeContactoUnico(nombreContacto: string): Observable<string> {
        return this.perfilServicieRemoto.validarNombreDeContactoUnico(nombreContacto)
            .pipe(
                map(data => {
                    return data.respuesta.datos
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    buscarPerfiles(palabra: string, limite: number, pagina: number): Observable<PaginacionModel<PerfilModel>> {        
        return this.perfilServicieRemoto.buscarPerfiles(palabra, limite, pagina).pipe(
            map(data => {
                let cargarMas = data.headers.get("proximaPagina") == "true"
                let resultado: PaginacionModel<PerfilModel> =
                {
                    proximaPagina: cargarMas,
                    lista: this.perfileMapper.transform(data.body.respuesta.datos)
                }
                return resultado;
            }),
            catchError(err => {
                return throwError(err)
            })
        )
    }

}