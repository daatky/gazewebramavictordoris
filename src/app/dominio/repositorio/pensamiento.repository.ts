import { Injectable } from "@angular/core";
import { PensamientoService } from "../../nucleo/servicios/remotos/pensamiento.service";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { PensamientoEntity, PensamientoMapperService } from "../entidades/pensamiento.entity";
import { PensamientoModel } from '../modelo/pensamiento.model';


@Injectable({
    providedIn: 'root'
})

export class PensamientoRepository {
    constructor(
        private pensamientoService: PensamientoService,
        private pensamientoMapperService: PensamientoMapperService
    ) {
    }

    obtenerPensamientoAleatorio(): Observable<PensamientoModel> {
        return this.pensamientoService.obtenerPensamientoAleatorio()
            .pipe(
                map(data => {
                    return this.pensamientoMapperService.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
    obtenerPensamientos(idPerfil: string, esPrivado: boolean): Observable<Array<PensamientoModel>> {
        return this.pensamientoService.obtenerPensamientos(idPerfil, esPrivado)
            .pipe(
                map(data => {
                    return this.pensamientoMapperService.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    //console.log(err)
                    return throwError(err)
                })
            )
    }
    //PensamientoRemotoModel
    crearPensamiento(datos: PensamientoEntity): Observable<PensamientoModel> {
        console.log("DATOS QUE ENVIO")
        console.log(datos)
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
    actualizarPensamiento(datos: PensamientoEntity): Observable<string> {
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
    actualizarEstadoPensamiento(idPensamiento: string): Observable<PensamientoModel> {
        return this.pensamientoService.actualizarEstadoPensamiento(idPensamiento)
            .pipe(
                map(data => {
                    console.log(data)
                    return this.pensamientoMapperService.transform(data.respuesta.datos)
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }

    eliminarPensamiento(idPensamiento: string): Observable<string> {
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
    cargarMasPensamientos(idPerfil: string, limite: number, pagina: number, esPrivado: boolean): Observable<Array<PensamientoModel>> {
        return this.pensamientoService.cargarMasPensamientos(idPerfil, limite, pagina, esPrivado)
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