import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf-service';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TccService } from '../../services/tcc.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';

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
  callSuggestions = false; //nao clicou
  suggestions = [];
  spelling = [];
  languageFormGroup : FormGroup;
  languages: any;
  languageError = true;
   
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  paginator: MatPaginator;
  response: Response;
  rulesSpelling = [];
  filterType = '0';
  filterStatus = '0';
  constructor(
    private pdfService: PdfService,
    private tccService: TccService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tccId = params['id'];
    });
    this.getMatches();
    this.getPdfFile();
    this.pdfService.loadPDF(this.src);
    this.page = 1;
    $('#btnmenu').click(() => {
      $('.pdf-container').css({'height' : '100vh'});
    });
    $('.closebtn').click(() => {
      $('.pdf-container').css({'height' : '92vh'});
    });

    this.languageFormGroup = this.formBuilder.group({
      languages: this.formBuilder.array([])
    });
    this.languages = [{value: 'pt_BR', name: 'Português'}, {value: 'en_US', name: 'Inglês'}, {value: 'es_SP', name: 'Espanhol'}];
  }

  getMatches(){
    this.tccService.getMatches(this.tccId)
      .subscribe((res) => {
        this.callSuggestions = false; //tenho resultado
        this.response = new Response(res.rules, res.spelling);
        this.suggestions = res.rules;
        this.spelling = res.spelling;
        this.rulesSpelling = [...this.suggestions, ...this.spelling];
        this.totalSize = this.rulesSpelling.length;
        this.iterator();
      }, (err) => {
        this.callSuggestions = false;
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

  runAnalisys(){
    this.callSuggestions = true;
    this.tccService.runAnalisys(this.tccId, this.languageFormGroup.value.languages)
      .subscribe((res) => {
        this.getMatches();
      }, (err) => {
        this.callSuggestions = false;
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

  /**
   * build pdf source URL
  */
  getPdfFile() {
    const token = JSON.parse(localStorage.getItem('userToken'));
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
    this.tccService.choose(item.id, Number(result))
      .subscribe((res) => {
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
      }, (err) => {
        this.snackBar.open('Error ao marcar sugestão.', 'Fechar', {
          duration: 7000
        });
      });
  }

  sendToProfessor(tccId){
    this.tccService.sendToProfessor(this.tccId)
      .subscribe((res) => {
        this.snackBar.open('TCC enviado para o professor com Sucesso.', 'Fechar', {
          duration: 7000
        });
      }, (err) => {
        this.snackBar.open('Error ao enviar TCC, tente novamente.', 'Fechar', {
          duration: 7000
        });
      })
  }

  onChangeLanguage(event){
    const languages = <FormArray> this.languageFormGroup.get('languages') as FormArray;

    if(event.checked){
      languages.push(new FormControl(event.source.value));
    } else {
      const index = languages.controls.findIndex(aux => aux.value === event.source.value);
      languages.removeAt(index);
    }
    this.languageError = (this.languageFormGroup.value.languages.length) ? false : true;
  }

  getBorderColor(status){
    let color = '';
    if(status == 0)
      color = 'grey';
    else if(status == 1)
      color = 'green';
    else 
      color = 'red';
    return color;
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  iterator() {
    this.updateRulesSpelling();
    this.totalSize = this.rulesSpelling.length;
    this.currentPage = 0;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.rulesSpelling = this.rulesSpelling.slice(start, end);
  }

  onChangeTypeFilter(){
    this.iterator();
  }

  updateRulesSpelling(){
    if(this.filterType === '1')
      this.rulesSpelling = this.response.suggestions;
    else if(this.filterType === '2')
      this.rulesSpelling = this.response.spelling;
    else
      this.rulesSpelling = [...this.response.suggestions, ...this.response.spelling];

    if(this.filterStatus !== '0'){
      let auxArray = this.rulesSpelling;
      this.rulesSpelling = [];
      for(let aux = 0; aux < auxArray.length; aux++){
        const item = auxArray[aux];
        if(this.filterStatus === '1' && item.accept === 0){
          this.rulesSpelling = [...this.rulesSpelling, ...item];
        }
        else if(this.filterStatus === '2' && item.accept === 1){
          this.rulesSpelling = [...this.rulesSpelling, ...item];
        }
        else if(this.filterStatus === '3' && item.accept === 2){
          this.rulesSpelling = [...this.rulesSpelling, ...item];
        }
      }
    }
  }
}

class Response{
  suggestions = [];
  spelling = [];
  constructor(rules, spell){
    this.suggestions = rules;
    this.spelling = spell;
  }
}