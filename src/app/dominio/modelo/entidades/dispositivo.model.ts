import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";

export interface DispositivoModel {
    id?: string
    estado?: CatalogoEstadoModel //CatalogoEstado
    fechaCreacion?: Date
    fechaActualizacion?: Date
    tokenAcceso?:string
    tokenNotificacion?:string    
    nombre?:string
    tipo?:string  
}