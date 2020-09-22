import { CatalogoEstadoEntity } from '../../entidades/catalogos/catalogo-estado.entity'

export interface PerfilResumenModel {
    _id?: string,
    nombreContacto?: string,
    nombre?: string,
    estado?: CatalogoEstadoEntity,
}