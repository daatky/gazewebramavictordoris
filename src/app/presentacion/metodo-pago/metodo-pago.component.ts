import { BotonCompartido } from '../../compartido/diseno/modelos/boton.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface'
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { PagoNegocio } from '../../dominio/logica-negocio/pago.negocio'
import { EstiloDelTextoServicio } from "../../nucleo/servicios/diseno/estilo-del-texto.service";
import { Router } from '@angular/router';
import { CatalogoMetodoPagoModel } from 'src/app/dominio/modelo/catalogo-metodo-pago.model';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { IPayPalConfig } from 'ngx-paypal';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';
import {
  StripeService,
  StripeCardNumberComponent,
  StripeCardComponent,
} from "ngx-stripe";
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';

import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  StripeElementLocale,
} from "@stripe/stripe-js";
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { MetodoPagoStripeEntity } from 'src/app/dominio/entidades/catalogos/catalogo-metodo-pago.entity';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { DialogoContenido } from 'src/app/compartido/componentes/dialogo-contenido/dialogo-contenido.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdiomaNegocio } from 'src/app/dominio/logica-negocio/idioma.negocio';
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss']
})
export class MetodoPagoComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  configuracionAppBar: ConfiguracionAppbarCompartida;
  listaMetodoPago: CatalogoMetodoPagoModel[];
  estadoPendiente: string = 'EST_14';
  codigoPago: string
  pagoForm: FormGroup;
  idiomaSeleccionado: CatalogoIdiomaEntity;

  dataDialogo: DialogoContenido;
  dataLista: DatosLista;
  dialogoPaypalId = "paypaldialog";
  dialogoTarjetaId = "tarjetadialog";

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  dataBoton: BotonCompartido;
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#03486b",
        fontSmoothing: "antialiased",
        fontSize: "18px",
        fontFamily: 'Source Sans Pro, sans-serif',
        "::placeholder": {
          color: "#03486b",
        },
        fontWeight: "bold"
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "en",
  };


  constructor(
    private pagoNegocio: PagoNegocio,
    public estiloTexto: EstiloDelTextoServicio,
    private router: Router,
    private modalService: DialogoServicie,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private idiomaNegocio: IdiomaNegocio
  ) {
    this.preperarLista()
    this.obtenerCatalogoMetodosPago()
    this.configurarAppBar()
    this.configurarBotonPago()
    this.configurarDialogoContenido();
    this.obtenerIdioma();

  }

  navegarMetodoPago(metodoPago: CatalogoMetodoPagoModel) {
    if (metodoPago.codigo == "METPAG_1") {
      this.dataDialogo.titulo = "PAGO TARJETA"
      this.modalService.open(this.dialogoTarjetaId);
    } else {
      this.dataDialogo.titulo = "PAGO PAYPAL";
      this.modalService.open(this.dialogoPaypalId);
    }
  }

  obtenerCatalogoMetodosPago() {
    this.dataLista.cargando = true
    this.pagoNegocio.obtenerCatalogoMetodoPago()
      .subscribe((res: CatalogoMetodoPagoModel[]) => {
        console.log(res)
        this.dataLista.cargando = false
        this.listaMetodoPago = res;
      }, error => {
        this.dataLista.cargando = false
        this.dataLista.error = error;
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.initConfigPaypal()
    this.pagoForm = this.fb.group({
      nombre: ["Angular", [Validators.required]],
      telefono: ["656566534"],
      direccion: ["San pedro de vilcabamba"],
      email: ["", [Validators.required]],
    });
  }

  configurarAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: false
        },
        mostrarTextoBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: 'pago'
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }
  }

  preperarLista() {
    this.dataLista = {
      cargando: true,
      reintentar: this.obtenerCatalogoMetodosPago,
      lista: this.listaMetodoPago,
      tamanoLista: TamanoLista.TIPO_PERFILES
    }
  }

  private initConfigPaypal(): void {
    this.payPalConfig = {
      clientId: "ATFYWrmZeBoByifZnWG3CobzUiAoVtTo9U6pEnN7pSFi898Rwr83uZgVyhJDvPYyohdvNiH5FMwL4975",
      currency: "USD",
      createOrderOnServer: (data) =>
        this.pagoNegocio.prepararPagoPaypal({}).toPromise(),
      //.then((res) => res.json())
      //.then((order) => order.orderID),
      advanced: {
        commit: "true",
        extraQueryParams: [{ name: 'disable-funding', value: 'card' }]
      },
      style: {
        label: "paypal",
        size: "responsive",
        layout: "horizontal",
      },

      onApprove: (data, actions) => {
        console.log(
          "onApprove - Transaccion ha sido aprovada, pero no autorizada",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log("onApprove - you can get full order details inside onApprove: ", details);
        });
      },
      onClientAuthorization: (data) => {
        console.log("onClientAuthorization - transacción autorizada", data
        );
        // this.showSuccess = true;
        /*
        this.crearCuenta(this.pagoForm.value).subscribe((cuenta) =>
          console.log(cuenta, "cuenta creada")
        );
        */
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log("OnError", err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
        //this.modalService.close(this.dataDialogo.id);
        // this.resetStatus();
      },

    };
  }
  preparePaypay(): Promise<string> {
    return this.pagoNegocio.prepararPagoPaypal({}).toPromise();
  }

  configurarBotonPago() {
    this.dataBoton = {
      colorTexto: ColorTextoBoton.AMARRILLO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "PAGAR",
      ejecutar: () => this.pagarStripe(),
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }

  pagarStripe(): void {

    if (this.pagoForm.valid) {


      this.pagoNegocio.prepararPagoStripe({}).subscribe(
        (result: MetodoPagoStripeEntity) => {
          console.log(result, "paymentintent and custumer");
          this.stripeService.confirmCardPayment(result.clientSecret, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: this.pagoForm.value.nombre,
                email: this.pagoForm.value.nombre.email,
              },
            },
          }).subscribe((result) => {
            if (result.error) {
              console.log(result.error?.message); // Mostrar un error al cleinte
            } else {
              if (result.paymentIntent?.status === "succeeded") {
                /*
                this.crearCuenta(this.pagoForm.value).subscribe((data) => {
                  console.log(data, "Cuenta creada"); // redirigir o prensertar mensaje
                });
                */
              }
            }
          });
        },
        (err) => {
          console.log(err, "error servidor");
        }
      );
    } else {
      alert("Complete los datos de pago");
    }
  }

  configurarDialogoContenido() {
    this.dataDialogo = {
      id: "metodoPago",
      titulo: "PAGAR CON TARJETA"
    }
  }

  obtenerIdioma() {
    this.idiomaSeleccionado = this.idiomaNegocio.obtenerIdiomaSeleccionado()
    if (this.idiomaSeleccionado) {
      this.elementsOptions.locale = this.idiomaSeleccionado.codNombre as StripeElementLocale;
    }
  }
}
