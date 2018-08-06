const { from, of, interval } = require('rxjs');
const { map, mergeMap, scan, merge, pairwise, startWith, concatMap, delay, take, mapTo } = require('rxjs/operators');

function createTask(name, duration){
  return () => {
    console.log("Executing " + name + "...");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(name + " done");
      }, duration);
    });
  }
}

function doSequentially(fn1, fn2, wait){

  let fn1$ = of(fn1()).pipe(mergeMap(fn => from(fn)));

  let wait$ = fn1$.pipe(delay(wait));

  let fn2$ = wait$.pipe(mergeMap(() => fn2()));

  return fn1$.pipe(merge(fn2$));
}

doSequentially(createTask("A", 2000), createTask("B", 2000), 1000).subscribe(
  result => {
    console.log("Result:", result);
  }
);
