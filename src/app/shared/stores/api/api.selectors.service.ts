import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { Models } from '$models';
import { AppStore } from '$shared';
import { ApiActions } from './api.actions';

// Users
const usersSrc = (state: AppStore.Root) => state.api.users;
// Duplicate the number of users
const usersDuped = createSelector(
  usersSrc,
  (users2) => {
    if (users2) {
      let users2New: Models.User[] = [];
      _.times(20, () => users2New = [...users2New, ...users2]);
      return _.shuffle(
        users2New.map((user, i) => Object.assign({},
          user,
          {
            id: i,
            docs: _.random(1, 7),
            lnkey: _.random(100000000, 100500000),
            fName: user.name.split(' ')[0],
            lName: user.name.split(' ')[1],
            new: _.random(0, 10) > 4 ? true : false
          }
        ))
      );
    }
  });

const loansCount = createSelector(
  usersDuped,
  (users2) => {
    if (users2) {
      return users2.length;
    }
  });

// Map users down to a dictionary based on ID
const usersMapped = createSelector(
  usersDuped,
  (users2) => {
    if (users2) {
      return _.keyBy(users2, 'id');
    }
  });

@Injectable()
export class ApiSelectorsService {

  public users$ = this.store.select(usersDuped);
  public loansCount$ = this.store.select(loansCount);
  public usersMapped$ = this.store.select(usersMapped);

  /** Get the API data using api props */
  public getData$ = (apiProp: ApiActions) => this.store.select(store => store.api[apiProp]);
  /** Get the API state using api props */
  public getState$ = (apiProp: ApiActions) => this.store.select(store => store.apiStatus[apiProp]);


  constructor(
    private store: Store<AppStore.Root>,
  ) {
  }

}
