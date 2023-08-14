- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
let one = new Promise((res, rej) => {
  setTimeout(() => res(1), 1000);
});
let two = new Promise((res, rej) => {
  setTimeout(() => res(2), 2000);
});
let three = new Promise((res, rej) => {
  setTimeout(() => res(3), 3000);
});
let four = new Promise((res, rej) => {
  setTimeout(() => res(4), 4000);
});
Promise.all([one, two, three, four]).then((resp) => console.log(resp));
// Output:  [1, 2, 3, 4]
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
let usernames = ['getify', 'gearon', 'anandsesha', 'nnnkit', 'prank7', 'loki'];

Promise.all(
  usernames.map((githubUser) =>
    fetch(`https://api.github.com/users/${githubUser}`)
  )
).then((resp) => resp.json());
//[Promise, Promise, Promise, Promise, Promise, Promise]

let arrayOfUserPromises = Promise.all(
  usernames.map((githubUser) =>
    fetch(`https://api.github.com/users/${githubUser}`).then((resp) =>
      resp.json()
    )
  )
);
//Promise {<fulfilled>: Array(6)}
// [{…}, {…}, {…}, {…}, {…}, {…}]

arrayOfUserPromises.then((data) =>
  data.forEach((obj) =>
    console.log(`The followers for ${obj.login} are ${obj.followers}`)
  )
);

// The followers for getify are 41623
// The followers for Gearon are 2
// The followers for anandsesha are 9
// The followers for nnnkit are 128
// The followers for prank7 are 130
// The followers for loki are 3
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let urls = [`https://random.dog/woof.json`, `https://aws.random.cat/meow`];

let fastestUrl = Promise.race(urls.map((eachUrl) => fetch(eachUrl)));
// > fastestUrl
// Promise {<fulfilled>: Response}
//The Promise with url: "https://random.dog/woof.json" is resolved faster.
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.all([one, two, three]);
// Promise {<rejected>: Error: Whoops!

Promise.allSettled([one, two, three]);
/*
Promise {<fulfilled>: Array(3)}

[[PromiseResult]]: Array(3)
0: {status: 'fulfilled', value: 'Arya'}
1: {status: 'rejected', reason: Error: Whoops! at <anonymous>:5:27}
2: {status: 'fulfilled', value: 'John'}
*/
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

/*
(3) ['Arya', 'Sam', {…}]

Beacuse in Promise.all() , the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.
*/
```
