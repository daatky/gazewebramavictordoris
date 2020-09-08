import { PerfilResumenModel } from './../modelo/perfil-resumen.model';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { Injectable } from '@angular/core';
import { UsuarioEntity } from "./usuario.entity";
import { AlbumEntity } from "./album.entity"
import { TelefonoEntity } from "./telefono.entity"
import { DireccionEntity } from "./direccion.entity";
import { ProyectoEntity } from "./proyecto.entity";
import { PensamientoEntity } from "./pensamiento.entity";
import { AsociacionEntity } from "./asociacion.entity";
import { NoticiaEntity } from "./noticia.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoTipoPerfilEntity, CatalogoTipoPerfilMapperService } from "./catalogos/catalogo-tipo-perfil.entity";
import { PerfilModel } from '../modelo/perfil.model';

export interface PerfilEntity {
    _id: string,
    nombreContacto?: string,
    nombre?: string,
    tipoPerfil?: CatalogoTipoPerfilEntity,
    usuario?: UsuarioEntity,
    album?: Array<AlbumEntity>,
    estado?: CatalogoEstadoEntity,
    direcciones?: Array<DireccionEntity>,
    telefonos?: Array<TelefonoEntity>,
    proyectos?: Array<ProyectoEntity>,
    pensamientos?: Array<PensamientoEntity>,
    noticias?: Array<NoticiaEntity>,
    asociaciones?: Array<AsociacionEntity>,
    fechaCreacion?: Date,
    fechaActualizacion?: Date
}

export interface PerfilCrearCuentaEntity {
    nombreContacto: string,
    nombre: string,
    tipoPerfil: string,
    albums: Array<AlbumEntity>[]
}

@Injectable({ providedIn: 'root' })
export class PerfilEntityMapperServicePerfilresumenModelo extends MapedorService<PerfilEntity, PerfilResumenModel> {

    protected map(entity: PerfilEntity): PerfilResumenModel {
        return (entity) ? {
            _id: entity._id,
            nombreContacto: entity.nombreContacto,
            nombre: entity.nombre,
            estado: entity.estado,
        } : null
    }

}

@Injectable({ providedIn: 'root' })
export class PerfilEntityMapperServicePerfil extends MapedorService<PerfilEntity, PerfilModel> {

    constructor
        (
            private tipoPerfilMapper: CatalogoTipoPerfilMapperService
        ) {
        super();
    }

    protected map(entity: PerfilEntity): PerfilModel {
        if (entity) {
            return {
                _id: entity._id,
                nombreContacto: entity.nombreContacto,
                nombre: entity.nombre,
                estado: entity.estado,
                tipoPerfil: this.tipoPerfilMapper.transform(entity.tipoPerfil)
            };
        }
        return null;
    }

}
