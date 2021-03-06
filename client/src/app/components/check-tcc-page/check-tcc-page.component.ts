import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf-service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TccService } from '../../services/tcc.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { TccStatsCardComponent } from '../tcc-stats-card/tcc-stats-card.component';
import { ChooseProfessorDialogComponent } from '../choose-professor-dialog/choose-professor-dialog.component';
import { ProfessorListService } from '../../services/professor-list.service';

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
  teachers = [];
   
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  paginator: MatPaginator;
  response: Response;
  rulesSpelling = [];
  filterType = '0';
  filterStatus = '0';
  allowCheckErros = true;
  constructor(
    private pdfService: PdfService,
    private tccService: TccService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tccId = params['id'];
      this.tccService.getAccessRights(this.tccId).subscribe((res) => {
        if(res.status != 'Success') {
          this.snackBar.open("Você não tem permissão para acessar essa página...", 'Fechar', {duration: 5000});
          this.router.navigateByUrl('/account-page');
        } else {
          if(res.allowModify == 0){
            this.allowCheckErros = false;
          }
        }
      });
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
    this.languages = [{value: 'pt_BR', name: 'Português'}, {value: 'en_US', name: 'Inglês'}];
  }

  getMatches(){
    this.tccService.getMatches(this.tccId)
      .subscribe((res) => {
        this.callSuggestions = false; //tenho resultado
        this.response = new Response(res.rules, res.spelling);
        this.suggestions = res.rules;
        this.spelling = res.spelling;
        for(let suggestion of this.suggestions){
          suggestion.type = 0;
        }
        for(let spell of this.spelling){
          spell.suggestions = spell.suggestions.replace(/\,/g, ', ');
          spell.type = 1;
        }
        this.rulesSpelling = [...this.suggestions, ...this.spelling];
        this.totalSize = this.rulesSpelling.length;
        this.iterator();
      }, (err) => {
        this.callSuggestions = false;
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

  runAnalisys(){
    let dialogRef = this.dialog.open(ChooseProfessorDialogComponent, {
      width: '40%',
      height: "75%",
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result!=false){
        let professorID;
        if(result==null){
          professorID = null;
        }
        else{
          professorID = result.id;
        }
        console.log(professorID);

        this.callSuggestions = true;
        this.tccService.runAnalisys(this.tccId, this.languageFormGroup.value.languages, professorID)
          .subscribe((res) => {
            this.getMatches();
          }, (err) => {
            this.callSuggestions = false;
            this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
          });
      }
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

  setStep(index, suggestion){
    const item = suggestion;
    this.step = index;
    this.changePage(item.page);
    this.pdfService.query(item.word);
  }

  changePage(e){
    $('input').val(e);
    if(this.maxPage === 888) this.maxPage = this.pdfService.getNumPages();
    this.pdfService.changePage(e);
  }

  chooseRule(suggestion, result){
    const item = suggestion;
    let justification = null;
    if(result == '2'){
      let dialogRef = this.dialog.open(RejectDialogComponent, {
        width: '75%'
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          justification = data.justification;
          this.tccService.choose(item.id, Number(result), justification)
            .subscribe((res) => {
              item.accept = result;
              if(result == '1'){
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
      });
    } else {
      this.tccService.choose(item.id, Number(result))
      .subscribe((res) => {
        item.accept = result;
        if(result == '1'){
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
  }

  chooseSpelling(suggestion, result){
    const item = suggestion;
    let justification = null;
    if(result == '2'){
      let dialogRef = this.dialog.open(RejectDialogComponent, {
        width: '75%'
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          justification = data.justification;
          this.tccService.chooseSpelling(item.id, Number(result), justification)
            .subscribe((res) => {
              item.accept = result;
              if(result == '1'){
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
      });
    }
    else{
      this.tccService.chooseSpelling(item.id, Number(result))
        .subscribe((res) => {
          item.accept = result;
          if(result == '1'){
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
    if((this.currentPage*this.pageSize) >  this.rulesSpelling.length)
      this.currentPage = 0;
  }

  verStatistics(){
    let dialogRef = this.dialog.open(TccStatsCardComponent, {
      width: '75%',
      data: { tccId: this.tccId }
    });
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