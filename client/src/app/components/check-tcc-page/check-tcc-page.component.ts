import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf-service';

@Component({
  selector: 'app-check-tcc-page',
  templateUrl: './check-tcc-page.component.html',
  styleUrls: ['./check-tcc-page.component.scss']
})
export class CheckTccPageComponent implements OnInit {
  src;
  tccId;
  page;
  constructor(private pdfService: PdfService) { }

  ngOnInit() {
    this.getPdfFile();
    this.pdfService.loadPDF(this.src);
    this.page = this.pdfService.getNumPages();
  }

  /**
   * build pdf source URL
  */
  getPdfFile() {
    this.src = '/assets/sample.pdf';
    // const token = JSON.parse(localStorage.getItem('userToken'));
    // this.src = {
    //   url: `/api/area/getfile?areaId=${this.tccId}`,
    //   withCredentials: true,
    //   httpHeaders: {
    //     Authorization: token.token
    //   }
    // };
  }

  buscaWord(){
    this.pdfService.query('PDF');
  }

  changePage(){
    this.pdfService.changePage(this.page);
  }
}
