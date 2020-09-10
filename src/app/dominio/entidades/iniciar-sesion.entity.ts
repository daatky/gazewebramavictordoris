import { PerfilEntity, PerfilEntityMapperServicePerfil } from "./perfil.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { IniciarSesionModel } from '../modelo/iniciar-sesion.model';
import { TokenEntity } from './token.entity';
import { CatalogoTipoPerfilMapperService2, CatalogoTipoPerfilEntity } from './catalogos/catalogo-tipo-perfil.entity';
import { UsuarioEntity, UsuarioEntityMapperService } from './usuario.entity';

export interface IniciarSesionEntity extends TokenEntity {
    usuario: UsuarioEntity
}

@Injectable({ providedIn: 'root' })
export class IniciarSesionMapperService extends MapedorService<IniciarSesionEntity, IniciarSesionModel> {
    constructor
        (
            private usuarioMapper: UsuarioEntityMapperService
        ) {
        super();
    }

    protected map(entity: IniciarSesionEntity): IniciarSesionModel {
        console.log("AQUI ESTOY")
        return {
            tokenAccess: entity.tokenAccess,
            tokenRefresh: entity.tokenRefresh,
            usuario: this.usuarioMapper.transform(entity.usuario)
        };
    }

}