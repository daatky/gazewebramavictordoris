import { Injectable } from '@angular/core'
import { InternacionalizacionRepository } from '../repositorio/internacionalizacion.repository';
import { IdiomaNegocio } from './idioma.negocio';

@Injectable({
    providedIn: 'root'
})
export class InternacionalizacionNegocio {
    constructor(
        private internacionalizacionRepository:InternacionalizacionRepository,        
        private idiomaNegocio:IdiomaNegocio
    ){}

    guardarIdiomaDefecto(){
        //Guarda en el servicio de internacionalizacion el idioma por defecto
        this.internacionalizacionRepository.guardarIdiomaDefecto(this.obtenerIdiomaInternacionalizacion())
    }    
    obtenerIdiomaInternacionalizacion():string{        
        let idioma='en'
        if(this.idiomaNegocio.obtenerIdiomaSeleccionado()){
            idioma=this.idiomaNegocio.obtenerIdiomaSeleccionado().codNombre
        }
        return idioma
    }

    usarIidoma(idioma:string){
        this.internacionalizacionRepository.usarIidoma(idioma)
    }

    obtenerTextoLlave(llave:string){
        return this.internacionalizacionRepository.obtenerTextoLlave(llave)
    }
}