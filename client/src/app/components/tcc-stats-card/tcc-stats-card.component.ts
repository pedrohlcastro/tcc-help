import { Component, OnInit, Input } from '@angular/core';
import { TccService } from '../../services/tcc.service';

@Component({
  selector: 'app-tcc-stats-card',
  templateUrl: './tcc-stats-card.component.html',
  styleUrls: ['./tcc-stats-card.component.scss']
})
export class TccStatsCardComponent implements OnInit {
  @Input('tccId') tccId;
  stats;

  constructor(private tccService: TccService) { }

  ngOnInit() {
    this.tccService.getStatsTcc(this.tccId)
      .subscribe((res) => {
        this.stats = res;
      });
  }

}
