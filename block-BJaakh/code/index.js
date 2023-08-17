const input = document.querySelector(`input[type='text']`);
const todoList = document.querySelector('ul');
const baseURL = `https://basic-todo-api.vercel.app/api/todo`;
const lastTodoID = `/64dd7d354bc30b0008892647`;
// console.log(baseURL + lastTodoID);

function crud(methodType, id = '', data = {}) {
  return fetch(baseURL + id, {
    method: methodType,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

let putData = {
  todo: {
    title: 'Go Swimming',
    isCompleted: true,
  },
};

let postData = {
  todo: {
    title: 'Play Basketball',
  },
};

fetch(baseURL)
  .then((resp) => resp.json())
  .then((obj) => obj.todos)
  .then((allTodoObjs) => {
    // fetch(baseURL + lastTodoID, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(putData),
    // });
    crud('POST', postData);
    crud('PUT', lastTodoID, putData);
    fetch(baseURL + '/6438dce92043f50009e0a9ec', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    get(allTodoObjs);
    //   put(allTodoObjs);
  });

function handleDelete(list) {
  console.log(`Button clicked`);
}

{
  /* <li class="each-todo flex jcb aic">
          <input type="checkbox" name="checkbox" id="checkbox" />
          <h2 class="todo-name">Play Football</h2>

          <button>❌</button>
        </li> */
}

function get(allTodoObjs) {
  console.log(allTodoObjs);
  allTodoObjs.forEach((todoObj) => {
    // console.log(todoObj);
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    let todoName = document.createElement('h2');
    let close = document.createElement('button');

    checkbox.type = 'checkbox';
    li.classList.add('each-todo', 'flex', 'jcb', 'aic');
    todoName.classList.add('.todo-name');

    checkbox.checkVisibility = todoObj.isCompleted;
    todoName.innerText = todoObj.title;
    close.innerText = '❌';

    // close.addEventListener('toggle', handleDelete(li));

    li.append(checkbox, todoName, close);
    todoList.append(li);
  });
}

function put(allTodoObjs) {}
