import { PerfilEntity, PerfilEntityMapperServicePerfil } from "./perfil.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { IniciarSesionModel } from '../modelo/iniciar-sesion.model';
import { TokenEntity } from './token.entity';
import { CatalogoTipoPerfilMapperService2, CatalogoTipoPerfilEntity } from './catalogos/catalogo-tipo-perfil.entity';

export interface IniciarSesionEntity extends TokenEntity {
    perfil?: CatalogoTipoPerfilEntity[],
}

@Injectable({ providedIn: 'root' })
export class IniciarSesionMapperService extends MapedorService<IniciarSesionEntity, IniciarSesionModel> {
    constructor(private catalogoTipoPerfilMapperService2: CatalogoTipoPerfilMapperService2) {
        super();
    }

    protected map(entity: IniciarSesionEntity): IniciarSesionModel {
        return {
            tokenAccess: entity.tokenAccess,
            tokenRefresh: entity.tokenRefresh,
            perfil: this.catalogoTipoPerfilMapperService2.transform(entity.perfil)
        };
    }

}