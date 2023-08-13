function fecth(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => setTimeout(res(JSON.parse(xhr.response)), 5000);
    xhr.onerror = () => setTimeout(rej('Promise Rejected !!'), 5000);
    xhr.send();
  });
}
let data = fecth(`https://api.github.com/users/anandsesha`);
// .then((data) =>
//   console.log(data.name)
// );
