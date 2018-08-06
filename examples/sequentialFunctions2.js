const { of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

async function square(x){
  let result = await x * x;
  return result;
}

function minusOne(x){
  return new Promise(resolve => {
    setTimeout(resolve, 150, x - 1);
  });
}

function plusFive(x){
  return x + 5;
}


function applySequence(sequence, firstNumber){
  return of(firstNumber)
  .pipe(
    mergeMap(async x => {
      let accum = x;
      for(let i=0; i<sequence.length; i++){
        accum = await sequence[i](accum);
      }
      return accum;
    })
  );
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
  console.log
);
