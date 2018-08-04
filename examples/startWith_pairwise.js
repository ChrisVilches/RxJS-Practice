const { from, of } = require('rxjs');
const { pairwise, startWith, delay, mergeMap } = require('rxjs/operators');

let string$ = from([1, 2, 3, 4])
.pipe(
  mergeMap(
    num => of(num).pipe(startWith(0), pairwise())
  ),
  delay(2000)
);

// Both values are printed simultaneously.
string$.subscribe(console.log);
