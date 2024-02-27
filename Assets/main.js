const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  return document.createElement('li');
}

function criaTarefa(textoInput) {
  const li = criaLi(); li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  checkbox(li);
  botaoApagar(li);
  salvarTarefas();
}

inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function checkbox(li) {
  const cBox = document.createElement('input');
  cBox.setAttribute('class', 'ckbox');
  cBox.setAttribute('type', 'checkbox');
  cBox.setAttribute('title', 'marca item da lista');
  li.appendChild(cBox);

  li.addEventListener('click', function (e) {
    cBox.checked = !cBox.checked;
    if(cBox.checked){
      li.classList.add('checked');
    } else{
      li.classList.remove('checked');
    }
  });
}

function botaoApagar(li) {
  const btnApagar = document.createElement('button');
  btnApagar.innerText = 'Apagar';
  btnApagar.setAttribute('class', 'btn-apaga');
  btnApagar.setAttribute('title', 'apaga esse item da lista');
  li.appendChild(btnApagar);
}

btnTarefa.addEventListener('click', function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (e) {
  const element = e.target;
  if (element.classList.contains('apaga')) {
    element.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }
  localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
}

function tarefasSalvas() {
  const tarefasSalvas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefasSalvas);
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

tarefasSalvas();
