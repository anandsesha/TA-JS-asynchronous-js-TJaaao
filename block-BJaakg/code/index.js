let booksPage = document.querySelector('.container');
{
  /* <div class="book-data flex jcc aic flex-col">
        <h2 class="book-name">A Game of Thrones</h2>
        <h3 class="book-author">George R. R. Martin</h3>
        <a href="./character.html">
          <button>Show Characters (<span>474</span>)</button>
        </a>
      </div> */
}

function createUI(booksObjectArray) {
  booksObjectArray.forEach((bookObj) => {
    // console.log(bookObj);

    let bookData = document.createElement('div');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let a = document.createElement('a');
    let button = document.createElement('b');

    bookData.classList.add('book-data', 'flex', 'jcc', 'aic', 'flex-col');
    h2.classList.add('book-name');
    h3.classList.add('book-author');
    a.classList.add('anchor');
    button.classList.add('button');

    a.href = './character.html';

    h2.innerHTML = bookObj.name;
    h3.innerText = bookObj.authors[0];
    button.innerText = `Show Characters (${bookObj.characters.length})`;

    a.append(button);
    bookData.append(h2, h3, a);
    booksPage.append(bookData);
  });
}

function displayCharacters(booksObjectArray) {
  let charactersArray = booksObjectArray.map((bookObj) => bookObj.characters);
  console.log(charactersArray);
  // booksObjectArray.forEach((bookObj) => {

  // })
}

fetch(`https://www.anapioficeandfire.com/api/books`)
  .then((resp) => resp.json())
  .then((eachBookObj) => {
    createUI(eachBookObj);
    eachBookObj.map((bookObj) => console.log(bookObj.characters));
    // console.log(charactersArrayofArrays);

    // displayCharacters(eachBookObj);
  });
//   .then((eachArray) => console.log(eachArray));
