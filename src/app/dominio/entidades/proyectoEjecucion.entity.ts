import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
export interface ProyectoEjecucionEntity {
    id: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    traducciones: Array<TraduccionProyectoEjecucionEntity>,
}

export interface TraduccionProyectoEjecucionEntity {
    id: string
    titulo: string
    tituloCorto: string
    descripcion: string
    tags: Array<string>
    idioma: CatalogoIdiomaEntity 
    original: boolean
}
