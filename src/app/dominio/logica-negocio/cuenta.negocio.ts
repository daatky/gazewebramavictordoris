import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuentaRepository } from "../repositorio/cuenta.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
//CuentaRepository
//iniciarSesion
@Injectable({
    providedIn: 'root'
})
export class CuentaNegocio {
    //private observadorItem$ = new BehaviorSubject<string>('');
    constructor(private cuentaRepository: CuentaRepository,
        ) { }

    iniciarSesion(email:string,contrasena:string):Observable<Array<any>> {
        let data={email:email,contrasena:contrasena}
        return this.cuentaRepository.iniciarSesion(data)
        .pipe(
            map(data => {  
                /*this.cuentaRepository.guardarTokenAutenticacion(data['datos']['token'])
                this.cuentaRepository.guardarTokenRefresh(data['datos']['tokenRefresh'])*/
                if(data['token']&&data['tokenRefresh']&&data['datos']){
                    this.cuentaRepository.guardarTokenAutenticacion(data['token'])
                    this.cuentaRepository.guardarTokenRefresh(data['tokenRefresh'])
                    //this.cuentaRepository.almacenarCatalogoPerfiles(data['datos'])
                    this.cuentaRepository.almacenarCatalogoPerfiles(this.formatearPerfilesLocalStorage(data['datos']))
                }                                   
                return data
            }),
            catchError(err=>{
                return throwError(err)
            })
        )
    }
    /*guardarTokenAutenticacion(token:string){
        this.cuentaRepository.guardarTokenAutenticacion(token)
    }
    guardarTokenRefresh(token:string){
        this.cuentaRepository.guardarTokenRefresh(token)
    }
    almacenarCatalogoPerfiles(tipoPerfiesUser:Array<any>){        
        this.cuentaRepository.almacenarCatalogoPerfiles(this.formatearPerfilesLocalStorage(tipoPerfiesUser))
    }*/
    formatearPerfilesLocalStorage(tipoPerfiesUser:Array<any>):Array<CatalogoTipoPerfilModel>{
        let catalogoTipoPerfilModel:Array<CatalogoTipoPerfilModel>=[]
        for (let i = 0; i < tipoPerfiesUser.length; i++) {
            catalogoTipoPerfilModel.push({
                descripcion:tipoPerfiesUser[i]['traducciones'][0]['descripcion'],
                mostrarDescripcion:false,
                nombre:tipoPerfiesUser[i]['traducciones'][0]['nombre'],
                codigo:tipoPerfiesUser[i]['codigo'],
                perfil:tipoPerfiesUser[i]['perfil']
            })
        }
        return catalogoTipoPerfilModel
    }
}