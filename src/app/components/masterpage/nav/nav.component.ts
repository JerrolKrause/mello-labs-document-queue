import { Component } from '@angular/core';
import * as _ from 'lodash';

import { AuthService, ServiceWorkerService, AppSettings } from '$shared';
import { ApiService } from '$api';
import { environment } from '$env';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  /** Is the dropdown menu open on mobile */
  public isOpen = false;
  /** Turn the username into title case */
  public userName = _.startCase(_.toLower(this.settings.userName));
  /**  Is the service worker enabled */
  public hasSW = environment.settings.enableServiceWorker;
  /**   Does the app have an update */
  public hasUpdate$ = this.sw.updateAvailable$;
  /**   Total loans in queue */
  public loanCount$ = this.api.select.loansCount$;

  constructor(
    private auth: AuthService,
    private sw: ServiceWorkerService,
    private settings: AppSettings,
    private api: ApiService
  ) { }

  public updateApp() {
    this.sw.openModal();
  }

  public logOut() {
    this.auth.logOut(true);
  }
}
