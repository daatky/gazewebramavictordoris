import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoMediaModel } from '../../modelo/catalogos/catalogo-media.model';
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoMediaEntity{
    id?: string
    estado?: CatalogoEstadoEntity 
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string    
}
@Injectable({ providedIn: 'root' })
export class CatalogoMediaEntityMapperServiceCatalogoMediaModel extends MapedorService<CatalogoMediaEntity, CatalogoMediaModel> {
    constructor(){
        super()
    }
    protected map(entity: CatalogoMediaEntity): CatalogoMediaModel {
        return {
            codigo:entity.codigo
        }
    }
}