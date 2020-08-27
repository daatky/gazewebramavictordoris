import { ArchivoModel } from './../modelo/archivo.model';
import { AlbumEntity } from './../entidades/album.entity';
import { MediaModel } from '../modelo/media.model'
import { CodigosCatalogoArchivosPorDefecto } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-archivos-defeto.enum';
import { CodigosCatalogoTipoMedia } from '../../nucleo/servicios/remotos/codigos-catalogos/catalago-tipo-media.enum';
import { Injectable } from "@angular/core"
import { Observable } from 'rxjs'
import { MediaRepository } from './../repositorio/media.repository'


@Injectable({ providedIn: 'root' })
export class MediaNegocio {

    constructor(
        private mediaRepository: MediaRepository
    ) {

    }

    // Obtene catalogo de paises
    obtenerListaArchivosDefault(): Observable<ArchivoModel[]> {
        return this.mediaRepository.obtenerListaArchivosDefault()
    }

    subirMediaSimpleAlServidor(
        imagen: any,
        relacionAspecto: string,
        descripcion: string,
        fileDefault?: boolean,
        catalogoArchivoDefault?: CodigosCatalogoArchivosPorDefecto,
    ): Observable<MediaModel> {
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
}
