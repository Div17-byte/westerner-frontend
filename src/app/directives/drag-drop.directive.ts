import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  constructor(private el:ElementRef, private renderer:Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
   }

  @Output() dropped: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(event:any) {
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(event:any) {
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('drop', ['$event']) public drop(event:any) {

    const file = event.dataTransfer.files[0];
    console.log('file:', file)
    this.dropped.emit(file);
    event.preventDefault();
    event.stopPropagation();

  }

}
