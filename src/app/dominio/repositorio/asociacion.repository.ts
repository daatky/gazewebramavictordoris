import { Injectable } from "@angular/core"
import { AsociacionService } from "../../nucleo/servicios/remotos/asociacion.service";
import { map, catchError } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { PaginacionMapper, PaginacionModel } from "../modelo/paginacion-model"
import { ParticipanteAsociacionModel } from "../modelo/participante-asociacion.model";
import { throwError } from "rxjs/internal/observable/throwError";
import { ParticipanteAsosiacionEntityMapperModel } from "../entidades/participante-asociacion.entity";

@Injectable({ providedIn: 'root' })
export class AsociacionRepository {
    constructor
        (
            private asociacionService: AsociacionService,
            private paginacionMapper: PaginacionMapper,
            private participanteAsosiacionEntityMapperModel: ParticipanteAsosiacionEntityMapperModel
        ) { }

    obtenerMisContactos(idPerfil: string, limite: number, pagina: number): Observable<PaginacionModel<ParticipanteAsociacionModel>> {
        return this.asociacionService.obtenerMisContactos(idPerfil, limite, pagina)
            .pipe(
                map(data => {
                    let paginacion = this.paginacionMapper.transform(data);
                    paginacion.lista = this.participanteAsosiacionEntityMapperModel.transform(data.body.respuesta.datos)
                    return paginacion;
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

}