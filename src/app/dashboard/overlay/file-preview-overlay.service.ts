import { Injectable, Injector, ComponentRef  } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { Router } from '@angular/router';
import { USER_PREVIEW_TOKEN } from './user-preview-overlay.token';


interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable()
export class FilePreviewOverlayService {

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private router: Router) { }

  open(config: FilePreviewDialogConfig={}, userID:number|null) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new FilePreviewOverlayRef(overlayRef, this.router);

    const overlayComponent = this.attachDialogContainer(
      overlayRef,
      dialogRef, 
      userID);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());
      
    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .right()
      .centerVertically();
    
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private attachDialogContainer(
    overlayRef: OverlayRef, 
    dialogRef: FilePreviewOverlayRef,
    userID:number|null
    ) {
    const injector = this.createInjector( 
      dialogRef, 
      userID);

    const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
    const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector( 
    dialogRef: FilePreviewOverlayRef,
    userID:number|null): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(USER_PREVIEW_TOKEN, userID);

    return new PortalInjector(this.injector, injectionTokens);
  }
}