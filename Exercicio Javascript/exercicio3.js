// Produto 1
const botaosoma1 = document.getElementById('qntd+1');
const botaoreduz1 = document.getElementById('qntd-1');
const preco1 = document.getElementById('preco1');
let quantidade1 = document.getElementById('qntd1');
let totaldosprodutos = document.getElementById('total');

botaosoma1.addEventListener('click', function(){
    quantidade1.textContent = parseInt(quantidade1.textContent) + 1;
    valoratotal();
});

botaoreduz1.addEventListener('click', function(){
    if (parseInt(quantidade1.textContent) > 1) {
        quantidade1.textContent = parseInt(quantidade1.textContent) - 1;
        valoratotal();
    }
});


//-----------------------------------Produto 2 ------------------------------------//

const botaosoma2 = document.getElementById('qntd+2');
const botaoreduz2 = document.getElementById('qntd-2');
const preco2 = document.getElementById('preco2');
let quantidade2 = document.getElementById('qntd2');
let totaldosprodutos2 = document.getElementById('total2');

botaosoma2.addEventListener('click', function(){
    quantidade2.textContent = parseInt(quantidade2.textContent) + 1;
    valoratotal();
});

botaoreduz2.addEventListener('click', function(){
    if (parseInt(quantidade2.textContent) > 1) {
        quantidade2.textContent = parseInt(quantidade2.textContent) - 1;
        valoratotal();
    }
});


//------------------------------------Produtos 3------------------------------------//

const botaosoma3 = document.getElementById('qntd+3');
const botaoreduz3 = document.getElementById('qntd-3');
const preco3 = document.getElementById('preco3');
let quantidade3 = document.getElementById('qntd3');
let totaldosprodutos3 = document.getElementById('total3');

botaosoma3.addEventListener('click', function(){
    quantidade3.textContent = parseInt(quantidade3.textContent) + 1;
    valoratotal();
});

botaoreduz3.addEventListener('click', function(){
    if (parseInt(quantidade3.textContent) > 1) {
        quantidade3.textContent = parseInt(quantidade3.textContent) - 1;
        valoratotal();
    }
});


const botaototal = document.getElementById('btnfinaliza');
const valortotal = document.getElementById('valorgeral');

function valoratotal(){
const tl1 = preco1.textContent * quantidade1.textContent;
const tl2 = preco2.textContent * quantidade2.textContent;
const tl3 = preco3.textContent * quantidade3.textContent;


const somatotal = tl1 + tl2 + tl3;
valortotal.textContent = somatotal.toFixed(2);
}

botaototal.addEventListener('click', valortotalcarrinho);
