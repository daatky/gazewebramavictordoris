import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { PensamientoEntity } from "../entidades/pensamiento.entity";
import { map, catchError } from "rxjs/operators";
import { PensamientoRepository } from "../repositorio/pensamiento.repository";
import { PensamientoModel } from '../modelo/pensamiento.model';
import { VariablesGlobales, Paginacion } from 'src/app/nucleo/servicios/generales/variables-globales.service';

@Injectable({
    providedIn: 'root'
})
export class PensamientoNegocio {
    constructor(
        private variablesGlobales:VariablesGlobales,
        //private pensamientoRepository:PensamientoRepository
        private pensamientoRepository: PensamientoRepository
    ) { }
    obtenerPensamientoAleatorio(): Observable<PensamientoModel> {
        return this.pensamientoRepository.obtenerPensamientoAleatorio()
            .pipe(
                map((data: PensamientoModel) => {    
                    console.log(data)                
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    /*
    obtenerPensamientoPublicos(idPerfil:string): Observable<Array<PensamientoModel>> {
        //Para saber que lista debo cargar mas
        this.isPublico=true
        return this.pensamientoRepository.obtenerPensamientoPublicos(idPerfil)
            .pipe(
                map((data:Array<PensamientoModel>) => {                    
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    obtenerPensamientosPrivados(idPerfil:string){
        this.isPublico=false
        return this.pensamientoRepository.obtenerPensamientosPrivados(idPerfil)
            .pipe(
                map((data:Array<PensamientoModel>) => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }*/
    obtenerPensamientos(idPerfil:string,esPrivado:boolean){
        return this.pensamientoRepository.obtenerPensamientos(idPerfil,esPrivado)
            .pipe(
                map((data:Array<PensamientoModel>) => {
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    crearPensamiento(idPerfil:string,publico:boolean,pensamiento:string):Observable<PensamientoModel> {
        return this.pensamientoRepository.crearPensamiento({perfil:idPerfil,texto:pensamiento,publico:publico})
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
    actualizarPensamiento(idPensamiento:string,pensamiento:string):Observable<string>{
        return this.pensamientoRepository.actualizarPensamiento({_id:idPensamiento,texto:pensamiento})
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
    actualizarEstadoPensamiento(idPensamiento:string):Observable<PensamientoModel>{
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
    eliminarPensamiento(idPensamiento:string):Observable<string>{
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
    cargarMasPensamientos(idPerfil:string,limite:number,pagina:number,esPrivado:boolean):Observable<Array<PensamientoModel>>{
        return this.pensamientoRepository.cargarMasPensamientos(idPerfil,limite,pagina,esPrivado)
            .pipe(
                map(data => {
                    this.llenarDatos(this.variablesGlobales.paginacionPublico.actual,this.variablesGlobales.paginacionPublico.total,data.length,esPrivado)                    
                    return data
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
    //LLega la pagina actual en la que nos encontramos,total que esta en la aplicacion, total de paginas que el backend envia, 
    llenarDatos(actual:number,total:number,nuevoTotal:number,esPrivado:boolean){
        //this.variablesGlobales.paginacionPublico=this.llenarDatos(this.variablesGlobales.paginacionPublico.actual,this.variablesGlobales.paginacionPublico.total,data.length)                    
        let respuesta={actual:1,total:undefined}
        if(!total){
            console.log('NO EXISTE')
            //Guardar total paginacion
            respuesta.total=nuevoTotal
        }
        if(total===actual){
            respuesta.actual=-1
        }else{
            respuesta.actual++
        }
        //Para asignar a la varible que le corresponda 
        if(esPrivado){
            this.variablesGlobales.paginacionPrivado=respuesta
        }else{
            this.variablesGlobales.paginacionPublico=respuesta
        }
    }
}