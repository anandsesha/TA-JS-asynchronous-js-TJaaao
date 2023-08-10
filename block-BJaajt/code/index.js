const input = document.querySelector('input[type="text"]');
const img = document.querySelector('.main img');
const name = document.querySelector('h3');
const workingAt = document.querySelector('p');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const followersImage = document.querySelectorAll('.followers-ff img');
const followersNames = document.querySelectorAll('.followers-ff h2');
const followingImage = document.querySelectorAll('.following-ff img');
const followingNames = document.querySelectorAll('.following-ff h2');
const button = document.querySelector('input[type="button"]');
const catImage = document.querySelector('.cat-image');

input.addEventListener('keyup', handleChange);
button.addEventListener('click', handleButton);

function displayUI(data) {
  img.src = data.avatar_url;
  name.innerText = data.name;
  workingAt.innerText =
    data.company === null ? `Company: None` : `Company: ${data.company}`;
  followers.innerText = `Followers: ${data.followers}`;
  following.innerText = `Following: ${data.following}`;
}

function displayFiveFollowers(data) {
  // console.log(followersImage);
  let imgArray = data.map((eachObj) => eachObj.avatar_url);
  // console.log(imgArray);
  followersImage.forEach((img, i) => {
    if (i < imgArray.length) {
      img.setAttribute('src', imgArray[i]);
    }
  });
  let usernameArray = data.map((eachObj) => eachObj.login);
  followersNames.forEach((name, i) => {
    if (i < usernameArray.length) {
      name.innerText = usernameArray[i];
    }
  });
}

function displayFiveFollowing(data) {
  // console.log(followingImage);
  let imgArray = data.map((eachObj) => eachObj.avatar_url);
  // console.log(imgArray);
  followingImage.forEach((img, i) => {
    if (i < imgArray.length) {
      img.setAttribute('src', imgArray[i]);
    }
  });
  let usernameArray = data.map((eachObj) => eachObj.login);
  followingNames.forEach((name, i) => {
    if (i < usernameArray.length) {
      name.innerText = usernameArray[i];
    }
  });
}

function displayCat(data) {
  catImage.src = data[0].url;
}

function handleChange(event) {
  if (event.keyCode === 13 && event.target.value !== '') {
    console.log(event.keyCode);
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onloadstart = function () {
      console.log(`Data Loading has Started!!`);
    };
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    xhr.onerror = function () {
      console.log(`Error Loading Data!!`);
    };
    xhr.send();

    // Followers First Five
    let followersXhr = new XMLHttpRequest();
    followersXhr.open(
      `GET`,
      `https://api.github.com/users/${event.target.value}/followers`
    );
    followersXhr.onload = function () {
      let followersData = JSON.parse(followersXhr.response);
      // console.log(followersData);
      displayFiveFollowers(followersData);
    };
    followersXhr.send();

    //Following First Five
    let followingXhr = new XMLHttpRequest();
    followingXhr.open(
      'GET',
      `https://api.github.com/users/${event.target.value}/following`
    );
    followingXhr.onload = function () {
      let followingData = JSON.parse(followingXhr.response);
      // console.log(followingData);
      displayFiveFollowing(followingData);
    };
    followingXhr.send();

    event.target.value = '';
  }
}

function handleButton() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr.onload = function () {
    let catData = JSON.parse(xhr.response);
    console.log(catData);
    displayCat(catData);
  };
  xhr.send();
}
