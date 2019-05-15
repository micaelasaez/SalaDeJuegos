import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ServerService } from 'src/app/servicios/server.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {
  public color = '';
  public lista = [
    'red',
    'green',
    'orange',
    'yellow',
    'black',
    'white',
    'blue',
    'violet',
    'grey',
    'brown',
    'pink'
  ];
  public numero;
  public respuesta = '';
  public respondio = false;
  public msgResultado = '';
  public fallas = 0;
  public aciertos = 0;

  constructor(private severService: ServerService) {
    this.Nueva();
  }

  ngOnInit() {
  }
  public Nueva() {
    this.numero = Math.floor(Math.random() * 9);
    this.color = this.lista[this.numero];
    console.log('palabra: ' + this.color);
  }
  public Verificar() {
    if (this.respuesta === this.color) {
      this.msgResultado = 'Adivinaste!!';
      this.aciertos++;
    } else {
      this.msgResultado = 'No ese no es!';
      this.fallas++;
    }
    this.respondio = true;
    timer(4000).subscribe(() => {
      this.respondio = false;
      this.msgResultado = '';
    });
    this.severService.AgregarPuntuacion('colores', (this.aciertos - this.fallas).toString() ).subscribe();
  }

}
