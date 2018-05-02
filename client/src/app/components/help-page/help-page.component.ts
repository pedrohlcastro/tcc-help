import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit {
  panelOpenState: boolean = false;
  helps = [];
  filteredHelps;

  constructor() { }

  ngOnInit() {

    this.helps = [
      {
        "nome": "Dilma 1",
        "descricao": "Primeiro eu queria cumprimentar os internautas. -Oi Internautas! Depois dizer que o meio ambiente é sem dúvida nenhuma uma ameaça ao desenvolvimento sustentável. E isso significa que é uma ameaça pro futuro do nosso planeta e dos nossos países. O desemprego beira 20%, ou seja, 1 em cada 4 portugueses."
      },
      {
        "nome": "Dilma 2",
        "descricao": "A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil. Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!"
      }
    ];
    this.filteredHelps = Object.assign([], this.helps);
  }

  filterItem(value){
    if(!value)
      this.filteredHelps = this.helps;
    else {
      this.filteredHelps = Object.assign([], this.helps).filter(
        item => item.descricao.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
  }
}
