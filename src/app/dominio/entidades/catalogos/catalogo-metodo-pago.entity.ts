import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { MediaEntity } from "../media.entity"
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoIdiomaEntity } from './catalogo-idioma.entity';
import { CatalogoMetodoPagoModel } from '../../modelo/catalogos/catalogo-metodo-pago.model'

export interface CatalogoMetodoPagoEntity {
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo: string
    nombre?: string
    icono?: MediaEntity
    descripcion?: string
    traducciones?: Array<TraduccionCatalogoMetodoPagoEntity>
}

export interface TraduccionCatalogoMetodoPagoEntity {
    id?: string,
    nombre: string,
    idioma?: CatalogoIdiomaEntity, //CATATLOGO IDIOMA
    original?: boolean,
    descripcion?: string
}

export interface PagoFacturacionEntity {
    nombres: string,
    telefono?: string,
    direccion?: string,
    email?: string
}

export interface MetodoPagoStripeEntity {
    clientSecret: string,
    customer: any,
}


@Injectable({ providedIn: 'root' })
export class CatalogoMetodoPagoMapperService extends MapedorService<CatalogoMetodoPagoEntity, CatalogoMetodoPagoModel> {

    protected map(entity: CatalogoMetodoPagoEntity): CatalogoMetodoPagoModel {
        return {
            estado: entity.estado,
            codigo: entity.codigo,
            nombre: entity.traducciones[0].nombre,
            descripcion: entity.traducciones[0].descripcion,
            icono: entity.icono.principal.url
            //icono: "https://cdn.pixabay.com/photo/2014/02/02/17/40/photo-256887_960_720.jpg"
        };
    }

}