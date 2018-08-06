const { of, from } = require('rxjs');
const { mergeMap, map, last, mergeAll } = require('rxjs/operators');

async function square(x){
  let result = await x * x;
  return result;
}

function minusOne(x){
  return new Promise(resolve => {
    setTimeout(resolve, 500, x - 1);
  });
}

function plusFive(x){
  return x + 5;
}


function applySequence(sequence, firstNumber){

  let obs$ = [of(firstNumber)];

  let fromPromiseOrNumber = (n) => typeof n === "number"? of(n) : from(n);

  sequence.map((fn, i) => {
    let prevSource$ = obs$[i];
    let newObs$ = prevSource$.pipe(
      map(n => fn(n)),
      mergeMap(n => fromPromiseOrNumber(n))
    );
    obs$.push(newObs$);
  });

  return from(obs$).pipe(mergeAll());
}


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
