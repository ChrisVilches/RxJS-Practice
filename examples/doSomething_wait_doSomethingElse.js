const { from, interval } = require('rxjs');
const { startWith, switchMap, take, map, concatAll } = require('rxjs/operators');

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

  return from(tasks)
  .pipe(
    map(t => interval(wait).pipe(take(1), switchMap(x => t()))),
    startWith(firstTask$),
    concatAll()
  );
}


let result$ = doSequentially([
  createTask("A", 200),
  createTask("B", 2000),
  createTask("C", 200),
  createTask("D", 200),
  createTask("E", 200),
  createTask("F", 200),
  createTask("G", 200)
], 3000);

result$.subscribe(
  result => {
    console.log("Result:", result);
    console.log();
  }
);
