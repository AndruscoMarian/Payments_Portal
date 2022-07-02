import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class FilePreviewOverlayRef {

  constructor(private overlayRef: OverlayRef,
              private router: Router
              ) { }

  close(): void {
    this.overlayRef.dispose();
    this.router.navigate(['main-dashboard/super-user']);
  }
}
