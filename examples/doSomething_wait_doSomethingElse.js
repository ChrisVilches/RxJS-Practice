const { from, of, interval, Subject, empty } = require('rxjs');
const { map, mergeMap, scan, merge, pairwise, combineAll, last, concat, switchMap, mergeAll, concatAll, startWith, concatMap, delay, take, mapTo } = require('rxjs/operators');

function createTask(name, duration){
  return () => {
    console.log("Executing " + name + "...");
    return new Promise(resolve => {
      setTimeout(resolve, duration, name + " done");
    });
  }
}


function doSequentially(tasks, wait){

  let oneEmptyWait$ = interval(wait).pipe(take(1), mergeMap(() => empty()));

  return from(tasks)

  .pipe(
    mergeMap(t => from([t, oneEmptyWait$]))
  )

  .pipe(

    concatMap(x => {

      if(typeof x === "function"){
        return x();
      }

      return x;

    })
  );

}


let result$ = doSequentially([
  createTask("A", 200),
  createTask("B", 200),
  createTask("C", 200),
  createTask("D", 200),
  createTask("E", 200),
  createTask("F", 200),
  createTask("G", 200)
], 1000);

result$.subscribe(
  result => {
    console.log("Result:", result);
    console.log();
  }
);
