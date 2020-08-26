
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
    obtenerPensamientos(idPerfil:string,esPrivado:boolean):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        console.log(esPrivado)
        if(esPrivado){            
            return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PRIVADO.toString()+`/${idPerfil}`);        
        }  
        console.log("PUBLICOS")
        console.log(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PUBLICO.toString()+`/${idPerfil}`)
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PUBLICO.toString()+`/${idPerfil}`);
    }
    /*obtenerPensamientoPublicos(idPerfil:string):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        console.log(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PUBLICO.toString()+"/"+idPerfil)
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PUBLICO.toString()+`/${idPerfil}`);
    }
    obtenerPensamientosPrivados(idPerfil:string):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.PENSAMIENTO_PRIVADO.toString()+`/${idPerfil}`);
    }*/
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
    cargarMasPensamientos(idPerfil:string,limite:number,pagina:number,esPrivado:boolean):Observable<RespuestaRemota<Array<PensamientoEntity>>>{
        //CARGAR MAS PENSAMIENTOS PRIVADOS
        if(esPrivado){
            return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.CARGAR_PENSAMIENTOS_PRIVADO.toString()+`/${idPerfil}/${limite}/${pagina}`);
        
        }        
        //CARGAR MAS PENSAMIENTOS PUBLICOS
        return this.http.get<RespuestaRemota<Array<PensamientoEntity>>>(APIGAZE.BASE + Pensamiento.CARGAR_PENSAMIENTOS_PUBLICO.toString()+`/${idPerfil}/${limite}/${pagina}`);
    }
}