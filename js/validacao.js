//usando data set

export function valida(input){
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostrarMensagemErro(tipoDeInput, input);
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

}


/*const inputData = document.querySelector('#dataNascimento');
inputData.addEventListener('blur', (evento) => {
    validaDataNascimento(inputData)
}
);*/

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

const inputCPF = document.querySelector('#cpf')

inputCPF.addEventListener('blur', (evento) => {

    validarCPF(inputCPF)
});


function validarCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''
    if (!ChecaCPFRepetido(cpfFormatado) || !validarEstruturaCPF(cpfFormatado)){
        mensagem = "o CPF informado não é válido";
    }

    input.setCustomValidity(mensagem)
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
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
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
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
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