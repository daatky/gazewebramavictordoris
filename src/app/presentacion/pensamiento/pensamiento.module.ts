import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { PensamientoRoutingModule } from "./pensamiento-routing.module";
import { PensamientoComponent } from './pensamiento.component';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PensamientoComponent
  ],
  imports: [    
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    CompartidoModule,
    PensamientoRoutingModule,    
  ],
  exports:[ 
    TranslateModule   
  ],
  providers:[    
  ]
})
export class PensamientoModule { }
