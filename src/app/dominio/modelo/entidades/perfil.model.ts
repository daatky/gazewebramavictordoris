import { TelefonoModel } from './telefono.model';
import { DireccionModel, DireccionModelMapperService } from './direccion.model';
import { AlbumModel, AlbumModelMapperService } from './album.model';
import { UsuarioModel } from './usuario.model';
import { CatalogoTipoPerfilModel, CatalogoTipoPerfilModelMapperService } from './../catalogos/catalogo-tipo-perfil.model'
import { AsociacionEntity } from '../../entidades/asociacion.entity'
import { NoticiaEntity } from '../../entidades/noticia.entity'
import { PensamientoEntity } from '../../entidades/pensamiento.entity'
import { ProyectoEntity } from '../../entidades/proyecto.entity'
import { TelefonoEntity } from '../../entidades/telefono.entity'
import { DireccionEntity } from '../../entidades/direccion.entity'
import { CatalogoEstadoEntity } from '../../entidades/catalogos/catalogo-estado.entity'
import { AlbumEntity } from '../../entidades/album.entity'
import { UsuarioEntity } from '../../entidades/usuario.entity'
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { PerfilEntity } from '../../entidades/perfil.entity';
import { EstadoModelMapperService } from '../catalogos/catalogo-estado.model';

export interface PerfilModel {
    _id?: string,
    nombreContacto?: string,
    nombre?: string,
    tipoPerfil?: CatalogoTipoPerfilModel,
    usuario?: UsuarioModel,
    album?: Array<AlbumModel>,
    estado?: CatalogoEstadoEntity,
    direcciones?: Array<DireccionModel>,
    telefonos?: Array<TelefonoModel>,
    // Pendiente las opciones de abajo de crear modelos cuando se vaya a utilizar, por ahora dejo con la entidad
    proyectos?: Array<ProyectoEntity>,
    pensamientos?: Array<PensamientoEntity>,
    noticias?: Array<NoticiaEntity>,
    asociaciones?: Array<AsociacionEntity>,
}

@Injectable({ providedIn: 'root' })
export class PerfilModelMapperService extends MapedorService<PerfilModel, PerfilEntity> {
    constructor
        (
            private estadoMapper: EstadoModelMapperService,
            private albumMaper: AlbumModelMapperService,
            private direccionMapper: DireccionModelMapperService,
            private tipoPerfilMapper: CatalogoTipoPerfilModelMapperService
        ) {
        super();
    }

    protected map(model: PerfilModel): PerfilEntity {
        if (model) {
            return {
                _id: model._id,
                nombreContacto: model.nombreContacto,
                nombre: model.nombre,
                album: this.albumMaper.transform(model.album),
                estado: this.estadoMapper.transform(model.estado),
                direcciones: this.direccionMapper.transform(model.direcciones),
                tipoPerfil: this.tipoPerfilMapper.transform(model.tipoPerfil),
                telefonos: model.telefonos as TelefonoEntity[]
            };
        }
        return null;
    }

}

@Injectable({ providedIn: 'root' })
export class PerfilModelEstadoMapperService extends MapedorService<PerfilModel, PerfilEntity> {
    constructor
        (
            private estadoMapper: EstadoModelMapperService,
            private albumMaper: AlbumModelMapperService,
            private direccionMapper: DireccionModelMapperService,
            private tipoPerfilMapper: CatalogoTipoPerfilModelMapperService
        ) {
        super();
    }

    protected map(model: PerfilModel): PerfilEntity {
        if (model) {
            return {
                _id: model._id,
                estado: this.estadoMapper.transform(model.estado),
            };
        }
        return null;
    }

}