
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Pensamiento } from './rutas/pensamientos.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { PensamientoEntity } from "../../../../app/dominio/entidades/pensamiento.entity";
import { APIGAZE } from './rutas/api-gaze.enum';
import { PensamientoRemotoModel } from 'src/app/dominio/modelo/pensamiento.model';

@Injectable({ providedIn: 'root' })
export class PensamientoService {
    constructor(private http: HttpClient) {
    }
    // OBTENER pensamiento aleatorio
    obtenerPensamientoAleatorio(): Observable<RespuestaRemota<PensamientoEntity>> {
        return this.http.get<RespuestaRemota<PensamientoEntity>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString());

    }
    obtenerPensamientoPublicos(idPerfil:string):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString()+"/"+idPerfil);
    }
    obtenerPensamientosPrivados(idPerfil:string):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString()+"/"+idPerfil);
    }
    crearPensamiento(data:PensamientoRemotoModel):Observable<RespuestaRemota<PensamientoEntity>>{
        return this.http.post<RespuestaRemota<PensamientoEntity>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString(),data);
    }
    actualizarPensamiento(data:object):Observable<RespuestaRemota<string>> {
        return this.http.put<RespuestaRemota<string>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString(),data);

    }
    actualizarEstadoPensamiento(idPensamiento:string):Observable<RespuestaRemota<PensamientoEntity>>{
        return this.http.put<RespuestaRemota<PensamientoEntity>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString()+`/${idPensamiento}`,{})
    }    
    eliminarPensamiento(idPensamiento:string):Observable<RespuestaRemota<string>>{
        console.log(idPensamiento)
        return this.http.delete<RespuestaRemota<string>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString()+`/${idPensamiento}`)
    }
    cargarPensamientosPrivados(idPerfil:string,limite:number,pagina:number):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO.toString()+`/${idPerfil}/${limite}/${pagina}`);
    }
}