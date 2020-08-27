import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoMediaModel{
    id?: string
    estado?: CatalogoEstadoModel 
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string    
}