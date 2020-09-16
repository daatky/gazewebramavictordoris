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
    cargarPensamientosPublicos(idPerfil: string, limite: number, esPublico: boolean, estoyCargandoMas:boolean): Observable<Array<PensamientoModel>> {        
        //se reinicia a 1 paginacionPublico para saber que voy a obtener los pensamientos, no cargar mas 
        if(!estoyCargandoMas){
            this.paginacionPublico=1
        }
        if (this.paginacionPublico > 0) {
            return this.pensamientoRepository.cargarMasPensamientos(idPerfil, limite, this.paginacionPublico, esPublico)
                .pipe(
                    map((data: PaginacionModel<PensamientoModel>) => {
                        //this.llenarPaginaActual1(esPublico, data.proximaPagina)
                        if(data.proximaPagina){
                            this.paginacionPublico++
                        }else{
                            this.paginacionPublico=-1
                        }
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
    cargarPensamientosPrivados(idPerfil: string, limite: number, esPublico: boolean, estoyCargandoMas:boolean): Observable<Array<PensamientoModel>> {        
        //se reinicia a 1 paginacionPrivado para saber que voy a obtener los pensamientos, no cargar mas 
        if(!estoyCargandoMas){
            this.paginacionPrivado=1
        }
        if (this.paginacionPrivado > 0) {
            return this.pensamientoRepository.cargarMasPensamientos(idPerfil, limite, this.paginacionPrivado, esPublico)
                .pipe(
                    map((data: PaginacionModel<PensamientoModel>) => {                        
                        //this.llenarPaginaActual1(esPublico, data.proximaPagina)
                        if(data.proximaPagina){
                            this.paginacionPrivado++
                        }else{
                            this.paginacionPrivado=-1
                        }
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
    //Para no perfmitir duplicidad de datos en caso de que alguien cambie de estado (Privado,publico) un pensamiento 
    //Y al traer de la base de datos traiga nuevamente el pensamiento actualizado
    verificarDuplicidadDatos(listaMomentanea: PensamientoModel[], listaBaseDatos: PensamientoModel[], esPublico: boolean):Array<PensamientoModel> {
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