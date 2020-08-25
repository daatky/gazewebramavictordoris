import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { CatalogoPaisEntity } from 'src/app/dominio/entidades/catalogos/catalogo-pais.entity'
import { CatalogoLocalidadModel } from '../../../dominio/modelo/catalogo-localidad.model'
import { RespuestaRemota } from '../../util/respuesta'

@Injectable({ providedIn: 'root' })
export class UbicacionServiceRemoto {

    constructor(
        private http: HttpClient
    ) {

    }

    // Obtener el catalogo de paises
    obtenerCatalogoPaises(): Observable<RespuestaRemota<CatalogoPaisEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoPaisEntity[]>>(APIGAZE.BASE + Catalogo.PAIS.toString());
    }

    // Obtener el catalogo de localidades por pais
    obtenerCatalogoLocalidadesPorNombrePorPaises(pais:string, query:string): Observable<RespuestaRemota<CatalogoLocalidadModel[]>> {
        return this.http.get<RespuestaRemota<CatalogoLocalidadModel[]>>(APIGAZE.BASE + Catalogo.BUSCAR_LOCALIDAD.toString() + pais + '/' + query);
    }

}