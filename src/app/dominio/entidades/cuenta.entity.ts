import { PerfilEntity } from "../entidades/perfil.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { IniciarSesionModel } from '../modelo/iniciar-sesion.model';

export interface IniciarSesionEntity {
    perfil: PerfilEntity[],
    tokenAccess: string,
    tokenRefresh: string
}

@Injectable({ providedIn: 'root' })
export class CatalogoTipoPerfilMapperService extends MapedorService<IniciarSesionEntity, IniciarSesionModel> {

    protected map(entity: IniciarSesionEntity): IniciarSesionModel {
        return {
            tokenAccess: entity.tokenAccess,
            tokenRefresh: entity.tokenRefresh,
            perfil : entity.perfil
        };
    }

}