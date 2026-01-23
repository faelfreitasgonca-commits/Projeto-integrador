const botao = document.getElementById('btnAdicionar');

botao.addEventListener('click', function(){
    const campoNota = Number (document.getElementById('campoNota').value);
    const campoNota2 = Number (document.getElementById('campoNota2').value);
    const campoNota3 = Number (document.getElementById('campoNota3').value);

    const soma = campoNota + campoNota2 + campoNota3;
    const porcentagem = (soma/60)*100;

    if (porcentagem >= 60){
        alert('aprovado');
    }
    
    else if (porcentagem >= 40 && porcentagem <= 59){
        alert('recuperação');
    } 
    else {
        alert('reprovado');
    }
})
