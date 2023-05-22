import { LoggerService } from './../logger.service';
import { LibroService } from './../libro.service';
import { Component, OnInit } from '@angular/core';
import {Libro} from '../libro.model';
import { LIBROS } from '../mocks';
@Component({
  selector: 'app-libro-lista',
  templateUrl: './libro-lista.component.html',
  styleUrls: ['./libro-lista.component.css']
})
export class LibroListaComponent implements OnInit{
  libros!:Libro[];
  constructor(private libroService:LibroService, private loggerService:LoggerService){}
  ngOnInit(): void {
      this.libroService.getLibros()
      .then(libros=>{
        this.loggerService.log("Ejecución del 1er then")

        return libros;
      }).then( libros => {
      this.loggerService.log("Ejecucion del 2º then");
      return new Promise<Libro[]>((resolve, reject) => {
      this.loggerService.log("Inicio ejecutor (Promise del 2º then)");
      setTimeout(() => {
      this.loggerService.log("Fin ejecutor (Promise del 2º then)");
      resolve(libros);
    }, 5000);
  });})
.then( libros => {
this.loggerService.log("Ejecucion del 3º then");
this.libros = libros;});
}
}
