import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoTipoConfiguracionEventoModel } from "./catalogo-tipo-configuracion-evento.model";

export interface ConfiguracionEventoModel {
    id?: string,
    codigo?: string,
    estado?: CatalogoEstadoModel, // CatalogoEstado
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    intervalo?:number,
    duracion?:number,
    tipo?:CatalogoTipoConfiguracionEventoModel,
    ciclico?:boolean
}