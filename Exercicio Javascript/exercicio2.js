const botao = document.getElementById('btnAdicionar');
const localadd = document.getElementById('lista');

botao.addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('nascimento').value;
    
    const novoP = document.createElement('p');

    const dataHoje = new Date();
    const dataNasc = new Date(nascimento);
    
    const anoAtual = dataHoje.getFullYear();
    const mesAtual = dataHoje.getMonth();
    const diaAtual = dataHoje.getDate();
    
    const anoUser = dataNasc.getFullYear();
    const mesUser = dataNasc.getMonth();
    const diaUser = dataNasc.getDate();


    if (anoAtual - anoUser > 18) {
    novoP.classList.add('aprovado');
    }
    else if (anoAtual - anoUser == 18){
        if (mesAtual > mesUser){
            novoP.classList.add('aprovado');
        } 
        else if (mesAtual == mesUser){
            if (diaAtual >= diaUser){
            novoP.classList.add('aprovado');
            }
            else {
                novoP.classList.add('reprovado');
            }
        }
        else{
            novoP.classList.add('reprovado');
        }
    }
    else {
        novoP.classList.add('reprovado');
    }

    novoP.textContent = 'Membro ' + nome + ' foi cadastrado na festa';  
    localadd.appendChild(novoP);

})

