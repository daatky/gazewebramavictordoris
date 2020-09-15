import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({ providedIn: 'root' })
export class InternacionalizacionService {
    error:any
    constructor(
        private translateService: TranslateService,
    ) { }

    //GUARDA EL IDIOMA POR DEFECTO
    guardarIdiomaDefecto(idioma: string) {
        // idioma por defecto  //este idioma se usará como alternativa cuando no se encuentre una traducción en el idioma actual
        this.translateService.setDefaultLang(idioma)
        this.usarIidoma(idioma)
    }
    usarIidoma(idioma) {
        // Idioma actual o a cambia // el idioma a utilizar, si el idioma no está disponible, utilizará el cargador actual para obtenerlos
        this.translateService.use(idioma)
    }
    async obtenerTextoLlave(llave:string):Promise<string>{
        return await this.translateService.get(llave).toPromise()
    }   
    //Para los input me devuelve la traduccion estatica  
    obtenerTextoSincrono(llave:string,objeto?:Object):string{
        /*if(objeto) {
            return this.translateService.instant(llave,objeto)
        }*/
        return this.translateService.instant(llave,objeto)
    }
}