/*
Description:

 The "/search/photos" endpoint of the https://api.unsplash.com/ API,
   along with providing Authentication ID of the app created on Unsplash 
 + the "&query" parameter which determines what keyword to search image for,
  gives us AN OBJECT like this {total: 10020, total_pages: 668, results: Array(15)}


  From this object's -> results parameter which is an Array of objects,
  we can get the description to filter as per our image search,
  + from the urls parameter we can get each image url.  


// GET /photos/random
// GET /search/photos

// ClientID given outside xhr.open() request to GET API

*/

/*
const imagesList = document.querySelectorAll('.images img');
const input = document.querySelector('input');
const clientId = `4EdY7eMr6Y7YHuja80kX5BzBmuSl6Hlv4YYjOHfhB1k`;
input.addEventListener('keyup', handleChange);

function displayUI(data) {
  let imageUrls = data.results.map((eachObj) => eachObj.urls.regular);
  imagesList.forEach((img, i) => {
    img.src = imageUrls[i];
  });
}

function handleChange(event) {
  if (event.keyCode == 13 && event.target.value !== '') {
    console.log(event.target.value);
    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos?client_id=${clientId}&page=1&per_page=15&query=${event.target.value}`
    );
    xhr.onload = function () {
      console.log('Data loading Started....');
      let imagesData = JSON.parse(xhr.response);
      displayUI(imagesData);
      console.log(imagesData);
    };
    xhr.send();
  }
}

*/

/*
.
.
.
.
.
.
.
.*/

// Refractor same image search app using PROMISES :-

const imagesList = document.querySelectorAll('.images img');
const input = document.querySelector('input');
const clientId = `4EdY7eMr6Y7YHuja80kX5BzBmuSl6Hlv4YYjOHfhB1k`;
input.addEventListener('keyup', handleChange);

const getSearchURL = (query) =>
  `https://api.unsplash.com/search/photos?client_id=4EdY7eMr6Y7YHuja80kX5BzBmuSl6Hlv4YYjOHfhB1k&page=1&per_page=15&query=${query}`;

function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => res(JSON.parse(xhr.response));
    xhr.onerror = () => rej('Promise Rejected !!');
    xhr.send();
  });
}

// fetch(url)
//   .then(displayUI)
//   .catch((error) => console.log(error));

function displayUI(data) {
  let imageUrls = data.results.map((eachObj) => eachObj.urls.regular);
  imagesList.forEach((img, i) => {
    img.src = imageUrls[i];
  });
}

function handleChange(event) {
  if (event.keyCode == 13 && event.target.value !== '') {
    fetch(getSearchURL(event.target.value))
      .then((xhrResponseData) => displayUI(xhrResponseData))
      .catch((error) => console.log(error));
    // console.log(fetch(getSearchURL(event.target.value))); ->  This gives a Promise with [[PromiseResult]] as the xhr.response object.
    /* Then using this xhrResponse Object, which is sent using then() to displatUI,
     the xhr.response has a property called results which is an array. That is accessed to get images  
      in the displayUI function. 
    */
    input.value = '';
  }
}
