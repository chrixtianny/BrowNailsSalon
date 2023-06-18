
//Validar dados

const inputCEP = document.querySelector('#cep');
inputCEP.addEventListener('input', function(){
    const cep = inputCEP.value.replace(/\D/g, '');
    if(cep.length > 8){
        inputCEP.value = inputCEP.value.slice(0, -1);
        return;
    }
    if(cep.length < 8){
        return;
    }
    if(cep.length == 8){
        if(cep.length == 8){
            buscaCEP(cep);
        }
    }
})

function buscaCEP(cep){
    const api = 'https://viacep.com.br/ws/'+ cep +'/json/';
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
    
    fetch(api, options).then(
        response => response.json()
    ).then(
        data => {
            if(data.erro){
                inputCEP.setCustomValidity('CEP não encontrado');
                return;
            }
            inputCEP.setCustomValidity('');
            preencheCamposComCEP(data);
            return;
        }
    )
}

function preencheCamposComCEP(data){
    const inputRua = document.querySelector('#rua');
    const inputBairro = document.querySelector('#bairro');
    const inputCidade = document.querySelector('#cidade');
    const inputCep = document.querySelector('#cep');
    inputRua.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputCidade.value = data.localidade;
    inputCep.value = data.cep; 
}

//Criar usuário

let usuario = {};
let endereco = {};

function criarUsuario() { 
    if (!validarEndereco()) {
        return;
    }

    usuario.nome = document.querySelector('#nomeCompleto').value;
    usuario.email = document.querySelector('#email').value;
    usuario.senha = document.querySelector('#senha').value;
    usuario.cpf = document.querySelector('#documentocpf').value;
    usuario.telefone = document.querySelector('#telefone').value;
    usuario.data_nascimento = document.querySelector('#dataNascimento').value;
    usuario.end = endereco;
    usuario.ativo = true;

console.log("usuario salvo!", usuario);
}

function validarEndereco() {
    endereco = {}; // Limpa o objeto endereco

    endereco.cep = document.querySelector('#cep').value;
    endereco.rua = document.querySelector('#rua').value;
    endereco.numero = document.querySelector('#numero').value;
    endereco.complemento = document.querySelector('#complemento').value;
    endereco.bairro = document.querySelector('#bairro').value;
    endereco.cidade = document.querySelector('#cidade').value;
    endereco.ativo = true;

    return true;
}


// Seleciona o botão de envio
const botaoEnviar = document.querySelector('.botaoCadastrar');
const formulario = document.querySelector('#formCadastro');

// Adiciona um evento de clique ao botão
botaoEnviar.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Dispara o evento de submissão do formulário
    formulario.dispatchEvent(new Event('submit'));
});

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('documentocpf').value;
    const telefone = document.getElementById('telefoneCelular').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Verifica se algum campo obrigatório está vazio
    if (
        !nome ||
        !email ||
        !senha ||
        !cpf ||
        !telefone ||
        !dataNascimento ||
        !cep ||
        !rua ||
        !numero ||
        !bairro ||
        !cidade
    ) {
        console.log('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Cria um objeto com os dados do novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        telefone: telefone,
        dataNascimento: dataNascimento,
        endereco: {
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade
        }
    };

    // Envia os dados do novo usuário para o servidor JSON usando o método POST
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => {
        if (response.ok) {
            console.log('Usuário cadastrado com sucesso!');
            window.location.href = 'lista.html'; // Redireciona para a página de lista de usuários
        } else {
            console.log('Erro ao cadastrar usuário. Status:', response.status);
        }
    })
    .catch(error => {
        console.log('Erro ao cadastrar usuário:', error);
    });
});
