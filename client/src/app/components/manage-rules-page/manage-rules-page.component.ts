import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import { RuleDialogComponent } from '../rule-dialog/rule-dialog.component';
@Component({
  selector: 'app-manage-rules-page',
  templateUrl: './manage-rules-page.component.html',
  styleUrls: ['./manage-rules-page.component.scss']
})
export class ManageRulesPageComponent implements OnInit {
  rules = [
    {
      regex: 'Regex 1',
      message:'Ai você fala o seguinte: "- Mas vocês acabaram isso?" Vou te falar: -"Não, está em andamento!" Tem obras que "vai" durar pra depois de 2010. Agora, por isso, nós já não desenhamos, não começamos a fazer projeto do que nós "podêmo fazê"? 11, 12, 13, 14... Por que é que não?'
    },
    {
      regex: 'Regex 1',
      message:'Se hoje é o dia das crianças... Ontem eu disse: o dia da criança é o dia da mãe, dos pais, das professoras, mas também é o dia dos animais, sempre que você olha uma criança, há sempre uma figura oculta, que é um cachorro atrás. O que é algo muito importante?'
    }

  ]
  filteredRules;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredRules = Object.assign([], this.rules);;
  }

  create() {
    let dialogRef = this.dialog.open(RuleDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  edit(index){
    let item = this.rules[index];
    let dialogRef = this.dialog.open(RuleDialogComponent, {
      width: '75%',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  remove(index){
    console.log(index);
  }

  filterItem(value){
    if(!value)
      this.filteredRules = this.rules;
    else {
      this.filteredRules = Object.assign([], this.rules).filter(
        item => item.message.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
  }

}
