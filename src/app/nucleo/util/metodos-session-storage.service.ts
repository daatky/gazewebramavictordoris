import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MetodosSessionStorageService {
    // Guarda datos en el storage
    guardar(llave: string, valor: any) {
        sessionStorage.setItem(llave, JSON.stringify(valor))
    }

    // Obtener datos
    obtener(llave: string) {
        return JSON.parse(sessionStorage.getItem(llave))
    }

    // Remover
    remover(llave: string) {
        sessionStorage.removeItem(llave)
    }

    // Anadir metodos faltantes
    //REMOVER TODOS LO GUARDADO EN STORAGE
    eliminarStorage() {
        sessionStorage.clear()
    };

}