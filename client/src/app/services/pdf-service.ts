import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, ResponseContentType } from '@angular/http';

declare const $: any;
declare var PDFJS: any;

@Injectable()
export class PdfService {
  baseUrl = 'http://localhost:8000';
  url;
  workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.489/pdf.worker.min.js';
  numPages;
  pdfDoc;
  canvas;
  pdfFindController;
  pdfViewer;
  container;
  queryText;
  pdfPageView;
  pageNumber = 1;

  constructor(private authService:AuthService, private http: Http) {  }

  loadPDF(url: string) {
    this.url = url;
    PDFJS.workerSrc = this.workerUrl;
    PDFJS.disableRange = true;
    this.canvas = $('#pageContainer')[0];
    this.container = $('#pdf-container')[0];

    this.pdfViewer = new PDFJS.PDFSinglePageViewer({
      container: this.container
    });

    /**
     * Asynchronously downloads PDF.
     */
    PDFJS.getDocument(this.url).then((pdfDoc) => {
      this.pdfDoc = pdfDoc;
      this.numPages = this.pdfDoc.numPages;

      this.pdfViewer.setDocument(this.pdfDoc);
      this.setControllers();
    });
  }

  downloadPDF(tccId, file_path){
    const options = this.authService.addAuthHeader(true);
    options.responseType = ResponseContentType.Blob;
    return this.http.get(`${this.baseUrl}/tcc/file/${tccId}`, options)
    .map((res)=> {
      const blob = new Blob([res.blob()], { type: "application/pdf" });
      const blobURL = URL.createObjectURL(blob);
      
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', file_path);

      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(blobURL);
      }, 100);
    
      return { response: blob };
  });

  }

  setControllers() {
    // set find Controller into view
    this.pdfFindController = new PDFJS.PDFFindController({
      pdfViewer: this.pdfViewer
    });

    this.pdfViewer.setFindController(this.pdfFindController);
  }

  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param num Page number.
   */
  changePage(pageNumber) {
    if (pageNumber <= this.numPages && pageNumber >= 1) {
      this.pdfViewer.currentPageNumber = pageNumber;
    }
  }

  getNumPages(){
    return this.numPages;
  }

  /**
  * Query and highligth a text
  * @param text : string
  */
  query(text: string) {
    this.pdfFindController.executeCommand('find', {
      caseSensitive: false,
      findPrevious: true,
      highlightAll: true,
      phraseSearch: true,
      query: text
    });
  }
}
