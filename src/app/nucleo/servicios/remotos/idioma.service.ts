import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity';
import { RespuestaRemota } from '../../util/respuesta';
//import { retry, catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class IdiomaService {
    constructor(private http: HttpClient) {
    }

    // OBTENER el catalo
    obtenerCatalogoIdiomas(): Observable<RespuestaRemota<CatalogoIdiomaEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoIdiomaEntity[]>>(APIGAZE.BASE + Catalogo.IDIOMAS.toString());

    }

}
