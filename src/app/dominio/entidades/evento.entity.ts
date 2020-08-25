import { ProyectoEntity } from "./proyecto.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { ConfiguracionEventoEntity } from "./catalogos/configuracion-evento.entity";
import { CatalogoFormulaEventoEntity } from "./catalogos/catalogo-formula-evento.entity";

export interface EventoEntity {
    id: string,
    estado: CatalogoEstadoEntity,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    fechaInicio: Date,
    fechaFin: Date,
    configuracionEvento: ConfiguracionEventoEntity, //CONFIGURACION EVENTO
    formulas: Array<CatalogoFormulaEventoEntity>,
    proyectos: Array<ProyectoEntity>
}