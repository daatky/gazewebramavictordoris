import { CatalogoRolesEntity } from './catalogo-roles.entity';
import { CatalogoEstadoEntity } from './catalogo-estado.entity';

export interface CatalogoAccionRolEntity {
    id: string
    codigo: string
    estado: CatalogoEstadoEntity,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    tipo: Array<CatalogoRolesEntity>
}