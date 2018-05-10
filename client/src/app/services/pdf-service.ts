import { Injectable } from '@angular/core';

declare const $: any;
declare var PDFJS: any;

@Injectable()
export class PdfService {
  url;
  workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.9.489/pdf.worker.min.js';
  numPages;
  pdfDoc;
  canvas;
  pdfFindController;
  pdfViewer;
  container;
  queryText;
  pdfPageView;
  pageNumber = 1;

  constructor() {  }

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
      caseSensitive: true,
      findPrevious: true,
      highlightAll: true,
      phraseSearch: true,
      query: text
    });
  }
}
