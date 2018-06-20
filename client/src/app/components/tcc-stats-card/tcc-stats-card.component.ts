import { Component, OnInit, Input, Inject } from '@angular/core';
import { TccService } from '../../services/tcc.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CheckTccPageComponent } from '../check-tcc-page/check-tcc-page.component';

@Component({
  selector: 'app-tcc-stats-card',
  templateUrl: './tcc-stats-card.component.html',
  styleUrls: ['./tcc-stats-card.component.scss']
})
export class TccStatsCardComponent implements OnInit {
  // @Input('tccId') tccId;
  tccId;
  stats;

  constructor(
    private tccService: TccService,
    public dialogRef: MatDialogRef<CheckTccPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    this.tccId = dataReceive.tccId;
    console.log(this.tccId)
  }

  ngOnInit() {
    this.tccService.getStatsTcc(this.tccId)
      .subscribe((res) => {
        this.stats = res;
      });
  }



}
