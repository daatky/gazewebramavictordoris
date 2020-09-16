import { PerfilEntity, PerfilEntityMapperServicePerfil } from "./perfil.entity";
import { CatalogoEstadoEntity, EstadoMapperService } from "./catalogos/catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
//import { PensamientoModel } from "../../modelos/pensamiento.model";
import { PensamientoModel } from "../modelo/entidades/pensamiento.model"

export interface PensamientoEntity {
    _id?: string,
    perfil?: PerfilEntity,
    traducciones?: Array<TraduccionPensamientoEntity>, // TraduccionPensamiento
    estado?: CatalogoEstadoEntity, // CatalogoEstado
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    publico?: boolean
}

export interface TraduccionPensamientoEntity {
    _id?: string,
    texto?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: string
}

@Injectable({ providedIn: 'root' })
//llega entidad envio PensamientoModel
export class PensamientoMapperService extends MapedorService<PensamientoEntity, PensamientoModel> {

    constructor(
        private perfilEntityMapperServicePerfil: PerfilEntityMapperServicePerfil,
        private estadoMapperService: EstadoMapperService,
    ) {
        super();
    }

    protected map(entity: PensamientoEntity): PensamientoModel {
        return {
            estado: this.estadoMapperService.transform(entity.estado),
            fechaActualizacion: entity.fechaActualizacion,
            id: entity._id,
            perfil: this.perfilEntityMapperServicePerfil.transform(entity.perfil),
            publico: entity.publico,
            texto: entity.traducciones[0].texto
        };
    }

}