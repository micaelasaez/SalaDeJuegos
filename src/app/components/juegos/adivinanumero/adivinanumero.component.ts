import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerService } from 'src/app/servicios/server.service';

@Component({
  selector: 'app-adivinanumero',
  templateUrl: './adivinanumero.component.html',
  styleUrls: ['./adivinanumero.component.css']
})
export class AdivinanumeroComponent implements OnInit {
  public numSecreto: number;
  public respuesta: string;
  public contador: number;
  public msgResultado: string;
  public respondio: boolean;
  public valido: boolean;
  public aciertos = 0;
  public fallas = 0;

  constructor(private snackBar: MatSnackBar, private server:  ServerService) { }

  ngOnInit() {
    this.numSecreto = 0;
    this.respuesta = '0';
    this.contador = 0;
    this.msgResultado = '';
    this.respondio = false;
    this.valido = false;
    this.numSecreto = Math.floor(Math.random() * (50 - 1) + 1);
    console.log('Numero Secreto: ' + this.numSecreto);
  }

  public NuevoNumero() {
    this.numSecreto = Math.floor(Math.random() * (50 - 1) + 1);
    console.log('Numero Secreto: ' + this.numSecreto);
    this.msgResultado = '';
    this.valido = false;
    this.contador = 0;
  }

  public VerificarNumero() {
    const resp = Number.parseInt(this.respuesta, 10);
    const correctResp = Number.parseInt(this.numSecreto.toString(), 10);
    this.respondio = true;
    if (resp === correctResp) {
      this.msgResultado = 'Adivinaste el número!!';
      this.valido = true;
      this.aciertos++;
    } else {
      this.contador++;
      this.valido = false;
      this.fallas++;
      switch (this.contador) {
        case 1:
          this.msgResultado = 'No, intento fallido, animo';
          break;
          case 2:
          this.msgResultado = 'No, te estaras Acercando???';
          break;
          case 3:
          this.msgResultado = 'No es, Yo crei que la tercera era la vencida.';
          break;
          case 4:
          this.msgResultado = 'No era el ' + resp;
          break;
          case 5:
          this.msgResultado = '5 intentos y nada.';
          break;
          case 6:
          this.msgResultado = 'Afortunado en el amor';
          break;
        default:
          this.msgResultado = 'Ya le erraste ' + this.contador + ' veces';
          break;
      }
      timer(4000).subscribe(() => {
        this.respondio = false;
        this.msgResultado = '';
      });
      this.server.AgregarPuntuacion('numero', (this.aciertos - this.fallas).toString() ).subscribe();
    }
  }
}
