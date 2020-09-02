import { EstiloEntity } from "./estilo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoEntidadEntity } from "./catalogos/catalogo-entidad.entity";
import { CatalogoConfiguracionEntity } from "./catalogos/catalogo-configuracion.entity";
import { CatalogoPaticipanteConfiguracionEntity } from "./catalogos/catalogo-participante-configuracion.entity"


export interface ConfiguracionEstiloEntity {
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?: string
    entidad?: CatalogoEntidadEntity
    silenciada?: boolean
    tonoNotificacion?: string
    estilos?: Array<EstiloEntity>
    tipo?: CatalogoConfiguracionEntity
    catalogoPaticipante?:CatalogoPaticipanteConfiguracionEntity
}