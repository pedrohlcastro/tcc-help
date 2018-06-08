import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import { RuleDialogComponent } from '../rule-dialog/rule-dialog.component';
import { RuleService } from '../../services/rule.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-rules-page',
  templateUrl: './manage-rules-page.component.html',
  styleUrls: ['./manage-rules-page.component.scss']
})
export class ManageRulesPageComponent implements OnInit {
  rules = [];
  filteredRules;

  constructor(public dialog: MatDialog, private ruleService: RuleService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.ruleService.getRules()
      .subscribe((res) => {
        this.rules = res;
        this.filteredRules = Object.assign([], this.rules);
      });
  }

  create() {
    let dialogRef = this.dialog.open(RuleDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ruleService.createRule(result)
          .subscribe((res) => {
            this.snackBar.open("Regra criada com sucesso.", 'Fechar', {duration: 5000});
            this.rules.push(res);
            this.filteredRules = Object.assign([], this.rules);
          }, (err) => {
            this.snackBar.open("Não foi possível criar regra, favor tentar novamente.", 'Fechar', {duration: 5000});
          });
      }
    });
  }

  edit(index){
    let item = this.rules[index];
    let dialogRef = this.dialog.open(RuleDialogComponent, {
      width: '75%',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ruleService.updateRule(result, item.id)
          .subscribe((res) => {
            this.rules[index].regex = result.regex;
            this.rules[index].message = result.message;
            this.filteredRules = Object.assign([], this.rules);
            this.snackBar.open("Regra atualizada com sucesso.", 'Fechar', {duration: 5000});
          }, (err) => {
            this.snackBar.open("Não foi possível atualizar regra, favor tentar novamente.", 'Fechar', {duration: 5000});
          })
      }
    });
  }

  remove(index){
    let item = this.rules[index];
    let dialogRef = this.dialog.open(RuleDialogComponent, {
      width: '75%',
      data: {warning: 'Tem certeza que deseja deletar essa regra?', regex: item.regex, message: item.message},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ruleService.deleteRule(item.id)
          .subscribe((res) => {
            this.rules.splice(index, 1);
            this.filteredRules = Object.assign([], this.rules);
            this.snackBar.open("Regra Removida com sucesso.", 'Fechar', {duration: 5000});
          }, (err) => {
            this.snackBar.open("Não foi possível remover regra, favor tentar novamente.", 'Fechar', {duration: 5000});
          });
      }
    });
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
