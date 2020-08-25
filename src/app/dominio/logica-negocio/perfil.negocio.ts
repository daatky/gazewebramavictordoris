import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators'
import { PagoRepository } from "../repositorio/pago.repository";
import { CatalogoMetodoPagoEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { CatalogoTipoPerfilEntity } from "../entidades/catalogos/catalogo-tipo-perfil.entity";
import { PerfilRepository } from "../repositorio/perfil.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class PerfilNegocio {

    constructor(private perfilRepository: PerfilRepository) {

    }

    obtenerCatalogoTipoPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        const data: CatalogoTipoPerfilModel[] = this.perfilRepository.obtenerCatalogoTipoPerfilLocal()
        if (data) {
            return of(data)
        } else {
            return this.perfilRepository.obtenerCatalogoTipoPerfil()
                .pipe(
                    map((data: CatalogoTipoPerfilModel[]) => {
                        this.almacenarCatalogoPerfiles(data);
                        return data;
                    }),
                    catchError(err => {
                        return throwError(err)
                    })
                )
        }
    }

    almacenarCatalogoPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        return this.perfilRepository.almacenarCatalogoPerfiles(tipoPerfiles);
    }

    obtenerCatalogoTipoPerfilLocal(): CatalogoTipoPerfilModel[] {
        return this.perfilRepository.obtenerCatalogoTipoPerfilLocal();
    }

    conflictoCrearPerfil(tipoPerfilCrear: CatalogoTipoPerfilModel, tipoPerfiles: CatalogoTipoPerfilModel[]) {
        if (tipoPerfilCrear.codigo == "TIPERFIL_4") {
            //Es perfil de grupo
            return tipoPerfiles.filter((p) => p.perfil != null && p.codigo != "TIPERFIL_4").length > 0;
        } else {
            //Es perfil normal
            return tipoPerfiles.filter((p) => p.perfil != null && p.codigo == "TIPERFIL_4").length > 0;
        }
    }


    limpiarPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        tipoPerfiles.forEach(tipoPerfil => tipoPerfil.perfil = null)
        this.almacenarCatalogoPerfiles(tipoPerfiles);
    }

}