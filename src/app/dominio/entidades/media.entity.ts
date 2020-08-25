import { ArchivoEntity } from "./archivo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoMediaEntity } from "./catalogos/catalogo-media.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface MediaEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    tipo?: CatalogoMediaEntity,
    principal?: ArchivoEntity,
    miniatura?: ArchivoEntity,
    enlace?: string,
    traducciones?: Array<TraduccionMediaEntity>
}

export interface TraduccionMediaEntity {
    _id?: string,
    descripcion?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}