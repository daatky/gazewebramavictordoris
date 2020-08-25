import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoConfiguracionEntity{
    id: string
    estado: CatalogoEstadoEntity
    fechaCreacion: Date
    fechaActualizacion: Date
    codigo:string
    codigoPostal:string
}