/* eslint no-undef: "off" */
/* eslint no-console: "off" */

import { fromEvent } from 'rxjs';
import {
  map,
} from 'rxjs/operators';
import 'rxjs/add/observable/dom/ajax';

const listResult = document.getElementById('result');
const buttonOne = document.getElementsByClassName('pagination');

export default fromEvent(buttonOne, 'click')
  .pipe(
    map((event) => {
      listResult.innerHTML = '';
      return event.target.text;
    }),
  );
