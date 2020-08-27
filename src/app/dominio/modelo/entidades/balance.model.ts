import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { TransaccionModel } from "./transaccion.model";

export interface BalanceModel {
    id: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    estado: CatalogoEstadoModel,
    valorActual: number,
    totalIngreso: number,
    totalEgreso: number,
    proviene: BalanceModel,
    transacciones: Array<TransaccionModel>
}