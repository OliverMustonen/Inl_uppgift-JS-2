const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];
// Hämtar jsonplaceholder----------------------------------------------------------------------------
const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
      todos = data;
      // console.log(todos);
      listTodos();
    })
}
fetchTodos();

const validateText = id => {
    const input = document.querySelector('#' + id);
    const error = input.nextElementSibling;
  
    if(input.value === '') {
      error.innerText = 'You need to enter a todo';
      input.classList.add('is-invalid');
      return false;
    } else {
      error.innerText = '';
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return true;
    }
  }

  const validate = () => {
    document.querySelectorAll('input').forEach(input => {
      if(input.type === 'text') {
        validateText(input.id);
      }
     
    })
  
  }


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo);
  })
}

const newTodo = (todo) => {

  let card = document.createElement('div');
  card.classList.add('card');

  let innerCard = document.createElement('div');
  innerCard.classList.add('inner-card');

  let title = document.createElement('h3');
  title.innerText = todo.title;

  let button = document.createElement('button');
  button.classList.add('btn');
  button.innerText = 'X';
  button.addEventListener('click', () => {
    console.log(todo.id)
  })

  innerCard.appendChild(title);
  innerCard.appendChild(button);
  card.appendChild(innerCard);
  output.appendChild(card);

}


const createTodo = (title) => {

  
    
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)

    let newTodo = {
      ...data,
      id: Date.now().toString()
    }
    console.log(newTodo);
    todos.unshift(newTodo);
    listTodos();
  })
}



form.addEventListener('submit', e => {
  e.preventDefault();
    if(validateText('todoInput')) {
        createTodo(input.value);
    }
  
  // input.value = '';
  form.reset();
})