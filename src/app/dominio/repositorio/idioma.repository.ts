
import { IdiomaService } from '../../nucleo/servicios/remotos/idioma.service'
import { Injectable } from '@angular/core'
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity'
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service'
@Injectable({
    providedIn: 'root'
})
export class IdiomaRepository {

    constructor(
        private idiomaService: IdiomaService,
        private localStorage:LocalStorage
    ) { }
    guardarIdiomaLocal(idioma: CatalogoIdiomaEntity){
        this.localStorage.guardarIdiomaLocal(idioma)
    }    
    obtenerIdiomaLocal():CatalogoIdiomaEntity{
        return this.localStorage.obtenerIdiomaLocal()
    }
    guardarIdiomas(idiomas:Array<CatalogoIdiomaEntity>){
        this.localStorage.guardarIdiomas(idiomas)
    }   
    obtenerIdiomas(): Array<CatalogoIdiomaEntity>{
        return this.localStorage.obtenerIdiomas()
    }
    //  obtenerCatalogoIdiomas():Observable<RespuestaRepositorio<any>>{
    obtenerCatalogoIdiomas(): Observable<CatalogoIdiomaEntity[]> {
        return this.idiomaService.obtenerCatalogoIdiomas()
            .pipe(
                map(data => {
                    console.log(data)
                    //return data.respuesta.datos;
                    return []
                }),
                catchError(err => {
                    console.log(err)
                    return throwError(err)
                })
            )
    }
}