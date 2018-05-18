import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf-service';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TccService } from '../../services/tcc.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

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
  spell = [];
  languageFormGroup : FormGroup;
  languages: any;
  languageError = true;
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
    this.getSpelling();
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
        this.suggestions = res;
      }, (err) => {
        this.callSuggestions = false;
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

  runAnalisys(){
    this.callSuggestions = true;
    this.tccService.runSuggestions(this.tccId)
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
    console.log(item.page);
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

  getSpelling(){
    this.tccService.getSpelling(this.tccId)
      .subscribe((res) => {
        this.callSuggestions = false; //tenho resultado
        this.spell = res;
      }, (err) => {
        this.callSuggestions = false;
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
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
}
