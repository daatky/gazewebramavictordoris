import { Injectable } from "@angular/core";
import { IdiomaRepository } from "../repositorio/idioma.repository";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HandleError } from 'src/app/nucleo/servicios/locales/handleError.service';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity'

@Injectable({
    providedIn: 'root'
})
export class IdiomaNegocio {
    //private observadorItem$ = new BehaviorSubject<string>('');
    constructor(private idiomaRepository: IdiomaRepository,
        private handleError: HandleError
        ) { }
    /*crearObservable():Observable<string>{
      //gENERA UN OBSERBALE
      return this.observadorItem$.asObservable();
    }*/
    guardarIdiomaSeleccionado(idioma: CatalogoIdiomaEntity){
        this.idiomaRepository.guardarIdiomaLocal(idioma)
    }

    obtenerIdiomaSeleccionado():CatalogoIdiomaEntity{
        return this.idiomaRepository.obtenerIdiomaLocal()
    }
    obtenerCatalogoIdiomas():Observable<Array<CatalogoIdiomaEntity>> {
        let idiomas:Array<CatalogoIdiomaEntity>=this.idiomaRepository.obtenerIdiomas()
        if(idiomas){
            console.log("CON IDIOMAS LOCALES")
            console.log(idiomas)
            return of(this.ordenarIdioma(idiomas))
        }else{
            console.log("SIN IDIOMAS")
            return this.idiomaRepository.obtenerCatalogoIdiomas()
            .pipe(
                map((data:Array<CatalogoIdiomaEntity>) => {  
                    console.log(data)  
                    console.log(data&&data.length>0)
                    if(data&&data.length>0){
                        console.log("1")
                        this.idiomaRepository.guardarIdiomas(data)                 
                        return this.ordenarIdioma(data)   
                    }
                    return null
                }),
                catchError(err=>{
                    return throwError(err)
                })
            )
        }
    }
    ordenarIdioma(data:Array<CatalogoIdiomaEntity>):any{
        return data.sort()
    }
}