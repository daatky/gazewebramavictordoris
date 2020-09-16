import { Observable, of } from 'rxjs';
import { CodigosCatalogoTipoPerfil } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { AccionEntidad, CodigosCatalogoEntidad } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { PerfilModel } from '../modelo/perfil.model';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { AlbumModel } from 'src/app/dominio/modelo/entidades/album.model';
import { AlbumRepository } from './../repositorio/album.repository'
import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root'})
export class AlbumNegocio {
    
    constructor(
        private albumRepository: AlbumRepository,
        private perfilNegocio: PerfilNegocio,
    ) {

    }

    // Album del perfil
    guardarAlbumActivoEnSessionStorage(album: AlbumModel) {
        this.albumRepository.guardarAlbumActivoEnSessionStorage(album)
    }

    obtenerAlbumActivoDelSessionStorage(): AlbumModel {
        return this.albumRepository.obtenerAlbumActivoDelSessionStorage()
    }

    guardarAlbumActivoEnLocalStorage(album: AlbumModel) {
        this.albumRepository.guardarAlbumActivoEnLocalStorage(album)
    }

    obtenerAlbumActivoDelLocalStorage(): AlbumModel {
        return this.albumRepository.obtenerAlbumActivoDelLocalStorage()
    }

    crearObjetoDeAlbumVacio(
        tipoAlbum: CodigosCatalogoTipoAlbum,
    ) : AlbumModel {
        return {
            portada: {},
            tipo: {
                codigo: tipoAlbum,
            },
            media: []
        }
    }

    obtenerAlbumDelPerfil(
        tipoAlbum: CodigosCatalogoTipoAlbum,
        perfil: PerfilModel
    ) : AlbumModel {
        let album: AlbumModel
        if (perfil) {
            perfil.album.forEach(item => {
                if (item && item.tipo.codigo === tipoAlbum) {
                    album = item
                }
            })
        }
        return album
    }

    obtenerPosDelAlbumEnElPerfil(
        album: AlbumModel,
        perfil: PerfilModel
    ) : number {
        let pos = -1
        if (perfil) {
            perfil.album.forEach((item, i) => {
                if (item && item.tipo.codigo === album.tipo.codigo) {
                    pos = i
                }
            })
        }
        return pos
    }

    insertarAlbumEnPerfilDelSessionStorage(codigoPerfil: string, album: AlbumModel) {
        const perfil: PerfilModel = this.perfilNegocio.validarPerfilModelDelSessionStorage(codigoPerfil)
        if (perfil) {
            let pos = this.obtenerPosDelAlbumEnElPerfil(album, perfil)
            // Si el album existe, se actualizar, caso contrario se inserta
            if (pos >= 0) {
                perfil.album[pos] = album
            } else {
                perfil.album.push(album)
            }
            // actualizar usuario
            this.perfilNegocio.actualizarPerfilEnUsuarioDelSessionStorage(perfil)
            this.guardarAlbumActivoEnSessionStorage(null)
        }
    }

    insertarAlbumEnPerfilActivoDelLocalStorage(album: AlbumModel) {
        const perfil: PerfilModel = this.perfilNegocio.obtenerPerfilActivoDelLocalStorage()
        if (perfil) {
            let pos = this.obtenerPosDelAlbumEnElPerfil(album, perfil)
            // Si el album existe, se actualizar, caso contrario se inserta
            if (pos >= 0) {
                perfil.album[pos] = album
            } else {
                perfil.album.push(album)
            }
            // actualizar usuario
            this.perfilNegocio.guardarPerfilActivoEnLocalStorage(perfil)
            this.guardarAlbumActivoEnLocalStorage(null)
        }
    }

    validarAlbumSegunTipoEnSessionStorage(
        tipoAlbum: CodigosCatalogoTipoAlbum,
        perfil: PerfilModel
    ) {
        let album: AlbumModel = this.obtenerAlbumDelPerfil(tipoAlbum, perfil)
        // Si el album no existe, se crea y se actualiza el perfil en el usuario
        if (!album) {
            album = this.crearObjetoDeAlbumVacio(tipoAlbum)
            perfil.album.push(album)
            this.perfilNegocio.actualizarPerfilEnUsuarioDelSessionStorage(perfil)
        }
        // Definir album activo
        this.guardarAlbumActivoEnSessionStorage(album)
    }

    validarAlbumEnPerfilActivo(
        tipoAlbum: CodigosCatalogoTipoAlbum,
        perfil: PerfilModel
    ) {
        let album: AlbumModel = this.obtenerAlbumDelPerfil(tipoAlbum, perfil)
        // Si el album no existe, se crea y se actualiza el perfil en el usuario
        if (!album) {
            album = this.crearObjetoDeAlbumVacio(tipoAlbum)
            perfil.album.push(album)
            this.perfilNegocio.guardarPerfilActivoEnLocalStorage(perfil)
        }
        // Definir album activo
        this.guardarAlbumActivoEnLocalStorage(album)
    }

    definirOrigenAlbumActivoSegunEntidadPerfil(
        accionEntidad: AccionEntidad
    ) : AlbumModel {
        let album : AlbumModel
        switch (accionEntidad) {
            case AccionEntidad.REGISTRO:
              // El album activo sale del session storage
              album = this.obtenerAlbumActivoDelSessionStorage()
              break
            case AccionEntidad.CREAR:
              // El album sale del local storage
              album = this.obtenerAlbumActivoDelLocalStorage()
              break
            case AccionEntidad.ACTUALIZAR:
              // El album sale del local storage
              album = this.obtenerAlbumActivoDelLocalStorage()
              break
            default: break;
        }
        return album
    }

    actualizarAlbum(album: AlbumModel) {
        return this.albumRepository.actualizarAlbum(album)
    }

    validarUpdateAlbumSegunEntidadJuntoAccionEntidad(
        entidad: CodigosCatalogoEntidad,
        accionEntidad: AccionEntidad,
        album: AlbumModel,
        codigo: string, // Codigo de la entidad
    ) {
        switch (entidad) {
            case CodigosCatalogoEntidad.PERFIL:
                this.validarAccionEntidadPerfil(accionEntidad, album, codigo)
                break
            case CodigosCatalogoEntidad.PROYECTO:
                break
            case CodigosCatalogoEntidad.NOTICIA:
                break
            default: break;
        }
    }

    validarAccionEntidadPerfil(
        accionEntidad: AccionEntidad,
        album: AlbumModel,
        codigoPerfil: string
    ) {
        switch (accionEntidad) {
            case AccionEntidad.REGISTRO:
                // Se actualiza el album en el session storage
                this.insertarAlbumEnPerfilDelSessionStorage(codigoPerfil, album)
                break
            case AccionEntidad.CREAR:
                // Insertar el album en el perfil activo, para update en boton supmit
                this.insertarAlbumEnPerfilActivoDelLocalStorage(album)
                break
            case AccionEntidad.ACTUALIZAR:
                // Enviar a actualizar el album
                this.insertarAlbumEnPerfilActivoDelLocalStorage(album)
            default: 
                break
        }
    }

    obtenerAlbumDelPerfilSegunTipo(
        tipoAlbum: CodigosCatalogoTipoAlbum,
        perfil: PerfilModel
    ) : AlbumModel {
        let album: AlbumModel
        if (perfil) {
            perfil.album.forEach(item => {
                if (item.tipo.codigo === tipoAlbum) {
                    album = item
                }
            })
        }
        return album
    }

}
