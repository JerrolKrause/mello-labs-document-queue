/**
Adding a new endpoints:
1. Create a new property in the ApiProps enum in api.properties.ts
2. Create a new entry in api.map. Add endpoint, store property and uniqueID
3. Add the end data location in the main store state in api.state.ts
*/

// import IStore
import { AppStore } from '@shared';
import { ApiActions } from './api.actions';
import { Models } from '@models';

import * as _ from 'lodash';
// IStore.ApiMap

export const ApiMap: AppStore.ApiMapping = {
  // Example
  users: {
    endpoint: '//jsonplaceholder.typicode.com/users',
    storeProperty: ApiActions.users,
    uniqueId: 'id',
    mapSrc: 'src',
    map: (users: Models.User[]) => {

      const dict: { [key: string]: Models.User } = {};
      users.forEach(user => {
        dict[user.id] = user
        
      });

      return {
        src: users,
        dict: dict,
      };
    },
  },
  // Documents queue
  queue: {
    endpoint: 'assets/mock-data/queue.json',
    storeProperty: ApiActions.queue,
    uniqueId: 'lnkey',
    mapSrc: 'src',
    map: (queue: any[]) => {
      // Sample dictionary mapping based on id property
      const dict: { [key: string]: any } = {};
      queue.forEach(item => (dict[item.id] = item));
      const queueNew: any[] = [];
      const documents = ['Bank Statement', '1003', 'Credit Report', 'Drivers License', 'W2', 'Flood Certificate'];

      const namesFirst = ["Leanne", "Ervin", "Clementine", "Patricia", "Chelsey", "Mrs.", "Kurtis", "Nicholas", "Glenna", "Clementina"]
      const namesLast = ["Graham", "Howell", "Bauch", "Lebsack", "Dietrich", "Schulist", "Weissnat", "V", "Reichert", "DuBuque"]


      _.times(50, () => {
        const item: any = {};
        item.lnkey = _.random(100000000, 100500000);
        item.borrowerNames = _.shuffle(namesFirst)[0] + ' ' + _.shuffle(namesLast)[0];
        item.documents = [];
        item.new = _.random(10) > 7 ? true : false;
        item.complete = _.random(10) > 3 ? true : false;

        _.times(_.random(6) + 1, () => {
          item.documents.push(_.shuffle(documents)[0]);
        })

        item.documents = _.uniq(item.documents);
        queueNew.push(item);

        //userNew.reviewedCount = _.random(5) + 1;
        //userNew.lastStatus = _.shuffle(['Wrong documents', 'Borrower name on title incorrect', 'Missing Documents', 'Condition not met'])[0];
        //userNew.unverified = _.random(60);
        //userNew.complete = userNew.unverified;
        //userNew.exception = _.random(10) > 7 ? true : false;
        //userNew.forReview = _.shuffle(forReview)[0];
        //userNew.lockedBy = _.random(10) > 7 ? _.shuffle(namesFirst)[0] + ' ' + _.shuffle(namesLast)[0] : null;
        //userNew.state = _.shuffle(states)[0];
        //userNew.id = i;
        //userNew.name = _.shuffle(namesFirst)[0] + ' ' + _.shuffle(namesLast)[0];
        //userNew.lnkey = _.random(100000000, 100500000);
        //userNew.loanAmount = _.random(100000, 600000);
        //userNew.borrower = _.random(10) > 3 ? true : false;
        //userNew.vesting = _.random(10) > 5 ? true : false;
        //userNew.property = _.random(10) > 6 ? true : false;
        //userNew.liens = _.random(10) > 4 ? true : false;
        //userNew.notes = _.random(10) > 5 ? true : false;
        //userNew.certification = _.random(100) > 85 ? true : false;
        //if (userNew.certification){
        //  userNew.borrower = userNew.vesting = userNew.property = userNew.liens = userNew.notes = true;
        //}
        //userNew.dateEffective = '2/8/2018';
        //userNew.dateExpiration = '4/21/2018';

      })
      console.log(queueNew)

      return {
        src: queueNew,
        dict: dict,
      };
    },
  },
};
