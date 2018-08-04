const { from } = require('rxjs');
const { scan, startWith, last } = require('rxjs/operators');

let square = x => x * x;
let minusOne = x => x - 1;
let plusFive = x => x + 5;

let applySequence = (sequence, firstNumber) => (
  from(sequence)
  .pipe(
    startWith(n => n),
    scan((acc, currFn) => currFn(acc), firstNumber)
  )
);

let sequence = [
  square,
  minusOne,
  plusFive,
  minusOne,
  square,
  minusOne,
  square
];

let results$ = applySequence(sequence, 10);

results$.subscribe(
  value => { console.log("Current value: " + value) },
  error => console.log
);

results$
.pipe(last())
.subscribe(
  value => { console.log("Done. Final value: " + value) }
);
