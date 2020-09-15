import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PensamientoRepository } from "../repositorio/pensamiento.repository";
import { PensamientoModel } from '../modelo/pensamiento.model';
//import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service';
import { PaginacionModel } from '../modelo/paginacion-model';

@Injectable({
    providedIn: 'root'
})
export class PensamientoNegocio {
    paginacionPrivado: number
    paginacionPublico: number
    constructor(
        //private variablesGlobales: VariablesGlobales,
        //private pensamientoRepository:PensamientoRepository
        private pensamientoRepository: PensamientoRepository
    ) {
        this.paginacionPrivado = 1
        this.paginacionPublico = 1
    }
    obtenerPensamientoAleatorio(): Observable<PensamientoModel> {
        return this.pensamientoRepository.obtenerPensamientoAleatorio()
            .pipe(
                map((data: PensamientoModel) => {
                    return data
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    obtenerPensamientos(idPerfil: string, esPrivado: boolean): Observable<Array<PensamientoModel>> {
        return this.pensamientoRepository.obtenerPensamientos(idPerfil, esPrivado)
            .pipe(
                map((data: Array<PensamientoModel>) => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    crearPensamiento(idPerfil: string, publico: boolean, pensamiento: string): Observable<PensamientoModel> {
        return this.pensamientoRepository.crearPensamiento({ perfil: { _id: idPerfil }, traducciones: [{ texto: pensamiento }], publico: publico })
            .pipe(
                map((data: PensamientoModel) => {
                    return data
                }),
                catchError(err => {

                    return throwError(err)
                })
            )
    }
    actualizarPensamiento(idPensamiento: string, pensamiento: string): Observable<string> {
        return this.pensamientoRepository.actualizarPensamiento({ _id: idPensamiento, traducciones: [{ texto: pensamiento }] })
            .pipe(
                map((data: string) => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    actualizarEstadoPensamiento(idPensamiento: string): Observable<PensamientoModel> {
        return this.pensamientoRepository.actualizarEstadoPensamiento(idPensamiento)
            .pipe(
                map((data: PensamientoModel) => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    eliminarPensamiento(idPensamiento: string): Observable<string> {
        return this.pensamientoRepository.eliminarPensamiento(idPensamiento)
            .pipe(
                map(data => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    cargarMasPensamientos(idPerfil: string, limite: number, esPublico: boolean): Observable<Array<PensamientoModel>> {
        let pagina = this.obtenerPagina(esPublico)
        if (pagina > 0) {
            return this.pensamientoRepository.cargarMasPensamientos(idPerfil, limite, pagina, esPublico)
                .pipe(
                    map((data: PaginacionModel<PensamientoModel>) => {
                        this.llenarPaginaActual(esPublico, data.proximaPagina)
                        //this.llenarDatos(this.variablesGlobales.paginacionPublico.actual, this.variablesGlobales.paginacionPublico.total, data.length, esPrivado)
                        return data.lista
                    }),
                    catchError(err => {
                        console.log(err)
                        return throwError(err)
                    })
                )
        }
        return of(null)
    }
    //retorna la pagin actual a la que hay que realizar la conlta pra la paginacion
    obtenerPagina(esPublico: boolean): number {
        if (esPublico) {
            return this.paginacionPublico
        } else {
            return this.paginacionPrivado
        }
    }
    //Para llenar momentaneamente la pagina actual de cada una de las variables Publico y privado
    llenarPaginaActual(esPublico: boolean, cargarMas: boolean) {
        if (!cargarMas) {
            if (esPublico) {
                this.paginacionPublico = -1
            } else {
                this.paginacionPrivado = -1
            }
        } else {
            if (esPublico) {
                this.paginacionPublico++
            } else {
                this.paginacionPrivado++
            }
        }
    }

    //Array<PensamientoModel>
    /*ordenar(data: Array<PensamientoModel>): Array<PensamientoModel> {
        console.log(data)
        // data.sort((a, b)=> b.fechaActualizacion.getTime() > a.fechaActualizacion.getTime())
        return data.sort(function (a, b) { return a.fechaActualizacion.getTime() - b.fechaActualizacion.getTime() })
    }*/


    /*ordenarAsc(data:Array<any>, key) {
        data.sort(function (a, b) {
           return a[key] > b[key];
        });
     }*/
    //Para no perfmitir duplicidad de datos en caso de que alguien cambie de estado (Privado,publico) un pensamiento 
    //Y al traer de la base de datos traiga nuevamente el pensamiento actualizado
    verificarDuplicidadDatos(listaMomentanea: PensamientoModel[], listaBaseDatos: PensamientoModel[], esPublico: boolean):PensamientoModel[] {
        let lista:PensamientoModel[]=listaMomentanea
        let variableEstado = 0
        if (esPublico) {
            variableEstado = this.paginacionPublico
        } else {
            variableEstado = this.paginacionPrivado
        }
        if (listaMomentanea.length > 0) {
            if (variableEstado > 2) {
                lista.push(...listaBaseDatos)
                return lista
            } else {
                return listaBaseDatos
            }
        } else {
            return listaBaseDatos
        }
    }
}