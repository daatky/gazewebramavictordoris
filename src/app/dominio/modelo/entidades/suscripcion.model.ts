import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { TransaccionModel } from "./transaccion.model";
import { CatalogoSuscripcionModel } from "../catalogos/catalogo-suscripcion.model";

export interface SuscripcionModel {
    id?: string,
    fechaCreacion?: Date,
    fechaRenovacion?: Date,
    estado?: CatalogoEstadoModel,
    tipo?: CatalogoSuscripcionModel,
    transacion?: TransaccionModel
}