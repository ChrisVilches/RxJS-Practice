const { of, from, interval } = require('rxjs');
const { startWith, switchMap, take, map, concatAll, mergeAll, combineAll, concat, merge } = require('rxjs/operators');

function createTask(name, duration){
  return () => {
    console.log("Executing " + name + "...");
    return new Promise(resolve => {
      setTimeout(resolve, duration, name + " done");
    });
  }
}


function doSequentially(tasks, wait){

  let firstTask$ = from(tasks[0]());

  tasks.shift(); // Remove first task

  let otherTasks$ = from(tasks)
  .pipe(map(t => interval(wait).pipe(take(1), switchMap(x => t()))));

  return of(firstTask$).pipe(merge(otherTasks$), concatAll());

}


let result$ = doSequentially([
  createTask("A", 200),
  createTask("B", 500),
  createTask("C", 200),
  createTask("D", 1000),
  createTask("E", 100),
  createTask("F", 800),
  createTask("G", 200)
], 3000);

result$.subscribe(
  result => {
    console.log("Result:", result);
    console.log();
  }
);
