import { TransaccionEntity } from "./transaccion.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoSuscripcionEntity } from "./catalogos/catalogo-suscripcion.entity";

export interface SuscripcionEntity {
    id: string,
    fechaCreacion: Date,
    fechaRenovacion: Date,
    estado: CatalogoEstadoEntity,
    tipo: CatalogoSuscripcionEntity,
    transacion: TransaccionEntity
}