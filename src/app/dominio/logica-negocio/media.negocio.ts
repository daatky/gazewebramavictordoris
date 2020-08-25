import { AlbumEntity } from './../entidades/album.entity';
import { MediaSimpleModel } from './../modelo/media-simple.model';
import { CodigosCatalogoArchivosPorDefecto } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-archivos-defeto.enum';
import { CodigosCatalogoTipoMedia } from './../../nucleo/servicios/remotos/codigos-catalogos/catalgo-tipo-media.enum';
import { Injectable } from "@angular/core"
import { Observable } from 'rxjs'
import { MediaRepository } from './../repositorio/media.repository'
import { ArchivoDefaultModelo } from "../modelo/archivo-default.model"
import { MediaSimpleEntity } from '../entidades/media-simple.entity'
import { buffer } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class MediaNegocio {

    constructor(
        private mediaRepository: MediaRepository
    ) {

    }

    // Obtene catalogo de paises
    obtenerListaArchivosDefault(): Observable<ArchivoDefaultModelo[]> {
        return this.mediaRepository.obtenerListaArchivosDefault()
    }

    subirMediaSimpleAlServidor(
        imagen: any,
        relacionAspecto: string,
        descripcion: string,
        fileDefault?: boolean,
        catalogoArchivoDefault?: CodigosCatalogoArchivosPorDefecto,
    ): Observable<MediaSimpleEntity> {
        const body: FormData = new FormData()
        body.append('archivo', imagen.archivo, imagen.nombre)
        body.append('relacionAspecto', relacionAspecto)
        body.append('catalogoMedia', CodigosCatalogoTipoMedia.TIPO_MEDIA_SIMPLE)
        body.append('descripcion', descripcion)

        if (fileDefault) {
            body.append('fileDefault', (fileDefault) ? 'true' : 'false')
        }
        if (catalogoArchivoDefault) {
            body.append('catalogoArchivoDefault', catalogoArchivoDefault.toString())
        }
        return this.mediaRepository.subirArchivoAlservidor(body)
    }

    guardarListaAlbumEnLocalStorage(albums: AlbumEntity[]) {
        return this.mediaRepository.guardarListaAlbumEnLocalStorage(albums)
    }

    obtenerListaAlbumDelLocalStorage() : AlbumEntity[] {
        return this.mediaRepository.obtenerListaAlbumDelLocalStorage()
    }
}
