import { ConfiguracionEstiloEntity } from "./configuracion-estilo.entity";
import { MensajeEntity } from "./mensaje.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { AsociacionEntity } from "./asociacion.entity";

export interface ConversacionEntity {
  _id?: string
  estado?: CatalogoEstadoEntity //CatalogoEstado
  fechaCreacion?: Date
  fechaActualizacion?: Date
  asociacion?: AsociacionEntity //Asociacion
  ultimoMensaje?: MensajeEntity //Mensaje
  mensajes?: Array<MensajeEntity> //Mensaje
}