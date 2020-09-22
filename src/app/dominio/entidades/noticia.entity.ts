import { MediaEntity } from './media.entity';
import { VotoNoticiaEntity } from "./voto-noticia.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoLocalidadEntity } from "./catalogos/catalogo-localidad.entity";
import { AlbumEntity, AlbumPerfilEntityMapperServiceAlbumPerfil } from "./album.entity";
import { PerfilEntity } from "./perfil.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { NoticiaModel } from '../modelo/noticia.model';

export interface NoticiaEntity {
    _id: string
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

@Injectable({ providedIn: 'root' })
export class NoticiaPerfilEntityMapperServiceNoticiaPerfilModel extends MapedorService<NoticiaEntity, NoticiaModel> {
    constructor(
        private albumPerfilEntityMapperServiceAlbumPerfil:AlbumPerfilEntityMapperServiceAlbumPerfil
    ){
        super()
    }
    protected map(entity: NoticiaEntity): NoticiaModel {
        return {
            id:entity._id,
            adjuntos:this.albumPerfilEntityMapperServiceAlbumPerfil.transform(entity.adjuntos),
            tituloCorto:entity.traducciones[0].tituloCorto,
            fechaActualizacion:entity.fechaActualizacion
        }
    }
}