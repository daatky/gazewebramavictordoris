import { Injectable } from '@angular/core'
import { InternacionalizacionService } from '../../nucleo/servicios/locales/internacionalizacion.service';

@Injectable({
    providedIn: 'root'
})
export class InternacionalizacionRepository {
    constructor(
        private internacionalizacionService:InternacionalizacionService
    ){}
    guardarIdiomaDefecto(idioma:string){
        this.internacionalizacionService.guardarIdiomaDefecto(idioma)
    }

    usarIidoma(idioma:string){
        this.internacionalizacionService.usarIidoma(idioma)
    }

    obtenerTextoLlave(llave:string){
        return this.internacionalizacionService.obtenerTextoLlave(llave)
    }
}