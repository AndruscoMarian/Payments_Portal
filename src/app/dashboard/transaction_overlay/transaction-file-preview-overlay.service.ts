import { Injectable, Injector, ComponentRef  } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Router } from '@angular/router';

import { TransactionFilePreviewOverlayComponent } from './transaction-file-preview-overlay.component';
import { TransactionFilePreviewOverlayRef } from './transaction-file-preview-overlay-ref';
import { TRANSACTION_PREVIEW_TOKEN } from './transaction-preview-overlay.token';


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
export class TransactionFilePreviewOverlayService {

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    private router: Router) { }

  open(config: FilePreviewDialogConfig={}, transactionID:number|null) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new TransactionFilePreviewOverlayRef(overlayRef, this.router);

    const overlayComponent = this.attachDialogContainer(
      overlayRef,
      dialogRef, 
      transactionID);

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
    dialogRef: TransactionFilePreviewOverlayRef,
    transactionID:number|null
    ) {
    const injector = this.createInjector( 
      dialogRef, 
      transactionID);

    const containerPortal = new ComponentPortal(TransactionFilePreviewOverlayComponent, null, injector);
    const containerRef: ComponentRef<TransactionFilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector( 
    dialogRef: TransactionFilePreviewOverlayRef,
    transactionID:number|null): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(TransactionFilePreviewOverlayRef, dialogRef);
    injectionTokens.set(TRANSACTION_PREVIEW_TOKEN, transactionID);

    return new PortalInjector(this.injector, injectionTokens);
  }
}