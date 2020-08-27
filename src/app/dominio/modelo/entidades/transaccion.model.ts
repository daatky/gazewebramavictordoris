import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoOrigenModel } from "../catalogos/catalogo-origen.model";
import { CatalogoTipoMonedaModel } from "../catalogos/catalogo-tipo-moneda.model";
import { BalanceModel } from "./balance.model";
import { BeneficiarioModel } from "./beneficiario.model.";
import { CatalogoMetodoPagoModel } from "../catalogo-metodo-pago.model";


export interface TransaccionModel {
    id: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    estado: CatalogoEstadoModel,
    monto: number,
    moneda: CatalogoTipoMonedaModel,
    descripcion: string,
    origen: CatalogoOrigenModel,
    balance: Array<BalanceModel>,
    beneficiario: BeneficiarioModel,
    metodoPago: CatalogoMetodoPagoModel
}