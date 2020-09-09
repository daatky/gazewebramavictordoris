import * as Hammer from 'hammerjs'
import { Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'

// Provider por defecto para eventos de tap, press y demas (por defecto)
@Injectable()
export class DetectorGestos extends HammerGestureConfig {
  buildHammer (element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    })
    return mc
  }
}

// Construye eventos de tap personalizados (tap, dobletap) para un mismo elemento
// Son personalizados porque el evento tap no se debe disparar al hacer dobletap en el elemento
@Injectable({ providedIn: 'root' })
export class EventoTapPersonalizado {
  construirEventosTap(elemento:HTMLElement) {
    const gestor = new Hammer.Manager(elemento, {
      touchAction: 'none'
    })
    const tap = new Hammer.Tap({ event: 'tap' })
    const dobletap = new Hammer.Tap({ event: 'dobletap', taps: 2 })
    const press = new Hammer.Press({ enable: true, time: 1000 })
    
    gestor.add([press, dobletap, tap])

    gestor.get('dobletap').recognizeWith(tap)
    gestor.get('tap').requireFailure(dobletap)

    return gestor
  }
}