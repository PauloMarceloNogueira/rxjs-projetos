/* eslint no-undef: "off" */
/* eslint no-console: "off" */
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import keyup$ from './Observables/keyup';
import click$ from './Observables/pagination';

const listResult = document.getElementById('result');

const searchAPI = page => Observable.ajax(`https://reqres.in/api/users?page=${page}&per_page=5`);

// const searcher$ = keyup$.switchMap(searchAPI);
const searcher$ = merge(
  click$.switchMap(searchAPI),
  keyup$.switchMap(searchAPI),
);

searcher$.pipe(
  map((val) => {
    val.response.data.map((data) => {
      const list = document.createElement('li');
      list.innerHTML = `${data.id} | ${data.first_name}`;
      listResult.appendChild(list);
      return null;
    });
  }),
).subscribe();
