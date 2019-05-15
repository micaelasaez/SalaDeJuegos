import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  foto: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router) { }
  tiles: Tile[] = [
    {text: 'Anagrama', cols: 3, rows: 2, color: '#e100ff', foto: '/assets/imagenes/chequear.jpg'},
    {text: 'Agilidad Aritmética', cols: 3, rows: 2, color: '#9dff00', foto: '/assets/imagenes/cerebro.jpg'},
    {text: 'Ta - Te - Ti', cols: 3, rows: 2, color: '#00ffd5', foto: '/assets/imagenes/tateti.png'},
    {text: 'Adivina el número', cols: 3, rows: 2, color: '#ffba3a', foto: '/assets/imagenes/adivina.png'},
    {text: 'Colores en Inglés', cols: 3, rows: 2, color: '#3a68ff', foto: '/assets/imagenes/colores.png'}
  ];

  juego(juego: string) {
    switch (juego) {
      case 'Anagrama':
        this.router.navigate(['/palabras']);
        break;
      case 'Ta - Te - Ti':
        this.router.navigate(['/tateti']);
        break;
      case 'Agilidad Aritmética':
        this.router.navigate(['/math']);
        break;
      case 'Adivina el número':
        this.router.navigate(['/adivina']);
        break;
      case 'Colores en Inglés':
        this.router.navigate(['/colores']);
        break;
      default:
        break;
    }
  }

  ngOnInit() {
  }

}
