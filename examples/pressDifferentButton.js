const { from, of } = require('rxjs');
const { pairwise, startWith, delay, mergeMap } = require('rxjs/operators');

/*
* The user presses a button, which triggers an async action.
* But then, before the action finishes, he clicks another button which
* triggers a different action, and must cancel the previous one.
*/

function loadHomePage(){
  return new Promise(resolve => {
    setTimeout(resolve, 2000, "Home page");
  });
}

function loadSettings(){
  return new Promise(resolve => {
    setTimeout(resolve, 5000, "Settings page");
  });
}


let a$ = from(loadSettings());
let subsription = a$.subscribe(console.log);

setTimeout(() => {
  subsription.unsubscribe();
  a$ = from(loadHomePage());
  a$.subscribe(console.log);
}, 500);
