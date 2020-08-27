import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoFormulaEventoModel } from "../catalogos/catalogo-formula-evento.model";
import { ConfiguracionEventoModel } from "../catalogos/configuracion-evento.model";
import { ProyectoModel } from "./proyecto.model";

export interface EventoModel {
    id: string,
    estado: CatalogoEstadoModel,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    fechaInicio: Date,
    fechaFin: Date,
    configuracionEvento: ConfiguracionEventoModel, //CONFIGURACION EVENTO
    formulas: Array<CatalogoFormulaEventoModel>,
    proyectos: Array<ProyectoModel>
}