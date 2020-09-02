import { ProyectoEntity } from "./proyecto.entity";
import { PerfilEntity } from "./perfil.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoTipoVotoEntity } from "./catalogos/catalogo-tipo-voto.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { ConfiguracionEventoEntity } from "./catalogos/configuracion-evento.entity";

export interface VotoProyectoEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    proyecto?: ProyectoEntity,
    perfil?: PerfilEntity,
    traducciones?: Array<TraduccionVotoProyectoEntity>,
    tipo?: CatalogoTipoVotoEntity,
    numeroVoto?: number,
    configuracion?: ConfiguracionEventoEntity
}

export interface TraduccionVotoProyectoEntity {
    _id?: string
    descripcion?: string
    idioma?: CatalogoIdiomaEntity //Catalogo Idioma
    original?: boolean
}