import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ApiService, ApiActions } from '$api';
import { UIStoreService } from '$ui';

// import { Models } from '$models';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

  public users$ = this.api.select.users$;
  public usersState$ = this.api.select.getState$(ApiActions.users);

  /** Hold subs for unsub */
  private subs: Subscription[] = [];

  constructor(private api: ApiService, public ui: UIStoreService) { }

  ngOnInit() {
    this.api.users.get().subscribe();
  }

  public issueReceipt() {
    this.api.users.get(true).subscribe();
  }

  ngOnDestroy() {
    if (this.subs.length) { this.subs.forEach(sub => sub.unsubscribe())} 
  }
}
