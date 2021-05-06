import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})

export class BusquedaComponent{

  //importo el decorador
  //not null assertion operator (!) sirve para indicar a angular que sabemos que esa propiedad no será nunca null
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //para usar el servicion lo tengo que inyectar:
  //ahora ya tengo acceso a todos sus métodos y propiedades
  constructor( private gifsService:GifsService){}


  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0 ){
      return;

    }

    //inserto el valor en el historial
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value ='';
  }

}
