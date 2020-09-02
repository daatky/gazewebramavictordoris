import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { ParticipanteAsociacionEntity } from "./participante-asociacion.entity";

export interface ConfiguracionEstiloEntity {
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    propietario:ParticipanteAsociacionEntity
    asignado:ParticipanteAsociacionEntity
    configuracionEstilo:ConfiguracionEstiloEntity
}