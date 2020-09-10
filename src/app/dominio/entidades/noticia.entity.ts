import { MediaEntity } from './media.entity';
import { VotoNoticiaEntity } from "./voto-noticia.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoLocalidadEntity } from "./catalogos/catalogo-localidad.entity";
import { AlbumEntity } from "./album.entity";
import { PerfilEntity } from "./perfil.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface NoticiaEntity {
    id: string
    estado: CatalogoEstadoEntity
    fechaCreacion: Date
    fechaActualizacion: Date
    localidad: CatalogoLocalidadEntity
    autor: string
    articulo: MediaEntity,
    adjuntos: Array<AlbumEntity>
    perfil: PerfilEntity
    votos: Array<VotoNoticiaEntity>
    totalVotos: number
    traducciones: Array<TraduccionNoticiaEntity> // TraduccionNoticia
}

export interface TraduccionNoticiaEntity {
    id:string,
    tituloCorto:string,
    titulo:string,
    descripcion:string,
    tags:Array<string>,
    idioma:CatalogoIdiomaEntity,
    original:boolean
}