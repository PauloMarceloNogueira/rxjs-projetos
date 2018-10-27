/* eslint no-undef: "off" */
/* eslint no-console: "off" */
import { Observable, merge } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import keyup$ from './Observables/keyup';
import pagination$ from './Observables/pagination';
// import { filter } from '../node_modules/rxjs-compat/operator/filter';

const restResponse$ = Observable.create((obs) => {
  obs.next('Created!');
});

const listResult = document.getElementById('result');

const searchAPI = page => Observable.ajax(`https://reqres.in/api/users?page=${page}&per_page=5`);

const searcher$ = merge(
  restResponse$.switchMap(searchAPI),
  pagination$.switchMap(searchAPI),
);

keyup$.pipe(
  withLatestFrom(searcher$, (therm, result) => ({ therm, result })),
  map(
    ({ therm, result }) => result.response.data.filter(a => a.first_name.toUpperCase() === therm),
  ),
).subscribe((a) => {
  const list = document.createElement('li');
  listResult.innerHTML = '';
  list.innerHTML = `${a[0].id} | ${a[0].first_name}`;
  listResult.appendChild(list);
});

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
