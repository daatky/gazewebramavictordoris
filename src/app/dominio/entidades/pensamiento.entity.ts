import { PerfilEntity } from "./perfil.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
//import { PensamientoModel } from "../../modelos/pensamiento.model";
import { PensamientoModel } from "../modelo/pensamiento.model"

export interface PensamientoEntity {
    _id?:string,
    perfil?:PerfilEntity,
    traducciones?:Array<TraduccionPensamientoEntity>, // TraduccionPensamiento
    estado?:CatalogoEstadoEntity, // CatalogoEstado
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    publico?:boolean
}

export interface TraduccionPensamientoEntity {
    id?:string,
    texto?:string,
    idioma?:CatalogoIdiomaEntity,
    original?:string
}

@Injectable({ providedIn: 'root' })
//llega entidad envio PensamientoModel
export class PensamientoMapperService extends MapedorService<PensamientoEntity, PensamientoModel> {

    protected map(entity: PensamientoEntity): PensamientoModel {        
        return {
            estado:entity.estado,
            fechaActualizacion:entity.fechaActualizacion,
            id:entity._id,
            perfil:entity.perfil,
            publico:entity.publico,
            texto:entity.traducciones[0].texto
        };
    }

}