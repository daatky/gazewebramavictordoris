import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoPaticipanteConfiguracionModel {
    id: string,    
    estado: CatalogoEstadoModel,
    fechaCreacion: Date,
    codigo: string,
    nombre: string,    
}