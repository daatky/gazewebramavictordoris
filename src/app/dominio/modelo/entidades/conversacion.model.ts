import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { AsociacionModel } from "./asociacion.model";
import { ConfiguracionModel } from "./configuracion.model";
import { MensajeModel } from "./mensaje.model";

export interface ConversacionModel {
  id?: string
  estado?: CatalogoEstadoModel //CatalogoEstado
  fechaCreacion?: Date
  fechaActualizacion?: Date
  asociacion?: AsociacionModel //Asociacion
  ultimoMensaje?: MensajeModel //Mensaje
  mensajes?: Array<MensajeModel> //Mensaje
  configuracion?: ConfiguracionModel //Configuracion
}