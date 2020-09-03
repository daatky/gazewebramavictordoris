
import { CatalogoEstadoEntity } from "../entidades/catalogos/catalogo-estado.entity";
import { MediaEntity } from "../entidades/media.entity"
import { Injectable } from '@angular/core';
import { CatalogoMetodoPagoEntity, PagoFacturacionEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface CatalogoMetodoPagoModel {
    id?: string
    estado?: CatalogoEstadoEntity
    codigo: string
    nombre?: string
    icono?: String
    descripcion?: string
}

export interface PagoStripeModel {
    nombre: string,
    email: string
}

export interface PagoFacturacionModel {
    nombres: string,
    telefono?: string,
    direccion?: string,
    email?: string
}


@Injectable({ providedIn: 'root' })
export class CatalogoMetodoPagoModelMapperService extends MapedorService<CatalogoMetodoPagoModel, CatalogoMetodoPagoEntity> {

    constructor
        (

        ) {
        super();
    }

    protected map(model: CatalogoMetodoPagoModel): CatalogoMetodoPagoEntity {
        return (model) ? {
            codigo: model.codigo,
        } : null;
    }

}

@Injectable({ providedIn: 'root' })
export class PagoFacturacionModelMapperService extends MapedorService<PagoFacturacionModel, PagoFacturacionEntity> {

    constructor
        (

        ) {
        super();
    }

    protected map(model: PagoFacturacionModel): PagoFacturacionEntity {
        return (model) ? {
            nombres: model.nombres,
            direccion: model.direccion,
            email: model.email,
            telefono: model.telefono
        } : null;
    }

}

