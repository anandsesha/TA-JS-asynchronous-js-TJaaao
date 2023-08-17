(function () {
  let booksPage = document.querySelector('.container');
  let modelWindow = document.querySelector('.modal-window');
  let modelClose = document.querySelector('.modal-close');
  let charactersUl = document.querySelector('.characters-ul');

  // let openButton = document.querySelector('.btn');
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
    booksPage.innerHTML = '';
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

      // a.href = './character.html';

      h2.innerHTML = bookObj.name;
      h3.innerText = bookObj.authors[0];
      button.innerText = `Show Characters (${bookObj.characters.length})`;

      button.addEventListener('click', () => {
        console.log('Button clicked');
        modelWindow.style.display = 'block';
        // console.log(bookObj.characters);
        displayCharacters(bookObj.characters);
      });

      modelClose.addEventListener('click', () => {
        modelWindow.style.display = 'none';
      });

      a.append(button);
      bookData.append(h2, h3, a);
      booksPage.append(bookData, modelWindow);
    });
  }

  {
    /* For Loading Spinner
  
     <div class="spinner">
          <div class="donut"></div>
        </div> 
    */
  }
  function handleSpinner(rootElm, status = false) {
    if (status == true) {
      rootElm.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
    }
  }

  function displayCharacters(charactersArray) {
    // We get an array of character's Links.
    // To convert this to an array of characters data we use promise.all() to resolve all the links in the character array.
    handleSpinner(charactersUl, true);

    Promise.all(
      charactersArray.map((character) => {
        return fetch(character).then((resp) => resp.json());
      })
    ).then((charactersData) => {
      charactersUl.innerHTML = '';
      charactersData.forEach((char) => {
        let li = document.createElement('li');
        li.classList.add('characters-li');
        li.innerText = `${char.name} : (${char.aliases.join(' ')})`;

        charactersUl.append(li);
      });
    });
    // booksObjectArray.forEach((bookObj) => {

    // })
  }

  function fetchBooks() {
    handleSpinner(booksPage, true);

    fetch(`https://www.anapioficeandfire.com/api/books`)
      .then((resp) => resp.json())
      .then((eachBookObj) => {
        createUI(eachBookObj);
        eachBookObj.map((bookObj) => bookObj.characters);
        // console.log(charactersArrayofArrays);

        // displayCharacters(eachBookObj);
      })
      .finally(() => handleSpinner(booksPage));
  }

  fetchBooks();
})();
