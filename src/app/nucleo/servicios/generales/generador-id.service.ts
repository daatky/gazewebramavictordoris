import { Injectable } from '@angular/core'
import { VariablesGlobales } from './variables-globales.service'

class RNG {
    m: number
    a: number
    c: number
    state: any
    nextInt: () => any
    nextFloat: () => any
    nextRange: (start: any, end: any) => any
    choice: (array: any) => any

    constructor(seed:any) {
        // constantes de GCC
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }
}

// Genera un codigo unico de 30 caracteres en base a una semilla
// La semilla debe ser un numero entero diferente para codigo que quiera generar
@Injectable({ providedIn: 'root' })
export class GeneradorId {

    constructor(
        private variablesGlobales:VariablesGlobales
    ) {
        
    }

    generarIdConSemilla() {
        const codigo = this.obtenerCodigo(this.variablesGlobales.semillaItemsId)
        this.variablesGlobales.semillaItemsId += 1
        return codigo
    }


    obtenerCodigo(semilla:number){
        RNG.prototype.nextInt = function() {
            this.state = (this.a * this.state + this.c) % this.m;
            return this.state;
        }
        RNG.prototype.nextFloat = function() {
            return this.nextInt() / (this.m - 1);
        }
        RNG.prototype.nextRange = function(start, end) {
            var rangeSize = end - start;
            var randomUnder1 = this.nextInt() / this.m;
            return start + Math.floor(randomUnder1 * rangeSize);
        }
        RNG.prototype.choice = function(array) {
            return array[this.nextRange(0, array.length)];
        }
        var rng = new RNG(semilla);
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789".split('');
        var codigo = "";
        for (var i = 0; i < 30; i++) {
            codigo += rng.choice(caracteres);
        }
        return codigo;
    }

}