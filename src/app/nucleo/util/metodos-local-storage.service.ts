import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MetodosLocalStorageService {
    
    // Guarda datos en el local storage
    guardar(llave:string, valor:any) {
        localStorage.setItem(llave, JSON.stringify(valor))
    }

    // Obtener datos
    obtener(llave:string) {
        return JSON.parse(localStorage.getItem(llave))
    }

    // Remover
    remover(llave:string) {
        localStorage.removeItem(llave)
    }

    // Anadir metodos faltantes
    //REMOVER TODOS LO GUARDADO EN LOCALSTORAGE
    eliminarLocalStorage () {    
        localStorage.clear()
    };

}