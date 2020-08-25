import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface'
import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface'

export interface CatalogoLocalidadModel {
    codigo: string,
    id_catalogoPais: string,
    nombre: string,
    codigoPostal: string,
}

@Injectable({ providedIn: 'root' })
export class CatalogoLocalidadMapperAItemSelectorService extends MapedorService<CatalogoLocalidadModel, ItemSelector> {

    protected map(entity: CatalogoLocalidadModel): ItemSelector {
        return {
            codigo: entity.codigo,
            nombre: entity.nombre,
            auxiliar: entity.codigoPostal
        };
    }

}