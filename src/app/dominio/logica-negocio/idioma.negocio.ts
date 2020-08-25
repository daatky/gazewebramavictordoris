import { Injectable } from "@angular/core";
import { IdiomaRepository } from "../repositorio/idioma.repository";
import { Observable, throwError } from 'rxjs';
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
        return this.idiomaRepository.obtenerCatalogoIdiomas()
        .pipe(
            map((data:Array<CatalogoIdiomaEntity>) => {                      
                return this.ordenarIdioma(data)
            }),
            catchError(err=>{
                console.log(err)
                return throwError(err)
            })
        )
    }
    ordenarIdioma(data:Array<CatalogoIdiomaEntity>):any{
        return data.sort()
    }
}