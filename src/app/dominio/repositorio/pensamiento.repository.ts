import { Injectable } from "@angular/core";
import { PensamientoService } from "../../nucleo/servicios/remotos/pensamiento.service";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { PensamientoEntity, PensamientoMapperService } from "../entidades/pensamiento.entity";
import { PensamientoModel, PensamientoRemotoModel } from '../modelo/pensamiento.model';

@Injectable({
    providedIn: 'root'
})

export class PensamientoRepository {
    constructor(   
        private pensamientoService:PensamientoService,
        private pensamientoMapperService:PensamientoMapperService 
    ){        
    }

    obtenerPensamientoAleatorio(): Observable<PensamientoModel> {
        console.log('VOY A ONTENER LOS PENSAMIENTO ALEATORIOS')
        return this.pensamientoService.obtenerPensamientoAleatorio()
            .pipe(
                map(data => {
                    return this.pensamientoMapperService.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    obtenerPensamientoPublicos(idPerfil:string):Observable<Array<PensamientoModel>>{
        return this.pensamientoService.obtenerPensamientoPublicos(idPerfil)
        .pipe(
            map(data=> {
                console.log(data)
                return this.pensamientoMapperService.transform(data.respuesta.datos);
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }
    obtenerPensamientosPrivados(idPerfil:string):Observable<Array<PensamientoModel>>{
        return this.pensamientoService.obtenerPensamientoPublicos(idPerfil)
        .pipe(
            map(data=> {
                console.log(data)
                return this.pensamientoMapperService.transform(data.respuesta.datos);
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }
    crearPensamiento(datos:PensamientoRemotoModel):Observable<PensamientoModel>{
        return this.pensamientoService.crearPensamiento(datos)
        .pipe(
            map(data => {
                console.log(data)
                return this.pensamientoMapperService.transform(data.respuesta.datos);
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }
    actualizarPensamiento(datos:object):Observable<string>{
        return this.pensamientoService.actualizarPensamiento(datos)
        .pipe(
            map(data => {
                console.log(data)
                return data.respuesta.mensaje;
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }   
    actualizarEstadoPensamiento(idPensamiento:string):Observable<PensamientoModel>{
        return this.pensamientoService.actualizarEstadoPensamiento(idPensamiento)
        .pipe(
            map(data => {
                console.log(data)
                //return data.respuesta.mensaje;
                return data.respuesta.datos
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )   
    } 

    eliminarPensamiento(idPensamiento:string):Observable<string>{
        return this.pensamientoService.eliminarPensamiento(idPensamiento)
        .pipe(
            map(data => {
                console.log(data)
                return data.respuesta.mensaje
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }
    cargarPensamientosPrivados(idPerfil:string,limite:number,pagina:number){
        return this.pensamientoService.cargarPensamientosPrivados(idPerfil,limite,pagina)
        .pipe(
            map(data => {
                console.log(data)
                //return data.respuesta.datos
                return this.pensamientoMapperService.transform(data.respuesta.datos);
            }),
            catchError(err => {
                console.log(err)
                return throwError(err)
            })
        )
    }
}