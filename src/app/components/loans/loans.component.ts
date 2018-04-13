import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { DesktopUtils } from '$utils';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansComponent implements OnInit {

  @Input() loans: any[] = [];
  @Input() resubmittal: boolean = false;
  @Output() issueReceipt: EventEmitter<string> = new EventEmitter();

  public hasDownloaded: { [key: string]: true } = {};

  constructor() { }

  ngOnInit() {
  }

  /**
   * Copy text to clipboard
   * @param str
   */
  public copyToClipboard(str: string) {
    DesktopUtils.copyToClipboard(str);
  }

  /**
   * Manage document download functionality
   * @param url
   * @param lnkey
   */
  public docsDownload(url: string, lnkey: string) {
    window.location.href = url;
    this.hasDownloaded[lnkey] = true;
    DesktopUtils.copyToClipboard(lnkey);
  }

  /**
   * Issue Receipt
   * @param lnkey - Loan Number
   * @param notDisabled - Should this link be clickable
   */
  public receiptIssue(lnkey: string, notDisabled: boolean) {
    if (notDisabled){
      delete this.hasDownloaded[lnkey];
      this.issueReceipt.emit();
    }
  }

}
