import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { PaginacionModel } from "../modelo/paginacion-model";
import { ParticipanteAsociacionModel } from '../modelo/participante-asociacion.model';
import { AsociacionRepository } from "../repositorio/asociacion.repository";

@Injectable({
    providedIn: 'root'
})
export class AsociacionNegocio {
    paginacionContactos: PaginacionModel<ParticipanteAsociacionModel>;

    constructor(
        private asociacionRepository: AsociacionRepository
    ) {

    }

    obtenerMisContactos(idPerfil: string): Observable<ParticipanteAsociacionModel[]> {
        let limite = 4
        let pagina = 1
        return this.asociacionRepository.obtenerMisContactos(idPerfil, limite, pagina)
            .pipe(
                map((data: PaginacionModel<ParticipanteAsociacionModel>) => {
                    this.paginacionContactos = data
                    return data.lista;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )

    }

    obtenerMasContactos(idPerfil: string): Observable<ParticipanteAsociacionModel[]> {
        return null;
        /*
        return this.asociacionRepository.obtenerMisContactos(idPerfil, limite, pagina)
            .pipe(
                map((data: PaginacionModel<ParticipanteAsociacionModel>) => {
                    this.paginacionContactos = data
                    return data.lista;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
          */
    }
}