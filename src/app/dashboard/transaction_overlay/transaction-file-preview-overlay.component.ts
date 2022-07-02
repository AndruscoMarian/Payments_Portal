import { Component, Inject} from '@angular/core';

import { TransactionFilePreviewOverlayRef } from './transaction-file-preview-overlay-ref';
import { TRANSACTION_PREVIEW_TOKEN } from './transaction-preview-overlay.token';


@Component({
  selector: 'transaction-file-preview-overlay',
  templateUrl: './transaction-file-preview-overlay.component.html',
  styleUrls: ['./transaction-file-preview-overlay.component.css']
})


export class TransactionFilePreviewOverlayComponent {

  constructor(
    public dialogRef: TransactionFilePreviewOverlayRef,
    @Inject(TRANSACTION_PREVIEW_TOKEN) public transactionID: number|null) {}

 }
