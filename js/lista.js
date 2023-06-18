document.addEventListener('DOMContentLoaded', function() {
  
const listaUsuarios = document.getElementById('listaUsuarios');

function criarItemUsuario(usuario) {
    // Cria o elemento de item de usuário
    const itemUsuario = document.createElement('div');
    itemUsuario.classList.add('user-item');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
  
    // Cria o elemento para exibir o nome do usuário
    const nomeElement = document.createElement('h3');
    nomeElement.textContent = `Nome: ${usuario.nome}`;
    itemUsuario.appendChild(nomeElement);
  
    // Cria o elemento para exibir o email do usuário
    const emailElement = document.createElement('p');
    emailElement.classList.add('email');
    emailElement.textContent = `Email: ${usuario.email}`;
    itemUsuario.appendChild(emailElement);

    // Cria o elemento para exibir o CPF do usuário
    const cpfElement = document.createElement('p');
    cpfElement.classList.add('cpf');
    cpfElement.textContent = `CPF: ${usuario.cpf}`;
    itemUsuario.appendChild(cpfElement);

    // Cria o elemento para exibir o telefone do usuário
    const telefoneElement = document.createElement('p');
    telefoneElement.classList.add('telefone');
    telefoneElement.textContent = `Telefone: ${usuario.telefone}`;
    itemUsuario.appendChild(telefoneElement);

    

    //TESTE
    const enderecoElement = document.createElement('div');
    enderecoElement.classList.add('user-address');

    const enderecoButton = document.createElement('button');
    enderecoButton.textContent = 'Ver mais';
    enderecoButton.classList.add('action-btn');
    enderecoButton.addEventListener('click', function() {
    enderecoElement.classList.toggle('visible');
    });
    userInfo.appendChild(enderecoButton);

    const ruaElement = document.createElement('p');
    ruaElement.textContent = `Rua: ${usuario.endereco.rua}`;
    enderecoElement.appendChild(ruaElement);

    const numeroElement = document.createElement('p');
    numeroElement.textContent = `Número: ${usuario.endereco.numero}`;
    enderecoElement.appendChild(numeroElement);

    const complementoElement = document.createElement('p');
    complementoElement.textContent = `Complemento: ${usuario.endereco.complemento}`;
    enderecoElement.appendChild(complementoElement);

    const bairroElement = document.createElement('p');
    bairroElement.textContent = `Bairro: ${usuario.endereco.bairro}`;
    enderecoElement.appendChild(bairroElement);

    const cidadeElement = document.createElement('p');
    cidadeElement.textContent = `Cidade: ${usuario.endereco.cidade}`;
    enderecoElement.appendChild(cidadeElement);

    userInfo.appendChild(enderecoElement);
    itemUsuario.appendChild(userInfo);

    const userActions = document.createElement('div');
    userActions.classList.add('user-actions');

    // Cria o botão de exclusão do usuário
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-btn', 'delete-btn');
    deleteButton.textContent = 'Excluir';
    // Adiciona um evento de clique para excluir o usuário
    deleteButton.addEventListener('click', () => {
      excluirUsuario(usuario.id); // Função para excluir o usuário (a ser implementada)
    });
    itemUsuario.appendChild(deleteButton);
    itemUsuario.appendChild(userActions);
  
    return itemUsuario;
  }

  function excluirUsuario(id) {
    // Faz a solicitação DELETE ao servidor para excluir o usuário com a ID específica
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Usuário excluído com sucesso!');
        // Remove o usuário da lista exibida na página
        const itemUsuario = document.getElementById(`user-${id}`);
        if (itemUsuario) {
          itemUsuario.remove();
        }
      } else {
        console.log('Erro ao excluir usuário. Status:', response.status);
      }
    })
    .catch(error => {
      console.log('Erro ao excluir usuário:', error);
    });
  }  


// Recupera a lista de usuários do servidor JSON
fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(usuarios => {
    // Limpa a lista de usuários
    listaUsuarios.innerHTML = '';

    // Cria um elemento <li> para cada usuário e adiciona à lista
    usuarios.forEach(usuario => {
      const itemUsuario = criarItemUsuario(usuario);
      listaUsuarios.appendChild(itemUsuario);
    });
  })
  .catch(error => {
    console.log('Erro ao recuperar a lista de usuários:', error);
  });

  });
