import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Identity } from './identity.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const identities: Identity[] = [
      new Identity(1, 'Identity 1', 'Description Identity 1',
      [{id: 1, contact: 'Contact 1'},
      {id: 2, contact: 'Contact 2'},
      {id: 3, contact: 'Contact 3'},
      {id: 4, contact: 'Contact 4'}],
      [{id: 1, city: 'City 1'},
      {id: 2, city: 'City 2'},
      {id: 3, city: 'City 3'},
      {id: 4, city: 'City 4'}]),
      new Identity(2, 'Identity 2', 'Description Identity 2',
      [{id: 5, contact: 'Contact 5'},
      {id: 4, contact: 'Contact 4', selected: true},
      {id: 3, contact: 'Contact 3'},
      {id: 6, contact: 'Contact 6', selected: true}],
      [{id: 1, city: 'City 1', selected: true},
      {id: 2, city: 'City 2'},
      {id: 7, city: 'City 7', selected: true},
      {id: 8, city: 'City 8'}]),
      new Identity(3, 'Identity 3', 'Description Identity 3',
      [{id: 3, contact: 'Contact 3'}],
      [{id: 3, city: 'City 3'}]),
      new Identity(4, 'Identity 4', 'Description Identity 4',
      [{id: 4, contact: 'Contact 4'}],
      [{id: 4, city: 'City 4'}]),
      new Identity(5, 'Identity 5', 'Description Identity 5',
      [{id: 3, contact: 'Contact 3'}],
      [{id: 1, city: 'City 1'}]),
      new Identity(6, 'Identity 6', 'Description Identity 6',
      [{id: 2, contact: 'Contact 2'}],
      [{id: 3, city: 'City 3'}]),
      new Identity(7, 'Identity 7', 'Description Identity 7',
      [{id: 4, contact: 'Contact 4'}],
      [{id: 5, city: 'City 5'}]),
      new Identity(8, 'Identity 8', 'Description Identity 8',
      [{id: 8, contact: 'Contact 8'}],
      [{id: 3, city: 'City 3'}]),
      new Identity(9, 'Identity 9', 'Description Identity 9',
      [{id: 1, contact: 'Contact 1'}],
      [{id: 1, city: 'City 1'}]),
      new Identity(10, 'Identity 10', 'Description Identity 10',
      [{id: 3, contact: 'Contact 3'}],
      [{id: 3, city: 'City 3'}])
    ];
    return {identities};
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
