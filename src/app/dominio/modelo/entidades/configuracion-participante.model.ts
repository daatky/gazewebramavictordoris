import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ParticipanteAsociacionModel } from "./participante-asociacion.model";
import { ConfiguracionEstiloModel } from "./configuracion-estilo.model";

export interface ConfiguracionParticipanteModel{
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    propietario:ParticipanteAsociacionModel
    asignado:ParticipanteAsociacionModel
    configuracionEstilo:ConfiguracionEstiloModel
}