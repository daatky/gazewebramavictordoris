import { MediaModel } from './media.model'
import { CatalogoAlbumEntity } from './../entidades/catalogos/catalogo-album.entity'

export interface AlbumModel {
    id?:string
    nombre?: string,
    tipo?: CatalogoAlbumEntity,
    media?: Array<MediaModel>,
    portada?: MediaModel,
}
