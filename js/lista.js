document.addEventListener('DOMContentLoaded', function() {
  const listaUsuarios = document.getElementById('listaUsuarios');

  function criarItemUsuario(usuario) {
    const itemUsuario = document.createElement('div');
    itemUsuario.classList.add('user-item');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const nomeElement = document.createElement('h3');
    nomeElement.textContent = `Nome: ${usuario.nome}`;
    userInfo.appendChild(nomeElement);

    const emailElement = document.createElement('p');
    emailElement.classList.add('email');
    emailElement.textContent = `Email: ${usuario.email}`;
    userInfo.appendChild(emailElement);

    const cpfElement = document.createElement('p');
    cpfElement.classList.add('cpf');
    cpfElement.textContent = `CPF: ${usuario.cpf || 'Dados não disponíveis'}`;
    userInfo.appendChild(cpfElement);

    const telefoneElement = document.createElement('p');
    telefoneElement.classList.add('telefone');
    telefoneElement.textContent = `Telefone: ${usuario.telefone || 'Dados não disponíveis'}`;
    userInfo.appendChild(telefoneElement);

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
    ruaElement.textContent = `Rua: ${usuario.endereco ? usuario.endereco.rua : 'Dados não disponíveis'}`;
    enderecoElement.appendChild(ruaElement);

    const numeroElement = document.createElement('p');
    numeroElement.textContent = `Número: ${usuario.endereco ? usuario.endereco.numero : 'Dados não disponíveis'}`;
    enderecoElement.appendChild(numeroElement);

    const complementoElement = document.createElement('p');
    complementoElement.textContent = `Complemento: ${usuario.endereco ? usuario.endereco.complemento : 'Dados não disponíveis'}`;
    enderecoElement.appendChild(complementoElement);

    const bairroElement = document.createElement('p');
    bairroElement.textContent = `Bairro: ${usuario.endereco ? usuario.endereco.bairro : 'Dados não disponíveis'}`;
    enderecoElement.appendChild(bairroElement);

    const cidadeElement = document.createElement('p');
    cidadeElement.textContent = `Cidade: ${usuario.endereco ? usuario.endereco.cidade : 'Dados não disponíveis'}`;
    enderecoElement.appendChild(cidadeElement);

    userInfo.appendChild(enderecoElement);
    itemUsuario.appendChild(userInfo);

    const userActions = document.createElement('div');
    userActions.classList.add('user-actions');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-btn', 'delete-btn');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => {
      excluirUsuario(usuario.id);
    });
    itemUsuario.appendChild(deleteButton);
    itemUsuario.appendChild(userActions);

    const editButton = document.createElement('a');
    editButton.classList.add('action-btn', 'edit-btn');
    editButton.textContent = 'Editar';
    editButton.href = `editarUsuario.html?id=${usuario.id}`; // Redireciona para a página de edição com o ID do usuário
    itemUsuario.appendChild(editButton);
    itemUsuario.appendChild(userActions);

    return itemUsuario;
  }

  function excluirUsuario(id) {
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Usuário excluído com sucesso!');
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

  fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(usuarios => {
      listaUsuarios.innerHTML = '';
      usuarios.forEach(usuario => {
        const itemUsuario = criarItemUsuario(usuario);
        listaUsuarios.appendChild(itemUsuario);
      });
    })
    .catch(error => {
      console.log('Erro ao recuperar a lista de usuários:', error);
    });
});

// Ediçao
