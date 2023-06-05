
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


const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input)            
}




const inputData = document.querySelector('#dataNascimento');
inputData.addEventListener('blur', (evento) => {
    validaDataNascimento(inputData)
});

function mostrarMensagemErro(tipoDeInput, input){
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }
    })

    return mensagem;

}
function validaDataNascimento(input){
    const DataRecebida = new Date (input.value);
    let mensagem = '';


    if(!maiorDeIdade(DataRecebida)){
        mensagem = 'Para o cadastro a pessoa não pode ser menor de idade'
    }

    input.setCustomValidity(mensagem);
}

function maiorDeIdade(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual;
}

//Validar CPF
const inputCPF = document.querySelector('#documentocpf');

inputCPF.addEventListener('blur', (evento) => {
    validarCPF(evento.target);
});

function validarCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';
    if (!ChecaCPFRepetido(cpfFormatado) || !validarEstruturaCPF(cpfFormatado)){
        mensagem = "o CPF informado não é válido";
    }

    input.setCustomValidity(mensagem);
}

function ChecaCPFRepetido(cpf){
    const digitoRepetido = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;

    digitoRepetido.forEach(valor => {
        if(valor == cpf){
            cpfValido = false;
        }
    })

    return cpfValido;
}
    
function validarEstruturaCPF(cpf){
    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador){
   if (multiplicador>=12){
    return true
   }
   
    let soma = 0
    let multiplicadorInicial = multiplicador
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++
    }

    if(digitoVerificador == ConfirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador+1)
    }

    return false

    }

function ConfirmaDigito(soma) {
    return 11 - (soma % 11)
}