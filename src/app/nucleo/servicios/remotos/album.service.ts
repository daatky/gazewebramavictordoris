import { APIGAZE } from './rutas/api-gaze.enum';
import { RespuestaRemota } from './../../util/respuesta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { AlbumEntity } from '../../../dominio/entidades/album.entity'
import { MediaEntity } from '../../../dominio/entidades/media.entity';
import { Album } from './rutas/album.enum';

@Injectable({ providedIn: 'root' })
export class AlbumServiceRemoto {

    constructor(
        private http: HttpClient
    ) {

    }

    actualizarAlbum(album: AlbumEntity) {
        return this.http.post<RespuestaRemota<string>>(APIGAZE.BASE + Album.ACTUALIZAR_ALBUM, album)
    }
}