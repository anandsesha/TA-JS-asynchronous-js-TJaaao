1. Create a promise. Have it resolve with a value of `Promise Resolved!` in resolve after a delay of 1000ms, using `setTimeout`. Print the contents of the promise after it has been resolved by passing `console.log` to `.then`

```js
let data = new Promise((res, rej) => {
  setTimeout(res(`Promise Resolved!`), 1000);
}).then((content) => console.log(content));

/*
To check how much time it took:

const startTime = new Date();

let data = new Promise((res, rej) => {
  setTimeout(() => {
      const endTime = new Date();
    const elapsedTime = endTime - startTime;
    console.log(`Timeout took ${elapsedTime} milliseconds to complete.`);
      res(`Promise Resolved!`)
  }, 1000);
}).then((content) => console.log(content));

Output: 
Timeout took 1012 milliseconds to complete.
Promise Resolved!

*/
```

2. Create another promise. Now have it reject with a value of `Rejected Promise!` WITH using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch`

```js
let data = new Promise((res, rej) => {
  rej(`Rejected Promise!`);
})
  .then((content) => console.log(content))
  .catch((content) => console.log(content));

/*
Similarly, Output when measured time to reject is:

Timeout took 1015 milliseconds to complete.
Rejected Promise!
*/
```

3. Create another promise. Now have it reject with a value of `Rejected Promise!` WITHOUT using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch` and also use `.finally` to log message `Promise Settled!`.

```js
const startTime = new Date();

let data = new Promise((res, rej) => {
  const endTime = new Date();
  const elapsedTime = endTime - startTime;
  console.log(`Timeout took ${elapsedTime} milliseconds to complete.`);

  rej(`Rejected Promise!`);
  rej(`Rejected Promise!`);
})
  .then((content) => console.log(content))
  .catch((content) => console.log(content))
  .finally((content) => console.log(`Promise Settled`));

/*
OUTPUT:
Timeout took 0 milliseconds to complete.
Rejected Promise!
Promise Settled


And Same thing, if we did using setTimeout it takes 1016 (~1000ms) to log `Promise Settled`
*/
```

4. What will be the output of the code below.

```js
console.log('A');

// Asynchronous code finises in 0 seconds (Callback Queue)
setTimeout(() => console.log('B'), 0); // callback queue

// A promise that resolves right away (Microtask Queue)
Promise.resolve().then(() => console.log('C'));

console.log('D');

/*
OUTPUT:
A
D
C  //Event loop takes from Microtask Queue first
B
*/
```

5. Write a function named `wait` that accepts `time` in ms returns a promise. The promise gets resolved after given time.

```js
function wait(time) {
  return new Promise((res, rej) => {
    setTimeout(res(`Promise Resolved after ${time} ms`), time);
  });
}

wait(1000);

/*
OUTPUT:
Promise {<fulfilled>: 'Promise Resolved after 1000 ms'}

BUT if we check the time taken:

const startTime = new Date();

function wait(time) {
  return new Promise((res, rej) => {
      const endTime = new Date();
    const elapsedTime = endTime - startTime;
            console.log(`Timeout took ${elapsedTime} milliseconds to complete.`);

    setTimeout(res(`Promise Resolved after ${time} ms`), time);
  });
}

wait(1000); // OUTPUT: Timeout took 1415 milliseconds to complete.
wait(1000); // OUTPUT: Timeout took 2786 milliseconds to complete.
wait(1000); // OUTPUT: Timeout took 3778 milliseconds to complete.
*/
```

6. Do the following:

- Create a new promise
- Resolve with 21
- Use `.then` and return adding `10` to the value you will get as parameter
- Use `.then` and return adding `100` to the value you will get as parameter
- Use `.then` and check if the value you get is greater than `100` throw new error with any message
- Catch the error using `.catch`

```js
Promise.resolve(21)
  .then((val) => val + 10)
  .then((val) => val + 100)
  .then((val) => {
    val > 100 ? true : false;
    console.error('Error Message to be caught');
  })
  .catch((error) => console.log(error));

/*
OUTPUT:
 
x Error Message to be caught
Promise {<fulfilled>: undefined}
*/
```

7. Do the following:

- Create a new promise
- Resolve the promise with `['A']`
- Use `.then` and concat `B` into the parameter and return
- Use `.then` and return and object like `{0: 'A', 1: 'B'}`
- Use `.then` and log the value

```js
Promise.resolve([`A`])
  .then((val) => val.concat(`B`))
  .then((val) => {
    val.reduce((acc, cv) => {
      return { 0: 'A', 1: 'B' };
    }, val);
  })
  .then((objVal) => console.log(objVal));
```

8. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Chain `.then` on above and return `3` also check the value you get access to by logging
- Chain `.then` on above and return `4` also check the value you get access to by logging

```js
let first = Promise.resolve(1);
// first
// Promise {<fulfilled>: 1}

first.then((val) => {
  return 2;
});
// first
// Promise {<fulfilled>: 2}

first
  .then((val) => {
    return 2;
  })
  .then((val) => {
    return 3;
  });
// Promise {<fulfilled>: 3}

first
  .then((val) => {
    return 2;
  })
  .then((val) => {
    return 3;
  })
  .then((val) => {
    return 4;
  });
// Promise {<fulfilled>: 4}
```

9. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Use `.then` on `first` and return `3` also check the value you get access to by logging
- Use `.then` on `first` and return `4` also check the value you get access to by logging

`````js
// Without chaining

let first = Promise.resolve(1);
// first
// Promise {<fulfilled>: 1}

let first = first.then((val) => {
  return 2;
});
// first
// Promise {<fulfilled>: 2}

let first = first.then((val) => {
  return 3;
});
// Promise {<fulfilled>: 3}

let first = first.then((val) => {
  return 4;
});

// Promise {<fulfilled>: 4}
```

10. Try to understand the difference between the problem 8 and 9. Write your observation.
```
// DOUBT!
```

11. Do the following

- Create a promise and resolve it with `John`
- Use `.then` and return another promise that resolves with `Arya`
- Use `.then` log the value you get access to and return another promise that resolves after 2000ms with value `Bran`
- Use `.then` to log the value

````js
Promise.resolve('John').then(val => {return 'Arya'}).then(val => {
    console.log(val);
    return new Promise((res,rej) => {
        setTimeout(res(`Bran`),2000);
    });
}).then(val => console.log(val));


/*
OUTPUT:

Arya
Bran
Promise {<fulfilled>: undefined}

*/
`````
