import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { MensajeModel } from "./mensaje.model";
import { AsociacionModel } from '../asociacion.model';

export interface ConversacionModel {
  id?: string
  estado?: CatalogoEstadoModel //CatalogoEstado
  fechaCreacion?: Date
  fechaActualizacion?: Date
  asociacion?: AsociacionModel //Asociacion
  ultimoMensaje?: MensajeModel //Mensaje
  mensajes?: Array<MensajeModel> //Mensaje
}