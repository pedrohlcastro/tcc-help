import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Input() private allowed_extensions : Array<string> = [];
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  
  @HostBinding('style.background') private background = '#eee';

  constructor(
    private snackBar:MatSnackBar
  ) { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    
    let files = evt.dataTransfer.files;

    if(files.length > 0){
      if(files.length == 1){
        let file = files.item(0);
        console.log(file.name)
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          // file.path = evt.dataTransfer;

          this.filesChangeEmiter.emit(files);
        }else{
          this.snackBar.open('Selecione um arquivo no formato PDF', 'Fechar', {
            duration: 7000
          });
        }
      }
      else{
        this.snackBar.open('Selecione apenas um arquivo', 'Fechar', {
          duration: 7000
        });
      }
    }
  }
}