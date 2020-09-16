import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ProyectoModel } from "../proyecto.model";
import { PerfilModel } from "../entidades/perfil.model";
import { CatalogoTipoVotoModel } from "../catalogos/catalogo-tipo-voto.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";
import { ConfiguracionEventoModel } from "../catalogos/configuracion-evento.model";

export interface VotoProyectoModel {
    id?: string,
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    proyecto?: ProyectoModel,
    perfil?: PerfilModel,
    tipo?: CatalogoTipoVotoModel,
    numeroVoto?: number,
    configuracion?: ConfiguracionEventoModel,
    descripcion?: string
}
