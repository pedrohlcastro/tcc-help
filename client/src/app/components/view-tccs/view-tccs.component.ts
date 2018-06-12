import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TccService } from '../../services/tcc.service';
import { Router, ActivatedRoute } from '@angular/router'
import { PdfService } from '../../services/pdf-service';

@Component({
  selector: 'app-view-tccs',
  templateUrl: './view-tccs.component.html',
  styleUrls: ['./view-tccs.component.scss']
})
export class ViewTccsComponent implements OnInit {
  user;
  showTccs = [];
  filteredTccs;
  professorId;
  studentId;
  src;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, 
    private dialog: MatDialog, private tccService: TccService,
    private route: ActivatedRoute, private router: Router, private pdfService: PdfService) { }

  ngOnInit() {
    this.authService.getUserFromToken()
      .subscribe((res) => {    
        this.route.params.subscribe((params) => {
          this.professorId = params['professorId'];
          this.studentId = params['studentId'];
        });
  
        this.user = res;
        if (this.user.type !== 2 || this.user.id != this.professorId){
          this.snackBar.open("Você não pode acessar essa página.", 'Fechar', {duration: 3000});
          window.location.href = '/students-list';
        }  

        this.tccService.getTccs(this.user.id, this.studentId)
        .subscribe((res) => {
          this.showTccs = res;
          this.filteredTccs = Object.assign([], this.showTccs);
          this.filteredTccs.forEach(element => {
            console.log(element);            
          });
        }, error => {
          console.log(error.statusText);
          this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
        });

      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
  }

  getPdfFile(tccId) {
    const token = JSON.parse(localStorage.getItem('userToken'));
    this.src = {
      url: `http://localhost:8000/tcc/file/${tccId}`,
      withCredentials: false,
      httpHeaders: {
        Authorization: token.token
      }
    };
    //this.pdfService.loadPDF(this.src);
  }

  downloadPdf(tccId){
    this.getPdfFile(tccId);
    this.pdfService.loadPDF(this.src);
  }

  filterItem(value){
    if(!value)
      this.filteredTccs = this.showTccs;
    else {
      this.filteredTccs = Object.assign([], this.showTccs).filter(
        item => item.id.toString() === value
      )
    }
  }
}
