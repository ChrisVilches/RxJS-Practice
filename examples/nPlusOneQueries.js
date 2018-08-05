const { from } = require('rxjs');
const { concatAll, map, reduce } = require('rxjs/operators');
const { random } = require('./util');

// Does n + 1 queries and stores the results properly in an array

// Multiplies the value by 100
function query(i){
  console.log("Executing query...");
  let promise = new Promise(resolve => {
    setTimeout(() => {
      console.log("Query finished.");
      resolve(i * 100);
    }, random(500, 1500));
  });

  return promise;
}

let queries = [6, 4, 87, 2, 4, 7, 12, 199, 12];

console.log("All queries start executing immediately, and then the results come out in order.");

let results$ = from(queries)
.pipe(
  map(q => from(query(q))),
  concatAll(),
  reduce((arr, val) => { arr.push(val); return arr; }, [])
);

results$
.subscribe(console.log);
