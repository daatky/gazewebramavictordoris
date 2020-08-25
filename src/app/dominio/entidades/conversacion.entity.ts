import { ConfiguracionEntity } from "./configuracion.entity";
import { MensajeEntity } from "./mensaje.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { AsociacionEntity } from "./asociacion.entity";

export interface ConversacionEntity {
  id: string
  estado: CatalogoEstadoEntity //CatalogoEstado
  fechaCreacion: Date
  fechaActualizacion: Date
  asociacion: AsociacionEntity //Asociacion
  ultimoMensaje: MensajeEntity //Mensaje
  mensajes: Array<MensajeEntity> //Mensaje
  configuracion: ConfiguracionEntity //Configuracion
}