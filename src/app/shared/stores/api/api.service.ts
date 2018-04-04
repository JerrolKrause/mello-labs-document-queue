import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiHttpService, ApiStatusActions } from '@mello-labs/api-tools';
import 'rxjs/add/observable/throw';

import { AppSettings, AppStore } from '@shared';
import { ApiMap } from './api.map';
import { ApiActions } from './api.actions';

import { Models } from '@models';

@Injectable()
export class ApiService extends ApiHttpService {
  /** Collection of API store selectors. Can be moved to own service if this gets too big */
  public selectors = {
    users$: this.store.select(store => store.api.users),
    queue$: this.store.select(store => store.api.queue),
  };

  public queue = {
    get: (update?: boolean) => this.getStore<Models.User[]>(ApiMap.queue.endpoint, ApiMap.queue, update),
  }

  // API endpoints
  /** Users endpoint */
  public users = {
    get: (update?: boolean) => this.getStore<Models.User[]>(ApiMap.users.endpoint, ApiMap.users, update),
    getOne: (user: Models.User, update?: boolean) =>
      this.getStore<Models.User>(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, update),
    post: (user: Models.User) => this.postStore<Models.User>(ApiMap.users.endpoint, ApiMap.users, user),
    put: (user: Models.User) => this.putStore<Models.User>(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, user),
    delete: (user: Models.User) => this.deleteStore(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, user),
  };

  /** Get the API data using api props */
  //public getData$ = (apiProp: ApiActions) => this.store.select(store => store.api[apiProp]);
  /** Get the API state using api props */
  public getState$ = (apiProp: ApiActions) => this.store.select(store => store.apiStatus[apiProp]);

  constructor(
    private store: Store<AppStore.Root>,
    private http: HttpClient,
    private router: Router,
    private settings: AppSettings,
  ) {
    super(<any>http, <any>store, <any>router);

    // Output store changes to console
    // this.store.subscribe(store => console.log(JSON.parse(JSON.stringify(store))));
  }

  /**
   * Reset the store, clear out all held state and data
   */
  public resetStore() {
    this.cache = {}; // Clear cache
    this.store.dispatch({
      type: ApiStatusActions.RESET,
      payload: null,
    }); // Update store with new state
  }

  /**
   * Reset all errors in the api state
   */
  public resetErrors(): void {
    this.store.dispatch({
      type: ApiStatusActions.RESET_ERRORS,
      payload: null,
    });
  }

  /**
   * Reset all errors in the api state
   */
  public resetSuccess(): void {
    this.store.dispatch({
      type: ApiStatusActions.RESET_SUCCESS,
      payload: null,
    });
  }

  /**
   * Fix a big with TS where super calls don't count as usage
   */
  public fixTS() {
    console.log(this.http, this.router, this.settings);
  }
}
