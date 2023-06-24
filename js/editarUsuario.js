
// document.addEventListener('DOMContentLoaded', function() {
//     // Declara a variável usuario no escopo global
//     let usuario;
  
//     // Obtém o ID do usuário da URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('id');    
  
//     // Seleciona o formulário de edição
//     const editarForm = document.getElementById('formEditarCadastro');
//     const botaoAtualizar = document.getElementById('botaoAtualizar');
  
//     // Faz uma requisição GET para obter os dados do usuário com base no ID
//     fetch(`http://localhost:3000/usuarios/${userId}`)
//       .then(response => response.json())
//       .then(data => {
//         // Armazena os dados do usuário na variável usuario
//         usuario = data;
  
//         // Preenche os campos de edição com os dados do usuário
//         editarForm.nome.value = usuario.nome;
//         editarForm.email.value = usuario.email;
//         editarForm.documentocpf.value = usuario.cpf;
//         editarForm.telefone.value = usuario.telefone;
//         editarForm.rua.value = usuario.endereco.rua;
//         editarForm.numero.value = usuario.endereco.numero;
//         editarForm.complemento.value = usuario.endereco.complemento;
//         editarForm.bairro.value = usuario.endereco.bairro;
//         editarForm.cidade.value = usuario.endereco.cidade;      
//       })
//       .catch(error => {
//         console.log('Erro ao obter os dados do usuário:', error);
//       });
  
//     const updateButton = document.createElement('button');
//     updateButton.classList.add('action-btn', 'update-btn');
//     updateButton.textContent = 'Atualizar';
//     updateButton.addEventListener('click', () => {
//       atualizarUsuario(usuario.id);
//     });
//     botaoAtualizar.appendChild(updateButton);
  
//     function atualizarUsuario(id) {
//       fetch(`http://localhost:3000/usuarios/${id}`, {
//         method: 'PUT'
//       })
//       .then(response => {
//         if (response.ok) {
//           console.log('Usuário atualizado com sucesso!');
//           // Redireciona para a página "lista.html"
//           window.location.href = 'lista.html';
//         } else {
//           console.log('Erro ao atualizar usuário. Status:', response.status);
//         }
//       });
//     }
//   });
  
document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');    
  
    // Seleciona o formulário de edição
    const editarForm = document.getElementById('formEditarCadastro');
    const botaoAtualizar = document.getElementById('botaoAtualizar');
  
    // Faz uma requisição GET para obter os dados do usuário com base no ID
    fetch(`http://localhost:3000/usuarios/${userId}`)
      .then(response => response.json())
      .then(usuario => {
        // Preenche os campos de edição com os dados do usuário
        editarForm.nome.value = usuario.nome;
        editarForm.email.value = usuario.email;
        editarForm.documentocpf.value = usuario.cpf;
        editarForm.telefone.value = usuario.telefone;
        editarForm.rua.value = usuario.endereco.rua;
        editarForm.numero.value = usuario.endereco.numero;
        editarForm.complemento.value = usuario.endereco.complemento;
        editarForm.bairro.value = usuario.endereco.bairro;
        editarForm.cidade.value = usuario.endereco.cidade;
      })
      .catch(error => {
        console.log('Erro ao obter os dados do usuário:', error);
      });
  
    const updateButton = document.createElement('button');
    updateButton.classList.add('action-btn', 'update-btn');
    updateButton.textContent = 'Atualizar';
    updateButton.addEventListener('click', () => {
      atualizarUsuario(userId);
    });
    botaoAtualizar.appendChild(updateButton);
  
    function atualizarUsuario(id) {
      // Obter os valores dos campos do formulário
      const nome = editarForm.nome.value;
      const email = editarForm.email.value;
      const cpf = editarForm.documentocpf.value;
      const telefone = editarForm.telefone.value;
      const rua = editarForm.rua.value;
      const numero = editarForm.numero.value;
      const complemento = editarForm.complemento.value;
      const bairro = editarForm.bairro.value;
      const cidade = editarForm.cidade.value;
  
      console.log('Valores dos campos:', nome, email, cpf, telefone, rua, numero, complemento, bairro, cidade);
  
      // Enviar a requisição PUT com os valores atualizados
      fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nome: nome,
          email: email,
          cpf: cpf,
          telefone: telefone,
          endereco: {
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Usuário atualizado com sucesso!');
          // Redireciona para a página "lista.html"
          window.location.href = 'lista.html';
        } else {
          console.log('Erro ao atualizar usuário. Status:', response.status);
        }
      });
    }
  });
  