import { BalanceEntity } from "./balance.entity";
import { BeneficiarioEntity } from "./beneficiario.entity."
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoTipoMonedaEntity } from "./catalogos/catalogo-tipo-moneda.entity";
import { CatalogoOrigenEntity } from "./catalogos/catalogo-origen.entity";
import { CatalogoMetodoPagoEntity } from "./catalogos/catalogo-metodo-pago.entity";

export interface TransaccionEntity {
    id: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    estado: CatalogoEstadoEntity,
    monto: number,
    moneda: CatalogoTipoMonedaEntity,
    descripcion: string,
    origen: CatalogoOrigenEntity,
    balance: Array<BalanceEntity>,
    beneficiario: BeneficiarioEntity,
    metodoPago: CatalogoMetodoPagoEntity
}