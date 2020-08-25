import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoMediaEntity{
    id?: string
    estado?: CatalogoEstadoEntity 
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string    
}