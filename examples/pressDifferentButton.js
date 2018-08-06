const { from, of, Subject } = require('rxjs');
const { pairwise, startWith, delay, mergeMap, last, switchMap } = require('rxjs/operators');

/*
* The user presses a button, which triggers an async action.
* But then, before the action finishes, he clicks another button which
* triggers a different action, and must cancel the previous one.
*/

function loadHomePage(n){
  return new Promise(resolve => {
    setTimeout(resolve, 2000, "Home page " + n);
  });
}

function loadSettings(){
  return new Promise(resolve => {
    setTimeout(resolve, 5000, "Settings page " + n);
  });
}


let subject = new Subject();
let observable$ = from(subject).pipe(switchMap(x => from(x)));
observable$.subscribe(console.log);

subject.next(loadSettings(1));
subject.next(loadHomePage(2));
subject.next(loadSettings(3));
subject.next(loadSettings(4));
subject.next(loadSettings(5));
subject.next(loadSettings(6));
subject.next(loadHomePage(7)); // Only this one remains
