const { from, of, zip } = require('rxjs');
const { map, mergeMap, scan, merge, pairwise, startWith } = require('rxjs/operators');

function random(a, b){
  return Math.floor(a + (Math.random() * (b-a)));
}

function loadResource(name){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Resource result: " + name);
    }, random(200, 8000));
  });
}

// Sum of weights is 100
let resources = [
  { promise: loadResource("Resource 1"), weight: 10 },
  { promise: loadResource("Resource 2"), weight: 20 },
  { promise: loadResource("Resource 3"), weight: 30 },
  { promise: loadResource("Resource 4"), weight: 40 }
];

// Emits every downloaded resource
let completedValues$ = from(resources)
.pipe(
  mergeMap(r => {
    return from(r.promise).pipe(startWith(r.weight), pairwise())
  }),
  map(r => r[0])
);

// Emits the accumulated sum of every downloaded resource
let accum$ = completedValues$
.pipe(
  scan((acc, curr) => acc + curr, 0)
);

// Synchronously prints the downloaded resource along with the total progress so far
let printCombined$ = zip(completedValues$, accum$)
.subscribe(
  value => {
    let [completed, progress] = value;
    console.log(`A resource worth ${completed}% was completed...\ttotal progress ${progress}%`);
  },
  error => {
  },
  complete => {
    console.log("Finished");
  }
);
