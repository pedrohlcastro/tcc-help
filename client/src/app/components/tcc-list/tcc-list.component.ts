import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TccService } from '../../services/tcc.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tcc-list',
  templateUrl: './tcc-list.component.html',
  styleUrls: ['./tcc-list.component.scss']
})
export class TccListComponent implements OnInit {
  response = [];
  constructor(
    private tccService: TccService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tccService.getAllTcc()
      .subscribe((res) => {
        this.response = res;
      }, (err) => {
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

}
