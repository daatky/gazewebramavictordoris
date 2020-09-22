import { TelefonoModel } from './entidades/telefono.model';
import { DireccionModel, DireccionModelMapperService } from './entidades/direccion.model';
import { AlbumModel, AlbumModelMapperService } from './entidades/album.model';
import { UsuarioModel } from './entidades/usuario.model';
import { CatalogoTipoPerfilModel, CatalogoTipoPerfilModelMapperService } from './catalogos/catalogo-tipo-perfil.model'
import { TelefonoEntity } from '../entidades/telefono.entity'
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { PerfilEntity } from '../entidades/perfil.entity';
import { CatalogoEstadoModel, EstadoModelMapperService } from './catalogos/catalogo-estado.model';
import { ItemResultadoBusqueda } from './item-resultado-busqueda';
import { CodigosCatalogoEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { ProyectoModel } from './proyecto.model';
import { PensamientoModel } from './entidades/pensamiento.model';
import { NoticiaModel } from './noticia.model';
import { AsociacionModel } from "./asociacion.model";

export interface PerfilModel {
    id?: string,
    nombreContacto?: string,
    nombre?: string,
    tipoPerfil?: CatalogoTipoPerfilModel,
    usuario?: UsuarioModel,
    album?: Array<AlbumModel>,
    estado?: CatalogoEstadoModel,
    direcciones?: Array<DireccionModel>,
    telefonos?: Array<TelefonoModel>,
    // Pendiente las opciones de abajo de crear modelos cuando se vaya a utilizar, por ahora dejo con la entidad
    proyectos?: Array<ProyectoModel>,
    pensamientos?: Array<PensamientoModel>,
    noticias?: Array<NoticiaModel>,
    asociaciones?: Array<AsociacionModel>,
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
                _id: model.id,
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
export class PerfilModelMapperResultadoBusqueda extends MapedorService<PerfilModel, ItemResultadoBusqueda<PerfilModel>> {
    protected map(model: PerfilModel): ItemResultadoBusqueda<PerfilModel> {

        return {
            titulo: model.nombreContacto,
            subtitulo: model.nombre,
            tipo: CodigosCatalogoEntidad.PERFIL,
            item: model
        };
    }
}

@Injectable({ providedIn: 'root' })
export class PerfilModelEstadoMapperService extends MapedorService<PerfilModel, PerfilEntity> {
    constructor
        (
            private estadoMapper: EstadoModelMapperService,
        ) {
        super();
    }

    protected map(model: PerfilModel): PerfilEntity {
        if (model) {
            return {
                _id: model.id,
                estado: this.estadoMapper.transform(model.estado),
            };
        }
        return null;
    }
}