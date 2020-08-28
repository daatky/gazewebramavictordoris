import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ProyectoModel } from "./proyecto.model";
import { PerfilModel } from "../perfil.model";
import { CatalogoTipoVotoModel } from "../catalogos/catalogo-tipo-voto.model";
import { CatalogoFormulaEventoModel } from "../catalogos/catalogo-formula-evento.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";

export interface VotoProyectoModel {
    id?: string,
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    proyecto?: ProyectoModel,
    perfil?: PerfilModel,
    descripcion?: string
    tipo?: CatalogoTipoVotoModel,
    numeroVoto?: number,
    formulaEvento?: CatalogoFormulaEventoModel
}
