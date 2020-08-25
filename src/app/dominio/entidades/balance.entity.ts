import { TransaccionEntity } from "./transaccion.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";

export interface BalanceEntity {
    id: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    estado: CatalogoEstadoEntity,
    valorActual: number,
    totalIngreso: number,
    totalEgreso: number,
    proviene: BalanceEntity,
    transacciones: Array<TransaccionEntity>
}