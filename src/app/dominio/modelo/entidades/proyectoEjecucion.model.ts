import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";

export interface ProyectoEjecucionModel {
    id?: string,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    titulo?: string
    tituloCorto?: string
    descripcion?: string
    tags?: Array<string>
}