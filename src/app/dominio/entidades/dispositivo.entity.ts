import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";

export interface DispositivoEntity {
    id: string
    estado: CatalogoEstadoEntity //CatalogoEstado
    fechaCreacion: Date
    fechaActualizacion: Date
    tokenAcceso:string
    tokenNotificacion:string    
    nombre:string
    tipo:string  
}