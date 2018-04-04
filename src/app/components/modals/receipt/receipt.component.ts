import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptComponent implements OnInit {

  public waiting = false;
  public data: any; // Data is actually passed through the modal service not here
  public dataAlt: any; // Data is actually passed through the modal service not here
  public onSuccess: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  /**
   * Submit the form
   */
  submit() {
    this.waiting = true;
    this.activeModal.close('Success');
  } // end submit

}
