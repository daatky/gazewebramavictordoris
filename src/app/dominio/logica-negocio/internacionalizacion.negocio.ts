import { Injectable } from '@angular/core'
import { InternacionalizacionRepository } from '../repositorio/internacionalizacion.repository';
import { IdiomaNegocio } from './idioma.negocio';
import { CodigosCatalogoIdioma } from '../../nucleo/servicios/remotos/codigos-catalogos/catalogo-idioma.enum'

@Injectable({
    providedIn: 'root'
})
export class InternacionalizacionNegocio {
    error:string
    constructor(
        private internacionalizacionRepository:InternacionalizacionRepository,        
        private idiomaNegocio:IdiomaNegocio
    ){}

    guardarIdiomaDefecto(){
        //Guarda en el servicio de internacionalizacion el idioma por defecto
        this.internacionalizacionRepository.guardarIdiomaDefecto(this.obtenerIdiomaInternacionalizacion())
    }    
    obtenerIdiomaInternacionalizacion():string{        
        //let idioma='en'
        let idioma = CodigosCatalogoIdioma.INGLES.toString()
        let idiomaGuardado = this.idiomaNegocio.obtenerIdiomaSeleccionado()
        if(idiomaGuardado){
            idioma=idiomaGuardado.codNombre
        }
        return idioma
    }

    usarIidoma(idioma:string){
        this.internacionalizacionRepository.usarIidoma(idioma)
    }

    obtenerTextoLlave(llave:string):Promise<string>{
        return this.internacionalizacionRepository.obtenerTextoLlave(llave)
    }
    obtenerTextoSincrono(llave:string,objeto?:Object):string{
        return this.internacionalizacionRepository.obtenerTextoSincrono(llave,objeto)
    }
}