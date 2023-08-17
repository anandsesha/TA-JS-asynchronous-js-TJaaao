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

function displayTodos() {
  return fetch(baseURL)
    .then((resp) => resp.json())
    .then((obj) => obj.todos)
    .then((allTodoObjs) => {
      // fetch(baseURL + lastTodoID, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(putData),
      // });
      // crud('POST', postData);
      // crud('PUT', lastTodoID, putData);

      get(allTodoObjs);
      //   put(allTodoObjs);
    });
}

function handleDelete(uniqueTodoID) {
  console.log(`Button clicked`);
  return fetch(baseURL + '/' + uniqueTodoID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(displayTodos());
}

function handleToggle(uniqueTodoID, checkedStatus) {
  let putData = {
    todo: {
      isCompleted: !checkedStatus,
    },
  };
  return fetch(baseURL + '/' + uniqueTodoID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(putData),
  }).then(displayTodos());
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
  todoList.innerHTML = '';
  allTodoObjs.forEach((todoObj) => {
    console.log(todoObj);
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    let todoName = document.createElement('h2');
    let close = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = todoObj.isCompleted;

    checkbox.addEventListener('click', () =>
      handleToggle(todoObj._id, todoObj.isCompleted)
    );
    checkbox.setAttribute('data-id', todoObj._id);
    li.classList.add('each-todo', 'flex', 'jcb', 'aic');
    todoName.classList.add('.todo-name');

    todoName.innerText = todoObj.title;
    close.innerText = '❌';
    close.setAttribute('data-id', todoObj._id);

    close.addEventListener('click', () => handleDelete(todoObj._id));

    li.append(checkbox, todoName, close);
    todoList.append(li);
  });
}

function addTodo(event) {
  if (event.keyCode == 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => {
      event.target.value = '';
      displayTodos();
    });
  }
}
input.addEventListener('keyup', addTodo);
displayTodos();
