/* eslint no-undef: "off" */
/* eslint no-console: "off" */

import { fromEvent } from 'rxjs';
import {
  map, debounceTime, distinctUntilChanged,
} from 'rxjs/operators';
import 'rxjs/add/observable/dom/ajax';

const input = document.getElementById('input');

export default fromEvent(input, 'keyup')
  .pipe(
    map(event => event.target.value.toUpperCase() || 0),
    debounceTime(500),
    distinctUntilChanged(),
  );
