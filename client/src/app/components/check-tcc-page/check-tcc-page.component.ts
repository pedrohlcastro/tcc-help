import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf-service';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-check-tcc-page',
  templateUrl: './check-tcc-page.component.html',
  styleUrls: ['./check-tcc-page.component.scss']
})
export class CheckTccPageComponent implements OnInit {
  src;
  tccId;
  sidenav;
  maxPage = 888;
  step;
  page;
  suggestions = [
    {
      id: '1',
      word: 'PDF',
      page: 1,
      accept: false,
    },
    {
      id: '2',
      word: 'CERN',
      page: 2,
      accept: false,
    }
  ]
  constructor(
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tccId = params['id'];
    });
    this.getPdfFile();
    this.pdfService.loadPDF(this.src);
    this.page = 1;
    $('#btnmenu').click(() => {
      $('.pdf-container').css({'height' : '100vh'});
    });
    $('.closebtn').click(() => {
      $('.pdf-container').css({'height' : '92vh'});
    });
  }

  /**
   * build pdf source URL
  */
  getPdfFile() {
    // this.src = '/assets/sample.pdf';
    const token = JSON.parse(localStorage.getItem('userToken'));
    console.log(token);
    this.src = {
      url: `http://localhost:8000/tcc/file/${this.tccId}`,
      withCredentials: false,
      httpHeaders: {
        Authorization: token.token
      }
    };
  }

  setStep(index){
    const item = this.suggestions[index];
    this.step = index;
    this.changePage(item.page);
    this.pdfService.query(item.word);
  }

  changePage(e){
    $('input').val(e);
    if(this.maxPage === 888) this.maxPage = this.pdfService.getNumPages();
    this.pdfService.changePage(e);
  }

  choose(index, result){
    
    const item = this.suggestions[index];
    item.accept = result;
    if(result){
      this.snackBar.open('Sugestão foi marcada como aceita.', 'Fechar', {
        duration: 7000
      });
    } else {
      this.snackBar.open('Sugestão foi marcada como ignorada.', 'Fechar', {
        duration: 7000
      });
    }
  }
}
