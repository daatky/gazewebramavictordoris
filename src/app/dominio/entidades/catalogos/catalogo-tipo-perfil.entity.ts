import { PerfilEntityMapperServicePerfilresumenModelo, PerfilEntityMapperServicePerfil } from './../perfil.entity';
import { PerfilModel } from '../../modelo/entidades/perfil.model';
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogo-idioma.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from "../../../nucleo/base/mapeador.interface";
import { CatalogoTipoPerfilModel } from "../../modelo/catalogos/catalogo-tipo-perfil.model";
import { PerfilEntity } from '../perfil.entity';

export interface CatalogoTipoPerfilEntity {
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo: string
    perfil?: PerfilEntity
    traducciones?: Array<TraduccionCatalogoTipoPerfilEntity>

}

export interface TraduccionCatalogoTipoPerfilEntity {
    id?: string,
    nombre: string,
    idioma?: CatalogoIdiomaEntity, //CATATLOGO IDIOMA
    original?: boolean,
    descripcion?: string
}

@Injectable({ providedIn: 'root' })
export class CatalogoTipoPerfilMapperService extends MapedorService<CatalogoTipoPerfilEntity, CatalogoTipoPerfilModel> {

    constructor(
        private mapearPerfilEntityAResumen: PerfilEntityMapperServicePerfilresumenModelo
    ) {
        super()
    }

    protected map(entity: CatalogoTipoPerfilEntity,): CatalogoTipoPerfilModel {
        return {
            codigo: entity.codigo,
            nombre: (entity.traducciones) ? entity.traducciones[0].nombre : null,
            descripcion: (entity.traducciones) ? entity.traducciones[0].descripcion : null,
            perfil: this.mapearPerfilEntityAResumen.transform(entity.perfil)
        };
    }

}

@Injectable({ providedIn: 'root' })
export class CatalogoTipoPerfilMapperService2 extends MapedorService<CatalogoTipoPerfilEntity, CatalogoTipoPerfilModel> {

    constructor(
        private perfilEntityMapperServicePerfil: PerfilEntityMapperServicePerfil
    ) {
        super()
    }

    protected map(entity: CatalogoTipoPerfilEntity): CatalogoTipoPerfilModel {
        return (entity) ? {
            codigo: entity.codigo,
            nombre: (entity.traducciones) ? entity.traducciones[0].nombre : null,
            descripcion: (entity.traducciones) ? entity.traducciones[0].descripcion : null,
            perfil: this.perfilEntityMapperServicePerfil.transform(entity.perfil)
        } : null;
    }
}

enum MapperCatalogoTipoPerfil {
    PERFIL_COMPLETO,
    PERFIL_RESUME
}






