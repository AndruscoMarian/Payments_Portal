import { Component, Inject, Input } from '@angular/core';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { USER_PREVIEW_TOKEN } from './user-preview-overlay.token';


@Component({
  selector: 'file-preview-overlay',
  templateUrl: './file-preview-overlay.component.html',
  styleUrls: ['./file-preview-overlay.component.css']
})


export class FilePreviewOverlayComponent {

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(USER_PREVIEW_TOKEN) public userID: number|null) {}

 }
