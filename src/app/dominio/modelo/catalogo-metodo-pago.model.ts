
import { CatalogoEstadoEntity } from "../entidades/catalogos/catalogo-estado.entity";
import { MediaEntity } from "../entidades/media.entity"

export interface CatalogoMetodoPagoModel {
    id?: string
    estado?: CatalogoEstadoEntity
    codigo: string
    nombre: string
    icono?: String
    descripcion?: string
}

export interface PagoStripeModel {
    nombre: string,
    email: string
}


