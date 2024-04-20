let modalQtd;

//com o map é possível mapear os elementos de um array  e gerar um novo array com base no array original. sempre devemos informar dos parâmetros o item que será um elemento do array e o indice que será a posição desse elemento no array.
//index onde é guardado a posição de cada item no json

//---------------EXIBE INFORMAÇÕES DA PIZZAS--------------------
pizzaJson.map((item, index) => {

    //clonando o pizza-item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);


    //definindo um atributo chamando data-key ao elemento .pizza-item contendo o id da pizza que foi selecionada pelo usuário
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (event) => {

        event.preventDefault();
        //iniciando a variável sempre com o valor 1
        modalQtd = 1
        //queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
        //closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.

        //getAttribute =  pega o valor de um atributo
        let key = event.target.closest('.pizza-item').getAttribute('data-key');

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;

        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        //removendo a classe selecionada dos tamanhos de pizza, assim garantimos que nenhuma pizza estará selecionada  antes do usuário selecionar um tamanho
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

        //selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            //fará que o tamanho grande sempre seja selecionada por padrão ao usário clicar em uma pizzar
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            //side.querySelector('span).innerHTML = '123';
        });

        //definindo sempre 1 para quantidade de pizza
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;

        //definindo opacidade 0 para que a modal não seja exibida na tel logo de inicio
        document.querySelector('.pizzaWindowArea').style.opacity = 0

        //exibindo a janela modal na tela ao clicar em pizza
        document.querySelector('.pizzaWindowArea').style.display = 'flex';

        //setTimeout =  permite executar um código depois de um tempo estipulado, esse tempo será em milisegundos
        setTimeout(() => {
            //definindo a opacidade para 1 para que a modal seja exibida na tela, lembrando, no css temos uma transition e assim qualquer animação adicionada irá demorar o tempo da transition para acontecer, nesse caso será de 0.5s, assim a opacidade irá do 0 ao 1 demorando 0.5s para acontecer, isso irá gerar um efeito de transição suave dando a impressão que amodal está surgindo na tela.
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)

        /* console.log(pizzaJson[key]); */

    })

    //preenchendo as informações em pizza-item
    //append() = cria um elemento dentro do local especificado sempre na última posição, ou seja, não substitui os elementos que já estavam dentro
    document.querySelector('.pizza-area').append(pizzaItem);

})

//-----------------------

//Evento do modal
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

/* Estamos usando forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em um botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela. */
//forma mais resumida e simplificada de chamar 
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

closeModal()

/* formas mais  */
/* document.querySelector('.pizzaInfo--cancelButton').addEventListener('click',(event)=> {

}) */

/* document.querySelector('..pizzaInfo--cancelMobilrButton').addEventListener('click',(event)=> {

}) */


document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    //a cada vez que o usuário clicar no modal a variavel modalQtd será incrementada em +1
    modalQtd++;

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
});


document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if (modalQtd > 1) {
        modalQtd--
    }

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;


});


