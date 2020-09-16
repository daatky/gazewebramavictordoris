import { PerfilResumenModel } from '../entidades/perfil-resumen.model'
import { PerfilModel, PerfilModelMapperService } from "../perfil.model"
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoTipoPerfilEntity } from '../../entidades/catalogos/catalogo-tipo-perfil.entity';
import { PerfilEntityMapperServicePerfilresumenModelo } from '../../entidades/perfil.entity';

export interface CatalogoTipoPerfilModel {
    codigo?: string,
    nombre?: string,
    descripcion?: string
    mostrarDescripcion?: boolean
    perfil?: PerfilResumenModel | PerfilModel
}

@Injectable({ providedIn: 'root' })
export class CatalogoTipoPerfilModelMapperService extends MapedorService<CatalogoTipoPerfilModel, CatalogoTipoPerfilEntity> {

    constructor(
        //private perfilMaper: PerfilModelMapperService
    ) {
        super()
    }

    protected map(model: CatalogoTipoPerfilModel,): CatalogoTipoPerfilEntity {
        return {
            codigo: model.codigo,
            // perfil: this.perfilMaper.transform(model.perfil)
        };
    }

}
