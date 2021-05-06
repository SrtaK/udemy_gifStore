import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfces/gifs.interface';

@Injectable({
  providedIn: 'root' //así es un servicio global que puede ver toda mi aplicación
})

export class GifsService {

  private api_key: string = 'NipBhFE5VBiCOyJnGE2fG80hCVQJp3UI';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial]
  }

    //para cargar el localstorage el constructor  este es el mejor sitio porqe solo se va a ejecutar una vez
  constructor(private http: HttpClient){
    //si existe historial en el localstorage

/*     if(localStorage.getItem('historial')){
      //toma un objeto serializado  y retorna un arreglo
      this._historial = JSON.parse(localStorage.getItem('historial')!); //le digo a typescript que confíe en mí (!), que no sea tan estricto
    }  ES IGUAL A: */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //le digo a typescript que confíe en mí (!), que no sea tan estricto
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; //le digo a typescript que confíe en mí (!), que no sea tan estricto

  }



  //voy a usar este metodo en busqueda component
  buscarGifs(query:string){
    //Remove whitespace from both sides of a string:
    query = query.trim().toLocaleLowerCase();
    //si la query no estaá en el historial la incluyo
    if(!this._historial.includes(query)){
      //inserto al inicio
      this._historial.unshift(query);
      //me quedo solo con 10 resultados
      this._historial = this._historial.splice(0,10);

      //grabo info en el localstorage bajo la key historial el historial stringlizado
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query)


    //puedo pasarle la query porque he establecido ``
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }


}
