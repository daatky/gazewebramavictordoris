import { CatalogoAlbumEntity } from "./catalogos/catalogo-album.entity";
import { MediaEntity } from "./media.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface AlbumEntity {
    id?:string
    fechaCreacion?:Date
    fechaActualizacion?:Date,
    traduccion?:Array<TraduccionAlbumEntity>,
    tipo?:CatalogoAlbumEntity,
    media?:Array<MediaEntity>, //MEDIA
    portada?:MediaEntity, //MEDIA
}

export interface TraduccionAlbumEntity {
    id?: string,
    nombre?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}