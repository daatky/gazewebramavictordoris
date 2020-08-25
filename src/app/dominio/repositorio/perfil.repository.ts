import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoService } from '../../nucleo/servicios/remotos/pago.service';
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CatalogoTipoPerfilEntity, CatalogoTipoPerfilMapperService } from '../entidades/catalogos/catalogo-tipo-perfil.entity';
import { PerfilService } from '../../nucleo/servicios/remotos/perfil.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PerfilRepository {

    constructor(protected http: HttpClient, private perfilServicie: PerfilService, private mapeador: CatalogoTipoPerfilMapperService, private localStorage: LocalStorage) {

    }

    obtenerCatalogoTipoPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        return this.perfilServicie.obtenerCatalogoTipoPerfil()
            .pipe(
                map(data => {
                    return this.mapeador.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    almacenarCatalogoPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        return this.localStorage.almacenarCatalogoPerfiles(tipoPerfiles);
    }

    obtenerCatalogoTipoPerfilLocal(): CatalogoTipoPerfilModel[] {
        return this.localStorage.obtenerCatalogoPerfiles();
    }


}