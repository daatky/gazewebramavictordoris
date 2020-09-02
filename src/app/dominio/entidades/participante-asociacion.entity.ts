import { ConfiguracionEstiloEntity } from "./configuracion-estilo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { PerfilEntity } from "./perfil.entity";
import { RolEntidadEntity } from './rol-entidad.entity';

export interface ParticipanteAsociacionEntity {
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    roles?: Array<RolEntidadEntity> 
    invitadoPor?:ParticipanteAsociacionEntity
    configuraciones?:Array<ConfiguracionEstiloEntity>
    perfil?:PerfilEntity
    sobrenombre?:string 
}