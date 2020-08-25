import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoTipoConfiguracionEventoEntity } from "./catalogo-tipo-configuracion-evento.entity";

export interface ConfiguracionEventoEntity {
    id: string,
    codigo: string,
    estado: CatalogoEstadoEntity, // CatalogoEstado
    fechaCreacion: Date,
    fechaActualizacion: Date,
    intervalo:number,
    duracion:number,
    tipo:CatalogoTipoConfiguracionEventoEntity,
    ciclico:boolean
}