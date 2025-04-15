import { Component } from '@angular/core';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-upload',
  imports: [DragDropDirective, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  constructor(private readonly uploadService: UploadService, private readonly sanitizer:DomSanitizer) {

  }
  selectedFile: File | null = null;
  uploadedFileURL: any;
  downloadURL = ''
  selected = false

  onFileSelected(event:any) {
    const file = event.target.files[0];
    console.log('file:', file)
    this.selectedFile = file;

  }

  onFileDropped(event:any) {
    const file = event
    console.log('file received from directive:', file)
    this.selectedFile = file;
  }

  upload() {

    if (this.selectedFile) {
      console.log('this.selectedFile:', this.selectedFile)
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log('formData:', formData)
      this.uploadService.uploadFile(formData).subscribe({
        next: (val:any)=> {
          console.log('File uploaded successfully', val)
          this.downloadURL = this.uploadService.API_URL + val.path
          this.uploadedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadURL)
          console.log('this.uploadedFileURL:', this.uploadedFileURL)
        },
        error: (err) => {
          console.error('Error uploading file', err)
        }
      })
    } else {
      console.log('No file selected');
    }
  }

  get pdfURL() {
    return this.uploadedFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadURL)
  }
  download() {
    if(this.uploadedFileURL) {
      window.open(this.downloadURL, '_blank')
    }
  }
}
