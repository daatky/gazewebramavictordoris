import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoPaticipanteConfiguracionEntity {
    id: string,    
    estado: CatalogoEstadoEntity,
    fechaCreacion: Date,
    codigo: string,
    nombre: string,    
}